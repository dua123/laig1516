/**
  * Vehicle
  * @constructor
  */
 function Vehicle(scene) {
     CGFobject.call(this, scene);
	
 	 this.initBuffers();
 
 };

Vehicle.prototype = Object.create(CGFobject.prototype);
Vehicle.prototype.constructor = Vehicle;


Vehicle.prototype.initBuffers = function() {
		this.wing = new Patch(this.scene,2,5,40,40,		[[[ 0.0,  0.0, 0.0, 1 ],[ 0.0,  0.0,-1.0, 1 ],[ 0.0,  0.0,-1.0, 1 ],[ 2.0,  0.0, 2.0, 1 ],[  -2.0,  0.0, 2.0, 1 ],[ 0.0,  0.0, 0.0,  1.0]],
											  			 [[ 0.0,  2.0, 0.0, 1 ],[ 0.0,  2.0,-1.0, 1 ],[ 0.0,  2.0,-1.0, 1 ],[ 2.0,  2.0, 2.0, 1 ],[  -2.0,  2.0, 2.0, 1 ],[ 0.0,  2.0,  0.0, 1.0  ]],
											             [[ 0.0,  4.0, 0.0, 1 ],[ 0.0,  4.0,-1.0, 1 ],[ 0.0,  4.0,-1.0, 1 ],[ 2.0,  4.0, 2.0, 1 ],[  -2.0,  4.0, 2.0, 1 ],[ 0.0,  4.0,  0.0, 1.0   ]]]);//corrigir mais tarde

		this.tail = new MyCylinder(this.scene, 5, 0, 1, 8, 10);
		this.body = new MyCylinder(this.scene, 10, 1, 1, 8, 10);
		this.head = new MyCylinder(this.scene, 3, 1, 0, 8, 10);

}
Vehicle.prototype.display = function() {
  
	//this.translate(0,-6,0);
	//this.scale(0.5,0.5,0.5);
				this.scene.pushMatrix();
				this.scene.translate(0,0.0,-5);
				this.tail.display();
				this.scene.popMatrix();
				this.scene.pushMatrix();
				this.scene.rotate(Math.PI/2, 0, 0, 1);	
				this.scene.translate(0,0.5,3);
				this.wing.display();
				this.scene.popMatrix();
				this.scene.pushMatrix();
				this.scene.rotate(Math.PI/2, 0, 0, 1);	
				this.scene.translate(0,-4.5,3);
				this.wing.display();
				this.scene.popMatrix();
				this.scene.pushMatrix();
				this.body.display();
				this.scene.translate(0,0,10);
				this.head.display();
				this.scene.popMatrix();

};