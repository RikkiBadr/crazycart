# Crazy Cart — Arabic RTL Restaurant Website

A responsive, static Arabic restaurant demo. It uses plain HTML, CSS, and JavaScript, so it can be hosted free on Cloudflare Pages, Netlify, Vercel, or GitHub Pages.

## Quick start

Open `index.html` in a browser. No build step or package installation is required.

## Add the real assets

The original uploaded images were not available in the synced project folder. The site therefore includes designed fallback artwork and works without them.

1. Save the transparent logo as:
   `assets/images/brand/logo.png`
2. Save the hero image as:
   `assets/images/products/dragon-burger.webp`
3. Add the remaining product images to:
   `assets/images/products/`

Recommended product image format: square, 1000×1000 px, WebP or JPG, ideally under 300 KB. File names should use lowercase Latin letters and hyphens.

## Edit products

Open `js/content.js`. Every product has:

- `name`: Arabic product name
- `description`: short Syrian conversational description
- `image`: image filename
- `price`: demo price, currently `000`

The first nine products appear initially. The “عرض باقي المنيو” button reveals all 30.

## Edit branches

In `js/content.js`, update the `branches` list. Keep `displayPhone` formatted for people and `phone` in international format for the call link.

Current phone conversion assumes Damascus numbers use Syria country code `+963` and removes the initial local zero.

## Change branding

Main colors are at the start of `css/style.css`:

- `--yellow`
- `--red`
- `--black`
- `--white`

Main page text, reviews, hours, social links, and SEO text are in `index.html`.

## Map

The current link opens a general map of Damascus. Replace it with exact Google Maps links for each branch when the restaurant provides them. Do not show invented map pins.

## Demo disclosure

The review cards are explicitly labeled as examples and not real customer reviews. The footer also identifies the website as an unofficial demonstration. Remove the disclaimer only after client approval and replace sample reviews with genuine, approved reviews.

## Free publishing

Upload the entire `crazy-cart` folder to a GitHub repository. For Cloudflare Pages, connect the repository and use no build command; set the output directory to `/` (repository root). The same static folder can be dropped into Netlify.

## File structure

```text
crazy-cart/
├── index.html
├── css/style.css
├── js/content.js
├── js/script.js
├── assets/images/brand/
├── assets/images/products/
├── robots.txt
├── sitemap.xml
└── README.md
```
