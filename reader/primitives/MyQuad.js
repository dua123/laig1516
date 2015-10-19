/**
 * MyQuad
 * @constructor
 */
function MyQuad(scene, xt, yt, xb, yb, minS, maxS) {
	CGFobject.call(this, scene);

	this.xt = xt
	this.yt = yt
	this.xb = xb
	this.yb = yb

	this.s = 1;
	this.t = 1;
	this.initBuffers();

	this.initBuffers();
};

MyQuad.prototype = Object.create(CGFobject.prototype);
MyQuad.prototype.constructor = MyQuad;

MyQuad.prototype.initBuffers = function() {
	 this.vertices = [
    	this.xt, this.yb, 0,
    	this.xb, this.yb, 0,
    	this.xb, this.yt, 0,
    	this.xt, this.yt, 0
    ];

    this.indices = [
    	0, 1, 2,
    	0, 2, 3
    ];

	this.normals = [
			0,0,1,
			0,0,1,
			0,0,1,
			0,0,1
    ];

    

	

	this.updateTexCoords();

	this.primitiveType = this.scene.gl.TRIANGLES;
	this.initGLBuffers();
};

MyQuad.prototype.setAmplif = function(ampS, ampT) {
	this.s = ampS;
	this.t = ampT;
	this.updateTexCoords();
};

MyQuad.prototype.updateTexCoords = function() {
	this.texCoords = [
		0, (this.yt - this.yb)/this.t,
		(this.xb - this.xt)/this.s, (this.yt - this.yb)/this.t,
		(this.xb - this.xt)/this.s, 0,
		0, 0
	];
}