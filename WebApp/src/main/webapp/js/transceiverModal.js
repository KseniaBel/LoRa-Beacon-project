
function editTransceiver(roomId, transceiverId){
    var selectedTranseiver;
    var selectedRoom;
    
	
	for(var i=0; i<roomsList.length; i++) {
		if (roomsList[i].id == roomId) {
			selectedRoom = roomsList[i];
			for(var y=0;y<selectedRoom.transceivers.length; y++){
				if(selectedRoom.transceivers[y].id == transceiverId){
					selectedTranseiver = selectedRoom.transceivers[y];
					break;
				}
			}
		}
	}
	
	var transceiverModal = $("#transceiverModal");
	transceiverModal.find('#trans-id').val(selectedTranseiver.id);
	transceiverModal.find('#height-text').val(selectedTranseiver.x);
	transceiverModal.find('#width-text').val(selectedTranseiver.y);
	transceiverModal.find('#length-text').val(selectedTranseiver.z);
	transceiverModal.find('#submitTransceiverFormBtn').addClass('hide');
	transceiverModal.find('#updateTransceiverFormBtn').removeClass('hide');
	transceiverModal.find('#trans-id').attr("readonly", true);//we must not update the ID!!! 
	transceiverModal.find('#transceiverModalLabel').text('Update Transceiver');
    initRoomSelect(selectedTranseiver.roomId);
	transceiverModal.modal();
}


function deleteTransceiver(transceiverId){
	bootbox.confirm("Delete transceiver?", function(isConfirmed) {
		if (isConfirmed) {
			$.ajax({
		         url: 'rest/transceiver/'+transceiverId,
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




function resetToCreateTransceiverForm() {
	var transceiverModal = $("#transceiverModal");
	transceiverModal.find('#submitTransceiverFormBtn').removeClass('hide');
	transceiverModal.find('#updateTransceiverFormBtn').addClass('hide');
	transceiverModal.find('#transceiverModalLabel').text('Add transceiver');
	transceiverModal.find('#trans-id').attr("readonly", false);
	$('#createTransceiverForm')[0].reset();
}



function submitTransceiverForm(method) {
	
	$('#createTransceiverForm').formValidation('validate');
	
	if ($('#createTransceiverForm').data('formValidation').isValid()) {
		 $.ajax({
	         url: 'rest/transceiver',
	         contentType : 'application/json',
	         method:method,
	         data: JSON.stringify($("#createTransceiverForm").serializeFormJSON()),
	         success: function(response) {
			         $('#transceiverModal').modal('hide');
			         $('body').removeClass('modal-open');
			         $('.modal-backdrop').remove();
			         $('#createTransceiverForm')[0].reset();
		        	 reloadGrid();
			     },
			     error: function(error) {
			    	 bootbox.alert(error.statusText, function() {/*do nothing*/});
			    	 console.error(error.responseText);
			     }
		     }); 
		 $("#createTransceiverForm").formValidation('resetForm', true); 
	}
}
