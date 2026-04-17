<?php
/**
 * Outlet Cards block render template.
 *
 * @var array $attributes
 */

if (!defined('ABSPATH')) {
    exit;
}

$cards = !empty($attributes['cards']) && is_array($attributes['cards'])
    ? $attributes['cards']
    : [];

if (empty($cards)) {
    return;
}

$bg_url        = !empty($attributes['bgUrl'])        ? esc_url($attributes['bgUrl'])             : '';
$padding_top    = !empty($attributes['paddingTop'])    ? esc_attr($attributes['paddingTop'])    : '60px';
$padding_bottom = !empty($attributes['paddingBottom']) ? esc_attr($attributes['paddingBottom']) : '60px';

$inline_styles = '--oc-pt:' . $padding_top . ';--oc-pb:' . $padding_bottom . ';';
if ($bg_url) {
    $inline_styles .= '--oc-bg:url(\'' . $bg_url . '\');';
}
?>
<div <?php echo get_block_wrapper_attributes(['class' => 'oc', 'style' => $inline_styles]); ?>>
    <div class="oc__section-bg" aria-hidden="true"></div>
    <div class="oc__grid">
        <?php foreach ($cards as $card) :
            $image_url  = !empty($card['imageUrl'])  ? esc_url($card['imageUrl'])  : '';
            $logo_url   = !empty($card['logoUrl'])   ? esc_url($card['logoUrl'])   : '';
            $heading    = !empty($card['heading'])   ? esc_html($card['heading'])  : '';
            $link_url   = !empty($card['linkUrl'])   ? esc_url($card['linkUrl'])   : '#';
            $link_label = !empty($card['linkLabel']) ? esc_html($card['linkLabel']) : __('See More', 'ai-zippy-child');
        ?>
            <div class="oc__card">
                <?php if ($image_url) : ?>
                    <img
                        class="oc__bg"
                        src="<?php echo $image_url; ?>"
                        alt=""
                        aria-hidden="true"
                        loading="lazy"
                    />
                <?php endif; ?>

                <div class="oc__overlay" aria-hidden="true"></div>

                <div class="oc__body">
                    <?php if ($logo_url) : ?>
                        <div class="oc__logo-wrap">
                            <img
                                class="oc__logo"
                                src="<?php echo $logo_url; ?>"
                                alt=""
                                loading="lazy"
                                aria-hidden="true"
                            />
                        </div>
                    <?php else : ?>
                        <div class="oc__logo-placeholder"></div>
                    <?php endif; ?>

                    <?php if ($heading) : ?>
                        <h2 class="oc__heading"><?php echo nl2br($heading); ?></h2>
                    <?php endif; ?>

                    <a class="oc__btn" href="<?php echo $link_url; ?>">
                        <?php echo $link_label; ?>
                    </a>
                </div>
            </div>
        <?php endforeach; ?>
    </div>
</div>
