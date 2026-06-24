# Riccardo Masetti Website

One-page personal portfolio built with React and Vite.

The site presents a career timeline, technical skills, bio, and contact section for Riccardo Masetti. It uses a dark glass-style design, sticky top navigation, smooth anchor scrolling, responsive layouts, and subtle scroll-reveal animations.

## Features

- React frontend powered by Vite
- One-page layout with sections for Timeline, Skills, Bio, and Contact
- Sticky centered navigation with active section highlighting
- Responsive desktop, tablet, and mobile layout
- Scroll-reveal animations instead of parallax movement
- Full-width footer
- SVG favicon and menu icon
- Bio portrait image from local assets
- SEO metadata, Open Graph metadata, Twitter metadata, and JSON-LD structured data
- `robots.txt`, `sitemap.xml`, and `llms.txt` for search and AI crawler readability

## Project Structure

```text
.
├── index.html              # HTML shell, SEO metadata, JSON-LD, noscript summary
├── public/
│   ├── llms.txt            # AI-readable project/profile summary
│   ├── robots.txt          # Crawler rules and sitemap reference
│   └── sitemap.xml         # Sitemap for the canonical domain
├── src/
│   ├── App.jsx             # Page content, sections, navigation, reveal behavior
│   ├── main.jsx            # React entry point
│   ├── styles.css          # Global layout and visual design
│   └── assets/             # SVG icon and portrait image
├── package.json
└── vite.config.js
```

## Local Development

Install dependencies:

```bash
npm install
```

Run the local development server:

```bash
npm run dev
```

Build production assets:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Content Editing

Most visible content is in `src/App.jsx`:

- `timelineItems` controls the Timeline section.
- `skillGroups` controls the Skills section.
- `contactItems` controls the Contact links.
- The Bio text and portrait image are inside the Bio section markup.

Most visual styling is in `src/styles.css`.

## SEO And AI Readability

The project includes multiple machine-readable layers:

- Standard metadata in `index.html`
- Canonical URL for `https://www.riccardomasetti.com/`
- Open Graph and Twitter metadata for social previews
- JSON-LD `Person` structured data
- `noscript` fallback summary for crawlers that do not render JavaScript
- `public/robots.txt`
- `public/sitemap.xml`
- `public/llms.txt`

If the domain changes, update these files:

- `index.html`
- `public/robots.txt`
- `public/sitemap.xml`
- `public/llms.txt`

Then rebuild with:

```bash
npm run build
```

## Deploying To S3 And CloudFront

The production build is static. Deploy the contents of `dist/` to the root of an S3 bucket.

Important: upload the contents of `dist/`, not the `dist` folder itself.

After upload, the bucket root should look like this:

```text
index.html
robots.txt
sitemap.xml
llms.txt
assets/
```

### Recommended AWS Setup

Use CloudFront in front of a private S3 bucket.

Recommended shape:

- S3 bucket is private
- S3 Block Public Access stays enabled
- CloudFront uses the S3 REST endpoint as origin
- CloudFront uses Origin Access Control (OAC)
- Do not use the S3 static website endpoint as the CloudFront origin

Use an origin domain like:

```text
YOUR_BUCKET_NAME.s3.REGION.amazonaws.com
```

Do not use:

```text
YOUR_BUCKET_NAME.s3-website.REGION.amazonaws.com
```

### S3 Bucket Policy For CloudFront OAC

Replace the placeholders with your real values:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AllowCloudFrontReadOnly",
      "Effect": "Allow",
      "Principal": {
        "Service": "cloudfront.amazonaws.com"
      },
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::YOUR_BUCKET_NAME/*",
      "Condition": {
        "StringEquals": {
          "AWS:SourceArn": "arn:aws:cloudfront::YOUR_ACCOUNT_ID:distribution/YOUR_DISTRIBUTION_ID"
        }
      }
    }
  ]
}
```

### CloudFront Distribution Settings

Use these baseline settings:

- Origin: S3 REST bucket endpoint
- Origin access: Origin Access Control
- Viewer protocol policy: Redirect HTTP to HTTPS
- Allowed methods: GET, HEAD
- Compress objects automatically: Yes
- Default root object: `index.html`
- Cache policy: CachingOptimized
- Alternate domain name: `www.riccardomasetti.com` or your chosen domain
- TLS certificate: ACM certificate in `us-east-1`

### SPA Fallback

This site currently uses section anchors, but adding SPA fallback avoids broken reloads if client-side routes are added later.

Add CloudFront custom error responses:

```text
HTTP error code: 403
Response page path: /index.html
HTTP response code: 200
TTL: 0 or low value

HTTP error code: 404
Response page path: /index.html
HTTP response code: 200
TTL: 0 or low value
```

### Deployment Commands

Build the site:

```bash
npm run build
```

Upload the build output:

```bash
aws s3 sync dist/ s3://YOUR_BUCKET_NAME/ --delete
```

Invalidate CloudFront:

```bash
aws cloudfront create-invalidation \
  --distribution-id YOUR_DISTRIBUTION_ID \
  --paths "/*"
```

## Deployment Checklist

- `npm run build` passes
- `dist/index.html` exists
- `dist/assets/` exists
- `dist/robots.txt` exists
- `dist/sitemap.xml` exists
- `dist/llms.txt` exists
- S3 bucket contains the contents of `dist/`
- CloudFront origin points to the S3 REST endpoint, not the S3 website endpoint
- CloudFront default root object is `index.html`
- DNS points to the CloudFront distribution
- HTTPS certificate is attached in CloudFront
- CloudFront invalidation has been created after upload
