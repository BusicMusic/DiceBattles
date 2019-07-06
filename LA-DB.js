//global variables
var totalRoundsPlayed= 0;
var totalDmgPercentage= 0.00;
var resettingGame= false;
var playerDamageTaken= 0;
var computerDamageTaken= 0;

function RNG(scope){
	var X = scope;
	var R_NUM = Math.floor((Math.random() * 6) + 1);
	return R_NUM;
}

function rollAllDice(){
	var startButton= document.getElementById("startButton");
	startButton.disabled=true;
	startButton.innerHTML="Rolling Dice...";
	
	
	var pDie1= RNG(6);
	var pDie2= RNG(6);
	var pDie3= RNG(6);
	
	var cDie1= RNG(6);
	var cDie2= RNG(6);
	var cDie3= RNG(6);
	resetGameField();
	animateDice(pDie1, pDie2, pDie3, cDie1, cDie2, cDie3);
	
	totalRoundsPlayed++;
}

function updateTextTable(name, d1, d2, d3){
	var name = name;
	var whiteDie= d1;
	var blueDie = d2;
	var redDie= d3;
	
	var action= '';
	var attribute= '';
	var power=0;
	
	if ((whiteDie%2)== 0){
		action="Attacking";}
	else if ((whiteDie%2)!= 0){
		action="Defending";}
	
	if (blueDie> redDie){
		attribute= 'Magical';
		power= blueDie;
		document.getElementById(name+"Die3").style.opacity='0.5';}
	else if (redDie> blueDie){
		attribute= 'Physical';
		power= redDie;
		document.getElementById(name+"Die2").style.opacity='0.25';}
	else if (redDie == blueDie){
		attribute = 'Magical';
		power = (redDie+blueDie)/2;}
	
	var item1= document.getElementById(name+"Use"+attribute);
	var item2= document.getElementById(name+"Power"+power);
	var item3= document.getElementById(name+action);
	var item4= document.getElementById(name+"ActionMessage");
	
	item3.style.color='limeGreen';
	item2.style.color='limeGreen';
	item1.style.color='limeGreen';
	if (name=="player")
		item4.innerHTML= ("Player 1 will be <span style='color: limeGreen'>"+ action+ "</span> using a <span style='color: limeGreen'>"+ attribute+ "</span> power of <span style='color: limeGreen'>"+ power+ "</span>");
	else if (name=="computer")
		item4.innerHTML= ("Player 2 will be <span style='color: limeGreen'>"+ action+ "</span> using a <span style='color: limeGreen'>"+ attribute+ "</span> power of <span style='color: limeGreen'>"+ power+ "</span>");
}

