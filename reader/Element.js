 /**
  * Elemets
  * @constructor
  */
 function Element(scene, type, args) {
     CGFobject.call(this, scene);

     /*this.texture = new CGFappearance(scene);
	this.texture.loadTexture(tex);

	this.texture.setAmbient(1,1,1.3,1);
	this.texture.setDiffuse(0.1,0.1,0.1,1);
	this.texture.setSpecular(0.9,0.9,0.9,1);
	this.texture.setShininess(100);*/

     switch (type) {
         case "rectangle":
             var xt = args[0];
             var yt = args[1];
             var xb = args[2];
             var yb = args[3];
             this.elementV = new MyUnitCubeQuad(scene, xt, yt, xb, yb);
             break;
         case "cylinder":
         //falta alterar os argumentos do climdro
             this.elementV = new MyCylinder(scene, 20, 20);
             break;
         case "sphere":
         //falta alterar os argumentos do climdro
             this.elementV = new MySphere(scene,2, 50,50);
             break;
         default:
             console.log("Identificao de elemento nao identificada");
             break;
     }
 };
 Element.prototype = Object.create(CGFobject.prototype);
 Element.prototype.constructor = Element;

 Element.prototype.display = function() {
     //this.texture.apply();
     this.elementV.display();

 };