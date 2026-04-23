/**
 * Frontend script for Best Sellers Carousel block.
 *
 * Swiper is enqueued as a UMD bundle via PHP (wp_enqueue_script),
 * so it is available as window.Swiper — no dynamic import() needed,
 * which avoids webpack treating the CDN URL as a local chunk.
 */

document.addEventListener("DOMContentLoaded", () => {
	const blocks = document.querySelectorAll(
		".wp-block-ai-zippy-child-best-sellers[data-swiper-config]",
	);
	if (blocks.length === 0) return;

	// Swiper UMD is loaded via wp_enqueue_script in render.php callback
	const SwiperClass = window.Swiper;
	if (!SwiperClass) {
		console.warn("Best Sellers: Swiper not found on window.");
		return;
	}

	blocks.forEach((block) => {
		const config = JSON.parse(block.dataset.swiperConfig || "{}");
		const swiperEl = block.querySelector(".bs__swiper");
		if (!swiperEl) return;

		const options = {
			slidesPerView: 1.4,
			spaceBetween: 16,
			loop: config.loop ?? true,
			navigation: {
				prevEl: block.querySelector(".bs__nav-prev"),
				nextEl: block.querySelector(".bs__nav-next"),
			},
			breakpoints: {
				480: { slidesPerView: 2.6, spaceBetween: 16 },
				768: {
					slidesPerView: Math.min(config.slidesPerView ? config.slidesPerView + 0.6 : 3.6, 3.6),
					spaceBetween: 20,
				},
				1024: {
					slidesPerView: config.slidesPerView ? config.slidesPerView + 0.8 : 3.8,
					spaceBetween: 36,
				},
			},
      mousewheel: {
				invert: false,
				sensitivity: 1,
				releaseOnEdges: true, // Allows page scrolling once the slider reaches the last slide
			},
		};

		if (config.autoplay) {
			options.autoplay = {
				delay: config.autoplayDelay ?? 4000,
				disableOnInteraction: false,
			};
		}

		new SwiperClass(swiperEl, options);
	});
});
