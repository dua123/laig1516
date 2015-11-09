/**
 * LinearAnimation
 * @constructor
 */
function LinearAnimation(scene,id,span,type,Ctx,Cty,Ctz) {
	CGFobject.call(this, scene);
	
	this.id=id;
	this.span=span;
	this.type=type;
	this.Ctx=Ctx;
	this.Cty=Cty;
	this.Ctz=Ctz; 
	for
	

};

LinearAnimation.prototype = Object.create(CGFobject.prototype);
LinearAnimation.prototype.constructor = LinearAnimation;

LinearAnimation.prototype.initBuffers = function() {
	this.initGLBuffers();
};

LinearAnimation.prototype.update = function(temp) {



};