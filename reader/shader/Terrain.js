/**
  * Terrain
  * @constructor
  */
 function Terrain(scene,args) {
     CGFobject.call(this, scene);
     this.nivel= 3;
     this.point0 =args[0];
     this.point1 =args[1];
     this.point2 =args[2];
     this.point3 =args[3];

     var vecd=[];

     this.initBuffers();
 
 };

Terrain.prototype = Object.create(CGFobject.prototype);
Terrain.prototype.constructor = Terrain;


Terrain.prototype.initBuffers = function() {

    this.texCoords = this.nonScaledTexCoords.slice(0);

    this.primitiveType=this.scene.gl.TRIANGLES;

    this.initGLBuffers();
}


