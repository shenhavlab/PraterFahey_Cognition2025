Questionnaire =()=>{

 	var error_message = "<h1>Oops!</h1><p>Something went wrong submitting your HIT. This might happen if you lose your internet connection. Press the button to resubmit.</p><button id='resubmit'>Resubmit</button>";

 	record_responses = function() {

 		psiTurk.recordTrialData({'phase':'postquestionnaire', 'status':'submit'});

 		$('textarea').each( function(i, val) {
 			psiTurk.recordUnstructuredData(this.id, this.value);
 		});
 		$('select').each( function(i, val) {
 			psiTurk.recordUnstructuredData(this.id, this.value);		
 		});

 	};

 	prompt_resubmit = function() {
 		document.body.innerHTML = error_message;
 		$("#resubmit").click(resubmit);
 	};

 	resubmit = function() {
 		document.body.innerHTML = "<h1>Trying to resubmit...</h1>";
 		reprompt = setTimeout(prompt_resubmit, 10000);
		
 		psiTurk.saveData({
 			success: function() {
 				clearInterval(reprompt); 
 				//psiTurk.completeHIT();

 				psiTurk.computeBonus('compute_bonus', function(){
                 	 		psiTurk.completeHIT(); //Call compute_bonus function for automatic bonus calculation (By Jason)
                  }); 

             }, 
             error: prompt_resubmit
         });
 	};

 	psiTurk.showPage('postquestionnaire.html');
 	psiTurk.recordTrialData({'phase':'postquestionnaire', 'status':'begin'});

 	psiTurk.recordUnstructuredData('incorrect1', incorrect1);
 	psiTurk.recordUnstructuredData('incorrect2', incorrect2);
 	psiTurk.recordUnstructuredData('incorrect3', incorrect3);

	
 	$("#next").click(function () {
 		record_responses();
 		psiTurk.saveData({
 			success: function(){
 				psiTurk.computeBonus('compute_bonus',function(){
 				psiTurk.completeHIT();});
             }, 
             error: prompt_resubmit});
 	});
};