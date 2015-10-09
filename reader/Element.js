 /**
 * Elemets
 * @constructor
 */
 function Element(scene,ident,tex) {
 	CGFobject.call(this, scene);

	this.texture = new CGFappearance(scene);
	this.texture.loadTexture(tex);

	this.texture.setAmbient(1,1,1.3,1);
	this.texture.setDiffuse(0.1,0.1,0.1,1);
	this.texture.setSpecular(0.9,0.9,0.9,1);
	this.texture.setShininess(100);

 	switch(ident) {
    case "rectangle":
    	this.elementV = new MyUnitCubeQuad(scene);
    break;
    case "cylinder":
        this.elementV = new MyCylinder(scene,20 ,20 );
     break;
    default:
        console.log("Identificao de elemento nao identificada");
    break;
    }
 };
 Element.prototype = Object.create(CGFobject.prototype);
 Element.prototype.constructor = Element;

 Element.prototype.display = function() {
    this.texture.apply();
        this.elementV.display();
 	
 };
