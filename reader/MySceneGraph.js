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

var MyTexture = function() {
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
	console.log(this.reader.xmlDoc.documentElement);

	// Here should go the calls for different functions to parse the various blocks
	var error = this.parseGlobalsExample(rootElement);
	if (error != null) {
		this.onXMLError(error);
		return;
	}

	error = this.parseInitials(rootElement);
	if (error != null) {
		this.onXMLError(error);
		return;
	}

	error = this.parseIllumination(rootElement);
	if (error != null) {
		this.onXMLError(error);
		return;
	}

	error = this.parseLights(rootElement);
	if (error != null) {
		this.onXMLError(error);
		return;
	}

	error = this.parseTextures(rootElement);
	if (error != null) {
		this.onXMLError(error);
		return;
	}

	error = this.parseMaterials(rootElement);
	if (error != null) {
		this.onXMLError(error);
		return;
	}

	error = this.parseLeaves(rootElement);
	if (error != null) {
		this.onXMLError(error);
		return;
	}
	error = this.parseNodes(rootElement);
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
	/*
		var elems = rootElement.getElementsByTagName('globals');
		if (elems == null) {
			return "globals element is missing.";
		}

		if (elems.length != 1) {
			return "either zero or more than one 'globals' element found.";
		}

		// various examples of different types of access
		//var globals = elems[0];
		//this.background = this.reader.getRGBA(globals, 'background');
		//this.drawmode = this.reader.getItem(globals, 'drawmode', ["fill", "line", "point"]);
		//this.cullface = this.reader.getItem(globals, 'cullface', ["back", "front", "none", "frontandback"]);
		//this.cullorder = this.reader.getItem(globals, 'cullorder', ["ccw", "cw"]);

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
		*/

};

MySceneGraph.prototype.idExists = function(IDs, id) {
	var exists = false;
	for (var i = 0; i < IDs.length; i++) {
		if (IDs[i] == id)
			exists = true;
	}
	if (exists)
		return true;
	else false;
}

MySceneGraph.prototype.parseInitials = function(rootElement) {
	var tempIni = rootElement.getElementsByTagName('INITIALS');

	if (tempIni == null) {
		return "initials element is missing.";
	}


	if (tempIni.length != 1) {
		return "either zero or more than one 'initials' element found.";
	}

	this.initials = [];
	//this.list=[];
	var frustum = tempIni[0].children[0];
	this.initials = [];
	this.initials['frustum'] = [];
	this.initials['frustum']['near'] = this.reader.getFloat(frustum, 'near', true);
	this.initials['frustum']['far'] = this.reader.getFloat(frustum, 'far', true);
	console.log("Initials read from file: {Frustum: near=" + this.initials['frustum']['near'] + ", far=" + this.initials['frustum']['far'] + "}");

	var translate = tempIni[0].children[1];
	this.initials['translate'] = [];
	this.initials['translate']['x'] = this.reader.getFloat(translate, 'x', true);
	this.initials['translate']['y'] = this.reader.getFloat(translate, 'y', true);
	this.initials['translate']['z'] = this.reader.getFloat(translate, 'z', true);
	console.log("Initials read from file: {translate: x=" + this.initials['translate']['x'] + ", y=" + this.initials['translate']['y'] + ", z=" + this.initials['translate']['z'] + " }");

	//TODO: axis can only accpet x y or z
	var rotation1 = tempIni[0].children[2];
	console.log(rotation1);

	//verificar mais tarde 
	this.initials['rot1'] = [];
	this.initials['rot1']['axis'] = this.reader.getString(rotation1, 'axis', true);
	this.initials['rot1']['angle'] = this.reader.getFloat(rotation1, 'angle', true);
	console.log("Initials read from file: {rotation1: axis=" + this.initials['rot1']['axis'] + ", angle=" + this.initials['rot1']['angle'] + " }");

	var rotation2 = tempIni[0].children[3];
	this.initials['rot2'] = [];
	this.initials['rot2']['axis'] = this.reader.getString(rotation2, 'axis', true);
	this.initials['rot2']['angle'] = this.reader.getFloat(rotation2, 'angle', true);
	console.log("Initials read from file: {rotation2: axis=" + this.initials['rot2']['axis'] + ", angle=" + this.initials['rot2']['angle'] + " }");

	var rotation3 = tempIni[0].children[4];
	this.initials['rot3'] = [];
	this.initials['rot3']['axis'] = this.reader.getString(rotation3, 'axis', true);
	this.initials['rot3']['angle'] = this.reader.getFloat(rotation3, 'angle', true);
	console.log("Initials read from file: {rotation3: axis=" + this.initials['rot3']['axis'] + ", angle=" + this.initials['rot3']['angle'] + " }");

	var scale = tempIni[0].children[5];
	this.initials['scale'] = []
	this.initials['scale']['sx'] = this.reader.getFloat(scale, 'sx', true);
	this.initials['scale']['sy'] = this.reader.getFloat(scale, 'sy', true);
	this.initials['scale']['sz'] = this.reader.getFloat(scale, 'sz', true);
	console.log("Initials read from file: {scale: sx=" + this.initials['scale']['sx'] + ", sy=" + this.initials['scale']['sy'] + ", sz=" + this.initials['scale']['sz'] + " }");

	var reference = tempIni[0].children[6];
	this.initials['reference'] = []
	this.initials['reference']['length'] = this.reader.getFloat(reference, 'length', true);
	console.log("Initials read from file: {reference: length=" + this.initials['reference']['length'] + "}");

};

