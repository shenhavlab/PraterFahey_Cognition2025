feedbackImgs = [
	"/static/images/feedback/missedTrial.png",
	"/static/images/feedback/tooFast.png",
	"/static/images/feedback/correct.png",
	"/static/images/feedback/incorrect.png"
];





function Trial(stimSet,timer,counter,timingParams,htmlParams,callbackParams,configParams){

	this.stimSet = stimSet;
	this.timer = timer;
	this.counter = counter;
	this.trialNum = 0;

	this.timingParams = timingParams;
	this.htmlParams = htmlParams;
	this.callbackParams = callbackParams;
	this.configParams = configParams;
	this.startTime = new Date().getTime();


	// this.itiDuration = timingParams.itiDuration;
	// this.intervalDur = timingParams.intervalDur;
	

	// this.htmlTag = htmlTag;
	// this.space = configParams.space;
	// this.feedbackForEveryTrial = configParams.accFeedback;
	// this.washout = configParams.washout;
	// this.isTally = configParams.tracker;
	// this.feedbackDur = timingParams.feedbackDur;
	// this.shortestRT = timingParams.thresholdRT;

	// this.endOfSet = callbackParams.endOfSetCallback;
	// this.tally = callbackParams.tallyCallback;
	// this.recordStim = callbackParams.recordStimCallback;
	// this.completeRecord = callbackParams.completeRecordCallback;
	// this.itiAction = callbackParams.itiAction;
	
}




Trial.prototype.updateStim = function(stim)
{
	this.stim = stim;
	this.stimResponse = stim.target;
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
	if(this.timer[0]){this.cleanTimingOrCounter();this.cleanAll();return;}

	this.initializeRecordParams();
	if(this.stimSet.length > 0)
	{
		this.updateStim(this.stimSet.shift());
		this.trialNum++;
		if(this.timingParams.itiDuration>0) this.ITI();
		else this.postITIAction();
	}
	else
	{
		this.cleanTimingOrCounter();
		if(this.configParams.washout) this.callbackParams.endOfSetCallback(this);
		else this.callbackParams.endOfSetCallback();
	}
}



// Trial.prototype.timing=function(){
// 	var pastTime = new Date().getTime() - this.startTime;
// 	var remainTime = Math.max(0,(this.timingParams.intervalDur - pastTime)/1000).toFixed(0);
// 	$("#timing").remove();
// 	var element_timing = $("<p></p>").attr({id:'timing'}).text(remainTime+'s');
// 	element_timing.css({'font-size':'40px','margin-top':'50px'});
// 	addElement(element_timing,'#t');
// }


Trial.prototype.timing=function(){
	var pastTime = new Date().getTime() - this.startTime;
	var remainTime = Math.max(0,(this.timingParams.intervalDur - pastTime)/1000).toFixed(0);
	$("#timing").remove();
	var tracktable = $("<table></table>").attr({id:'timing'});
	var trackrow = $("<tr></tr>");
	var trackImg = $("<td></td>").attr({align:'left',width:'50%',height:'120px'}).append($("<img></img>").attr({src:"/static/images/tracker/timeCue.png",height:'50px'}));
	var trackText = $("<td></td>").attr({align:'right',width:'50%',height:'120px'}).css("fontSize", 42).append($("<p></p>").text(remainTime));
	trackrow.append(trackText);
	trackrow.append(trackImg);
	tracktable.append(trackrow);
	addElementByGrid(tracktable,3,4,5,7);
}


Trial.prototype.timingAuto=function(){
	this.timing();
	this.timingID = setInterval(this.timing.bind(this),1000);
}


// Trial.prototype.timingAuto=function(){
// 	var startTime = this.startTime;
// 	var intervalDur = this.timingParams.intervalDur;
// 	var timingCallback = function(){
// 		var pastTime = new Date().getTime() - startTime;
// 		var remainTime = Math.max(0,(intervalDur-pastTime)/1000).toFixed(0);
// 		$("#timing").remove();
// 		var element_timing = $("<p></p>").attr({id:'timing'}).text(remainTime+'s');
// 		element_timing.css({'font-size':'40px','margin-top':'50px'});
// 		addElement(element_timing,'#t');
// 	}
// 	timingCallback();
// 	this.timingID = setInterval(timingCallback,1000);
// }


