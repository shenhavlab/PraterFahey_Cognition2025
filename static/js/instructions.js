//file containing the instruction functions 




instruct = () => {

	var pages =  [
	"instructions/instruct-story1.html",
	"instructions/instruct-story2.html",
	"instructions/instruct-1.html",
	"instructions/instruct-2.html",
	"instructions/instruct-2Q.html",
	"instructions/instruct-3P.html",
	"instructions/instruct-fullCollector1.html",
	"instructions/instruct-fullCollector2.html",
	"instructions/instruct-fullCollector3.html",
	"instructions/instruct-fullCollector4.html",
	"instructions/instruct-fullCollectorRecap.html",
	"instructions/instruct-CollectorQ1.html",
	"instructions/instruct-CollectorQ2.html",
	"instructions/instruct-fullProtector1.html",
	"instructions/instruct-fullProtector2.html",
	"instructions/instruct-fullProtector3.html",
	"instructions/instruct-fullProtector4.html",
	"instructions/instruct-fullProtectorRecap.html",
	"instructions/instruct-ProtectorQ1.html",
	"instructions/instruct-ProtectorQ2.html",
	"instructions/instruct-Main-Sample-Collector.html",
	"instructions/instruct-Main-Sample-Protector.html",
	"instructions/instruct-CollectorPracticeReminder.html",
	"instructions/instruct-ProtectorPracticeReminder.html",
	"instructions/instruct-ready.html",
	"instructions/break-remind.html",
	"instructions/breakInfo.html",
	"instructions/breakquiz.html",
	"stage.html",
	"postquestionnaire.html",
	"postTask.html"
	];

	var instruction1Pages =[
	"instructions/instruct-story1.html",
	"instructions/instruct-1.html",
	];



	var instruction2Pages = [
	"instructions/instruct-2.html",
	"instructions/instruct-2Q.html",
	"instructions/instruct-ready.html"
	];

	var instruction3Pages = [
	"instructions/instruct-3P.html",
	"instructions/instruct-ready.html",
	];

	var instructionStory2 = [
	"instructions/instruct-story2.html"
	]

	var instructionCPages = [
	
	"instructions/instruct-fullCollector1.html",
	"instructions/instruct-fullCollector2.html",
	"instructions/instruct-fullCollector3.html",
	"instructions/instruct-fullCollector4.html",
	"instructions/instruct-fullCollectorRecap.html",
	"instructions/instruct-CollectorQ1.html",
	"instructions/instruct-CollectorQ2.html",
	"instructions/instruct-CollectorPracticeReminder.html",
	"instructions/instruct-ready.html"
	];

	var instructionPPages = [
	"instructions/instruct-fullProtector1.html",
	"instructions/instruct-fullProtector2.html",
	"instructions/instruct-fullProtector3.html",
	"instructions/instruct-fullProtector4.html",
	"instructions/instruct-fullProtectorRecap.html",
	"instructions/instruct-ProtectorQ1.html",
	"instructions/instruct-ProtectorQ2.html",
	"instructions/instruct-ProtectorPracticeReminder.html",
	"instructions/instruct-ready.html"
	];

	var postPracticeBreakCollector = [
	"instructions/instruct-Main-Sample-Collector.html",
	"instructions/instruct-ready.html"	
	];

	var postPracticeBreakProtector = [
	"instructions/instruct-Main-Sample-Protector.html",
	"instructions/instruct-ready.html"	
	];

	var BreakPage = [
	"instructions/breakInfo.html",
	"instructions/breakquiz.html",
	"instructions/break-remind.html"
	];

	return {
		pages,
		instruction1Pages,
		instruction2Pages,
		instruction3Pages,
		instructionStory2,
		instructionCPages,
		instructionPPages,
		postPracticeBreakCollector,
		postPracticeBreakProtector,
		BreakPage,
	};
}