function MySceneGraph(filename, scene) {
	this.loadedOk = null;

	// Establish bidirectional references between scene and graph
	this.scene = scene;
	scene.graph = this;


	// File reading 
	this.reader = new CGFXMLreader();

	/*
	 * Read the contents of the xml file, and refer to this class for loading and error handlers.
	 * After the file is read, the reader calls onXMLReady on this object.
	 * If any error occurs, the reader calls onXMLError on this object, with an error message
	 */

	this.reader.open('scenes/' + filename, this);
}
var MyPos = function() {
	this.x;
	this.y;
	this.z;
	this.w;
};

var MyRGB = function() {
	this.r = null;
	this.g = null;
	this.b = null;
	this.a = null;
};

var MyLights = function() {
	this.id;
	this.enable;
	this.pos = new MyPos();
	this.amb = new MyRGB();
	this.dif = new MyRGB();
	this.spec = new MyRGB();
};

var MyTexture = function(){
	this.path;
	this.x;
	this.y;
}

/*
 * Callback to be executed after successful reading
 */
MySceneGraph.prototype.onXMLReady = function() {
	console.log("XML Loading finished.");
	var rootElement = this.reader.xmlDoc.documentElement;

	// Here should go the calls for different functions to parse the various blocks
	var error = this.parseGlobalsExample(rootElement);
	error = this.parseInitials(rootElement);
	error = this.parseIllumination(rootElement);
	error = this.parseLights(rootElement);
	//error = this.perserTextures(rootElement);

	if (error != null) {
		this.onXMLError(error);
		return;
	}

	this.loadedOk = true;

	// As the graph loaded ok, signal the scene so that any additional initialization depending on the graph can take place
	this.scene.onGraphLoaded();
};



/*
 * Example of method that parses elements of one block and stores information in a specific data structure
 */
MySceneGraph.prototype.parseGlobalsExample = function(rootElement) {

	var elems = rootElement.getElementsByTagName('globals');
	if (elems == null) {
		return "globals element is missing.";
	}

	if (elems.length != 1) {
		return "either zero or more than one 'globals' element found.";
	}

	// various examples of different types of access
	var globals = elems[0];
	this.background = this.reader.getRGBA(globals, 'background');
	this.drawmode = this.reader.getItem(globals, 'drawmode', ["fill", "line", "point"]);
	this.cullface = this.reader.getItem(globals, 'cullface', ["back", "front", "none", "frontandback"]);
	this.cullorder = this.reader.getItem(globals, 'cullorder', ["ccw", "cw"]);

	console.log("Globals read from file: {background=" + this.background + ", drawmode=" + this.drawmode + ", cullface=" + this.cullface + ", cullorder=" + this.cullorder + "}");

	var tempList = rootElement.getElementsByTagName('list');

	if (tempList == null || tempList.length == 0) {
		return "list element is missing.";
	}

	this.list = [];
	// iterate over every element
	var nnodes = tempList[0].children.length;
	for (var i = 0; i < nnodes; i++) {
		var e = tempList[0].children[i];

		// process each element and store its information
		this.list[e.id] = e.attributes.getNamedItem("coords").value;
		console.log("Read list item id " + e.id + " with value " + this.list[e.id]);
	};
};

MySceneGraph.prototype.parseInitials = function(rootElement) {
	var tempIni = rootElement.getElementsByTagName('INITIALS');

	if (tempIni.length != 1) {
		return "either zero or more than one 'initials' element found.";
	}

	//this.list=[];
	var frustum = tempIni[0].children[0];
	this.frustum_near = this.reader.getFloat(frustum, 'near', true);
	this.frustum_far = this.reader.getFloat(frustum, 'far', true);
	console.log("Initials read from file: {Frustum: near=" + this.frustum_near + ", far=" + this.frustum_far + "}");

	var translate = tempIni[0].children[1];
	this.translate_x = this.reader.getFloat(translate, 'x', true);
	this.translate_y = this.reader.getFloat(translate, 'y', true);
	this.translate_z = this.reader.getFloat(translate, 'z', true);
	console.log("Initials read from file: {translate: x=" + this.translate_x + ", y=" + this.translate_y + ", z=" + this.translate_z + " }");

	//TODO: axis can only accpet x y or z
	var rotation1 = tempIni[0].children[2];
	this.rot1_axis = this.reader.getString(rotation1, 'axis', true);
	this.rot1_angle = this.reader.getFloat(rotation1, 'angle', true);
	console.log("Initials read from file: {rotation1: axis=" + this.rot1_axis + ", angle=" + this.rot1_angle + " }");

	var rotation2 = tempIni[0].children[3];
	this.rot2_axis = this.reader.getString(rotation2, 'axis', true);
	this.rot2_angle = this.reader.getFloat(rotation2, 'angle', true);
	console.log("Initials read from file: {rotation2: axis=" + this.rot2_axis + ", angle=" + this.rot2_angle + " }");

	var rotation3 = tempIni[0].children[4];
	this.rot3_axis = this.reader.getString(rotation3, 'axis', true);
	this.rot3_angle = this.reader.getFloat(rotation3, 'angle', true);
	console.log("Initials read from file: {rotation3: axis=" + this.rot3_axis + ", angle=" + this.rot3_angle + " }");

	var scale = tempIni[0].children[5];
	this.scale_sx = this.reader.getFloat(scale, 'sx', true);
	this.scale_sy = this.reader.getFloat(scale, 'sy', true);
	this.scale_sz = this.reader.getFloat(scale, 'sz', true);
	console.log("Initials read from file: {scale: sx=" + this.scale_sx + ", sy=" + this.scale_sy + ", sz=" + this.scale_sz + " }");

	var reference = tempIni[0].children[6];
	this.ref_length = this.reader.getFloat(reference, 'length', true);
	console.log("Initials read from file: {reference: length=" + this.ref_length + "}");

};

