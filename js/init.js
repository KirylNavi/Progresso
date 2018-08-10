// Desktop menu
$(document).ready(function() {
	if($('.active-menu [data-menu-desktop]').length) {

		var menu = $('[data-menu-desktop]');
		var i = 0;

		$(".active-menu [data-set-menu]").each(function() {
			var elem = $(this);
			$(menu).clone().removeClass('def').appendTo(elem);
		});

		$(".active-menu [data-fixed-bot-menu]").each(function() {
			var elem = $(this);
			$(menu).clone().removeClass('def').appendTo(elem);
		});

		$(".active-menu [data-fixed-bot-mod-menu]").each(function() {
			var elem = $(this);
			$(menu).clone().removeClass('def').appendTo(elem);
		});

		$("[data-static-opacity-menu]").each(function() {
			var elem = $(this);
			$(menu).clone().removeClass('def').appendTo(elem);
		});

		$(".active-menu [data-fixed-bot-opacity-menu]").each(function() {
			var elem = $(this);
			$(menu).clone().removeClass('def').appendTo(elem);
		});
        
	}
});

// Map
var wdthWin;

var src = 'http://verstka.mcdir.ru/new-16.kml',
	urlMarkerImg = 'http://verstka.mcdir.ru/App/images/marker-map.png',
	markers = [],
	infoWin = [],
	activeInfoWin,
	centerMap = {
		lat: 53.9045398,
		lng: 27.5615244
	};

var maxPos = {
		lat: 57,
		lng: 32
	},
	minPos = {
		lat: 51,
		lng: 23
	};

var styleMap =
	[
		{
			"featureType": "all",
			"elementType": "geometry",
			"stylers": [
				{
					"visibility": "off"
				},
				{
					"saturation": "0"
				},
				{
					"lightness": "0"
				}
			]
		},
		{
			"featureType": "all",
			"elementType": "labels.text",
			"stylers": [
				{
					"visibility": "on"
				},
				{
					"saturation": "0"
				},
				{
					"lightness": "0"
				}
			]
		},
		{
			"featureType": "administrative",
			"elementType": "labels.text",
			"stylers": [
				{
					"lightness": "9"
				},
				{
					"saturation": "0"
				},
				{
					"visibility": "off"
				}
			]
		},
		{
			"featureType": "administrative.country",
			"elementType": "labels.text",
			"stylers": [
				{
					"lightness": "0"
				},
				{
					"visibility": "off"
				},
				{
					"saturation": "0"
				},
				{
					"gamma": "1.18"
				}
			]
		},
		{
			"featureType": "administrative.country",
			"elementType": "labels.text.fill",
			"stylers": [
				{
					"saturation": "0"
				},
				{
					"lightness": "0"
				},
				{
					"visibility": "off"
				}
			]
		},
		{
			"featureType": "administrative.province",
			"elementType": "all",
			"stylers": [
				{
					"visibility": "off"
				}
			]
		},
		{
			"featureType": "administrative.province",
			"elementType": "labels",
			"stylers": [
				{
					"visibility": "on"
				},
				{
					"lightness": "0"
				}
			]
		},
		{
			"featureType": "administrative.province",
			"elementType": "labels.text",
			"stylers": [
				{
					"visibility": "off"
				}
			]
		},
		{
			"featureType": "administrative.locality",
			"elementType": "all",
			"stylers": [
				{
					"visibility": "on"
				}
			]
		},
		{
			"featureType": "administrative.locality",
			"elementType": "labels.text",
			"stylers": [
				{
					"visibility": "off"
				}
			]
		},
		{
			"featureType": "administrative.locality",
			"elementType": "labels.text.fill",
			"stylers": [
				{
					"saturation": "0"
				},
				{
					"lightness": "0"
				},
				{
					"visibility": "on"
				}
			]
		},
		{
			"featureType": "administrative.locality",
			"elementType": "labels.text.stroke",
			"stylers": [
				{
					"gamma": "0.00"
				}
			]
		},
		{
			"featureType": "administrative.neighborhood",
			"elementType": "all",
			"stylers": [
				{
					"visibility": "on"
				}
			]
		},
		{
			"featureType": "administrative.neighborhood",
			"elementType": "labels.text",
			"stylers": [
				{
					"visibility": "off"
				}
			]
		},
		{
			"featureType": "landscape",
			"elementType": "all",
			"stylers": [
				{
					"saturation": "-100"
				},
				{
					"lightness": "49"
				},
				{
					"visibility": "off"
				},
				{
					"gamma": "0.32"
				},
				{
					"weight": "0.12"
				}
			]
		},
		{
			"featureType": "landscape",
			"elementType": "geometry.fill",
			"stylers": [
				{
					"visibility": "off"
				}
			]
		},
		{
			"featureType": "landscape.man_made",
			"elementType": "all",
			"stylers": [
				{
					"visibility": "off"
				}
			]
		},
		{
			"featureType": "landscape.natural",
			"elementType": "all",
			"stylers": [
				{
					"lightness": "15"
				},
				{
					"saturation": "-100"
				},
				{
					"gamma": "2.23"
				},
				{
					"visibility": "on"
				}
			]
		},
		{
			"featureType": "poi",
			"elementType": "all",
			"stylers": [
				{
					"saturation": -100
				},
				{
					"lightness": "50"
				},
				{
					"visibility": "on"
				}
			]
		},
		{
			"featureType": "road.highway",
			"elementType": "all",
			"stylers": [
				{
					"saturation": -100
				},
				{
					"visibility": "off"
				},
				{
					"lightness": "25"
				}
			]
		},
		{
			"featureType": "road.highway",
			"elementType": "geometry.fill",
			"stylers": [
				{
					"visibility": "on"
				},
				{
					"color": "#d4d4d4"
				}
			]
		},
		{
			"featureType": "road.arterial",
			"elementType": "all",
			"stylers": [
				{
					"saturation": -100
				},
				{
					"lightness": 30
				},
				{
					"visibility": "on"
				}
			]
		},
		{
			"featureType": "road.local",
			"elementType": "all",
			"stylers": [
				{
					"saturation": -100
				},
				{
					"lightness": 40
				},
				{
					"visibility": "on"
				}
			]
		},
		{
			"featureType": "transit",
			"elementType": "all",
			"stylers": [
				{
					"saturation": -100
				},
				{
					"visibility": "simplified"
				}
			]
		},
		{
			"featureType": "water",
			"elementType": "geometry",
			"stylers": [
				{
					"lightness": -25
				},
				{
					"saturation": -97
				},
				{
					"color": "#dadada"
				},
				{
					"visibility": "on"
				}
			]
		},
		{
			"featureType": "water",
			"elementType": "labels",
			"stylers": [
				{
					"visibility": "off"
				},
				{
					"lightness": -25
				},
				{
					"saturation": -100
				}
			]
		}
	]

var settingsMap = {
	scrollwheel: true,
	disableDefaultUI: true,
	center: {lat: centerMap.lat, lng: centerMap.lng},
	draggable: true,
	zoom: 7,
	minZoom: 7,
	keyboardShortcuts: false,
	scrollwheel: false,
	styles: styleMap
};

