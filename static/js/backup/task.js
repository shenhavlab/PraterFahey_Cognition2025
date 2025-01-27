/***********************************************
*  		 	   v101 TSS PARADIGM  			   *
************************************************/

/*
 * Requires:
 *     psiturk.js
 *     utils.js
 */

// Initalize psiturk object
var psiTurk = new PsiTurk(uniqueId, adServerLoc, mode);

var mycondition = condition;  // these two variables are passed by the psiturk server process
var mycounterbalance = counterbalance;  // they tell you which condition you have been assigned to
// they are not used in the stroop code but may be useful to you
// All pages to be loaded
var pages = [
"instructions/instruct-story1.html",
"instructions/instruct-story2.html",
"instructions/instruct-0.html",
"instructions/instruct-1.html",
"instructions/instruct-2.html",
"instructions/instruct-2Q.html",
"instructions/instruct-3P.html",
"instructions/instruct-3LP1.html",
"instructions/instruct-3LP2.html",
"instructions/instruct-3LPB.html",
"instructions/instruct-3LPQ1.html",
"instructions/instruct-3LPQ2.html",
"instructions/instruct-3HP1.html",
"instructions/instruct-3HP2.html",
"instructions/instruct-3HPB.html",
"instructions/instruct-3HPQ1.html",
"instructions/instruct-3HPQ2.html",
"instructions/instruct-3M2.html",
"instructions/instruct-Main-Sample.html",
"instructions/instruct-ready.html",
"instructions/instruct-ready-space.html",
"instructions/break-remind.html",
"instructions/break.html",
"instructions/break-low-reward.html",
"instructions/break-high-reward.html",
"instructions/break-low-punish.html",
"instructions/break-high-punish.html",
"stage.html",
"postquestionnaire.html",
"postquestionnaire_LRLP.html",
"postquestionnaire_LRHP.html",
"postquestionnaire_HRLP.html",
"postquestionnaire_HRHP.html",
];

psiTurk.preloadPages(pages);

var instruction1Pages = [
//"instructions/instruct-0.html",
"instructions/instruct-story1.html",
"instructions/instruct-1.html",
"instructions/instruct-ready.html",
];

var instruction2Pages = [
"instructions/instruct-2.html",
"instructions/instruct-2Q.html",
"instructions/instruct-ready.html"
];

var instruction3Pages = [
"instructions/instruct-3P.html",
"instructions/instruct-ready.html",
];

var instructionLowPunPages = [
"instructions/instruct-story2.html",
"instructions/instruct-3LP1.html",
"instructions/instruct-3LPB.html",
"instructions/instruct-3LPQ1.html",
"instructions/instruct-3LPQ2.html",
"instructions/instruct-3LP2.html",
"instructions/instruct-ready.html"
];

var instructionHighPunPages = [
"instructions/instruct-3HP1.html",
"instructions/instruct-3HPB.html",
"instructions/instruct-3HPQ1.html",
"instructions/instruct-3HPQ2.html",
"instructions/instruct-3HP2.html",
"instructions/instruct-ready.html"
];


var postPracticeBreak = [
"instructions/instruct-Main-Sample.html",
"instructions/instruct-3M2.html"
]


var BreakLowRewardPage = [
"instructions/break-low-reward.html",
"instructions/break-remind.html"
];


var BreakHighRewardPage = [
"instructions/break-high-reward.html",
"instructions/break-remind.html"
];


var BreakLowPunishPage = [
"instructions/break-low-punish.html",
"instructions/break-remind.html"
];


var BreakHighPunishPage = [
"instructions/break-high-punish.html",
"instructions/break-remind.html"
];


var BreakPage = [
"instructions/break.html"
];



var htmlParams = {
	title:'#t',
	stim:'#m',
	tally:'#b',
};





var intervalDurations = [40000,50000,60000,70000];
var trialNums = [30,40,50,60];
var itiDurations = [1000,1500,2000];
var isiDurations = [500,750];
var test = true;
var redirect = false;



