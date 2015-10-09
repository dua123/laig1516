/**
 * MyQuad
 * @constructor
 */
 function MyQuad(scene, xt, yt, xb, yb,minS,maxS,minT,maxT) {
 	CGFobject.call(this,scene);

	this.xt=xt || -0.5;
	this.yt=yt || -0.5;
	this.xb=xb || 0.5;
	this.yb=yb || 0.5;

 	this.minS=minS || 0;
	this.minT=minT || 0;
	this.maxS=maxS || 1;
	this.maxT=maxT || 1;


 	this.initBuffers();
 };

 MyQuad.prototype = Object.create(CGFobject.prototype);
 MyQuad.prototype.constructor = MyQuad;

 MyQuad.prototype.initBuffers = function() {
 	this.vertices = [
 	this.xt, this.yt, 0,
 	this.xb, this.yt, 0,
 	this.xb, this.yb, 0,
 	this.xt, this.yb, 0
 	];

 	this.indices = [
 	0, 3, 2, 
 	0, 2, 1
 	];

 	this.texCoords = [
		this.minS, this.maxT,
		this.maxS, this.maxT,
		this.minS, this.minT,
		this.maxS, this.minT
	];
	

 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };
