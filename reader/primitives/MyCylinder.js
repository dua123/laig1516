/**
 * MyCilinder
 * @constructor
 */

 function MyCylinder(scene, height,bottonR,topR,slices,stacks) {
 	
 	CGFobject.call(this,scene);


 	this.lateral = new MyCilinderLateral(scene, slices, stacks);
 	this.top = new MyBase(scene,slices,0,topR);
 	this.down = new MyBase(scene,slices,1,bottonR);

 };

 MyCylinder.prototype = Object.create(CGFobject.prototype);
 MyCylinder.prototype.constructor = MyCylinder;

 MyCylinder.prototype.display = function() {
 	
 	this.lateral.display();
 	this.top.display();
 	this.down.display();
 };