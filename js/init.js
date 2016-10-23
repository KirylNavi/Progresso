// Main slider
$(window).load(function(){
	$('.main-slider-js').fractionSlider({
		'fullWidth': 			false,
		'controls': 			true, 
		'pager': 				true,
		'responsive':  			true,
		'dimensions':  			'800,400',
		'timeout' : 10000,
		'pager' : true
	});

});

// Decorate
$(window).load(function(){
	$(".decorate__item").scroolly([
		{
			from: 'el-center = vp-center + 300',
			onCheckIn: function($element, rule){
				$element.addClass("active");
			}
		}
	]);

	$(".decorate-foot").scroolly([
		{
			from: 'el-top = vp-bottom - 100',
			onCheckIn: function($element, rule){
				$element.addClass("active");
			}
		}
	]);
});

// Header 
$(window).load(function(){
	$(".head").scroolly([
		{
			minWidth: 990,
			from: 'doc-top + 50 = vp-top',
			to: 'doc-bottom = vp-center',
			onCheckOut: function($element, rule){
				$element.removeClass("scroll");
				$element.stop().animate({
					top: 0
				}, 0);
			},
			onCheckIn: function($element, rule){
				$element.addClass("scroll");
				$element.stop().animate({
					top: -55
				}, 0);
			}
		},
		{
			minWidth: 990,
			from: 'doc-top + 500 = vp-top',
			to: 'doc-bottom = vp-center',
			onCheckOut: function($element, rule){
				$element.removeClass("show");
				$element.stop().animate({
					top: -55
				}, 500);
			},
			onCheckIn: function($element, rule){
				$element.addClass("show");
				$element.stop().animate({
					top: 0
				}, 500);
			}
		}
	])
});

// Counter
$('.counter').counterUp({
    delay: 10,
    time: 3000
});



