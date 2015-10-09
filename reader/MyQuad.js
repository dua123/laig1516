/**
 * MyQuad
 * @constructor
 */
 function MyQuad(scene, xt, yt, xb, yb) {
 	CGFobject.call(this,scene);

 	this.initBuffers();
 };

 MyQuad.prototype = Object.create(CGFobject.prototype);
 MyQuad.prototype.constructor = MyQuad;

 MyQuad.prototype.initBuffers = function() {
 	this.vertices = [
 	xt, yt, 0,
 	xb, yt, 0,
 	xb, yb, 0,
 	xt, yb, 0
 	];

 	this.indices = [
 	0, 3, 2, 
 	0, 2, 1
 	];

 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };
