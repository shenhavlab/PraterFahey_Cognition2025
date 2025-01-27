

//function to set the stim for a stroop task
setStroopStim = ()=>{

//This is the file for commonly-used parameters and functions for Stroop task


	var possibleStimsNeutral = [
		{distractor:"XXXXX",  congruency:"neutral",    path:"/static/images/stimuli/XXXXX_RedInk.png",    target:'red'},
		{distractor:"XXXXX",  congruency:"neutral",    path:"/static/images/stimuli/XXXXX_YellowInk.png", target:'yellow'},
		{distractor:"XXXXX",  congruency:"neutral",    path:"/static/images/stimuli/XXXXX_GreenInk.png",  target:'green'},
		{distractor:"XXXXX",  congruency:"neutral",    path:"/static/images/stimuli/XXXXX_BlueInk.png",   target:'blue'}
		];

	var possibleStimsCongruent = [
		{distractor:"RED",    congruency:"congruent",  path:"/static/images/stimuli/Red_RedInk.png",       target:'red'},
		{distractor:"YELLOW", congruency:"congruent",  path:"/static/images/stimuli/Yellow_YellowInk.png", target:'yellow'},
		{distractor:"GREEN",  congruency:"congruent",  path:"/static/images/stimuli/Green_GreenInk.png",   target:'green'},
		{distractor:"BLUE",   congruency:"congruent",  path:"/static/images/stimuli/Blue_BlueInk.png",     target:'blue'}
		];

	var possibleStimsInCongruent = [
		{distractor:"YELLOW", congruency:"incongruent",path:"/static/images/stimuli/Yellow_RedInk.png",    target:'red'},
		{distractor:"GREEN",  congruency:"incongruent",path:"/static/images/stimuli/Green_RedInk.png",     target:'red'},
		{distractor:"BLUE",   congruency:"incongruent",path:"/static/images/stimuli/Blue_RedInk.png",      target:'red'},
		{distractor:"RED",    congruency:"incongruent",path:"/static/images/stimuli/Red_YellowInk.png",    target:'yellow'},
		{distractor:"GREEN",  congruency:"incongruent",path:"/static/images/stimuli/Green_YellowInk.png",  target:'yellow'},
		{distractor:"BLUE",   congruency:"incongruent",path:"/static/images/stimuli/Blue_YellowInk.png",   target:'yellow'},
		{distractor:"RED",    congruency:"incongruent",path:"/static/images/stimuli/Red_GreenInk.png",     target:'green'},
		{distractor:"YELLOW", congruency:"incongruent",path:"/static/images/stimuli/Yellow_GreenInk.png",  target:'green'},
		{distractor:"BLUE",   congruency:"incongruent",path:"/static/images/stimuli/Blue_GreenInk.png",    target:'green'},
		{distractor:"RED",    congruency:"incongruent",path:"/static/images/stimuli/Red_BlueInk.png",      target:'blue'},
		{distractor:"YELLOW", congruency:"incongruent",path:"/static/images/stimuli/Yellow_BlueInk.png",   target:'blue'},
		{distractor:"GREEN",  congruency:"incongruent",path:"/static/images/stimuli/Green_BlueInk.png",    target:'blue'}
		];


	var responses = ["red", "yellow", "green", "blue"];

	var responseKeyCodes = [68, 70, 74, 75];

	var spaceKey = 32;

	var recordStim = (stimuli)=>{
		var newRecord = {};
		if(!isNaN(stimuli))
		{
			newRecord.distractor = NaN;
			newRecord.target = NaN;
			newRecord.type = NaN;
		}
		else{
			newRecord.distractor = stimuli.distractor;
			newRecord.target = stimuli.target;
			newRecord.type = stimuli.congruency;
		}
		return newRecord;
	}


	return{
		possibleStimsNeutral,
		possibleStimsCongruent,
		possibleStimsInCongruent,
		responses,
		responseKeyCodes,
		spaceKey,
		recordStim
	};
}
