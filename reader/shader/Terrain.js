/**
  * Terrain
  * @constructor
  */
 function Terrain(scene,args) {
     CGFobject.call(this, scene);
     this.nivel= 3;
     this.point0 =args[0];
     this.point1 =args[1];
     this.point2 =args[2];
     this.point3 =args[3];

     var vecd=[];

     this.initBuffers();
 
 };

Terrain.prototype = Object.create(CGFobject.prototype);
Terrain.prototype.constructor = Terrain;


Terrain.prototype.initBuffers = function() {

this.testShaders=[
		new CGFshader(this.gl, "shaders/flat.vert", "shaders/flat.frag"),
		new CGFshader(this.gl, "shaders/uScale.vert", "shaders/uScale.frag"),
		new CGFshader(this.gl, "shaders/varying.vert", "shaders/varying.frag"),
		new CGFshader(this.gl, "shaders/texture1.vert", "shaders/texture1.frag"),
		new CGFshader(this.gl, "shaders/texture2.vert", "shaders/texture2.frag"),
		new CGFshader(this.gl, "shaders/texture3.vert", "shaders/texture3.frag")
	];
}


