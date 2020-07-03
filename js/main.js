jQuery(document).ready(function ($) {

  var prevScrollTop;
  $('#preloader').delay(500).fadeOut('slow');
  // $('#contact_form')[0].reset();

  // Sticky Header
	$(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $('.back-to-top').fadeIn('slow');
      $('.whatsapp').fadeIn('slow');
      $('#header').addClass('header-fixed');
    } else {
      $('.back-to-top').fadeOut('slow');
      $('.whatsapp').fadeOut('slow');
      $('#header').removeClass('header-fixed');
    }
  });

  $('.back-to-top').click(function () {
    $('html, body').animate({
      scrollTop: 0
    }, 1500, 'easeInOutExpo');
    return false;
  });

  // Mobile navigation
  if ($('#nav_menu_container').length) {
    var $mobile_nav = $('#nav_menu_container').clone().prop({
      id: 'mobile_nav'
    });
    $mobile_nav.find('> ul').attr({
      'class': '',
      'id': ''
    });
    $('body').append($mobile_nav);
    $('body').append('<div id="mobile_body_overly"></div>');

    $(document).on('click', '.mobile_nav_toggle', function (e) {
      $('body').toggleClass('mobile_nav_active');
      $('.mobile_nav_toggle').toggleClass('toggle_active');
      $('#mobile_body_overly').toggle();
    });

    $( window ).resize(function(e) {
      nav_close(e);
    });

    $(document).click(function (e) {
      nav_close(e);
    });

  } else if ($("#mobile_nav, .mobile_nav_toggle").length) {
    $("#mobile_nav, .mobile_nav_toggle").hide();
  }

  function nav_close(e) {
    var container = $("#mobile_nav, .mobile_nav_toggle");
    if (!container.is(e.target) && container.has(e.target).length === 0) {
      if ($('body').hasClass('mobile_nav_active')) {
        $('body').removeClass('mobile_nav_active');
        $('.mobile_nav_toggle').toggleClass('toggle_active');
        $('#mobile_body_overly').fadeOut();
      }
    }
  }

  // Smooth scroll on page hash links
  $('a[href*="#"]:not([href="#"],.nav_link)').on('click', function () {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
    var target = $(this.hash);
    if (target.length) {

      $('html, body').animate({
        scrollTop: target.offset().top
      }, 1500, 'easeInOutExpo');

      if ($(this).parents('.nav_menu').length) {
        $('.nav_menu .menu-active').removeClass('menu-active');
        $(this).closest('li').addClass('menu-active');
      }

      if ($('body').hasClass('mobile_nav_active')) {
        $('body').removeClass('mobile_nav_active');
        $('.mobile_nav_toggle').toggleClass('toggle_active');
        $('#mobile_body_overly').fadeOut();
      }
      return false;
    }
    }
  });

  // Hero carousel
  $('.hero_carousel').owlCarousel({
    autoplay: true,
    items: 1,
    loop: true,
    dots: false,
    nav: false,
    autoplayTimeout: 5000,
    autoplaySpeed: 1000
  }); 

  // Hero carousel indicators
  $('.owl-dot').click(function () {
    $('.hero_carousel').trigger('stop.owl.autoplay');
	  $('.hero_carousel').trigger('to.owl.carousel', [$(this).index(), 1000]);    
    setTimeout( function(){ 
      $('.hero_carousel').trigger('play.owl.autoplay');
    }  , 3000 );
	});

  // Contact form close button
  $(document).on('click', '.contact_close', function () {
    $('.contact_alert').fadeOut(200);
    $('#contact_loader').delay(500).fadeOut('slow');
  });

  // Events filter
  $('.events_nav a').click(function(){
    var events_nav = $(this).attr("data-nav");
    $('.'+events_nav+' li').removeClass('active');
    $(this).parent().addClass('active');
    var events_inner = $(this).attr("data-slide");
    $('.'+events_inner).hide();
    var activeTab = $(this).attr('href');
    $(activeTab).fadeIn();
    return false;
  });

  // Box carousel
  $('.box_carousel').owlCarousel({
    items: 1,
    loop: true,
    dots: false,
    nav: true,
    navText: ["<img src='img/prev.png' class='prev'>","<img src='img/next.png' class='next'>"]    
  });

  $('.bg_gurgaon').click(function(){
    $('.location_box').css('display','flex');
    $('.box_wrapper').fadeIn();
    window.oldScrollPos = $(window).scrollTop();

    $(window).on('scroll.scrolldisabler',function ( event ) {
       $(window).scrollTop( window.oldScrollPos );
       event.preventDefault();
    });
  });

  // Locations box close button
  $(document).on('click', '.lb_close', function () {
    $('.box_wrapper').fadeOut(200);
    $('.location_box').delay(300).fadeOut('slow');
    $(window).off('scroll.scrolldisabler');
  });

  // Corporate Logo carousel
  $('.corporate_logo_carousel').owlCarousel({
    autoplay: true,
    items: 1,
    loop: true,
    dots: false,
    nav: false,
    autoplayTimeout: 2000,
    autoplaySpeed: 2000,
    lazyload: true,
  }); 

  // Contact Form validation
  $('#contactForm').submit(function(event){
    var form = $(this);
    if(form[0].checkValidity() === false){    
      if(form[0][1].checkValidity() === false) {
        feedbackText($('.invalid-email'), form[0][1].value, "email id");
        $(form[0][1]).blur(function(){
            feedbackText($('.invalid-email'), form[0][1].value, "email id");
        });
      }
      if(form[0][2].checkValidity() === false) {
        feedbackText($('.invalid-phone'), form[0][2].value, "phone no.");
        $(form[0][2]).blur(function(){
            feedbackText($('.invalid-phone'), form[0][2].value, "phone no.");
        });
      }
      form.addClass('was-validated');
    }
    else{
      $('#contact_loader').css('display','flex'); 
      var jqxhr = $.post( "http://corporateolympics.sportsmaidan.com/api/sports/send_mail/",{ name: form[0][0].value, email: form[0][1].value, phoneno: form[0][2].value, message:  form[0][3].value} )
      .done(function() {
        $('#contact_loader .loader').css('display','none');
        $("#contact_error").css('display','none');
        $("#contact_success").css('display','flex')
      })
      .fail(function() {
        $('#contact_loader .loader').css('display','none');
        $("#contact_success").css('display','none');
        $("#contact_error").css('display','flex');
      })
      .always(function() {
        form[0].reset();
      });
      jqxhr.always(function() {
      });
    }
    event.preventDefault();
  });

  function feedbackText (element, value, text) {
    console.log(element);
    if(value == '') {
      element.html('Please enter your '+text);
    }
    else {
      element.html('Please enter a valid '+text); 
    }
  }

});