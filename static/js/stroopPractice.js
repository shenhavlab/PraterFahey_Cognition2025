//file for the functions to call for interference practice


stroopPractice = (configParams)=>()=>{

	openFullscreen();

	var stimSet = possibleStimsCongruent.concat(possibleStimsInCongruent);
	var stimSet = _.shuffle(repmat(stimSet,Math.ceil(numStroopPracticeTrials/stimSet.length)));

	var writeRecord = function(Record){

	 	Record.phase = "StroopPractice";
	 	Record.sessionNum = NaN;
	 	Record.blockNum = NaN;
	 	Record.intervalNum = NaN;
	 	Record.intervalType = NaN;
	 	Record.intervalLength = NaN;
	 	Record.moneyEarned = NaN;
	 	Record.platform = platform;
	 	psiTurk.recordTrialData(Record);
	};

	var nextAction = function(trial){
		console.log("inside nextAction")

		if(trial.counter[0] < 5){
			var tempset = possibleStimsCongruent.concat(possibleStimsInCongruent);
			trial.stimSet = [tempset[randi(0,tempset.length-1)]];
			trial.initiation();
			return;
		}
		//what to do next
		blockPart();
	};

	var callbacks = {
		endOfSetCallback:nextAction,
		trackerCallback:0,
		recordStimCallback:recordStim,
		completeRecordCallback:writeRecord,
	};
	trialTimingParams.itiDuration = 500;
	psiTurk.showPage("stage.html");
	var trial = new timedTrial(stimSet,[false],[0,0],trialTimingParams,htmlParams,callbacks,configParams);
	$("body").unbind("keydown").focus().keydown(trial.responseListener.bind(trial));
	trial.initiation();
}