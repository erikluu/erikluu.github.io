// Screens
var startMenu = true;
var worldView = false;
var roomScreen = true;
var outdoorScreen = false;
var outdoorScreen2 = false;
var outdoorScreen3 = false;
var aveScreen = false;
var recScreen = false;
var compsciScreen = false;
var smScreen = false;
var finalBuilding = false;
var finalScene = false;
//Sign
var signWrit = false;
//Movements
var x = 250;
var y = 200;
var dx = 5;
var dy = 5;
// Borders
var bX;
var bNX;
var bY;
var bNY;
//Character Perspectives
var cFront = true;
var cBack = false;
var cRight = false;
var cLeft = false;
//Start Screen Gradients
let color1;
let color2;

//BATTLE STUFF
startBattle = false;
firstMenu = false;
battleMenu = false;
runMenu = false;
bagMenu = false;
myHealth = 180;
myBar = 180;
myDeplete = false;
enemyHealth = 180;
bar = 180;
deplete = false;
dialogue = false;
eDialogue = false;
count = 0;
moveslot1 = false;
codeDam = 40;
moveslot2 = false;
moveslot3 = false;
moveslot4 = false;
myDamage = 0;
enemyTurn = false;
win = false;
lose = false;
eMove1 = false;
eMove2 = false;
eMove3 = false;
eDamage = 0;
heal = false;
attackMultiplier = 1;
name = 'Student'
eName = 'Professor'
xT = 480;
yT = 486;
opac = 0;

var startScenetext = true;
var treeX1 = []; //variables for trees
var treeY1 = [];
var treeX2 = [];
var treeY2 = [];
var treeX3 = [];
var treeY3 = [];

function setup()
{
	createCanvas(900, 600);

	//gradient colors for start screen
	color3 = color('#D0C98B');
	color2 = color('#C29C16');
	color1 = color('#115004');

	//intializing location for trees
	for(var i = 0; i < 10; i++){
		treeX1[i] = random(width-480, width-20);
		treeY1[i] = random(20, height);
		if(treeY1[i] > 280){
			treeY1[i] = random(500, height-30);	
		}
	}

	for(var i = 0; i < 10; i++){
		treeX2[i] = random(20, width-20);
		treeY2[i] = random(20, height-20);
		if(treeY2[i] > 200){
			treeY2[i] = random(500, height-20);
			if(treeX2[i] > 400){
				treeX2[i] = random(500, width-20);
			}
		}
	}

	for(var i = 0; i < 5; i++){
		treeX3[i] = random(20, 170);
		treeY3[i] = random(20, height-100);
	}
}

