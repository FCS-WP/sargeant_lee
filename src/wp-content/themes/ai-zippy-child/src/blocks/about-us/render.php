<?php
/**
 * About Us block render template.
 *
 * @var array $attributes
 */

if (!defined('ABSPATH')) {
    exit;
}

$eyebrow        = !empty($attributes['eyebrow'])       ? esc_html($attributes['eyebrow'])       : '';
$heading        = !empty($attributes['heading'])       ? esc_html($attributes['heading'])       : '';
$content        = !empty($attributes['content'])       ? $attributes['content']                 : '';
$button_label   = !empty($attributes['buttonLabel'])   ? esc_html($attributes['buttonLabel'])   : '';
$button_url     = !empty($attributes['buttonUrl'])     ? esc_url($attributes['buttonUrl'])      : '#';
$image1_url     = !empty($attributes['image1Url'])     ? esc_url($attributes['image1Url'])      : '';
$image2_url     = !empty($attributes['image2Url'])     ? esc_url($attributes['image2Url'])      : '';
$padding_top    = !empty($attributes['paddingTop'])    ? esc_attr($attributes['paddingTop'])    : '80px';
$padding_bottom = !empty($attributes['paddingBottom']) ? esc_attr($attributes['paddingBottom']) : '80px';

// Split content by blank lines into paragraphs
$paragraphs = $content ? array_filter(preg_split('/\n{2,}/', $content)) : [];
?>
<div <?php echo get_block_wrapper_attributes(['class' => 'au', 'style' => '--au-pt:' . $padding_top . ';--au-pb:' . $padding_bottom . ';']); ?>>
    <div class="au__inner">

        <!-- Left: stacked images -->
        <div class="au__images">
            <?php if ($image1_url) : ?>
                <div class="au__img-back">
                    <img
                        class="au__img"
                        src="<?php echo $image1_url; ?>"
                        alt=""
                        loading="lazy"
                    />
                </div>
            <?php endif; ?>
            <?php if ($image2_url) : ?>
                <div class="au__img-front">
                    <img
                        class="au__img"
                        src="<?php echo $image2_url; ?>"
                        alt=""
                        loading="lazy"
                    />
                </div>
            <?php endif; ?>
        </div>

        <!-- Right: text content -->
        <div class="au__content">
            <?php if ($eyebrow || $heading) : ?>
                <div class="au__header">
                    <?php if ($eyebrow) : ?>
                        <div class="au__eyebrow" aria-label="<?php echo $eyebrow; ?>">
                            <span class="au__eyebrow-line" aria-hidden="true"></span>
                            <span class="au__eyebrow-text"><?php echo $eyebrow; ?></span>
                        </div>
                    <?php endif; ?>

                    <?php if ($heading) : ?>
                        <h2 class="au__heading"><?php echo $heading; ?></h2>
                    <?php endif; ?>
                </div>
            <?php endif; ?>

            <?php if (!empty($paragraphs)) : ?>
                <div class="au__body">
                    <?php foreach ($paragraphs as $para) : ?>
                        <p><?php echo esc_html(trim($para)); ?></p>
                    <?php endforeach; ?>
                </div>
            <?php endif; ?>

            <?php if ($button_label) : ?>
                <a class="au__btn" href="<?php echo $button_url; ?>">
                    <?php echo $button_label; ?>
                </a>
            <?php endif; ?>
        </div>

    </div>
</div>
