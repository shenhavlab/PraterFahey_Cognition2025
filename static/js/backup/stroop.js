//This is the file for commonly-used parameters and functions for Stroop task


var possibleStimsNeutral = [
	{word:"XXXXX",  congruency:"neutral",    path:"/static/images/stimuli/XXXXX_RedInk.png",    color:'red'},
	{word:"XXXXX",  congruency:"neutral",    path:"/static/images/stimuli/XXXXX_YellowInk.png", color:'yellow'},
	{word:"XXXXX",  congruency:"neutral",    path:"/static/images/stimuli/XXXXX_GreenInk.png",  color:'green'},
	{word:"XXXXX",  congruency:"neutral",    path:"/static/images/stimuli/XXXXX_BlueInk.png",   color:'blue'}
	];

var possibleStimsCongruent = [
	{word:"RED",    congruency:"congruent",  path:"/static/images/stimuli/Red_RedInk.png",       color:'red'},
	{word:"YELLOW", congruency:"congruent",  path:"/static/images/stimuli/Yellow_YellowInk.png", color:'yellow'},
	{word:"GREEN",  congruency:"congruent",  path:"/static/images/stimuli/Green_GreenInk.png",   color:'green'},
	{word:"BLUE",   congruency:"congruent",  path:"/static/images/stimuli/Blue_BlueInk.png",     color:'blue'}
	];

var possibleStimsInCongruent = [
	{word:"YELLOW", congruency:"incongruent",path:"/static/images/stimuli/Yellow_RedInk.png",    color:'red'},
	{word:"GREEN",  congruency:"incongruent",path:"/static/images/stimuli/Green_RedInk.png",     color:'red'},
	{word:"BLUE",   congruency:"incongruent",path:"/static/images/stimuli/Blue_RedInk.png",      color:'red'},
	{word:"RED",    congruency:"incongruent",path:"/static/images/stimuli/Red_YellowInk.png",    color:'yellow'},
	{word:"GREEN",  congruency:"incongruent",path:"/static/images/stimuli/Green_YellowInk.png",  color:'yellow'},
	{word:"BLUE",   congruency:"incongruent",path:"/static/images/stimuli/Blue_YellowInk.png",   color:'yellow'},
	{word:"RED",    congruency:"incongruent",path:"/static/images/stimuli/Red_GreenInk.png",     color:'green'},
	{word:"YELLOW", congruency:"incongruent",path:"/static/images/stimuli/Yellow_GreenInk.png",  color:'green'},
	{word:"BLUE",   congruency:"incongruent",path:"/static/images/stimuli/Blue_GreenInk.png",    color:'green'},
	{word:"RED",    congruency:"incongruent",path:"/static/images/stimuli/Red_BlueInk.png",      color:'blue'},
	{word:"YELLOW", congruency:"incongruent",path:"/static/images/stimuli/Yellow_BlueInk.png",   color:'blue'},
	{word:"GREEN",  congruency:"incongruent",path:"/static/images/stimuli/Green_BlueInk.png",    color:'blue'}
	];


var responses = ["red", "yellow", "green", "blue"];

var responseKeyCodes = [68, 70, 74, 75];

var spaceKey = 32;

var recordStimStroop = function(stimuli){
	var newRecord = {};
	if(!isNaN(stimuli))
	{
		newRecord.word = NaN;
		newRecord.color = NaN;
		newRecord.type = NaN;
	}
	else{
		newRecord.word = stimuli.word;
		newRecord.color = stimuli.color;
		newRecord.type = stimuli.congruency;
	}
	return newRecord;
}