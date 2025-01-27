feedbackImgs = [
	"/static/images/feedback/missedTrial.png",
	"/static/images/feedback/tooFast.png",
	"/static/images/feedback/correct.png",
	"/static/images/feedback/incorrect.png"
];





function Trial(stimSet,timer,counter,timingParams,htmlTag,callbackParams,configParams){

	this.stimSet = stimSet;
	this.timer = timer;
	this.counter = counter;
	this.itiDuration = timingParams.itiDuration;
	this.intervalDur = timingParams.intervalDur;
	this.trialNum = 0;

	this.htmlTag = htmlTag;
	this.space = configParams.space;
	this.feedbackForEveryTrial = configParams.accFeedback;
	this.washout = configParams.washout;
	this.isTally = configParams.tally;
	this.feedbackDur = timingParams.feedbackDur;
	this.shortestRT = timingParams.thresholdRT;

	this.endOfSet = callbackParams.endOfSetCallback;
	this.tally = callbackParams.tallyCallback;
	this.recordStim = callbackParams.recordStimCallback;
	this.completeRecord = callbackParams.completeRecordCallback;
	this.itiAction = callbackParams.itiAction;
	this.startTime = new Date().getTime();
}




Trial.prototype.updateStim = function(stim)
{
	this.stim = stim;
	this.stimResponse = stim.color;
	this.stimPath = stim.path;
}




Trial.prototype.initializeRecordParams = function(){
	this.stimon = NaN;
	this.initon = NaN;
	this.response = NaN;
	this.hit = NaN;
	this.rt = NaN;
	this.initrt = NaN;
	this.feedback = -1;
	this.initiated = false;
	this.listening = false;
	this.responded = false;
}




Trial.prototype.initiation = function(){
	if(this.timer[0]){this.cleanAll();return;}
	this.initializeRecordParams();
	if(this.stimSet.length > 0)
	{
		this.updateStim(this.stimSet.shift());
		this.trialNum++;
		if(this.itiDuration>0) this.ITI();
		else this.postITIAction();
	}
	else
	{
		if(this.washout) this.endOfSet(this);
		else this.endOfSet();
	}
}



Trial.prototype.ITI = function(){
	console.log(this.itiAction);
	if(this.itiAction===null)
	{
		console.log('Here');
		var element_fixation = $("<img></img>").attr({src:"/static/images/fixation.png",id:'fixation'});
		addElement(element_fixation,this.htmlTag);
	}
	else
	{
		this.itiAction(this);
	}
	setTimeout(this.postITIAction.bind(this),this.itiDuration);
}



Trial.prototype.postITIAction = function(){
	if(this.timer[0]){this.cleanAll();return;}
	$("#fixation").remove();
	if(this.space)
		this.spaceTimerID = setTimeout(this.showBox.bind(this),200);
	else
		this.showStimuli();
}




Trial.prototype.showBox = function(){
	if(this.timer[0]){this.cleanAll(); return;}
	this.cleanAll();
	var element_box = $("<img></img>").attr({src:"/static/images/hidden.png",id:'box'});
	addElement(element_box,this.htmlTag);
	this.initon = new Date().getTime();
	this.listening = true;
	if(isNaN(this.tally) && this.isTally) this.tally(this.counter);
}




Trial.prototype.showStimuli = function(){
	if(this.timer[0]) return;
	this.cleanAll();
	if(isNaN(this.tally) && this.isTally) this.tally(this.counter);
	var element_stimuli = $("<img></img>").attr({src:this.stimPath,id:'stimuli'});
	addElement(element_stimuli,this.htmlTag);
	this.stimon = new Date().getTime();
	this.listening = true;
}




Trial.prototype.responseListener = function(){
	if(this.space)
	{
		if(this.initiated)
			this.stimResponseListener(event);
		else
			this.spaceResponseListener(event);
	}
	else
	{
		this.stimResponseListener(event);
	}
}




