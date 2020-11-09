/*
Copyright (c) 2017 Project Name
------------------------------------------------------------------
[Master Javascript]

Project:	locksmith landing page

-------------------------------------------------------------------*/

(function ($) {
	"use strict";
	var locksmith = {
		initialised: false,
		version: 1.0,
		locksmith: false,
		init: function () {

			if(!this.initialised) {
				this.initialised = true;
			} else {
				return;
			}

			/*-------------- locksmith Functions Calling ---------------------------------------------------
			------------------------------------------------------------------------------------------------*/
			this.banner();
			this.Map_function();
			this.smooth_scroll();
			this.home_banner_slider();
			this.gallery();
			this.countdown();
			this.scroll_top();
			this.Mailfunction();
			this.responsive_menu();
				
		},
		
		/*-------------- locksmith Functions definition ---------------------------------------------------
		---------------------------------------------------------------------------------------------------*/
		
			 banner: function(){
				if($(".ed_slider").length){ 
					$( ".ed_slider" ).each(function( index ) {
					 var id = $(this).attr("id"); 
					 var responsive_items = $(this).attr("data_responsive_item");
					 var data_slides_margin = $(this).attr("data_slides_margin");
					 var tmp = responsive_items.split(",");
					 var no_of_item = 4;
					 var auto_slide_time = 5000;
					 var show_bullet = true;
					 var loop = true;
					 var autoplay = true;   
					 var data_auto_slide_time = $(this).attr("data_auto_slide_time");
					 var data_number_of_item = $(this).attr("data_number_of_item");
					 var data_show_bullets = $(this).attr("data_show_bullets");
					 var data_loop = $(this).attr("data_loop");
					 var data_autoplay = $(this).attr("data_autoplay");
					 if(data_autoplay !== undefined){
					  if(data_autoplay === "no"){
					   autoplay = false;
					  }
					 }
					 if(data_loop !== undefined){
					  if(data_loop === "no"){
					   loop = false;
					  }
					 }
					 if(data_show_bullets !== undefined){
					  if(data_show_bullets === "no"){
					   show_bullet = false;
					  }
					 }
					 if(data_number_of_item !== undefined){
					  no_of_item = data_number_of_item;
					 }
					 if(data_auto_slide_time !== undefined){
					  auto_slide_time = data_auto_slide_time;
					 }
					 $("#"+id).owlCarousel({
					  items:no_of_item,
					  loop:loop,
					  margin:parseInt(data_slides_margin),
					  dots:show_bullet,
					  mouseDrag:false,
					  touchDrag:false,
					  autoplay:autoplay,
					  autoplayTimeout:auto_slide_time,
					  pullDrag:false,
					  freeDrag:false,
					  responsive:{
					   0:{
						items:tmp[0]        
					   },
					   600:{
						items:tmp[1]
					   },
					   768:{
						items:tmp[2]
					   },
					   1000:{
						items:no_of_item
					   }
					  }
					 });  
				   });
				}
			},
			Map_function: function () {
			   if($(".ed_map").length){
				  $( ".ed_map" ).each(function( index ) {
				  var id = $(this).attr("id");
				  var address = $(this).attr("data-address");
				  $(this).googleMap({
				   scrollwheel:true
				  });
				  $(this).addMarker({
					//coords: [22.9622672, 76.05079490000003] // for using lat long for marker
					address:address
				  });
				}); 
			   }
			  },
			smooth_scroll: function(){
				 jQuery.scrollSpeed(100, 800);
			},
			home_banner_slider: function(){
				if($('.in_slider_wrapper .owl-carousel').length > 0){
				var owl_home = $('.in_slider_wrapper .owl-carousel');
				$('.in_slider_wrapper .owl-carousel').owlCarousel({
					smartSpeed:1200,
					items:1,
					margin:10,
					loop:true,
					animateIn: 'fadeIn',
					dots:false,
					navText:['<i class="fa fa-angle-left" aria-hidden="true"></i>','<i class="fa fa-angle-right" aria-hidden="true"></i>'],
					nav:true,
					mouseDrag:false,
					touchDrag:false,
					autoplay:true		
					});
				
				owl_home.on('changed.owl.carousel',function(property){
					$(this).find('.in_slider').addClass('loaded');
					setTimeout(function(){
						$('.in_slider').removeClass('loaded');	
					},1000);
				});	
			}	
			},
			gallery: function(){
				$('.image-link').magnificPopup({
				  type: 'image',
				  gallery:{
					enabled:true
				  },
				   mainClass: 'mfp-with-zoom', // this class is for CSS animation below

				  zoom: {
					enabled: true, 
					duration: 300,
					easing: 'ease-in-out',

					opener: function(openerElement) {
					  return openerElement.is('img') ? openerElement : openerElement.find('img');
					}
				  }
				});
				$('.refeshment-gallery').magnificPopup({
				  type: 'image',
				  gallery:{
					enabled:true
				  },
				   mainClass: 'mfp-with-zoom', // this class is for CSS animation below

				  zoom: {
					enabled: true, 
					duration: 300,
					easing: 'ease-in-out',

					opener: function(openerElement) {
					  return openerElement.is('img') ? openerElement : openerElement.find('img');
					}
				  }
				});
			},
			countdown: function(){
				$('.timer').appear(function() {
				 $(this).countTo();
				}); 
			},
			scroll_top: function(){
				if ($('#back-to-top').length) {
					var scrollTrigger = 100, // px
						backToTop = function () {
							var scrollTop = $(window).scrollTop();
							if (scrollTop > scrollTrigger) {
								$('#back-to-top').addClass('show');
							} else {
								$('#back-to-top').removeClass('show');
							}
						};
					backToTop();
					$(window).on('scroll', function () {
						backToTop();
					});
					$('#back-to-top').on('click', function (e) {
						e.preventDefault();
						$('html,body').animate({
							scrollTop: 0
						}, 700);
					});
				}
			},
			Mailfunction: function() {
				$('#submit').on('click', function() {
					var un = $('#name').val();
					var em = $('#email').val();
					var ad = $('#address').val();
					var ph = $('#phone').val();
					var meesg = $('#message').val();
					console.log(un + ' ' + em + ' ' + ad +' '+ ph + ' ' + meesg);
					$.ajax({
						type: "POST",
						url: "ajaxmail.php",
						data: {
							'username': un,
							'useremail': em,
							'address': ad,
							'phone': ph,
							'message': meesg,
						},
						success: function(msg) {
							console.log(msg);
							var full_msg = msg.split("#");
							if (full_msg[0] == '1') {
								$('#name').val("");
								$('#email').val("");
								$('#address').val("");
								$('#phone').val("");
								$('#message').val("");
								$('#err1').html(full_msg[1]);
							} else {
								$('#name').val(un);
								$('#email').val(em);
								$('#address').val(ad);
								$('#phone').val(ph);
								$('#message').val(meesg);
								$('#err1').html(full_msg[1]);
							}
						}
					});
				});
			},
			responsive_menu:function(){
				 $(".in_menu>ul>li").find('.submenu').parent().addClass('dropdown');
				 $(".in_menu>ul>li.dropdown").append('<div class="show-submenu"><i class="fa fa-angle-down"></i></div>');

				$(".in_menu>ul>li.dropdown").on("click", ".show-submenu", function(e) {
					e.stopPropagation();
					
					$(this).html($(this).html() == '<i class="fa fa-angle-down"></i>' ? '<i class="fa fa-angle-up"></i>' : '<i class="fa fa-angle-down"></i>');
				});
				
				$('.in_menu>ul>li.dropdown .show-submenu').click(function() {
					$('.in_menu>ul>li.dropdown .show-submenu').not($(this)).
					parent().find('.submenu').hide();
					$(this).parent().find('.submenu').toggle();
				});
			},
	};
	
	$(document).ready(function() {
	 locksmith.init();
	 });
	 
	 $(window).load(function(){
		var h=($( window ).height());
		$(".coming_soon_wrapper").css("height",h);
		$(".coming_soon").css("height",h);
		
		setTimeout(function() {
			$('body').addClass('cafe_site_loaded');	
		});
	 });

})(jQuery);

