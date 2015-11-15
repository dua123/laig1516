function Animation(id, type, duration){
	this.id=id;
	this.type=type;
	this.duration=duration;
}

Animation.prototype.constructor = Animation;


Animation.prototype.calcMatrix = function() {
    var mat = mat4.create();
    mat4.identity(matrix);

    return matrix;
}