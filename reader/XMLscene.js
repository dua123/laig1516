function XMLscene() {
	CGFscene.call(this);
}

var degToRad = Math.PI / 180.0;

XMLscene.prototype = Object.create(CGFscene.prototype);
XMLscene.prototype.constructor = XMLscene;

XMLscene.prototype.init = function(application) {
	CGFscene.prototype.init.call(this, application);

	this.initCameras();

	this.grafo=[];
	var graphRootID;

	this.initLights();

	this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
	

	this.gl.clearDepth(100.0);
	this.gl.enable(this.gl.DEPTH_TEST);
	this.gl.enable(this.gl.CULL_FACE);
	this.gl.depthFunc(this.gl.LEQUAL);

	this.axis = new CGFaxis(this);
	//this.quad= new MyDiamond(this,4);

	this.materialDefault = new CGFappearance(this);
	this.a= false;
	this.speed=0;
	this.selectedExampleShader=0;

}
XMLscene.prototype.initLights = function() {

	//this.shader.bind();


	this.lights[0].setPosition(2, 3, 3, 1);
	this.lights[0].setDiffuse(1.0,1.0,1.0,1.0);
	this.lights[0].update();

	//this.shader.unbind();
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

	this.axis= new CGFaxis(this);
	this.enableTextures(true);
		this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
	
	this.camera.near = this.graph.initials.frustum.near;
    this.camera.far = this.graph.initials.frustum.far;

    this.translate(this.graph.initials.translation.x,this.graph.initials.translation.y,this.graph.initials.translation.z);
    this.rotate(this.graph.initials.rot1.axis,this.graph.initials.rot1.angle);
    
    this.rotate(this.graph.initials.rot2.axis,this.graph.initials.rot2.angle);
      
    this.rotate(this.graph.initials.rot3.axis,this.graph.initials.rot3.angle);
    this.scale(this.graph.initials.scale.sx,this.graph.initials.scale.sy,this.graph.initials.scale.sz);

	
	this.setGlobalAmbientLight(this.graph.Illumination.ambient.r,this.graph.Illumination.ambient.g,this.graph.Illumination.ambient.b,this.graph.Illumination.ambient.a);//ver no cfscene 
	this.setAmbient(this.graph.Illumination.ambient.r,this.graph.Illumination.ambient.g,this.graph.Illumination.ambient.b,this.graph.Illumination.ambient.a);//ver no cfscene 

	

	
	this.mats=[];	
	for(var i=0;i<this.graph.materials.length;i++){
		var mat =this.graph.materials[i];
		this.app = new CGFappearance(this);
		this.app.setAmbient(mat['ambient']['r'],mat['ambient']['g'],mat['ambient']['b'],mat['ambient']['a']);
		this.app.setSpecular(mat['specular']['r'],mat['specular']['g'],mat['specular']['b'],mat['specular']['a']);
		this.app.setDiffuse(mat['diffuse']['r'],mat['diffuse']['g'],mat['diffuse']['b'],mat['diffuse']['a']);
		this.app.setShininess(mat['shininess']);
		this.mats[mat.id]=this.app;

	}

	this.tex=[];
	this.tex_ampfac=[];	
	for(var i=0;i<this.graph.textures.length;i++){
		var texts =this.graph.textures[i];
		this.txt = new CGFappearance(this);
		this.txt.loadTexture(texts['path']);
		this.tex_ampfac[texts.id]=[];
		this.tex_ampfac[texts.id]['s']=this.graph.textures[i]['factor']['s'];
		this.tex_ampfac[texts.id]['t']=this.graph.textures[i]['factor']['t'];
		console.log(texts.id+"    "+this.graph.textures[i]['factor']['s']+"    "+this.graph.textures[i]['factor']['t']);
		this.tex[texts.id]=this.txt;

	}	

	var i = 0;
	var k = 0;
	this.lightsEnabled = [];
	for (i; i < this.graph.lights.length; i++) {
		var newLight = this.graph.lights[i];

		if (newLight.enable == 1) {
			this.lights[i ].setVisible(true);
			this.lights[i ].enable();
		}
		this.lights[i].setPosition(newLight.pos.x, newLight.pos.y, newLight.pos.z, newLight.pos.w);
		this.lights[i].setAmbient(newLight.amb.r, newLight.amb.g, newLight.amb.b, newLight.amb.a);
		this.lights[i].setDiffuse(newLight.dif.r, newLight.dif.g, newLight.dif.b, newLight.dif.a);
		this.lights[i].setSpecular(newLight.spec.r, newLight.spec.g, newLight.spec.b, newLight.spec.a);
		
		this.lightsEnabled.push(newLight.id-1);

	}
	graphRootID = this.graph.graphRootID;	
	this.allNodes=this.graph.nodes;
	for(var k=1;k<this.allNodes.length;k++){
		
		var nodeID = this.graph.nodes[k].id;
		this.grafo[nodeID].texture=this.allNodes[k]['texture'];
		this.grafo[nodeID].material=this.allNodes[k]['material'];
		this.grafo[nodeID].descendents=this.allNodes[k]['descendents'];
	}
	
	this.allLeaves=this.graph.leaves;
	this.sceneLeaves=[];
	for(var n=0;n<this.allLeaves.length;n++){
		var leaveID=this.allLeaves[n].id;
		this.sceneLeaves[leaveID]= new Element(this, this.allLeaves[n]['type'],this.allLeaves[n]['args']);
	}

	
	//this.animationTest = new Animation(this, "linear",[1,20,"linear",[[1,3,5],[2,4,6],[1,1,1]]]);
	
	//this.planeTest = new Plane(this,20);
	//this.planeTest1 = new Patch(this,2,1,20,20,[[[ -1.5, -1.5, 0.0, 1 ],[ -1.5,  1.5, 0.0, 1 ],[ -1.5,  1.5, 0.0, 1 ]],
	//										  [[ 0, -1.5, 3.0, 1    ],[ 0,  1.5, 3.0, 1    	 ],[ -1.5,  1.5, 0.0, 1 ]],
	//										  [[ 1.5, -1.5, 0.0, 1  ],[ 1.5,  1.5, 0.0, 1    ],[ -1.5,  1.5, 0.0, 1 ]]]);//corrigir mais tarde
	
	//this.terrainTest = new Terrain(this);
	this.vehicle = new Vehicle(this);
	this.stacktexture=[];	
	this.stackmaterial=[];

	//alteração do perido de actualizacao em 10
	this.setUpdatePeriod(100/6);
	this.timer=0;
//teste Terrain


};

