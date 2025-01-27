 function Interval(timingParams,
 				   htmlParams,
 				   cueParams,
 				   trialTimingParams,
 				   configParams,
 				   stimSet,
 				   callbackParams){
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

	// //Setup timing parameters of the interval
	// this.intervalDur = timingParams.intervalDur;
	// this.itiDuration = timingParams.itiDuration;
	// this.cueDuration = timingParams.cueDuration;
	// this.feedbackDur = timingParams.feedbackDur;
	// this.isiDuration = timingParams.isiDuration;

	this.timingParams = timingParams;

	this.htmlParams = htmlParams;

	this.callbackParams = callbackParams;


	//Setup the HTML tags
	// this.titleID = htmlParams.title;
	// this.stimID = htmlParams.stim;
	// this.tallyID = htmlParams.tracker;


	//Setup the callback functions
	// this.endOfInterval = callbackParams.endOfInterval;
	// this.displayFeedback = callbackParams.displayFeedback;
	// this.cleanFeedback = callbackParams.cleanFeedback;
	// this.recordStim = callbackParams.recordStimCallback;
	// this.writeRecord = callbackParams.writeRecord;
	// this.calculateBonus = callbackParams.calculateBonus;
	// this.showScore = callbackParams.displayTracker;
	// this.cleanTally = callbackParams.cleanTracker;
	// this.itiAction = callbackParams.itiAction;

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
	element_title.css({'font-size':40,'margin-top':'50px'});
	addElement(element_fixation,this.htmlParams.stim,true);
	addElement(element_title,this.htmlParams.title);
	this.startInterval();
}


Interval.prototype.startInterval = function(){
	if(this.cued) var offset = this.timingParams.cueDuration;
	else var offset = 0;
	
	setTimeout(this.postITIAction.bind(this),this.timingParams.itiDuration);

	if(this.cued) setTimeout(this.postCueAction.bind(this),
		this.timingParams.cueDuration+this.timingParams.itiDuration);
	
	setTimeout(this.postISIAction.bind(this),
		offset + this.timingParams.isiDuration + this.timingParams.itiDuration);
	
	this.endByInterval();
}




Interval.prototype.endByInterval = function(){
	if(this.cued) var offset = this.timingParams.cueDuration;
	else var offset = 0;
	this.timerID = setTimeout(this.postIntervalAction.bind(this),
		offset + this.timingParams.isiDuration + this.timingParams.itiDuration + this.timingParams.intervalDur);
}




Interval.prototype.endByCount = function(){
	clearTimeout(this.timerID);
	$("body").unbind("keydown");//.focus().keydown(continueHandler);
	this.trial.cleanTimingOrCounter();
	this.trial.cleanAll();
	this.cleanAll();
	this.intervalFeedback();		
}



Interval.prototype.cleanAll = function(){

	$("#fixation,#cueImg,#hint").remove();
	this.callbackParams.cleanTracker();
}




Interval.prototype.postITIAction = function(){

	$("#hint").remove();
	if(this.cued)
	{
		$("#fixation").remove();
		var element_cue = $("<img></img>").attr({src:this.cuePath,id:'cueImg'});
		addElement(element_cue,this.htmlParams.stim,true);
	}
}


Interval.prototype.postCueAction = function(){
	$("#cueImg").remove();
	var element_fixation = $("<img></img>").attr({src:"/static/images/fixation.png",id:'fixation'});
	addElement(element_fixation,this.htmlParams.stim,true);
}



Interval.prototype.postISIAction = function(){
	$("#fixation").remove();
	var trialCallbacks = {
		endOfSetCallback:this.endByCount.bind(this),
		trackerCallback:this.callbackParams.displayTracker(this.htmlParams.tracker,this.cueType),
		recordStimCallback:this.callbackParams.recordStimCallback,
		completeRecordCallback:this.callbackParams.writeRecord,
	};

	this.trialTimingParams.intervalDur = this.timingParams.intervalDur;
	this.trial = new Trial(this.stimSet,this.timer,this.counter,this.trialTimingParams,this.htmlParams,trialCallbacks,this.configParams);
	$("body").unbind("keydown").focus().keydown(this.trial.responseListener.bind(this.trial));
	this.trial.initiation();
}


Interval.prototype.postIntervalAction = function(){

	$("body").unbind("keydown");//.focus().keydown(continueHandler);
	this.timer[0] = true;
	if(!(this.trial == null)){
		this.trial.cleanAll();
		this.trial.cleanTimingOrCounter();
	}
	this.cleanAll();
	this.intervalFeedback();	
}


Interval.prototype.intervalFeedback = function(){
	this.callbackParams.displayFeedback(this.htmlParams.stim,this);
	setTimeout(this.postFeedbackAction.bind(this),this.timingParams.feedbackDur);
}




Interval.prototype.postFeedbackAction = function(){
	this.callbackParams.cleanFeedback();
	this.moneyEarned = this.callbackParams.calculateBonus(this);
	if(!(this.trial==null)) var record = this.trial.recordResponse(0);
	else var record = {};
	record.moneyEarned = this.moneyEarned;
	this.callbackParams.writeRecord(record);
	this.callbackParams.endOfInterval();
}


Interval.prototype.getCounter = function(){
	return this.counter;
}





function timedInterval(timingParams,htmlParams,cueParams,
				  	   trialTimingParams,configParams,
				  	   stimSet,callbackParams){
	Interval.call(this,timingParams,htmlParams,cueParams,trialTimingParams,configParams,stimSet,callbackParams);
}

timedInterval.prototype = Object.create(Interval.prototype);
timedInterval.prototype.constructor = timedInterval;

timedInterval.prototype.postISIAction = function(){
	$("#fixation").remove();
	var trialCallbacks = {
		endOfSetCallback:this.endByCount.bind(this),
		trackerCallback:this.callbackParams.displayTracker(this.htmlParams.tracker,this.cueType),
		recordStimCallback:this.callbackParams.recordStimCallback,
		completeRecordCallback:this.callbackParams.writeRecord,
	};


	this.trialTimingParams.intervalDur = this.timingParams.intervalDur;
	this.trialTimingParams.deadline = this.trialTimingParams.deadline;


	this.trial = new timedTrial(this.stimSet,this.timer,this.counter,this.trialTimingParams,this.htmlParams,trialCallbacks,this.configParams);
	$("body").unbind("keydown").focus().keydown(this.trial.responseListener.bind(this.trial));
	this.trial.initiation();
}

