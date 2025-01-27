function Interval(timingParams,htmlParams,cueParams,
				  trialTimingParams,configParams,
				  stimSet,callbackParams){
	//Setup the indexing information of this interval.
	// this.phase = phase;
	// this.sessionNum = sessionNum;
	// this.blockNum = blockNum;
	// this.intervalNum = intervalNum;

	//Setup the cue information of this interval, if cueParams is provided.
	if(isNaN(cueParams))
	{
		this.cuePath = cueParams[0];
		this.cueType = cueParams[1];
	}
	else
	{
		this.cuePath = NaN;
		this.cueType = NaN;
	}

	//Setup tracker of the interval.
	this.timer = [false];
	this.counter = [0,0];

	//Setup the stimuli set of this interval.
	this.stimSet = stimSet;

	//If cueParams is NaN, then this interval is not cued.
	this.cued = isNaN(cueParams);

	//Setup timing parameters of the interval
	this.intervalDur = timingParams.intervalDur;
	this.itiDuration = timingParams.itiDuration;
	this.cueDuration = timingParams.cueDuration;
	this.feedbackDur = timingParams.feedbackDur;
	this.isiDuration = timingParams.isiDuration;


	//Setup the HTML tags
	this.titleID = htmlParams.title;
	this.stimID = htmlParams.stim;
	this.tallyID = htmlParams.tally;


	//Setup the callback functions
	this.endOfInterval = callbackParams.endCallback;
	this.displayFeedback = callbackParams.displayFeedback;
	this.cleanFeedback = callbackParams.cleanFeedback;
	this.recordStim = callbackParams.recordStimCallback;
	this.writeRecord = callbackParams.writeRecord;
	this.calculateBonus = callbackParams.calculateBonus;
	this.showScore = callbackParams.tallyCallback;
	this.cleanTally = callbackParams.cleanTally;
	this.itiAction = callbackParams.itiAction;

	this.trialTimingParams = trialTimingParams;
	this.configParams = configParams;

}

Interval.prototype.initiate = function(){
	this.cleanAll();
	this.timer[0] = false;
	this.counter[0] = 0;
	this.counter[1] = 0;
	var element_fixation = $("<img></img>").attr({src:"/static/images/fixation.png",id:'fixation'});
	var element_title = $("<p></p>").attr({id:'hint'}).text("Prepare for next turn...");
	element_title.css({'font-size':30,'margin-top':'50px'});
	addElement(element_fixation,this.stimID);
	addElement(element_title,this.titleID,false);
	this.startInterval();
}


Interval.prototype.startInterval = function(){
	if(this.cued) var offset = this.cueDuration;
	else var offset = 0;


	setTimeout(this.postITIAction.bind(this),this.itiDuration);

	if(this.cued) setTimeout(this.postCueAction.bind(this),this.cueDuration+this.itiDuration);
	setTimeout(this.postISIAction.bind(this),offset + this.isiDuration + this.itiDuration);
	this.endByInterval();
}




Interval.prototype.endByInterval = function(){
	if(this.cued) var offset = this.cueDuration;
	else var offset = 0;
	this.timerID = setTimeout(this.postIntervalAction.bind(this),offset + this.isiDuration + this.itiDuration + this.intervalDur);
}




Interval.prototype.endByCount = function(){
	clearTimeout(this.timerID);
	$("body").unbind("keydown");//.focus().keydown(continueHandler);
	this.trial.cleanAll()
	this.cleanAll();
	this.intervalFeedback();		
}



Interval.prototype.cleanAll = function(){
	$("#fixation,#cueImg,#hint").remove();
	this.cleanTally();
}




Interval.prototype.postITIAction = function(){

	$("#hint").remove();
	if(this.cued)
	{
		$("#fixation").remove();
		var element_cue = $("<img></img>").attr({src:this.cuePath,id:'cueImg'});
		addElement(element_cue,this.stimID);
	}
}


Interval.prototype.postCueAction = function(){
	$("#cueImg").remove();
	var element_fixation = $("<img></img>").attr({src:"/static/images/fixation.png",id:'fixation'});
	addElement(element_fixation,this.stimID);
}



