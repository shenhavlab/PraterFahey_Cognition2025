
mainTask =(configParams,blockType) =>()=>{
	openFullscreen();

	var {displayFeedback,
		cleanFeedback,
		displayTracker,
		cleanTracker,
		itiAction
		} = feedbackFunctions(blockType);
	
	cueSubset = cues[blockType];


	var intervalID = 0;
	var itiDurationSet = _.shuffle(repmat(itiDurations,Math.ceil(numIntervalPerBlock/itiDurations.length)));
	var isiDurationSet = _.shuffle(repmat(isiDurations,Math.ceil(numIntervalPerBlock/isiDurations.length)));



	//Set up the sequence within the block.
	var indexList = [];
	var cueList = [];
	var intervalDurationList = [];
	var intervalNumTrialList = [];


	for(var m = 0; m < numIntervalPerBlock/(cueSubset.length * intervalDurations.length); m++)
	{
		for(var j = 0; j < intervalDurations.length; j++)
		{
			for(var i = 0; i < cueSubset.length; i++)
			{
				cueList.push(cueSubset[i]);
				intervalDurationList.push(intervalDurations[j]);
			}
		}
	}

	var selectedMask = [1,1];
	selectedMask = selectedMask.concat(repmat([0],numIntervalPerBlock - 2));			

	for(var n = 0; n < numIntervalPerBlock; n++)
	{
		indexList.push(n);
	}

	indexList = _.shuffle(indexList);

	var Loop = function(){

		intervalTimingParams.itiDuration = itiDurationSet.shift();
		intervalTimingParams.isiDuration = isiDurationSet.shift();
		trialTimingParams.itiDuration = 250;

		


		var selected;
		var cue;
		var bonused;

		
		intervalID++;
		if(intervalID <= numIntervalPerBlock){
			selected = indexList.shift()
			cue = cueList[selected];
			intervalTimingParams.intervalDur = intervalDurationList[selected];
			bonused = selectedMask[selected];
		}


		

		var calculateBonus = function(Interval)
		{
			var counter = Interval.getCounter();
			var bonus = (counter[0] * gainByBlock[Interval.cueType] + counter[0] * lossByBlock[Interval.cueType] - counter[1] * penaltyByBlock[Interval.cueType]) * bonused * price;
			return bonus;
		};

		var writeRecord = function(Record){

		 	Record.phase = "MainBlock";
		 	Record.sessionNum = sessionID;
		 	Record.blockNum = blockID;
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

		if(intervalID > numIntervalPerBlock) {
			blockPart();
		}
		else {
			var stimSet = generateStimSet(possibleStimsInCongruent,possibleStimsCongruent,numIntervalTrials);
			interval = new Interval(intervalTimingParams,htmlParams,cue,trialTimingParams,configParams,stimSet,callbacks);
			psiTurk.showPage("stage.html");
			interval.initiate();
		}
	}
	Loop();
}