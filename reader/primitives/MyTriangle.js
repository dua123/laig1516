/**
 * MyTriangle
 * @constructor
 */
function MyTriangle(scene,x1,y1,z1,x2,y2,z2,x3,y3,z3) {
    CGFobject.call(this,scene);
    this.x1=x1;
    this.y1=y1;
    this.z1=z1;
    this.x2=x2;
    this.y2=y2;
    this.z2=z2;
    this.x3=x3;
    this.y3=y3;
    this.z3=z3;


    this.initBuffers();
}
MyTriangle.prototype = Object.create(CGFobject.prototype);
MyTriangle.prototype.constructor = MyTriangle;


MyTriangle.prototype.initBuffers = function () {
    //criacao de vectores para associar ao triangulo
      var vecA = vec3.fromValues(this.x1-this.x2, this.y1-this.y2, this.z1-this.z2);
	  var vecB = vec3.fromValues(this.x3-this.x1, this.y3-this.y1, this.z3-this.z1);
	  var vecC = vec3.fromValues(this.x3-this.x1, this.y3-this.y1, this.z3-this.z1);
	  var vecN = vec3.create();
	  vec3.cross(vecN, vecA, vecB);
	  vec3.normalize(vecN, vecN);

console.log(vec,N);
	 // this.normal = [vecN];

    this.primitiveType=this.scene.gl.TRIANGLE_STRIP;
    this.initGLBuffers();

};