var markerInfo = [
	{
		city: "Витебск",
		cityImg: "http://verstka.mcdir.ru/App/images/city-map/Vitebsk.jpg",
		subTitle: "Офисы, доступные в городе",
		coords: {
			lat: 55.08274854,
			lng: 30.19887542
		},
		offices: [
			{
				name: "Проспект Независимости 34, корпус 1, 2 этаж.",
				phones: [
					{
						link: "810711122233",
						txt: "8 (107) 111 222 33"
					},
					{
						link: "810711122233",
						txt: "8 (107) 111 222 33"
					},
				]
			},
			{
				name: "Ул. Макаёнка 218, 1 этаж.",
				phones: [
					{
						link: "810711122233",
						txt: "8 (107) 111 222 33"
					}
				]
			}
		]
	},
	{
		city: "Могилев",
		cityImg: "http://verstka.mcdir.ru/App/images/city-map/Mogilev.jpg",
		subTitle: "Офисы, доступные в городе",
		coords: {
			lat: 53.79215252,
			lng: 30.33959955
		},
		offices: [
			{
				name: "Проспект Независимости 34, корпус 1, 2 этаж.",
				phones: [
					{
						link: "810711122233",
						txt: "8 (107) 111 222 33"
					},
					{
						link: "810711122233",
						txt: "8 (107) 111 222 33"
					},
				]
			},
			{
				name: "Ул. Макаёнка 218, 1 этаж.",
				phones: [
					{
						link: "810711122233",
						txt: "8 (107) 111 222 33"
					}
				]
			}
		]
	},
	{
		city: "Гомель",
		cityImg: "http://verstka.mcdir.ru/App/images/city-map/Gomel.jpg",
		subTitle: "Офисы, доступные в городе",
		coords: {
			lat: 52.32550138,
			lng: 30.99608595
		},
		offices: [
			{
				name: "Проспект Независимости 34, корпус 1, 2 этаж.",
				phones: [
					{
						link: "810711122233",
						txt: "8 (107) 111 222 33"
					},
					{
						link: "810711122233",
						txt: "8 (107) 111 222 33"
					},
				]
			},
			{
				name: "Ул. Макаёнка 218, 1 этаж.",
				phones: [
					{
						link: "810711122233",
						txt: "8 (107) 111 222 33"
					}
				]
			}
		]
	},
	{
		city: "Брест",
		cityImg: "http://verstka.mcdir.ru/App/images/city-map/Brest.jpg",
		subTitle: "Офисы, доступные в городе",
		coords: {
			lat: 52.06555166,
			lng: 23.70658448
		},
		offices: [
			{
				name: "Проспект Независимости 34, корпус 1, 2 этаж.",
				phones: [
					{
						link: "810711122233",
						txt: "8 (107) 111 222 33"
					},
					{
						link: "810711122233",
						txt: "8 (107) 111 222 33"
					},
				]
			},
			{
				name: "Ул. Макаёнка 218, 1 этаж.",
				phones: [
					{
						link: "810711122233",
						txt: "8 (107) 111 222 33"
					}
				]
			}
		]
	},
	{
		city: "Гродно",
		cityImg: "http://verstka.mcdir.ru/App/images/city-map/Grodno.jpg",
		subTitle: "Офисы, доступные в городе",
		coords: {
			lat: 53.55855909,
			lng: 23.82137035
		},
		offices: [
			{
				name: "Проспект Независимости 34, корпус 1, 2 этаж.",
				phones: [
					{
						link: "810711122233",
						txt: "8 (107) 111 222 33"
					},
					{
						link: "810711122233",
						txt: "8 (107) 111 222 33"
					},
				]
			},
			{
				name: "Ул. Макаёнка 218, 1 этаж.",
				phones: [
					{
						link: "810711122233",
						txt: "8 (107) 111 222 33"
					}
				]
			}
		]
	},
	{
		city: "Минск",
		cityImg: "http://verstka.mcdir.ru/App/images/city-map/Minsk.jpg",
		subTitle: "Офисы, доступные в столице",
		coords: {
			lat: 53.80085297,
			lng: 27.56701756
		},
		offices: [
			{
				name: "Проспект Независимости 34, корпус 1, 2 этаж.",
				phones: [
					{
						link: "810711122233",
						txt: "8 (107) 111 222 33"
					},
					{
						link: "810711122233",
						txt: "8 (107) 111 222 33"
					},
				]
			},
			{
				name: "Ул. Макаёнка 218, 1 этаж.",
				phones: [
					{
						link: "810711122233",
						txt: "8 (107) 111 222 33"
					}
				]
			}
		]
	},
];

var posX,
	posY;

var itemResizeMap = 0;



function setMask(map) {
	var kmlLayerNew = new google.maps.KmlLayer( src, {
		suppressInfoWindows: true,
		preserveViewport: true,
		map: map
	});
}

function setMarkers(map) {

	markers = [];

	var markerSize = new google.maps.Size(20, 20),
		scaledSize;

	if(wdthWin <= 700) {
		markerSize = new google.maps.Size(15, 15);
		scaledSize =  new google.maps.Size(15, 15);
	}

	var iconImage = {
		url: urlMarkerImg,
		size: markerSize,
		scaledSize: scaledSize || new google.maps.Size(20, 20)
	};

	for(key in markerInfo) {
		var marker = new google.maps.Marker({
			position: {
				lat: markerInfo[key].coords.lat,
				lng: markerInfo[key].coords.lng
			},
			map: map,
			icon: iconImage,
			title: markerInfo[key].city
		});

		markers.push(marker);
	}
}

function setInfoWin() {
	infoWin = [];

	for( key in markerInfo) {

		var contentWinStart = '<div class="win-info">' +
								'<div class="win-info__decor" style="background-image: url(' +
									markerInfo[key].cityImg +
								');">' +
								'</div>' +
								'<div class="win-info__decor-shadow"></div>' +
								'<div class="win-info__contain">';

		// Add title info win
		contentWinStart += '<div class="win-info__title">' +
								'<h2 class="name-city">' +
									markerInfo[key].city +
								'</h2>' +
								'<p class="title-txt">' +
									markerInfo[key].subTitle +
								'</p>' +
							'</div>';

		if(markerInfo[key].offices.length) {

			var offices = markerInfo[key].offices;

			contentWinStart += '<div class="win-info__offices">';

			offices.forEach(function(item, i, arr) {

				contentWinStart += '<div class="win-info__offices-item">' +
										'<div class="num-office"> Офис №' +
											++i +
					                	'</div>' +
										'<div class="info-office">' +
											'<div class="info-office__name">' +
												item.name +
											'</div>';

				if(item.phones.length) {
					var phones = item.phones;

					contentWinStart += '<div class="info-office__phones">';

					phones.forEach(function(item, i, arr) {
						contentWinStart += '<a href="tel:' +
												item.link +
													'">' +
												item.txt +
											'</a>';
					});

					contentWinStart += '</div>';

				}


				contentWinStart += 	'</div>' +
									'</div>';

			});

			contentWinStart += '</div>' +
								'<div class="win-info__block-btn">' +
										'<a href="#" class="btn btn-icon border-md" data-toggle="modal" data-target="#modalContact">' +
											'Написать нам' +
											'<i class="fa fa-envelope-o ml-10"></i>' +
										'<i class=""></i>' +
									'</a>' +
								'</div>';

		}

		contentWinStart += '</div>' +

							'</div>';

		var infoWinMap = new google.maps.InfoWindow({
			content: contentWinStart,
			disableAutoPan: true
		});

		infoWin.push(infoWinMap);
	}
}

