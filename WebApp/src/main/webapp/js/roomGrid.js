
 function reloadGrid() {
	 $.ajax({
	         url: 'http://localhost:8080/LoRaBeacon/rest/room/list',
	         contentType : 'application/json',
	         method:'get',
	         success: function(response) {
	        	 roomsList = response;
	        	 
	        	 jQuery("#jqGrid")
	        	    .jqGrid('setGridParam',
	        	        { 
	        	            datatype: 'local',
	        	            data:roomsList
	        	        })
	        	    .trigger("reloadGrid");
	        	 
	        	 initModals();
	        	 hideProgressSpinner();
		     },
		     error: function(error) {
		    	 hideProgressSpinner();
		    	 alert(error.status + ": " +error.statusText );
		    	 console.error(error);
		     }
	     });  
 }
 


function transceiverFormatter (cellvalue, options, rowObject) {
	var html = '';
	
	if (rowObject.transceivers && rowObject.transceivers.length > 0) {
		for (var i = 0 ; i < rowObject.transceivers.length; i ++) {
			html +="<!-- Split button -->"+
			"<div class=\"btn-group\">" +
			"			  <button type=\"button\" class=\"btn btn-default\">"+rowObject.transceivers[i].id+"</button>" +
			"			  <button type=\"button\" class=\"btn btn-default dropdown-toggle\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">" +
			"			    <span class=\"caret\"></span>" +
			"			    <span class=\"sr-only\">Toggle Dropdown</span>" +
			"			  </button>" +
			"			  <ul class=\"dropdown-menu\">" +
			"			    <li><a href=\"#\" onclick=\"editTransceiver("+rowObject.id +","+rowObject.transceivers[i].id+")\">Edit</a></li>" +
			"			    <li><a href=\"#\" onclick=\"deleteTransceiver("+rowObject.transceivers[i].id+")\">Delete</a></li>" +
			"			  </ul>" +
			"			</div>";
		}
		
		return html;
	}
	 
	
	
	return 'N/A';
}

function beaconFormatter (cellvalue, options, rowObject) {
	var html = '';
	
	if (rowObject.beacons && rowObject.beacons.length > 0) {
		for (var i = 0 ; i < rowObject.beacons.length; i ++) {
			html +="<!-- Split button -->"+
			"<div class=\"btn-group\">" +
			"			  <button type=\"button\" class=\"btn btn-default\">"+rowObject.beacons[i].idBeacon+"</button>" +
			"			</div>";
		}	
		return html;
	}
	return 'N/A';
}


function actionsFormatter (cellvalue, options, rowObject,iColNum){	
	actions = "" +
			"<div title=\"Edit selected row\" " +
			"	style=\"float:left;cursor:pointer;\" " +
			"	class=\"ui-pg-div ui-inline-edit\" " +
			"	onclick=\"editRow("+rowObject.id+");\" " +
			"	onmouseover=\"jQuery(this).addClass('active');\" " +
			"	onmouseout=\"jQuery(this).removeClass('active');\">" +
			"		<span class=\"glyphicon glyphicon-edit\"></span>" +
			"</div>" +
			"<div title=\"Delete selected row\" " +
			"	style=\"float:left;cursor:pointer;\" " +
			"	class=\"ui-pg-div ui-inline-del\" " +
			"	onclick=\"deleteRow("+rowObject.id+");\" " +
			"	onmouseover=\"jQuery(this).addClass('active');\" " +
			"	onmouseout=\"jQuery(this).removeClass('active');\">" +
			"		<span class=\"glyphicon glyphicon-trash\"></span>" +
			"</div>" +
			"<div title=\"View room\" " +
			"	style=\"float:left;cursor:pointer;\" " +
			"	class=\"ui-pg-div ui-inline-del\" " +
			"	onclick=\"viewRoom("+rowObject.id+");\" " +
			"	onmouseover=\"jQuery(this).addClass('active');\" " +
			"	onmouseout=\"jQuery(this).removeClass('active');\">" +
			"		<span class=\"glyphicon glyphicon-eye-open\"></span>" +
			"</div>" +
			"";
	return actions;
}


function deleteRow(roomId) {
	bootbox.confirm("Are you sure?", function(isConfirmed) {
		if (isConfirmed) {
			$.ajax({
		         url: 'rest/room/'+roomId,
		         method:'delete',
		         success: function(response) {
		        	 reloadGrid();
			     },
			     error: function(error) {
			    	 console.error(error);
			    	 bootbox.alert("Deletion failed! Reason: " + error.statusText, function(){});
			     }
		     });
		}
	}); 
}

function editRow(roomId) {
	var selectedRoom;
	
	for(var i=0; i<roomsList.length; i++) {
		if (roomsList[i].id == roomId) {
			selectedRoom = roomsList[i];
			break;
		}
	}
	
	var roomModal = $("#exampleModal");
	roomModal.find('#room-id').val(selectedRoom.id);
	roomModal.find('#room-name').val(selectedRoom.name);
	roomModal.find('#height-text').val(selectedRoom.height);
	roomModal.find('#width-text').val(selectedRoom.width);
	roomModal.find('#length-text').val(selectedRoom.length);
	roomModal.find('#submitFormBtn').addClass('hide');
	roomModal.find('#updateFormBtn').removeClass('hide');
	roomModal.find('#exampleModalLabel').text('Update Room');
	
	roomModal.modal();
}

function viewRoom(roomId) {
	
	$('#viewRoomModalContainer').load( "viewRoomModal.html", function( response, status, xhr ) {
		renderRoom( roomId, response, status, xhr);
		});
	
	$('#viewRoomModalContainer').on('hide.bs.modal', function () {
		$('#clusterPopup').hide();
	});
}


