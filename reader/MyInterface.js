/**
 * MyInterface
 * @constructor
 */
 
 
function MyInterface() {
	//call CGFinterface constructor 
	CGFinterface.call(this);
};

MyInterface.prototype = Object.create(CGFinterface.prototype);
MyInterface.prototype.constructor = MyInterface;

/**
 * init
 * @param {CGFapplication} application
 */
MyInterface.prototype.init = function(application) {
	// call CGFinterface init
	CGFinterface.prototype.init.call(this, application);
	
	// init GUI. For more information on the methods, check:
	//  http://workshop.chromeexperiments.com/examples/gui
	
	this.gui = new dat.GUI();

	// add a button:
	// the first parameter is the object that is being controlled (in this case the scene)
	// the identifier 'doSomething' must be a function declared as part of that object (i.e. a member of the scene class)
	// e.g. LightingScene.prototype.doSomething = function () { console.log("Doing something..."); }; 

	//this.gui.add(this.scene, 'commands');	

	// add a group of controls (and open/expand by default)
	
	var lights=this.gui.addFolder("Lights");
	lights.open();
	lights.add(this.scene,"a");
	// add two check boxes to the group. The identifiers must be members variables of the scene initialized in scene.init as boolean
	// e.g. this.option1=true; this.option2=false;
	
	console.log(this.scene.nodes);
	
	// add a slider
	// must be a numeric variable of the scene, initialized in scene.init e.g.
	 this.speed=3;
	// min and max values can be specified as parameters
	
	this.gui.add(this.scene, 'speed', -3, 3);
	
/*	this.gui.add(this.scene, 'selectedExampleShader', {
			'Flat Shading': 0, 
			'Passing a scale as uniform': 1, 
			'Passing a varying parameter from VS -> FS': 2, 
			'Simple texturing': 3, 
			'Multiple textures in the FS': 4, 
			'Multiple textures in VS and FS': 5 
	}).name('Shader examples');
*/
	//this.gui.add(this.scene, 'Clock');
	//this.gui.add(this.scene, 'currRobotAppearance', this.scene.robotAppearanceList);

	return true;
};

/**
 * processKeyboard
 * @param event {Event}
 */
MyInterface.prototype.processKeyboard = function(event) {
	// call CGFinterface default code (omit if you want to override)
	CGFinterface.prototype.processKeyboard.call(this,event);
	
	// Check key codes e.g. here: http://www.asciitable.com/
	// or use String.fromCharCode(event.keyCode) to compare chars
	
	// for better cross-browser support, you may also check suggestions on using event.which in http://www.w3schools.com/jsref/event_key_keycode.asp
	switch (event.keyCode){
		
		case (97):
		case (65):
			console.log("Key 'A' pressed");
			this.scene.robot.rotate(1);
			break;
			
		case (83):
		case (115):
			console.log("Key 'S' pressed");
			this.scene.robot.move(-1);
			break;

		case (68):
		case (100):
			console.log("Key 'D' pressed");
			this.scene.robot.rotate(-1);
			break;

		case (87):
			console.log("Key 'W' pressed");
			this.scene.robot.move(1);
			break;
		case (72):
		case (104):
			console.log("Key 'H' pressed");
			this.scene.robot.wave();
			break;
	};
};

