setTrialNumByMode= (mode)=>{

	if(mode)
	{
		var numColorPracticeTrials = 2;
		var numStroopPracticeTrials = 2;
		var numIntervalPractice = 2;
		var numMainPractice = 2;
		var numBlock = 4;
		var numIntervalTrials = 1000;
		var numIntervalPerBlock = 2;
		var selectPerBlock = 1;
	}
	else
	{
		var numColorPracticeTrials = 80;
		var numStroopPracticeTrials = 60;
		var numIntervalPractice = 4;
		var numMainPractice = 2;
		var numBlock = 4;
		var numIntervalTrials = 1000;
		var numIntervalPerBlock = 15;
		var selectPerBlock = 1;
	}

	return {
	numColorPracticeTrials,
	numStroopPracticeTrials,
	numIntervalPractice,
	numMainPractice,
	numBlock,
	numIntervalTrials,
	numIntervalPerBlock,
	selectPerBlock};
}