if(redirect)
{
	redirect_link = 'https://brown.co1.qualtrics.com/jfe/form/SV_2sPssEmzehnme4l';
}



if(test)
{
	var numColorPracticeTrials = 2;
	var numStroopPracticeTrials = 2;

	var numIntervalTrials = 100;
	var numIntervalPractice = 2;
	var numRewPunPractice = 2;
	
	var numBlock = 4;
	var numIntervalPerBlock = 4;
	var selectPerBlock = 1;
}
else
{
	var numColorPracticeTrials = 80;
	var numStroopPracticeTrials = 60;

	var numIntervalTrials = 100;
	var numIntervalPractice = 4;
	var numRewPunPractice = 4;
	
	var numBlock = 4;
	var numIntervalPerBlock = 16;
	var selectPerBlock = 2;
}

var price = 0.01;


var trialTimingParams = {
	itiDuration:0,
	feedbackDur:500,
	thresholdRT:250,
	deadline:2000
};


var intervalTimingParams = {
	intervalDur:NaN,
	itiDuration:NaN,
	cueDuration:1500,
	feedbackDur:2000,
	isiDuration:NaN
};



var incorrect1 = 0;
var incorrect2 = 0;
var incorrect3 = 0;
var incorrect4 = 0;
var incorrect5 = 0;




var cues = {
	lowreward:
		[['/static/images/cues/game_prc/Rew1_Pen1.png','low_reward_low_punish'],
		 ['/static/images/cues/game_prc/Rew1_Pen2.png','low_reward_high_punish']],
	highreward:
		[['/static/images/cues/game_prc/Rew2_Pen1.png','high_reward_low_punish'],
		 ['/static/images/cues/game_prc/Rew2_Pen2.png','high_reward_high_punish']],
	lowpunish:
		[['/static/images/cues/game_prc/Rew1_Pen1.png','low_reward_low_punish'],
		 ['/static/images/cues/game_prc/Rew2_Pen1.png','high_reward_low_punish']],
	highpunish:
		[['/static/images/cues/game_prc/Rew1_Pen2.png','low_reward_high_punish'],
		 ['/static/images/cues/game_prc/Rew2_Pen2.png','high_reward_high_punish']]
};


var blockseq1 = _.shuffle(['lowreward','highreward']);
var blockseq2 = _.shuffle(['lowpunish','highpunish']);
// var blockSequence = [];
if(mycondition==1)
{
	var blockSequence = blockseq1.concat(blockseq2);
}
else
{
	var blockSequence = blockseq2.concat(blockseq1);
}


var highreward = 10;
var lowreward = 1;
var highpunish = 10;
var lowpunish = 1;


var reward = {
	low_reward_low_punish:lowreward,
	high_reward_low_punish:highreward,
	low_reward_high_punish:lowreward,
	high_reward_high_punish:highreward
};


var punish = {
	low_reward_low_punish:lowpunish,
	high_reward_low_punish:lowpunish,
	low_reward_high_punish:highpunish,
	high_reward_high_punish:highpunish
};


var breakForBlockType = {
	lowreward:BreakLowRewardPage,
	highreward:BreakHighRewardPage,
	lowpunish:BreakLowPunishPage,
	highpunish:BreakHighPunishPage
};



var fixedDurITIAction = function(trial){
	var pastTime = new Date().getTime() - trial.startTime;
	var remainTime = Math.max(0,(trial.intervalDur-pastTime)/1000).toFixed(1);
	var element_fixation = $("<p></p>").attr({id:'fixation'}).text(remainTime+'s left');
	element_fixation.css({'font-size':'30px'});
	addElement(element_fixation,'#m',true);
}


var fixedNumITIAction = function(trial){
	var remainNum = trial.stimSet.length + 1;
	var test = ' word';
	if(remainNum>1) text = ' words';
	var element_fixation = $("<p></p>").attr({id:'fixation'}).text(remainNum.toFixed(0) + text + ' left');
	element_fixation.css({'font-size':'30px'});
	addElement(element_fixation,'#m',true);
}