function resetGameField(){
	document.getElementById("playerDie2").style.opacity='1.0';
	document.getElementById("computerDie2").style.opacity='1.0';
	
	document.getElementById("playerDie3").style.opacity='1.0';
	document.getElementById("computerDie3").style.opacity='1.0';
	
	var diceImageArray= document.getElementsByClassName("rolledDice");
	for (var cnt=0; cnt< diceImageArray.length; cnt++){
		diceImageArray[cnt].src='ImageResources/Q-die.png';
	}
	
	document.getElementById("playerActionMessage").innerHTML= "Player 1 will be _________ using a ________ power of _";
	document.getElementById("computerActionMessage").innerHTML= "Player 2 will be _________ using a ________ power of _";
	
	var gameOptions1= document.getElementsByClassName("ActionStyle");
	var gameOptions2= document.getElementsByClassName("ActionType");
	var gameOptions3= document.getElementsByClassName("PowerLevels");
	
	for (var cnt= 0; cnt<gameOptions1.length; cnt++){
		gameOptions1[cnt].style.color= 'white';}
	for (var cnt= 0; cnt<gameOptions2.length; cnt++){
		gameOptions2[cnt].style.color= 'white';}
	for (var cnt= 0; cnt<gameOptions3.length; cnt++){
		gameOptions3[cnt].style.color= 'white';}
}
function resetHealth(){
	editHealth('player', -100);
	editHealth('computer', -100);
	playerHealthPercent.innerHTML="100%";
	computerHealthPercent.innerHTML="100%";
}
function battlePhase(player1, pDie1, pDie2, pDie3, player2, cDie1, cDie2, cDie3){
	var p1= player1, p2= player2;
	var p1Die1= pDie1, p1Die2= pDie2, p1Die3= pDie3;
	var p2Die1= cDie1, p2Die2= cDie2, p2Die3= cDie3;
	
	console.log("p1= "+ p1+ " - p1Die1= "+ p1Die1+ ", p1Die2= "+ p1Die2+ ", p1Die3= "+ p1Die3);
	console.log("p2= "+ p2+ " - p2Die1= "+ p2Die1+ ", p2Die2= "+ p2Die2+ ", p2Die3= "+ p2Die3);
	
	var p1Action= '', p1Attribute= '', p1Power= 0;
	var p2Action= '', p2Attribute= '', p2Power= 0;
	
	//getting the p1's action
	if ((p1Die1==2) || (p1Die1==4) || (pDie1==6)){
		p1Action= 'attack';}
	else if ((p1Die1==1) || (p1Die1==3) || (p1Die1==5)){
		p1Action= 'defend';}
	else if ((p1Die1 % 2 == 0) && (p1Action=='defend'))
		window.alert("ERROR! p1 is defending when they should be attacking!");
	else if ((p1Die1 % 2 != 0) && (p1Action=='attack'))
		window.alert("ERROR! p1 is attacking when they should be defending!");
	else
		window.alert("ERROR! Cannot determine if p1 is attacking or defending!");
	
	if (p1Die2 > p1Die3){p1Attribute= 'magic'; p1Power= p1Die2}
	else if (p1Die2 < p1Die3){p1Attribute= 'physical'; p1Power= p1Die3}
	else if (p1Die2 == p1Die3){p1Attribute= 'magic'; p1Power=((p1Die2+p1Die3)/2);}
	else{window.alert("ERROR! "+ p1+ '\'s attack style + power is bugged');}
	
	//getting the p2's action
	if ((p2Die1==2) || (p2Die1==4) || (p2Die1==6)){
		p2Action= 'attack';}
	else if ((p2Die1==1) || (p2Die1==3) || (p2Die1==5)){
		p2Action= 'defend';}
	else if ((p2Die1 % 2 == 0) && (p2Action=='defend'))
		window.alert("ERROR! p2 is defending when they should be attacking!");
	else if ((p2Die1 % 2 != 0) && (p2Action=='attack'))
		window.alert("ERROR! p2 is attacking when they should be defending!");
	else
		window.alert("ERROR! Cannot determine if p2 is attacking or defending!");
	
	if (p2Die2 > p2Die3){p2Attribute= 'magic'; p2Power= p2Die2}
	else if (p2Die2 < p2Die3){p2Attribute= 'physical'; p2Power= p2Die3}
	else if (p2Die2 == p2Die3){p2Attribute= 'magic'; p2Power=((p2Die2+p2Die3)/2);}
	else{window.alert("ERROR! "+ p2+ '\'s attack style + power is bugged');}
	
	//p1 is attacking and p2 is defending
	if ((p1Action=='attack') && (p2Action=='defend')){
		if (p1Attribute==p2Attribute){
			var totalDmg= (p1Power - p2Power);
			if (totalDmg<0)
				totalDmg= 0;
			editHealth(p2, totalDmg);}
		else if (p1Attribute != p2Attribute){
			editHealth(p2, p1Power);}
	}
	// p2 is attacking and p1 defending
	if ((p1Action=='defend') && (p2Action=='attack')){
		if (p1Attribute==p2Attribute){
			var totalDmg= (p2Power - p1Power);
			if (totalDmg<0)
				totalDmg= 0;
			editHealth(p1, totalDmg);}
		else if (p1Attribute != p2Attribute){
			editHealth(p1, p2Power);}
	}
	//both players are attacking
	if ((p1Action=='attack') && (p2Action=='attack')){
		editHealth(p1, p2Power);
		editHealth(p2, p1Power);
	}
	//both players are defending
	if ((p1Action=='defend') && (p2Action=='defend')){
		//slightly healing both players since they have 'down time'
		editHealth(p1, 0);
		editHealth(p2, 0);
	}
}