function draw()
{
	background(180);
	//console.log(lose);
	if(startMenu)
	{
		if(mouseX > 355 && mouseX < 540 
			&& mouseY > 350 && mouseY < 420)
		{
			color3 = color('#78CD77');
			startScreentext = true;
			if(mouseIsPressed)
			{
			startMenu = false;
			worldView = true;
			}
		}
			else
			{
				color3 = color('#D0C98B');
				startScreentext = false;
			}
	}
	if(startBattle) { //battle scene
		battleSetup(name);
		if(firstMenu)
			startingBox(name);
		if(battleMenu)
			battleMe('Upload Code','Sleep','Study','Procrastinate');
		if(runMenu)
			runBox('You can\'t escape!');
		if(bagMenu)
			dialogueBox('You left everything at home','Press shift to go back');
	
		if(dialogue) { //player's attacks
			if(moveslot1) {
				dialogueBox(name + ' used Upload Code!','It\'s super effective!');
				myDamage = codeDam;
				move1.run();
			}
			if(moveslot2) {
				dialogueBox(name + ' used Sleep',name + ' took a nap in class');
				myDamage = 0;
				heal = true;
			}
			if(moveslot3) {
				dialogueBox(name + ' used Study!',name + '\'s intelligence rose!');
				myDamage = 0;
				move3.run();
			}
			if(moveslot4) {
				dialogueBox(name + ' used Procrastinate',name + ' got nothing done');
				myDamage = 0;
			}
			count++;
			if(count == 70) {
				if(myDamage > 0)
				{
					attack(myDamage);
					deplete = true;
				}
				if(heal)
				{
					myHealth += 40;
					if(myHealth > 180)
						myHealth = 180;
				}
			}
			if(heal && count>=70 )
				{
					fill(0,255,0);//green bar
					rect(637,397,myBar,17,20);
					if(myBar < myHealth)
					{
						myBar++;	
						console.log(myBar);
					} else {
						heal = false;
					}
				}
			if (count == 240) {
				dialogue = false;
				count = 0;
				moveslot1 = false;
				moveslot2 = false;
				moveslot3 = false;
				moveslot4 = false;
				if(enemyHealth == 0) {
					win = true;
				} else {
					enemyMove();
				}
			}
		}
		if(deplete) { //enemy health bar drop
			EhealthBar();
			if(bar <= enemyHealth) {
				deplete = false;
			}
		}
		if(eDialogue) { //enemy attacks
			if(eMove1) { 
				dialogueBox(eName + ' used Assign Homework!',name + ' lost sleep!');
				eDamage = 20;
				AnimationEnMove2.run();
			}
			if(eMove2) {
				dialogueBox(eName + ' used Pop Quiz!', name + ' failed!');
				eDamage = 60;
				homework(555,156,.8,opac);
				if(opac < 255 && count < 70)
				{
					opac += 5;
				}
				if(opac > 0 && count > 130)
				{
					opac -= 5;
				}
			}
			if(eMove3) {
				dialogueBox(eName + ' used Cancel Office Hours!', name + '\'s intelligence fell!');
				eDamage = 0;
				AnimationEnMove3.run();
			}
			count++;
			if(count == 70)	{
				if(eDamage > 0)
				{				
					defense(eDamage);
					myDeplete = true;
				}
			}
			if (count == 240) {
				eDialogue = false;
				count = 0;
				eMove1 = false;
				eMove2 = false;
				eMove3 = false;
				if(myHealth == 0) {
					lose = true;
				} else {
					firstMenu = true;
				}
			}
		}

		if(myDeplete) { //player's health bar drop
			myHealthBar();
			if(myBar <= myHealth) {
				myDeplete = false;
			}
		}
		if(win) {//what happens if you win
			fill(0);
			rect(0,0,900,600);
			fill(255);

			textSize(50);
			text('You win',380,280);
		}
	}//end battle scene

	if(lose)
	{ //what happens if you lose
		startBattle = false;
		firstMenu = false;
			ohno();
		if(mouseX > 355 && mouseX < 540 
			&& mouseY > 350 && mouseY < 420)
		{
			color3 = color('#78CD77');
			startScreentext = true;
			if(mouseIsPressed)
			{
			lose = false;
			worldView = true;
			roomScreen = true;
			}
		}
			else
			{
				color3 = color('#D0C98B');
				startScreentext = false;
			}
	}

	if(startMenu)
	{
		startScreen();
	}

	if(worldView) 
	{	
		stroke(0);
		strokeWeight(1);
		textSize(12);
	

		if(roomScreen) //--------------
		{
			room();
			var bX = 667;
			var bNX = 235;
			var bY = 380;
			var bNY = 181;
			noGOzone(530, 590, 170, 195);
			noGOzone(615, 665, 150, 200);
			//Exit out door
			if(x > 340 && x < 375)
			{
				if(y < 182)
				{
				roomScreen = false;
				outdoorScreen = true;
				x = 110;
				y = 330;
				}
			}
		}
		if(outdoorScreen) //--------------
		{
			startMenu = false;
			var bX = 890;
			var bNX = 10;
			var bY = 590;
			var bNY = 10;
			outside();
			//building boundaries
			noGOzone(48,372,58,280);

			//Back in building
			if(x > 90 && x < 120)
			{
				if(y > 260 && y < 290)
				{
					roomScreen = true;
					outdoorScreen = false;
					x = 360;
					y = 200;
				}
			}
			// to outside2
			if(x > 889 && y < 395 && y > 305)
			{
				outdoorScreen2 = true;
				outdoorScreen = false;
				x = 15;
			}
			//Sign
			if(x > 840 && x < 875 && y < 350 && y > 275)
			{
				signText1();
			}
		}
		if(outdoorScreen2) //---------------
		{
			var bX = 890;
			var bNX = 10;
			var bY = 590;
			var bNY = 10;
			outside2(); 
			//to outside1
			if(x < 11 && y < 395 && y > 305)
			{
				outdoorScreen2 = false;
				outdoorScreen = true;
				x = 880;
			}
			//building boundaries
			noGOzone(100,350,170,280); //ave
			noGOzone(65,387,148,244);  //ave
			noGOzone(544,908,100,281); //rec
			noGOzone(515, 900, 105, 250);
			noGOzone(135, 315, 395, 560); //sierramadre
         	noGOzone(550, 640, 415, 540); //compscibuilding
  			noGOzone(630, 775, 470, 580);

			//into rec
			if(x > 575 && x < 625 && y < 282 && y > 260)
			{
				outdoorScreen2 = false;
				recScreen = true;
				x = 325;
				y = 460;
			}
			//into ave
			if(x > 280 && x < 320 && y < 282 && y > 260)
			{
				outdoorScreen2 = false;
				aveScreen = true;
				x = 595;
				y = 470;
			}
			//into compsci
            if(x > 575 && x < 620 && y < 565 && y > 540)
         	{
         	    outdoorScreen2 = false;
            	compsciScreen = true;
            	x = 100;
            	y = 570;
         	}
         	//into sierramadre
         	if(x > 193 && x < 230 && y < 567 && y > 550)
         	{
           		outdoorScreen2 = false;
            	smScreen = true;
            	x = 450;
            	y = 550;
         	}
			// to outside 3
			if(y > 585 && x > 400 && x < 500)
			{
				outdoorScreen2 = false;
				outdoorScreen3 = true;
				y = 35;
				x = 225
			}
		}
		if(outdoorScreen3) //----------------
		{
			var bX = 890;
			var bNX = 10;
			var bY = 590;
			var bNY = 10;
			outside3();
			noGOzone(390, 535, 140, 400);
			noGOzone(390, 810, 90, 310);
			noGOzone(665, 810, 140, 400);
			noGOzone(370, 830, 65, 140);
			// to outside2
			if(y < 15 && x < 265 && x > 175)
			{
				outdoorScreen2 = true;
				outdoorScreen3 = false;
				x = 450; 
				y = 550;
			}
			// go in building
			if(x > 577 && x < 625 && y < 311 && y > 250)
			{
				outdoorScreen3 = false;
				finalBuilding = true;
				x = 453;
				y = 480;
			}
		}
		if(recScreen) //--------------------
		{
			var bX = 690;
			var bNX = 210;
			var bY = 478;
			var bNY = 110;
			rec();
			//go outside
			if(x > 300 && x < 350 && y > 470)
			{
				outdoorScreen2 = true;
				recScreen = false;
				x = 600;
				y = 310;
			}
		}
		if(aveScreen) //--------------------
		{
			var bX = 690;
			var bNX = 210;
			var bY = 480;
			var bNY = 265;
			ave();
			//go outside
			if(x > 570 && x < 620 && y > 470)
			{
				outdoorScreen2 = true;
				aveScreen = false;
				x = 300;
				y = 310;
			}			
			if(x > 255 && x < 305 && y < 287 
			   && keyCode === ENTER)
			{
				fill(255);
				rect(200, 510, 500, 80, 10, 10, 10, 10);
				fill(0);
				translate(215, 555);
				scale(1);
				text('You are now all healed back up! Thanks for coming in!', 0, 0);
				myBar = 180;
				myHealth = 180;
			}
		}
		if(compsciScreen) 
      	{
        	compsci();
        	if(x > 70 && x < 115 && y > 580)
         	{
            outdoorScreen2 = true;
            compsciScreen = false;
            x = 535;
            y = 550;
         	}        
         	if (x >890)
         	{
         	   x=890
         	}
         	if (x<10)
         	{
         	   x=10
         	}
         	if (y>590)
         	{
         	   y=590
         	}
         	if (y<10)
         	{
         	   y=10
         	}
      		}
      	if(smScreen)
      	{
        	sierramadre();
        	if(x > 400 && x < 500 && y > 590)
         	{
            	outdoorScreen2 = true;
            	smScreen = false;
            	x = 270;
            	y = 590         
            }        
        	if (x >890)
         	{
         	   x=890
         	}
         	if (x<10)
         	{
            x=10
         	}
         	if (y>590)
         	{
         	   y=590
         	}
         	if (y<10)
         	{
          	  y=10
        	}
     	}
		if(finalBuilding) //--------------------
		{
			finBuilding();
			noGOzone(160, 380, 70, 510);
			noGOzone(520, 740, 70, 510);
			if(x < 380)
			{
				x = 380;
			}
			if(x > 520)
			{
				x = 520;
			}
			if(y > 495)
			{
				y = 495;
			}
			if(y < 85)
			{
				y = 85;
			}
			// exit
			if(x > 415 && x < 485 && y > 493)
			{
				outdoorScreen3 = true;
				finalBuilding = false;
				x = 600;
				y = 315;
			}
			// start battle
			if(x > 390 && x < 510 && y < 170 && y > 90 && keyCode === ENTER)
			{
				finalBuilding = false;
				finalScene = true;
				x = 450;
				y = 330;
			}
		}
		if(finalScene)
		{
			finScene();
			noGOzone(0, 390, 0, 600);
			noGOzone(510, 900, 0, 600);
			noGOzone(0, 420, 150, 280);
			noGOzone(480, 900, 150, 280);
			noGOzone(430, 470, 90, 135);
			if(y > 345)
			{
				y = 345;
			}
			if(y < 80)
			{
				y = 80;
			}
			//start battle
			if(x > 430 && x < 470 && y < 150 && y > 130)
			{
				fill(0);
				rect(195, 505, 510, 90, 10, 10, 10, 10);
				fill(255);
				rect(200, 510, 500, 80, 10, 10, 10, 10);
				fill(0);
				translate(207, 555);
				scale(1.8);
				strokeWeight(1);
				text('Are you ready to battle? Press ENTER to begin.', 0, 0);
				if(keyCode === ENTER)
				{
					worldView = false;
					startBattle = true;
					firstMenu = true;
					
					finalScene = false;
				}
			}
		}
		//Character Direction
		if(cFront)
		{
			characterBack(x, y); // switched character back
		}							// and character front
		if(cBack)
		{
			characterFront(x, y);
		}
		if(cRight)
		{
			characterRight(x, y);
		}
		if(cLeft)
		{
			characterLeft(x, y);
		}
	}
	
	//Movement of player
	if(keyIsDown(UP_ARROW))
	{
		y-= dy;
		cFront = true;
		cBack = false;
		cRight = false;
		cLeft = false;
	}
	if(keyIsDown(DOWN_ARROW))
	{
		y+= dy;
		cFront = false;
		cBack = true;
		cRight = false;
		cLeft = false;
	}
	if(keyIsDown(RIGHT_ARROW))
	{
		x+= dx;
		cFront = false;
		cBack = false;
		cRight = true;
		cLeft = false;
	}
	if(keyIsDown(LEFT_ARROW))
	{
		x-= dx;
		cFront = false;
		cBack = false;
		cRight = false;
		cLeft = true;
	}
	//Limit Movement
	if(x > bX)
	{
		x = bX;
	}
	if(x < bNX)
	{
		x = bNX;
	}
	if(y > bY)
	{
		y = bY;
	}
	if(y < bNY)
	{
		y = bNY;
	}
	
	//console.log(x, y);
	//text(mouseX, 10, 10);
	//text(mouseY, 10, 20);
}

