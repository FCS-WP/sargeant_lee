<?php
/**
 * Header Search block render template.
 *
 * @var array $attributes
 */

if (!defined('ABSPATH')) {
    exit;
}

$placeholder = isset($attributes['placeholder']) ? $attributes['placeholder'] : 'Search...';
$button_label = isset($attributes['buttonLabel']) ? $attributes['buttonLabel'] : 'Open search';
$icon_url = isset($attributes['iconUrl']) ? $attributes['iconUrl'] : '';
$modal_title = isset($attributes['modalTitle']) ? $attributes['modalTitle'] : 'Search the site';
$modal_id = 'ai-zippy-child-search-modal-' . wp_unique_id();
?>
<div <?php echo get_block_wrapper_attributes(['class' => 'ai-zippy-child-header-search']); ?>>
    <button
        type="button"
        class="ai-zippy-child-header-search__trigger"
        aria-label="<?php echo esc_attr($button_label); ?>"
        aria-haspopup="dialog"
        aria-controls="<?php echo esc_attr($modal_id); ?>"
        aria-expanded="false"
        data-search-modal-trigger
    >
        <?php if (!empty($icon_url)) : ?>
            <img
                class="ai-zippy-child-header-search__icon-image"
                src="<?php echo esc_url($icon_url); ?>"
                alt=""
                aria-hidden="true"
            />
        <?php else : ?>
            <span class="ai-zippy-child-header-search__icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
                    <path d="M10.5 3a7.5 7.5 0 1 1 0 15a7.5 7.5 0 0 1 0-15Zm0 2a5.5 5.5 0 1 0 0 11a5.5 5.5 0 0 0 0-11Zm10.207 14.793l-3.647-3.646a1 1 0 0 0-1.414 1.414l3.647 3.646a1 1 0 0 0 1.414-1.414Z" fill="currentColor"/>
                </svg>
            </span>
        <?php endif; ?>
    </button>

    <div
        id="<?php echo esc_attr($modal_id); ?>"
        class="ai-zippy-child-header-search__modal"
        hidden
        data-search-modal
        aria-hidden="true"
    >
        <div class="ai-zippy-child-header-search__backdrop" data-search-modal-close></div>
        <div class="ai-zippy-child-header-search__dialog" role="dialog" aria-modal="true" aria-labelledby="<?php echo esc_attr($modal_id); ?>-title">
            <button
                type="button"
                class="ai-zippy-child-header-search__close"
                aria-label="<?php esc_attr_e('Close search', 'ai-zippy-child'); ?>"
                data-search-modal-close
            >
                <span aria-hidden="true">×</span>
            </button>

            <div class="ai-zippy-child-header-search__content">
                <h2 id="<?php echo esc_attr($modal_id); ?>-title" class="ai-zippy-child-header-search__title">
                    <?php echo esc_html($modal_title); ?>
                </h2>

                <form class="ai-zippy-child-header-search__form" role="search" method="get" action="<?php echo esc_url(home_url('/')); ?>">
                    <label class="screen-reader-text" for="<?php echo esc_attr($modal_id); ?>-input">
                        <?php esc_html_e('Search for:', 'ai-zippy-child'); ?>
                    </label>
                    <input
                        id="<?php echo esc_attr($modal_id); ?>-input"
                        class="ai-zippy-child-header-search__input"
                        type="search"
                        name="s"
                        value=""
                        placeholder="<?php echo esc_attr($placeholder); ?>"
                    />
                    <button type="submit" class="ai-zippy-child-header-search__submit">
                        <?php esc_html_e('Search', 'ai-zippy-child'); ?>
                    </button>
                </form>
            </div>
        </div>
    </div>
</div>
