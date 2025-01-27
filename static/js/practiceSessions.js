intervalPractice = (configParams) =>()=>{
	/*** Step 1: Define how you want to display interval-end feedback ***/

	openFullscreen();
	var qualified = false;
	trialTimingParams.itiDuration = 0;

	var {
		displayFeedback,
		cleanFeedback,
		displayTracker,
		cleanTracker
	} = setPracticefeedbackFunctions();

	var intervalDurationSet = _.shuffle(repmat(intervalDurations,Math.ceil(numIntervalPractice/intervalDurations.length)));
	var itiDurationSet = _.shuffle(repmat(itiDurations,Math.ceil(numIntervalPractice/itiDurations.length)));
	var isiDurationSet = _.shuffle(repmat(isiDurations,Math.ceil(numIntervalPractice/isiDurations.length)));
	var intervalNum = 0;

	var Loop = function(){
		intervalNum++;
		if(intervalNum > numIntervalPractice & (qualified|intervalNum>6)) {
			//closeFullscreen();
			blockPart();
		}
		else{
			if(intervalNum > numIntervalPractice)
			{
				intervalDurationSet = _.shuffle(intervalDurations);
				itiDurationSet = _.shuffle(itiDurations);
				isiDurationSet = _.shuffle(isiDurations);
			}

			var intervalDur = intervalDurationSet.shift();
			var itiDuration = itiDurationSet.shift();
			var isiDuration = isiDurationSet.shift();
			var stimSet = generateStimSet(possibleStimsInCongruent,possibleStimsCongruent,numIntervalTrials);

			var calculateBonus = function(I)
			{
				var bonus = NaN;
				if(I.counter[0]>=intervalDur/1000) qualified = true;
				return bonus;
			};

			var writeRecord = function(Record){

			 	Record.phase = "IntervalPractice";
			 	Record.sessionNum = NaN;
			 	Record.blockNum = NaN;
			 	Record.intervalNum = intervalNum;
			 	Record.intervalType = NaN;
			 	Record.intervalLength = intervalDur;
			 	Record.platform = platform;
			 	psiTurk.recordTrialData(Record);
			};

			var callbacks = {
				endOfInterval:Loop,
				displayFeedback:displayFeedback,
				cleanFeedback:cleanFeedback,
				displayTracker:displayTracker,
				cleanTracker:cleanTracker,
				recordStimCallback:recordStim,
				writeRecord:writeRecord,
				calculateBonus:calculateBonus,
			};

			intervalTimingParams.intervalDur = intervalDur;
			intervalTimingParams.itiDuration = itiDuration;
			intervalTimingParams.isiDuration = isiDuration;

			trialTimingParams.itiDuration = 250;

			var interval = new Interval(intervalTimingParams,htmlParams,0,trialTimingParams,configParams,stimSet,callbacks);
			interval.initiate();
		}		

	}
	psiTurk.showPage("stage.html");
	Loop();
}






mainPractice = (configParams,practiceType) =>()=>{

	//var configParams = {space:false,accFeedback:false,washout:false,tally:true};

	/*** The cues are specified as [path,cueType] ***/
	openFullscreen();


	var itiDurationSet = _.shuffle(repmat(itiDurations,Math.ceil(numMainPractice/itiDurations.length)));
	var isiDurationSet = _.shuffle(repmat(isiDurations,Math.ceil(numMainPractice/isiDurations.length)));


	var cueSet = _.shuffle(repmat(practiceCues[practiceType],Math.ceil(numMainPractice/practiceCues[practiceType].length)));
	var intervalID = 0;
	var interval = 0;


	// will have to change this depending on the feedback you want 
	var {displayFeedback,
	     cleanFeedback,
	     displayTracker,
	     cleanTracker,
	 	 itiAction} = feedbackFunctions(practiceType);
	
	var Loop = function(){

		intervalID++;
		
		
		var calculateBonus = function(Interval)
		{
			var bonus = 0;
			return bonus;
		};

		intervalTimingParams.intervalDur = practiceDuration;
		intervalTimingParams.itiDuration = itiDurationSet.shift();
		intervalTimingParams.isiDuration = isiDurationSet.shift();

		var writeRecord = function(Record){
			Record.phase=practiceType;
		 	Record.sessionNum = NaN;
		 	Record.blockNum = NaN;
		 	Record.intervalNum = intervalID;
		 	Record.intervalType = cue[1];
		 	Record.intervalLength = intervalTimingParams.intervalDur;
		 	Record.platform = platform;
		 	psiTurk.recordTrialData(Record);
		};

		var callbacks = {
			endOfInterval:Loop,
			displayFeedback:displayFeedback,
			cleanFeedback:cleanFeedback,
			displayTracker:displayTracker,
			cleanTracker:cleanTracker,
			recordStimCallback:recordStim,
			writeRecord:writeRecord,
			calculateBonus:calculateBonus,
			itiAction:itiAction
		};

		var cue = cueSet.shift();
		trialTimingParams.itiDuration = 250;
		
		if(intervalID > numMainPractice) 
		{
			blockPart();
		}
		else
		{
			
			var stimSet = generateStimSet(possibleStimsInCongruent,possibleStimsCongruent,numIntervalTrials);
			interval = new Interval(intervalTimingParams,htmlParams,cue,trialTimingParams,configParams,stimSet,callbacks);


			psiTurk.showPage("stage.html");
			interval.initiate();
		}
	}
	Loop();
}
