# AI Zippy — TODO

## Backlog

### Shop — Category Page SEO / Performance
- **Current state:** `/product-category/*/` uses a React app that fetches products via AJAX. No server-rendered product content on initial load.
- **Proposed improvement:** Replace the product grid inside the React app with WooCommerce's `wp:woocommerce/product-collection` block for server-side rendering, then overlay our custom filter panel on top.
- **Why:** Better SEO (Google can index category pages), faster initial paint, no empty grid flash.
- **Alternative considered:** WooCommerce native filter blocks (`wp:woocommerce/filter-wrapper`, `wp:woocommerce/price-filter`) — less UI control but fully supported.
- **Priority:** Low (only needed if SEO on category pages becomes important).
