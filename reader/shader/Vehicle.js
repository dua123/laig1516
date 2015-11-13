/**
  * Vehicle
  * @constructor
  */
 function Vehicle(scene, order,partsU,partsV,controlPonit) {
     CGFobject.call(this, scene);
      
      this.order= order;
      this.partU= partsU;
      this.partV= partsV;
      this.controlPonit = controlPonit;
      this.surfaces = [];
   	  this.translations = [];

 this.initBuffers();
 
 };

Vehicle.prototype = Object.create(CGFobject.prototype);
Vehicle.prototype.constructor = Vehicle;


Vehicle.prototype.initBuffers = function() {


    
  this.makeSurface(this.order, this.partU, // degree on U: 2 control vertexes U
					 this.partV, // degree on V: 2 control vertexes on V
					[0, 0, 1, 1], // knots for U
					[0, 0, 1, 1], // knots for V
					[	// U = 0
						[ // V = 0..1;
							 [0,0, 0.0, 1 ],
							 [0.0,  0.0, -1.0, 1 ]
							
						],
						// U = 1
						[ // V = 0..1
							 [ 1.0, 0.0, 0.0, 1 ],
							 [ 1.0,  0.0, -1.0, 1 ]							 
						]
					], // translation of surface 
					this.controlPonit);


}
Vehicle.prototype.makeSurface = function (id, degree1, degree2, knots1, knots2, controlvertexes, translation) {
		
	var nurbsSurface = new CGFnurbsSurface(degree1, degree2, knots1, knots2, controlvertexes);
	getSurfacePoint = function(u, v) {
		return nurbsSurface.getPoint(u, v);
	};
	
	var obj = new CGFnurbsObject(this.scene, getSurfacePoint, 1,1 );
	
	this.surfaces.push(obj);	
	this.translations.push(translation);

};

Vehicle.prototype.display = function() {
  
				this.surfaces[0].display();
};