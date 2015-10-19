 /**
  * MySphere
  * @constructor
  */
 function MySphere(scene, radius, rings, stacks) {
     CGFobject.call(this, scene);

     this.radius = radius;
     this.rings = rings;
     this.stacks = stacks;
  


     this.initBuffers();

 };

 MySphere.prototype = Object.create(CGFobject.prototype);
 MySphere.prototype.constructor = MySphere;

 MySphere.prototype.initBuffers = function() {

     this.indices = [];
     this.vertices = [];
     this.normals = [];
     this.texCoords = [];

     var theta = (2 * Math.PI) / this.rings;
     var phi = (2 * Math.PI) / this.stacks;


     for (var stack = 0; stack <= this.stacks; ++stack) {
         for (var ring = 0; ring <= this.rings; ++ring) {
             this.vertices.push(this.radius * Math.cos(theta * stack) * Math.sin(phi * ring));
             this.vertices.push(this.radius * Math.sin(theta * stack) * Math.sin(phi * ring));
             this.vertices.push(this.radius * Math.cos(phi * ring));

             this.normals.push(Math.sin(stack * theta) * Math.cos(ring * phi));
             this.normals.push(Math.sin(stack * theta) * Math.sin(ring * phi));
             this.normals.push(Math.cos(stack * theta));

             this.texCoords.push(ring/this.rings,stack/this.stacks)

         }

     }
     var nVertices = this.vertices.length / 3;
     for (stack = 0; stack < this.rings; stack++) {
         for (ring = 0; ring < this.stacks; ring++) {
             var sN = (this.rings + 1) * stack;
             this.indices.push(ring + sN);
             this.indices.push(ring + sN + 1);
             this.indices.push(ring + sN + this.rings + 2);
             this.indices.push((ring + sN + this.rings + 3) % nVertices);
             this.indices.push((ring + sN + this.rings + 2) % nVertices);
             this.indices.push((ring + sN + 1) % nVertices);
         }
     }



     this.primitiveType = this.scene.gl.TRIANGLES;
     this.initGLBuffers();
 }

 MySphere.prototype.setAmplif = function(ampS, ampT) {
    this.s = ampS;
    this.t = ampT;

};

 