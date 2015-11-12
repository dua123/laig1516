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

	this.matrix =[];

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
		this.dist_entre_px[i-1]=(this.Ctx[i]-this.Ctx[i-1])/this.espacounidade;
		this.dist_entre_py[i-1]=(this.Cty[i]-this.Cty[i-1])/this.espacounidade;
		this.dist_entre_pz[i-1]=(this.Ctz[i]-this.Ctz[i-1])/this.espacounidade;
	}
	//numero que conta as matrizes a introduzir
	var numMatrix=0;
	var pointPos =0;
	var pointx = this.Ctx[0];
	var pointy = this.Cty[0];
	var pointz = this.Ctz[0];
	var key = false;
	while(key==false){

		//criação da matriz e igualar a identidade
		this.matrix[numMatrix]= mat4.create();
		mat4.identity(this.matrix[numMatrix]);
	
		mat4.translate(this.matrix[numMatrix], this.matrix[numMatrix], [pointx, pointy, pointz]);
		console.log("ponto x =",pointx," e adicionado ",this.dist_entre_px[pointPos]);
		console.log("ponto y =",pointy," e adicionado ",this.dist_entre_py[pointPos]);
		console.log("ponto z =",pointx," e adicionado ",this.dist_entre_pz[pointPos]);
		pointx +=this.dist_entre_px[pointPos];
		pointy +=this.dist_entre_py[pointPos];
		pointz +=this.dist_entre_pz[pointPos];
		numMatrix++;
			if(pointx >= this.Ctx[pointPos] && pointy >= this.Cty[pointPos] && pointz >= this.Ctz[pointPos])	
			{
				pointPos++;		
				pointx =  this.Ctx[pointPos];
				pointy =  this.Cty[pointPos];
				pointz =  this.Ctz[pointPos];
		
			}
			console.log(this.matrix);
		if((this.numPoints-1)==pointPos){
			key=true;
		}
		
	}


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
LinearAnimation.prototype.update = function(Time) {

	
};
LinearAnimation.prototype.getmatrix = function(Time) {

	return this.matrix[Time];
};
