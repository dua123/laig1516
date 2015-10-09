 /**
 * Elemets
 * @constructor
 */
 function Elemets(scene,ident) {
 	//CGFobject.call(this, scene);


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
 Elemets.prototype = Object.create(CGFobject.prototype);
 Elemets.prototype.constructor = Elemets;

 Elemets.prototype.display = function() {
        this.elementV.display();
 	
 };
