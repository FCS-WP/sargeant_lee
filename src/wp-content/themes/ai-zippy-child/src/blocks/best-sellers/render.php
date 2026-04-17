<?php
/**
 * Best Sellers Carousel block render template.
 *
 * @var array    $attributes Block attributes.
 * @var WP_Block $block      Block instance.
 */

defined('ABSPATH') || exit;

$mode            = $attributes['mode']            ?? 'auto';
$heading         = !empty($attributes['heading'])  ? esc_html($attributes['heading'])  : '';
$slides_per_view = (int) ($attributes['slidesPerView'] ?? 3);
$loop            = !empty($attributes['loop'])     ? true : false;
$autoplay        = !empty($attributes['autoplay']) ? true : false;
$autoplay_delay  = (int) ($attributes['autoplayDelay'] ?? 4000);
$padding_top     = !empty($attributes['paddingTop'])    ? esc_attr($attributes['paddingTop'])    : '60px';
$padding_bottom  = !empty($attributes['paddingBottom']) ? esc_attr($attributes['paddingBottom']) : '60px';

$swiper_config = wp_json_encode([
    'slidesPerView' => $slides_per_view,
    'loop'          => $loop,
    'autoplay'      => $autoplay,
    'autoplayDelay' => $autoplay_delay,
]);

if (!function_exists('bs_render_slide')) :
/**
 * Render a single slide given image URL, title, link and new-tab flag.
 */
function bs_render_slide( string $image_url, string $title, string $url, bool $new_tab ): void
{
    $target = $new_tab ? ' target="_blank" rel="noopener noreferrer"' : '';
    ?>
    <div class="swiper-slide bs__slide">
        <a href="<?php echo esc_url($url); ?>" class="bs__slide-link"<?php echo $target; ?>>
            <img
                class="bs__slide-img"
                src="<?php echo esc_url($image_url); ?>"
                alt="<?php echo esc_attr($title); ?>"
                loading="lazy"
            />
            <span class="bs__slide-overlay" aria-hidden="true"></span>
            <?php if ($title) : ?>
                <span class="bs__slide-name bs__slide-name--hover"><?php echo esc_html($title); ?></span>
            <?php endif; ?>
        </a>
        <?php if ($title) : ?>
            <p class="bs__slide-name bs__slide-name--mobile"><?php echo esc_html($title); ?></p>
        <?php endif; ?>
    </div>
    <?php
}
endif;

// ---- Collect slides ----
$slides = [];

if ($mode === 'manual') {
    // Manual: use editor-defined items
    $items = $attributes['items'] ?? [];
    foreach ($items as $item) {
        $image_url = !empty($item['imageUrl']) ? esc_url($item['imageUrl']) : '';
        if (!$image_url) {
            continue; // skip items without image
        }
        $slides[] = [
            'imageUrl' => $image_url,
            'title'    => !empty($item['title'])   ? $item['title']   : '',
            'linkUrl'  => !empty($item['linkUrl'])  ? $item['linkUrl'] : '#',
            'newTab'   => !empty($item['newTab']),
        ];
    }
} else {
    // Auto: query WooCommerce best sellers by popularity
    if (!function_exists('wc_get_products')) {
        return;
    }
    $limit    = (int) ($attributes['limit'] ?? 10);
    $products = wc_get_products([
        'status'  => 'publish',
        'limit'   => $limit,
        'orderby' => 'popularity',
        'order'   => 'DESC',
    ]);
    foreach ($products as $product) {
        $image_id  = $product->get_image_id();
        $image_url = $image_id
            ? wp_get_attachment_image_url($image_id, 'woocommerce_single')
            : wc_placeholder_img_src('woocommerce_single');
        $slides[] = [
            'imageUrl' => $image_url,
            'title'    => $product->get_name(),
            'linkUrl'  => $product->get_permalink(),
            'newTab'   => false,
        ];
    }
}

if (empty($slides)) {
    return;
}
?>
<div <?php echo get_block_wrapper_attributes(['class' => 'bs', 'style' => '--bs-pt:' . $padding_top . ';--bs-pb:' . $padding_bottom . ';']); ?>
     data-swiper-config="<?php echo esc_attr($swiper_config); ?>">

    <div class="bs__header">
        <?php if ($heading) : ?>
            <h2 class="bs__heading"><?php echo $heading; ?></h2>
        <?php endif; ?>
        <div class="bs__nav">
            <button class="bs__nav-btn bs__nav-prev" aria-label="<?php esc_attr_e('Previous', 'ai-zippy-child'); ?>">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="15 18 9 12 15 6"/>
                </svg>
            </button>
            <button class="bs__nav-btn bs__nav-next" aria-label="<?php esc_attr_e('Next', 'ai-zippy-child'); ?>">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="9 6 15 12 9 18"/>
                </svg>
            </button>
        </div>
    </div>

    <div class="swiper bs__swiper">
        <div class="swiper-wrapper">
            <?php foreach ($slides as $slide) :
                bs_render_slide(
                    $slide['imageUrl'],
                    $slide['title'],
                    $slide['linkUrl'],
                    $slide['newTab']
                );
            endforeach; ?>
        </div>
    </div>

</div>
