# Mitchell Web Design Co.

The website for mitchellwebdesign.ca. It's a plain static site (no build step): `index.html` holds all four pages (Home, Services, About, Contact), switched with `#home`, `#services`, `#about`, `#contact`.

- `faith.jpg`: About page photo
- `favicon.svg`: browser tab icon
- `brand/`: logo files (SVG and PNG)
- `share-image.png`: preview picture shown when the link is shared (texts, Facebook, LinkedIn)
- `apple-touch-icon.png`: icon for phone home screens
- `robots.txt`, `sitemap.xml`: tell Google what to index
- `api/contact.js`: sends contact form messages through Gmail. Needs Vercel environment variables `GMAIL_USER` and `GMAIL_APP_PASSWORD` (a Google app password)

Hosted on Vercel; every push to `main` goes live.