XMLscene.prototype.display = function() {
	// ---- BEGIN Background, camera and axis setup
	//this.shader.bind();

	// Clear image and depth buffer everytime we update the scene
	//this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
	//this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

	// Clear image and depth buffer every time we update the scene
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    this.gl.clearColor(0.1, 0.1, 0.1, 1.0);
    this.gl.enable(this.gl.DEPTH_TEST);

	

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
		for(i;i<this.lights.length;i++){
			this.lights[i].update();
		}
	/*this.pushMatrix();
		this.quad.display();
	this.popMatrix();	*/
	//this.NodesDiplay(graphRootID);
		//this.planeTest.display();
		//this.planeTest1.display();

		//Terrain
		//this.terrainTest.display();
		//Vehicle
		this.vehicle.display();

	};

	//this.shader.unbind();
};
XMLscene.prototype.NodesDiplay = function(id) {

		//actualiza ma matriz e faz pop 
		//apicacao do material
		//console.log(this.grafo);
	this.pushMatrix();

	var mat = this.mats[this.grafo[id].material];
	if(mat!=undefined ){
			//guarda o material na stack
			//this.stackmaterial.push(mat);
			//aplica material
			this.pushAppearance(mat);
	}
			//aplicacao da textura
	var tex = this.tex[this.grafo[id].texture];
	
	if(tex!=undefined){
			//guarda a textura na stack						
			this.stacktexture.push(tex);
			//aplicado o textura a imagem
			tex.apply();
				
	}
	
	//multiplicacao das matrizes
	this.multMatrix(this.grafo[id].m);  
	if(this.grafo[id].descendents.length>0){
		for(var i = 0; i < 	this.grafo[id].descendents.length ;i++)
		{
			var isleaf = this.sceneLeaves[this.grafo[id].descendents[i]];
			
            if(isleaf == undefined){
				this.NodesDiplay(this.grafo[id].descendents[i]);
			}else{
				isleaf.display();
			}

		}
	}
	

	if(mat!=undefined ){
		//remove o material da stack 
		this.popAppearance();
	}
	if(tex!=undefined){
		//remove a textura do stack
		this.stacktexture.pop()
		tex.apply();

	}
	this.popMatrix();

}

XMLscene.prototype.pushAppearance = function(mat) {
	this.stackmaterial.push(mat);
	mat.apply();

};
XMLscene.prototype.popAppearance = function() {
	var mat =this.stackmaterial.pop();
	mat.apply();

};
//aplica mais tarde a animação
XMLscene.prototype.update = function(currTime){
	
		//console.log(this.timer);
	//	this.animationTest.update(((currTime-this.timer/1000)%1000));

}