function room()
{
	//Black Background
	fill(0);
	rect(0, 0, 900, 600);
	//Floor
	fill(83, 86, 120);
	rect(225, 200, 450, 200);
	//Wall
	fill(80);
	rect(225, 100, 450, 100);
	fill(60);
	rect(225, 80, 450, 20);
	//Door
	fill(70);
	rect(335, 150, 45, 50, 5, 5, 0, 0);
	fill(0);
	rect(340, 155, 35, 45);
	push();
		scale(1.3);
		translate(-90, -45);
		strokeWeight(.5);
		//Desk
		fill(29, 38, 93);
		rect(500, 200, 40, 11);
		fill(50, 51, 38);
		rect(505, 205, 30, 3)
		fill(83, 51, 38);
		rect(500, 200, 5, 15);
		rect(535, 200, 5, 15);
		rect(500, 185, 40, 20);
		//Chair
		fill(33, 41, 89);
		rect(525, 220, 3, 8);
		fill(86, 166, 66);
		rect(525, 210, 13, 13, 3, 0, 0, 3);
		fill(44, 117, 69);
		rect(525, 220, 13, 3, 0, 0, 0, 3);
		fill(33, 41, 89);
		rect(537, 208, 3, 20);
		fill(86, 166, 66);
		rect(537, 208, 4, 12);
		fill(44, 117, 69);
		rect(537, 217, 4, 3);
		//Book Thing
		fill(160, 130, 28);
		rect(510, 190, 15, 12);
		fill(215, 203, 28);
		rect(510, 190, 15, 10);
	pop();
	//Carpet
	fill(217, 82, 107);
	rect(300, 230, 200, 140, 5, 5, 5, 5);
	fill(120);
	rect(305, 235, 190, 130, 5, 5, 5, 5);
	fill(217, 82, 107)
	rect(310, 240, 180, 120, 5, 5, 5, 5);
	//wardrobe
	fill(0);
	rect(619, 150, 1, 70, 1, 1, 1, 1);
	rect(619, 148, 41, 2, 1, 1, 1, 1);
	rect(620, 219, 40, 2, 1, 1, 1, 1);
	fill(227, 178, 30);
	rect(620, 150, 20, 70, 1, 1, 1, 1);
	rect(640, 150, 20, 70, 1, 1, 1, 1);
	rect(620, 210, 40, 10, 1, 1, 1, 1);
	rect(620, 200, 40, 10, 1, 1, 1, 1);
	fill(0);
	rect(637, 200, 5, 2, 1, 1, 1, 1);
	rect(637, 210, 5, 2, 1, 1, 1, 1);
	rect(636, 150, 8, 2, 1, 1, 1, 1);
	//papers
	push();
		fill(255);
		translate(595, 207);
		rect(0, 0, 11, 9, 1, 1, 1, 1);
		rotate(radians(10));
		rect(0, 5, 11, 9, 1, 1, 1, 1);
		rotate(radians(-20));
		rect(-5, -2, 11, 9, 1, 1, 1, 1);
	pop();
	//bed
	fill(29, 38, 93);
	rect(225, 205, 70, 9, 1, 1, 1, 1);
	fill(125, 147, 184);
	rect(225, 190, 70, 20, 1, 1, 1, 1);
	fill(60);
	rect(225, 180, 3, 40, 1, 1, 1, 1);
	rect(292, 190, 3, 30, 1, 1, 1, 1);
	fill(200);
	rect(229, 192, 10, 16, 2, 2, 2, 2);
	//clock
	fill(0);
	ellipse(500, 150, 20);
	fill(230);
	ellipse(500, 150, 18);
	fill(0);
	push();
		strokeWeight(2);
		line(500, 150, 500, 143);
		line(500, 150, 505, 150);
	pop();
}

function outside()
{
	push();
		fill(45, 166, 119);
		rect(0, 0, width, height);
	pop();
	//wall
	fill(102, 102, 101); // building
	rect(50, 100, 160, 200);
	//door
	fill(43, 43, 42);
	rect(90, 260, 30, 40);
	rect(50, 80, 160, 20);
	//wall detail
	rect(50, 100, 5, 200);
	rect(205, 100, 5, 200);
	fill(171, 171, 162);
	rect(70, 110, 55, 140);
	rect(135, 110, 55, 90);
	rect(135, 205, 55, 45);
	rect(95, 265, 20, 30); //door window
	// COLOR
	fill(250, 250, 10);
	rect(75, 105, 5, 150);
	rect(125, 105, 5, 150);
	rect(150, 105, 5, 150);
	fill(250, 100, 10);
	rect(100, 105, 5, 150);
	fill(250, 40, 10);
	rect(175, 105, 5, 150);

	//building shadow
	push();
	fill(0, 0, 0, 50);
	noStroke();
	triangle(-20, 200, 50, 200, 50, 300);
	pop();

	push();
		translate(160, 0);
		//wall
		fill(102, 102, 101);
		rect(50, 100, 160, 200);
		//door
		fill(43, 43, 42);
		rect(50, 80, 160, 20);
		//wall detail
		rect(50, 100, 5, 200);
		rect(205, 100, 5, 200);
		fill(171, 171, 162);
		rect(70, 110, 55, 140);
		rect(135, 110, 55, 90);
		rect(135, 205, 55, 45);
		// COLOR
		fill(250, 250, 10);
		rect(75, 105, 5, 150);
		fill(250, 100, 10);
		rect(100, 105, 5, 150);
		fill(250, 250, 10);
		rect(125, 105, 5, 150);
		rect(150, 105, 5, 150);
		fill(250, 40, 10);
		rect(175, 105, 5, 150);
	pop();

	fill(125, 115, 57); //road
	rect(30, 300, 900, 100, 5, 5, 5, 5);
	fill(207, 196, 132);
	rect(35, 305, 900, 90, 5, 5, 5, 5);


	fill(0, 0, 0, 50); //sign
	push();
	noStroke();
	translate(865, 295);
	rotate(PI/4);
	ellipse(-10, 5.5, 15, 4); // sign shadow
	pop();
	push();
		translate(835, 286);
		noStroke();
		quad(0, 0, 25, 0, 30, 5, 5, 5);
	pop();

	fill(125, 115, 57);
	rect(857, 287, 5, 10);
	rect(850, 280, 20, 10);
	push();
		translate(863, 282);
		fill(0);
		triangle(0, 0, 0, 6, 5, 3);
		rect(-10, 1.5, 10, 2);
	pop();

	for(var i=0; i<10; i++){
		drawTree(treeX1[i], treeY1[i]);
	}
}

