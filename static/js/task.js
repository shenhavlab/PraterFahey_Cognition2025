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



//set the appropriate instructions by calling a function from the instructions.js file
var {
		pages,
		instruction1Pages,
		instruction2Pages,
		instruction3Pages,
		instructionStory2,
		instructionCPages,
		instructionPPages,
		postPracticeBreakCollector,
		postPracticeBreakProtector,
		BreakPage,
	} = instruct();

//preload your pages 
psiTurk.preloadPages(pages);

//set appropriate stimuli  by calling function from the stm.js file
const {
		possibleStimsNeutral,
		possibleStimsCongruent,
		possibleStimsInCongruent,
		responses,
		responseKeyCodes,
		spaceKey,
		recordStim
	} = setStroopStim();


const platform = getUrlVars()["PLATFORM"];

var htmlParams = {
	title:'#t',
	stim:'#m',
	tracker:'#b',
};



var intervalDurations = [6000,6750,7500,8250,9000];
var meanDuration = 0.5*(intervalDurations[0] + intervalDurations[intervalDurations.length-1])/1000;
meanDuration = meanDuration.toFixed(0);
var practiceDuration = 7500;
var fixedDurNumTrials = 30;

var itiDurations = [1000,1500,2000];
var isiDurations = [500,750];


//set the appropriate trial numbers and test versus real mode 
//by calling a function from the trialNum.js file

const {numColorPracticeTrials, 	//set the number of keymapping practice  trials
	   numStroopPracticeTrials, 	//set the number of interference practice trials
	   numIntervalPractice,
	   numMainPractice, 		//set the number of intervals to practice
	   numBlock,
	   numIntervalTrials, 		//set the number of blocks 
	   numIntervalPerBlock,		//set the number of intervals per block
	   selectPerBlock 			//how many intervals to select per block
	   } = setTrialNumByMode(test); // set the intial fund for loss



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
	feedbackDur:1500,
	isiDuration:NaN
};

//variables to keep track of how many errors individuals make on the quizzes
var incorrectC1 = 0;
var incorrectC2 = 0;
var incorrectP1 = 0;
var incorrectP2 = 0;
var incorrectGain_Pun1 = 0; 
var incorrectGain_Pun2 = 0;
var incorrectGain1_Pun = 0;
var incorrectGain2_Pun = 0;
var incorrectLoss_Pun1 = 0;
var incorrectLoss_Pun2 = 0;
var incorrectLoss1_Pun = 0;
var incorrectLoss2_Pun = 0;


//set the appropriate cues by calling a function from the cues.js file
const cues = cueSet();
const practiceCues = practiceCueSet();

var blockSequence;

collector_seq = _.shuffle(['Gain_Pun1','Gain_Pun2','Gain1_Pun','Gain2_Pun']);
protector_seq = _.shuffle(['Loss_Pun1','Loss_Pun2','Loss1_Pun','Loss2_Pun']);

if(collector & protector)
{
	if(mycondition==0)
		blockSequence = collector_seq.concat(protector_seq);
	else
		blockSequence = protector_seq.concat(collector_seq);
}
else if(collector & !protector)
{
	blockSequence = collector_seq;
}
else if(protector & !collector)
{
	blockSequence = protector_seq;
}

var initialGem = 0;
var initialBomb = 300;

var highGain = 10;
var lowGain = 1;

var highLoss = 10;
var lowLoss = 1;

var highPun = 10;
var lowPun = 1;

var price = 0.01;
var initialFundInGem = 1200;

var startGemByBlock = {'Gain1_Pun1':initialGem,'Gain1_Pun2':initialGem,
					   'Gain2_Pun1':initialGem,'Gain2_Pun2':initialGem,
					   'Loss1_Pun1':0,'Loss1_Pun2':0,
					   'Loss2_Pun1':0,'Loss2_Pun2':0};

var startBombByBlock = {'Gain1_Pun1':0,'Gain1_Pun2':0,
					    'Gain2_Pun1':0,'Gain2_Pun2':0,
					    'Loss1_Pun1':initialBomb,'Loss1_Pun2':initialBomb,
					    'Loss2_Pun1':initialBomb,'Loss2_Pun2':initialBomb};

var gainByBlock = {'Gain1_Pun1':lowGain,'Gain1_Pun2':lowGain,
			 	   'Gain2_Pun1':highGain,'Gain2_Pun2':highGain,
			 	   'Loss1_Pun1':0,'Loss1_Pun2':0,
			 	   'Loss2_Pun1':0,'Loss2_Pun2':0};


var lossByBlock = {'Gain1_Pun1':0,'Gain1_Pun2':0,
			 	   'Gain2_Pun1':0,'Gain2_Pun2':0,
			 	   'Loss1_Pun1':lowLoss,'Loss1_Pun2':lowLoss,
			 	   'Loss2_Pun1':highLoss,'Loss2_Pun2':highLoss};


var penaltyByBlock = {'Gain1_Pun1':lowPun,'Gain1_Pun2':highPun,
					  'Gain2_Pun1':lowPun,'Gain2_Pun2':highPun,
					  'Loss1_Pun1':lowPun,'Loss1_Pun2':highPun,
					  'Loss2_Pun1':lowPun,'Loss2_Pun2':highPun};


