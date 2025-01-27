// feedbackFunctions = (blockType)=>
// {
// 	displayFeedback = (tag,interval)=>
// 	{
// 		var counter = interval.getCounter();
// 		var numGems = reward[interval.cueType] * counter[0];

// 		if(numGems > 1) var label = ' Gems';
// 		else var label = ' Gem';

// 		var gemText = $("<p></p>").attr({id:'totalGemText'}).text(numGems.toFixed(0));
// 		var gemImg = $("<img></img>").attr({src:"/static/images/feedback/Rew1.png",id:'gemImg'});
// 		gemText.css({'margin-top':'0px','font-size':'40px'});
// 		gemImg.css({'margin-bottom':'auto','margin':'auto'});
// 		addElementByGrid(gemImg,5,7,5,7);
// 		addElementByGrid(gemText,7,8,5,7);
// 	}



// 	cleanFeedback = ()=>
// 	{
// 		$("#totalGemText,#gemImg").remove();
// 	}


// 	// displayTracker = (tag,cueType)=>
// 	// {
// 	// 	var showScoreInTag = function(counter){
// 	// 		$("#counterGemText").remove();
// 	// 		var numGems = reward[cueType] * counter[0];
// 	// 		var gemText = $("<p></p>").attr({id:'counterGemText'}).text("Gems: " + numGems.toFixed(0));
// 	// 		gemText.css({'margin-top':'0px',"font-size":"30px"});
// 	// 		addElementByGrid(gemText,tag);
// 	// 	};
// 	// 	return showScoreInTag;
// 	// }


// 	displayTracker = (tag,cueType)=>
// 	{
// 		var showScoreInTag = function(counter){
// 			$("#tracktable").remove();
// 			var numGems = reward[cueType] * counter[0];
// 			var tracktable = $("<table></table>").attr({id:'tracktable'});
// 			var trackrow = $("<tr></tr>");
// 			var trackImg = $("<td></td>").attr({align:'left',width:'50%',height:'120px'}).append($("<img></img>").attr({src:"/static/images/cues/GL_story/gem.png",height:'50px'}));
// 			var trackText = $("<td></td>").attr({align:'right',width:'50%',height:'120px'}).css("fontSize", 42).append($("<p></p>").text(numGems.toFixed(0)));
// 			trackrow.append(trackText);
// 			trackrow.append(trackImg);
			
// 			tracktable.append(trackrow);
// 			addElementByGrid(tracktable,8,9,5,7);
// 		};
// 		return showScoreInTag;
// 	}


// 	// cleanTracker = ()=>
// 	// {
// 	// 	$('#counterGemText,#counterGemImg').remove();
// 	// }


// 	cleanTracker = ()=>
// 	{
// 		$("#tracktable").remove();
// 	}


// 	if(blockType=='fixedDur')
// 		itiAction = (Trial)=>
// 		{
// 			var pastTime = new Date().getTime() - Trial.startTime;
// 			var remainTime = Math.max(0,(Trial.intervalDur-pastTime)/1000).toFixed(1);
// 			var element_fixation = $("<p></p>").attr({id:'fixation'}).text(remainTime+'s left');
// 			element_fixation.css({'font-size':'40px'});
// 			addElement(element_fixation,'#m',true);	
// 		}
// 	else
// 		itiAction = (Trial)=>
// 		{
// 			var remainNum = Trial.stimSet.length + 1;
// 			var test = ' word';
// 			if(remainNum>1) text = ' words';
// 			var element_fixation = $("<p></p>").attr({id:'fixation'}).text(remainNum.toFixed(0) + text + ' left');
// 			element_fixation.css({'font-size':'40px'});
// 			addElement(element_fixation,'#m',true);
// 		}

// 	return{displayFeedback,cleanFeedback,displayTracker,cleanTracker,itiAction};
// }