MySceneGraph.prototype.parseIllumination = function(rootElement) {
	var tempIl = rootElement.getElementsByTagName('ILLUMINATION');

	if (tempIl == null) {
		return "ILLUMINATION element is missing.";
	}


	if (tempIl.length != 1)
		return "either zero or more than one 'illumination' element found.";

	var ambient = tempIl[0].children[0];
	this.Illumination = [];
	this.Illumination['ambient'] = [];
	this.Illumination['ambient']['r'] = this.reader.getFloat(ambient, 'r', true);
	this.Illumination['ambient']['g'] = this.reader.getFloat(ambient, 'g', true);
	this.Illumination['ambient']['b'] = this.reader.getFloat(ambient, 'b', true);
	this.Illumination['ambient']['a'] = this.reader.getFloat(ambient, 'a', true);
	console.log(this.ilu_ambient);
	console.log("Ilumination read from file: {ambient: r=" + this.Illumination['ambient']['r'] + ", g=" + this.Illumination['ambient']['g'] + ", b=" + this.Illumination['ambient']['b'] + ", a=" + this.Illumination['ambient']['a'] + " }");

	var doubleslide = tempIl[0].children[1];
	this.Illumination['doubleslide'] = [];
	this.doubleslide_value = this.reader.getFloat(doubleslide, 'value', true);
	console.log("Ilumination read from file: {doubleslide: value=" + this.doubleslide_value + " }");

	var background = tempIl[0].children[2];
	this.Illumination['background'] = [];
	this.Illumination['background']['r'] = this.reader.getFloat(background, 'r', true);
	this.Illumination['background']['g'] = this.reader.getFloat(background, 'g', true);
	this.Illumination['background']['b'] = this.reader.getFloat(background, 'b', true);
	this.Illumination['background']['a'] = this.reader.getFloat(background, 'a', true);
	console.log("Ilumination read from file: {ambient: r=" + this.Illumination['background']['r'] + ", g=" + this.Illumination['background']['g'] + ", b=" + this.Illumination['background']['b'] + ", a=" + this.Illumination['background']['a'] + " }");
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
		var idExists = false; //substituir por funçao idExists(Ids,luz.id);
		for (j; j < Ids.length; j++) {
			if (Ids[j] == luz.id)
				idExists = true;
		}
		if (idExists == false)
			Ids[Ids.length] = luz.id;

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

MySceneGraph.prototype.parseTextures = function(rootElement) {
	var temp_text = rootElement.getElementsByTagName('TEXTURES');
	if (temp_text == null) {
		return "TEXTURES element is missing";
	}

	if (temp_text.length != 1) {
		return "More or less than 1 TEXTURES element found. THERE CAN ONLY BE ONE!!!!";
	}

	var nrTextures = temp_text[0].children.length;
	var IDs = [];
	this.textures = [];
	//this.nrTextures=[];
	for (var i = 0; i < nrTextures; i++) {
		var texture = temp_text[0].children[i];
		var cur_text = nrTextures[i];
		this.val = [];

		var id = this.reader.getString(texture, 'id', true);
		if (this.idExists(IDs, id) == true) {
			return "Texture already exists (id is already being used.";
		}
		this.val['id'] = id;


		var file = texture.children[0];
		this.val['path'] = this.reader.getString(file, 'path', true);
		console.log("Texture with id " + this.val['id'] + " read from file: {path: path=" + this.val['path'] + " }");

		var amp_factor = texture.children[1];
		this.val['factor'] = [];
		this.val['factor']['s'] = this.reader.getFloat(amp_factor, 's', true);
		this.val['factor']['t'] = this.reader.getFloat(amp_factor, 't', true);
		console.log("Texture with id " + this.val['id'] + " read from file: {amp_factor: s=" + ~this.val['factor']['s'] + ", t=" + this.val['factor']['t'] + " }");

		this.textures[i] = this.val;

	}
};

MySceneGraph.prototype.parseMaterials = function(rootElement) {
	var temp_mat = rootElement.getElementsByTagName('MATERIALS');
	if (temp_mat == null) {
		return "MATERIALS element is missing";
	}

	if (temp_mat.length != 1) {
		return "More or less than 1 TEXTURES element found. THERE CAN ONLY BE ONE!!!!";
	}

	var nrMaterials = temp_mat[0].children.length;
	var IDs = [];
	this.materials = [];
	//this.nrTextures=[];
	for (var i = 0; i < nrMaterials; i++) {
		var material = temp_mat[0].children[i];
		var cur_mat = nrMaterials[i];
		this.val = [];

		var id = this.reader.getString(material, 'id', true);
		if (this.idExists(IDs, id) == true) {
			return "Material already exists (id is already being used.";
		}
		this.val['id'] = id;


		var enable = material.children[0];
		this.val['shininess'] = this.reader.getString(enable, 'value', true);
		console.log("Material with id " + this.val['id'] + " read from file: {enable: value=" + this.val['shininess'] + " }");

		var ambient = material.children[1];
		this.val['ambient'] = [];
		this.val['ambient']['r'] = this.reader.getFloat(ambient, 'r', true);
		this.val['ambient']['g'] = this.reader.getFloat(ambient, 'g', true);
		this.val['ambient']['b'] = this.reader.getFloat(ambient, 'b', true);
		this.val['ambient']['a'] = this.reader.getFloat(ambient, 'a', true);
		console.log("Material with id " + this.val['id'] + " read from file: {ambient: r=" + this.val['ambient']['r'] + ", g=" + this.val['ambient']['g'] + ", b=" + this.val['ambient']['b'] + ", a=" + this.val['ambient']['a'] + " }");

		var diffuse = material.children[2];
		this.val['diffuse'] = [];
		this.val['diffuse']['r'] = this.reader.getFloat(diffuse, 'r', true);
		this.val['diffuse']['g'] = this.reader.getFloat(diffuse, 'g', true);
		this.val['diffuse']['b'] = this.reader.getFloat(diffuse, 'b', true);
		this.val['diffuse']['a'] = this.reader.getFloat(diffuse, 'a', true);
		console.log("Material with id " + this.val['id'] + " read from file: {diffuse: r=" + this.val['diffuse']['r'] + ", g=" + this.val['diffuse']['g'] + ", b=" + this.val['diffuse']['b'] + ", a=" + this.val['diffuse']['a'] + " }");

		var specular = material.children[3];
		this.val['specular'] = [];
		this.val['specular']['r'] = this.reader.getFloat(specular, 'r', true);
		this.val['specular']['g'] = this.reader.getFloat(specular, 'g', true);
		this.val['specular']['b'] = this.reader.getFloat(specular, 'b', true);
		this.val['specular']['a'] = this.reader.getFloat(specular, 'a', true);
		console.log("Material with id " + this.val['id'] + " read from file: {specular: r=" + this.val['specular']['r'] + ", g=" + this.val['specular']['g'] + ", b=" + this.val['specular']['b'] + ", a=" + this.val['specular']['a'] + " }");

		var emission = material.children[3];
		this.val['emission'] = [];
		this.val['emission']['r'] = this.reader.getFloat(emission, 'r', true);
		this.val['emission']['g'] = this.reader.getFloat(emission, 'g', true);
		this.val['emission']['b'] = this.reader.getFloat(emission, 'b', true);
		this.val['emission']['a'] = this.reader.getFloat(emission, 'a', true);
		console.log("Material with id " + this.val['id'] + " read from file: {emission: r=" + this.val['emission']['r'] + ", g=" + this.val['emission']['g'] + ", b=" + this.val['emission']['b'] + ", a=" + this.val['emission']['a'] + " }");

		this.materials[i] = this.val;

	}
};

MySceneGraph.prototype.parseLeaves = function(rootElement) {
	var temp_leaves = rootElement.getElementsByTagName('LEAVES');
	if (temp_leaves == null) {
		return "LEAVES element is missing";
	}

	if (temp_leaves.length != 1) {
		return "More or less than 1 LEAVES element found. THERE CAN ONLY BE ONE!!!!";
	}

	var nrLeaves = temp_leaves[0].children.length;
	var IDs = [];
	this.leaves = [];
	//this.nrTextures=[];
	for (var i = 0; i < nrLeaves; i++) {
		var leaf = temp_leaves[0].children[i];
		var cur_leaf = nrLeaves[i];
		this.val = [];

		var id = this.reader.getString(leaf, 'id', true);
		if (this.idExists(IDs, id) == true) {
			return "Leafs already exists (id is already being used.";
		}
		IDs.push(id);
		this.val['id'] = id;

		this.val['type'] = this.reader.getString(leaf,'type',true);
		var string = this.reader.getString(leaf,'args',true);
		var nstring = string.split(" ");
		console.log("Leaf with id "+ this.val['id']+ " read from file: {leaf: type= " +this.val['type']+" args= "+this.val['args']+" }");
		this.val['args'] = nstring;


		this.leaves[i] = this.val;

	}
};
MySceneGraph.prototype.parseNodes=function(rootElement) {

	var temp_node = rootElement.getElementsByTagName('NODES');
		
	if (temp_node == null) {
		return "'NODES' element is missing";
	}

	if (temp_node.length != 1) {
		return "More or less than 1 'NODES' element found. THERE CAN ONLY BE ONE!!!!";
	}
	this.nodes = [];
//como no xml a root esta dentro dos nodes
	this.graphRootID = temp_node[0].children[0].id;
	this.nodes['root']=temp_node[0].children[0].id;
	var nrNodes = temp_node[0].children.length;
	var IDs = [];
	for(var i=1;i<nrNodes;i++){    				//i=1 BECAUSE i=0 is root id
		var cont=0;
		var node=temp_node[0].children[i];
		if (this.idExists(IDs, node.id) == true) {
			return "Material already exists (id is already being used.";
		}
		IDs.push(node.id);
		this.nodeInfo=[];
		this.nodeInfo['id']=node.id;
		var m =mat4.create();
		console.log("Matrix created {" +m+" }");
	
		
		for(var k=0;k<node.children.length;k++){
			if(node.children[k].tagName=='MATERIAL'){
				var material=node.children[k];
				this.nodeInfo['material']=this.reader.getString(material,'id',true);
				console.log("Node with id "+node.id+" read from file: {material: id="+this.nodeInfo['material']+" }");
			}

			if(node.children[k].tagName=='TEXTURE'){
				var texture=node.children[k];
				this.nodeInfo['texture']=this.reader.getString(texture,'id',true);
				console.log("Node with id "+node.id+" read from file: {texture: id="+this.nodeInfo['texture']+" }");
			}
			

			var axis;
			var tag=node.children[k].tagName
			
			switch(tag){
				case 'TRANSLATION':
					var translation=node.children[k];
					var x=this.reader.getFloat(translation,'x',true);
					var y=this.reader.getFloat(translation,'y',true);
					var z=this.reader.getFloat(translation,'z',true);
					console.log(x+" " +y+" "+z);
					mat4.translate(m,m,[x,y,z]);
					console.log("translation {" +m+" }");
					break;
				case 'ROTATION':
					var rotation=node.children[k];
					switch(this.reader.getString(rotation,'axis',true)){
						case "x":
							axis=[1,0,0];
							break;
						case "y":
							axis=[0,1,0];
							break;
						case "z":
							axis=[0,0,1];
							break;
					}
					var angle=this.reader.getFloat(rotation,'angle',true);
					mat4.rotate(m,m,(Math.PI*angle)/180,axis);
					console.log(axis+" " +angle);
					console.log("rotation {" +m+" }");
					break;
				case 'SCALE':
					var scale=node.children[k];
					var sx=this.reader.getFloat(scale,'sx',true);
					var sy=this.reader.getFloat(scale,'sy',true);
					var sz=this.reader.getFloat(scale,'sz',true);
					mat4.scale(m,m,[this.reader.getFloat(scale,'sx',true),this.reader.getFloat(scale,'sy',true),this.reader.getFloat(scale,'sz',true)]);
					console.log(sx+" " +sy+" "+sz);
					console.log("scale {" +m+" }");
					break;
			}




			if(node.children[k].tagName=='DESCENDENTS'){

				var descendents=node.children[k];
				this.nodeInfo['descendents']=[];
				for(var j=0;j<descendents.children.length;j++){

					var desc=descendents.children[j];
					this.nodeInfo['descendents'][j]=this.reader.getString(desc,'id',true);
				}
				console.log("Node "+node.id+" descendents: "+this.nodeInfo['descendents']);
			}
		}
		//console.log(node.id);
		this.scene.grafo[node.id]=new Node();
		this.scene.grafo[node.id].setMatrix(m);
		//console.log("GRAFO2: "+this.scene.grafo[node.id].m);
		//this.nodeInfo['m']=[];
		//this.nodeInfo['m']=m;
		//console.log(m);
		this.nodes[i-1]=this.nodeInfo;	
	}

};
/*
 * Callback to be executed on any read error
 */

MySceneGraph.prototype.onXMLError = function(message) {
	console.error("XML Loading Error: " + message);
	this.loadedOk = false;
};