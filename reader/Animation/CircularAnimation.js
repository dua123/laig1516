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

	//centro da circuferencia
	this.Ctx=Ctx;
	this.Cty=Cty;
	this.Ctz=Ctz;

	this.matrix = mat4.create();

	this.initBuffers();


};

CircularAnimation.prototype = Object.create(CGFobject.prototype);
CircularAnimation.prototype.constructor = CircularAnimation;


CircularAnimation.prototype.initBuffers = function() {

	this.endang = startang + rotang;

	this.ang = startang;
	this.velang = rotang / span;

	mat4.identity(this.matrix);
	
}
/*
*actualiza a funcao para movimento da peça 
*cada vez que hamada a funcao aumenta a funcão
*
*
*/

CircularAnimation.prototype.update = function() {

	if(this.ang!=this.endang){
		mat4.identity(this.matrix);
		this.posrot+=this.velang;
		mat4.translate(this.matrix, this.matrix, [this.Ctx+this.radios, this.Cty, this.Ctz]);
		mat4.rotate(this.matrix, this.matrix, (Math.PI * angle) / 180,  [0, 1, 0]);
		
		return this.matrix;
	}

};
