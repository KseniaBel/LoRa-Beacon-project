
function resetToCreateBeaconForm() {
	var beaconModal = $("#beaconModal");
	beaconModal.find('#submitBeaconFormBtn').removeClass('hide');
	beaconModal.find('#updateBeaconFormBtn').addClass('hide');
	beaconModal.find('#beaconModalLabel').text('Add beacon');
	$('#createBeaconForm')[0].reset();
}



function submitBeaconForm(method) {
	$('#createBeaconForm').formValidation('validate');
	
	if ($('#createBeaconForm').data('formValidation').isValid()) {
	
		 $.ajax({
	        url: 'rest/beaconDetails',
	        contentType : 'application/json',
	        method:method,
	        data: JSON.stringify($("#createBeaconForm").serializeFormJSON()),
	        success: function(response) {
			         $('#beaconModal').modal('hide');
			         $('body').removeClass('modal-open');
			         $('.modal-backdrop').remove();
			         $('#createBeaconForm')[0].reset();
		        	 reloadGrid();
			     },
			     error: function(error) {
			    	 bootbox.alert(error.statusText, function() {/*do nothing*/});
			    	 console.error(error.responseText);
			     }
		     }); 
		 $("#createBeaconForm").formValidation('resetForm', true); 
	}
}