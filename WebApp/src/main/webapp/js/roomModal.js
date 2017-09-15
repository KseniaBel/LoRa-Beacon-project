
function showBeaconHistoryDetails(mouseEvent) {
	console.log(mouseEvent);
	if ($("#historyPopup").is(":visible")) {
		$("#historyPopup").hide();
	} else {
		$("#historyPopup").attr('style', 'left: '+ mouseEvent.clientX+'px; top: '+ mouseEvent.clientY+'px;');

		var historyBeacon = JSON.parse(mouseEvent.currentTarget.firstChild.attributes.getNamedItem('data-beaconsCluster').value);
		
		var popupHtml = "<span class='glyphicon glyphicon-remove-circle history'></span><ol>";
		var beaconHistoryConfig = getBeaconHistoryConfig(historyBeacon.idBeacon);
		popupHtml += "<li style='background-color:"+beaconHistoryConfig.color+"'><span class='beacon link'>id: " + historyBeacon.idBeacon + 
					 ", x: "+ historyBeacon.x +
					 ", y: "+ historyBeacon.y +
					 ", z: "+ historyBeacon.z +"</span></li>";
		popupHtml +="</ol>";
		$("#historyPopup").html(popupHtml);
		
		$(".glyphicon.glyphicon-remove-circle.history").on('click', function() {
			$('#historyPopup').hide();
		});
	}
}


function showBeaconClusterDetails(mouseEvent) {

	console.log(mouseEvent);
	if ($("#clusterPopup").is(":visible")) {
		$("#clusterPopup").hide();
	} else {
		$("#clusterPopup").attr('style', 'left: '+ mouseEvent.clientX+'px; top: '+ mouseEvent.clientY+'px;');

		var clusteredBeacons;
		
		//check if it is a single beacon or a cluster of beacons
		if (mouseEvent.target.attributes.getNamedItem('data-beaconsCluster')) {
			clusteredBeacons = JSON.parse(mouseEvent.target.attributes.getNamedItem('data-beaconsCluster').value);
		} else { // this is a cluster
			clusteredBeacons = JSON.parse(mouseEvent.currentTarget.firstChild.getAttribute('data-beaconsCluster'));
			clusteredBeacons.sort(compareClusterredBeacons);
		}
		
		var popupHtml = "<span class='glyphicon glyphicon-remove-circle'></span><ol>";
		for(var i=0;i<clusteredBeacons.length;i++) {
			var beaconHistoryConfig = getBeaconHistoryConfig(clusteredBeacons[i].idBeacon);
			popupHtml += "<li style='background-color:"+beaconHistoryConfig.color+"'><span class='beacon link'>id: " + clusteredBeacons[i].idBeacon + 
						 ", x: "+ clusteredBeacons[i].x +
						 ", y: "+ clusteredBeacons[i].y +
						 ", z: "+ clusteredBeacons[i].z +"</span>" 
						 +"<span class='glyphicon glyphicon-list-alt' data-beaconId='"+clusteredBeacons[i].idBeacon+"'></span>" +"</li>";
		}
		popupHtml +="</ol>";
		$("#clusterPopup").html(popupHtml);
		
		$(".glyphicon.glyphicon-remove-circle").on('click', function() {
			$('#clusterPopup').hide();
		});
		
		$(".glyphicon.glyphicon-list-alt").on('click', function(){
			showHideBeaconHistory(this.attributes.getNamedItem('data-beaconid').value);
		});
		
	}

}

function showHideBeaconHistory(beaconId) {
	var beaconHistoryConfig = getBeaconHistoryConfig(beaconId);
	
	if (beaconHistoryConfig.isShown) {
		beaconHistoryConfig.isShown = false;
		$("#historyOf"+beaconId).remove();
		refreshLegend();
	} else {
		beaconHistoryConfig.isShown = true;
		displayFullBeaconHistory(beaconId, beaconHistoryConfig.color);
	}
}

