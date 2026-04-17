<?php

/**
 * AI Zippy Child Theme Functions
 *
 * Add project-specific customizations here.
 * The parent theme (ai-zippy) handles Vite assets and core setup.
 */

defined('ABSPATH') || exit;

/**
 * Enqueue child theme styles after parent.
 */
function ai_zippy_child_enqueue_assets(): void
{
    // Enqueue child theme Vite-built style
    // Uses child theme's own manifest at assets/dist/.vite/manifest.json
    $manifest_path = get_stylesheet_directory() . '/assets/dist/.vite/manifest.json';

    if (!file_exists($manifest_path)) {
        return;
    }

    $manifest = json_decode(file_get_contents($manifest_path), true);
    $entry = 'src/wp-content/themes/ai-zippy-child/src/scss/style.scss';

    if (empty($manifest[$entry])) {
        return;
    }

    $asset = $manifest[$entry];
    $dist_uri = get_stylesheet_directory_uri() . '/assets/dist';

    // CSS-only entry
    if (!empty($asset['file']) && str_ends_with($asset['file'], '.css')) {
        $file_path = get_stylesheet_directory() . '/assets/dist/' . $asset['file'];
        $version = file_exists($file_path) ? filemtime($file_path) : wp_get_theme()->get('Version');

        wp_enqueue_style(
            'ai-zippy-child-style',
            $dist_uri . '/' . $asset['file'],
            ['ai-zippy-theme-css-0'],
            $version
        );
    }
}
add_action('wp_enqueue_scripts', 'ai_zippy_child_enqueue_assets', 20);

/**
 * Register child theme custom blocks from built assets.
 */
function ai_zippy_child_register_blocks(): void
{
    $blocks_dir = get_stylesheet_directory() . '/assets/blocks';

    if (!is_dir($blocks_dir)) {
        return;
    }

    foreach (glob($blocks_dir . '/*/block.json') as $block_json) {
        register_block_type(dirname($block_json));
    }
}
add_action('init', 'ai_zippy_child_register_blocks');

/**
 * Enqueue Swiper UMD bundle when the best-sellers block is on the page.
 * Using the UMD build avoids webpack treating the CDN URL as a local chunk.
 */
function ai_zippy_child_enqueue_swiper(): void
{
    if (!has_block('ai-zippy-child/best-sellers')) {
        return;
    }

    wp_enqueue_script(
        'swiper-bundle',
        'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js',
        [],
        null,
        true // footer
    );

    wp_enqueue_style(
        'swiper-bundle-css',
        'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css',
        [],
        null
    );
}
add_action('wp_enqueue_scripts', 'ai_zippy_child_enqueue_swiper', 5);