var ColorMappingPractice = function(){

	openFullscreen();
	var configParams = {space:false,accFeedback:true,washout:true};
	var stimSet = _.shuffle(repmat(possibleStimsNeutral,Math.ceil(numColorPracticeTrials/possibleStimsNeutral.length)));
	
	var writeRecord = function(Record){

	 	Record.phase = "ColorMappingPractice";
	 	Record.sessionNum = NaN;
	 	Record.blockNum = NaN;
	 	Record.intervalNum = NaN;
	 	Record.intervalType = NaN;
	 	Record.intervalLength = NaN;
	 	Record.moneyEarned = NaN;
	 	psiTurk.recordTrialData(Record);
	};

	var nextAction = function(trial){
		if(trial.counter[0] < 5){
			trial.stimSet = [possibleStimsNeutral[randi(0,possibleStimsNeutral.length-1)]];
			trial.initiation();
			return;
		}
		//psiTurk.completeHIT();
		closeFullscreen();
		psiTurk.doInstructions(instruction2Pages,StroopPractice);
	}

	var callbacks = {
		endOfSetCallback:nextAction,
		tallyCallback:0,
		recordStimCallback:recordStimStroop,
		completeRecordCallback:writeRecord
	};
	
	trialTimingParams.itiDuration = 500;

	var trial = new timedTrial(stimSet,[false],[0,0],trialTimingParams,htmlParams['stim'],callbacks,configParams);
	psiTurk.showPage("stage.html");
	$("body").unbind("keydown").focus().keydown(trial.responseListener.bind(trial));
	trial.initiation();
}






var StroopPractice = function(){
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
	 	psiTurk.recordTrialData(Record);
	};

	var nextAction = function(trial){
		if(trial.counter[0] < 5){
			var tempset = possibleStimsCongruent.concat(possibleStimsInCongruent);
			trial.stimSet = [tempset[randi(0,tempset.length-1)]];
			trial.initiation();
			return;
		}
		closeFullscreen();
		psiTurk.doInstructions(instruction3Pages,intervalPractice);
	};

	var callbacks = {
		endOfSetCallback:nextAction,
		tallyCallback:0,
		recordStimCallback:recordStimStroop,
		completeRecordCallback:writeRecord
	};
	var configParams = {space:false,accFeedback:true,washout:true};
	trialTimingParams.itiDuration = 500;
	psiTurk.showPage("stage.html");
	var trial = new timedTrial(stimSet,[false],[0,0],trialTimingParams,htmlParams['stim'],callbacks,configParams);
	$("body").unbind("keydown").focus().keydown(trial.responseListener.bind(trial));
	trial.initiation();
}



/*** Session for set Practice ***/




