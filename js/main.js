jQuery(document).ready(function ($) {

	$('.hero_carousel').owlCarousel({
    autoplay: false,
    items: 1,
    loop: true,
    dots: true,
    dotsContainer: '#custom_dots',
    nav: false,
    autoplayTimeout: 7000,
    autoplaySpeed: 2000
  }); 

  $('.owl-dot').click(function () {
	  $('.hero_carousel').trigger('to.owl.carousel', [$(this).index(), 300]);
	});

});