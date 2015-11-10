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



	this.endang = startang + rotang;

	this.ang = startang;
	this.velang = rotang / span;






};

//CircularAnimation.prototype = Object.create(CGFobject.prototype);
//CircularAnimation.prototype.constructor = CircularAnimation;



/*
*actualiza a funcao para movimento da peça 
*cada vez que hamada a funcao aumenta a funcão
*
*
*/

CircularAnimation.prototype.update = function(temp) {
	if(this.ang != this.endang){
		this.ang += this.velang; 

	}


};

/*
* aplicase as transvormações de movimento
*
*
*
*
*/
CircularAnimation.prototype.apply= function(temp){

		this.translate(this.Ctx,this.Cty,this.Ctz);
		this.translate(this.radios*Math.sin(ang), 0,this.radios*Math.cos(ang));


}