Trial.prototype.cleanTiming=function(){
	if(this.configParams.timingAuto) clearInterval(this.timingID);
	$("#timing").remove();
}



// Trial.prototype.counting=function(){
// 	var remainNum = this.stimSet.length + 1;
// 	var text = ' word';
// 	if(remainNum>1) text = text + 's';
// 	$("#counting").remove();
// 	var element_fixation = $("<p></p>").attr({id:'counting'}).text(remainNum.toFixed(0) + text);
// 	element_fixation.css({'font-size':'40px','margin-top':'50px'});
// 	addElement(element_fixation,'#t');	
// }


Trial.prototype.counting=function(){
	var remainNum = this.stimSet.length + 1;
	$("#counting").remove();
	var tracktable = $("<table></table>").attr({id:'counting'});
	var trackrow = $("<tr></tr>");
	var trackImg = $("<td></td>").attr({align:'left',width:'50%',height:'120px'}).append($("<img></img>").attr({src:"/static/images/tracker/numberCue.png",height:'50px'}));
	var trackText = $("<td></td>").attr({align:'right',width:'50%',height:'120px'}).css("fontSize", 42).append($("<p></p>").text(remainNum));
	trackrow.append(trackText);
	trackrow.append(trackImg);
	tracktable.append(trackrow);
	addElementByGrid(tracktable,3,4,5,7);
}


Trial.prototype.cleanCounting=function(){
	$("#counting").remove();
}


Trial.prototype.ITI = function(){
	if(this.trialNum>1)
	{
		var element_fixation = $("<img></img>").attr({src:"/static/images/fixation.png",id:'fixation'});
		addElement(element_fixation,this.htmlParams.stim,true);
	}
	if(this.configParams.timingAuto && this.trialNum == 1 )
	{
		this.timingAuto();
	}
	if(this.configParams.timing)
	{
		this.timing();
	}
	if(this.configParams.counting)
	{
		this.counting();
	}
	if(this.trialNum>1)
		setTimeout(this.postITIAction.bind(this),this.timingParams.itiDuration);
	else
		this.postITIAction();
}



Trial.prototype.postITIAction = function(){
	if(this.timer[0]){this.cleanTimingOrCounter();this.cleanAll();return;}
	$("#fixation").remove();
	if(this.configParams.space)
		this.spaceTimerID = setTimeout(this.showBox.bind(this),200);
	else
		this.showStimuli();
}




Trial.prototype.showBox = function(){
	if(this.timer[0]){
		this.cleanTimingOrCounter();
		this.cleanAll(); 
		return;
	}
	this.cleanAll();
	var element_box = $("<img></img>").attr({src:"/static/images/hidden.png",id:'box'});
	addElement(element_box,this.htmlParams.stim);
	this.initon = new Date().getTime();
	this.listening = true;
	if(this.configParams.tracker) this.callbackParams.trackerCallback(this.counter);
}




Trial.prototype.showStimuli = function(){
	if(this.timer[0]){this.cleanTimingOrCounter();this.cleanAll();return;}
	this.cleanAll();
	if(this.configParams.tracker) this.callbackParams.trackerCallback(this.counter);
	var element_stimuli = $("<img></img>").attr({src:this.stimPath,id:'stimuli'});
	addElement(element_stimuli,this.htmlParams.stim,true);
	this.stimon = new Date().getTime();
	this.listening = true;
}




Trial.prototype.responseListener = function(event){

	if(this.configParams.space)
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
	if(this.timer[0]){this.cleanTimingOrCounter();this.cleanAll();return;}
	if (!this.listening) return;
	var keyCode = event.keyCode;
 	var index = responseKeyCodes.indexOf(keyCode);

	if (index >= 0)
	{
		this.listening = false;
		this.responded = true;
		this.rt = new Date().getTime() - this.stimon;
	 	this.response = responses[index];
		if(this.rt<=this.timingParams.thresholdRT)
		{
			var newRecord = this.recordResponse(this.stim);
			this.callbackParams.completeRecordCallback(newRecord);
			this.listening = true;
			this.responded = false;
		}
	 	else this.responseHandler();
	}
	else
	{

	}
}




