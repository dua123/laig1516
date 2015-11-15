function LinearAnimation(id, duration, controlPoints) {
	Animation.Call(this.id, "linear", duration);
	this.controlPoints = controlPoints;

	this.init();
}

/*
1-for cicle
	1.1- subtract control point (n) por subtract point (n-1)	
	1.2- create yy projection: vector from 1.1 but y=0
	1.3- check rotation sign: if y proj <0 -> ->1  if not -> 1
	1.4- rotation: sign * acos of dot product of y proj and a [0,0,1] matrix, dividing by projy length
	1.5 ad vector legth to total distance
2- calculate velocity d/t
3-for cicle
	3.1- calculate time at that cp
	3.2- calculate cp duration
	*/

LinearAnimation.prototype = Object.create(Animation.prototype);
LinearAnimation.prototype.constructor = LinearAnimation;

LinearAnimation.prototype.init = function() {
	var dist = 0;
	this.trans = [];
	this.trans.length = this.controlPoints.length - 1;
	this.rots = [];
	this.rots.length = this.controlPoints.length - 1;

	for (var i = 1; i < this.controlPoints.length) {
		var new_vec = vec3.create();
		vec3.subtract(new_vec, this.controlPoints[i], this.controlPoints[i - 1]);
		var xzProj = vec3.fromValues(new_vec[0], 0, new_vec[2]);
		trans[i - 1] = new_vec;
		var n = 1;
		if (xzProj < 0)
			n = -1;
		var rot = n * Math.acos(vec3.dot(xzProj, vec3.fromValues(0, 0, 1)) / vec3.length(xzProj));
		rots[i - 1] = rot;

		dist += vec3.length(new_vec);
	}
	var vel = dist / this.duration;

	this.curTime = [];
	this.curTime.length = this.controlPoints.length - 1;
	this.curTime[0] = 0;

	this.controlPointDuration = [];
	this.controlPointDuration.length.controlPoints.length - 1;

	for (var i = 1; i < this.controlPoints.length) {
		this.curTime[i] = this.curTime[i - 1] + vec3.length(trans[i - 1]) / vel;
		this.controlPointDuration[i - 1] = this.curTime[i] - this.curTime[i - 1];
	}
}

/*
1- create a ident matrix
2-check if time is lower than 0, if so return ^ matrix
3-check every control point time (curTime) if they're  lower than time



*/
LinearAnimation.prototype.updateMatrix = function(time) {
	var mat = mat4.create();
	mat4.identity(mat);

	if (time < 0)
		return mat;

	time = Math.min(time, this.duration);

	for (var i = this.curTime.length - 1; i > 0; i--) {
		if (this.curTime[i] < time)
			break;
	}

	var timeScale = (time - this.curTime[i]) / this.controlPointDuration[i];
	var position = vec3.clone(this.controlPoints[i]);
	var translation_amount = vec3.create();
	vec3.scale(translation_amount, this.translations[i], timeScale);
	vec3.add(position, position, translation_amount);

	mat4.translate(mat, mat, position);
	mat4.rotateY(mat, mat, this.rotations[i]);



	return mat;
}