var intervalPractice = function(){
	/*** Step 1: Define how you want to display interval-end feedback ***/

	openFullscreen();
	var qualified = false;
	trialTimingParams.itiDuration = 500;
	var displayFeedback = function(tag,interval)
	{
		var counter = interval.getCounter();
		var element = $("<p></p>").attr({id:'intervalMsg'}).text('Correct: ' + interval.counter[0]);
		element.css('margin-top','0px');
		addElement(element,"#mm");
	}
	/*** Step 2: Define how you want to clean up interval-end feedback ***/
	var cleanFeedback = function()
	{
		$("#intervalMsg").remove();
	}
	/*** Step 3: Define how you want to show the tally ***/
	var showScore = function(location)
	{
		var showScoreInTag = function(counter){
			$("#scoreCounter").remove();	
			var element = $("<p></p>").attr({id:'scoreCounter'}).text(counter[0]);
			element.css('margin-top','0px');
			addElement(element,"#b",false);
		};
		return showScoreInTag;
	}

	var cleanTally = function(){
		$('#scoreCounter').remove();
	}

	var configParams = {space:false,accFeedback:false,washout:false,tally:false};
	var intervalDurationSet = _.shuffle(repmat(intervalDurations,Math.ceil(numIntervalPractice/intervalDurations.length)));
	var itiDurationSet = _.shuffle(repmat(itiDurations,Math.ceil(numIntervalPractice/itiDurations.length)));
	var isiDurationSet = _.shuffle(repmat(isiDurations,Math.ceil(numIntervalPractice/isiDurations.length)));
	var intervalNum = 0;

	var Loop = function(){
		intervalNum++;
		if(intervalNum > numIntervalPractice & (qualified|intervalNum>6)) {
			closeFullscreen();
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
			 	psiTurk.recordTrialData(Record);
			};

			var callbacks = {
				endCallback:Loop,
				displayFeedback:displayFeedback,
				cleanFeedback:cleanFeedback,
				tallyCallback:showScore,
				recordStimCallback:recordStimStroop,
				writeRecord:writeRecord,
				calculateBonus:calculateBonus,
				cleanTally:cleanTally,
				itiAction:fixedNumITIAction
			};

			intervalTimingParams.intervalDur = 600000;
			intervalTimingParams.itiDuration = itiDuration;
			intervalTimingParams.isiDuration = isiDuration;
			intervalTimingParams.deadline = 2000;

			var interval = new timedInterval(intervalTimingParams,htmlParams,0,trialTimingParams,configParams,stimSet,callbacks);
			interval.initiate();
		}		

	}
	psiTurk.showPage("stage.html");
	Loop();
}



/***Global variables tracked in the main task***/


var blockID = 0;
var sessionID = 0;
var returnToInstructCallback = 0;
var returnToInstructCallbackMain =0;
var returnToInstructCallbackBreak = 0;




