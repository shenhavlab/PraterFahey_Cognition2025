

var endOfTask = function() {
	psiTurk.showPage('postTask.html');

	psiTurk.recordUnstructuredData('incorrectC1', incorrectC1);
 	psiTurk.recordUnstructuredData('incorrectC2', incorrectC2);
 	psiTurk.recordUnstructuredData('incorrectP1', incorrectP1);
  	psiTurk.recordUnstructuredData('incorrectP2', incorrectP2);
	
	psiTurk.recordUnstructuredData('incorrectGain_Pun1', incorrectGain_Pun1);
	psiTurk.recordUnstructuredData('incorrectGain_Pun2', incorrectGain_Pun2);
	psiTurk.recordUnstructuredData('incorrectGain1_Pun', incorrectGain1_Pun);
	psiTurk.recordUnstructuredData('incorrectGain2_Pun', incorrectGain2_Pun);
	
	psiTurk.recordUnstructuredData('incorrectLoss_Pun1', incorrectLoss_Pun1);
	psiTurk.recordUnstructuredData('incorrectLoss_Pun2', incorrectLoss_Pun2);
	psiTurk.recordUnstructuredData('incorrectLoss1_Pun', incorrectLoss1_Pun);
	psiTurk.recordUnstructuredData('incorrectLoss2_Pun', incorrectLoss2_Pun);
	

	$("#next").click(function () {
	
		psiTurk.saveData({
			success: function(){
				psiTurk.computeBonus('compute_bonus',
					function(response){
						
						
						//location.replace(redirect_link+
						//			'?WorkerID='+response['workerId']+'&bo='+response['bonus']+'&id='+response['sid']);
						

						//psiTurk.completeHIT();


						if(redirect)
							location.replace(redirect_link+'?WorkerID='+response['workerId']+'&AssignmentID='+response['assignmentId']+'&bo='+parseFloat(response['bonus']).toFixed(2)+'&PLATFORM='+response['platform']+'&order='+condition);
						else
							location.replace("https://www.google.com");

						

			});
        	}, 
           // error: prompt_resubmit
    	});
	});
	
};