/**
  * Terrain
  * @constructor
  */
 function Terrain(scene) {
     CGFobject.call(this, scene);
	
	this.plane = new Plane(this.scene,20);
	
    this.initBuffers();
 
 };

Terrain.prototype = Object.create(CGFobject.prototype);
Terrain.prototype.constructor = Terrain;


Terrain.prototype.initBuffers = function() {


	this.appearance = new CGFappearance(this.scene);
	this.appearance.setAmbient(0.3, 0.3, 0.3, 1);
	this.appearance.setDiffuse(0.7, 0.7, 0.7, 1);
	this.appearance.setSpecular(0.0, 0.0, 0.0, 1);	
	this.appearance.setShininess(120);
	this.texture = new CGFtexture(this.scene, "resources/map.jpg");
	this.appearance.setTexture(this.texture);
	this.appearance.setTextureWrap ('REPEAT', 'REPEAT');


this.testShaders=[
		new CGFshader(this.scene.gl, "shader/shadersApply/flat.vert", "shader/shadersApply/flat.frag"),
		new CGFshader(this.scene.gl, "shader/shadersApply/uScale.vert", "shader/shadersApply/uScale.frag"),
		new CGFshader(this.scene.gl, "shader/shadersApply/varying.vert", "shader/shadersApply/varying.frag"),
		new CGFshader(this.scene.gl, "shader/shadersApply/texture1.vert", "shader/shadersApply/texture1.frag"),
		new CGFshader(this.scene.gl, "shader/shadersApply/texture2.vert", "shader/shadersApply/texture2.frag"),
		new CGFshader(this.scene.gl, "shader/shadersApply/texture3.vert", "shader/shadersApply/texture3.frag")
	];

	this.testShaders[1].setUniformsValues({normScale: 50.0});
	this.testShaders[2].setUniformsValues({normScale: 50.0});
	this.testShaders[5].setUniformsValues({normScale: 50.0});

	// texture will have to be bound to unit 1 later, when using the shader, with "this.texture2.bind(1);"
	this.testShaders[4].setUniformsValues({uSampler2: 1});
	this.testShaders[5].setUniformsValues({uSampler2: 1});

	this.texture2 = new CGFtexture(this.scene, "resources/terrainmap.jpg");


}
Terrain.prototype.display = function() {
		
	this.appearance.apply();
	this.scene.setActiveShader(this.testShaders[5]);
	this.scene.pushMatrix();

    this.texture2.bind(1);
	this.scene.scale(10,1,10);
	this.plane.display();			
	this.scene.popMatrix();

	this.scene.setActiveShader(this.scene.defaultShader);

}