function outside2() 
{
	push();
		fill(45, 166, 119);
		rect(0, 0, 900, 600);
	pop();

	fill(125, 115, 57); //road
	rect(-5, 300, 805, 100, 5, 5, 5, 5);
	fill(207, 196, 132);
	rect(-5, 305, 800, 90, 5, 5, 5, 5);
	fill(125, 115, 57); 
	rect(400, 395, 100, 400);
	push();
		fill(207, 196, 132);
		noStroke();
		rect(405, 306, 90, 400);
	pop();

	//building shadows
	push();
	fill(0, 0, 0, 50);
	noStroke();
	triangle(10, 200, 100, 200, 100, 300);
	quad(12, 240, 46.2, 240, 10, 200, -20, 200);
	triangle(450, 200, 550, 200, 550, 300);
	quad(420, 200, 450, 200, 500, 250, 470, 250);
	pop();

	//building shadows
	push();
		fill(0, 0, 0, 50);
		noStroke();
		triangle(40, 490, 140, 490, 140, height - 18);
		triangle(480, 500, 550, 500, 550, height-20);
	pop();

	//trees
	for(var i = 0; i < 10; i++){
		drawTree(treeX2[i], treeY2[i]);
	}

	push();
		translate(550, 150); //Rec
		fill(191, 19, 36);
			for(var j = 0; j < 150; j+=5)
			{
				rect(0, j, 330, 5);
			}
		fill(189, 181, 181);//roof
		rect(-30, -30, 40, 120, 20, 0, 0, 10);
		rect(10, -30, 330, 40, 0, 10, 10, 0);
		fill(176, 242, 255);//windows
			for(var i = 20; i < 200; i+=40)
			{
				rect(i, 20, 40, 30);
			}
			for(var d = 100; d < 300; d+=40)
			{
				rect(d, 50, 40, 30);
				rect(d, 80, 40, 30);
				rect(d, 110, 40, 30);
			}
		fill(75, 81, 84); //door
		rect(25, 105, 50, 45);
		fill(141, 160, 179);
		rect(30, 110, 20, 40);
		rect(50, 110, 20, 40);
		push();
			translate(600, 120); // GYM SIGN---------------------------------------------
			scale(10);
			fill(255);
			text('GYM', 0, 0);
		pop();
	pop();

	push();
		translate(100, 200); //Ave
		fill(204, 199, 175);
		rect(0, 0, 250, 100);
		fill(19, 56, 14); //roof
		rect(-30, -30, 50, 70, 10, 0, 0, 10);
		rect(230, -30, 50, 70, 0, 10, 10, 0);
		rect(-30, -30, 310, 50, 10, 10, 0, 0);
		push();
			translate(100, -50);
			fill(75, 81, 84); //door
			rect(75, 105, 50, 45);
			fill(141, 160, 179);
			rect(80, 110, 20, 40);
			rect(100, 110, 20, 40);
			fill(237, 235, 166);
			rect(-80, 90, 135, 40);
		pop();
		push();
			noStroke();
			fill('#B11111'); // red cross
			rect(235, -25, 10, 40);
			rect(220, -10, 40, 10);
		pop();
   	pop();

   	push(); 
    	translate(550,420); //Compsci_building
    	scale(.9);
    	fill('#754F42');
    	rect(0,0,100,175);
   		rect(100,75,150,100);
   		fill(128);
  		for(var i = 120; i < 240; i+=20)
 		{
     	rect(i, 80, 20, 40);
  		}
  		for(var i = 120; i<240; i+=20)
 	 	{		
    	rect(i, 120, 20, 40);
  		}
  		for (var i = 20; i< 180; i+=10)
  		{
   		fill(0);
   		rect(0, i, 100, 2);
  		}
  		translate(-50, 25);
   		fill(75, 81, 84); //door
    	rect(75, 105, 50, 45);
    	fill(141, 160, 179);
    	rect(80, 110, 20, 40);
    	rect(100, 110, 20, 40);  
   	pop();

   	push(); //sierra madre hall
   		fill(150);
   		scale(.7);
   		translate(200, 480);
   		rect(0, 100, 250, 250);
   		line(0, 125, 250, 125);
   		line(0, 200, 250, 200);
   		line(0, 225, 250, 225);
   		line(50, 125, 50, 200);
   		line(200, 125, 200, 200);
   		line(50, 225, 50, 300);
   		line(200, 225, 200, 300);
  		fill(176, 242, 255);
  		rect(150, 125, 50, 75);
  		rect(150, 225, 50, 75);
   		stroke(255);
   		line(150, 125, 150, 200);
   		line(150, 225, 150, 300);
   		line(150, 250, 200, 250);
   		line(150, 275, 200, 275);
   		line(150, 150, 200, 150);
   		line(150, 175, 200, 175);
     	stroke(0);
     	translate(0, 200);
   		fill(75, 81, 84); //door
    	rect(75, 105, 50, 45);
    	fill(141, 160, 179);
    	rect(80, 110, 20, 40);
    	rect(100, 110, 20, 40);
   	pop();
	pop();
}

function outside3()
{
	push();
		fill(0, 0, 0, 100);
		rect(0, 0, 900, 600);
	push();
	push();
		fill(45, 166, 119); // background
		rect(0, 0, 900, 600);
	pop();

	fill(125, 115, 57);  // road
	rect(170, 0, 100, 500, 0, 0, 5, 5);
	fill(207, 196, 132);
	rect(175, 0, 90, 495, 0, 0, 5, 5);

	fill(133, 128, 106); // building
	rect(400, 100, 400, 270, 15, 15, 0, 0);
	for(var y = 100; y < 370; y+= 8)
	{
		rect(400, y, 400, 8);
	}
	fill(168, 161, 130);
	rect(375, 90, 450, 50, 10, 10, 0, 0); //roof 
	rect(400, 360, 400, 40, 0, 0, 0, 0); //bottom
	fill(122, 117, 92); //stairs
	rect(565, 335, 70, 10, 2, 2, 0, 0);
	rect(560, 345, 80, 10, 2, 2, 0, 0);
	rect(555, 355, 90, 10, 2, 2, 0, 0);
	rect(550, 365, 100, 10, 2, 2, 0, 0);
	rect(545, 375, 110, 10, 2, 2, 0, 0);
	rect(540, 385, 120, 10, 2, 2 , 0, 0);
	rect(535, 395, 130, 10, 2, 2, 0, 0);
	column(430);
	column(720);
	fill('#BCAA5D'); // door
	rect(577, 282, 46, 53);
	fill('#E0CE80'); // door
	rect(580, 285, 40, 50);
	push();
		fill('#877836');
		stroke(0);
		translate(500, 220);
		textSize(12);
		scale(3.5);
		text('Business 3', 0, 0);
	pop();

	//building shadows
	push();
	fill(0, 0, 0, 50);
	noStroke();
	triangle(270, 250, 400, 250, 400, 400);
	quad(230, 230, 400, 230, 400, 250, 250, 250);
	pop();

	//trees
	for(var i = 0; i < 5; i++){
		drawTree(treeX3[i], treeY3[i]);
	}
}

function rec()
{
	push();
		fill(0); // background
		rect(0, 0, 900, 600);
		fill(50);
		rect(200, 100, 500, 400); //floor
		fill('#262344'); // door matt
		rect(300, 470, 50, 30);
		fill('#3C3964');
		rect(305, 475, 40, 20);
		fill('#064B1E');
		rect(280, 175, 350, 250, 10, 10, 10, 10);
		fill('#076326');
		rect(290, 185, 330, 230, 10, 10, 10, 10);
		push();
			fill(255);
			translate(370, 330);
			scale(15);
			text('C', 0, 0);
		pop();
		push();
			fill('#D4B11A');
			translate(430, 390);
			scale(15);
			text('P', 0, 0);
		pop();
	pop();
}

function ave()
{
	push();
		fill(0);
		rect(0, 0, 900, 600); //black background
		fill(50);
		rect(200, 200, 500, 300); //floor
		fill('#E36767');
		rect(270, 230, 19, 20, 3, 3, 3, 3); //body
		fill('#E39D67');
		ellipse(280, 228, 20, 16); //head
		fill(0);
		ellipse(277, 229, 2, 4); //eyes
		ellipse(283, 229, 2, 4);
		fill('#8A8282');
		arc(280, 225, 18, 12, PI, 0, CHORD);
		fill(20, 50, 10); 
		rect(200, 120, 500, 80); //wall
		fill(20, 30, 10);
		rect(200, 100, 500, 20);
		fill('#262344'); // door mat
		rect(570, 470, 50, 30);
		fill('#3C3964');
		rect(575, 475, 40, 20);
		fill(100);
		rect(200, 250, 500, 30); // buy stuff
		fill(70);
		rect(200, 240, 500, 10);
		fill(60);
		rect(200, 250, 500, 7);
		fill(0);
		rect(360, 100, 20, 140); // divider
		table(260, 380);
		table(360, 380);
		table(460, 380);
		table(260, 450);
		table(360, 450);
		table(460, 450);
		push();
			noStroke();
			fill('#B11111'); // red cross
			rect(275, 140, 10, 40);
			rect(260, 155, 40, 10);
		pop();
		candle(670, 225);
		candle(410, 225);
		candle(540, 225);
		fill('#262344'); // store mat
		rect(255, 280, 50, 20);
	pop();
}
function compsci()
{
   fill('#F0EAD6');
   rect(0,0,900,600);

   for (var i=0; i<900;i+=100)
   {
      stroke(255);
      strokeWeight(3);
      line(0, i, 900, i);
      line(i, 0, i, 600);
   }

   stroke(0);
   strokeWeight(1);
   fill('#351E10'); //tables
      rect(180, 150, 720, 50);
      rect(180, 350, 720, 50);
      rect(180, 550, 720, 50);


   for (var i=200; i<900;i+=100)
   {
      fill(128); //computers
      rect(i-5, 295, 60, 60);
      fill(0);
      rect(i, 300, 50, 50);
      fill(128);
      rect(i+20, 350, 10, 10);

      rect(i-5, 495, 60, 60);
      fill(0);
      rect(i, 500, 50, 50);
      fill(128);
      rect(i+20, 550, 10, 10);

      fill(128); //computers
      rect(i-5, 95, 60, 60);
      fill(0);
      rect(i, 100, 50, 50);
      fill(128);
      rect(i+20, 150, 10, 10);

      fill('#003763');
      rect(i, 400, 50, 50);
      rect(i, 200, 50, 50);
      fill(0);
      arc(i+25, 450, 50, 50, radians(180), radians(0));
      arc(i+25, 250, 50, 50, radians(180), radians(0));
      rect(i-10, 220, 10, 30);
      rect(i-10, 420, 10, 30);
      rect(i+50, 220, 10, 30);
      rect(i+50, 420, 10, 30);
   }
 fill(200,0,0);
  rect(75, 555, 40, 40);
  fill(255, 0, 0);
  rect(80, 560, 30, 30);
}