Trial.prototype.stimResponseListener = function(event) {

	if(this.timer[0]) return;
	if (!this.listening) return;
	var keyCode = event.keyCode;
 	var index = responseKeyCodes.indexOf(keyCode);

	if (index >= 0)
	{

		this.listening = false;
		this.responded = true;
		this.rt = new Date().getTime() - this.stimon;
	 	this.response = responses[index];
	 	this.responseHandler();
	}
}




Trial.prototype.spaceResponseListener = function(event) {

	if(this.timer[0]) return;
	if (!this.listening) return;

	var keyCode = event.keyCode;
	var temprt = new Date().getTime() - this.initon;

	if (keyCode == spaceKey )
	{
		this.listening = false;
		this.initrt = temprt;//new Date().getTime() - this.initon;
		this.initiated = true;
		this.showStimuli();
	}
}




Trial.prototype.responseHandler = function(){

	this.listening = false;
	if(this.responded)
	{
		if(this.rt<this.shortestRT)
		{
			this.feedback = 1;
			this.hit = 0;
		}
		else if(this.response == this.stimResponse)
		{
			this.hit = 1;

			this.counter[0] = this.counter[0] + 1;
			if(this.feedbackForEveryTrial) this.feedback = 2;
		}
		else
		{
			if(this.washout)
			{
				this.counter[0] = 0;
			}
			this.hit = 0;
			this.counter[1] = this.counter[1] + 1
			if(this.feedbackForEveryTrial) this.feedback = 3;
		}
	}
	else
	{
		if(this.washout) this.counter[0] = 0;
		this.feedback = 0;
		this.hit = 0;
	}
	this.cleanAll();

	var newRecord = this.recordResponse(this.stim);
	this.completeRecord(newRecord);
	if(this.feedback >= 0) this.showFeedback();

	else this.initiation();
}



Trial.prototype.recordResponse = function(stim){
	var newRecord = this.recordStim(stim);
	if(isNaN(stim)){
		newRecord.response = this.response;
		newRecord.hit = this.hit;
		newRecord.rt = this.rt;
		newRecord.trialNum = this.trialNum;
		newRecord.initrt = this.initrt;
		newRecord.stimOn = this.stimon
	}else
	{
		newRecord.response = NaN;
		newRecord.hit = NaN;
		newRecord.rt = NaN;
		newRecord.trialNum = NaN;
		newRecord.initrt = NaN;	
		newRecord.stimOn = NaN;
	}
	newRecord.moneyEarned = 0;
	return newRecord;
}



Trial.prototype.cleanAll = function(){
	if(this.space) clearTimeout(this.spaceTimerID);
	$('#stimuli,#box,#feedback').remove();
}



Trial.prototype.showFeedback = function(){
	//console.log(this.feedback);
	var feedbackImg = feedbackImgs[this.feedback];
	var element_feedback = $("<img></img>").attr({src:feedbackImg,id:'feedback'});
	addElement(element_feedback,this.htmlTag);
	setTimeout(this.removeFeedback.bind(this),this.feedbackDur);
}



Trial.prototype.removeFeedback = function(){
	if(this.timer[0]) return;
	$("#feedback").remove(); 
	this.initiation();
}







//Subclass for timed trial



function timedTrial(stimSet,timer,counter,timingParams,htmlTag,callbackParams,configParams){
	Trial.call(this,stimSet,timer,counter,timingParams,htmlTag,callbackParams,configParams);
	this.deadline = timingParams.deadline;
}

timedTrial.prototype = Object.create(Trial.prototype);
timedTrial.prototype.constructor = timedTrial;

timedTrial.prototype.showStimuli = function(){
	(Object.getPrototypeOf(timedTrial.prototype).showStimuli.bind(this))();
	this.timerID = setTimeout(this.responseHandler.bind(this),this.deadline);
}

timedTrial.prototype.responseListener = function() {
	clearTimeout(this.timerID);
	(Object.getPrototypeOf(timedTrial.prototype).responseListener.bind(this))();
}

timedTrial.prototype.cleanAll = function() {
	clearTimeout(this.timerID);
	(Object.getPrototypeOf(timedTrial.prototype).cleanAll.bind(this))();
}