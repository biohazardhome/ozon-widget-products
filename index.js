document.addEventListener('DOMContentLoaded', async () => {
	let widget = new Widget;
	await widget.init();

	let swiper = new Swiper('.widget-product .swiper', {
        slidesPerView: 1,
        lazyPreloadPrevNext: 1,
        mousewheel: true,
        loop: true,
        on: {
            init: function() {
                this.autoplay.stop();
            },
        }
    });

    let products = document.querySelectorAll('.widget-product .swiper');
    products.forEach(function(el, index) {
        el.addEventListener('mousemove', function(e) {
            let sw = swiper[index],
                widthPerSlide = sw.width / sw.slides.length,
                slideIndex = e.offsetX / widthPerSlide;

            sw.slideTo(slideIndex, 0);

            e.stopPropagation();
        });

        el.addEventListener('mouseleave', function() {
            swiper[index].slideTo(0, 0);
        });
    });
});