function sierramadre()
{
   fill(150);
   rect(0,0,900,600);

   for (var i=0; i<900;i+=100)
   {
      stroke(255);
      strokeWeight(3);
      line(0, i, 900, i);
      line(i, 0, i, 600);
   }

   stroke(0);
   strokeWeight(1);
   fill('#371D10');
   rect(100, 100, 200, 100);
   fill(0,150,0);
   rect(110,110, 180, 80);

   for (var i=120; i<180; i+=10)
   {
   fill(255, 255,0);
   ellipse(160, i, 5, 5);
    }
    for (var i=130; i<170; i+=10)
    {
    fill(0,255,255);
    ellipse(170, i, 5 ,5);
    }
    for (var i=140; i<160; i+=10)
    {
    fill(255,0,0);
    ellipse(180, i, 5 ,5);
    }

    ellipse(190, 145, 5 ,5);
      fill('#371D10');
      rect(850, 100, 50, 100);
      for (var i=100;i<195;i+=5)
      {
       fill(255);
       rect(850, i, 10, 10);
      }

      for (var i=105;i<190;i+=5)
      {
        stroke(200);
       fill(0);
       rect(854, i, 5, 5);
      }
      stroke(255);
      fill(0,0,255);
      rect(100, 300, 200,50);
      rect(100, 350, 200,50);
      rect(100, 450, 200,50);
      rect(100, 500, 200,50);
      stroke(0);
      strokeWeight(5);
      line(200, 300, 200, 400);
      line(200, 450, 200, 550);
    strokeWeight(1);
    rect(550, 475, 300, 50);



      for (var i=525;i<900;i+=75)
      {

        fill('#371D10');
     rect(i, 550, 50, 50);
      arc(i+25, 600, 50, 50, radians(180), radians(0));
      rect(i-10, 570, 10, 30);
      rect(i+50, 570, 10, 30);

        rect(i, 400, 50, 50);
      arc(i+25, 400, 50, 50, radians(0), radians(180));
      rect(i-10, 420, 10, 30);
      rect(i+50, 420, 10, 30);

      }

      for (var i=0;i<600;i+=20)
    {
    fill(255);
    rect(i, 225, 10, 50);
    }
    fill('#371D10');
    rect(0, 220, 600, 5);
    rect(0, 270, 600, 5);
    rect(600, 220, 5, 55);

    fill(0); //mat
    rect(400, 590, 100, 10);
}

function finBuilding()
{
	push();
		fill(0); // background
		rect(0, 0, 900, 600);
	pop();

	fill('#1D1F1D'); //platform
	rect(150, 80, 600, 440);
	fill(0); // holes
	rect(160, 90, 220, 420);
	rect(520, 90, 220, 420);
	fill('#DED481');
	rect(415, 180, 70, 330);
	fill('#6A0A0A');
	rect(420, 185, 60, 320);
	push();
		fill(200, random(190, 210), 0, 30);
		noStroke();
		ellipse(635, 190, 150); //right side light
		ellipse(635, 190, 100);
		ellipse(635, 400, 150);
		ellipse(635, 400, 100);
		ellipse(265, 190, 150); //left side
		ellipse(265, 190, 100);
		ellipse(265, 400, 150);
		ellipse(265, 400, 100);
	pop();

	fill('#262344'); // mat
	rect(390, 90, 120, 80);
	fill('#3C3964');
	rect(395, 95, 110, 70);
	push();
		fill('#AAB0C1');
		textSize(12);
		text('ENTER', 430, 135);
	pop();
}

function finScene()
{
	fill(255);
	rect(0, 0, 900, 600);
	fill(50);
	rect(420, 150, 60, 200);
	fill(70);
	rect(425, 150, 50, 200);
	fill(255, 0, 0);
	fill('#262344'); // bottom mat
	rect(390, 290, 120, 80);
	fill('#3C3964');
	rect(395, 295, 110, 70);

	fill(77, 11, 12); // top mat
	rect(390, 90, 120, 80);
	fill(148, 18, 20);
	rect(395, 95, 110, 70);

	push();
		translate(450, 120); // THE CHAMPION
		scale(1.3);
		// Foward facing
		fill(0);
		rect(-5, 13, 4, 4, 1, 1, 1, 1);//leg 
		rect(0, 13, 4, 4, 1, 1, 1, 1);//leg 
		fill(155, 112, 186); // BODY
		rect(-5, 4, 9, 10, 1, 1, 1, 1); //body
		fill(200);
		rect(-7, 6, 2, 5, 1, 1, 1, 1);//arm
		rect(4, 6, 2, 5, 1, 1, 1, 1);//arm
		fill(255, 204, 133); // HEAD
		ellipse(0, 0, 16, 13); //head
		fill(0);
		ellipse(-2, 1, 1, 3); //eyes
		ellipse(2, 1, 1, 3);
		fill(220);
		arc(0, -2, 15, 10, PI, 0, CHORD);//hair
	pop();
}

function characterFront(x, y)
{
	stroke(0);
	strokeWeight(1);
	legLength1 = 4;
	legLength2 = 4;
	leg1Down = true;
	leg2Down = false;
	translate(x, y);
	scale(1.3);
	// Foward facing
	fill(0);
	rect(-5, 13, 4, legLength1, 1, 1, 1, 1);//leg 
	rect(0, 13, 4, legLength2, 1, 1, 1, 1);//leg 
	fill(10, 87, 21); // BODY
	rect(-5, 4, 9, 10, 1, 1, 1, 1); //body
	fill(242, 231, 15);
	rect(-7, 6, 2, 5, 1, 1, 1, 1);//arm
	rect(4, 6, 2, 5, 1, 1, 1, 1);//arm
	fill(255, 204, 133); // HEAD
	ellipse(0, 0, 16, 13); //head
	fill(0);
	ellipse(-2, 1, 1, 3); //eyes
	ellipse(2, 1, 1, 3);
	fill(220);
	arc(0, -2, 15, 10, PI, 0, CHORD);//hair
	triangle(-4, -3, 0, -10, 4, -3);
	triangle(0, -2, -7, -10, -7, -2);
	triangle(0, -2, 7, -10, 7, -2);
	rect(-7, -4, 13, 1, 10, 0, 0, 10);//hair band
	push();
		fill(255);
		scale(.5);
		textSize(12);
		text('C', -7, 22); // Text on shirt
		text('P', -1, 27);
	pop();


	if(outdoorScreen||outdoorScreen2||outdoorScreen3){
		push();
		translate(-9, 10);
		rotate(PI/4);
		fill(0, 0, 0, 50);
		noStroke();
		ellipse(0, 0, 20, 10); //shadow
		pop();
	}
}

