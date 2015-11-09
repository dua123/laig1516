/**
 * CircularAnimation
 * @constructor
 */
function CircularAnimation(scene,id,span,type,Ctx,Cty,Ctz,radios,startang,rotang) {
	CGFobject.call(this, scene);
	this.id=id;
	this.span=span;
	this.type=type;
	this.radios=radios;
	this.startang=startang;
	this.rotang=rotang;
	this.controllenght= Ctx.lenght;

	//adicao dos pontos de controlo
	for(var i in Ctx){
		this.Ctx[i]=Ctx;
		this.Cty[i]=Cty;
		this.Ctz[i]=Ctz;

	}




};

CircularAnimation.prototype = Object.create(CGFobject.prototype);
CircularAnimation.prototype.constructor = CircularAnimation;

CircularAnimation.prototype.initBuffers = function() {
	this.initGLBuffers();
};

CircularAnimation.prototype.update = function() {



};