jQuery(document).ready(function ($) {

	// Smoth scroll on page hash links
  $('a[href*="#"]:not([href="#"])').on('click', function () {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
    var target = $(this.hash);
    if (target.length) {

      if ($('#header').length) {
        top_space = $('#header').outerHeight();
      }

      $('html, body').animate({
        scrollTop: target.offset().top
      }, 1500, 'easeInOutExpo');

      if ($(this).parents('.nav-menu').length) {
        $('.nav-menu .menu-active').removeClass('menu-active');
        $(this).closest('li').addClass('menu-active');
      }

      if ($('body').hasClass('mobile-nav-active')) {
        $('body').removeClass('mobile-nav-active');
        $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
        $('#mobile-body-overly').fadeOut();
      }
      return false;
    }
    }
  });

  // Navigation active state on scroll
  // var nav_sections = $('section');
  // var main_nav = $('.nav-menu-container, .mobile-nav');
  // var main_nav_height = $('#header').outerHeight();
  // console.log(main_nav_height);

  // $(window).on('scroll', function() {
  //   var cur_pos = $(this).scrollTop();

  //   nav_sections.each(function() {
  //     var top = $(this).offset().top - 50;
  //     bottom = top + $(this).outerHeight();

  //     if (cur_pos >= top && cur_pos <= bottom) {
  //       main_nav.find('li').removeClass('menu-active');
  //       main_nav.find('a[href="#' + $(this).attr('id') + '"]').parent('li').addClass('menu-active');
  //     }
  //   });
  // });

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