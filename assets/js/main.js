/*
	Forty by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body'),
		$wrapper = $('#wrapper'),
		$header = $('#header'),
		$banner = $('#banner');

	// Breakpoints.
		breakpoints({
			xlarge:    ['1281px',   '1680px'   ],
			large:     ['981px',    '1280px'   ],
			medium:    ['737px',    '980px'    ],
			small:     ['481px',    '736px'    ],
			xsmall:    ['361px',    '480px'    ],
			xxsmall:   [null,       '360px'    ]
		});

	/**
	 * Applies parallax scrolling to an element's background image.
	 * @return {jQuery} jQuery object.
	 */
	$.fn._parallax = (browser.name == 'ie' || browser.name == 'edge' || browser.mobile) ? function() { return $(this) } : function(intensity) {

		var	$window = $(window),
			$this = $(this);

		if (this.length == 0 || intensity === 0)
			return $this;

		if (this.length > 1) {

			for (var i=0; i < this.length; i++)
				$(this[i])._parallax(intensity);

			return $this;

		}

		if (!intensity)
			intensity = 0.25;

		$this.each(function() {

			var $t = $(this),
				on, off;

			on = function() {

				$t.css('background-position', 'center 100%, center 100%, center 0px');

				$window
					.on('scroll._parallax', function() {

						var pos = parseInt($window.scrollTop()) - parseInt($t.position().top);

						$t.css('background-position', 'center ' + (pos * (-1 * intensity)) + 'px');

					});

			};

			off = function() {

				$t
					.css('background-position', '');

				$window
					.off('scroll._parallax');

			};

			breakpoints.on('<=medium', off);
			breakpoints.on('>medium', on);

		});

		$window
			.off('load._parallax resize._parallax')
			.on('load._parallax resize._parallax', function() {
				$window.trigger('scroll');
			});

		return $(this);

	};

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Clear transitioning state on unload/hide.
		$window.on('unload pagehide', function() {
			window.setTimeout(function() {
				$('.is-transitioning').removeClass('is-transitioning');
			}, 250);
		});

	// Fix: Enable IE-only tweaks.
		if (browser.name == 'ie' || browser.name == 'edge')
			$body.addClass('is-ie');

	// Scrolly.
		$('.scrolly').scrolly({
			offset: function() {
				return $header.height() - 2;
			}
		});

	// Tiles.
		var $tiles = $('.tiles > article');

		$tiles.each(function() {

			var $this = $(this),
				$image = $this.find('.image'), $img = $image.find('img'),
				$link = $this.find('.link'),
				x;

			// Image.

				// Set image.
					$this.css('background-image', 'url(' + $img.attr('src') + ')');

				// Set position.
					if (x = $img.data('position'))
						$image.css('background-position', x);

				// Hide original.
					$image.hide();

			// Link.
				if ($link.length > 0) {

					$x = $link.clone()
						.text('')
						.addClass('primary')
						.appendTo($this);

					$link = $link.add($x);

					$link.on('click', function(event) {

						var href = $link.attr('href');

						// Prevent default.
							event.stopPropagation();
							event.preventDefault();

						// Target blank?
							if ($link.attr('target') == '_blank') {

								// Open in new tab.
									window.open(href);

							}

						// Otherwise ...
							else {

								// Start transitioning.
									$this.addClass('is-transitioning');
									$wrapper.addClass('is-transitioning');

								// Redirect.
									window.setTimeout(function() {
										location.href = href;
									}, 500);

							}

					});

				}

		});

	// Header.
		if ($banner.length > 0
		&&	$header.hasClass('alt')) {

			$window.on('resize', function() {
				$window.trigger('scroll');
			});

			$window.on('load', function() {

				$banner.scrollex({
					bottom:		$header.height() + 10,
					terminate:	function() { $header.removeClass('alt'); },
					enter:		function() { $header.addClass('alt'); },
					leave:		function() { $header.removeClass('alt'); $header.addClass('reveal'); }
				});

				window.setTimeout(function() {
					$window.triggerHandler('scroll');
				}, 100);

			});

		}

	// Banner.
		$banner.each(function() {

			var $this = $(this),
				$image = $this.find('.image'), $img = $image.find('img');

			// Parallax.
				$this._parallax(0.275);

			// Image.
				if ($image.length > 0) {

					// Set image.
						$this.css('background-image', 'url(' + $img.attr('src') + ')');

					// Hide original.
						$image.hide();

				}

		});

	// Menu.
		var $menu = $('#menu'),
			$menuInner;

		$menu.wrapInner('<div class="inner"></div>');
		$menuInner = $menu.children('.inner');
		$menu._locked = false;

		$menu._lock = function() {

			if ($menu._locked)
				return false;

			$menu._locked = true;

			window.setTimeout(function() {
				$menu._locked = false;
			}, 350);

			return true;

		};

		$menu._show = function() {

			if ($menu._lock())
				$body.addClass('is-menu-visible');

		};

		$menu._hide = function() {

			if ($menu._lock())
				$body.removeClass('is-menu-visible');

		};

		$menu._toggle = function() {

			if ($menu._lock())
				$body.toggleClass('is-menu-visible');

		};

		$menuInner
			.on('click', function(event) {
				event.stopPropagation();
			})
			.on('click', 'a', function(event) {

				var href = $(this).attr('href');

				event.preventDefault();
				event.stopPropagation();

				// Hide.
					$menu._hide();

				// Redirect.
					window.setTimeout(function() {
						window.location.href = href;
					}, 250);

			});

		$menu
			.appendTo($body)
			.on('click', function(event) {

				event.stopPropagation();
				event.preventDefault();

				$body.removeClass('is-menu-visible');

			})
			.append('<a class="close" href="#menu">Close</a>');

		$body
			.on('click', 'a[href="#menu"]', function(event) {

				event.stopPropagation();
				event.preventDefault();

				// Toggle.
					$menu._toggle();

			})
			.on('click', function(event) {

				// Hide.
					$menu._hide();

			})
			.on('keydown', function(event) {

				// Hide on escape.
					if (event.keyCode == 27)
						$menu._hide();

			});

})(jQuery);

