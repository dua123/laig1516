/**
 * CircularAnimation
 * @constructor
 */
function CircularAnimation(scene,id,span,type,Ctx,Cty,Ctz,radios,startang,rotang) {
	CGFobject.call(this, scene);
	this.id=id;
	this.span=span;
	this.type=type;
	this.Ctx=Ctx;
	this.Cty=Cty;
	this.Ctz=Ctz;
	this.radios=radios;
	this.startang=startang;
	this.rotang=rotang;


	this.initBuffers();
};

CircularAnimation.prototype = Object.create(CGFobject.prototype);
CircularAnimation.prototype.constructor = CircularAnimation;

CircularAnimation.prototype.initBuffers = function() {
	this.initGLBuffers();
};

CircularAnimation.prototype.update = function() {



};