feedbackFunctions = (blockType)=>
{
	displayFeedback = (tag,interval)=>
	{
		var counter = interval.getCounter();

		if(interval.cueType[0] == 'G')
		{
			var numGems = startGemByBlock[interval.cueType] + gainByBlock[interval.cueType] * counter[0];
			var numBombs = penaltyByBlock[interval.cueType] * counter[1];
			if(numGems>=numBombs){			
				var netvalue = numGems - numBombs;
				if(netvalue > 1) var label = ' Gems';
				else var label = ' Gem';
			}
			else
			{			
				var netvalue = numBombs - numGems;
				if(netvalue > 1) var label = ' Bombs';
				else var label = ' Bomb';
			}

			var summary = '<b>' + netvalue.toFixed(0) + '</b>' + label;

			var gemText = $("<p></p>").attr({id:'totalGemText'}).text(numGems.toFixed(0));
			var bombText = $("<p></p>").attr({id:'totalBombText'}).text(numBombs.toFixed(0));
			var summaryText = $("<p></p>").attr({id:'summaryText'}).html(summary);
			var gemImg = $("<img></img>").attr({src:"/static/images/tracker/gem.png",id:'gemImg'});
			var bombImg = $("<img></img>").attr({src:"/static/images/tracker/actBomb.png",id:'bombImg'});
			gemText.css({'margin-top':'0px','font-size':'40px'});
			gemImg.css({'margin-bottom':'auto','margin':'auto'});
			bombText.css({'margin-top':'0px','font-size':'40px'});
			bombImg.css({'margin-bottom':'auto','margin':'auto'});
			summaryText.css({'margin-top':'50px','font-size':'40px'});
			addElementByGrid(gemImg,5,7,4,6);
			addElementByGrid(bombImg,5,7,6,8);
			addElementByGrid(gemText,7,8,4,6);
			addElementByGrid(bombText,7,8,6,8);
			addElementByGrid(summaryText,4,5,5,7);
		}
		else
		{
			var numNetBombs = startBombByBlock[interval.cueType] - lossByBlock[interval.cueType] * counter[0] + penaltyByBlock[interval.cueType] * counter[1];
			var numPenBombs = penaltyByBlock[interval.cueType] * counter[1];
			var numInActBombs = lossByBlock[interval.cueType] * counter[0];
			var summary = '<b>' + numNetBombs.toFixed(0) + '</b>' + ' Bombs';


			var penBombText = $("<p></p>").attr({id:'totalPenBombText'}).text(numPenBombs.toFixed(0));
			var inActBombText = $("<p></p>").attr({id:'totalInActBombText'}).text(numInActBombs.toFixed(0));
			var summaryText = $("<p></p>").attr({id:'summaryText'}).html(summary);

			var inActBombImg = $("<img></img>").attr({src:"/static/images/tracker/inActBomb.png",id:'inActBombImg'});
			var penBombImg = $("<img></img>").attr({src:"/static/images/tracker/actBomb.png",id:'penBombImg'});
			penBombText.css({'margin-top':'0px','font-size':'40px'});
			penBombImg.css({'margin-bottom':'auto','margin':'auto'});
			inActBombText.css({'margin-top':'0px','font-size':'40px'});
			inActBombImg.css({'margin-bottom':'auto','margin':'auto'});
			summaryText.css({'margin-top':'50px','font-size':'40px'});
			addElementByGrid(inActBombImg,5,7,4,6);
			addElementByGrid(penBombImg,5,7,6,8);
			addElementByGrid(inActBombText,7,8,4,6);
			addElementByGrid(penBombText,7,8,6,8);
			addElementByGrid(summaryText,4,5,5,7);			
		}
	}

	cleanFeedback = ()=>{
		$("#totalGemText,#totalBombText,#gemImg,#bombImg,#summaryText,#totalPenBombText,#totalInActBombText,#inActBombImg,#penBombImg").remove();
	}


	displayTracker = (tag,cueType)=>
	{
		var showScoreInTag = function(counter){
			$("#tracktableGems,#tracktableBombs").remove();
			if(cueType[0]=='G')
			{
				var numGems = startGemByBlock[cueType] + gainByBlock[cueType] * counter[0];
				var tracktableGems = $("<table></table>").attr({id:'tracktableGems'});
				var trackrowGems = $("<tr></tr>");
				var trackImgGems = $("<td></td>").attr({align:'left',width:'50%',height:'120px'}).append($("<img></img>").attr({src:"/static/images/tracker/gem.png",height:'50px'}));
				var trackTextGems = $("<td></td>").attr({align:'right',width:'50%',height:'120px'}).css("fontSize", 42).append($("<p></p>").text(numGems.toFixed(0)));
				trackrowGems.append(trackTextGems);
				trackrowGems.append(trackImgGems);
				tracktableGems.append(trackrowGems);
			}
			else
			{
				var numInactBombs = lossByBlock[cueType] * counter[0];
				var tracktableGems = $("<table></table>").attr({id:'tracktableGems'});
				var trackrowGems = $("<tr></tr>");
				var trackImgGems = $("<td></td>").attr({align:'left',width:'50%',height:'120px'}).append($("<img></img>").attr({src:"/static/images/tracker/inActBomb.png",height:'50px'}));
				var trackTextGems = $("<td></td>").attr({align:'right',width:'50%',height:'120px'}).css("fontSize", 42).append($("<p></p>").text(numInactBombs.toFixed(0)));
				trackrowGems.append(trackTextGems);
				trackrowGems.append(trackImgGems);
				tracktableGems.append(trackrowGems);
			}

			var numBombs = 　penaltyByBlock[cueType] * counter[1];
			var tracktableBombs = $("<table></table>").attr({id:'tracktableBombs'});
			var trackrowBombs = $("<tr></tr>");
			var trackImgBombs = $("<td></td>").attr({align:'left',width:'50%',height:'120px'}).append($("<img></img>").attr({src:"/static/images/tracker/actBomb.png",height:'50px'}));
			var trackTextBombs = $("<td></td>").attr({align:'right',width:'50%',height:'120px'}).css("fontSize", 42).append($("<p></p>").text(numBombs.toFixed(0)));
			trackrowBombs.append(trackTextBombs);
			trackrowBombs.append(trackImgBombs);
			tracktableBombs.append(trackrowBombs);
			
			addElementByGrid(tracktableGems,8,9,4,6);
			addElementByGrid(tracktableBombs,8,9,6,8);
		};
		return showScoreInTag;
	}

	cleanTracker = ()=>
	{
		$("#tracktableGems,#tracktableBombs").remove();
	}

	return{displayFeedback,cleanFeedback,displayTracker,cleanTracker};
}




setPracticefeedbackFunctions = ()=>
{
	displayFeedback = (tag,interval)=>
	{
		var counter = interval.getCounter();
		var element = $("<p></p>").attr({id:'intervalMsg'}).text('Correct: ' + interval.counter[0]);
		element.css('margin-top','0px');
		addElement(element,"#mm",center=true);
	}
	cleanFeedback = ()=>
	{
		$("#intervalMsg").remove();
	}
	
	displayTracker = (tag,cueType)=>
	{
		var showScoreInTag = function(counter){
			$("#scoreCounter").remove();	
			var element = $("<p></p>").attr({id:'scoreCounter'}).text(counter[0]);
			element.css('margin-top','0px');
			addElement(element,"#b");
		};
		return showScoreInTag;
	}

	cleanTracker = ()=>
	{
		$('#scoreCounter').remove();
	}

	return{displayFeedback,cleanFeedback,displayTracker,cleanTracker};
}