MySceneGraph.prototype.parseIllumination = function(rootElement) {
	var tempIl = rootElement.getElementsByTagName('ILLUMINATION');


	if (tempIl.length != 1)
		return "either zero or more than one 'illumination' element found.";

	var ambient = tempIl[0].children[0];
	this.ilu_ambient_r = this.reader.getFloat(ambient, 'r', true);
	this.ilu_ambient_g = this.reader.getFloat(ambient, 'g', true);
	this.ilu_ambient_b = this.reader.getFloat(ambient, 'b', true);
	this.ilu_ambient_a = this.reader.getFloat(ambient, 'a', true);
	console.log("Ilumination read from file: {ambient: r=" + this.ambient_r + ", g=" + this.ambient_g + ", b=" + this.ambient_b + ", a=" + this.ambient_a + " }");

	var doubleslide = tempIl[0].children[1];
	this.doubleslide_value = this.reader.getFloat(doubleslide, 'value', true);
	console.log("Ilumination read from file: {doubleslide: value=" + this.doubleslide_value + " }");

	var background = tempIl[0].children[2];
	this.background_r = this.reader.getFloat(background, 'r', true);
	this.background_g = this.reader.getFloat(background, 'g', true);
	this.background_b = this.reader.getFloat(background, 'b', true);
	this.background_a = this.reader.getFloat(background, 'a', true);
	console.log("Ilumination read from file: {ambient: r=" + this.ambient_r + ", g=" + this.ambient_g + ", b=" + this.ambient_b + ", a=" + this.ambient_a + " }");

};



MySceneGraph.prototype.parseLights = function(rootElement) {

	var tempLights = rootElement.getElementsByTagName('LIGHTS');

	if (tempLights == null || tempLights.length == 0) {
		return "list element is missing.";
	}

	this.lights = [];
	var Ids = [];
	var nlights = tempLights[0].children.length;
	for (var i = 0; i < nlights; i++) {


		var light = new MyLights();
		var luz = tempLights[0].children[i];

		var j = 0;
		var idExists = false;
		for (j; j < Ids.length; j++) {
			if (Ids[j] == luz.id)
				idExists = true;
		}
		if(idExists==false)
			Ids[Ids.length]=luz.id;

		if (idExists == false) {
			light.id = luz.id;

			var enable = luz.children[0];
			light.enable = this.reader.getFloat(enable, 'value', true);
			console.log("Light with id " + luz.id + " read from file: {enable: value=" + light.enable + " }");


			var position = luz.children[1];
			light.pos.x = this.reader.getFloat(position, 'x', true);
			light.pos.y = this.reader.getFloat(position, 'y', true);
			light.pos.z = this.reader.getFloat(position, 'z', true);
			light.pos.w = this.reader.getFloat(position, 'w', true);
			//console.log("Light with id "+luz.id+" read from file: {position: x="+this.position_x+", y="+ this.position_y+", z="+this.position_z+", w="+this.position_w+" }");
			console.log("Light with id " + luz.id + " read from file: {position: x=" + light.pos.x + ", y=" + light.pos.y + ", z=" + light.pos.z + ", w=" + light.pos.w + " }");


			var light_ambient = luz.children[2];
			//console.log(luz.children[2]);
			light.amb.r = this.reader.getFloat(light_ambient, 'r', true);
			light.amb.g = this.reader.getFloat(light_ambient, 'g', true);
			light.amb.b = this.reader.getFloat(light_ambient, 'b', true);
			light.amb.a = this.reader.getFloat(light_ambient, 'a', true);
			//console.log("Light with id "+luz.id+" read from file: {ambient: r="+this.light_ambient_r+", g="+ this.light_ambient_g+", b="+this.light_ambient_b+", a="+this.light_ambient_a +" }");
			console.log("Light with id " + luz.id + " read from file: {ambient: r=" + light.amb.r + ", g=" + light.amb.g + ", b=" + light.amb.b + ", a=" + light.amb.a + " }");


			var light_diffuse = luz.children[3];
			light.dif.r = this.reader.getFloat(light_diffuse, 'r', true);
			light.dif.g = this.reader.getFloat(light_diffuse, 'g', true);
			light.dif.b = this.reader.getFloat(light_diffuse, 'b', true);
			light.dif.a = this.reader.getFloat(light_diffuse, 'a', true);
			console.log("Light with id " + luz.id + " read from file: {diffuse: r=" + light.dif.r + ", g=" + light.dif.g + ", b=" + light.dif.b + ", a=" + light.dif.a + " }");


			var light_specular = luz.children[4];
			light.spec.r = this.reader.getFloat(light_specular, 'r', true);
			light.spec.g = this.reader.getFloat(light_specular, 'g', true);
			light.spec.b = this.reader.getFloat(light_specular, 'b', true);
			light.spec.a = this.reader.getFloat(light_specular, 'a', true);
			console.log("Light with id " + luz.id + " read from file: {specular: r=" + light.spec.r + ", g=" + light.spec.g + ", b=" + light.spec.b + ", a=" + light.spec.a + " }");

			this.lights[i] = light;
			//console.log("e"+this.lights.length);
			//console.log();
		} else
			console.log("a light with the id:" + luz.id + " already exists!");
		idExists = false;
	}
	console.log("Nr of lights in the scene: " + this.lights.length);

};


/*
 * Callback to be executed on any read error
 */

MySceneGraph.prototype.onXMLError = function(message) {
	console.error("XML Loading Error: " + message);
	this.loadedOk = false;
};