function setOpenInfoWin(map) {

	markers.forEach(function(item, i, arr) {
		markers[i].addListener('click', function() {

			var posLat = this.getPosition().lat(),
				posLng = this.getPosition().lng();

			if( wdthWin < 768 ) {
				posLat += 1.5;
			}


			map.panTo(new google.maps.LatLng(posLat, posLng));
			//map.setCenter(new google.maps.LatLng(posLat, posLng));


			if(activeInfoWin) {
				activeInfoWin.close();
			}

				infoWin[i].open(map, markers[i]);

				var iw_container = $(".gm-style-iw").parent();
				iw_container.stop().hide();

				settingStyleMap(infoWin[i]);

				activeInfoWin = infoWin[i];
				iw_container.css({
					"display": "block",
					"opacity": "0"
				});

			setTimeout(function() {
				iw_container.animate({
					opacity: 1
				}, 350);
			}, 250);


		});
	});
}

function openWinDef(i, map) {
	infoWin[i].open(map, markers[i]);

	var iw_container = $(".gm-style-iw").parent();
	iw_container.stop().hide();

	settingStyleMap(infoWin[i]);

	activeInfoWin = infoWin[i];
	iw_container.css({
		"display": "block",
		"opacity": "0"
	});

	iw_container.animate({
		opacity: 1
	}, 350);

}

function settingStyleMap(infoWin) {

	google.maps.event.addListener(infoWin, 'domready', function() {

		var iwOuter = $("#map").find('.gm-style-iw'),
			iwBackground = iwOuter.prev(),
			parentIwOuter = $(iwOuter).parent();

		parentIwOuter.css({
			"marginTop" : "20px",
			"transform" : "translateY(50%)"
		});
		iwBackground.children(':nth-child(1)').css({'display' : 'none'});
		iwBackground.children(':nth-child(2)').css({'display' : 'none'});
		iwBackground.children(':nth-child(3)').css({'display' : 'none'});
		iwBackground.children(':nth-child(4)').css({'display' : 'none'});

	});
}

function winResize(map) {
	$(window).resize(function() {
		initMap();
	});
};

function setCloseInfoWindow(map) {

	infoWin.forEach(function(item, i, arr) {

		infoWin[i].addListener( "closeclick" , function() {
			map.panTo(new google.maps.LatLng(centerMap.lat, centerMap.lng));
		});

	});

}

function setWdthWin() {
	wdthWin = $(window).width();
};

function setZoom() {
	if(wdthWin <= 700) {
		settingsMap.zoom = 6;
		settingsMap.minZoom = 6;
	} else if(wdthWin >= 2400) {
		settingsMap.minZoom = 8;
		settingsMap.zoom = 8;
	} else {
		settingsMap.minZoom = 7;
		settingsMap.zoom = 7;
	}

}

function setPosition(map) {
	posX = map.getCenter().lng();
	posY = map.getCenter().lat();
}

function boundDrag(map) {

	google.maps.event.addListener(map, 'drag', function() {
		var x = map.getCenter().lng();
		var y = map.getCenter().lat();

		if(!(y < maxPos.lat && y > minPos.lat && x > minPos.lng && x < maxPos.lng)) {
			map.setCenter(new google.maps.LatLng(posY, posX));
		} else {
			setPosition(map);
		}
	});

	google.maps.event.addListener(map, 'idle', function() {
		var x = map.getCenter().lng();
		var y = map.getCenter().lat();

		if(!(y < maxPos.lat && y > minPos.lat && x > minPos.lng && x < maxPos.lng)) {
			map.setCenter(new google.maps.LatLng(posY, posX));
		} else {
			setPosition(map);
		}
	});

}

function modalContactSuccess() {
    $(".btn-contact-form-js").on("click", function(e) {
        e.preventDefault();
        $("#modalContact").modal("hide");
        $("#modalContactSuccess").modal("show");
    });
}


function initCenterMap() {
    if( wdthWin < 768 ) {
        settingsMap.center =  {lat: centerMap.lat + 1.5, lng: centerMap.lng};
    }
}

function initMap() {
	setWdthWin();
	setZoom();
    initCenterMap();

	var map = new google.maps.Map(document.getElementById('map'), settingsMap);

	setPosition(map);
	boundDrag(map);
	setMask(map);
	setInfoWin();
	setMarkers(map);
	setOpenInfoWin(map);
	setCloseInfoWindow(map);
	settingStyleMap(map);

	if(itemResizeMap == 0) {
		openWinDef(5, map);
		winResize(map);
        modalContactSuccess();
	}

	itemResizeMap++;

}