/***End of global variables***/
var blockPart = function(){

	var configParams = {space:false,accFeedback:true,washout:false,tally:false};

	if(blockID == numBlock) {
		closeFullscreen();
		Questionnaire_LRLP();
		return;
	}

	blockID++;
	var blockType = blockSequence.shift();
	var cueSubset = cues[blockType];

	if(blockID > numBlock) {sessionID++;blockID = 1;}

	var displayFeedback = function(tag,interval)
	{
		var counter = interval.getCounter();
		var numGems = reward[interval.cueType] * counter[0];
		var numBombs = punish[interval.cueType] * counter[1];
		if(numGems>=numBombs){			
			var netvalue = numGems - numBombs;
			var signChar = '+';
			if(netvalue > 1) var label = ' Gems';
			else var label = ' Gem';
		}
		else
		{			
			var netvalue = numBombs - numGems;
			var signChar = '-';
			if(netvalue > 1) var label = ' Gems';
			else var label = ' Gem';
		}
		var summary = '<b>' + signChar + netvalue.toFixed(0) + '</b>' + label;

		var gemText = $("<p></p>").attr({id:'totalGemText'}).text(numGems.toFixed(0));
		var bombText = $("<p></p>").attr({id:'totalBombText'}).text(numBombs.toFixed(0));
		var summaryText = $("<p></p>").attr({id:'summaryText'}).html(summary);
		var gemImg = $("<img></img>").attr({src:"/static/images/feedback/Rew1.png",id:'gemImg'});
		var bombImg = $("<img></img>").attr({src:"/static/images/feedback/Pun1.png",id:'bombImg'});
		gemText.css({'margin-top':'0px','font-size':'30px'});
		gemImg.css({'margin-bottom':'auto','margin':'auto'});
		bombText.css({'margin-top':'0px','font-size':'30px'});
		bombImg.css({'margin-bottom':'auto','margin':'auto'});
		summaryText.css({'margin-top':'50px','font-size':'30px'});
		addElementByGrid(gemImg,"5/7","4/6");
		addElementByGrid(bombImg,"5/7","6/8");
		addElementByGrid(gemText,"7","4/6");
		addElementByGrid(bombText,"7","6/8");
		addElementByGrid(summaryText,"4","5/7");
	}

	var cleanFeedback = function(){
		$("#totalGemText,#totalBombText,#gemImg,#bombImg,#summaryText").remove();
	}

	var showScore = function(tag,cueType)
	{
		var showScoreInTag = function(counter){
			$("#counterGemText,#counterBombText").remove();
			var numGems = reward[cueType] * counter[0];
			var numBombs = punish[cueType] * counter[1];
			var gemText = $("<p></p>").attr({id:'counterGemText'}).text("Gems: " + numGems.toFixed(0));
			var bombText = $("<p></p>").attr({id:'counterBombText'}).text("Bombs: " + numBombs.toFixed(0));
			gemText.css({'margin-top':'0px',"font-size":"30px"});
			bombText.css({'margin-top':'0px',"font-size":"30px"});
			addElement(gemText,"#bl",center=false);
			addElement(bombText,"#br",center=false);
		};
		return showScoreInTag;
	}

	var cleanTally = function(){
		$("#counterGemText,#counterBombText").remove();
	}


	var PracticeSession = function(isGain){
		/*** The cues are specified as [path,cueType] ***/
		openFullscreen();
		var intervalDurationSet = _.shuffle(repmat(intervalDurations,Math.ceil(numRewPunPractice/intervalDurations.length)));
		var itiDurationSet = _.shuffle(repmat(itiDurations,Math.ceil(numRewPunPractice/itiDurations.length)));
		var isiDurationSet = _.shuffle(repmat(isiDurations,Math.ceil(numRewPunPractice/isiDurations.length)));
		if(isGain == 1)
			subCueSet = cues['lowpunish'];
		else
			subCueSet = cues['highpunish'];

		var cueSet = _.shuffle(repmat(subCueSet,Math.ceil(numRewPunPractice/subCueSet.length)));
		var intervalID = 0;
		var interval = 0;

		var Loop = function(){

			intervalID++;
			

			var calculateBonus = function(Interval)
			{
				var bonus = 0;
				return bonus;
			};

			intervalTimingParams.intervalDur = intervalDurationSet.shift();
			intervalTimingParams.itiDuration = itiDurationSet.shift();
			intervalTimingParams.isiDuration = isiDurationSet.shift();

			var writeRecord = function(Record){
				if(isGain == 1)
					Record.phase = "lowPunPractice";
				else
					Record.phase = "highPunPractice";
			 	
			 	Record.sessionNum = NaN;
			 	Record.blockNum = NaN;
			 	Record.intervalNum = intervalID;
			 	Record.intervalType = cue[1];
			 	Record.intervalLength = intervalTimingParams.intervalDur;
			 	psiTurk.recordTrialData(Record);
			};

			var callbacks = {
				endCallback:Loop,
				displayFeedback:displayFeedback,
				cleanFeedback:cleanFeedback,
				tallyCallback:showScore,
				recordStimCallback:recordStimStroop,
				writeRecord:writeRecord,
				calculateBonus:calculateBonus,
				cleanTally:cleanTally
			};

			var cue = cueSet.shift();
			
			if(intervalID > numRewPunPractice) 
			{
				closeFullscreen();
				if(isGain == 1)
				{
					returnToInstructCallback = function(){psiTurk.doInstructions(instructionHighPunPages,HighPunPractice);};
					psiTurk.doInstructions(instructionHighPunPages,HighPunPractice);
				}
				else psiTurk.doInstructions(postPracticeBreak,MainPart);

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

	var LowPunPractice = function(){
		returnToInstructCallback = function(){psiTurk.doInstructions(instructionLowPunPages,LowPunractice);};
		PracticeSession(1);
	}

	var HighPunPractice = function(){
		returnToInstructCallback = function(){psiTurk.doInstructions(instructionHighPunPages,HighPunPractice);};
		PracticeSession(0);
	}

	var MainPart = function(){

		var intervalID = 0;
		var itiDurationSet = _.shuffle(repmat(itiDurations,Math.ceil(numIntervalPerBlock/itiDurations.length)));
		var isiDurationSet = _.shuffle(repmat(isiDurations,Math.ceil(numIntervalPerBlock/isiDurations.length)));

		//Set up the sequence within the block.
		var indexList = [];
		var cueList = [];
		var intervalDurationList = [];

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
		if(blockID%2==0)
		{
			var selectedMask = [1,1];
			selectedMask = selectedMask.concat(repmat([0],numIntervalPerBlock - 2));
		}
		else
		{
			var selectedMask = [1,1];
			selectedMask = selectedMask.concat(repmat([0],numIntervalPerBlock - 2));			
		}



		for(var n = 0; n < numIntervalPerBlock; n++)
		{
			indexList.push(n);
		}

		indexList = _.shuffle(indexList);


		var Loop = function(){

			intervalTimingParams.itiDuration = itiDurationSet.shift();
			intervalTimingParams.isiDuration = isiDurationSet.shift();
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
				var bonus = (counter[0] * reward[Interval.cueType] - 
					counter[1] * punish[Interval.cueType]) * bonused * price;
				return bonus;
			};

			var writeRecord = function(Record){

			 	Record.phase = "MainBlock";
			 	Record.sessionNum = sessionID;
			 	Record.blockNum = blockID;
			 	Record.intervalNum = intervalID;
			 	Record.intervalType = cue[1];
			 	Record.intervalLength = intervalTimingParams.intervalDur;
			 	psiTurk.recordTrialData(Record);
			};



			var callbacks = {
				endCallback:Loop,
				displayFeedback:displayFeedback,
				cleanFeedback:cleanFeedback,
				tallyCallback:showScore,
				recordStimCallback:recordStimStroop,
				writeRecord:writeRecord,
				calculateBonus:calculateBonus,
				cleanTally:cleanTally
			};



			if(intervalID > numIntervalPerBlock) 
				blockPart();
			else {
				var stimSet = generateStimSet(possibleStimsInCongruent,possibleStimsCongruent,numIntervalTrials);
				interval = new Interval(intervalTimingParams,htmlParams,cue,trialTimingParams,configParams,stimSet,callbacks);
				psiTurk.showPage("stage.html");
				interval.initiate();
			}
		}
		closeFullscreen();
		returnToInstructCallbackBreak = function(){psiTurk.doInstructions(breakForBlockType[blockType],Loop);};
		psiTurk.doInstructions(breakForBlockType[blockType],function(){openFullscreen();Loop();});

	}
	if(blockID == 1) {
		returnToInstructCallback = function(){psiTurk.doInstructions(instructionLowPunPages,LowPunPractice);};
		returnToInstructCallbackMain = function(){psiTurk.doInstructions(postPracticeBreak,MainPart);};
		psiTurk.doInstructions(instructionLowPunPages,LowPunPractice);
	}
	else MainPart();
}

var generateStimSet = function(set1,set2,numIntervalTrials){
	var stims = [];
	var selectedStim;
	var numStimsCongruent = 0;
	var numStimsInCongruent = 0;
	var possibleStimsToBeFiltered;



	var stimType = _.shuffle([0,1])[0];//0 for incongruent and 1 for congruent.
	//console.log(stimType);


	/**Set up the first trial in the set**/

	if(stimType == 0)
	{
		selectedStim = _.shuffle(set1)[0];//Sample from incongruent stimuli
		numStimsInCongruent++;
	}
	else
	{
		selectedStim = _.shuffle(set2)[0];//Sample from congruent stimuli
		numStimsCongruent++;
	}

	stims.push(selectedStim);//Store in stims

	for(var i = 0;i<numIntervalTrials-1;i++)
	{
		if(numStimsInCongruent>2*numStimsCongruent)
		{
			stimType = 1;
		}
		else if(numStimsCongruent>numStimsInCongruent)
		{
			stimType = 0;
		}
		else
		{
			stimType = _.shuffle([0,1])[0];
		}
		var subsetStims = [];
		if(stimType==0)
		{
			possibleStimsToBeFiltered = set1;
			numStimsInCongruent++;
		}
		else
		{
			possibleStimsToBeFiltered = set2;
			numStimsCongruent++;
		}
		for(var j = 0;j<possibleStimsToBeFiltered.length;j++)
		{
			stimOption = possibleStimsToBeFiltered[j];
			if(stimOption.word!=selectedStim.word && stimOption.color!=selectedStim.color)
			{
				subsetStims.push(stimOption);
			}
		}
		selectedStim = _.shuffle(subsetStims)[0];
		stims.push(selectedStim);
	}

	return stims;
}


$(window).load( function(){
		psiTurk.doInstructions(instruction1Pages,intervalPractice);
 	}
);





/*****************************************
*             Questionnaire              *
******************************************/


var Questionnaire_LRLP = function() {

	record_responses = function() {

		psiTurk.recordTrialData({'phase':'Questionnaire_LRLP', 'status':'submit'});

		$("input:radio:checked").each( function(i, val) {
			psiTurk.recordUnstructuredData(this.name, this.value);		
		});
	};

	// Load the questionnaire snippet 
	psiTurk.showPage('postquestionnaire_LRLP.html');
	psiTurk.recordTrialData({'phase':'Questionnaire_LRLP', 'status':'begin'});
	
	$("#next").click(function () {
		var answers = $("input:radio:checked").length;
		if(answers < 4)
		{
			alert("Please answer all the questions.");
		}
		else
		{
			record_responses();
		
		
			currentview = new Questionnaire_HRLP;
		}

	});
};


var Questionnaire_HRLP = function() {

	record_responses = function() {

		psiTurk.recordTrialData({'phase':'Questionnaire_HRLP', 'status':'submit'});
		$("input:radio:checked").each( function(i, val) {
			psiTurk.recordUnstructuredData(this.name, this.value);		
		});
	};

	// Load the questionnaire snippet 
	psiTurk.showPage('postquestionnaire_HRLP.html');
	psiTurk.recordTrialData({'phase':'Questionnaire_HRLP', 'status':'begin'});
	
	$("#next").click(function () {
		var answers = $("input:radio:checked").length;
		if(answers < 4)
		{
			alert("Please answer all the questions.");
		}
		else
		{
			record_responses();
		
		currentview = new Questionnaire_LRHP;}

	});
};


var Questionnaire_LRHP = function() {

	record_responses = function() {

		psiTurk.recordTrialData({'phase':'Questionnaire_LRHP', 'status':'submit'});
		$("input:radio:checked").each( function(i, val) {
			psiTurk.recordUnstructuredData(this.name, this.value);		
		});
	};

	// Load the questionnaire snippet 
	psiTurk.showPage('postquestionnaire_LRHP.html');
	psiTurk.recordTrialData({'phase':'Questionnaire_LRHP', 'status':'begin'});
	
	$("#next").click(function () {
		var answers = $("input:radio:checked").length;
		if(answers < 4)
		{
			alert("Please answer all the questions.");
		}
		else
		{
			record_responses();
		
		currentview = new Questionnaire_HRHP;}

	});
};


var Questionnaire_HRHP = function() {

	record_responses = function() {

		psiTurk.recordTrialData({'phase':'Questionnaire_HRHP', 'status':'submit'});
		$("input:radio:checked").each( function(i, val) {
			psiTurk.recordUnstructuredData(this.name, this.value);		
		});
	};

	// Load the questionnaire snippet 

	
	// $("#next").click(function () {
	// 	var answers = $("input:radio:checked").length;
	// 	if(answers < 4)
	// 	{
	// 		alert("Please answer all the questions.");
	// 	}
	// 	else
	// 	{
	// 		record_responses();
		
	// 		currentview = new Questionnaire;
	// 	}
	// });

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

				psiTurk.computeBonus('compute_bonus', function(response){
                	 		psiTurk.completeHIT(); //Call compute_bonus function for automatic bonus calculation (By Jason)
                 }); 

            }, 
            error: prompt_resubmit
        });
	};

	psiTurk.showPage('postquestionnaire_HRHP.html');
	psiTurk.recordTrialData({'phase':'Questionnaire_HRHP', 'status':'begin'});
	psiTurk.recordUnstructuredData('incorrectGQ1', incorrect1);
	psiTurk.recordUnstructuredData('incorrectGQ2', incorrect2);
	psiTurk.recordUnstructuredData('incorrectLQ1', incorrect3);
	psiTurk.recordUnstructuredData('incorrectLQ2', incorrect4);
	psiTurk.recordUnstructuredData('incorrectGQ3', incorrect5);
	
	$("#next").click(function () {
		record_responses();
		psiTurk.saveData({
			success: function(){
				psiTurk.computeBonus('compute_bonus',function(response){
				psiTurk.completeHIT();
				if(redirect) location.replace(redirect_link+
					'?WorkerID='+response['workerId']+
					'&Bonus='+response['bonus'].toFixed(2));
			});
            }, 
            error: prompt_resubmit});
	});
};



