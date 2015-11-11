 /**
  * Animation
  * @constructor
  */
 function Animation(scene, type, args) {
     CGFobject.call(this, scene);

     switch (type) {
         case "linear":
             this.id = args[0];
             this.span = args[1];
             this.type = args[2];
             this.Cpx = args[3][0];
             this.Cpy = args[3][1];
             this.Cpz = args[3][2];
             this.animationNode = new LinearAnimation(this.scene,this.id,this.span,this.type,this.Cpx,this.Cpy,this.Cpz);
          break;
          case "circular":
             this.id = args[0];
             this.span = args[1];
             this.type = args[2];
             this.Ctx = args[3][0];
             this.Cty = args[3][1];
             this.Ctz = args[3][2];
             this.radios = args[4];
             this.startang = args[5];
             this.rotang = args[6];
             this.animationNode = new CircularAnimation(this.scene,this.id,this.span,this.type,this.Ctx,this.Cty,this.Ctz,this.radios,this.startang,this.rotang);
          break;
         default:
             console.log("Identificao de Animationo nao identificada");
             break;
     }
 };

 Animation.prototype = Object.create(CGFobject.prototype);
 Animation.prototype.constructor = Animation;
/*
 Animation.prototype.display = function() {
     this.AnimationV.display();

 };*/
Animation.prototype.update = function(currTime) {

//actuliza unidade a unidade cada vez 
if (currTime%100 == 0)
  this.animationNode.update();

};
