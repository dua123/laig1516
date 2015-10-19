/**
 * MyCilinderLateral
 * @constructor
 */
function MyCilinderLateral(scene, height, bot_rad, top_rad, sec_height, parts_sec) {
	CGFobject.call(this, scene);
//
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
	var deltaHeight = this.height / this.sec_height;
	var radius_diff = (this.top_rad - this.bot_rad) / this.sec_height;

	this.vertices = [];
	this.indices = [];
	this.normals = [];
	this.texCoords = [];
	
	//var heightDiff = radius_diff / this.sec_height;

	var vecNormal = vec3.create();
	//lateral surface
	for (var j = 0; j <= this.sec_height; j++) {
		var radius = this.bot_rad + radius_diff * j;
		var height = deltaHeight * j;
		for (var i = 0; i <= this.parts_sec; i++) {

			var ang = angle * i;
			this.vertices.push(Math.cos(ang) * radius, Math.sin(ang) * radius, height);

			var vecDiffSlice = vec3.fromValues(radius * (-Math.sin(ang)) * angle, radius * Math.cos(ang) * angle, 0);
			var vecDiffStack = vec3.fromValues(Math.cos(ang) * radius_diff, Math.sin(ang) * radius_diff, deltaHeight);
			vec3.cross(vecNormal, vecDiffSlice, vecDiffStack);
			vec3.normalize(vecNormal, vecNormal);

			this.normals.push(vecNormal[0], vecNormal[1], vecNormal[2]);
			this.texCoords.push(i / this.parts_sec, 1 - j / this.sec_height);

		}
	}

	this.indices = [];
	for (var j = 0; j < this.sec_height; ++j) {
		for (var i = 0; i < this.parts_sec; ++i) {
			this.indices.push(j * (this.parts_sec + 1) + i, j * (this.parts_sec + 1) + i + 1, (j + 1) * (this.parts_sec + 1) + i + 1);
			this.indices.push(j * (this.parts_sec + 1) + i, (j + 1) * (this.parts_sec + 1) + i + 1, (j + 1) * (this.parts_sec + 1) + i);
		}
	}



	this.primitiveType = this.scene.gl.TRIANGLES;
	this.initGLBuffers();
};

 MyCilinderLateral.prototype.setAmplif = function(ampS, ampT) {
    this.s = ampS;
    this.t = ampT;
    this.updateTexCoords();
};
