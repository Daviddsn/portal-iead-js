/* ---------------------
	Custom Jquery
	--------------------- */
(function( $ ) {
	
	"use strict";

	var daycount_obj = {};
	var $window = $(window);
	
	$( document ).ready(function() {
		
		/* RTL Check */
		var url_test = window.location.pathname;
		if(window.location.href.indexOf("?RTL=1") > -1) {
			$('head .main-style').before('<link rel="stylesheet" href="css/bootstrap-rtl.css" type="text/css" />');
			$('body').addClass('rtl');
		}
		
		/* Page Loader */
		$window.load(function() {
			$(".page-loader").fadeOut("slow");
		});
		
		/*Page Scroll Speed*/
		if( $("body").attr("data-scrolldistance") ){
			var $scrolldistance = $("body").attr("data-scrolldistance") != '' ? $("body").attr("data-scrolldistance") : 50;
			var $scrolltime = $("body").attr("data-scrolltime") != '' ? $("body").attr("data-scrolltime") : 2000;
			var $scrollanimation = $("body").attr("data-scrollanimation") != '' ? $("body").attr("data-scrollanimation") : '';
			if( $scrolldistance && $scrolltime ){
				jQuery.scrollSpeed( $scrolldistance, $scrolltime, $scrollanimation);
			}
		}
		
		/*Paroller Background*/
		if( $('.paroller-bg').length ){
			$('.paroller-bg').paroller();
		}
		/*Paroller Foreground*/
		if( $('.paroller-fore').length ){
			$('.paroller-fore').paroller();
		}
		
		/*One Page Section Scroll*/
		if( $('#one-page-section-scroll').length ) {
		
			$('#one-page-section-scroll').sectionscroll({
				frame: "#one-page-section-scroll",
				container: "#one-page-section",
				sections: "section",
				speed: 1000,
				easing: "easeInOutQuad"
			});
		}
		
		/*Schortcode Items Spacing*/
		var css_out = '';
		if( $('div[data-spacing]') ){
			var spc_count = 1;
			var spacing = $('div[data-spacing]');
			$( spacing ).each(function( index ) {
				var c_spc_ele = $(this);
				var c_cspacing = c_spc_ele.attr( "data-spacing" );
				var spc_cls = 'dynamic-space-' + parseInt( spc_count++, 10 );
				c_spc_ele.addClass( spc_cls );
				c_cspacing = c_cspacing.split(" ");
				var i;
				for( i = 0; i < c_cspacing.length; i++ ){
					if( c_cspacing[i] != '-' ){
						css_out += ' .' + spc_cls + ' > *:nth-child('+ parseInt( ( i + 1 ), 10 ) +'){ margin-bottom: '+ c_cspacing[i] +' }';
					}
				}
			});
		}
		if( css_out != '' ){
			$('head').append( '<style id="theme-dynamic-styles">'+ css_out +'</style>' );
		}
		/* Full search toggle */
		if( $(".full-search-wrap").length ){
			$( document ).on('click', '.full-search-toggle', function(){
				$(".full-search-wrap").fadeToggle(500);
				return false;
			});
		}
		/*Responsive Check*/
		var res_from = $("body").attr("data-res-from") ? $("body").attr("data-res-from") : 768;
		zoacresResponsiveCheck(res_from);
		
		/*Bottom Search*/
		$( document ).on('click', '.bottom-search-switch', function(){
			$('.bottom-search').fadeToggle(300);
			$('.bottom-search').removeClass('hide');
			return false;			
		});
		
		/*Overlay Search*/
		$( document ).on('click', '.overlay-search-switch, .overlay-search-close', function(){
			$('.overlay-search').fadeToggle(300);
			$( '.overlay-search' ).removeClass('hide');
			return false;
		});
	  
		/*Expanding Search*/
		$( document ).on('click', '.expanding-search-switch', function(){
			var cur_item = $(this);
			cur_item.prev('.form-control').toggleClass('expanding');
			return false;
		});
		
		/*Full View Search*/
		if( $( '.full-view-switch' ).length ){
			var srch_height = $( '.full-view-switch' ).parents(".navbar, .logobar").height();
			$( '.full-view-wrapper .navbar-form.search-form .input-group > .form-control' ).css( 'height', srch_height );
			$( document ).on('click', '.full-view-switch, .full-view-close', function(){
				$('.full-view-wrapper').fadeToggle(300);
				$('.full-view-wrapper').removeClass('hide');
				return false;
			});
		}
	  
		/*Push Menu*/
		$( document ).on('click', '.push-menu-switch, .push-menu-close', function(){
			if( $('.sticky-nav-wrapper.left-push, .sticky-nav-wrapper.right-push' ).length ){
				$('body').toggleClass('push-active');
				return false;
			}
		});
		
		/*Push Overlay Menu*/
		$( document ).on('click', '.push-overlay-menu-switch, .push-overlay-menu-close', function(){
			if( $('.sticky-nav-wrapper.left-overlay, .sticky-nav-wrapper.right-overlay' ).length ){
				$('body').toggleClass('overlay-active');
				return false;
			}
		});
		
		/*Overlay Menu*/
		$( document ).on('click', '.overlay-menu-switch, .overlay-menu-close', function(){
			$('body').toggleClass('overlay-menu-active');
			$('.overlay-menu-wrapper').fadeToggle(300);
			return false;
		});
			
		/*Mobile Menu Area Making*/
		if( $( ".zmm-wrapper" ).length ){
			/*Zmm Process*/
			$window.resize(function() {
				if($window.width() >= res_from ){
				$( ".zmm-wrapper" ).animate( { left: "-100%" }, { duration: 800, specialEasing: { left: "easeInOutExpo" } } );
					$('body').removeClass('zmm-open');
				}
			});
			
			// Zmm Open
			$( document ).on( "click", "a.zmm-toggle", function() {
				$( ".zmm-wrapper" ).animate( { left: "0" }, { duration: 800, specialEasing: { left: "easeInOutExpo" } } );
				$('body').toggleClass('zmm-open');
				return false;
			});	
			
			// Zmm Close
			$( document ).on( "click", ".zmm-close", function() {
				$( ".zmm-wrapper" ).animate( { left: "-100%" }, { duration: 800, specialEasing: { left: "easeInOutExpo" } } );
				$('body').toggleClass('zmm-open');
				return false;
			});	

			//Main menu clone
			$( ".navbar-main" ).clone().appendTo('.zmm-wrapper .zmm-inner .zmm-main-nav');
			$(".zmm-main-nav .navbar-main").removeClass("theme-main-menu").addClass("theme-mobile-menu");
			
			//Add toggle dropdown icon
			$( ".zmm-wrapper .zmm-inner" ).find('.dropdown, .mega-dropdown-col').append( '<span class="zmm-dropdown-toggle ti-plus"></span>' );
			$( ".zmm-wrapper .zmm-inner" ).find('.dropdown-menu, .mega-dropdown-child').addClass( 'sub-nav' );
			
			//Remove unwanted class names in zmm-wrapper
			$( ".zmm-wrapper .zmm-inner" ).find('.nav, .navbar-nav, .dropdown, .dropdown-menu, .mega-dropdown, .mega-dropdown-menu, .mega-dropdown-child, .active, .dropdown-col-4, .dropdown-col-2, .dropdown-col-3, .dropdown-col-5, .mega-dropdown-col, .mega-dropdown-small, .basic-container, .mega-dropdown-medium, .clearfix').removeClass('dropdown dropdown-menu container mega-dropdown mega-dropdown-menu mega-dropdown-child active nav navbar-nav dropdown-col-4 dropdown-col-2 dropdown-col-3 dropdown-col-5 mega-dropdown-col clearfix mega-dropdown-small mega-dropdown-medium basic-container');
			$(".zmm-wrapper .zmm-inner li").removeClass (function (index, css) {
				return ( css.match (/\bcol-\S+/g) || [] ).join(' ');
			});
			
			//Replace megasub title
			$( ".mega-sub-title" ).each(function( index ) {
				var cur_item = $(this);
				cur_item.replaceWith( cur_item.html() );
			});
			//Replace caret
			$( "span.caret" ).each(function( index ) {
				var cur_item = $(this);
				cur_item.remove();
			});
			
			//zmm dropdown toggle
			$( ".zmm-wrapper .zmm-inner .zmm-dropdown-toggle" ).on( "click", function() {
				var cur_ele = $(this);
				var parent = cur_ele.parent('li').children('.sub-nav');
				cur_ele.parent('li').children('.sub-nav').slideToggle();
				cur_ele.toggleClass('ti-minus');
				if( $( parent ).find('.sub-nav').length ){
					$( parent ).find('.sub-nav').slideUp();
					$( parent ).find('.zmm-dropdown-toggle').removeClass('ti-minus');
				}
			});
		}
		
		/*Push Menu*/
		$( '.push-menu-switch, .push-menu-close' ).click(function() {
			if( $('.sticky-nav-wrapper.left-push, .sticky-nav-wrapper.right-push' ).length ){
				$('body').toggleClass('push-active');
				return false;
			}
		});
		
		/*Push Overlay Menu*/
		$( '.push-overlay-menu-switch, .push-overlay-menu-close' ).click(function() {
			if( $('.sticky-nav-wrapper.left-overlay, .sticky-nav-wrapper.right-overlay' ).length ){
				$('body').toggleClass('overlay-active');
				return false;
			}
		});
		
		/*Overlay Menu*/
		$( '.overlay-menu-switch, .overlay-menu-close' ).click(function() {
			$('body').toggleClass('overlay-menu-active');
			$('.overlay-menu-wrapper').fadeToggle(300);
			return false;
		});
		
		//Set background images
		if( $(".section-bg-img") ){
			zoacresSetSectionBgImg();
		}
		
		//Set background images
		if( $(".div-bg-img") ){
			zegenSetDivBgImg();
		}
		
		//Set background images
		if( $(".footer-bg-img") ){
			zegenSetFooterBgImg();
		}
		
		//Set custom background color
		if( $(".bg-custom-color") ){
			zoacresSetCustomBgColor();
		}

		// Using window smartresize instead of resize function
		$window.smartresize(function() {

			zoacresResponsiveCheck(res_from)
			
			// Header bar center item margin fun
			setTimeout( zoacresCenterMenuMargin, 300 ); 
			
			// Sticky element
			if( $('.header-inner .sticky-head').length ){
				zoacresStickyPart( '.header-inner' );
			}

			// Scroll 
			if( $('.header-inner .sticky-scroll').length ){
				setTimeout( zoacresStickyScrollUpPart( '.header-inner', 'header' ), 100 ); 
			}
					
			// Mobile header  menu
			if($('.mobile-header-inner .sticky-head').length){
				zoacresStickyPart( '.mobile-header-inner' );
			}
			
			// Mobile header scroll 
			if($('.mobile-header-inner .sticky-scroll').length){
				setTimeout( zoacresStickyScrollUpPart( '.mobile-header-inner', '.mobile-header' ), 100 ); 
			}
			
			//Portfolio code
			if( $( ".isotope-grid" ).length ){
				var parent_width = $( ".isotope-grid" ).width();
				var gutter_size = $( ".isotope-grid" ).data( "gutter" );
				var grid_cols = $( ".isotope-grid" ).data( "cols" );
				
				if( $window.width() < 768 ) grid_cols = 1;
				
				var net_width = Math.floor( ( parent_width - ( gutter_size * ( grid_cols - 1 ) ) ) / grid_cols );
				$( ".isotope-item" ).css({'width':net_width+'px', 'margin-bottom':gutter_size+'px'});
				
				var $grid = $('.isotope-grid').isotope({
					itemSelector: '.isotope-item',
					filter: '*',
					masonry: {
						gutter: gutter_size
					}
				});
			}
			
		});
		
		/* Counter Script */
		if( $( ".counter-up" ).length ){
			var counterUp = $( ".counter-up" );
			counterUp.appear(function() {
				var $this = $(this),
				countTo = $this.attr( "data-count" );
				$this.animate({left: '250px'});
				$({ countNum: $this.text()}).animate({
						countNum: countTo
					},
					{
					duration: 1000,
					easing: 'linear',
					step: function() {
						$this.text( Math.floor( this.countNum ) );
					},
					complete: function() {
						$this.text( this.countNum );
					}
				});  
			});
		}

		//Owl Carousel
		$( ".owl-carousel" ).each(function() {
			var cur_owl = $(this);
			zoacresOwlCarousel( cur_owl );
		});
		
		/* Contact Form Validation and Submit */	
		if( $('#contact-form').length ){

			$('#contact-form').bootstrapValidator({
				message: 'This value is not valid',
				feedbackIcons: {
					valid: 'fa fa-check',
					invalid: 'fa fa-times',
					validating: 'fa fa-refresh'
				},
				fields: {
					'name': {
						validators: {
							notEmpty: {
								message: 'The Name is required and cannot be empty'
							}
						}
					},
					'email': {
						validators: {
							notEmpty: {
								message: 'The email address is required'
							},
							emailAddress: {
								message: 'The email address is not valid'
							}
						}
					},
					'message': {
						validators: {
							notEmpty: {
								message: 'The Message is required and cannot be empty'
							}
						}
					},
					'hidden-grecaptcha': {
						validators: {
							notEmpty: {
								message: 'The Captcha must be validated'
							}
							/*choice: {
								min: 1,
								message: 'The Captcha must be validated'
							}*/
						}
					}
				},
				onSuccess: function(e) {
					e.preventDefault();
					var form_data = new FormData( $('#contact-form')[0] );
					
					// Use Ajax to submit form data
					$.ajax({
						url: $(e.target).attr('action'),
						type: 'POST',
						cache: false,
						processData: false,
						contentType: false,
						data: form_data,
						success: function(result) {
							$('#contact-status-msg').html(result);
							$('#contact-status-msg').fadeIn(500);
							$('#contact-status-msg').removeClass('hide');
							$('.contact-btn').removeAttr('disabled');
							$('#contact-form')[0].reset();
							grecaptcha.reset();
						}
					});
				}				
			});	
		}

		/* Contact Form 1 Validation and Submit */	
		if( $('#contact-form-1').length ){

			$('#contact-form-1').bootstrapValidator({
				message: 'This value is not valid',
				feedbackIcons: {
					valid: 'fa fa-check',
					invalid: 'fa fa-times',
					validating: 'fa fa-refresh'
				},
				fields: {
					'name': {
						validators: {
							notEmpty: {
								message: 'The Name is required and cannot be empty'
							}
						}
					},
					'email': {
						validators: {
							notEmpty: {
								message: 'The email address is required'
							},
							emailAddress: {
								message: 'The email address is not valid'
							}
						}
					}
				},
				onSuccess: function(e) {
					e.preventDefault();
					var form_data = new FormData( $('#contact-form-1')[0] );
					
					// Use Ajax to submit form data
					$.ajax({
						url: $(e.target).attr('action'),
						type: 'POST',
						cache: false,
						processData: false,
						contentType: false,
						data: form_data,
						success: function(result) {
							$('#contact-status-msg').html(result);
							$('#contact-status-msg').fadeIn(500);
							$('#contact-status-msg').removeClass('hide');
							$('.contact-btn').removeAttr('disabled');
							$('#contact-form-1')[0].reset();
						}
					});
				}
			});		
		}
		
		/* Contact Form 2 Validation and Submit */	
		if( $('#contact-form-2').length ){

			$('#contact-form-2').bootstrapValidator({
				message: 'This value is not valid',
				feedbackIcons: {
					valid: 'fa fa-check',
					invalid: 'fa fa-times',
					validating: 'fa fa-refresh'
				},
				fields: {
					'name': {
						validators: {
							notEmpty: {
								message: 'The Name is required and cannot be empty'
							}
						}
					},
					'email': {
						validators: {
							notEmpty: {
								message: 'The email address is required'
							},
							emailAddress: {
								message: 'The email address is not valid'
							}
						}
					},
					'message': {
						validators: {
							notEmpty: {
								message: 'The Message is required and cannot be empty'
							}
						}
					}
				},
				onSuccess: function(e) {
					e.preventDefault();
					var form_data = new FormData( $('#contact-form-2')[0] );
					
					// Use Ajax to submit form data
					$.ajax({
						url: $(e.target).attr('action'),
						type: 'POST',
						cache: false,
						processData: false,
						contentType: false,
						data: form_data,
						success: function(result) {
							$('#contact-status-msg').html(result);
							$('#contact-status-msg').fadeIn(500);
							$('#contact-status-msg').removeClass('hide');
							$('.contact-btn').removeAttr('disabled');
							$('#contact-form-2')[0].reset();
						}
					});
				}
			});		
		}

		/* Subscribe Form Validation and Submit */
		if( $('.subscribe-form').length ){
			$( ".subscribe-form" ).each(function() {
				var cur_subs_frm = $(this);
				cur_subs_frm.bootstrapValidator({
					message: 'This value is not valid',
					feedbackIcons: {
						valid: 'fa fa-check',
						invalid: 'fa fa-times',
						validating: 'fa fa-refresh'
					},
					fields: {
						mcemail: {
							validators: {
								notEmpty: {
									message: 'The email address is required'
								},
								emailAddress: {
									message: 'The email address is not valid'
								}
							}
						}
					},
					onSuccess: function(e) {
						e.preventDefault();
			
						var $form = $(e.target);
			
						// Use Ajax to submit form data
						$.ajax({
							url: $form.attr('action'),
							type: 'POST',
							data: $form.serialize(),
							success: function(result) {
								cur_subs_frm.find('.subscribe-status-msg').html(result);
								cur_subs_frm.find('.subscribe-status-msg').fadeIn(500);
								cur_subs_frm.find('.subscribe-status-msg').removeClass('hide');
								cur_subs_frm.find('.subscribe-btn').removeAttr('disabled');
							}
						});
					}
				});
			});
		}
		
		/*Pie Chart*/
		if( $(".pie-chart").length ){
			$(".pie-chart").each(function() {
				
				var cur_ele = $(this);
				var c_chart = $('#' + cur_ele.attr("id") );
				
				var chart_labels = c_chart.attr("data-labels");
				var chart_values = c_chart.attr("data-values");
				var chart_bgs = c_chart.attr("data-backgrounds");
				var chart_responsive = c_chart.attr("data-responsive");
				var chart_legend = c_chart.attr("data-legend-position");
				var chart_type = c_chart.attr("data-type");
				var chart_zorobegining = c_chart.attr("data-yaxes-zorobegining") ? c_chart.attr("data-yaxes-zorobegining") : 0;
				
				chart_labels = chart_labels ? chart_labels.split(",") : [];
				chart_values = chart_values ? chart_values.split(",") : [];
				chart_bgs = chart_bgs ? chart_bgs.split(",") : [];
				chart_responsive = chart_responsive ? chart_responsive : 1;
				chart_legend = chart_legend ? chart_legend : 'none';
				chart_type = chart_type ? chart_type : 'doughnut';
				
				if( chart_zorobegining ){
					chart_zorobegining = {
						yAxes: [{
							ticks: {
								beginAtZero: parseInt( chart_zorobegining, 10 )
							}
						}]
					}
				}
				
				var ctx = c_chart[0].getContext('2d');
				var myChart = new Chart(ctx, {
					type: chart_type,
					data: {
						labels: chart_labels,
						datasets: [{
							label: '# of Votes',
							data: chart_values,
							backgroundColor: chart_bgs,
							borderWidth: 1
						}]
					},
					options: {
						scales: chart_zorobegining,
						responsive: parseInt( chart_responsive, 10 ),
						legend: {
							position: chart_legend,
						}
					}
				});
			});
		}
		
		/*Bar Chart*/
		if( $(".bar-chart").length ){
			$(".bar-chart").each(function() {
			
				var cur_ele = $(this);
				var c_chart = $('#' + cur_ele.attr("id") );
				
				var chart_labels = c_chart.attr("data-labels");
				var chart_values = c_chart.attr("data-values");
				var chart_dlabels = c_chart.attr("data-setlable");
				var chart_bgs = c_chart.attr("data-backgrounds");
				var chart_responsive = c_chart.attr("data-responsive");
				var chart_legend = c_chart.attr("data-legend-position");
				var chart_zorobegining = c_chart.attr("data-yaxes-zorobegining");
				
				chart_dlabels = chart_dlabels ? chart_dlabels.split("|") : [];
				chart_values = chart_values ? chart_values.split("|") : [];
				chart_bgs = chart_bgs ? chart_bgs.split("|") : [];
				
				var datasets = [];
				$.each( chart_values, function( index, value ) {
					var ds_inner = {};
					ds_inner.data = value.split(",");
					ds_inner.label = chart_dlabels[index];
					ds_inner.fillColor = chart_bgs[index];
					ds_inner.backgroundColor = chart_bgs[index];
					datasets[index] = ds_inner;
				});
				
				chart_labels = chart_labels ? chart_labels.split(",") : [];
				chart_responsive = chart_responsive ? chart_responsive : 1;
				chart_legend = chart_legend ? chart_legend : 'none';
				
				if( chart_zorobegining ){
					chart_zorobegining = {
						yAxes: [{
							ticks: {
								beginAtZero: parseInt( chart_zorobegining, 10 )
							}
						}]
					}
				}
				
				var ctx = c_chart[0].getContext('2d');
				var myChart = new Chart(ctx, {
					type: 'bar',
					data: {
						labels: chart_labels,
						datasets: datasets
					},
					options: {
						scales: chart_zorobegining,
						responsive: parseInt( chart_responsive, 10 ),
						legend: {
							position: chart_legend,
						}
					}
				});
			});
		}
		
		/*Line Chart*/
		if( $(".line-chart").length ){
			$(".line-chart").each(function() {
			
				var cur_ele = $(this);
				var c_chart = $('#' + cur_ele.attr("id") );
				
				var chart_labels = c_chart.attr("data-labels");
				var chart_values = c_chart.attr("data-values");
				var chart_bg = c_chart.attr("data-background");
				var chart_border = c_chart.attr("data-border");
				var chart_fill = c_chart.attr("data-fill");
				var chart_zorobegining = c_chart.attr("data-yaxes-zorobegining");
				var chart_title = c_chart.attr("data-title-display");
				var chart_responsive = c_chart.attr("data-responsive");
				var chart_legend = c_chart.attr("data-legend-position");
				
				chart_labels = chart_labels ? chart_labels.split(",") : [];
				chart_values = chart_values ? chart_values.split(",") : [];
				chart_bg = chart_bg ? chart_bg : '';
				chart_border = chart_border ? chart_border : '';
				chart_fill = chart_fill ? chart_fill : 0;
				
				chart_zorobegining = chart_zorobegining ? chart_zorobegining : 1;
				chart_title = chart_title ? chart_title : 1;
				chart_responsive = chart_responsive ? chart_responsive : 1;
				chart_legend = chart_legend ? chart_legend : 'none';
				
				var ctx = c_chart[0].getContext('2d');
				var myChart = new Chart(ctx, {
					type: 'line',
					data: {
						labels: chart_labels,
						datasets: [{
							label: '# of Votes',
							data: chart_values,
							fill: parseInt( chart_fill, 10 ),
							backgroundColor: chart_bg,
							borderColor: chart_border,
							borderWidth: 1
						}]
					},
					options: {
						scales: {
							yAxes: [{
								ticks: {
									beginAtZero: parseInt( chart_zorobegining, 10 )
								}
							}]
						},
						responsive: parseInt( chart_responsive, 10 ),
						legend: {
							position: chart_legend,
						},
						title: {
							display: parseInt( chart_title, 10 ),
						}
					}
				});
			});
		}
		
		/*Rain Drops*/
		if( $('.raindrops').length ){
			$(".raindrops").each(function() {
				var cur = $(this);
				var rain_height = cur.attr("data-rain-height") ? cur.attr("data-rain-height") : 100;
				var rain_color = cur.attr("data-rain-color") ? cur.attr("data-rain-color") : 100;
				cur.raindrops({color: rain_color, canvasHeight: rain_height, positionBottom:'100%'});
			});
		}
		
		/* Popup gallery */
		if( $('.popup-gallery').length ){
			$('.popup-gallery').magnificPopup({
				delegate: 'a.popup-img',
				type: 'image',
				tLoading: 'Loading image #%curr%...',
				mainClass: 'mfp-img-mobile',
				gallery: {
					enabled: true,
					navigateByImgClick: true,
					preload: [0,1] // Will preload 0 - before current, and 1 after the current image
				},
				image: {
					tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
					titleSrc: function(item) {
						var author_name = item.el.attr('data-author-name') ? item.el.attr('data-author-name') : '';
						return item.el.attr('title') + '<small>'+ author_name +'</small>';
					}
				}
			});
		}
		
		/* Zoom gallery */
		if( $('.zoom-gallery').length ){
			$('.zoom-gallery').magnificPopup({
				delegate: 'a.popup-img',
				type: 'image',
				closeOnContentClick: false,
				closeBtnInside: false,
				mainClass: 'mfp-with-zoom mfp-img-mobile',
				image: {
					tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
					titleSrc: function(item) {
						var author_name = item.el.attr('data-author-name') ? item.el.attr('data-author-name') : '';
						return item.el.attr('title') + '<small>'+ author_name +'</small>';
					},
					verticalFit: true,
				},
				gallery: {
					enabled: true
				},
				zoom: {
					enabled: true,
					duration: 300, // don't foget to change the duration also in CSS
					opener: function(element) {
						return element.find('img');
					}
				}
			});
		}
		
		// Popup video, map
		if( $('.popup-youtube, .popup-vimeo, .popup-gmaps, .popup-video, .popup-audio').length ){
			$('.popup-youtube, .popup-vimeo, .popup-gmaps, .popup-video, .popup-audio').magnificPopup({
				disableOn: 700,
				type: 'iframe',
				mainClass: 'mfp-fade',
				removalDelay: 160,
				preloader: false,
				fixedContentPos: false
			});
		}
		
		// Constellation Particles
		if( $('.constellation').length ){
			$(".constellation").each(function() {
				var cur_ele = $(this);
				
				var distance = cur_ele.attr("data-distance") ? cur_ele.attr("data-distance") : '';
				var len = cur_ele.attr("data-length") ? cur_ele.attr("data-length") : '';
				var rad = cur_ele.attr("data-radius") ? cur_ele.attr("data-radius") : '';
				var clr = cur_ele.attr("data-color") ? cur_ele.attr("data-color") : '';

				cur_ele.constellation({ 
					distance: distance, 
					length: len, 
					radius: 150, 
					star:{ 
						color: clr, 
						width:1 
					}, 
					line:{ 
						color: clr,
						width: 0.2 
					} 
				});
			});
		}
		
		// Typing text
		if( $('.typing-text').length ){
			$(".typing-text").each(function( i ) {
				var cur_ele = $(this);
				var typing_text = cur_ele.attr("data-typing") ? cur_ele.attr("data-typing") : [];
				if( typing_text ){
					typing_text = typing_text.split(",");
					
					var type_speed = cur_ele.attr("data-typespeed") ? cur_ele.attr("data-typespeed") : 0;
					var back_speed = cur_ele.attr("data-backspeed") ? cur_ele.attr("data-backspeed") : 0;
					var back_delay = cur_ele.attr("data-backdelay") ? cur_ele.attr("data-backdelay") : 500;
					var start_delay = cur_ele.attr("data-startdelay") ? cur_ele.attr("data-startdelay") : 1000;
					var loop = cur_ele.attr("data-loop") ? cur_ele.attr("data-loop") : false;

					var typed = new Typed(cur_ele[i], {
						strings: typing_text,
						typeSpeed: type_speed,
						backSpeed: back_speed,
						backDelay: back_delay,
						startDelay: start_delay,
						loop: loop
					});
				}
			});
		}
		
		// Event calender
		if( $('.event-calender').length ){
			var event_json = $('.event-calender').attr("data-events");
			var default_date = $('.event-calender').attr("data-default");

			$('.event-calender').fullCalendar({
				header: {
					left: 'prev,next',
					center: 'title',
					right: 'month,basicWeek,basicDay'
				},
				defaultDate: default_date,
				navLinks: true, // can click day/week names to navigate views
				editable: false,
				eventLimit: true, // allow "more" link when too many events
				displayEventTime: true,
				events: JSON.parse( event_json )
				
			});
		}
		
		/*Background Video*/
		if( $(".background-video").length ){
			$(".background-video").each(function( i ) {
				var cur_ele = $(this);
				var video_id = cur_ele.attr("data-id");
				cur_ele.YTPlayer({
					fitToBackground: true,
					videoId: video_id,
					pauseOnScroll: true
				});
			});
		}
		
		//Range Slider
		if( $('.range-slider').length ){
		
			var range_ele;
			var cp_obj = $( ".compare-others-wrap .compare-payment" );

			$('.range-slider').rangeslider({
				polyfill: false,
				onInit: function() { 
					compare_payment( cp_obj, $('.range-slider').val() );
				},
				onSlide: function(position, value) {
					$( range_ele ).text(value);
					compare_payment( cp_obj, value );
				},
			});
			var def_value = $('.range-slider').val();
			$( ".range-slider" ).next(".rangeslider").prepend( '<div class="rangeslider__parts"><div class="rangeslider__parts__part"></div><div class="rangeslider__parts__part"></div><div class="rangeslider__parts__part"></div></div>' );
			$( ".range-slider" ).next(".rangeslider").find(".rangeslider__handle").append( '<div class="rangeslider__tooltip__value"><span>$</span> <span class="range-value">'+ def_value +'</span><div>Transaction</div></div>');
			range_ele = $( ".range-slider" ).next(".rangeslider").find(".range-value");
		}

		/*Window Scroll Animation*/
		$window.scroll(function(){
			element_scroll_animation();
		});
	  
	}); // document ready end
	
	//Window Load
	$window.on('load', function() { 

		/*Responsive Check*/
		var res_from = $("body").attr("data-res-from") ? $("body").attr("data-res-from") : 768;
		
		// Header bar center item margin fun
		setTimeout( zoacresCenterMenuMargin, 300 );
		
		// Set  height for menu bars
		zoacresSetStickyOuterHeight();
		
		//Portfolio code
		if( $( ".isotope-grid" ).length ){
			$( ".isotope-grid" ).each(function( index ) {
				
				var cur_portfolio = $(this);
				
				var parent_width = cur_portfolio.width();
				var gutter_size = cur_portfolio.data( "gutter" );
				var grid_cols = cur_portfolio.data( "cols" );
								
				var net_width = Math.floor( ( parent_width - ( gutter_size * ( grid_cols - 1 ) ) ) / grid_cols );
				cur_portfolio.find( ".isotope-item" ).css({'width':net_width+'px', 'margin-bottom':gutter_size+'px'});
				
				var portfolio_filter = cur_portfolio.parent(".portfolio-wrap").children(".portfolio-filter");
				var filter = $( portfolio_filter ).attr("data-first-cat") ? "." + $( portfolio_filter ).attr("data-first-cat") : '*';
				
				var $grid = cur_portfolio.isotope({
					itemSelector: '.isotope-item',
					filter: filter,
					masonry: {
						gutter: gutter_size
					}
				});
				
				
				portfolio_filter.find('.portfolio-filter-item').on( 'click', function() {
					
					var cur_ele = $(this);
					var parent = cur_ele.parents("ul.nav");
					parent.children("li").removeClass("active");
					
					cur_ele.parent("li").addClass("active");
					
					var filterValue = cur_ele.attr('data-filter');
					$grid.isotope({ 
						filter: filterValue
					});
					return false;
				});
				
				if( cur_portfolio.find( ".isotope-item" ).hasClass( "element-animate" ) ){
					element_scroll_animation();
				}
			
			});
		}
		
		// Sticky element
		if( $('.header-inner .sticky-head').length ){
			zoacresStickyPart( '.header-inner' );
		}
		
		// Mobile header  menu
		if($('.mobile-header-inner .sticky-head').length){
			zoacresStickyPart( '.mobile-header-inner' );
		}
		
		// Scroll 
		if( $('.header-inner .sticky-scroll').length ){
			setTimeout( zoacresStickyScrollUpPart( '.header-inner', 'header' ), 100 ); 
		}
		
		// Mobile header scroll 
		if($('.mobile-header-inner .sticky-scroll').length){
			setTimeout( zoacresStickyScrollUpPart( '.mobile-header-inner', '.mobile-header' ), 100 ); 
		}
		
		/* Menu Scroll */
		var cur_offset = 0;
		
		/*One Page Menu Status*/
		var o_stat = 0;
		$( '.theme-main-menu li.menu-item, .theme-mobile-menu li.menu-item' ).each(function( index ) {
			var cur_item = this;
			var target = $(cur_item).children("a").attr("href");
			if( target && target.indexOf("#section-") != -1 ){
				o_stat = 1;
				var res = target.split("#");
				if( res.length == 2 ){
					$(cur_item).children("a").attr("data-target", res[0]);
					$(cur_item).children("a").attr("href", "#"+res[1]);
				}	
			}
		});
		
		/*One Page Menu Menu Click and Scroll*/
		if( o_stat ){
		
			if( $('.theme-main-menu .menu-item').find('a[href="#section-top"]').length ){
				$("body").attr("id","section-top");
			}
					
			var hght_ele = 0;
			var win_width = $window.width();
			if( win_width >= res_from ){
				hght_ele = $("body").attr("data-scroll-offset") ? $("body").attr("data-scroll-offset") : 50;
			}else {
				hght_ele = $("body").attr("data-scroll-moffset") ? $("body").attr("data-scroll-moffset") : 50;
			}
					
			$window.on('scroll', function(){
				var scl_offst = parseInt( hght_ele, 10 ) + 1;
				$('section[id*="section-"], body').each(function () {
					var cur_ele = $(this);
					var anchored = cur_ele.attr("id"),
						targetOffset = cur_ele.offset().top - scl_offst;
						
					if ($window.scrollTop() > targetOffset) {
						$('.theme-main-menu .menu-item').find("a").removeClass("active");
						$('.theme-main-menu .menu-item').find('a[href="#'+ anchored +'"]').addClass("active");
						
						//Mobile menu scroll spy active
						$('.theme-mobile-menu .menu-item').find("a").removeClass("active");
						$('.theme-mobile-menu .menu-item').find('a[href="#'+ anchored +'"]').addClass("active");
					}
				});
			});
			
			//Animate Scroll Code
			$( '.theme-main-menu .menu-item > a[href^="#section-"], .theme-mobile-menu .menu-item > a[href^="#section-"]' ).on('click',function (e) {
			
				var cur_item = this;
				var target = $(cur_item).attr("href");
				
				if( $(cur_item).parents(".theme-mobile-menu").length ) {
					$(".zmm-close.close").trigger( "click" );
				}
				
				var target_id = target.slice( target.indexOf("#"), ( target.length ) );

				if( $( target_id ).length ){
					
					var offs = $(target_id).offset().top;
					offs -=  hght_ele;
					$('html,body').animate({ 'scrollTop': offs }, 1000, 'easeInOutExpo' );						

					return false;
				}else{
					
					if( target_id == '#section-top' ){
						$('html,body').animate({ 'scrollTop': 0 }, 1000, 'easeInOutExpo' );
						return false;
					}else{
						var cur_url = window.location.href;
						var data_targ = $(cur_item).attr("data-target");
						if( cur_url != data_targ && target_id != '#' ){
							window.location.href = data_targ + target;
						}else{
							window.location.href = target;
						}
					}

				}
			
			});//Animate Scroll Code End
			
		}
		
		//Hidden Footer
		if( $(".footer-hidden") ){
			zoacresFooterHidden();
			$window.smartresize(function() {
				zoacresFooterHidden();
			});	
		}
		
		/* Day Counter Shortcode Script */
		if( $( '.day-counter' ).length ){
			$( '.day-counter' ).each(function( index ) {
				var day_counter = $(this);
				
				var data_size = day_counter.attr("data-size") ? day_counter.attr("data-size") : 100;
				var data_thick = day_counter.attr("data-thick") ? day_counter.attr("data-thick") : 0;
				var data_empty_clr = day_counter.attr("data-empty-color") ? day_counter.attr("data-empty-color") : 'transparent';
				var data_fill_clr = day_counter.attr("data-fill-color") ? day_counter.attr("data-fill-color") : 'transparent';
				
				daycount_obj[index] = { 
					'd':'0', 'h':'0', 'm':'0', 's':'0', 'w':'0',
					'data_size': data_size,
					'data_thick': data_thick,
					'data_empty_clr': data_empty_clr,
					'data_fill_clr': data_fill_clr
				};
				
				var dprogress = $(day_counter).hasClass("day-counter-progress") ? true : false;
				var c_date = day_counter.attr('data-date');
				day_counter.countdown( c_date, function(event) {
					if( day_counter.find('.counter-day').length ){
						day_counter.find('.counter-day .count-view').text( event.strftime('%D') );
						if( dprogress ){
							var yr = parseInt( event.strftime('%D'), 10 );
							yr = yr ? parseInt( ( yr / 365 * 100 ), 10 ) : 100;
							zoacresDayCircle( day_counter.find('.counter-day'), yr, 'd', index );
						}
					}
					if( day_counter.find('.counter-hour').length ){
						day_counter.find('.counter-hour .count-view').text( event.strftime('%H') );
						if( dprogress ){
							var hur = parseInt( event.strftime('%H'), 10 );
							hur = hur ? parseInt( ( hur / 24 * 100 ), 10 ) : 100;
							zoacresDayCircle( day_counter.find('.counter-hour'), hur, 'h', index );
						}
					}
					if( day_counter.find('.counter-min').length ){
						day_counter.find('.counter-min .count-view').text( event.strftime('%M') );
						if( dprogress ){
							var mnth = parseInt( event.strftime('%M'), 10 );
							mnth = mnth ? parseInt( ( mnth / 60 * 100 ), 10 ) : 100;
							zoacresDayCircle( day_counter.find('.counter-min'), mnth, 'm', index );
						}
					}
					if( day_counter.find('.counter-sec').length ){
						day_counter.find('.counter-sec .count-view').text( event.strftime('%S') );
						if( dprogress ){
							var tme = parseInt( event.strftime('%S'), 10 );
							tme = tme ? parseInt( ( tme / 60 * 100 ), 10 ) : 100;
							zoacresDayCircle( day_counter.find('.counter-sec'), tme, 's', index );
						}
					}
					if( day_counter.find('.counter-week').length ){
						day_counter.find('.counter-week .count-view').text( event.strftime('%w') );
						if( dprogress ){
							var wk = parseInt( event.strftime('%S'), 10 );
							wk = wk ? parseInt( ( wk / 60 * 100 ), 10 ) : 100;
							zoacresDayCircle( day_counter.find('.counter-week'), wk, 'w', index );
						}
					}
				});
			});
		}
		
		/* Circle Counter Shortcode Script */
		if( $( '.circle-progress-circle' ).length ){
			var circle = $( '.circle-progress-circle' );
			circle.appear(function() {
							  
				var c_circle = $(this);
				var c_value = c_circle.attr( "data-value" );
				var c_size = c_circle.attr( "data-size" );
				var c_thickness = c_circle.attr( "data-thickness" );
				var c_duration = c_circle.attr( "data-duration" );
				var c_empty = c_circle.attr( "data-empty" ) != '' ? c_circle.attr( "data-empty" ) : 'transparent';
				var c_scolor = c_circle.attr( "data-scolor" );
				var c_ecolor = c_circle.attr( "data-ecolor" ) != '' ? c_circle.attr( "data-ecolor" ) : c_scolor;
									
				c_circle.circleProgress({
					value: Math.floor( c_value ) / 100,
					size: Math.floor( c_size ),
					thickness: Math.floor( c_thickness ),
					emptyFill: c_empty,
					animation: {
						duration: Math.floor( c_duration )
					},
					lineCap: 'round',
					easing: 'easeInOutExpo',
					fill: {
						gradient: [c_scolor, c_ecolor]
					}
				}).on( 'circle-animation-progress', function( event, progress ) {
					var cur_ele = $(this);
					cur_ele.find( '.progress-value' ).html( Math.round( c_value * progress ) + '%' );
				});
			});
		}
		
		/* Progress Bar Script */
		if( $( '.progress-bar' ).length ){
			var itv = 100; // Progress load interval variable
			$( ".progress .progress-bar" ).appear(function(){

				var prgrs = $(this);
				
				if( prgrs.attr("data-scolor") ){
					prgrs.removeClass('progress-bar-striped progress-bar-animated');
					var empty_color = prgrs.attr("data-empty") ? prgrs.attr("data-empty") : '#f1f1f1';
					var scolor = prgrs.attr("data-scolor") ? prgrs.attr("data-scolor") : '#333333';
					var ecolor = prgrs.attr("data-ecolor") ? prgrs.attr("data-ecolor") : '#333333';
					
					prgrs.parent().css( 'background-color', empty_color );
					prgrs.css( 'background-image', 'linear-gradient( 120deg, '+ scolor +' 0%, '+ ecolor +' 100%)' );
				}
				
				var prgrs_val = prgrs.attr( "aria-valuenow" ) + "%";
				var prcntg = 0;
				prgrs.delay(itv).animate({ width: prgrs_val }, 3000, 'easeInOutExpo' );
				//prgrs.prev(".progress-details").animate({ left: prgrs_val }, 3000, 'easeInOutExpo');
				prgrs.parents(".progress").find(".progress-details").delay(itv).animate({
					left: prgrs_val
				}, {
					duration: 3000,
					specialEasing: {
						left: "easeInOutExpo",
					},
					progress: function(animation, progress, remainingMs) {
						var cur_ele = $(this);
						var prgrs_val = cur_ele.parents(".progress").find(".progress-bar").attr( "aria-valuenow" );
						prcntg = parseInt( ( prgrs_val * progress ), 10 );
						cur_ele.html( prcntg + '%' );
					}
				});
				
				itv += 100;
				
			});
		}
		
		/* Animation Appear */
		$('.animated').appear(function() {
			var elem = $(this);
			var animation = elem.data('animation');
			var delay = elem.data('animation-delay');
			if (!elem.hasClass('visible')) {
				if( delay ){
					elem.addClass("").delay(delay).queue(function(next){
						elem.addClass(animation + " visible");
						next();
					});
				}else{
					elem.addClass(animation + " visible");
				}	
			}
		});

		//Google map init
		if( $( "#site-google-map" ).length ){
			initniskarGmap();
		}

	}); // window load end
	
	/*
	 *Incuptorn Userdefined JS Functions
	 */
	
	//Scroll Animation
	function element_scroll_animation(){
		setTimeout( function() {
			var anim_time = 300;
			$('.element-animate:not(.run-animate)').each( function() {
				
				var elem = $(this);
				var bottom_of_object = elem.offset().top;
				var bottom_of_window = $window.scrollTop() + $window.height();
				
				if( bottom_of_window > bottom_of_object ){
					setTimeout( function() {
						elem.addClass("run-animate");
					}, anim_time );
				}
				anim_time += 300;
				
			});
		}, 200 );
	}
	//Compare Payment
	function compare_payment( cp_obj, range_value ){
		
		var i = 0, cheap_cal = '';
		var cheap_arr = [];
		var cheap_txt = [];
		
		cp_obj.each(function( index ) {
			
			var cp_ele = $(this);
			var cp_child_json = { "title": cp_ele.data("payment"), "trans_fee": cp_ele.data("percent"), "additional_fee": cp_ele.data("additional"), "min_trans_fee": cp_ele.data("min"), "compare_trans": cp_ele.data("own-method") };
		
			var t = parseFloat( ( ( ( range_value / 100 ) * cp_child_json.trans_fee ) + parseFloat( cp_child_json.additional_fee ) ) ).toFixed(2);
			var cp_trans = cp_child_json.min_trans_fee < t ? t : compare_json.stripe_arr[2];
			if( cp_child_json.compare_trans == 'no' ){
				cheap_arr[i] = cp_trans;
				cheap_txt[i++] = cp_child_json.title;
			}
			$(cp_ele).find(".payment-val-update").text(cp_trans);
			
			if( cp_child_json.compare_trans == 'yes' ){
				$.each(cheap_arr, function( index, cvalue ) {
					cheap_cal = cheap_cal + '<p class="alert-success">We are '+ parseFloat( cvalue / cp_trans ).toFixed(2) +'% cheaper! than '+ cheap_txt[index] +'</p>';
				});
				$(cp_ele).find(".cheap-cal-wrap").empty().html( cheap_cal );
			}
			
		});
		
	}
	
	//Init Goole Map
	function initniskarGmap() {

		var map_styles = '{ "Aubergine" : [	{"elementType":"geometry","stylers":[{"color":"#1d2c4d"}]},{"elementType":"labels.text.fill","stylers":[{"color":"#8ec3b9"}]},{"elementType":"labels.text.stroke","stylers":[{"color":"#1a3646"}]},{"featureType":"administrative.country","elementType":"geometry.stroke","stylers":[{"color":"#4b6878"}]},{"featureType":"administrative.land_parcel","elementType":"labels.text.fill","stylers":[{"color":"#64779e"}]},{"featureType":"administrative.province","elementType":"geometry.stroke","stylers":[{"color":"#4b6878"}]},{"featureType":"landscape.man_made","elementType":"geometry.stroke","stylers":[{"color":"#334e87"}]},{"featureType":"landscape.natural","elementType":"geometry","stylers":[{"color":"#023e58"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#283d6a"}]},{"featureType":"poi","elementType":"labels.text.fill","stylers":[{"color":"#6f9ba5"}]},{"featureType":"poi","elementType":"labels.text.stroke","stylers":[{"color":"#1d2c4d"}]},{"featureType":"poi.park","elementType":"geometry.fill","stylers":[{"color":"#023e58"}]},{"featureType":"poi.park","elementType":"labels.text.fill","stylers":[{"color":"#3C7680"}]},{"featureType":"road","elementType":"geometry","stylers":[{"color":"#304a7d"}]},{"featureType":"road","elementType":"labels.text.fill","stylers":[{"color":"#98a5be"}]},{"featureType":"road","elementType":"labels.text.stroke","stylers":[{"color":"#1d2c4d"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#2c6675"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#255763"}]},{"featureType":"road.highway","elementType":"labels.text.fill","stylers":[{"color":"#b0d5ce"}]},{"featureType":"road.highway","elementType":"labels.text.stroke","stylers":[{"color":"#023e58"}]},{"featureType":"transit","elementType":"labels.text.fill","stylers":[{"color":"#98a5be"}]},{"featureType":"transit","elementType":"labels.text.stroke","stylers":[{"color":"#1d2c4d"}]},{"featureType":"transit.line","elementType":"geometry.fill","stylers":[{"color":"#283d6a"}]},{"featureType":"transit.station","elementType":"geometry","stylers":[{"color":"#3a4762"}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#0e1626"}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"color":"#4e6d70"}]}], "Silver" : [{"elementType":"geometry","stylers":[{"color":"#f5f5f5"}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"elementType":"labels.text.fill","stylers":[{"color":"#616161"}]},{"elementType":"labels.text.stroke","stylers":[{"color":"#f5f5f5"}]},{"featureType":"administrative.land_parcel","elementType":"labels.text.fill","stylers":[{"color":"#bdbdbd"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#eeeeee"}]},{"featureType":"poi","elementType":"labels.text.fill","stylers":[{"color":"#757575"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#e5e5e5"}]},{"featureType":"poi.park","elementType":"labels.text.fill","stylers":[{"color":"#9e9e9e"}]},{"featureType":"road","elementType":"geometry","stylers":[{"color":"#ffffff"}]},{"featureType":"road.arterial","elementType":"labels.text.fill","stylers":[{"color":"#757575"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#dadada"}]},{"featureType":"road.highway","elementType":"labels.text.fill","stylers":[{"color":"#616161"}]},{"featureType":"road.local","elementType":"labels.text.fill","stylers":[{"color":"#9e9e9e"}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"color":"#e5e5e5"}]},{"featureType":"transit.station","elementType":"geometry","stylers":[{"color":"#eeeeee"}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#c9c9c9"}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"color":"#9e9e9e"}]}], "Retro" : [{"elementType":"geometry","stylers":[{"color":"#ebe3cd"}]},{"elementType":"labels.text.fill","stylers":[{"color":"#523735"}]},{"elementType":"labels.text.stroke","stylers":[{"color":"#f5f1e6"}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#c9b2a6"}]},{"featureType":"administrative.land_parcel","elementType":"geometry.stroke","stylers":[{"color":"#dcd2be"}]},{"featureType":"administrative.land_parcel","elementType":"labels.text.fill","stylers":[{"color":"#ae9e90"}]},{"featureType":"landscape.natural","elementType":"geometry","stylers":[{"color":"#dfd2ae"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#dfd2ae"}]},{"featureType":"poi","elementType":"labels.text.fill","stylers":[{"color":"#93817c"}]},{"featureType":"poi.park","elementType":"geometry.fill","stylers":[{"color":"#a5b076"}]},{"featureType":"poi.park","elementType":"labels.text.fill","stylers":[{"color":"#447530"}]},{"featureType":"road","elementType":"geometry","stylers":[{"color":"#f5f1e6"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#fdfcf8"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#f8c967"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#e9bc62"}]},{"featureType":"road.highway.controlled_access","elementType":"geometry","stylers":[{"color":"#e98d58"}]},{"featureType":"road.highway.controlled_access","elementType":"geometry.stroke","stylers":[{"color":"#db8555"}]},{"featureType":"road.local","elementType":"labels.text.fill","stylers":[{"color":"#806b63"}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"color":"#dfd2ae"}]},{"featureType":"transit.line","elementType":"labels.text.fill","stylers":[{"color":"#8f7d77"}]},{"featureType":"transit.line","elementType":"labels.text.stroke","stylers":[{"color":"#ebe3cd"}]},{"featureType":"transit.station","elementType":"geometry","stylers":[{"color":"#dfd2ae"}]},{"featureType":"water","elementType":"geometry.fill","stylers":[{"color":"#b9d3c2"}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"color":"#92998d"}]}], "Dark" : [{"elementType":"geometry","stylers":[{"color":"#212121"}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"elementType":"labels.text.fill","stylers":[{"color":"#757575"}]},{"elementType":"labels.text.stroke","stylers":[{"color":"#212121"}]},{"featureType":"administrative","elementType":"geometry","stylers":[{"color":"#757575"}]},{"featureType":"administrative.country","elementType":"labels.text.fill","stylers":[{"color":"#9e9e9e"}]},{"featureType":"administrative.land_parcel","stylers":[{"visibility":"off"}]},{"featureType":"administrative.locality","elementType":"labels.text.fill","stylers":[{"color":"#bdbdbd"}]},{"featureType":"poi","elementType":"labels.text.fill","stylers":[{"color":"#757575"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#181818"}]},{"featureType":"poi.park","elementType":"labels.text.fill","stylers":[{"color":"#616161"}]},{"featureType":"poi.park","elementType":"labels.text.stroke","stylers":[{"color":"#1b1b1b"}]},{"featureType":"road","elementType":"geometry.fill","stylers":[{"color":"#2c2c2c"}]},{"featureType":"road","elementType":"labels.text.fill","stylers":[{"color":"#8a8a8a"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#373737"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#3c3c3c"}]},{"featureType":"road.highway.controlled_access","elementType":"geometry","stylers":[{"color":"#4e4e4e"}]},{"featureType":"road.local","elementType":"labels.text.fill","stylers":[{"color":"#616161"}]},{"featureType":"transit","elementType":"labels.text.fill","stylers":[{"color":"#757575"}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#252a37000"}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"color":"#3d3d3d"}]}], "Night" : [{"elementType":"geometry","stylers":[{"color":"#242f3e"}]},{"elementType":"labels.text.fill","stylers":[{"color":"#746855"}]},{"elementType":"labels.text.stroke","stylers":[{"color":"#242f3e"}]},{"featureType":"administrative.locality","elementType":"labels.text.fill","stylers":[{"color":"#d59563"}]},{"featureType":"poi","elementType":"labels.text.fill","stylers":[{"color":"#d59563"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#263c3f"}]},{"featureType":"poi.park","elementType":"labels.text.fill","stylers":[{"color":"#6b9a76"}]},{"featureType":"road","elementType":"geometry","stylers":[{"color":"#38414e"}]},{"featureType":"road","elementType":"geometry.stroke","stylers":[{"color":"#212a37"}]},{"featureType":"road","elementType":"labels.text.fill","stylers":[{"color":"#9ca5b3"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#746855"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#1f2835"}]},{"featureType":"road.highway","elementType":"labels.text.fill","stylers":[{"color":"#f3d19c"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#2f3948"}]},{"featureType":"transit.station","elementType":"labels.text.fill","stylers":[{"color":"#d59563"}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#17263c"}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"color":"#515c6d"}]},{"featureType":"water","elementType":"labels.text.stroke","stylers":[{"color":"#17263c"}]}] }';
		
		var map_style_obj = JSON.parse(map_styles);
		
		var map_style_mode = [];
		var map_mode = '';
		if( $( "#site-google-map" ).attr( "data-map-style" ) ){
			map_mode = $( "#site-google-map" ).attr("data-map-style");
			
			if( map_mode == 'Aubergine' )
				map_style_mode = map_style_obj.Aubergine;
			else if( map_mode == 'Silver' )
				map_style_mode = map_style_obj.Silver;
			else if( map_mode == 'Retro' )
				map_style_mode = map_style_obj.Retro;
			else if( map_mode == 'Dark' )
				map_style_mode = map_style_obj.Dark;
			else if( map_mode == 'Aubergine' )
				map_style_mode = map_style_obj.Night;
		}

		var LatLng = {lat: 51.508742, lng: -0.120850};
		
		var mapProp= {
			center: LatLng,
			scrollwheel: false,
			zoom:9,
			styles: map_style_mode
		};
		
		var map = new google.maps.Map( $( "#site-google-map" )[0], mapProp);
		var marker = new google.maps.Marker({
		  position: LatLng,
		  icon: 'images/marker.png',
		  map: map
		});
		
		google.maps.event.addDomListener(window, 'resize', function() {
			map.setCenter(LatLng);
		});

	}
	
	//Scroll Animation
	function theme_scroll_animation(){
		setTimeout( function() {
			var anim_time = 300;
			$('.ruei-animate:not(.run-animate)').each( function() {
				
				var elem = $(this);
				var bottom_of_object = elem.offset().top;
				var bottom_of_window = $window.scrollTop() + $window.height();
				
				if( bottom_of_window > bottom_of_object ){
					setTimeout( function() {
						elem.addClass("run-animate");
					}, anim_time );
				}
				anim_time += 300;
				
			});
		}, 200 );
	}
	
	//Day Counter Progress
	function zoacresDayCircle( ele, value, chk, indx ){
	
		var c_circle = $( ele );
		var c_value = value;
		var c_duration = 1000;
							
		c_circle.circleProgress({
			value: Math.floor( c_value ) / 100,
			size: Math.floor( daycount_obj[indx].data_size ),
			thickness: Math.floor( daycount_obj[indx].data_thick ),
			emptyFill: daycount_obj[indx].data_empty_clr,
			animation: {
				duration: Math.floor( c_duration )
			},
			animationStartValue: daycount_obj[indx][chk],
			easing: 'easeIn',
			lineCap: 'round',
			fill: {
				gradient: [daycount_obj[indx].data_fill_clr, daycount_obj[indx].data_fill_clr]
			}
		});
		daycount_obj[indx][chk] = Math.floor( c_value ) / 100;
	}
	
	//Owl Carousel Function
	function zoacresOwlCarousel( cur_owl ){
		
		var loop = cur_owl.data("loop");
		var margin = cur_owl.data("margin");
		var nav = cur_owl.data("nav");
		var dots = cur_owl.data("dots");
		var autoplay = cur_owl.data("autoplay");
		var items = cur_owl.data("items");
		var items_tab = cur_owl.data("items-tab");
		var items_mob = cur_owl.data("items-mob");
		var autoplaytime = cur_owl.data("autoplaytime");
		var autoplaypause = cur_owl.data("autoplaypause");
		var smartspeed = cur_owl.data("smartspeed");
		var rtl = $( "body.rtl" ).length ? true : false;
		
		$(cur_owl).owlCarousel({
			rtl: rtl,
			loop: loop,
			margin: margin,
			nav: nav,
			dots: dots,
			autoplay: autoplay,
			autoplayTimeout: autoplaytime,
    		autoplayHoverPause: autoplaypause,
			smartSpeed: smartspeed,			
			responsive:{
				0:{
					items: items_mob
				},
				767:{
					items: items_tab
				},
				1023:{
					items: items
				}
			}
		});
		
	}
	
	//Section Background Image Setting
	function zoacresSetSectionBgImg(){
		$(".section-bg-img").each(function( index ) {
			var cur_ele = $(this);
			if( cur_ele.attr("data-bg") ){
				cur_ele.css("background-image","url("+ cur_ele.attr("data-bg") +")");
			}
		});
	}
	
	//Div Background Image Setting
	function zegenSetDivBgImg(){
		$(".div-bg-img").each(function( index ) {
			var cur_ele = $(this);
			if( cur_ele.attr("data-bg") ){
				cur_ele.css("background-image","url("+ cur_ele.attr("data-bg") +")");
			}
		});
	}
	
	//Footer Background Image Setting
	function zegenSetFooterBgImg(){
		$(".footer-bg-img").each(function( index ) {
			var cur_ele = $(this);
			if( cur_ele.attr("data-bg") ){
				cur_ele.css("background-image","url("+ cur_ele.attr("data-bg") +")");
			}
		});
	}
	
	//Set Custom Background Color
	function zoacresSetCustomBgColor(){
		$(".bg-custom-color").each(function( index ) {
			var cur_item = $(this);
			if( cur_item.attr("data-bg-end-color") ){
				
				var start_clr = cur_item.attr("data-bg-color");
				var end_clr = cur_item.attr("data-bg-end-color");
				var gradient_deg = cur_item.attr("data-bg-deg") ? cur_item.attr("data-bg-deg") : '120deg';
				cur_item.css("background-image", 'linear-gradient('+ gradient_deg +', '+ start_clr +' 0%, '+ end_clr +' 100%)' );				
			}else if( cur_item.attr("data-bg-color") ){
				cur_item.css("background-color", cur_item.attr("data-bg-color") );
			}
		});
	}	
	
	//Hidden Footer
	function zoacresFooterHidden(){
		if( $window.width() > 991 ){
			$(".page-wrapper-inner").css( "margin-bottom", $(".footer-hidden").outerHeight() );
		}else{
			$(".page-wrapper-inner").css( "margin-bottom", '' );
		}
	}
	
	//Check Screen is Responsive
	function zoacresResponsiveCheck(res_from){
		var win_width = $window.width();
		if( win_width >= res_from ){
			$(".header-inner").css({"display":"block"});
			$(".mobile-header").css({"display":"none"});
			$(".page-wrapper").css({"padding":""});
		}else{
			$(".header-inner").css({"display":"none"});
			$(".mobile-header").css({"display":"block"});
			$(".page-wrapper").css({"padding":"0"});
		}
	}

	//Set Center Menu
	function zoacresCenterMenuMargin(){
		//Center item margin fixing
		$.each([ 'topbar', 'logobar', 'navbar', 'mobile-header', 'footer-bottom' ], function( index, margin_key ) {
			
			var left_width = 0,
				right_width = 0,
				center_width = 0,
				margin_left = 0,
				parent_width = 0;

			if( $('.'+ margin_key +' .'+ margin_key +'-inner').length ){
			
				if( margin_key == 'mobile-header' )
					parent_width = $('.'+ margin_key +' .'+ margin_key +'-inner .basic-container').width();
				else
					parent_width = $('.'+ margin_key +' .'+ margin_key +'-inner').width();
				
				if( $('.'+ margin_key +' .'+ margin_key +'-inner .'+ margin_key +'-items.pull-left').length ){
					left_width = $('.'+ margin_key +' .'+ margin_key +'-inner .'+ margin_key +'-items.pull-left').width();
				}
				if( $('.'+ margin_key +' .'+ margin_key +'-inner .'+ margin_key +'-items.pull-right').length ){
					right_width = $('.'+ margin_key +' .'+ margin_key +'-inner .'+ margin_key +'-items.pull-right').width();
				}
				if( $('.'+ margin_key +' .'+ margin_key +'-inner .'+ margin_key +'-items.pull-center').length ){
					center_width = $('.'+ margin_key +' .'+ margin_key +'-inner .'+ margin_key +'-items.pull-center').width();
				}
					
				if( left_width + center_width + right_width ){
				
					if( margin_key == 'mobile-header' ){
						parent_width -= ( left_width + center_width + right_width );
						margin_left = parent_width / 2; 
					}else{
						parent_width = ( parent_width / 2 ) - ( center_width / 2 );
						margin_left = Math.floor( parent_width - left_width );
					}
					
					if( !$( "body.rtl" ).length ){
						$('.'+ margin_key +' .'+ margin_key +'-inner .'+ margin_key +'-items.pull-center').css( 'margin-left', margin_left+'px' );
					}else{
						$('.'+ margin_key +' .'+ margin_key +'-inner .'+ margin_key +'-items.pull-center').css( 'margin-right', margin_left+'px' );
					}
					
					$('.'+ margin_key +' .'+ margin_key +'-inner .'+ margin_key +'-items.pull-center').addClass("show-opacity");
					
				}
			}
		});
	}
	
	//Set Sticky Part
	function zoacresStickyPart( main_class ){

		var outer_class = '.sticky-outer';	
		var lastScrollTop = 0;
		var header_top = 0;

		$(main_class + ' ' + outer_class).css( 'height', $(main_class + ' ' + outer_class).data( "height" ) );
		header_top = $(main_class + ' ' + outer_class).offset().top;

		$window.scroll(function(event){
			
			var cur_ele = $(this);
			var st = cur_ele.scrollTop();
			if( st > header_top ){
				$(main_class + ' .sticky-head').addClass('header-sticky');
			}else{
				$(main_class + ' .sticky-head').removeClass('header-sticky');
			}
			
			if( st == 0 ){
				$(main_class + ' .sticky-head').removeClass('header-sticky');
			}
			
			lastScrollTop = st;
		});	
	}
	
	//Set Sticky Scroll Up Part
	function zoacresStickyScrollUpPart( main_class, sticky_div ){
		
		var outer_class = '.sticky-outer';	
		var out_height = '';
		var lastScrollTop = 0;
		var header_top = 0;

		$(main_class + ' ' + outer_class).css( 'height', $(main_class + ' ' + outer_class).data( "height" ) );
		out_height = '-' + $(main_class + ' ' + outer_class).outerHeight() + 'px';
		header_top = $(main_class + ' ' + outer_class).offset().top;
		sticky_div = $(sticky_div).height();
		
		$window.scroll(function(event){
			
			var cur_ele = $(this);
			var st = cur_ele.scrollTop();
			
			if( st < lastScrollTop && header_top < lastScrollTop ){
				// upscroll code
				$(main_class + ' .sticky-scroll').addClass('show-menu');
				$(main_class + ' .sticky-scroll.show-menu').css({'transform': 'translate3d(0px, 0px, 0px)'});
			}else{
				// downscroll code
				if( st < sticky_div ){
					$(main_class + ' .sticky-scroll').css({'transform': ''});
					$(main_class + ' .sticky-scroll.show-menu').removeClass('show-menu');
				}else{
					$(main_class + ' .sticky-scroll').css({'transform': 'translate3d(0px, '+ out_height +', 0px)'});
				}
			}
			
			if( st == 0 ){
				$(main_class + ' .sticky-scroll').css({'transform': ''});
				$(main_class + ' .sticky-scroll.show-menu').removeClass('show-menu');
			}
			
			lastScrollTop = st;
		});
		
	}
	
	//Set Sticky Outer Height
	function zoacresSetStickyOuterHeight(){
		$( ".sticky-outer" ).each(function() {

			var cur_item = $(this);
			var parent_class = '';
			
			if( cur_item.parent( "div" ).hasClass( "mobile-header-inner" ) ){
				parent_class = '.mobile-header';
				var display_prop = cur_item.parents(parent_class).css("display");
				cur_item.parents(parent_class).css({ 'position':'absolute', 'visibility':'hidden', 'display':'block', 'height':'auto' });
				cur_item.attr( "data-height", cur_item.outerHeight() );
				cur_item.parents(parent_class).css({ 'position':'', 'visibility':'', 'display':display_prop, 'height': cur_item.data( "height" ) });
				
			}else{
				parent_class = '.header-inner';
				var display_prop = cur_item.parents(parent_class).css("display");
				cur_item.parents(parent_class).css({ 'position':'absolute', 'visibility':'hidden', 'display':'block' });
				cur_item.css({ 'height':'auto' });
				cur_item.attr( "data-height", cur_item.outerHeight() );
				cur_item.parents(parent_class).css({ 'position':'', 'visibility':'', 'display':display_prop });
				cur_item.css({ 'height': cur_item.data( "height" ) });
			}

		});
	}
	
})( jQuery );

