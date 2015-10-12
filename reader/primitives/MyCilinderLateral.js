/**
 * MyCilinderLateral
 * @constructor
 */
 function MyCilinderLateral(scene, slices, stacks) {
 	CGFobject.call(this,scene);
	
	this.slices=slices;
	this.stacks=stacks;

 	this.initBuffers();
 };

 MyCilinderLateral.prototype = Object.create(CGFobject.prototype);
 MyCilinderLateral.prototype.constructor = MyCilinderLateral;

 MyCilinderLateral.prototype.initBuffers = function() {
 	
 	var angle = (2*Math.PI)/this.slices;
 	var zLength = 1.0/ this.stacks;

 	this.vertices = [];
 	this.indices = [];
 	this.normals = [];
 	this.texCoords = [];
	
	//lateral surface
	for(var j=0; j <= this.stacks; j++){
		for (var i = 0; i <= this.slices; i++) {

			var ang = i*angle;
			this.vertices.push(Math.cos(ang), Math.sin(ang), 1-j*zLength);
			this.normals.push(Math.cos(ang), Math.sin(ang),0);
			this.texCoords.push(0+i/this.slices,0+j/this.stacks);
		}
	}
	

	for(var j=0; j < this.stacks; j++){
		for (var i = 0; i < this.slices; i++) {
			
			var upInd = j*(this.slices+1);
			var downInd = (j+1)*(this.slices+1);
		
			this.indices.push(upInd + i,downInd + i,upInd + (i+1));
			this.indices.push(downInd + (i+1),upInd + (i+1) ,downInd+i);
		}
	}

 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };
