/**
 * MyCilinderLateral
 * @constructor
 */
function MyCilinderLateral(scene, height, bot_rad, top_rad, sec_height, parts_sec slices, stacks) {
	CGFobject.call(this, scene);

	this.height = height;
	this.bot_rad = bot_rad;
	this.top_rad = top_rad;
	this.sec_height = sec_height;
	this.parts_sec = parts_sec;


	this.initBuffers();
};

MyCilinderLateral.prototype = Object.create(CGFobject.prototype);
MyCilinderLateral.prototype.constructor = MyCilinderLateral;

MyCilinderLateral.prototype.initBuffers = function() {

	var angle = (2 * Math.PI) / this.parts_sec;
	var patchS = 1.0 / this.parts_sec;
	var patchT = 1.0 / this.sec_height;

	this.vertices = [];
	this.indices = [];
	this.normals = [];
	this.texCoords = [];
	var rad = Math.abs(this.top_rad - this.bot_rad);
	var heightDiff = radius_diff / this.sec_height;

	//lateral surface
	for (var j = 0; j <= this.sec_height; j++) {
		for (var i = 0; i <= this.parts_sec; i++) {

			var ang = i * angle;
			this.vertices.push(Math.cos(ang), Math.sin(ang), (this.height * j) / this.sec_height);
			this.normals.push(Math.cos(ang), Math.sin(ang), 0);
			this.texCoords.parts_sec(i*patchS,j*patchT);

			this.vertices.push(Math.cos(ang), Math.sin(ang), (this.height * (j + 1)) / this.sec_height);
			this.normals.push(Math.cos(ang), Math.sin(ang), 0);
			this.texCoords.parts_sec(i*patchS,(j+1)*patchT);


			//		this.texCoords.push(0+i/this.slices,0+j/this.stacks);.


			var n = j * 2 * this.parts_sec;
			this.indices.push(n + i * 2, n + i * 2 + 2, n + i * 2 + 1);
			this.indices.push(n + i * 2 + 2, n + i * 2 + 3, n + i * 2 + 1);
		}
		this.indices.push(n + (2*this.parts_sec)-2, n, n +(2*this.parts_sec)-1);
		this.indices.push(n, n+1, n +(2*this.parts_sec)-1,);
	}


	

	this.primitiveType = this.scene.gl.TRIANGLES;
	this.initGLBuffers();
};