//script for editing the health bars
function editHealth(player, damage){
	var name= player;
	var healthAmount= document.getElementById(name+"HealthValue").offsetWidth;
	var healthBar= document.getElementById(name+"HealthValue");
	var damage= damage;
	
	if (damage==-100){//resetting the health and damage bars
		console.log(damage);
		healthBar.style.width="400px";
		damageBar= document.getElementById(name+"DamageBar");
		damageBar.style.width="400px";
		
		damageBar.style.transform= "translate(0px, 0px)";
		damageBar.style.transform= "translate(0px, 0px)";
		healthBar.style.textAlign= "center";
		healthBar.style.textAlign= "center";
	}
	else{//editing the health and damage bars
		//for making easier calculations, the damage is multiplied by 4 since the health bar is 400px wide
		damage= damage*4
		
		//to help the game go faster; triple damage
		damage= damage*3;
		if (name=='player')
			playerDamageTaken+= damage;
		else if (name=='computer')
			computerDamageTaken+= damage;
		
		console.log("playerDamageTaken: "+playerDamageTaken);
		console.log("computerDamageTaken: "+ computerDamageTaken);
		
		if (damage>0){
			totalDmgPercentage= totalDmgPercentage + (damage/4);
			shakeBars(player);
			console.log(totalDmgPercentage);
		}
		
		if (damage<0)
			damage=-6;
		if (healthAmount-damage>400)
			healthBar.style.width='400px';
		else if (healthAmount-damage<0)
			healthBar.style.width='0px';
		else
			healthBar.style.width=(healthAmount-damage)+"px";
		
		var maxHealth= 400;
		var currentHealth= document.getElementById(name+"HealthValue").offsetWidth;
		activateDamageBar(player, currentHealth);
			
		var healthPercentage= (currentHealth/maxHealth)*100;
		var finalPercentage= healthPercentage.toFixed(2);
		
		if ((finalPercentage>=100) || (finalPercentage==0)){
			finalPercentage= healthPercentage.toFixed(0);
		}
		
		var displayPercent= document.getElementById(name+"HealthPercent");
		displayPercent.innerHTML= finalPercentage+ '%';
		if (finalPercentage <= 0.00){
			console.log(name+ '\'s health is at '+ finalPercentage+ '%');
			document.getElementById("startButton").disabled=true;
			endGame(player);
		}
	}
}

