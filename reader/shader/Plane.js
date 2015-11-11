/**
  * Plane
  * @constructor
  */
 function Plane(scene,args) {
     CGFobject.call(this, scene);
     this.nivel= 3;
     this.point0 =args[0];
     this.point1 =args[1];
     this.point2 =args[2];
     this.point3 =args[3];

     var vecd=[];

     this.initBuffers();
 
 };

Plane.prototype = Object.create(CGFobject.prototype);
Plane.prototype.constructor = Plane;


Plane.prototype.initBuffers = function() {
      this.vertices = [
        this.point0[0], this.point0[1],
        this.point1[0], this.point1[1],
        this.point2[0], this.point2[1],
        this.point3[0], this.point3[1]
    ];
    vecd[0]=2;
    vecd[1]=2;
    vecd[2]=2;
}


Plane.prototype.recfunc = function(nivel,vec0,vec1,vec2) {
  
  if(nivel!=0)
  {
    
  }else
  {
    nivel -=1;
    var vectx,vecty,vectz;
    divide(vectx,vec0,vecd);
    divide(vecty,vec1,vecd);
    divide(vectx,vec2,vecd);
    recfunc(nivel,vectx,vecty,vectz);
  }

      
}

