function XMLscene() {
	CGFscene.call(this);
}

XMLscene.prototype = Object.create(CGFscene.prototype);
XMLscene.prototype.constructor = XMLscene;

XMLscene.prototype.init = function(application) {
	CGFscene.prototype.init.call(this, application);

	this.initCameras();

	this.initLights();

	this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

	this.gl.clearDepth(100.0);
	this.gl.enable(this.gl.DEPTH_TEST);
	this.gl.enable(this.gl.CULL_FACE);
	this.gl.depthFunc(this.gl.LEQUAL);

	this.axis = new CGFaxis(this);

	this.materialDefault = new CGFappearance(this);

}
XMLscene.prototype.initLights = function() {

	this.shader.bind();

	//console.log("XML SCENNE "+this.graph.lights.length);

	//this.lights[0].setPosition(2, 3, 3, 1);
	//  this.lights[0].setDiffuse(1.0,1.0,1.0,1.0);
	// this.lights[0].update();

	this.shader.unbind();
};

XMLscene.prototype.initCameras = function() {
	this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(15, 15, 15), vec3.fromValues(0, 0, 0));
};

XMLscene.prototype.setDefaultAppearance = function() {
	this.setAmbient(0.2, 0.4, 0.8, 1.0);
	this.setDiffuse(0.2, 0.4, 0.8, 1.0);
	this.setSpecular(0.2, 0.4, 0.8, 1.0);
	this.setShininess(10.0);
};

// Handler called when the graph is finally loaded. 
// As loading is asynchronous, this may be called already after the application has started the run loop
XMLscene.prototype.onGraphLoaded = function() {
	

	//this.camera = new CGFcamera(0.4,this.graph.initials.frustum.near, this.graph.initials.frustum.far, vec3.fromValues(15, 15, 15), vec3.fromValues(0, 0, 0));
	//this.axis =newCGFaxis( , length, thickness )
	this.setGlobalAmbientLight(this.graph.Illumination.ambient.r,this.graph.Illumination.ambient.g,this.graph.Illumination.ambient.b,this.graph.Illumination.ambient.a);//ver no cfscene 
	this.setAmbient(this.graph.Illumination.ambient.r,this.graph.Illumination.ambient.g,this.graph.Illumination.ambient.b,this.graph.Illumination.ambient.a);//ver no cfscene 


	//this.node= new Node();
	//console.log(this.node.m);

	//console.log(this.graph.nodes["Mesa"]['descendents']);
	
	this.mats=[];	
	for(var i=0;i<this.graph.materials.length;i++){
		var mat =this.graph.materials[i];
		//console.log(mat);
		this.app = new CGFappearance(this);
		this.app.setAmbient(mat['ambient']['r'],mat['ambient']['g'],mat['ambient']['b'],mat['ambient']['a']);
		this.app.setSpecular(mat['specular']['r'],mat['specular']['g'],mat['specular']['b'],mat['specular']['a']);
		this.app.setDiffuse(mat['diffuse']['r'],mat['diffuse']['g'],mat['diffuse']['b'],mat['diffuse']['a']);
		this.app.setShininess(mat['shininess']['r'],mat['shininess']['g'],mat['shininess']['b'],mat['shininess']['a']);
		this.mats[mat.id]=this.app;

	}

	this.tex=[];	
	for(var i=0;i<this.graph.textures.length;i++){
		var texts =this.graph.textures[i];
		this.txt = new CGFappearance(this);
		this.txt.loadTexture(texts['path']);
		//amplified factor
		this.tex[texts.id]=this.txt;

	}	
	//this.setAmbient(this.graph);
	var i = 0;
	var k = 0;
	this.lightsEnabled = [];
	for (i; i < this.graph.lights.length; i++) {
		var newLight = this.graph.lights[i];

		if (newLight.enable == 1) {
			this.lights[newLight.id - 1].setVisible(true);
			this.lights[newLight.id - 1].enable();
		}
		this.lights[newLight.id - 1].setPosition(newLight.pos.x, newLight.pos.y, newLight.pos.z, newLight.pos.w);
		this.lights[newLight.id - 1].setAmbient(newLight.amb.r, newLight.amb.g, newLight.amb.b, newLight.amb.a);
		this.lights[newLight.id - 1].setDiffuse(newLight.dif.r, newLight.dif.g, newLight.dif.b, newLight.dif.a);
		this.lights[newLight.id - 1].setSpecular(newLight.spec.r, newLight.spec.g, newLight.spec.b, newLight.spec.a);
		
		this.lightsEnabled.push(newLight.id-1);

		k++;
	}
	
	//console.log(this.tex);
	this.allNodes=this.graph.nodes;
	for(var k=0;k<this.allNodes.length;k++){
		this.newNode= new Node();
		this.newNode.id=this.allNodes[k].id;
		//console.log(this.allNodes[k]['texture']);
		this.newNode.texture=this.allNodes[k]['texture'];
		this.newNode.material=this.allNodes[k]['material'];
		this.newNode.descendents=this.allNodes[k]['descendents'];
		console.log(this.newNode.descendents);
		var m = mat4.create();
		//ver caderno for more info
		
	}
};

XMLscene.prototype.display = function() {
	// ---- BEGIN Background, camera and axis setup
	this.shader.bind();

	// Clear image and depth buffer everytime we update the scene
	this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
	this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

	// Initialize Model-View matrix as identity (no transformation
	this.updateProjectionMatrix();
	this.loadIdentity();

	// Apply transformations corresponding to the camera position relative to the origin
	this.applyViewMatrix();

	// Draw axis
	this.axis.display();

	this.setDefaultAppearance();

	// ---- END Background, camera and axis setup

	// it is important that things depending on the proper loading of the graph
	// only get executed after the graph has loaded correctly.
	// This is one possible way to do it
	if (this.graph.loadedOk) {
		var i=0;
		for(i;i<this.lightsEnabled.length;i++){
			this.lights[this.lightsEnabled[i]].update();
		}

	};

	this.shader.unbind();
};