var blockID = 0;
var sessionID = 0;
var returnToInstructCallback = 0;

if(protector & collector)
{
	if(mycondition==0)
	{
		var taskSequence = ['colorMappingPractice','stroopPractice','setPractice',
							'collectorPractice',
							'mainStartCollector',
							'mainPart','mainPart','mainPart','mainPart',
							'protectorPractice',
							'mainStartProtector',
							'mainPart','mainPart','mainPart','mainPart',
							'questionnaires'];
		instructionCPages = instructionStory2.concat(instructionCPages);
	}
	else
	{
		var taskSequence = ['colorMappingPractice','stroopPractice','setPractice',
							'protectorPractice',
							'mainStartProtector',
							'mainPart','mainPart','mainPart','mainPart',
							'collectorPractice',
							'mainStartCollector',
							'mainPart','mainPart','mainPart','mainPart',
							'questionnaires'];

		instructionPPages = instructionStory2.concat(instructionPPages);
	}
}
else if(protector & !collector)
{
	var taskSequence = ['colorMappingPractice','stroopPractice','setPractice',
						'protectorPractice',
						'mainStartProtector',
						'mainPart','mainPart','mainPart','mainPart',
						'questionnaires'];
	instructionPPages = instructionStory2.concat(instructionPPages);
}
else if(collector & !protector)
{
	var taskSequence = ['colorMappingPractice','stroopPractice','setPractice',
						'collectorPractice',
						'mainStartCollector',
						'mainPart','mainPart','mainPart','mainPart',
						'questionnaires'];
	instructionCPages = instructionStory2.concat(instructionCPages);
}

var mainBlockType;

// handler function that controls the order of the task
blockPart = () => {
	var task = taskSequence.shift();
	switch(task) {
		case 'colorMappingPractice':
			if(closeScreen) closeFullscreen();
			var configParams = {space:false,accFeedback:true,washout:true,tracker:false,timing:false,counting:false,timingAuto:false};	    	
			psiTurk.doInstructions(instruction1Pages,colorMappingPractice(configParams));
	    	break;
	  	case 'stroopPractice':
	  		if(closeScreen) closeFullscreen();
	   		var configParams = {space:false,accFeedback:true,washout:true,tracker:false,timing:false,counting:false,timingAuto:false};
	   		returnToInstructCallback = ()=>psiTurk.doInstructions(instruction2Pages,stroopPractice(configParams));
	    	psiTurk.doInstructions(instruction2Pages,stroopPractice(configParams));
	    	break;
	    case 'setPractice':
	  		if(closeScreen) closeFullscreen();
	   		var configParams = {space:false,accFeedback:false,washout:false,tracker:true,timing:false,counting:false,timingAuto:false};
	   		returnToInstructCallback = ()=>psiTurk.doInstructions(instruction3Pages,intervalPractice(configParams));
	    	psiTurk.doInstructions(instruction3Pages,intervalPractice(configParams));
	    	break;	
	  	case 'collectorPractice':
	  		if(closeScreen) closeFullscreen();
	  		var configParams = {space:false,accFeedback:false,washout:false,tracker:true,timing:false,counting:false,timingAuto:false};
	  		returnToInstructCallback = ()=>psiTurk.doInstructions(instructionCPages,mainPractice(configParams,'collector'));
	  		blockID = 0;
	    	psiTurk.doInstructions(instructionCPages,mainPractice(configParams,'collector'));
	    	break;
	  	case 'protectorPractice':
	  		if(closeScreen) closeFullscreen();
	  		var configParams = {space:false,accFeedback:false,washout:false,tracker:true,timing:false,counting:false,timingAuto:false};
	  		returnToInstructCallback = ()=>psiTurk.doInstructions(instructionPPages,mainPractice(configParams,'protector'));
	  		blockID = 0;
	    	psiTurk.doInstructions(instructionPPages,mainPractice(configParams,'protector'));
	    	break;		 
	  	case 'mainStartCollector':
	  		if(closeScreen) closeFullscreen();
	  		returnToInstructCallback = ()=>psiTurk.doInstructions(postPracticeBreakCollector,blockPart);
		    psiTurk.doInstructions(postPracticeBreakCollector,blockPart);
		    break;
	  	case 'mainStartProtector':
	  		if(closeScreen) closeFullscreen();
	  		returnToInstructCallback = ()=>psiTurk.doInstructions(postPracticeBreakProtector,blockPart);
		    psiTurk.doInstructions(postPracticeBreakProtector,blockPart);
		    break;		  
	  	case 'mainPart':
	  		if(closeScreen) closeFullscreen();
		  	blockID++;
			mainBlockType = blockSequence.shift();
			var configParams = {space:false,accFeedback:false,washout:false,tracker:true,timing:false,counting:false,timingAuto:false};
		    psiTurk.doInstructions(BreakPage,mainTask(configParams,mainBlockType));	    
		    break;
	  	case 'questionnaires':
	  		closeFullscreen();
		    endOfTask();
	}
}

// what to start the experiment with 
$(window).load( function(){
		blockPart();
 	}
);
