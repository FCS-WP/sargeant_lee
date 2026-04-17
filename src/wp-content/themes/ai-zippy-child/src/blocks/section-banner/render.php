<?php
/**
 * Section Banner block render template.
 *
 * @var array $attributes Block attributes.
 */

defined('ABSPATH') || exit;

$heading        = !empty($attributes['heading'])       ? esc_html($attributes['heading'])     : '';
$bg_url         = !empty($attributes['bgUrl'])         ? esc_url($attributes['bgUrl'])         : '';
$padding_top    = !empty($attributes['paddingTop'])    ? esc_attr($attributes['paddingTop'])    : '100px';
$padding_bottom = !empty($attributes['paddingBottom']) ? esc_attr($attributes['paddingBottom']) : '100px';

$inline_styles = '--sb-pt:' . $padding_top . ';--sb-pb:' . $padding_bottom . ';';
if ($bg_url) {
    $inline_styles .= "--sb-bg:url('" . $bg_url . "');";
}
?>
<div <?php echo get_block_wrapper_attributes(['class' => 'sb', 'style' => $inline_styles]); ?>>
    <div class="sb__bg" aria-hidden="true"></div>
    <div class="sb__inner">
        <?php if ($heading) : ?>
            <h2 class="sb__heading"><?php echo $heading; ?></h2>
        <?php endif; ?>
    </div>
</div>