function characterBack(x, y)
{
	stroke(0);
	strokeWeight(1);	
	translate(x, y);
	scale(1.3);
	// Foward facing
	fill(0);
	rect(-5, 13, 4, 4, 1, 1, 1, 1);//leg 
	rect(0, 13, 4, 4, 1, 1, 1, 1);//leg 
	fill(10, 87, 21); // BODY
	rect(-5, 4, 9, 10, 1, 1, 1, 1); //body
	fill(242, 231, 15);
	rect(-7, 6, 2, 5, 1, 1, 1, 1);//arm
	rect(4, 6, 2, 5, 1, 1, 1, 1);//arm
	fill(255, 204, 133); // HEAD
	ellipse(0, 0, 16, 13); //head
	fill(220);
	arc(0, -2, 15, 10, PI, 0, CHORD);//hair
	triangle(-4, -3, 0, -10, 4, -3);
	triangle(0, -2, -7, -10, -7, -2);
	triangle(0, -2, 7, -10, 7, -2);
	rect(-7, -4, 13, 1, 10, 0, 0, 10);//hair band
	fill(77, 62, 44);
	ellipse(0, 10, 8, 7); //backpack
	push();
		fill(0);
		strokeWeight(2);
		line(-4, 10, 3, 10);
	pop();

	if(outdoorScreen||outdoorScreen2||outdoorScreen3){
		push();
		translate(-9, 10);
		rotate(PI/4);
		fill(0, 0, 0, 50);
		noStroke();
		ellipse(0, 0, 20, 10); //shadow
		pop();
	}
}

function characterRight(x, y)
{
	stroke(0);
	strokeWeight(1);
	translate(x, y);
	scale(1.3);
	// Foward facing
	fill(0);
	rect(-4, 13, 5, 4, 1, 1, 1, 1);//leg 
	fill(10, 87, 21); // BODY
	rect(-5, 4, 7, 10, 1, 1, 1, 1); //body
	fill(242, 231, 15);
	rect(-5, 6, 4, 6, 1, 1, 1, 1);//arm
	fill(255, 204, 133); // HEAD
	ellipse(-1, 1, 12, 13); //head
	fill(0);
	ellipse(2, 1, 1, 3);
	fill(220);
	arc(-1, -2, 10, 8, PI, 0, CHORD);//hair
	triangle(-5, -3, -1, -10, 3, -3);
	rect(-6, -4, 9, 1, 10, 0, 0, 10);//hair band

	if(outdoorScreen||outdoorScreen2||outdoorScreen3){
		push();
		translate(-9, 10);
		rotate(PI/4);
		fill(0, 0, 0, 50);
		noStroke();
		ellipse(0, 0, 20, 10); //shadow
		pop();
	}
}

function characterLeft(x, y)
{
	stroke(0);
	strokeWeight(1);
	translate(x, y);
	scale(1.3);
	// Foward facing
	fill(0);
	rect(-4, 13, 5, 4, 1, 1, 1, 1);//leg 
	fill(10, 87, 21); // BODY
	rect(-5, 4, 7, 10, 1, 1, 1, 1); //body
	fill(242, 231, 15);
	rect(-2, 6, 4, 6, 1, 1, 1, 1);//arm
	fill(255, 204, 133); // HEAD
	ellipse(-1, 1, 12, 13); //head
	fill(0);
	ellipse(-4, 1, 1, 3); // eye
	fill(220);
	arc(-1, -2, 10, 8, PI, 0, CHORD);//hair
	triangle(-5, -3, -1, -10, 3, -3);
	rect(-6, -4, 9, 1, 10, 0, 0, 10);//hair band

	if(outdoorScreen||outdoorScreen2||outdoorScreen3){
		push();
		translate(-9, 10);
		rotate(PI/4);
		fill(0, 0, 0, 50);
		noStroke();
		ellipse(0, 0, 20, 10); //shadow
		pop();
	}
}

function signText1()
{
	push();
	rect(825, 235, 70, 40);
		push()
			// noFill();
			fill(125, 115, 75);
			strokeWeight(1);
			strokeJoin(ROUND);
			beginShape();
			vertex(845, 275);
			vertex(860, 282);
			vertex(875, 275);
			endShape();
		pop();
	fill(0);
	text(' To Campus', 827, 260);
	stroke(125, 115, 57);
	line(847, 275, 872, 275);
	pop();
}

function noGOzone(leftX,rightX,topY,bottomY)
{
	if(y < bottomY && y > bottomY-10 && x > leftX && x < rightX)
	{
		y = bottomY;
	}
	if(y < topY+10 && y > topY && x > leftX && x < rightX)
	{
		y = topY;
	}
	if(y < bottomY && y > topY && x > rightX-10 && x < rightX)
	{
		x = rightX;
	}
	if(y < bottomY && y > topY && x > leftX && x < leftX+10)
	{
		x = leftX;
	}
}

function table(x, y)
{
	push();
		translate(x, y); // tables for food
		for(var i = 0; i < 30; i+=3)
		{
			fill('#765006');
			rect(i, 0, 3, 25);
		}
		fill('#896832');
		rect(0, -10, 30, 10);
	pop();
}

function column(xStart, s)
{
	for(var i = xStart; i < xStart+50; i+=10)
	{
		rect(i, 150, 10, 250);
	}
	rect(xStart - 5, 145, 60, 10);
	rect(xStart - 10, 140, 70, 10);
	rect(xStart - 5, 385, 60, 10);
	rect(xStart - 10, 390, 70, 10);	
}

function candle(x, y)
{

	fill(240);
	rect(x-3, y+7, 5, 13, 10, 10, 1, 1);
	fill(87, 61, 0);
	rect(x-7, y+19, 13, 5, 3, 3, 3, 3);
	push();
		fill(200, 170, 60, random(50, 100));
		noStroke();
		ellipse(x, y, 30);
		ellipse(x, y, 20);
		fill(255, random(120, 140), 51, random(100, 200));
		ellipse(x+(random(-.5, .5)), y + 2, 5, 8);
	pop();
}

function startScreen()
{
	push();
		// Gradient Background
		noStroke();
		for(var j = 0; j < 600; j++) {
			let fade = lerpColor(color1, color2, 0+((1/700)*j));
			fill(fade);
			rect(0, j, 900, 1);
		}
	pop();
	// Start button 
	push();
		strokeWeight(1.5);
		fill('#1A7C04');
		rect(355, 348, 185, 70, 10, 10, 10, 10);
		fill(color3);
		rect(360, 353, 175, 60, 10, 10, 10, 10);
	pop();
	push();
		fill(0);
		translate(370, 400);
		scale(4);
			text('START', 0, 0);
	pop();
	// Title
	push();
		stroke(1);
		fill(255);
		translate(100, 150);
		scale(12);
		text('POLYMON', 0, 0);
	pop();
	push();
		stroke(5);
		translate(280, 225);
		scale(5);
		stroke('#BFAD08');
		fill('#259C08');
		text('Green', 0, 0);
		stroke(0);
		fill(255);
		text('&', 35, 0);
		stroke('#067D06');
		fill('#D0C98B');
		text('Gold', 45, 0);
	pop();
	// Pokeball
	push();
		fill(240); // green one
		strokeWeight(6);
		ellipse(170, 380, 200);
		fill(11, 133, 25);
		arc(170, 380, 200, 200, PI, 0, CHORD);
		fill(180);
		ellipse(170, 380, 50);
		push();
			fill(220);
			strokeWeight(3);
			ellipse(170, 380, 30);
		pop();

		fill(240); // gold one
		strokeWeight(6);
		ellipse(730, 380, 200);
		fill(196, 187, 18);
		arc(730, 380, 200, 200, PI, 0, CHORD);
		fill(180);
		ellipse(730, 380, 50);
		push();
			fill(220);
			strokeWeight(3);
			ellipse(730, 380, 30);
		pop();
	pop();
	// Credits
	push();
		fill(255);
		translate(300, 570);
		scale(1.2);
		strokeWeight(5);
		stroke(0);
		textStyle(ITALIC);
		text('By: Erik Luu and Carlo Ruggiero', 0, 0);
	pop();
}

