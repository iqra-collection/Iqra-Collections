# Iqra Collection

A mobile-first static ecommerce website for Iqra Collection.

## Files

- index.html
- styles.css
- script.js
- assets/logo.png

## Before launch

The WhatsApp number is configured as `+923197556797`.

The business email is `iqra.collections.pk@gmail.com`.

Also replace the demo bank details in `CONFIG.bank`.

The product list in `script.js` contains demo products. Replace their names, prices, descriptions, images, sizes and colors with your real products.

## GitHub Pages

Create a public GitHub repository and upload these files to its root.

Then open:

Settings → Pages

Choose GitHub Actions or the branch publishing option available in your account, and publish the site.

GitHub Pages can host static sites on GitHub Free public repositories.

## Important payment limitation

This version displays the requested payment methods, but it does not process real card, Apple Pay, Easypaisa or JazzCash transactions.

For real online payments, connect an approved payment provider and never put private API keys or payment secrets in this frontend code.

Bank transfer is handled as manual payment information, and WhatsApp is used for direct orders.

## Product images

The demo catalog uses remote image URLs. For production, replace them with your own optimized product images in the `assets` folder or another image host.

## Custom domain

After the site is working, you can connect a domain such as `www.iqracollection.com` through GitHub Pages settings and your domain DNS provider.