// CANVAS COMPETENCES TECHNIQUES 

var ctx = document.getElementById('can').getContext('2d');

Chart.defaults.global.title,
Chart.defaults.global.tooltips,
Chart.defaults.global.legend.fontFamily = 'Permanent Marker, cursive'

var myChart = new Chart(ctx, {
    type: 'horizontalBar',
    data: {
        labels: ['HTML','CSS','JS procédural', 'JS avancé','PHP', 'SQL', 'React', 'Angular', 'Node'],
        datasets: [{
            label: 'Niveau utilisation des Technologies de Développement Web',
            data: [60,	50,	20,	1,	15,	15,	1,	1,	1],
            backgroundColor: [

                'rgba(29, 112, 162, 0.7)',
                'rgba(108,58,68,0.7)',
                'rgba(244,215,77,0.7)',
                'rgba(37,19,81,0.7)',
                'rgba(222,186,111,0.7)',
                'rgba(130,48,56,0.7)',
                'rgba(209,96,20,0.7)',
                'rgba(141,170,157,0.7)',
                'rgba(228,149,158,0.7)'
                
           ],
            borderColor: [

                'rgba(229, 75, 75, 0.5)',
                'rgba(229, 75, 75, 0.5)',
                'rgba(229, 75, 75, 0.5)',
                'rgba(229, 75, 75, 0.5)',
                'rgba(229, 75, 75, 0.5)',
                'rgba(229, 75, 75, 0.5)',
                'rgba(229, 75, 75, 0.5)',
                'rgba(229, 75, 75, 0.5)',
                'rgba(229, 75, 75, 0.5)',
                'rgba(229, 75, 75, 0.5)'
            ],
            borderWidth: 1
        }
    ]
    },
options: {
        legend: {
            display: false,
            position: 'bottom',
            labels: {
                fontColor: "#fff",
                fontSize: 14,
                fontFamily: 'Nunito, sans-serif'
            }
        },
        title: {
            display: true,
            text: 'Niveau utilisation des Technologies de Développement Web',
            fontColor: "#fff",
            fontSize: 20,
            fontFamily: 'Nunito, sans-serif'
        },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    zeroLineColor: 'rgba(0, 0, 0, 1)',
                    display: true,
                    fontFamily: 'Nunito, sans-serif',
                    fontColor: "rgba(255, 255, 255, 0.5))",
					max: 100,
					fontSize:12
                }
            }],
            xAxes: [{
                ticks: {
                    display: true,
                    fontFamily: 'Nunito, sans-serif',
                    fontColor: "rgba(255, 255, 255, 0.5))",
					max: 100,
					fontSize:12
					
                }
            }]


        }
    }
});

// CANVAS COMPETENCES TECHNIQUES QUI MARCHE PAAAS
// var ctx = document.getElementById("canvass").getContext('2d');
  

// Chart.defaults.global.title,
// Chart.defaults.global.tooltips

// var myChart = new Chart(ctx,{
// type:'bar',
// data:{
// 		labels:['HTML','CSS','Javascript procédural', 'Javascript avancé','PHP', 'SQL', 'React', 'Angular', 'Node'], // nom des colonnes
// 		datasets:[{
// 			label:'Web Development', 
// 			data:[50,40,20,1,10,10,1,1,1], // réglages niveau des skills ! virgule à la fin crochet
			
// 		backgroundColor : ["#1D70A2",
// 							"blue",
// 							"yellow",
// 							"white",
// 							"green",
// 							"purple", "pink", "brown","cyan"], // order couleur data
// 		bordereWidth:1,
// 		borderColor:"#fff",
// 		hoverBorderWidth:3,
// 		padding:50
		
		
// 		}],
// 		options: {
// 			legend: {
// 				display: false,
// 				position: 'bottom',
// 				labels: {
// 					fontColor: "red",
// 					fontSize: 14,
// 					fontFamily: 'Nunito, sans-serif'
// 				}
// 			},
// 			title: {
// 				display: true,
// 				text: 'Niveau utilisation des Technologies de Développement Web',
// 				fontColor: "#fff",
// 				fontSize: 16,
// 				fontFamily: 'Nunito, sans-serif'
// 			},
// 			scales: {
// 				yAxes: [{
// 					ticks: {
// 						beginAtZero: true,
// 						zeroLineColor: 'rgba(255, 0, 0, 1)',
// 						display: true,
// 						fontFamily: 'Nunito, sans-serif',
// 						fontColor: "rgba(0, 0, 0, 0.5)",
// 						max: 100
// 					}
// 				}],
// 				xAxes: [{
// 					ticks: {
// 						display: true,
// 						fontFamily: 'Nunito, sans-serif',
// 						fontColor: "rgba(0, 0, 0, 0.5)",
// 						max: 100
// 					}
// 				}]
	
	
// 			}
// 		}
// 	}	
// });



							
					