/**
 * MyBase
 * @constructor
 */
function MyBase(scene, slices, baseIndex,radios) {
    CGFobject.call(this, scene);

    this.radios = radios;
    this.slices = slices;
    this.baseIndex = baseIndex;

    this.minS = 0;
    this.minT = 0;
    this.maxS = 1;
    this.maxT = 1;


    this.initBuffers();
};

MyBase.prototype = Object.create(CGFobject.prototype);
MyBase.prototype.constructor = MyBase;

MyBase.prototype.initBuffers = function() {

    var angle = (2 * Math.PI) / this.slices;

    var centroX = (this.maxS + this.minS) / 2;
    var centroY = (this.maxT + this.minT) / 2;

      var raioX = this.radios;
      var raioY = this.radios; 

    this.vertices = [];
    this.indices = [];
    this.normals = [];
    this.texCoords = [];

    //bases

    if (this.baseIndex == 0) {
        for (var i = 0; i <= this.slices; i++) {

            var ang = i * angle;
            this.vertices.push(Math.cos(ang), Math.sin(ang), 1);
            this.normals.push(0, 0, 1);

            this.texCoords.push(centroX + raioX * Math.cos(ang), this.maxT - centroY - raioY * Math.sin(ang));
        }

        this.vertices.push(0, 0, 1);
        this.normals.push(0, 0, 1);
        this.texCoords.push(0.5, 0.5);

        size = (this.slices + 1);


        for (var i = 0; i < this.slices; i++)
            this.indices.push(size, i, i + 1);


        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    } else {
        for (var i = 0; i <= this.slices; i++) {

            var ang = i * angle;
            this.vertices.push(Math.cos(ang), Math.sin(ang), 0);
            this.normals.push(0, 0, -1);

          	this.texCoords.push(centroX - raioX * Math.cos(ang), this.maxT - centroY - raioY * Math.sin(ang));
        }

        this.vertices.push(0, 0, 0);
        this.normals.push(0, 0, -1);
        this.texCoords.push(0.5, 0.5);

        size = (this.slices + 1);


        for (var i = 0; i < this.slices; i++)
            this.indices.push(size, i+1, i);


        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
};