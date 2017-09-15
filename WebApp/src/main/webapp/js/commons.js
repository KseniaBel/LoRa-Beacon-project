

function init() {
	console.log("INIT called.");
	showProgressSpinner();
	initJQgrid();
	reloadGrid();
}




(function ($) {
    $.fn.serializeFormJSON = function () {

        var o = {};
        var a = this.serializeArray();
        $.each(a, function () {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        return o;
    };
   
})(jQuery);




function initModals () {
//  Loading the modals.

	$( "#addRoomModalContainer" ).load( "addRoomModal.html", function( response, status, xhr ) {
	});
	
	$( "#addTransceiverModalContainer" ).load( "addTransceiverModal.html", function( response, status, xhr ) {
 		if ( status == 'success' && roomsList) { 		    
 			initRoomSelect(null, 'roomId');
 		}
	});
	
	$( "#addBeaconModalContainer" ).load( "addBeaconModal.html", function( response, status, xhr ) {
 		if ( status == 'success' && roomsList) { 		    
 			initRoomSelect(null, 'roomId2');
 		}
	});
}


//used in two different modals
function initRoomSelect(selectedRoomId, roomIdElement) {
	var roomIdDropDown = $('#'+roomIdElement);
	
	roomIdDropDown.multiselect({
        enableFiltering: true,
        filterBehavior: 'text'
    });
	
	roomIdDropDown.empty();
	
	if (roomsList) {
		for (var index = 0; index < roomsList.length; ++index) {
			roomIdDropDown.append($('<option>', {
                value: roomsList[index].id,
                text: roomsList[index].name
            }));
        }
		
		if (selectedRoomId) {
			roomIdDropDown.multiselect('select', selectedRoomId);
		}
		
		roomIdDropDown.multiselect('rebuild');
	}
	
}

//show progress spinner on loading
function showProgressSpinner() {
	var opts = {
	  lines: 13 // The number of lines to draw
	, length: 28 // The length of each line
	, width: 14 // The line thickness
	, radius: 51 // The radius of the inner circle
	, scale: 1 // Scales overall size of the spinner
	, corners: 1 // Corner roundness (0..1)
	, color: '#000' // #rgb or #rrggbb or array of colors
	, opacity: 0.2 // Opacity of the lines
	, rotate: 0 // The rotation offset
	, direction: 1 // 1: clockwise, -1: counterclockwise
	, speed: 1 // Rounds per second
	, trail: 60 // Afterglow percentage
	, fps: 20 // Frames per second when using setTimeout() as a fallback for CSS
	, zIndex: 2e9 // The z-index (defaults to 2000000000)
	, className: 'spinner' // The CSS class to assign to the spinner
	, top: '50%' // Top position relative to parent
	, left: '50%' // Left position relative to parent
	, shadow: false // Whether to render a shadow
	, hwaccel: false // Whether to use hardware acceleration
	, position: 'absolute' // Element positioning
	}
	var target = document.getElementById('progressSpinner')
	var spinner = new Spinner(opts).spin(target);
}

function hideProgressSpinner() {
	$('#progressSpinner').hide();
}


function getRandomColor() {
    var letters = '56789ABCD'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 8)];
    }
    return color;
}

function drawCircledLabel(canvas, x, y, diameter, elementId, text, elementData, circleStyle, title, clickFunction, font, textStyle) {
	//draw a single image for all clustered beacons
	var circleGroup = canvas.group().attr('id', elementId);
	var circle = canvas.circle(diameter)
		.data('beaconsCluster',elementData)
		.putIn(circleGroup)
		.move(x, y)
		.style(circleStyle)
		.attr('id', elementId)
		.attr('title', title)
		.on('mouseover', function(event){
			console.log(event);
		})
		.on('click',clickFunction);
	var text = canvas.text(text);
	text.putIn(circleGroup);
	text.font(font);
	text.style(textStyle)
	text.dmove(10, -3);
}