// Menu 
$(document).ready(function() {

	var timerId;

	function elemTransform(elem, pos, priority) {
		timerId = setTimeout(  function() {
			$( elem ).queue( [] );

			if( !priority ) {
				$( elem ).css({
					'transform': 'translate3d(0,' + pos + 'px, 0)'
				});
			} else {
				//clearTimeout(timerId);

				$( elem ).css({
					'transform': 'translate3d(0,' + pos + 'px, 0) !important'
				});
			}
		} , 850 );
	};


    if($(".active-menu [data-set-menu]").length) {
        $(".active-menu [data-set-menu]").scroolly([
            {
                from: "el-top - 1000 = vp-top",
                to: "el-top - 190 = vp-top",
                onScroll: function(element, offset, length, rule) {

                    var menu = $(element).find(".menu");
                    var pos = offset - 1000;

                    elemTransform( menu , pos , false);

                }
            },
            {
                from: "el-top  = vp-top",
                to: "el-bottom - 190 = vp-top",
                onScroll: function(element, offset, length, rule) {

                    var menu = $(element).find(".menu");
                    var pos = offset;

                    elemTransform( menu , pos , false);

                }
            },
            {
                from: "el-bottom - 190 = vp-top",
                to: "el-bottom = vp-top",
                onTopIn: function(element, rule){
                    //$(element).addClass("slide-down-menu");
                    var menu = $(element).find(".menu"),
                        blockHeight = $(element).height();

                    elemTransform( menu , blockHeight , true);

                }
            },
            {
                from: "el-bottom = vp-top",
                to: "el-bottom + 3000 = vp-top",
                onScroll: function(element, offset, length, rule) {

                    var menu = $(element).find(".menu");
                    var pos =  $(element).height() + offset;

                    elemTransform( menu , pos , false);

                }
            },
            {
                from: "el-top - 190 = vp-top",
                to: "el-top = vp-top",
                onTopIn: function(element, rule){
                    var menu = $(element).find(".menu");
                    elemTransform( menu , 0 , true);
                },
            }
        ]);
    }


	if($(".active-menu [data-fixed-bot-menu]").length) {
		$(".active-menu [data-fixed-bot-menu]").scroolly([
			{
				from: 'el-top - 2000 = vp-top',
				to: 'el-top  + 170 = vp-top',
				onScroll: function(elem, offset, length, rule) {
					var menu = $(elem).find(".menu");

					$( menu ).css({
						// 'transform': 'translate3d( 0 , 0 , 0 ) !important',
						opacity: 1
					});

					elemTransform( menu , 0 , true);
				}
			},
			{
				from: 'el-top = vp-top',
				to: 'el-bottom - 190 = vp-top',
				onScroll: function(element, offset, length, rule) {

					var menu = $(element).find(".menu");
					var pos = offset;

					elemTransform( menu , pos , false);

				}
			},
			{
				from: "el-bottom - 190 = vp-top",
				to: "el-bottom = vp-top",
				onTopIn: function(element, rule){
					//$(element).addClass("slide-down-menu");
					var menu = $(element).find(".menu"),
						blockHeight = $(element).height();

					elemTransform( menu , blockHeight , true);

				}
			},
			{
				from: "el-bottom = vp-top",
				to: "el-bottom + 3000 = vp-top",
				onScroll: function(element, offset, length, rule) {

					var menu = $(element).find(".menu");
					var pos =  $(element).height() + offset;

					elemTransform( menu , pos , false);

				}
			},
		])
	}

	if($(".active-menu [data-static-opacity-menu]").length) {
		$(".active-menu [data-static-opacity-menu]").scroolly([
			{
				from: "el-top = vp-top",
				to: "el-center = vp-top",
				onScroll: function(elem, offset, length, rule) {

					var menu = $(elem).find(".menu");
					var opacityElem = 1 - offset / length;

					$( menu ).css({
						opacity: opacityElem
					});
				}
			},
			{
				from: "el-center = vp-top",
				to: "el-bottom = vp-top",
				onScroll: function(elem, offset, length, rule) {

					var menu = $(elem).find(".menu");

					$( menu ).css({
						opacity: 0
					});
				}
			}
		])
	}

	if($(".active-menu [data-fixed-bot-mod-menu]").length) {
		$(".active-menu [data-fixed-bot-mod-menu]").scroolly([
			{
				from: "el-top - 1000 = vp-top",
				to: "el-top - 190 = vp-top",
				onScroll: function(element, offset, length, rule) {

					var menu = $(element).find(".menu");
					var pos = offset - 1000;

					elemTransform( menu , pos , false);

				}
			},
			{
				from: "el-top  = vp-top",
				to: "el-bottom - 500 = vp-top",
				onScroll: function(element, offset, length, rule) {

					var menu = $(element).find(".menu");
					var pos = offset;

					elemTransform( menu , pos , false);

				}
			},
			{
				from: "el-top - 190 = vp-top",
				to: "el-top = vp-top",
				onTopIn: function(element, rule){
					//$(element).addClass("slide-top-menu");
					var menu = $(element).find(".menu");
					elemTransform( menu , 0 , true);
				}
			}
		])
	}

	if($(".active-menu [data-fixed-bot-opacity-menu]").length) {
		$(".active-menu [data-fixed-bot-opacity-menu]").scroolly([
			{
				from: "el-top = vp-bottom",
				to: "el-center = vp-bottom",
				onScroll: function(elem, offset, length, rule) {

					var menu = $(elem).find(".menu");
					var opacityElem = offset / length;

					$( menu ).css({
						opacity: opacityElem
					});

					elemTransform( menu , 0 , true);
				}
			},
			{
				from: "el-top = vp-top",
				to: "el-bottom - 500 = vp-top",
				onScroll: function(element, offset, length, rule) {

					var menu = $(element).find(".menu");
					var pos = offset;

					elemTransform( menu , pos , false);

				}
			}
		])
	}
});

// Tooltip
$(document).ready(function() {
	$('.prompt-item').tooltip()
});

// Scroll anchor
$(document).ready(function() {
	$('a[href^="#"].scroll-anchor, a[href^="."].scroll-anchor').click( function(){ // если в href начинается с # или ., то ловим клик
		var scroll_el = $(this).attr('href'); // возьмем содержимое атрибута href
		if ($(scroll_el).length != 0) { // проверим существование элемента чтобы избежать ошибки
			$('html, body').animate({ scrollTop: $(scroll_el).offset().top }, 500); // анимируем скроолинг к элементу scroll_el
		}
		return false; // выключаем стандартное действие
	});
});

// Block partners
$(document).ready(function() {
	if($("[pros-partners]").length) {
		var block = $("[pros-partners]"),
			btn = $(block).find("[btn]"),
			txtBlocks = $(block).find(".pros-partners__item-txt"),
			btnBlock = $(block).find(".pros-partners__btn");

		$(btn).on('click', function(e) {
			$(txtBlocks).slideDown(500);
			$(btnBlock).slideUp(200);
			e.preventDefault();
		})
	}
});


