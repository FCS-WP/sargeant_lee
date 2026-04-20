<?php
/**
 * Contact & Reservations block render template.
 *
 * @var array $attributes Block attributes.
 */

defined('ABSPATH') || exit;

$eyebrow        = !empty($attributes['eyebrow'])       ? esc_html($attributes['eyebrow'])       : '';
$heading        = !empty($attributes['heading'])       ? esc_html($attributes['heading'])       : '';
$outlets        = !empty($attributes['outlets'])       ? $attributes['outlets']                 : [];
$form_heading   = !empty($attributes['formHeading'])   ? esc_html($attributes['formHeading'])   : '';
$form_shortcode = !empty($attributes['formShortcode']) ? $attributes['formShortcode']            : '';
$padding_top    = !empty($attributes['paddingTop'])    ? esc_attr($attributes['paddingTop'])    : '80px';
$padding_bottom = !empty($attributes['paddingBottom']) ? esc_attr($attributes['paddingBottom']) : '80px';

$inline_style = '--cr-pt:' . $padding_top . ';--cr-pb:' . $padding_bottom . ';';
?>
<div <?php echo get_block_wrapper_attributes(['class' => 'cr', 'style' => $inline_style]); ?>>
    <div class="cr__inner">

        <!-- ---- Left column ---- -->
        <div class="cr__left">

            <?php if ($eyebrow || $heading) : ?>
                <div class="cr__header">
                    <?php if ($eyebrow) : ?>
                        <div class="cr__eyebrow">
                            <span class="cr__eyebrow-line" aria-hidden="true"></span>
                            <span class="cr__eyebrow-text"><?php echo $eyebrow; ?></span>
                        </div>
                    <?php endif; ?>
                    <?php if ($heading) : ?>
                        <h2 class="cr__heading"><?php echo $heading; ?></h2>
                    <?php endif; ?>
                </div>
            <?php endif; ?>

            <?php if (!empty($outlets)) : ?>
                <div class="cr__outlets">
                    <?php foreach ($outlets as $outlet) :
                        $name          = !empty($outlet['name'])         ? esc_html($outlet['name'])         : '';
                        $contact       = !empty($outlet['contact'])      ? $outlet['contact']                : '';
                        $hours         = !empty($outlet['hours'])        ? $outlet['hours']                  : '';
                        $reserve_url   = !empty($outlet['reserveUrl'])   ? esc_url($outlet['reserveUrl'])    : '#';
                        $reserve_label = !empty($outlet['reserveLabel']) ? esc_html($outlet['reserveLabel']) : 'Reserve Now';
                        $contact_lines = $contact ? array_filter(explode("\n", $contact)) : [];
                        $hours_lines   = $hours   ? array_filter(explode("\n", $hours))   : [];
                    ?>
                        <div class="cr__outlet">
                            <?php if ($name) : ?>
                                <h3 class="cr__outlet-name"><?php echo $name; ?></h3>
                            <?php endif; ?>
                            <div class="cr__outlet-body">
                                <?php if (!empty($contact_lines)) : ?>
                                    <div class="cr__outlet-contact">
                                        <?php foreach ($contact_lines as $line) : ?>
                                            <p><?php echo esc_html($line); ?></p>
                                        <?php endforeach; ?>
                                    </div>
                                <?php endif; ?>
                                <div class="cr__outlet-right">
                                    <?php if (!empty($hours_lines)) : ?>
                                        <div class="cr__outlet-hours">
                                            <?php foreach ($hours_lines as $line) : ?>
                                                <p><?php echo esc_html($line); ?></p>
                                            <?php endforeach; ?>
                                        </div>
                                    <?php endif; ?>
                                    <a class="cr__reserve-btn" href="<?php echo $reserve_url; ?>">
                                        <?php echo $reserve_label; ?>
                                    </a>
                                </div>
                            </div>
                        </div>
                    <?php endforeach; ?>
                </div>
            <?php endif; ?>

        </div>

        <!-- ---- Right column ---- -->
        <div class="cr__right">
            <?php if ($form_heading) : ?>
                <h2 class="cr__form-heading"><?php echo $form_heading; ?></h2>
            <?php endif; ?>
            <?php if ($form_shortcode) : ?>
                <div class="cr__form">
                    <?php echo do_shortcode($form_shortcode); ?>
                </div>
            <?php endif; ?>
        </div>

    </div>
</div>
