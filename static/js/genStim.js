

generateStimSet = (set1,set2,numIntervalTrials,alter=true)=>{
console.log("inside generateStimSet")

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
		if(alter)
		for(var j = 0;j<possibleStimsToBeFiltered.length;j++)
		{
			stimOption = possibleStimsToBeFiltered[j];
			if(stimOption.target!=selectedStim.target && stimOption.distractor!=selectedStim.distractor)
			{
				subsetStims.push(stimOption);
			}
		}
		else
		{
			subsetStims = possibleStimsToBeFiltered;
		}
		selectedStim = _.shuffle(subsetStims)[0];
		stims.push(selectedStim);
	}

	return stims;
}