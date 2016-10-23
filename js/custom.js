// Btn mobile header
var $ = jQuery;
$(document).ready(function() {
	var $ = jQuery;
	$(".head-btn-js").click(function(){
		$(this).toggleClass("active");
		$(".mob-menu-list-js").stop(false, false).slideToggle();
	});
});

// Tabs
$(document).ready(function(){
	var $ = jQuery;
	$(".tabs-js").each(function(){
		var itemNav = $(this).find(".tabs-item-nav"),
		itemContent = $(this).find(".tabs-item-content"),
		timeAnimate = 500,
		defActive;

		function visibleContent(num) {
			$(itemContent).css("display", "none");
			$("[data-content = " + num + "]").fadeIn(timeAnimate);
		}

		// Default vissible content
		$(itemNav).each(function(){
			if($(this).hasClass("active")) {
				var numActive = $(this).data("nav");
				defActive = numActive;

				visibleContent(numActive);               
			}
		});

		// Click vissible
		$(itemNav).click(function(){
			var numActive = $(this).data("nav");

			if(numActive != defActive) { 
				$(itemNav).removeClass("active");
				$(this).addClass("active");
				defActive = numActive;

				visibleContent(numActive);
			}
			
		});

	});
})

// Google map
$(document).ready(function(){
	var containMap = $(".map-js"),
		titleMap = $(containMap).find(".map__txt");

	function closeMap(e) {
		if (!$(e.target).closest(containMap).length) {
		    $(titleMap).fadeIn();
		    $(containMap).removeClass("active");
		    $(document).off('click', closeMap);

		}

		e.stopPropagation();
	}

	$(containMap).click(function(){
		if(!$(this).hasClass("active")) {
			$(this).addClass("active");
			$(titleMap).fadeOut(500);
			$(document).on('click', closeMap);
		}
	});
})

//Count basket
$(document).ready(function(){
	$(".count-js").each(function(){
		$(this).click(function(event){
			var inp = $(this).find(".count__item"),
				numCurrent = $(inp).val();

			if($(event.target).hasClass("count__btn-plus")) {
				$(inp).val(++numCurrent);
			}

			if($(event.target).hasClass("count__btn-minus")) {
				if(numCurrent != 1) {
					$(inp).val(--numCurrent);
				}
			}
		})
	})
});

// Popover
// $(document).ready(function(){
// 	var allElem = $(".popover-js").find("[data-popover-content]");

// 	function hideContent(event) {
// 		if(!$(event.target).hasClass("popover-js")) {
// 			$(allElem).fadeOut();
// 			$("body").off("hideContent");
// 		}
// 	}

// 	$(".popover-js").each(function(){
// 		var btn = $(this).find("[data-popover-btn]"),
// 			content = $(this).find("[data-popover-content]");

// 		$(btn).click(function(event){
// 			$(allElem).fadeOut();
// 			$(content).fadeToggle();
// 			event.stopPropagation();
// 			$("body").on("click", hideContent);
// 		});
// 	});
// });