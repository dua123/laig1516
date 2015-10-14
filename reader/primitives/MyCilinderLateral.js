/**
 * MyCilinderLateral
 * @constructor
 */
function MyCilinderLateral(scene, height, bot_rad, top_rad, sec_height, parts_sec) {
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

	/* this.deltaRadius = (this.top_radius - this.bottom_radius) / this.sections_per_height;

this.deltaY = this.height / this.sections_per_height;

var radius = this.bottom_radius + this.deltaRadius * stack;

var currentX = radius  Math.cos(this.angle  slice);
   var currentY = radius  Math.sin(this.angle  slice);
   var currentZ = stack * this.deltaY;*/

	this.vertices = [];
	this.indices = [];
	this.normals = [];
	this.texCoords = [];
	var rad = Math.abs(this.top_rad - this.bot_rad);
	var heightDiff = rad / this.sec_height;



	//lateral surface
	for (var j = 0; j <= this.sec_height; j++) {
		for (var i = 0; i <= this.parts_sec; i++) {

			var radius = this.bot_rad + this.heightDiff * j;
			var ang = i * angle;
			this.vertices.push(Math.cos(ang) * radius, Math.sin(ang) * radius, (this.height * j) / this.sec_height);
			this.normals.push(Math.cos(ang), Math.sin(ang), 0);
			this.texCoords.push(i * patchS, j * patchT);
			console.log("STACK "+j);

			var radius = this.bot_rad + this.heightDiff * (j + 1);
			this.vertices.push(Math.cos(ang) * radius, Math.sin(ang) * radius, (this.height * (j + 1)) / this.sec_height);
			this.normals.push(Math.cos(ang), Math.sin(ang), 0);
			this.texCoords.push(i * patchS, (j + 1) * patchT);


			var n = j * 2 * this.parts_sec;
			this.indices.push(n + i * 2, n + i * 2 + 2, n + i * 2 + 1);
			this.indices.push(n + i * 2 + 2, n + i * 2 + 3, n + i * 2 + 1);
		}
		this.indices.push(n + (2 * this.parts_sec) - 2, n, n + (2 * this.parts_sec) - 1);
		this.indices.push(n, n + 1, n + (2 * this.parts_sec) - 1);
	}



	this.primitiveType = this.scene.gl.TRIANGLES;
	this.initGLBuffers();
};