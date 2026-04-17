<?php
/**
 * Outlet Feature block render template.
 *
 * @var array $attributes Block attributes.
 */

defined('ABSPATH') || exit;

$eyebrow        = !empty($attributes['eyebrow'])       ? esc_html($attributes['eyebrow'])       : '';
$heading        = !empty($attributes['heading'])       ? esc_html($attributes['heading'])       : '';
$content        = !empty($attributes['content'])       ? $attributes['content']                 : '';
$image1_url     = !empty($attributes['image1Url'])     ? esc_url($attributes['image1Url'])      : '';
$image2_url     = !empty($attributes['image2Url'])     ? esc_url($attributes['image2Url'])      : '';
$layout         = in_array($attributes['layout'] ?? '', ['text-left', 'text-right'], true)
                    ? $attributes['layout']
                    : 'text-left';
$show_border    = !empty($attributes['showBorder']);
$padding_top    = !empty($attributes['paddingTop'])    ? esc_attr($attributes['paddingTop'])    : '80px';
$padding_bottom = !empty($attributes['paddingBottom']) ? esc_attr($attributes['paddingBottom']) : '80px';

$paragraphs = $content ? array_filter(preg_split('/\n{2,}/', $content)) : [];

$wrapper_classes = 'of of--' . $layout . ($show_border ? ' of--border' : '');
$inline_style    = '--of-pt:' . $padding_top . ';--of-pb:' . $padding_bottom . ';';
?>
<div <?php echo get_block_wrapper_attributes(['class' => $wrapper_classes, 'style' => $inline_style]); ?>>
    <div class="of__inner">

        <?php
        // Render images column
        $images_col = function() use ($image1_url, $image2_url) { ?>
            <div class="of__images">
                <div class="of__img-primary">
                    <?php if ($image1_url) : ?>
                        <img class="of__img" src="<?php echo $image1_url; ?>" alt="" loading="lazy" />
                    <?php endif; ?>
                </div>
                <div class="of__img-secondary">
                    <?php if ($image2_url) : ?>
                        <img class="of__img" src="<?php echo $image2_url; ?>" alt="" loading="lazy" />
                    <?php endif; ?>
                </div>
            </div>
        <?php };

        // Render text column
        $text_col = function() use ($eyebrow, $heading, $paragraphs) { ?>
            <div class="of__content">
                <?php if ($eyebrow || $heading) : ?>
                    <div class="of__header">
                        <?php if ($eyebrow) : ?>
                            <div class="of__eyebrow">
                                <span class="of__eyebrow-line" aria-hidden="true"></span>
                                <span class="of__eyebrow-text"><?php echo $eyebrow; ?></span>
                            </div>
                        <?php endif; ?>
                        <?php if ($heading) : ?>
                            <h2 class="of__heading"><?php echo $heading; ?></h2>
                        <?php endif; ?>
                    </div>
                <?php endif; ?>

                <?php if (!empty($paragraphs)) : ?>
                    <div class="of__body">
                        <?php foreach ($paragraphs as $para) : ?>
                            <p><?php echo esc_html(trim($para)); ?></p>
                        <?php endforeach; ?>
                    </div>
                <?php endif; ?>
            </div>
        <?php };

        if ($layout === 'text-left') {
            $text_col();
            $images_col();
        } else {
            $images_col();
            $text_col();
        }
        ?>

    </div>
</div>