function initJQgrid () {
    $("#jqGrid").jqGrid({
        datatype: "local",
        colModel: [
           
            {
				label: 'Room ID',
                name: 'id'
            },
            {
				label : 'Room Name',
                name: 'name',
                editable: false // must set editable to true if you want to make the field editable
            },
            {
				label: 'ID of transceivers',
               
                editable: false,
                formatter: transceiverFormatter
            },
            {
				label: 'ID Of Beacons',
                name: 'IdOfBeacons',
                formatter: beaconFormatter,
                editable: false
            },
            {
				label: "Actions",
                name: "actions",
                formatter: actionsFormatter
            }
        ],
		sortname: 'RoomID',
		loadonce: true,
        loadonce: true,
        rowNum: 5,
        rowList: [5, 10, 20, 50],
        pager: "#jqGridPager",
    });
}



function renderRoom(roomId, response, status, xhr ) {
		if ( status == 'success' && roomsList) {
			var roomModal = $("#viewRoomModal");
			var canvas   = SVG('canvas');
			var transceiverIcon = canvas.image('images/antenna.png', 20, 18) //adjust the size of image
					.hide();
			var beaconIcon = canvas.image('images/icon_beacon.png', 18, 28)  //adjust the size of image
					.hide();
			
		var selectedRoom;
		var width = 800;
			var length = 600;

			//lookup the selected room
		for(var i=0; i<roomsList.length; i++) {
			if (roomsList[i].id == roomId) {
				selectedRoom = roomsList[i];
				break;
			}
		}

		//calculating scale factor used to compute coordinates in the canvas
		scaleFactor = selectedRoom.width/width;
		if (scaleFactor < selectedRoom.length/length) {
			scaleFactor = selectedRoom.length/length;
		}
			
		//draw room scales 
		drawRoomScales(canvas, width, length)
		
		//draw the room frame
		canvas.rect(selectedRoom.width/scaleFactor, selectedRoom.length/scaleFactor).fill('none').stroke({ width: 2, color: 'blue'});
		
        //draw the transceivers
		drawTransceivers(selectedRoom.transceivers, scaleFactor, transceiverIcon)
		
		//this will be a two dimensional array containing all beacons 
		// those that overlap will be placed in the same array
		var beaconCluster = new Array();
		beaconHistoryList =  new Array(selectedRoom.beacons.length); 
		
		
        //build beacons cluster
		for(var y=0;y<selectedRoom.beacons.length; y++){
			addBeaconToCluster(selectedRoom.beacons[y], beaconCluster, 18*scaleFactor, 28*scaleFactor);
			
			var beaconHistory = {
				'beaconId': selectedRoom.beacons[y].idBeacon,
				'isShown': false, 
				'color': getRandomColor()
			};
			beaconHistoryList[y] = beaconHistory;
		}
		
		// draw the beacons/cluster
		drawBeaconsClusters(canvas, beaconCluster, scaleFactor, beaconIcon);

			roomModal.modal();
		}
}

function drawRoomScales(canvas, width, length) {
	//draw the horizontal scale
	for (var i=0; i< width; i ++) {
		if (i%50 == 0) {
			//draw long line
			canvas.line(i, 0, i, 10).stroke({ width: 1, color: 'gray'});
		}
		if (i%5 == 0) {
			// draw short line
			canvas.line(i, 0, i, 5).stroke({ width: 1, color: 'gray'});
		}
	}

	//draw the vertical scale
	for (var i=0; i< length; i ++) {
		if (i%50 == 0) {
			//draw long line
			canvas.line(0, i, 10, i).stroke({ width: 1, color: 'gray'});
		}
		if (i%5 == 0) {
			// draw short line
			canvas.line(0, i, 5, i).stroke({ width: 1, color: 'gray'});
		}
	}
}

function drawTransceivers(transceivers, scaleFactor, transceiverIcon) {
	for(var y=0;y<transceivers.length; y++){
		selectedTranseiver = transceivers[y];
		transceiverIcon.clone().show()
			.style('cursor', 'pointer')
			.attr('id', selectedTranseiver.id)
			.attr('title', "Transceiver ID:" + selectedTranseiver.id)
			.move(selectedTranseiver.x/scaleFactor, selectedTranseiver.y/scaleFactor)
			.on('mouseover', function(event){
				console.log(event);
			});
	}
}

function drawBeaconsClusters(canvas, beaconCluster, scaleFactor, beaconIcon) {
	for(var y=0;y<beaconCluster.length; y++){
		var currentBeacon = beaconCluster[y][0];
		
		//check if it is a cluster of beacons or just one
		if (beaconCluster[y].length == 1) {
			var tempBeacon = beaconIcon.clone().show()
				.data('beaconsCluster', beaconCluster[y])
				.move(currentBeacon.x/scaleFactor-9, currentBeacon.y/scaleFactor)
				.style('cursor', 'pointer')
				.attr('id', currentBeacon.idBeacon)
				.attr('title', "Beacon ID:" + currentBeacon.idBeacon)
				 .on('mouseover', function(event){
					console.log(event);
				})
				.on('click',showBeaconClusterDetails);
		} else {
			drawCircledLabel(canvas,
					 currentBeacon.x/scaleFactor,
					 currentBeacon.y/scaleFactor,
					 20,
					 y,
					 beaconCluster[y].length.toString(),
					 beaconCluster[y],
					 {cursor: 'pointer', 
						stroke: 'black', 
						'stroke-width': '2px', 
						fill: 'silver',
						opacity: 0.6},
					"Clusterred Beacons",
					showBeaconClusterDetails,
					{
						size:  12, 
						anchor:   'middle'
						},
					{cursor: 'pointer', 
						stroke: 'blue', 
						'stroke-width': '1px'});
		}
	}
}