// Btns file
$(document).ready(function() {

	function BtnFile( el ) {
		this.label = el;
		this.txt = $(el).find(".txt");
		this.defTxt = $(el).find(".txt").clone().html();
		this.inp = $(el).find('[type="file"]');
		this.selectFile();
	}

	BtnFile.prototype.setName = function(nameFile) {
		if(nameFile) {
			$(this.txt).html(nameFile);
		} else {
			$(this.txt).html(this.defTxt);
		}
	}

	BtnFile.prototype.selectFile = function() {
		var that = this;
		$(this.inp).on('change', function() {
			var self = $(this);
			nameFile = self.val().replace(/\\/g, '/').replace(/.*\//, '');
			that.setName(nameFile);
		});
	}

	

	BtnFile.prototype.setTxt = function() {
		console.log("numFiles", numFiles)
	}


	$("[label-file]").each(function() {
		new BtnFile(this);
	});
});
// Input active if not empty value
$(document).ready(function() {
	function LabelInput(form) {
		this.form = form;
		this.init();
	}

	LabelInput.prototype.setClass = function(elem) {
		if(elem.value.length) {
			$(elem).closest(".form-group").addClass('active-elem');
		} else {
			$(elem).closest(".form-group").removeClass('active-elem');
		}	
	}

	LabelInput.prototype.init = function() {
		var self = this;
		this.inputs = $(this.form).find('input[type="text"], input[type="password"], input[type="email"], input[type="phone"], textarea');

		$(this.inputs).each(function(endx, elem) {
			self.setClass(elem);
		});

		$(this.inputs).on("input", function() { self.setClass(this); })

	}

	$("[form-table]").each(function() {
		new LabelInput(this);
	})
})

// Add wrap table content
$(document).ready(function() {
	$(".section__content table").each(function() {
		if(!$(this).hasClass('not-scrolly')) {
			$(this).wrap("<div class='scrolly-table-js horizontal-only'></div>")
		}
	});
});

// Scroll table content
$(document).ready(function() {
	var massScrollyFilter = [];

	function initScrollyFilter() {
		massScrollyFilter = [];
		$(".scrolly-table-js").each(function() {
			massScrollyFilter.push($(this).jScrollPane().data().jsp);
		});
	}

	function destroyScrollyFilter() {
		massScrollyFilter.forEach(function(item, i, arr) {
			massScrollyFilter[i].destroy();
		});
	}

	initScrollyFilter();

	$(window).resize(function() {
		if(massScrollyFilter.length) {
			destroyScrollyFilter();
			initScrollyFilter();
		}
	});
});

// Selectpicker
$(document).ready(function() {

	$(".selectpicker").on("changed.bs.select", function(e) {

		console.log("Select: ", e);

		$(e.currentTarget).prevAll(".dropdown-toggle").attr("data-change", "true");

	});

});

// Mob menu active
$(document).ready(function() {
	var body = $("body"),
	mobBtn = $("[mob-btn-menu]");

	$(mobBtn).on("click", function() {
		$(body).toggleClass('active-mob-menu');
	})
});

// Title slider
$(document).ready(function() {

	var startTouchX;

	var titleSliderOption = {
		nextButton: '.swiper-btn-next',
		prevButton: '.swiper-btn-prev',
		autoplay: false,
		loop: true,
		speed: 1500,
		spaceBetween: 200,
		effect: 'coverflow',
		grabCursor: false,
		simulateTouch: false,
		touchAngle: 0,
		coverflow: {
			rotate: 0,
			depth: 1800,
			stretch: -100,
			slideShadows: false
		},
		direction: 'vertical',
		slidesPerView: 1,
		onTouchStart: function(swiper, event) {

			startTouchX = event.changedTouches[0].clientX;

		},
		onTouchEnd: function(swiper, event) {

			var endTouchX = event.changedTouches[0].clientX;
			var length = endTouchX - startTouchX;

			if(length > 50) {

				$(titleSlider)[0].slideNext();

			} else if(length < -50) {

				$(titleSlider)[0].slidePrev();

			}

		}

	};

	var titleBgSliderOption = {
		speed: 100,
		effect: 'fade',
		grabCursor: false,
		simulateTouch: false,
		touchReleaseOnEdges: false,
		fade: {
			crossFade: true
		},		
		loop: true,
		slidesPerView: 1
	};


	var titleSlider = new Swiper('[title-slider]', titleSliderOption);   
	var titleBgSlider = new Swiper('[title-bg-slider]', titleBgSliderOption);

	titleSlider.params.control = titleBgSlider;
	titleBgSlider.params.control = titleSlider;
});

// Slider firms
$(document).ready(function() {
	var sliderFirmsOption = {
		speed: 500,
		slidesPerView: 7,
		loop: true,
		nextButton: '.slider-firms__arrow.prev',
		prevButton: '.slider-firms__arrow.next',
		breakpoints: {
			1920: {
				slidesPerView: 6
			},
			1660: {
				slidesPerView: 5
			},
			1439: {
				slidesPerView: 4
			},
			1119: {
				slidesPerView: 3
			},
			768: {
				slidesPerView: 4,
				centeredSlides: true,
				initialSlide: 3,
				spaceBetween: 20
			},
			540: {
				slidesPerView: 2,
				centeredSlides: true,
				initialSlide: 3,
				spaceBetween: 50
			}
		}
	};

	var sliderFirms = new Swiper('[slider-firms]', sliderFirmsOption);
});

// Init slider info
$(document).ready(function(){

	var startTouchX;

	var sliderInfoOption = {
		nextButton: '.slider-info-btn-next',
		prevButton: '.slider-info-btn-prev',
		speed: 1500,
		effect: 'coverflow',
		loop: true,
		spaceBetween: 200,
		autoplay: 5000,
		grabCursor: false,
		simulateTouch: false,
		touchAngle: 0,
		coverflow: {
			rotate: 0,
			depth: 2000,
			stretch: -100,
			slideShadows: false
		},
		onTouchStart: function(swiper, event) {

			startTouchX = event.changedTouches[0].clientX;

		},
		onTouchEnd: function(swiper, event) {

			var endTouchX = event.changedTouches[0].clientX;
			var length = endTouchX - startTouchX;

			if(length > 50) {

				$(sliderInfo)[0].slideNext();

			} else if(length < -50) {

				$(sliderInfo)[0].slidePrev();

			}

		},
		direction: 'vertical',
		slidesPerView: 1
	};

	var sliderInfoBgOptions = {
		speed: 0,
		loop: true,
		effect: 'fade',
		fade: {
			crossFade: true
		},
		slidesPerView: 1
	};


	var sliderInfo = new Swiper('[slider-info]', sliderInfoOption);   
	var sliderInfoBg = new Swiper('[bg-slider-info]', sliderInfoBgOptions);

	sliderInfo.params.control = sliderInfoBg;
	sliderInfoBg.params.control = sliderInfo;
});

// Init slider info
$(document).ready(function(){

	var sliderOption = {
		nextButton: '.block-slider-history .btn-slider-next',
		prevButton: '.block-slider-history .btn-slider-prev',
		pagination: '.block-slider-history .swiper-pagination',
		spaceBetween: 0,
		slidesPerView: 1,
		effect: 'fade',
		speed: 1000,
		loop: true,
		fade: {
			crossFade: true
		},
		grabCursor: false,
		paginationClickable: true
	};


	var sliderHistory = new Swiper('[slider-history]', sliderOption);   
});

// Slider benefits
$(document).ready(function() {

	var startTouchX;

	var sliderOption = {
		nextButton: '.slider-benefits-btn-next',
		prevButton: '.slider-benefits-btn-prev',
		speed: 1500,
		effect: 'coverflow',
		loop: true,
		spaceBetween: 200,
		grabCursor: false,
		simulateTouch: false,
		touchAngle: 0,
		coverflow: {
			rotate: 0,
			depth: 2000,
			stretch: -100,
			slideShadows: false
		},
		onTouchStart: function(swiper, event) {

			startTouchX = event.changedTouches[0].clientX;

		},
		onTouchEnd: function(swiper, event) {

			var endTouchX = event.changedTouches[0].clientX;
			var length = endTouchX - startTouchX;

			if(length > 50) {

				$(sliderBenefits)[0].slideNext();

			} else if(length < -50) {

				$(sliderBenefits)[0].slidePrev();

			}

		},
		direction: 'vertical',
		slidesPerView: 1
	};

	var sliderBenefits = new Swiper('[slider-benefits]', sliderOption);

	$(".slider-benefits-btn-next[data-copy]").on('click', function() {
		sliderBenefits.slideNext();
	});

	$(".slider-benefits-btn-prev[data-copy]").on('click', function() {
		sliderBenefits.slidePrev();
	});
});

// Init main line
$(document).ready(function() {
	var propLine = {
		def: "M-87.1-2150l0,167.5l0,4.7l0,4.6l0,3.4l0,3.1l0.1,10332.1",
		anim1: "M-87.1-2150l0,167.5c0,0-9.4,1.5-9.4,4.4s9.4,4.8,9.4,4.8s5,1.3,5,3.4c0,2.1-5,3.1-5,3.1l0.1,10332.1",
		anim2: "M-87.1-2150l0,167.5c0,0,5.6,1.6,5.6,4.6c0,3-5.6,4.7-5.6,4.7s-3.8,1.2-3.8,3.3c0,2.1,3.8,3.2,3.8,3.2l0.1,10332.1"
	};

	var activeTitle;

	$(window).resize(function() {
		if($(activeTitle).length) {
			$(".block-decor").css({
				top: activeTitle.offset().top + 5,
				opacity: 1,
				backgroundColor: color
			})
		}
	});

	function Line(el) {
		this.el = el;

		this.createLine();
		this.initEvent();
		this.initScrolly();
	}

	Line.prototype.createLine = function() {
		var wrapContain = document.createElement('div');
		wrapContain.className = 'wrap-line';
		this.el.appendChild(wrapContain);

		var contain = this.el.querySelector(".wrap-line");

		var svgContain = document.createElementNS("http://www.w3.org/2000/svg", "svg");
		contain.appendChild(svgContain);

		s = Snap(contain.querySelector( 'svg' ));

		s.attr({
			viewBox: "-112 -2150 50 5000",
			preserveAspectRatio: "none",
			x: "0",
			y: "0"
		});

		this.line = s.path(propLine.def);
	};

	Line.prototype.initEvent = function() {
		//this.el.addEventListener( 'click', this.animateLine.bind(this) );
	};

	Line.prototype.setPosBlockDecor = function(el) {
		activeTitle = el;
		var title = $(el).find(".section [title-line]");

		if(!$(el).find(".section").length) {
			title = $(el).find('h1');
		}
		color = "#fff";

		if ($(el).hasClass("blue-line")) {
			color = "#00bff2";
		}

		if(title.length) {
			activeTitle = title;

			$(".block-decor").css({
				top: title.offset().top + 5,
				opacity: 1,
				backgroundColor: color
			})
		}
	};

	Line.prototype.initScrolly = function() {
		var self = this;

		$(this.el).scroolly([
		{
			from: "el-top = vp-top + 400",
			onCheckIn: function(el, rule){
				self.setPosBlockDecor(el);
			},
		},
		{
			to: "vp-top = el-top + 100",
			onCheckOut: function(el, rule){
				self.setPosBlockDecor(el);
			}
		},
		{
			from: "el-top = vp-top + 200",
			onCheckIn: function(el, rule){
				self.animateLine();
			},

		},
		{
			to: "vp-top = el-top",
			onCheckOut: function($element, rule){
				self.animateLine();
			}
		}
		]);
	}

	Line.prototype.animateLine = function() {
		var self = this;

		self.line.stop().animate({'d': propLine.anim1}, 150, mina.easeinout, function() {
			self.line.stop().animate({'d': propLine.anim2}, 250, mina.easeinout, function() {
				self.line.stop().animate({'d': propLine.def}, 150, mina.easeinout, function() {

				})
			})
		})
	} ;

	[].slice.call(document.querySelectorAll('.block-line')).forEach(function( el ) {
		new Line(el);
	});
});

// Cnvas animate
$(document).ready(function() {
    if($(".test-animate-canvas").length) {

        var wavesPath = {
            el0: {
                path: "M460.2,225.3v33.1h-8.3L460.2,225.3",
                fill: '#D4EFFC'
            },
            el1: {
                path: "M457.4,65.6c1-3.2,2-6.4,2.9-9.6v169.3l-8.3,33.1h-56.4L457.4,65.6",
                fill: "#C7EAFB"
            },
            el2: {
                path: "M414.5,93.7c13-31.1,17.7-63.3,15.6-94.1h30V56c-0.9,3.2-1.8,6.4-2.9,9.6l-61.8,192.8H346L414.5,93.7",
                fill: "#B9E6FA"
            },
            el3: {
                path: "M377.9,110.5c18-36.3,22.2-75.1,15.7-110.9h36.5c2,30.8-2.7,62.9-15.6,94.1L346,258.4h-41.4L377.9,110.5",
                fill: "#ABE1FA"
            },
            el4: {
                path: "M16.9,258.4l-17.1-22.1v22.1H16.9 M349.1,116.8l-76,141.6h31.6l73.3-147.8c18-36.3,22.2-75.1,15.7-110.9h-32.6C372.1,36.5,369.6,78.6,349.1,116.8z",
                fill: "#9DDCF9"
            },
            el5: {
                path: "M41.4,258.4l-41.6-63.2v41.1l17.1,22.1H41.4 M327.2,128.8l-82.9,129.6h28.7l76-141.6c20.5-38.2,23-80.3,12-117.1h-24C354.6,38.6,353.6,87.5,327.2,128.8z",
                fill: "#8ED8F8"
            },
            el6: {
                path: "M65.1,258.4c-1.7-2.4-3.4-4.8-5.1-7.4l-11.2-16.4l-49-87.1v47.7l41.6,63.2H65.1 M305.5,136.6l-89.9,121.1c-0.1,0.2-0.3,0.4-0.4,0.6h29.2l82.9-129.6c26.4-41.3,27.3-90.2,9.9-129.1h-27.9C335.4,37.6,337.5,93.5,305.5,136.6z",
                fill: "#7ED3F7"
            },
            el7: {
                path: "M-0.2,61.7c2.6-23.5,13.4-45.5,29.9-62H-0.2V61.7 M92.3,258.4c-8.8-6.8-17.2-16.4-24.9-29.4l-9.1-14.7l-48.1-95.8c-5.8-11.5-9.1-23.3-10.4-35v64l49,87.1L60,250.9c1.7,2.6,3.4,5.1,5.1,7.4H92.3z M286.2,139.2l-83.3,102c-4,4.9-11.5,11.3-21.3,17.1h33.6c0.1-0.2,0.3-0.4,0.4-0.6l89.9-121.1c32-43.1,29.9-99.1,3.7-137h-31.6C315.1,31.7,322.4,94.9,286.2,139.2z",
                fill: "#6DCFF6"
            },
            el8: {
                path: "M268.7,140.9c42.8-47.5,24.6-125-34.5-139.4c-2.5-0.6-5.5-1.2-8.8-1.9h52.2c37.5,32,44.8,95.2,8.6,139.6l-83.3,102c-4,4.9-11.5,11.3-21.3,17.1H92.3c-8.8-6.8-17.2-16.4-24.9-29.4l-9.1-14.7l-48.1-95.8c-5.8-11.5-9.1-23.3-10.4-35V61.7c2.6-23.5,13.4-45.5,29.9-62h34.1C28.8,22.2,11,68.1,30,111l37.7,85.2l7.3,13.2c36,69.5,102.4,32.8,117.1,16.5L268.7,140.9",
                fill: "#5BCBF5"
            },
            el9: {
                path: "M225.4-0.4H63.8C28.8,22.2,11,68.1,30,111l37.7,85.2l7.3,13.2c36,69.5,102.4,32.8,117.1,16.5l76.7-85c42.8-47.5,24.6-125-34.5-139.4C231.7,0.9,228.8,0.3,225.4-0.4 M251.9,141.2l-69.1,69.4c-13.3,13.4-71.5,41.9-99.4-19l-5.7-11.6l-28.6-74.4C30.5,57.3,64.6,7.2,113,2.1c6.6-0.7,13.5-0.5,20.5,0.6c0,0,71.6,11.1,94.8,18C278.2,35.5,290.5,102.5,251.9,141.2z",
                fill: "#44C8F5"
            },
            el10: {
                path: "M228.2,20.7c-23.2-6.9-94.8-18-94.8-18c-7-1.1-13.9-1.3-20.5-0.6c-48.4,5-82.5,55.2-63.8,103.6l28.6,74.4l5.7,11.6c27.9,60.9,86.1,32.3,99.4,19l69.1-69.4C290.5,102.5,278.2,35.5,228.2,20.7 M235.4,144.2l-64.8,52.9c-12.5,10.2-64.5,29.3-82.8-24.9L84,161.9L66.3,96.1c-11.6-42.8,21.8-82.4,63.4-82.4c5.7,0,11.5,0.7,17.4,2.3c0,0,59.8,15.8,78.9,23.7C267.1,56.7,271.6,114.7,235.4,144.2z",
                fill: "#20C4F4"
            },
            el11: {
                path: "M235.4,144.2l-64.8,52.9c-12.5,10.2-64.5,29.3-82.8-24.9L84,161.9L66.3,96.1c-11.6-42.8,21.8-82.4,63.4-82.4c5.7,0,11.5,0.7,17.4,2.3c0,0,59.8,15.8,78.9,23.7C267.1,56.7,271.6,114.7,235.4,144.2z",
                fill: "#00C0F3"
            }
        };

        var canvas = document.querySelector(".canvas");


        for (key in wavesPath) {

            var ctx = canvas.getContext('2d');
            var p = new Path2D(wavesPath[key].path);
            ctx.fillStyle = wavesPath[key].fill;
            ctx.fill(p);

        }
    }
});

// Slider firms animate items
$(document).ready(function() {
    $(".slider-firms").each(function() {

        $(this).on('mouseenter', '.slider-firms__item', function() {
            $(this).addClass("active");
        });

        $(this).on('mouseleave', '.slider-firms__item', function() {

            var that = this;

            setTimeout(function() {
                $(that).removeClass("active");
            }, 200);

        })

    });

});

// Init waves
$(document).ready(function() {

	var wavesPath = {
		el0: {
			path: "M460.2,225.3v33.1h-8.3L460.2,225.3",
			fill: '#D4EFFC'
		},
		el1: {
			path: "M457.4,65.6c1-3.2,2-6.4,2.9-9.6v169.3l-8.3,33.1h-56.4L457.4,65.6",
			fill: "#C7EAFB"
		},
		el2: {
			path: "M414.5,93.7c13-31.1,17.7-63.3,15.6-94.1h30V56c-0.9,3.2-1.8,6.4-2.9,9.6l-61.8,192.8H346L414.5,93.7",
			fill: "#B9E6FA"
		},
		el3: {
			path: "M377.9,110.5c18-36.3,22.2-75.1,15.7-110.9h36.5c2,30.8-2.7,62.9-15.6,94.1L346,258.4h-41.4L377.9,110.5",
			fill: "#ABE1FA"
		},
		el4: {
			path: "M16.9,258.4l-17.1-22.1v22.1H16.9 M349.1,116.8l-76,141.6h31.6l73.3-147.8c18-36.3,22.2-75.1,15.7-110.9h-32.6C372.1,36.5,369.6,78.6,349.1,116.8z",
			fill: "#9DDCF9"
		},
		el5: {
			path: "M41.4,258.4l-41.6-63.2v41.1l17.1,22.1H41.4 M327.2,128.8l-82.9,129.6h28.7l76-141.6c20.5-38.2,23-80.3,12-117.1h-24C354.6,38.6,353.6,87.5,327.2,128.8z",
			fill: "#8ED8F8"
		},
		el6: {
			path: "M65.1,258.4c-1.7-2.4-3.4-4.8-5.1-7.4l-11.2-16.4l-49-87.1v47.7l41.6,63.2H65.1 M305.5,136.6l-89.9,121.1c-0.1,0.2-0.3,0.4-0.4,0.6h29.2l82.9-129.6c26.4-41.3,27.3-90.2,9.9-129.1h-27.9C335.4,37.6,337.5,93.5,305.5,136.6z",
			fill: "#7ED3F7"
		},
		el7: {
			path: "M-0.2,61.7c2.6-23.5,13.4-45.5,29.9-62H-0.2V61.7 M92.3,258.4c-8.8-6.8-17.2-16.4-24.9-29.4l-9.1-14.7l-48.1-95.8c-5.8-11.5-9.1-23.3-10.4-35v64l49,87.1L60,250.9c1.7,2.6,3.4,5.1,5.1,7.4H92.3z M286.2,139.2l-83.3,102c-4,4.9-11.5,11.3-21.3,17.1h33.6c0.1-0.2,0.3-0.4,0.4-0.6l89.9-121.1c32-43.1,29.9-99.1,3.7-137h-31.6C315.1,31.7,322.4,94.9,286.2,139.2z",
			fill: "#6DCFF6"
		},
		el8: {
			path: "M268.7,140.9c42.8-47.5,24.6-125-34.5-139.4c-2.5-0.6-5.5-1.2-8.8-1.9h52.2c37.5,32,44.8,95.2,8.6,139.6l-83.3,102c-4,4.9-11.5,11.3-21.3,17.1H92.3c-8.8-6.8-17.2-16.4-24.9-29.4l-9.1-14.7l-48.1-95.8c-5.8-11.5-9.1-23.3-10.4-35V61.7c2.6-23.5,13.4-45.5,29.9-62h34.1C28.8,22.2,11,68.1,30,111l37.7,85.2l7.3,13.2c36,69.5,102.4,32.8,117.1,16.5L268.7,140.9",
			fill: "#5BCBF5"
		},
		el9: {
			path: "M225.4-0.4H63.8C28.8,22.2,11,68.1,30,111l37.7,85.2l7.3,13.2c36,69.5,102.4,32.8,117.1,16.5l76.7-85c42.8-47.5,24.6-125-34.5-139.4C231.7,0.9,228.8,0.3,225.4-0.4 M251.9,141.2l-69.1,69.4c-13.3,13.4-71.5,41.9-99.4-19l-5.7-11.6l-28.6-74.4C30.5,57.3,64.6,7.2,113,2.1c6.6-0.7,13.5-0.5,20.5,0.6c0,0,71.6,11.1,94.8,18C278.2,35.5,290.5,102.5,251.9,141.2z",
			fill: "#44C8F5"
		},
		el10: {
			path: "M228.2,20.7c-23.2-6.9-94.8-18-94.8-18c-7-1.1-13.9-1.3-20.5-0.6c-48.4,5-82.5,55.2-63.8,103.6l28.6,74.4l5.7,11.6c27.9,60.9,86.1,32.3,99.4,19l69.1-69.4C290.5,102.5,278.2,35.5,228.2,20.7 M235.4,144.2l-64.8,52.9c-12.5,10.2-64.5,29.3-82.8-24.9L84,161.9L66.3,96.1c-11.6-42.8,21.8-82.4,63.4-82.4c5.7,0,11.5,0.7,17.4,2.3c0,0,59.8,15.8,78.9,23.7C267.1,56.7,271.6,114.7,235.4,144.2z",
			fill: "#20C4F4"
		},
		el11: {
			path: "M235.4,144.2l-64.8,52.9c-12.5,10.2-64.5,29.3-82.8-24.9L84,161.9L66.3,96.1c-11.6-42.8,21.8-82.4,63.4-82.4c5.7,0,11.5,0.7,17.4,2.3c0,0,59.8,15.8,78.9,23.7C267.1,56.7,271.6,114.7,235.4,144.2z",
			fill: "#00C0F3"
		}
	};

	function Waves( el, timeAnimate, delayAnimate, delayRepeatAnimate, angle ) {
		this.el = el;
        this.anim = $(this.el).hasClass('animate-wave') ? true : false ;
		this.waves = [];
		this.filters = [];
		this.timeAnimate = timeAnimate || 500;
		this.delayAnimate = delayAnimate || 100;
		this.delayRepeatAnimate = delayRepeatAnimate || 1000;
		this.angle = angle || 10;

		this.createWaves();
		this.animateWaves();
	}

	Waves.prototype.firstAnimate = function() {

		var that = this,
			countWaves = that.waves.length - 1,
			timeOpacity = that.delayAnimate * (countWaves + 1);

		setTimeout( function() {

			that.waves.forEach(function (item, i, arr) {

				if (i !== countWaves) {

					setTimeout(function () {

						that.waves[i].animate( { opacity: 0}, timeOpacity , mina.easeout);
						//that.waves[i].animate( { strokeWidth: 0}, timeOpacity / 2, mina.linear);

						Snap.animate(0, that.angle, function (val) {

							that.waves[i].transform('r' + val + ',158,105');

						}, that.timeAnimate, mina.easein);

						Snap.animate(0, 3, function (val) {

							that.filters[i].attributes[0].value = val + ', ' + val;

						}, timeOpacity / 1.5, mina.easein);

						timeOpacity -= that.delayAnimate;

					}, i * that.delayAnimate);

				} else {

					setTimeout(function () {

						that.waves[i].animate( { opacity: 0}, timeOpacity * 2, mina.easeout);
						//that.waves[i].animate( { strokeWidth: 0}, timeOpacity / 2, mina.linear);

						Snap.animate(0, that.angle, function (val) {

							that.waves[i].transform('r' + val + ',158,105');

						}, that.timeAnimate, mina.easein, that.secondAnimate.bind(that));

						Snap.animate(0, 3, function (val) {

							that.filters[i].attributes[0].value = val + ', ' + val;

						}, timeOpacity, mina.easein / 1.5);

						timeOpacity -= that.delayAnimate;

					}, i * that.delayAnimate);

				}

			});

		}, that.delayRepeatAnimate);

	};

	Waves.prototype.secondAnimate = function() {

		var that = this,
			countWaves = that.waves.length - 1,
			timeOpacity = that.delayAnimate * (countWaves + 1);

			console.log("timeOpacity: ", timeOpacity);

			for(var i = countWaves; i >= 0; --i) {

				var item = countWaves - i;

					(function(i) {

						if(i !== 0) {

							setTimeout(function () {

								that.waves[i].animate( { opacity: 1}, timeOpacity , mina.easein);
								//that.waves[i].animate( { strokeWidth: }, timeOpacity / 2, mina.linear);

								Snap.animate(that.angle, 0, function (val) {

									that.waves[i].transform('r' + val + ',158,105');

								}, that.timeAnimate, mina.easeout);


								Snap.animate(3, 0, function (val) {

									that.filters[i].attributes[0].value = val + ', ' + val;

								}, that.timeAnimate, mina.easeout);

								timeOpacity -= that.delayAnimate;

							}, item * that.delayAnimate);


						} else {

							setTimeout(function () {

								that.waves[i].animate( { opacity: 1}, timeOpacity , mina.easein);
								//that.waves[i].animate( { strokeWidth: }, timeOpacity / 2, mina.linear);

								Snap.animate(that.angle, 0, function (val) {

									that.waves[i].transform('r' + val + ',158,105');

								}, that.timeAnimate, mina.easeout, that.firstAnimate.bind(that));


								Snap.animate(3, 0, function (val) {

									that.filters[i].attributes[0].value = val + ', ' + val;

								}, that.timeAnimate, mina.easeout);

								timeOpacity -= that.delayAnimate;

							}, item * that.delayAnimate);

						}
					})(i);

			}



	};

	Waves.prototype.animateWaves = function() {

        if(this.anim) {
            this.firstAnimate();
        }

	};

	Waves.prototype.createWaves =  function() {
		var svgContain = document.createElementNS("http://www.w3.org/2000/svg", "svg");

		this.el.appendChild(svgContain);

		s = Snap(this.el.querySelector( 'svg' ));
		s.attr({
			viewBox: "0 0 460.2 258.3",
			preserveAspectRatio: "none",
			x: "0",
			y: "0"
		});

		for (key in wavesPath) {

			var wave = s.path(wavesPath[key].path).attr({
				fill: wavesPath[key].fill,
				strokeWidth: '30px',
				stroke: wavesPath[key].fill
			});

			//var wave = s.path(wavesPath[key].path).attr({ fill: wavesPath[key].fill});
			this.waves.push(wave);

		}

		// Create filters blur for elements

		for(var i = 0; i < this.waves.length; i++) {

			var f = s.filter(Snap.filter.blur( 0, 0 ));
			var filterChild = f.node.firstChild;
			f.attr({ x: "-50%", y: "-50%", width: "200%", height: "200%" });
			this.waves[i].attr({ filter: f });
			this.filters.push(filterChild);

		}

	};

	if(document.querySelector('.career-right-col-decor-js')) { 
		new Waves ( document.querySelector('.career-right-col-decor-js'), 80, 60, 1000, 7);
	}

	if(document.querySelector('.career-left-col-decor-js')) {
		new Waves ( document.querySelector('.career-left-col-decor-js'), 80, 60, 1000, 7);
	}


});

// Set height bg waves
$(document).ready(function() {
	var careerContain = $("[career]"),
	topBg = $("[career-top-bg]"),
	botBg = $("[career-bot-bg] svg");

	function setHeightBg() {
		var hContain = $(careerContain).height();
		var bgSize = "auto " + (hContain + 5) + "px";

		$(topBg).css({"backgroundSize": bgSize});
		$(botBg).css({"height": hContain});
	}

	setHeightBg();

	$(window).resize(function() {
		setHeightBg();
	});

});



// Create decor block
$(document).ready(function() {
	if($(".block-line").length) {
		var blockDecorate = document.createElement('div');
		blockDecorate.className = "block-decor";
		document.body.appendChild(blockDecorate);

	}
});