function ohno() // if you lost
{
		myHealth = 180;
		myBar = 180;
		enemyHealth = 180;
		bar = 180;
		codeDam = 40;

		x = 250;
		y = 200;

		push();
			fill(0);
			rect(0, 0, 900, 600);
			push();
				fill(255);
				textSize(100);
				text('You Lost...', 250, 150);
			pop();
			push();
			// Start button 
				push();
				strokeWeight(1.5);
				fill('#1A7C04');
				rect(355, 348, 185, 70, 10, 10, 10, 10);
				fill(color3);
				rect(360, 353, 175, 60, 10, 10, 10, 10);
			pop();
			push();
				fill(0);
				translate(370, 400);
				textSize(35)
				text('Try Again', 4, -5);
			pop();
		pop();
}
/*
++++++++++++++++++++++++++++++++++++++++++++++++++
--------------------------------------------------
**************************************************
Battle Code ------------------------------
**************************************************
--------------------------------------------------
++++++++++++++++++++++++++++++++++++++++++++++++++
*/

function enemyMove()
{
	var rand = random(30);
	if(rand <= 10)
	{
		eMove1 = true;
		AnimationEnMove2 = new PSys(604,181,240,255,240,255,240,255,-1.8,-2.2,.4,.6,20,20);
	} 
	if(rand > 10 && rand <= 20)
	{
		eMove2 = true;
		opac = 0;
	}
	if(rand > 20)
	{
		eMove3 = true;
		AnimationEnMove3 = new PSys(215,325,50,200,0,20,0,20,-1,1,-1,1,8,50);
		if(codeDam > 15)
			codeDam -= 10;
	}
	eDialogue = true;
}

function battleMe(attack1,attack2,attack3,attack4)
{
	fill(130);
	rect(10,460,550,130,20);
	rect(570,460,320,130,20);
	fill(240);
	rect(20,470,530,110,5);
	rect(580,470,300,110,5);
	textSize(35);
	fill(30);
	text(attack1,50,515);
	text(attack2,300,515);
	text(attack3,50,557);
	text(attack4,300,557);

	text('Press shift',640,515);
	text('to go back',640,557);

	push();
		fill(30);
		translate(xT,yT);
		triangle(0,0,15,15,0,30);
	pop();
}

function battleSetup(name)
{
	let color1 = color(125);
	let color2 = color(236);
	noStroke(); //background gradient
	for (let i = 0; i < 600; i++) {
		let colorFin = lerpColor(color1,color2,0+((1/500)*i));
		fill(colorFin);
		rect(0,i,width,1);
	}
	statBar(510,350,name,myBar);
	statBar(50,30,eName,bar);

	drawStudent();
	drawProf();

	fill(50); //text background
	rect(0,450,width,150);
}

function statBar(x,y,name,hp)
{
	push();
		translate(x,y);
		stroke(30);//player's stats
		strokeWeight(5);
		fill(247,242,210);
		rect(0,0,330,80,20,3,20,3);
		noStroke();	
		fill(30);
		textSize(30);
		text(name,20,33); 	
		text('Lv50',245,33);
		rect(80,43,232,25,20)	
		fill(240);

		rect(125,45,184,21,20)	
		fill(0,255,0);//green bar
		rect(127,47,hp,17,20);
		fill(224,181,79); //HP letters
		rect(91,46,5,19);
		rect(101,46,5,19);
		rect(92,52,10,4);
		rect(109,46,5,19);
		rect(110,52,12,4);
		rect(110,46,12,4);
		rect(119,46,3,6);
	pop();
}

function EhealthBar()
{
	fill(0,255,0);//green bar
	rect(177,77,bar,17,20);
	bar--;
}

function myHealthBar()
{
	fill(0,255,0);//green bar
	rect(637,397,myBar,17,20);
	myBar--;
}

function dialogueBox(text1,text2)
{
	fill(184,153,77);
	rect(10,460,width-20,130,20);
	fill(240);
	rect(20,470,width-40,110,2);
	fill(18,74,102);
	rect(25,475,width-50,100,2);
	fill(240);
	textSize(35);
	text(text1,40,515);
	text(text2,40,557);
}

function startingBox(name)
{
	fill(184,153,77);
	rect(10,460,width-20,130,20);
	fill(240);
	rect(20,470,width-40,110,2);
	fill(18,74,102);
	rect(25,475,width-50,100,2);
	fill(240);
	textSize(35);
	text('What  will',40,515);
	text(name + '  do?',40,557);

	fill(50);
	rect(width/2,450,width/2,150);
	fill(130);
	rect(460,460,430,130,20);
	fill(240);
	rect(470,470,410,110,5);

	fill(30);
	text('ACTION',500,515);
	text('DROP OUT',500,557);
	text('BAG',730,515);
	text('RUN',730,557);
	push();
		fill(30);
		translate(xT,yT);
		triangle(0,0,15,15,0,30);
	pop();
}

function runBox(message)
{
	fill(184,153,77);
	rect(10,460,width-20,130,20);
	fill(240);
	rect(20,470,width-40,110,2);
	fill(18,74,102);
	rect(25,475,width-50,100,2);
	fill(240);
	text(message,40,515);
}

function attack(damage)
{
	enemyHealth -= damage;
	if(enemyHealth < 0)
		enemyHealth = 0;
}

function defense(damage)
{
	myHealth -= damage;
	if(myHealth < 0)
		myHealth = 0;
}

function keyPressed()
{
	if(battleMenu) {
		if (keyCode === LEFT_ARROW)
    		xT = 30;
  		if (keyCode === RIGHT_ARROW)
    		xT = 280;
 		if (keyCode === UP_ARROW)
    		yT = 486;
 		if (keyCode === DOWN_ARROW)
    		yT = 528;
    	if(keyCode === ENTER && xT == 30 && yT == 486){
   			dialogue = true;
   			moveslot1 = true;
   			move1 = new PSys(673,159,0,255,0,255,0,255,-2,2,-2,2,8,50);
   			battleMenu = false;
   			xT = 480;
			yT = 486;
    	}
    	if(keyCode === ENTER && xT == 30 && yT == 528){
   			dialogue = true;
   			moveslot3 = true;
   			move3 = new PSys(215,325,0,20,0,20,50,200,-1,1,-1,1,8,50);
   			codeDam += 10;
   			battleMenu = false;
   			xT = 480;
			yT = 486;    		
    	}
    	if(keyCode === ENTER && xT == 280 && yT == 486){
   			dialogue = true;
   			moveslot2 = true;
   			battleMenu = false;
   			xT = 480;
			yT = 486;    		
    	}
    	if(keyCode === ENTER && xT == 280 && yT == 528){
   			dialogue = true;
   			moveslot4 = true;
   			battleMenu = false;
   			xT = 480;
			yT = 486;    		
    	}
    	if(keyCode === SHIFT){
			xT = 480;
			yT = 486;
    		battleMenu = false;
    		firstMenu = true;
    	}
	}
	if(firstMenu) {
		if (keyCode === LEFT_ARROW)
    		xT = 480;
  		if (keyCode === RIGHT_ARROW)
    		xT = 710;
 		if (keyCode === UP_ARROW)
    		yT = 486;
 		if (keyCode === DOWN_ARROW)
    		yT = 528;
    	// Fight
		if(xT == 480 && yT == 486) {
			if(keyCode === ENTER){
				xT = 30;
				yT = 486;
				firstMenu = false;
				battleMenu = true;
			}
		}
		// Run
		if(xT == 710 && yT == 528) {
			if(keyCode === ENTER) {
				firstMenu = false;
				runMenu = true;
			}
		}
		if(xT == 710 && yT == 486) { //bag
			if(keyCode === ENTER) {
				firstMenu = false;
				bagMenu = true;
			}
		}
		if(xT == 480 && yT == 528) { //dropout
			if(keyCode === ENTER) {
				startBattle = false;
				firstMenu = false;
				x = 650;
				y = 400;
				worldView = true;
				outdoorScreen3 = true;
				enemyHealth = 180;
				bar = 180;
				codeDam = 40;
			}
		}
	}
	if(runMenu) {
		if(keyCode === SHIFT) {
			firstMenu = true;
			runMenu = false;
		}
	}
	if(bagMenu) {
		if(keyCode === SHIFT) {
			firstMenu = true;
			bagMenu = false;
		}
	}
}

