// Sets the cues depending on the task 

//cues for collector protector cover story gems and bombs

cueSet = ()=> {
	const cues = {
	Gain_Pun1:
		[['/static/images/cues/RLP/Gain1_Pun1.png','Gain1_Pun1'],
		 ['/static/images/cues/RLP/Gain2_Pun1.png','Gain2_Pun1']],
	Gain_Pun2:
		[['/static/images/cues/RLP/Gain1_Pun2.png','Gain1_Pun2'],
		 ['/static/images/cues/RLP/Gain2_Pun2.png','Gain2_Pun2']],
	Gain1_Pun:
		[['/static/images/cues/RLP/Gain1_Pun1.png','Gain1_Pun1'],
		 ['/static/images/cues/RLP/Gain1_Pun2.png','Gain1_Pun2']],
	Gain2_Pun:
		[['/static/images/cues/RLP/Gain2_Pun1.png','Gain2_Pun1'],
		 ['/static/images/cues/RLP/Gain2_Pun2.png','Gain2_Pun2']],
	Loss_Pun1:
		[['/static/images/cues/RLP/Loss1_Pun1.png','Loss1_Pun1'],
		 ['/static/images/cues/RLP/Loss2_Pun1.png','Loss2_Pun1']],
	Loss_Pun2:
		[['/static/images/cues/RLP/Loss1_Pun2.png','Loss1_Pun2'],
		 ['/static/images/cues/RLP/Loss2_Pun2.png','Loss2_Pun2']],
	Loss1_Pun:
		[['/static/images/cues/RLP/Loss1_Pun1.png','Loss1_Pun1'],
		 ['/static/images/cues/RLP/Loss1_Pun2.png','Loss1_Pun2']],
	Loss2_Pun:
		[['/static/images/cues/RLP/Loss2_Pun1.png','Loss2_Pun1'],
		 ['/static/images/cues/RLP/Loss2_Pun2.png','Loss2_Pun2']],
	};
	return cues;
}

practiceCueSet = ()=>{

	const practiceCues = {
	collector:
		[['/static/images/cues/RLP/Gain1_Pun1.png','Gain1_Pun1'],
		 ['/static/images/cues/RLP/Gain2_Pun1.png','Gain2_Pun1'],
		 ['/static/images/cues/RLP/Gain1_Pun2.png','Gain1_Pun2'],
		 ['/static/images/cues/RLP/Gain2_Pun2.png','Gain2_Pun2']],
	protector:
		[['/static/images/cues/RLP/Loss1_Pun1.png','Loss1_Pun1'],
		 ['/static/images/cues/RLP/Loss2_Pun1.png','Loss2_Pun1'],
		 ['/static/images/cues/RLP/Loss1_Pun2.png','Loss1_Pun2'],
		 ['/static/images/cues/RLP/Loss2_Pun2.png','Loss2_Pun2']]
	};
	return practiceCues;
}