Trial.prototype.spaceResponseListener = function(event) {

	if(this.timer[0]){this.cleanTimingOrCounter();this.cleanAll();return;}
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
		// if(this.rt<this.timingParams.thresholdRT)
		// {
		// 	//this.feedback = 1;
		// 	this.hit = 0;
		// }
		if(this.response == this.stimResponse)
		{
			this.hit = 1;

			this.counter[0] = this.counter[0] + 1;
			if(this.configParams.accFeedback) this.feedback = 2;
		}
		else
		{
			if(this.configParams.washout)
			{
				this.counter[0] = 0;
			}
			this.hit = 0;
			this.counter[1] = this.counter[1] + 1
			if(this.configParams.accFeedback) this.feedback = 3;
		}
	}
	else
	{
		if(this.configParams.washout) this.counter[0] = 0;
		if(this.configParams.accFeedback) this.feedback = 0;
		this.hit = 0;
	}
	this.cleanAll();

	var newRecord = this.recordResponse(this.stim);
	this.callbackParams.completeRecordCallback(newRecord);
	if(this.configParams.tracker) this.callbackParams.trackerCallback(this.counter);
	if(this.feedback >= 0) this.showFeedback();
	else this.initiation();
}



Trial.prototype.recordResponse = function(stim){
	var newRecord = this.callbackParams.recordStimCallback(stim);
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


Trial.prototype.cleanTimingOrCounter=function(){
	if(this.configParams.timing || this.configParams.timingAuto) this.cleanTiming();
	if(this.configParams.counting) this.cleanCounting();	
}



Trial.prototype.cleanAll = function(){
	if(this.configParams.space) clearTimeout(this.spaceTimerID);
	$('#stimuli,#box,#feedback').remove();
}



Trial.prototype.showFeedback = function(){
	var feedbackImg = feedbackImgs[this.feedback];
	var element_feedback = $("<img></img>").attr({src:feedbackImg,id:'feedback'});
	addElement(element_feedback,this.htmlParams.stim,true);
	setTimeout(this.removeFeedback.bind(this),this.timingParams.feedbackDur);
}



Trial.prototype.removeFeedback = function(){
	if(this.timer[0]){this.cleanTimingOrCounter();this.cleanAll();return;}
	$("#feedback").remove(); 
	this.initiation();
}





function timedTrial(stimSet,timer,counter,timingParams,htmlParams,callbackParams,configParams){
	Trial.call(this,stimSet,timer,counter,timingParams,htmlParams,callbackParams,configParams);
}

timedTrial.prototype = Object.create(Trial.prototype);
timedTrial.prototype.constructor = timedTrial;

timedTrial.prototype.showStimuli = function(){
	(Object.getPrototypeOf(timedTrial.prototype).showStimuli.bind(this))();
	this.deadlineID = setTimeout(this.responseHandler.bind(this),this.timingParams.deadline);
}

timedTrial.prototype.responseListener = function(event) {

	if(this.configParams.space)
	{
		if(this.initiated)
		{
			var keyCode = event.keyCode;
 			var index = responseKeyCodes.indexOf(keyCode);

 			if(index>=0) clearTimeout(this.deadlineID);
		}
		else
			this.spaceResponseListener(event);
	}
	else
	{
		var keyCode = event.keyCode;
 		var index = responseKeyCodes.indexOf(keyCode);

 		if(index>=0) clearTimeout(this.deadlineID);
	}

	(Object.getPrototypeOf(timedTrial.prototype).responseListener.bind(this))(event);
}

timedTrial.prototype.cleanAll = function() {
	clearTimeout(this.deadlineID);
	(Object.getPrototypeOf(timedTrial.prototype).cleanAll.bind(this))();
}