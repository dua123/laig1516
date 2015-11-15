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
											             [[ 0.0,  4.0, 0.0, 1 ],[ 0.0,  4.0,-1.0, 1 ],[ 0.0,  4.0,-1.0, 1 ],[ 2.0,  4.0, 2.0, 1 ],[  -2.0,  4.0, 2.0, 1 ],[ 0.0,  4.0,  0.0, 1.0   ]]]);//co

		
		this.wingendleft = new Patch(this.scene,2,5,40,40,	[[[ 0.0,  0.0, 0.0, 1 ],[ 0.0,  0.0,-1.0, 1 ],[ 0.0,  0.0,-1.0, 1 ],[ 2.0,  0.0, 2.0, 1 ],[  -2.0,  0.0, 2.0, 1 ],[ 0.0,  0.0, 0.0,  1.0]],
											  			 [[ 0.0,  1.0, 0.0, 1 ],[ 0.0,  1.0,-1.0, 1 ],[ 0.0,  1.0, 0.0, 1 ],[ 1.0,  1.0, 2.0, 1 ],[  -1.0,  1.0, 2.0, 1 ],[ 0.0,  1.0,  0.0, 1.0  ]],
											             [[ 0.0,  2.0, 0.0, 1 ],[ 0.0,  2.0,-1.0, 1 ],[ 0.0,  2.0, 0.0, 1 ],[ 0.0,  2.0, 2.0, 1 ],[   0.0,  2.0, 2.0, 1 ],[ 0.0,  2.0,  0.0, 1.0   ]]]);//co
		
	    this.wingendright = new Patch(this.scene,2,5,40,40,	[[[ 0.0,  0.0, 0.0, 1 ],[ 0.0,  0.0,-1.0, 1 ],[ 0.0,  0.0,-1.0, 1 ],[ 0.0,  0.0, 2.0, 1 ],[   0.0,  0.0, 2.0, 1 ],[ 0.0,  0.0, 0.0,  1.0]],
											  			 	 [[ 0.0,  1.0, 0.0, 1 ],[ 0.0,  1.0,-1.0, 1 ],[ 0.0,  1.0, 0.0, 1 ],[ 1.0,  1.0, 2.0, 1 ],[  -1.0,  1.0, 2.0, 1 ],[ 0.0,  1.0,  0.0, 1.0  ]],
											             	 [[ 0.0,  2.0, 0.0, 1 ],[ 0.0,  2.0,-1.0, 1 ],[ 0.0,  2.0, 0.0, 1 ],[ 2.0,  2.0, 2.0, 1 ],[  -2.0,  2.0, 2.0, 1 ],[ 0.0,  2.0,  0.0, 1.0   ]]]);//co
		
		this.wingtail = new Patch(this.scene,2,3,40,40,	[[[ 0.0,  0.0, 0.0, 1 ],[ 1.0,  0.0,3.0, 1 ],[ -1.0,  0.0, 3.0, 1 ],[ 0.0,  0.0, 0.0, 1 ]],
											  			 [[ 0.0,  1.0, 0.0, 1 ],[ 0.5,  1.0,1.0, 1 ],[ -0.5,  1.0, 1.0, 1 ],[ 0.0,  1.0, 0.0, 1 ]],
											             [[ 0.0,  2.0, 0.0, 1 ],[ 0.0,  2.0,0.0, 1 ],[  0.0,  2.0, 0.0, 1 ],[ 0.0,  2.0, 0.0, 1 ]]]);
		this.tail = new MyCylinder(this.scene, 5, 0.1, 1, 8, 10);
		this.body = new MyCylinder(this.scene, 10, 1, 1, 8, 10);
		this.head = new MyCylinder(this.scene, 3, 1, 0.4, 8, 10);

}
Vehicle.prototype.display = function() {
  

	//assa da calda centaral
				this.scene.pushMatrix();
						this.scene.scale(1.5,1.5,1.5);
						this.scene.translate(0,0.0,-3);
						this.wingtail.display();
				this.scene.popMatrix();
	//assa da calda esquerda
				this.scene.pushMatrix();
						this.scene.rotate(Math.PI/2, 0, 0, 1);	
						this.scene.translate(0,0.0,-4);
						this.wingtail.display();
				this.scene.popMatrix();
	//assa da calda direicta
				this.scene.pushMatrix();
						this.scene.rotate(-Math.PI/2, 0, 0, 1);	
						this.scene.translate(0,0.0,-4);
						this.wingtail.display();
				this.scene.popMatrix();
	//calda
				this.scene.pushMatrix();
					this.scene.translate(0,0.0,-5);
					this.tail.display();
				this.scene.popMatrix();
	//final da assa esquerda
				this.scene.pushMatrix();
						this.scene.rotate(Math.PI/2, 0, 0, 1);	
						this.scene.translate(0,4.5,3);
						this.wingendleft.display(); 
				this.scene.popMatrix();

	//final da assa direita
				this.scene.pushMatrix();
						this.scene.rotate(Math.PI/2, 0, 0, 1);	
						this.scene.translate(0,-6.4,2.9);
						this.wingendright.display(); 
				this.scene.popMatrix();
	//assa esquerda
				this.scene.pushMatrix();
					this.scene.rotate(Math.PI/2, 0, 0, 1);	
					this.scene.translate(0,0.5,3);
					this.wing.display();
				this.scene.popMatrix();
	//assa direita
				this.scene.pushMatrix();
					this.scene.rotate(Math.PI/2, 0, 0, 1);	
					this.scene.translate(0,-4.5,3);
					this.wing.display();
				this.scene.popMatrix();
	//corpo e cabeça
				this.scene.pushMatrix();
					this.body.display();
					this.scene.translate(0,0,10);
					this.head.display();
				this.scene.popMatrix();

};