function displayFullBeaconHistory(beaconId, color) {
	 $.ajax({
	        url: 'rest/beacon/history/' + beaconId,
	        contentType : 'application/json',
	        method:'get',
	        success: function(beaconHistoryArray) {
	        	var canvas   = SVG('canvas');
	        	var groupHistory = canvas.group().attr('id', "historyOf"+beaconId);
	        	var previousPosition = beaconHistoryArray[0];
	        	
	        	for (var i = 1; i < beaconHistoryArray.length; i ++ ) {
	        			groupHistory.line(previousPosition.x/scaleFactor, 
	        				previousPosition.y/scaleFactor, 
	        				beaconHistoryArray[i].x/scaleFactor,
	        				beaconHistoryArray[i].y/scaleFactor).stroke({ width: 2, 'color': color});
	        		
	        		drawCircledLabel(groupHistory,
	        				previousPosition.x/scaleFactor -9,
	        				previousPosition.y/scaleFactor -9,
							 18,
							 i+"_beaconHistoryLabel_"+beaconId,
							 i.toString(),
							 previousPosition, //for the moment we don't need data to be kept
							 {cursor: 'pointer', 
								stroke: color, 
								'stroke-width': '1px', 
								fill: 'black',
								opacity: 0.8},
							"History of beacon ID " + beaconId,
							showBeaconHistoryDetails, //no click function yet
							{
								size:  9, 
								anchor:   'middle'
								},
							{cursor: 'pointer', 
								stroke: color, 
								'stroke-width': '1px'});
	        		previousPosition = beaconHistoryArray[i];
	        	}
	        	refreshLegend();
		     },
		     error: function(error) {
		    	 alert(error);
		     }
	    });
}

function refreshLegend() {
	var legendHtml = "<ul>";
	for(var i=0;i<beaconHistoryList.length;i++) {
		if (beaconHistoryList[i].isShown) {
			legendHtml += "<li><span class='legendColorDash' style='background-color: "+beaconHistoryList[i].color+"'></span> Beacon ID:" + beaconHistoryList[i].beaconId +"</li>";
		}
	}
	legendHtml +="</ul>";
	$("#beaconLegendBar").html(legendHtml);
}

function getBeaconHistoryConfig(beaconId) {
	for(var i=0;i<beaconHistoryList.length; i++) {
		if (beaconHistoryList[i].beaconId == beaconId) {
			return beaconHistoryList[i];
		}
	}
	return null;
}

function compareClusterredBeacons(beaconA, beaconB) {
	return beaconA.z - beaconB.z;
}

function addBeaconToCluster(beaconToAdd, cluster, clusterFactorX, clusterFactorY) {
	var isClustered = false;
	
	for(var i=0; i<cluster.length; i++){
		if(Math.abs(cluster[i][0].x - beaconToAdd.x)<clusterFactorX 
				&& Math.abs(cluster[i][0].y - beaconToAdd.y)<clusterFactorY){
			isClustered = true;
			cluster[i].push(beaconToAdd);	
		}
	}
	
	if (!isClustered) {
		newCluster = new Array();
		newCluster.push(beaconToAdd);
		cluster.push(newCluster);
	}
	
}


function resetToCreateRoomForm() {
	var roomModal = $("#exampleModal");
	roomModal.find('#submitFormBtn').removeClass('hide');
	roomModal.find('#updateFormBtn').addClass('hide');
	roomModal.find('#exampleModalLabel').text('Create Room');
	$('#createRoomForm')[0].reset();
}



function submitRoomModal(method) {
	
	$('#createRoomForm').formValidation('validate');
	
	if ($('#createRoomForm').data('formValidation').isValid()) {
		 $.ajax({
	        url: 'rest/room',
	        contentType : 'application/json',
	        method:method,
	        data: JSON.stringify($("#createRoomForm").serializeFormJSON()),
	        success: function(response) {
		         $('#exampleModal').modal('hide');
		       	 $('body').removeClass('modal-open');
		         $('.modal-backdrop').remove();
		        	
		       	reloadGrid();
		      
		     },
		     error: function(error) {
		    	 bootbox.alert(error.statusText, function() {/*do nothing*/});
		    	 console.error(error.responseText);
		    
		     }
	    });
	    $("#createRoomForm").formValidation('resetForm', true); 
	}
}


