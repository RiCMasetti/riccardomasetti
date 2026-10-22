SHELL := /bin/sh
.DEFAULT_GOAL := help

DIST_DIR := dist
S3_BUCKET ?=
CLOUDFRONT_DISTRIBUTION_ID ?=
AWS_PROFILE ?=
AWS_REGION ?=

AWS_PROFILE_ARG := $(if $(strip $(AWS_PROFILE)),--profile $(AWS_PROFILE),)
AWS_REGION_ARG := $(if $(strip $(AWS_REGION)),--region $(AWS_REGION),)
AWS := aws $(AWS_PROFILE_ARG) $(AWS_REGION_ARG)

.PHONY: help install build prepare verify check-aws check-bucket check-distribution deploy invalidate release

help: ## Show the available targets.
	@printf '%s\n' \
		'Usage:' \
		'  make prepare' \
		'  make deploy S3_BUCKET=your-bucket [AWS_PROFILE=profile] [AWS_REGION=region]' \
		'  make invalidate CLOUDFRONT_DISTRIBUTION_ID=distribution-id [AWS_PROFILE=profile]' \
		'  make release S3_BUCKET=your-bucket CLOUDFRONT_DISTRIBUTION_ID=distribution-id' \
		'' \
		'Targets:' \
		'  install      Install exact dependencies from package-lock.json.' \
		'  build        Create the production build in dist/.' \
		'  prepare      Build and verify dist/ for S3 and CloudFront.' \
		'  verify       Check that required deployment files exist.' \
		'  deploy       Prepare and synchronize dist/ to S3.' \
		'  invalidate   Invalidate all objects in the CloudFront distribution.' \
		'  release      Deploy to S3, then invalidate CloudFront.'

install: ## Install dependencies reproducibly.
	npm ci

build: ## Build the Vite application.
	npm run build

prepare: build ## Build and verify the distribution directory.
	@$(MAKE) --no-print-directory verify

verify: ## Validate the distribution directory contents.
	@test -d "$(DIST_DIR)" || { echo "Missing $(DIST_DIR)/. Run 'make prepare'."; exit 1; }
	@for file in index.html robots.txt sitemap.xml llms.txt; do \
		test -f "$(DIST_DIR)/$$file" || { echo "Missing $(DIST_DIR)/$$file"; exit 1; }; \
	done
	@test -d "$(DIST_DIR)/assets" || { echo "Missing $(DIST_DIR)/assets/."; exit 1; }
	@test -n "$$(find "$(DIST_DIR)/assets" -type f -print -quit)" || { echo "$(DIST_DIR)/assets/ is empty."; exit 1; }
	@test ! -d "$(DIST_DIR)/dist" || { echo "Unexpected nested $(DIST_DIR)/dist/ directory."; exit 1; }
	@echo "$(DIST_DIR)/ is ready for deployment ($$(du -sh "$(DIST_DIR)" | cut -f1))."

check-aws:
	@command -v aws >/dev/null 2>&1 || { echo "AWS CLI is required for this target."; exit 1; }

check-bucket:
	@test -n "$(strip $(S3_BUCKET))" || { echo "Set S3_BUCKET, for example: make deploy S3_BUCKET=my-site-bucket"; exit 1; }

check-distribution:
	@test -n "$(strip $(CLOUDFRONT_DISTRIBUTION_ID))" || { echo "Set CLOUDFRONT_DISTRIBUTION_ID."; exit 1; }

deploy: prepare check-aws check-bucket ## Build, verify, and upload the site to S3.
	$(AWS) s3 sync "$(DIST_DIR)/assets/" "s3://$(S3_BUCKET)/assets/" \
		--delete \
		--cache-control "public,max-age=31536000,immutable"
	$(AWS) s3 sync "$(DIST_DIR)/" "s3://$(S3_BUCKET)/" \
		--delete \
		--exclude "assets/*" \
		--cache-control "public,max-age=0,must-revalidate"

invalidate: check-aws check-distribution ## Invalidate the CloudFront cache.
	$(AWS) cloudfront create-invalidation \
		--distribution-id "$(CLOUDFRONT_DISTRIBUTION_ID)" \
		--paths "/*"

release: ## Deploy to S3 and then invalidate CloudFront.
	@$(MAKE) --no-print-directory deploy \
		S3_BUCKET="$(S3_BUCKET)" \
		AWS_PROFILE="$(AWS_PROFILE)" \
		AWS_REGION="$(AWS_REGION)"
	@$(MAKE) --no-print-directory invalidate \
		CLOUDFRONT_DISTRIBUTION_ID="$(CLOUDFRONT_DISTRIBUTION_ID)" \
		AWS_PROFILE="$(AWS_PROFILE)" \
		AWS_REGION="$(AWS_REGION)"