function updateTimer(deadline){
	var time = deadline - new Date(); //return differens between now and deadline
	return {
		'days': Math.floor(time/(1000*60*60*24)),
		'hours': Math.floor((time/(1000*60*60))%24),
		'minutes': Math.floor((time/1000/60)%60),
		'seconds': Math.floor((time/1000)%60),
		'total': time
	};
};

function animateClock(span){
	span.className = "turn";
	setTimeout(function(){
		span.className = "";
	}, 700);
}

function startTimer(id, deadline){
	var timerInterval = setInterval(function(){
		var clock = document.getElementById(id); //store element
		var timer = updateTimer(deadline);

		clock.innerHTML = '<span>' + timer.days + '</span>'  //put in clock element our time
						+ '<span>' + timer.hours + '</span>'
						+ '<span>' + timer.minutes + '</span>'
						+ '<span>' + timer.seconds + '</span>';
		
		var spans = clock.getElementsByTagName("span");
		animateClock(spans[3]);
		if (timer.seconds == 59) animateClock(spans[2]);
		if (timer.minutes == 59 && timer.seconds == 59) animateClock(spans[1]);
		if (timer.hours == 23 && timer.minutes == 59 && timer.seconds == 59) animateClock(spans[0]);
		
	if (timer.total < 1) {
		clearInterval(timerInterval);
		clock.innerHTML = '<span>0</span><span>0</span><span>0</span><span>0</span>';
	}					

	}, 1000);
};

window.onload = function(){
	var deadline = new Date("November 10, 2022 10:10:00");
	if($('#clock').length){
		startTimer('clock', deadline);
	}
	
}



	