// var Questionnaire = function() {

// 	var error_message = "<h1>Oops!</h1><p>Something went wrong submitting your HIT. This might happen if you lose your internet connection. Press the button to resubmit.</p><button id='resubmit'>Resubmit</button>";

// 	record_responses = function() {

// 		psiTurk.recordTrialData({'phase':'postquestionnaire', 'status':'submit'});

// 		$('textarea').each( function(i, val) {
// 			psiTurk.recordUnstructuredData(this.id, this.value);
// 		});
// 		$('select').each( function(i, val) {
// 			psiTurk.recordUnstructuredData(this.id, this.value);		
// 		});

// 	};

// 	prompt_resubmit = function() {
// 		document.body.innerHTML = error_message;
// 		$("#resubmit").click(resubmit);
// 	};

// 	resubmit = function() {
// 		document.body.innerHTML = "<h1>Trying to resubmit...</h1>";
// 		reprompt = setTimeout(prompt_resubmit, 10000);
		
// 		psiTurk.saveData({
// 			success: function() {
// 				clearInterval(reprompt); 
// 				//psiTurk.completeHIT();

// 				psiTurk.computeBonus('compute_bonus', function(){
//                 	 		psiTurk.completeHIT(); //Call compute_bonus function for automatic bonus calculation (By Jason)
//                  }); 

