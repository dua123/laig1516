 /**
  * Animation
  * @constructor
  */
 function Animation(scene, type, args,s,t) {
     CGFobject.call(this, scene);

     switch (type) {
         case "linear":
             this.id = args[0];
             this.span = parseFloat(args[1]);
             this.type = args[2];
             this.Cpx = parseFloat(args[3]);
             this.Cpy = parseFloat(args[4]);
             this.Cpz = parseFloat(args[5]);
             this.animationNode = new CircularAnimation(this.scene,xt,yt,xb,yb);
          break;
          case "circular":
             this.id = args[0];
             this.span = parseFloat(args[1]);
             this.type = args[2];
             this.Ctx = parseFloat(args[3]);
             this.Cty = parseFloat(args[4]);
             this.Ctz = parseFloat(args[5]);
             this.radios = parseFloat(args[6]);
             this.startang = parseFloat(args[7]);
             this.rotang = parseFloat(args[8]);
          break;
         default:
             console.log("Identificao de Animationo nao identificada");
             break;
     }
 };
 /*
 Animation.prototype = Object.create(CGFobject.prototype);
 Animation.prototype.constructor = Animation;

 Animation.prototype.display = function() {
     this.AnimationV.display();

 };
Animation.prototype.setAmplif = function(ampS, ampT) {
this.AnimationV.setAmplif(ampS,ampT);
};

 

*/