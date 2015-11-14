/**
  * Patch
  * @constructor
  */
 function Patch(scene, orderU,orderV,partsU,partsV,controlPonit) {
     CGFobject.call(this, scene);
      
      
      this.orderU= orderU;
      this.orderV= orderV;
      this.partU= partsU;
      this.partV= partsV;
      this.controlPonit = controlPonit;
      this.numberpointcontrol= controlPonit.lenght;


      this.surfaces = [];
   	  this.translations = [];
 this.initBuffers();
 
 };

Patch.prototype = Object.create(CGFobject.prototype);
Patch.prototype.constructor = Patch;

Patch.prototype.CreateKnots=function(parts)
{
	var knots;
	knots =[];
	for(var i =0 ; i<(parts*2);i++){
		if(i<parts){
			knots.push(0);
		}else
		{
			knots.push(1);
		}

	}
	return knots;
};

Patch.prototype.initBuffers = function() {
//funcao que queria pontos de controlPonit

    var knotsU = this.CreateKnots(this.orderU+1);
    var knotsV = this.CreateKnots(this.orderV+1);

    
  this.makeSurface("1", this.orderU, // degree on U: 2 control vertexes U
					 this.orderV, // degree on V: 2 control vertexes on V
					knotsU, // knots for U
					knotsV, // knots for V
					this.controlPonit
					, // translation of surface 
					[7.5,0,0]);


}
Patch.prototype.makeSurface = function (id, degree1, degree2, knots1, knots2, controlvertexes, translation) {
		
	var nurbsSurface = new CGFnurbsSurface(degree1, degree2, knots1, knots2, controlvertexes);
	getSurfacePoint = function(u, v) {
		return nurbsSurface.getPoint(u, v);
	};
	
	var obj = new CGFnurbsObject(this.scene, getSurfacePoint, this.partU,this.partV );
	
	this.surfaces.push(obj);	
	this.translations.push(translation);

};

Patch.prototype.display = function() {

				this.surfaces[0].display();
};