//             }, 
//             error: prompt_resubmit
//         });
// 	};

// 	psiTurk.showPage('postquestionnaire.html');
// 	psiTurk.recordTrialData({'phase':'postquestionnaire', 'status':'begin'});

// 	psiTurk.recordUnstructuredData('incorrectGQ1', incorrect1);
// 	psiTurk.recordUnstructuredData('incorrectGQ2', incorrect2);
// 	psiTurk.recordUnstructuredData('incorrectLQ1', incorrect3);
// 	psiTurk.recordUnstructuredData('incorrectLQ2', incorrect4);
// 	psiTurk.recordUnstructuredData('incorrectGQ3', incorrect5);
	
// 	$("#next").click(function () {
// 		record_responses();
// 		psiTurk.saveData({
// 			success: function(){
// 				psiTurk.computeBonus('compute_bonus',function(){
// 				psiTurk.completeHIT();});
//             }, 
//             error: prompt_resubmit});
// 	});
// };


/*****************************************
*            OTHER FUNCTIONS             *
******************************************/

// function equivalent to linspace in matlab - generates an array of n evenly spaced numbers between min and max (inclusive for both) 
function linspace(min,max,nBins) {
	var i;
	ret = Array(nBins);
	nBins--;
	for (i = nBins; i >= 0; i--) {
		ret[i] = (i*max+(nBins-i)*min)/nBins; 
	}
	return ret;
}


// function equivalent to randi in matlab - generates a random integer between min and max (inclusive for both) 
function randi(min, max) {
	return Math.floor(Math.random() * ((max + 1) - min)) + min;
}


// function equivalent to repmat in matlab - repeats a given array nReps times
function repmat(array, nReps) {
	var result = [];
	while (nReps--) {
		result = result.concat(array);
	}
	return result;
}