Interval.prototype.postISIAction = function(){
	$("#fixation").remove();

	// var trialCallbacks = {
	// 	endOfSetCallback:this.endByCount.bind(this),
	// 	tallyCallback:this.showScore(this.tallyID),
	// 	recordStimCallback:this.recordStim,
	// 	completeRecordCallback:this.writeRecord
	// };

	// this.trial = new Trial(this.stimSet,this.timer,this.counter,this.trialTimingParams,this.stimID,trialCallbacks,this.configParams);
	//console.log(this.trial);
	var trialCallbacks = {
		endOfSetCallback:this.endByCount.bind(this),
		tallyCallback:this.showScore(this.tallyID,this.cueType),
		recordStimCallback:this.recordStim,
		completeRecordCallback:this.writeRecord,
		itiAction:this.itiAction
	};
	this.trialTimingParams.intervalDur = this.intervalDur;
	this.trial = new Trial(this.stimSet,this.timer,this.counter,this.trialTimingParams,this.stimID,trialCallbacks,this.configParams);
	$("body").unbind("keydown").focus().keydown(this.trial.responseListener.bind(this.trial));
	this.trial.initiation();
}



// Interval.prototype.showScore = function(){
// 	$("#scoreCounter").remove();	
// 	$(this.tallyID).append($("<p></p>").attr({id:'scoreCounter'}).text(this.counter[0]));
// 	$("#scoreCounter").css('margin-top','0px');
// }



Interval.prototype.postIntervalAction = function(){
	$("body").unbind("keydown");//.focus().keydown(continueHandler);
	this.timer[0] = true;
	if(!(this.trial == null)) this.trial.cleanAll();
	this.cleanAll();
	this.intervalFeedback();	
}


Interval.prototype.intervalFeedback = function(){
	this.displayFeedback(this.stimID,this);
	setTimeout(this.postFeedbackAction.bind(this),this.feedbackDur);
}




Interval.prototype.postFeedbackAction = function(){
	this.cleanFeedback();
	this.moneyEarned = this.calculateBonus(this);
	if(!(this.trial==null)) var record = this.trial.recordResponse(0);
	else var record = {};
	record.moneyEarned = this.moneyEarned;
	this.writeRecord(record);
	this.endOfInterval();
}



// Interval.prototype.completeRecord = function(Record){
// 	Record.phase = this.phase;
// 	Record.sessionNum = this.sessionNum;
// 	Record.blockNum = this.blockNum;
// 	Record.intervalNum = this.intervalNum;
// 	Record.intervalType = this.cueType;
// 	Record.intervalLength = this.intervalDur;
// 	Record.moneyEarned = this.moneyEarned;
// 	this.writeRecord(Record);
// }


Interval.prototype.getCounter = function(){
	return this.counter;
}





function timedInterval(timingParams,htmlParams,cueParams,
				  	   trialTimingParams,configParams,
				  	   stimSet,callbackParams){
	Interval.call(this,timingParams,htmlParams,cueParams,trialTimingParams,configParams,stimSet,callbackParams);
	this.deadline = timingParams.deadline;
}

timedInterval.prototype = Object.create(Interval.prototype);
timedInterval.prototype.constructor = timedInterval;

Interval.prototype.postISIAction = function(){
	$("#fixation").remove();
	var trialCallbacks = {
		endOfSetCallback:this.endByCount.bind(this),
		tallyCallback:this.showScore(this.tallyID,this.cueType),
		recordStimCallback:this.recordStim,
		completeRecordCallback:this.writeRecord,
		itiAction:this.itiAction
	};
	this.trialTimingParams.intervalDur = this.intervalDur;
	this.trialTimingParams.deadline = this.deadline;
	this.trial = new timedTrial(this.stimSet,this.timer,this.counter,this.trialTimingParams,this.stimID,trialCallbacks,this.configParams);
	$("body").unbind("keydown").focus().keydown(this.trial.responseListener.bind(this.trial));
	this.trial.initiation();
}

