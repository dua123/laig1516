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

	this.vertices = [];
	this.indices = [];
	this.normals = [];
	this.texCoords = [];
	this.radius_diff = (this.top_rad - this.bot_rad) / this.sec_height;
	//var heightDiff = radius_diff / this.sec_height;

	//lateral surface
	for (var j = 0; j <= this.sec_height; j++) {
		for (var i = 0; i <= this.parts_sec; i++) {

			var radius = this.bot_rad + this.radius_diff * j;
			var ang = i * angle;
			this.vertices.push(Math.cos(ang) * radius, Math.sin(ang) * radius, (this.height * j) / this.sec_height);
			this.normals.push(Math.cos(ang) * radius, Math.sin(ang) * radius, 0);
			this.texCoords.push(i * patchS, j * patchT);
			/*if(j==this.sec_height){
				console.log("ANG1 "+i+" x="+Math.cos(ang)*radius+" y="+Math.sin(ang)*radius+" z="+(this.height * j) / this.sec_height);
			}*/

			var radius = this.bot_rad + this.radius_diff * (j + 1);
			this.vertices.push(Math.cos(ang) * radius, Math.sin(ang) * radius, (this.height * (j + 1)) / this.sec_height);
			this.normals.push(Math.cos(ang) * radius, Math.sin(ang) * radius, 0);
			this.texCoords.push(i * patchS, (j + 1) * patchT);
			/*if(j==this.sec_height){
				console.log("ANG2 "+i+" x="+Math.cos(ang)*radius+" y="+Math.sin(ang)*radius+" z="+(this.height * (j+1)) / this.sec_height);
			}*/


			//		this.texCoords.push(0+i/this.slices,0+j/this.stacks);.

		}

		for (i = 0; i <= this.parts_sec; i++) {
			var n = j * 2 * this.parts_sec;
			this.indices.push(n + i * 2, n + i * 2 + 2, n + i * 2 + 1);
			this.indices.push(n + i * 2 + 2, n + i * 2 + 3, n + i * 2 + 1);
			if (j == this.sec_height) {
				console.log("IND1 " + i + " x=" + ((n + i * 2)-40*j)+ " y=" + ((n + i * 2 + 2)-40*j) + " z=" + ((n + i * 2 + 1)-40*j));
				console.log("IND2 " + i + " x=" + ((n + i * 2 + 2)-40*j) + " y=" + ((n + i * 2 + 3)-40*j) + " z=" + ((n + i * 2 + 1)-40*j));
			}
		}
		this.indices.push(n + (2 * this.parts_sec) - 2, n, n + (2 * this.parts_sec) - 1);
		this.indices.push(n, n + 1, n + (2 * this.parts_sec) - 1);
		if (j == this.sec_height) {
				console.log("IND3 " + i + " x=" + ((n + (2 * this.parts_sec) - 2)-40*j)+ " y=" + ((n)-40*j) + " z=" + ((n + (2 * this.parts_sec) - 1)-40*j));
				console.log("IND4 " + i + " x=" + ((n)-40*j) + " y=" + ((n + 1)-40*j) + " z=" + ((n + (2 * this.parts_sec) - 1)-40*j));
			}
	}



	this.primitiveType = this.scene.gl.TRIANGLES;
	this.initGLBuffers();
};