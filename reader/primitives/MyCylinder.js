/**
 * MyCilinder
 * @constructor
 */

 function MyCylinder(scene, height, bot_rad, top_rad, sec_height, parts_sec) {
 	
 	CGFobject.call(this,scene);


 	this.lateral = new MyCilinderLateral(scene, height, bot_rad, top_rad, sec_height, parts_sec);
 	//this.top = new MyBase(scene,slices,0,topR);
 	//this.down = new MyBase(scene,slices,1,bottonR);

 };

 MyCylinder.prototype = Object.create(CGFobject.prototype);
 MyCylinder.prototype.constructor = MyCylinder;

 MyCylinder.prototype.display = function() {
 	
 	this.lateral.display();
 	//this.top.display();
 //	this.down.display();
 };

MyCylinder.prototype.setAmplif = function(ampS, ampT) {
  this.lateral.setAmplif(amS,ampT);
};