//function to give animation to the orange damage bars
function activateDamageBar(player, currentHealth){
	var player= player;
	var currentHealth= currentHealth;
	
	var dmgBar= document.getElementById(player+"DamageBar");
	
	if (resettingGame==false)
		setTimeout(shrinkFunction, 510);
	console.log(resettingGame);
	
	function shrinkFunction(){
	var action= setInterval(
		function (){
			if (dmgBar.offsetWidth > currentHealth){
				dmgBar.style.width=(dmgBar.offsetWidth-1)+"px";
			}
			else
				clearInterval(action);
		},
	10);}
}
//function to shake the health bars
function shakeBars(player){
	var player= player;
	
	var bar1= document.getElementById(player+"HealthBar");
	var bar2= document.getElementById(player+"DamageBar");
	var bar3= document.getElementById(player+"HealthValue");
	var bar= [bar1, bar2, bar3];
	
	var shakeAction= setInterval(shakeIt, 100);
	var x=0;
	function shakeIt(){
		if (x<1){
			setTimeout(moveDown, 0);
			setTimeout(moveLeft, 50);
			setTimeout(reCenter, 150);
			x++;
		}
	}
	function moveUp(){
		for (var cnt=0; cnt<3; cnt++){
			(bar[cnt]).style.transform= "translate(0px, -2px)";
			(bar[cnt]).style.transform= "translate(0px, 2px)";
		}
	}
	function moveDown(){
		for (var cnt=0; cnt<3; cnt++){
			(bar[cnt]).style.transform= "translate(0px, 2px)";
			(bar[cnt]).style.transform= "translate(0px, -2px)";
		}
	}
	function moveLeft(){
		for (var cnt=0; cnt<3; cnt++){
			(bar[cnt]).style.transform= "translate(-2px, 0px)";
			(bar[cnt]).style.transform= "translate(2px, 0px )";
		}		
	}
	function moveRight(){
		for (var cnt=0; cnt<3; cnt++){
			(bar[cnt]).style.transform= "translate(2px, 0px)";
			(bar[cnt]).style.transform= "translate(-2px, 0px)";
		}
	}
	function reCenter(){
		for (var cnt=0; cnt<3; cnt++){
			(bar[cnt]).style.transform= "translate(0px, 0px)";		
		}
	}
}
//function to visually roll the dice
function animateDice(pDie1, pDie2, pDie3, cDie1, cDie2, cDie3){
	var pDie1= pDie1, pDie2= pDie2, pDie3= pDie3;
	var cDie1= cDie1, cDie2= cDie2, cDie3= cDie3;
	
	var pD1= document.getElementById("playerDie1");
	var pD2= document.getElementById("playerDie2");
	var pD3= document.getElementById("playerDie3");
	var cD1= document.getElementById("computerDie1");
	var cD2= document.getElementById("computerDie2");
	var cD3= document.getElementById("computerDie3");
	
	var pDice= [pD1, pD2, pD3];
	var cDice= [cD1, cD2, cD3];
	
	for (var cnt=0; cnt<3; cnt++){
		pDice[cnt].src="ImageResources/Q-die.png";
		cDice[cnt].src="ImageResources/Q-die.png";
	}
	
	//shaking the white die of each player
	setInterval(function(){
		setTimeout(shakeDice(0, 15), 0);
	}, 100);
	//shaking the blue die of each player
	setInterval(function(){
		setTimeout(shakeDice(1, 35), 0);
	}, 100);
	
	//shaking the red die of each player
	setInterval(function(){
		setTimeout(shakeDice(2, 45), 0);
	}, 100);
	
	var cnt= 0;
	var cnt2= 0;
	var scope=0;
	var x=1;
	function shakeDice(x, scope){
		//x is the index of the dice array that will be referenced
		//scope is the amount of time the aniation will go on for
		var x= x;
		var scope= scope;
		if (cnt< scope){
			setTimeout(function(){//moving up
				//moving the player's dice
				(pDice[x]).style.transform= "translate(0px, -7px)";
				(pDice[x]).style.transform= "translate(0px, 7px)";
				//moving the computer's dice
				(cDice[x]).style.transform= "translate(0px, -7px)";
				(cDice[x]).style.transform= "translate(0px, 7px)";
			}, 0);
			setTimeout(function(){//moving right
				//moving the player's dice
				(pDice[x]).style.transform= "translate(7px, 0px)";
				(pDice[x]).style.transform= "translate(-7px, 0px)";
				//moving the computer's dice
				(cDice[x]).style.transform= "translate(7px, 0px)";
				(cDice[x]).style.transform= "translate(-7px, 0px)";
			}, 50);
			setTimeout(function(){//moving down
				//moving the player's dice
				(pDice[x]).style.transform= "translate(0px, 7px)";
				(pDice[x]).style.transform= "translate(0px, -7px)";
				//moving the computer's dice
				(cDice[x]).style.transform= "translate(0px, 7px)";
				(cDice[x]).style.transform= "translate(0px, -7px)";
			}, 100);
			setTimeout(function(){//moving left
				//moving the player's dice
				(pDice[x]).style.transform= "translate(-7px, 0px)";
				(pDice[x]).style.transform= "translate(7px, 0px )";
				//moving the computer's dice
				(cDice[x]).style.transform= "translate(-7px, 0px)";
				(cDice[x]).style.transform= "translate(7px, 0px )";	
			}, 150);
			setTimeout(function(){//moving back to center
				//moving the player's dice
				(pDice[x]).style.transform= "translate(0px, 0px)";
				//moving the computer's dice
				(cDice[x]).style.transform= "translate(0px, 0px)";
			}, 200);
			cnt++;
		}
		else if((cnt == scope) && (cnt2 < 3)){
			//changing the images of the dice once they stop shaking
			cnt2++;
			if (x==0){
				pDice[0].src="ImageResources/"+ pDie1+ "-die.png";
				cDice[0].src="ImageResources/"+ cDie1+ "-die.png";
			}
			else if (x==1){
				
				pDice[1].src="ImageResources/"+ pDie2+ "-die.png";
				cDice[1].src="ImageResources/"+ cDie2+ "-die.png";
			}
			else if (x==2){
				pDice[2].src="ImageResources/"+ pDie3+ "-die.png";
				cDice[2].src="ImageResources/"+ cDie3+ "-die.png";
			}
			if (cnt2==3){
				cnt2++;
				updateTextTable("player",   pDie1, pDie2, pDie3);
				updateTextTable("computer", cDie1, cDie2, cDie3);
				
				battlePhase("player", pDie1, pDie2, pDie3, "computer", cDie1, cDie2, cDie3);
				setTimeout(function(){
					document.getElementById("startButton").disabled=false;
					document.getElementById("startButton").innerHTML="Roll Again";
				}, 750);
			}
		}
	}
}


