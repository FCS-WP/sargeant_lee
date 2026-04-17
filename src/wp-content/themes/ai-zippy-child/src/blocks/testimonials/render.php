<?php
/**
 * Testimonials block render template.
 *
 * @var array $attributes Block attributes.
 */

defined('ABSPATH') || exit;

$heading        = !empty($attributes['heading'])       ? esc_html($attributes['heading'])       : '';
$bg_url         = !empty($attributes['bgUrl'])         ? esc_url($attributes['bgUrl'])           : '';
$mode           = ($attributes['mode'] ?? 'custom') === 'shortcode' ? 'shortcode' : 'custom';
$shortcode      = !empty($attributes['shortcode'])     ? $attributes['shortcode']                : '';
$items          = !empty($attributes['items'])         ? $attributes['items']                    : [];
$padding_top    = !empty($attributes['paddingTop'])    ? esc_attr($attributes['paddingTop'])     : '80px';
$padding_bottom = !empty($attributes['paddingBottom']) ? esc_attr($attributes['paddingBottom'])  : '80px';

$inline_style = '--tm-pt:' . $padding_top . ';--tm-pb:' . $padding_bottom . ';';
if ($bg_url) {
    $inline_style .= "--tm-bg:url('" . $bg_url . "');";
}
?>
<div <?php echo get_block_wrapper_attributes(['class' => 'tm', 'style' => $inline_style]); ?>>
    <div class="tm__bg" aria-hidden="true"></div>
    <div class="tm__inner">

        <?php if ($heading) : ?>
            <h2 class="tm__heading"><?php echo $heading; ?></h2>
        <?php endif; ?>

        <?php if ($mode === 'shortcode') : ?>
            <?php if ($shortcode) : ?>
                <div class="tm__shortcode">
                    <?php echo do_shortcode($shortcode); ?>
                </div>
            <?php endif; ?>
        <?php elseif (!empty($items)) : ?>
            <div class="tm__grid">
                <?php foreach ($items as $item) :
                    $quote  = !empty($item['quote'])  ? esc_html($item['quote'])  : '';
                    $author = !empty($item['author']) ? esc_html($item['author']) : '';
                    $rating = isset($item['rating'])  ? (int) $item['rating']     : 5;
                    $rating = max(1, min(5, $rating));
                ?>
                    <div class="tm__card">
                        <div class="tm__card-quote">
                            <span class="tm__quote-icon" aria-hidden="true">&ldquo;</span>
                            <?php if ($quote) : ?>
                                <p class="tm__quote"><?php echo $quote; ?></p>
                            <?php endif; ?>
                        </div>
                        <div class="tm__card-footer">
                            <?php if ($author) : ?>
                                <p class="tm__author"><?php echo $author; ?></p>
                            <?php endif; ?>
                            <div class="tm__stars" aria-label="<?php echo $rating; ?> out of 5 stars">
                                <?php for ($i = 1; $i <= 5; $i++) : ?>
                                    <span class="tm__star<?php echo $i <= $rating ? ' tm__star--on' : ''; ?>">&#9733;</span>
                                <?php endfor; ?>
                            </div>
                        </div>
                    </div>
                <?php endforeach; ?>
            </div>
        <?php endif; ?>

    </div>
</div>
