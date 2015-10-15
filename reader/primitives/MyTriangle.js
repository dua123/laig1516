/**
 * MyTriangle
 * @constructor
 */
function MyTriangle(scene,x1,y1,z1,x2,y2,z2,x3,y3,z3) {
    CGFobject.call(this,scene);
  
    this.vec1=vec3.fromValues(x1-x2,y1-y2,z1-z2);
    this.vec2=vec3.fromValues(x2-x3,y2-y3,z2-z3);
    this.vec3=vec3.fromValues(x3-x1,y3-y1,z3-z1);

    this.x=x1+x2+x3;
    this.y=y1+y2+y3;
    this.z=z1+z2+z3;


    this.initBuffers();
}
MyTriangle.prototype = Object.create(CGFobject.prototype);
MyTriangle.prototype.constructor = MyTriangle;


MyTriangle.prototype.initBuffers = function () {
    //criacao de vectores para associar ao triangulo
    this.vertices =[
        this.vec1[0],this.vec1[1],this.vec1[2],
        this.vec2[0],this.vec2[1],this.vec2[2],
        this.vec3[0],this.vec3[1],this.vec3[2]
    ]
      this.normals = [
        0.0,  0.0,  this.x,
        0.0,  0.0,  this.y,
        0.0,  0.0,  this.z
    ];
        
        this.indices = [
        0, 1, 2
    ];


    this.primitiveType=this.scene.gl.TRIANGLE_STRIP;
    this.initGLBuffers();

};