//function to end the game once a players health has reached zero
function endGame(player){
	var loser= player;
	var winner= '';
	var screen= document.getElementById('gameOverScreen');
	
	if (loser=='player')
		winner= 'computer';
	else if (loser=='computer')
		winner= 'player';
	else
		console.log("ERROR! Loser is: "+ loser+ '! This is not either of the two players!');
	if (screen.style.display=='none'){
		screen.style.display= 'block';
		populateScreen(winner, loser, screen);
	}
	else{
		screen.style.display='none';
	}
}
function populateScreen(winner, loser, screen){
	var winner= winner;
	var loser= loser;
	var screen= screen;
	
	if (winner=="player"){
		winner="Player 1";
		loser="Player 2";
	}
	else if (winner="computer"){
		winner="Player 2";
		loser="Player 1";
	}
	else{
		winner= "testing1";
		loser="testing2";
	}
	
	var winnerText= document.getElementById("winner");
	winnerText.innerHTML= (winner+"! Congrats!<br/><sup><i>Better luck next time, "+ loser+ "</i></sup>");
	
	var roundsPlayedText= document.getElementById("roundsPlayed");
	roundsPlayedText.innerHTML= (totalRoundsPlayed);
}

//code to restart the game
function restartGame(){
	resettingGame= true;
	console.log(resettingGame);
	var screen= document.getElementById('gameOverScreen');
	var playButton= document.getElementById("startButton");
	if (resettingGame){
		playerDamageTaken= 0;
		computerDamageTaken= 0;
		playButton.disabled=false;
		playButton.innerHTML="Start the Game";
		
		screen.style.display="none";
		totalRoundsPlayed= 0;
		totalDmgPercentage = 0.00;
		resetHealth();
		document.getElementById("playerDie1").src="ImageResources/1-die.png";
		document.getElementById("playerDie2").src="ImageResources/2-die.png";
		document.getElementById("playerDie3").src="ImageResources/3-die.png";
		document.getElementById("computerDie1").src="ImageResources/4-die.png";
		document.getElementById("computerDie2").src="ImageResources/5-die.png";
		document.getElementById("computerDie3").src="ImageResources/6-die.png";
	}
	resettingGame= false;
	console.log(resettingGame);
}











