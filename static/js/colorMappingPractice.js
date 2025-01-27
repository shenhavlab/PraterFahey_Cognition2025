//file for the functions to call for keyMapping practice
colorMappingPractice = (configParams) =>()=>{

	openFullscreen();

	var stimSet = _.shuffle(repmat(possibleStimsNeutral,Math.ceil(numColorPracticeTrials/possibleStimsNeutral.length)));
	
	var writeRecord = function(Record){

	 	Record.phase = "ColorMappingPractice";
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
		if(trial.counter[0] < 5){
			trial.stimSet = [possibleStimsNeutral[randi(0,possibleStimsNeutral.length-1)]];
			trial.initiation();
			return;
		}
		blockPart();
	}

	var callbacks = {
		endOfSetCallback:nextAction,
		trackerCallback:0,
		recordStimCallback:recordStim,
		completeRecordCallback:writeRecord,
	};
	
	trialTimingParams.itiDuration = 500;

	var trial = new timedTrial(stimSet,[false],[0,0],trialTimingParams,htmlParams,callbacks,configParams);
	psiTurk.showPage("stage.html");
	$("body").unbind("keydown").focus().keydown(trial.responseListener.bind(trial));
	trial.initiation();
}