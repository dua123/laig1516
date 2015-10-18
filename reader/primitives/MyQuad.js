/**
 * MyQuad
 * @constructor
 */
function MyQuad(scene, xt, yt, xb, yb, minS, maxS, s, t) {
	CGFobject.call(this, scene);

	this.xt = xt
	this.yt = yt
	this.xb = xb
	this.yb = yb

	this.s = s || 1;
	this.t = t || 1;


	this.initBuffers();
};

MyQuad.prototype = Object.create(CGFobject.prototype);
MyQuad.prototype.constructor = MyQuad;

MyQuad.prototype.initBuffers = function() {
	this.vertices = [
		this.xt, this.yt, 0,
		this.xt, this.yb, 0,
		this.xb, this.yt, 0,
		this.xb, this.yb, 0
	];

	this.indices = [
		0, 1, 2,
		3, 2, 1
	];

	this.normals = [
		0, 0, 1,
		0, 0, 1,
		0, 0, 1,
		0, 0, 1

	];

	this.texCoords = [
		0, 0,
		0, (this.yt - this.yb)/this.t,
		(this.xb - this.xt)/this.s, 0,
		(this.xb - this.xt)/this.s, (this.yt - this.yb)/this.t
	];


	this.primitiveType = this.scene.gl.TRIANGLES;
	this.initGLBuffers();
};