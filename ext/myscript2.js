// Checking page title
if (document.title.indexOf("Google") != -1 || document.title.indexOf("reddit") != -1 || document.title.indexOf("Yahoo") != -1 || document.title.indexOf("Facebook") != -1  || document.title.indexOf("Twitter") != -1) {

	//List of questions
	questions=["ATP and GTP provide energy for several cellular processes, and are composed of all except which of the following components?",
    			"A process in which chance events are likely to change allele frequencies in a small population is known as _____"
    		];
    //List of answers to questions
    var answers = [
		{correct: "A pyrimidine", all:["Three phosphate groups", "A purine", "A pentose sugar", "A pyrimidine"]},
		{correct: "genetic drift", all:["evolution", "bottleneck effect", "natural selection", "genetic drift"]}
	];
	var numQuestions = questions.length;
	curr = 0;	//Current question
	
	//document.cookie="currentQuestion=" + curr + ";";
	
	function getCookie(cname){
		var name = cname + "=";
		var ca = document.cookie.split(";");
		for (var i = 0; i < ca.length; i++){
			var c = ca[i];
			while (c.charAt(0)==' ') c = c.substring(1);
			if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
		}
		return "";
	}


	/****** MAIN BACKGROUND OVERLAY ******/
    var div = document.createElement( 'div' );
	var btnForm = document.createElement( 'form' );
	var btn = document.createElement( 'input' );
	//append all elements
	document.body.appendChild( div );
	div.appendChild( btnForm );
	btnForm.appendChild( btn );
	//set attributes for div
	div.id = 'myDivId';
	div.style.position = 'fixed';
	div.style.top = '0%';
	div.style.left = '0%';
	div.style.width = '100%';   
	div.style.height = '100%';
	div.style.backgroundColor = '#7FDBFF';
	//set attributes for btnForm
	btnForm.action = '';
	//set attributes for btn
	//"btn.removeAttribute( 'style' );
	btn.type = 'button';
	//btn.setAttribute("onclick", 'document.getElementById("myDivId").style.visibility="hidden"');
	btn.value = 'hello';
	btn.style.visibility = 'hidden';
	btn.style.top = '50%';
	btn.style.left = '50%';
	
	
	/****** QUESTION HOLDER ******/
	var questionBox = document.createElement("div");
	var t = document.createTextNode("This is where the question will go.");
	questionBox.appendChild(t);
	questionBox.style.position="fixed";
	questionBox.style.top="25%";
	questionBox.style.left="10%";
	questionBox.style.fontSize="25px";
	//questionBox.style.backgroundColor="lightblue";
	questionBox.setAttribute("id", "questionBox");
	//document.body.appendChild(questionBox);
	div.appendChild(questionBox);
	
	var testButton = document.createElement("button");
	//testButton.setAttribute("onclick", "document.getElementById('myDivId').style.visibility='hidden';");
	testButton.addEventListener('click', function(){
											getQuestion(curr);
											//choiceA.innerHTML = "Apple Sauce";
										},
										false);
	div.appendChild(testButton);
	
	var testButton2 = document.createElement("button");
	testButton2.setAttribute("onclick", "document.getElementById('myDivId').style.visibility='hidden';"); //can also use: div.style.visibility="hidden";
	div.appendChild(testButton2);
	
	
	
	/****** CHOICE BUTTONS ******/

	var choiceA = document.createElement("button");
	choiceA.setAttribute("id", "choiceA");
	//var choiceAText = document.createTextNode(answers[curr].correct);			//Actual text being displayed
	choiceA.addEventListener('click', function(){								//When clicked
											var choice = answers[curr].correct;	//Value of the answer
											checkAnswer(curr, choiceA.innerHTML);
										},
										false);
	choiceA.choice=answers[0].correct;
	//choiceA.appendChild(choiceAText);

	var choiceB = document.createElement("button");
	choiceB.setAttribute("id", "choiceB");
	//var choiceBText = document.createTextNode(answers[curr].incorrect[0]);
	choiceB.addEventListener('click', function(){
											//var choice = answers[curr].incorrect[0];
											checkAnswer(curr, choiceB.innerHTML);
										},
										false);
	//choiceB.choice=answers[curr].incorrect[0];
	//choiceB.appendChild(choiceBText);

	var choiceC = document.createElement("button");
	choiceC.setAttribute("id", "choiceC");
	//var choiceCText = document.createTextNode(answers[curr].incorrect[1]);
	choiceC.addEventListener('click', function(){
											//var choice = answers[curr].incorrect[1];
											checkAnswer(curr, choiceC.innerHTML);
										},
										false);
	//choiceC.choice=answers[curr].incorrect[1];
	//choiceC.appendChild(choiceCText);

	var choiceD = document.createElement("button");
	choiceD.setAttribute("id", "choiceD");
	//var choiceDText = document.createTextNode(answers[curr].incorrect[2]);
	choiceD.addEventListener('click', function(){
											//var choice = answers[curr].incorrect[2];
											checkAnswer(curr, choiceD.innerHTML);
										},
										false);
	//choiceD.choice=answers[curr].incorrect[2];
	//choiceD.appendChild(choiceDText);
	

	document.body.appendChild(choiceA);
	document.body.appendChild(choiceB);
	document.body.appendChild(choiceC);
	document.body.appendChild(choiceD);

	var answerHolder = document.createElement("div");
	answerHolder.appendChild(choiceA);
	answerHolder.appendChild(choiceB);
	answerHolder.appendChild(choiceC);
	answerHolder.appendChild(choiceD);

	answerHolder.style.position="fixed";
	answerHolder.style.top="50%";
	answerHolder.style.left="35%";
	
	div.appendChild(answerHolder);
	
	
	/**** LOAD NEXT QUESTION or INITIALIZE QUESTION ****/
	
	var values=[0, 1, 2, 3];
	var questionHolder = document.getElementById("questionBox");
	
	function getQuestion(index){		
		values = shuffleArray(values);
		if (questions[index]!= undefined){
			questionHolder.innerHTML = questions[index];
			
			choiceA.innerHTML = answers[index].all[values[0]];
			choiceB.innerHTML = answers[index].all[values[1]];
			choiceC.innerHTML = answers[index].all[values[2]];
			choiceD.innerHTML = answers[index].all[values[3]];
		}
		else{
			div.style.visibility="hidden";
		}
	}
	
	/**** CHECK ANSWER ****/
	function checkAnswer(index, givenAnswer){
		if (givenAnswer == answers[index].correct){		//if the answer was correct
			div.style.backgroundColor = '#2ECC40';		//make the background green
			curr++
			setTimeout(function (){						//wait a second
				setCookie("currentQuestion", curr, 1000);
				destroyOverlay();						//go back to normal webpage
			}, 1000);
		}
		else{											//if the answer was incorrect
			div.style.backgroundColor = '#FF4136';		//make the background red
			curr++;										//increment question index
			setTimeout(function (){						//wait a second
				setCookie("currentQuestion", curr, 1000);
				getQuestion(curr)						//go to next question
				div.style.backgroundColor = '#7FDBFF';	//reset background color;
			}, 1000);
		}
	}
	
	function destroyOverlay(){
		div.style.visibility="hidden";
	}
	
	function shuffleArray(array){
	  var currentIndex = array.length, temporaryValue, randomIndex;

	  // While there remain elements to shuffle...
	  while (0 !== currentIndex) {

		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		// And swap it with the current element.
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	  }

	  return array;
	}
	
	function initializeCookie(){
		if (getCookie("currentQuestion")==""){
			document.cookie="currentQuestion=0; expires=Thu, 01 Jan 2100 00:00:00 UTC";
			//alert("Cookie not found. Being initialized.");
		}
		else{
			//alert("cookie found. currentQuestion=" + getCookie("currentQuestion"));
		}
		curr = getCookie("currentQuestion");
	}
	
	function setCookie (cname, cvalue, exdays) {
		var d = new Date();
		d.setTime(d.getTime() + (exdays*24*60*60*1000));
		var expires = "expires="+d.toUTCString();
		document.cookie= cname + "=" + cvalue + "; " + expires;
	}
	
	initializeCookie();
	getQuestion(curr);		//initialize the question and answer choices
	
	
}
