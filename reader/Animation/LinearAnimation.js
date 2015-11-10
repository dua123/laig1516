/**
 * LinearAnimation
 * @constructor
 */
function LinearAnimation(scene,id,span,type,Ctx,Cty,Ctz) {
	CGFobject.call(this, scene);
	
	this.id=id;
	this.span=span;
	this.type=type;
	//calculo da distancia total da funcao
	for(var i in Ctx.lenght){
		this.Ctx[i]=Ctx[i];
		this.Cty[i]=Cty[i];
		this.Ctz[i]=Ctz[i];
		
		
		var pointlLength =  Math.sqrt(Ctx[i]*Ctx[i] + Cty[i]*Cty[i] + Ctz[i]*Ctz[i]);

		this.distance_total = distancia_total +pointlLength;
	}
	this.espacounidade = this.distance_total  / this.span;
	this.poslocal =0;

};

//LinearAnimation.prototype = Object.create(CGFobject.prototype);
//LinearAnimation.prototype.constructor = LinearAnimation;



LinearAnimation.prototype.update = function(temp) {



};

LinearAnimation.prototype.apply = function(temp) {



};