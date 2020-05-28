jQuery(document).ready(function ($) {

	$(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $('.back-to-top').fadeIn('slow');
      $('#header').addClass('header-fixed');
    } else {
      $('.back-to-top').fadeOut('slow');
      $('#header').removeClass('header-fixed');
    }
  });

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
    // $('#contact_loader .loader').css('display','block');
    $("#contact_success").css('display','flex')
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

  $(document).on('click', '.close', function () {
    $('.contact_alert').fadeOut(200);
    $('#contact_loader').delay(500).fadeOut('slow');
  });

});