function Particle(x,y,r1,r2,g1,g2,b1,b2,x1,x2,y1,y2,r)
{
   this.accelY = 0.00;
   this.velX = random(x1,x2);
   this.velY = random(y1,y2);


   this.pcolorR = random(r1,r2);
   this.pcolorG = random(g1,g2);
   this.pcolorB = random(b1,b2)
   this.locX = x;
   this.locY = y;
   this.r = r;
   this.life = 255;
  
   this.updateP = function()
   {
      this.velY += this.accelY;
      this.locX += this.velX;
      this.locY += this.velY;
      this.life -= 4;
   };
  
   this.renderP = function() 
   {
      noStroke();
      push();
         fill(this.pcolorR,this.pcolorG,this.pcolorB,this.life);
         translate(this.locX, this.locY);
         ellipse(0, 0, this.r, this.r);
      pop();
   };
}

function PSys(sX,sY,r1,r2,g1,g2,b1,b2,x1,x2,y1,y2,r,num)
{
   this.particles = [];
   for (var i=0; i < num; i++) 
   {
      this.particles.push(new Particle(sX,sY,r1,r2,g1,g2,b1,b2,x1,x2,y1,y2,r));
   }
  
   this.run = function() 
   {
      for (var i=0; i < this.particles.length; i++) 
      {
         this.particles[i].updateP();
         this.particles[i].renderP();
      }
   }
}

function drawStudent()
{
	push();
	translate(160, 320);
	scale(1.5);
	
	fill(0); //hair
	triangle(5, -10, 22, 25, 35, -10);
	fill(0, 150,0);
	rotate(-PI/6);
	rect(17, 5, 30, 20);
	rotate(PI/6);
	fill(255);
	beginShape();
	vertex(0,0);
	vertex(10,-20);
	vertex(8, -30);
	vertex(15, -25);
	vertex(35, -30);
	vertex(45, -20);
	vertex(42, -10);
	vertex(35, -5);
	vertex(25, 10);
	vertex(15, -5);
	vertex(5, 10);
	vertex(0,0);
	endShape();
	fill('#FFE1CA'); //face
	beginShape();
	vertex(53, 0);
	vertex(53, 10);
	vertex(56,13);
	vertex(53, 25);
	vertex(20, 25);
	vertex(23, 15);
	vertex(53,0);
	endShape();
	arc(30, 15, 5, 7, radians(90), radians(0));

	noStroke(); //eyes
	fill(255);
	rect(47, 3,5,10,10);
	fill(0);
	rect(49, 4,3,8,10);
	strokeWeight(1);

	fill(240);
	rect(44,0,10,5,10);	

	fill(0, 100, 0);//left arm
	quad(20, 25, 25, 35, 48, 35, 53, 25);
	rotate(PI/4);
	rect(35, 0, 15, 40);
	fill('#FFE1CA');
	rotate(-PI/10);
	rect(20, 51, 12, 40);
	rotate(-3*PI/20);
	fill(0,100,0);
	rect(20, 30, 30, 13);

	//right arm
	rotate(-PI/4);
	rect(0, 50, 15, 40);
	fill('#FFE1CA');
	rotate(PI/10);
	rect(30, 83, 12, 40);
	rotate(3*PI/20);

	fill(0, 100, 0); //body
	rect(16,50,40,40);

	fill(101, 67 ,33);//backpack
	ellipse(35, 60, 40, 40);
	stroke(101,67,33);
	strokeWeight(5);
	line(45, 40, 50, 30);
	line(35, 40, 28, 28);

	pop();
}

function drawProf()
{
	push();
		translate(660,60)
		scale(1.7);
		fill(30);
		ellipse(11,131,120,50);
		fill(145, 142, 83);
  		beginShape(); //hair
  			curveVertex(0, 0);
  			curveVertex(0,0);
  			curveVertex(-15, 5);
  			curveVertex(-18,13);
  			curveVertex(0, 25);
  			curveVertex(20, 5);
  			curveVertex(10, 2.5);
  			curveVertex(0,0);
  		endShape();
  		ellipse(20, 15, 10, 25);

  		fill('#FFE1CA'); //face
  		beginShape();
  			vertex(-5, 8);
  			vertex(-9,11);
  			vertex(-11,14);
  			vertex(-11.5,28);
  			vertex(-10,33);
  			vertex(-8,35);
  			vertex(-2, 37);
  			vertex(5,38);
  			vertex(18, 36);
  			vertex(21,32);
  			vertex(22, 25);
  			vertex(22,13);
  			vertex(15, 9);
  		endShape();
  		ellipse(22.5,22,4,8);
  		rect(0,30,15,15);
		fill(145, 142, 83);
		quad(-2,8,-3,11,1,9,10,7);

  		//eyes
  		fill(255);
  		rect(-5.5, 17, 5, 7,10);
  		rect(8,17, 5, 7,10);
  		fill(0);
  		rect(-4, 18.5, 3, 5,10);
  		rect(8.5, 18.5, 3, 5,10);

  		stroke(145, 112, 87); //mouth
  		strokeWeight(2);
  		line(2,33,7,32.5)
  		line(7,32.5,13,31)

  		line(-6,17,-1,17.5); //eyebrows
  		line(14,17,9,17.5);

  		strokeWeight(1)//nose	
  		line(3,22,2.3,26);	

  		//body
  		noStroke();
		fill(123, 150, 90); //pants
		quad(-5,70,-5,130,7,130,10,90);
		quad(9,90,16,131,27,131,25,70);
		rect(-2,70,20,20);
		fill(155, 112, 186);
		rect(-3,39,21,40,4,4,0,0); 		
		fill(20);
		rect(-4,79,22,3);		
		fill(240);
		quad(-2.5,41,-3,100,-17,99,-16,45);
		quad(17.5,41,18,99,33,98,32,46);
		quad(32,46,40,78,38,84,31,86);
		quad(-16,45,-23,68,-23,76,-15,73);
		rect(-30,68,8,7.8);
  		fill('#FFE1CA'); //hands
  		ellipse(-32,71,11,7);
  		fill(145, 112, 87); //shoes
  		ellipse(0,131,14,8);
  		ellipse(23,131.5,14,8);
  	pop();
}

function homework(x,y,s,o)
{
	push();
		translate(x,y);
		scale(s);
		fill(255,o);
		rect(0,0,80,110,5);
		stroke(0,o);
		strokeWeight(1);
		line(10,15,70,15);
		line(10,25,70,25);
		line(10,35,70,35);
		line(10,45,70,45);
		line(10,55,70,55);
		line(10,65,70,65);
		line(10,75,70,75);
		line(10,85,70,85);
		line(10,95,70,95);
		noStroke();
		push();
			translate(60,40);
			rotate(-PI/8);
			textSize(30);
			fill(200,30,30,o);
			stroke(200,30,30,o);
			strokeWeight(4);
			text('F',0,0);
		pop();
	pop();
}


function drawTree(x, y)
{

	//shadow of tree
	push();
		translate(x-4, y-12);
		fill(0, 0, 0, 50);
		noStroke();
		// quad();
		quad(-28, 10, 14, 10, -5, -3, -28, -3);
		quad(-35, -3, 7, -3, -15, -15, -35, -15);
		triangle(-45, -15, 0, -15, -55, -55);
		quad(0, 18, 10, 18, 0, 10, -10, 10);
	pop();
	
	push();
		translate(x, y);
		// strokeWeight(1);
		// stroke(15, 98, 54);
		// strokeJoin(ROUND);
		fill('#574603');
		rect(-4, 0, 8, 5);
		fill(15, 98, 54);
		triangle(-16, 0, 16, 0, 0, -20);
		triangle(-16, -7, 16, -7, 0, -30);
		triangle(-16, -18, 16, -18, 0, -41);
	pop();
}





