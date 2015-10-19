/**
 * MyTriangle
 * @constructor
 */
function MyTriangle(scene, x1, y1, z1, x2, y2, z2, x3, y3, z3) {
    CGFobject.call(this, scene);
    this.x1 = x1;
    this.y1 = y1;
    this.z1 = z1;
    this.x2 = x2;
    this.y2 = y2;
    this.z2 = z2;
    this.x3 = x3;
    this.y3 = y3;
    this.z3 = z3;

    this.vec3 = vec3.fromValues(x3 - x1, y3 - y1, z3 - z1);

    this.x = x1 + x2 + x3;
    this.y = y1 + y2 + y3;
    this.z = z1 + z2 + z3;

    this.s = 1;
    this.t = 1;

    this.initBuffers();
}
MyTriangle.prototype = Object.create(CGFobject.prototype);
MyTriangle.prototype.constructor = MyTriangle;


MyTriangle.prototype.initBuffers = function() {
    //criacao de vectores para associar ao triangulo
    this.vertices = [
        this.x1, this.y1, this.z1,
        this.x2, this.y2, this.z2,
        this.x3, this.y3, this.z3
    ];

    this.vec1 = vec3.fromValues(this.x2 - this.x1, this.y2 - this.y1, this.z2 - this.z1);
    this.vec2 = vec3.fromValues(this.x3 - this.x2, this.y3 - this.y2, this.z3 - this.z2);
    this.normal = vec3.create();
    vec3.cross(this.normal, this.vec1, this.vec2);
    vec3.normalize(this.normal, this.normal);

    this.normals = [
        this.normal[0], this.normal[1], this.normal[2],
        this.normal[0], this.normal[1], this.normal[2],
        this.normal[0], this.normal[1], this.normal[2]
    ];

    this.indices = [
        0, 1, 2
    ];

    this.a = Math.sqrt(this.vec1[0] * this.vec1[0] + this.vec1[1] * this.vec1[1] + this.vec1[2] * this.vec1[2]);
    this.b = Math.sqrt((this.x3 - this.x1) * (this.x3 - this.x1) + (this.y3 - this.y1) * (this.y3 - this.y1) + (this.z3 - this.z1) * (this.z3 - this.z1));
    this.c = Math.sqrt((this.x2 - this.x1) * (this.x2 - this.x1) + (this.y2 - this.y1) * (this.y2 - this.y1) + (this.z2 - this.z1) * (this.z2 - this.z1));
    this.cos_beta = (this.a * this.a - this.b * this.b + this.c * this.c) / (2 * this.a * this.c);
    this.sin_beta = Math.sqrt(1 - this.cos_beta * this.cos_beta);

    this.updateTexCoords();
    this.primitiveType = this.scene.gl.TRIANGLE_STRIP;
    this.initGLBuffers();

};

MyTriangle.prototype.setAmplif = function(ampS, ampT) {
    this.s = ampS;
    this.t = ampT;
    this.updateTexCoords();
};

MyTriangle.prototype.updateTexCoords = function() {
    this.texCoords = [
        0, 0,
        this.c / this.s, 0, (this.c - this.a * this.cos_beta) / this.s, (this.a * this.sin_beta) / this.t
    ];
}