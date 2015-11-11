/**
 * LinearAnimation
 * @constructor
 */

 /*
 *		Movimentos no eixo X,z
 *		id= indentificação da linearidades escusado exitir
 *		span= tempo total do movimento
 *		Ctx= numero de pontos de movimento no eixo x
 *		Cty= numero de pontos de movimento no eixo y
 *		Ctz= numero de pontos de movimento no eixo z
 *		numPoints = numero pontos existem no array
 *      distancia_total= distacia total a precorer
 *		dist_entre_px=velocidade entre o pontox e x+1 no euxo x
 *		dist_entre_py=velocidade entre o pontoy e y+1 no euxo y
 * 		dist_entre_pz=velocidade entre o pontoy e z+1 no euxo z
 *      poslocal = possicao actual do movimento
 *
 */
function LinearAnimation(scene,id,span,type,Ctx,Cty,Ctz) {
	CGFobject.call(this, scene);
	
	this.id=id;
	this.span=span;
	this.type=type;
	this.numPoints = Ctx.length;
	this.Ctx=Ctx;
	this.Cty=Cty;
	this.Ctz=Ctz;
	this.distancia_total=0;
	this.dist_entre_px=[];
	this.dist_entre_py=[];
	this.dist_entre_pz=[];
	this.poslocal =0;

	this.matrix = mat4.create();

	this.initBuffers();

};

LinearAnimation.prototype = Object.create(CGFobject.prototype);
LinearAnimation.prototype.constructor = LinearAnimation;

LinearAnimation.prototype.initBuffers = function() {

	//calculo da distancia total da funcao
	for(var i =0 ; i<this.numPoints;i++){		
		var pointlLength =  Math.sqrt(this.Ctx[i]*this.Ctx[i] + this.Cty[i]*this.Cty[i] + this.Ctz[i]*this.Ctz[i]);
		//calcular a distancia total do no
		this.distance_total = this.distancia_total + pointlLength;
	}
	//velociadade em relação ao tempo
	this.espacounidade = this.distance_total  / this.span;

	//distanciar parciais que varia com o tempo
	for(var i =1;i<this.numPoints;i++)
	{
		this.dist_entre_px[i-1]=(this.Ctx[i]-this.Ctx[i-1])/this.distance_total;
		this.dist_entre_py[i-1]=(this.Cty[i]-this.Cty[i-1])/this.distance_total;
		this.dist_entre_pz[i-1]=(this.Ctz[i]-this.Ctz[i-1])/this.distance_total;
	}
	//a matrix fica com igual a identdade
	mat4.identity(this.matrix);

}
/*
*
*
*
*
*
*
*
*/
LinearAnimation.prototype.update = function() {

	this.poslocal++;
	console.log(this.poslocal);
};
