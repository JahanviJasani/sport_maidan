jQuery(document).ready(function ($) {

	$('.hero_carousel').owlCarousel({
    autoplay: false,
    loop: true,
    dots: true,
    dotsContainer: '#custom_dots',
    nav: false,
    autoplayTimeout: 7000,
    autoplaySpeed: 2000,
    items: 1
  }); 

  $('.owl-dot').click(function () {
	  $('.hero_carousel').trigger('to.owl.carousel', [$(this).index(), 300]);
	});

});