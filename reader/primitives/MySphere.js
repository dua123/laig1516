 /**
  * MySphere
  * @constructor
  */
 function MySphere(scene, radius, rings, stacks) {
     CGFobject.call(this, scene);

     this.radius = radius;
     this.rings = rings;
     this.stacks = stacks;


     this.s = 1;
     this.t = 1;


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

         }
         this.updateTexCoords();
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
     this.updateTexCoords();
 };

 MySphere.prototype.updateTexCoords = function() {
     var text_heigth = Math.PI * this.radius / this.t;
     var text_length = (2 * Math.Pi * this.radius) / this.s;

     for (var stack = 0; stack <= this.stacks; ++stack) {
         for (var ring = 0; ring <= this.rings; ++ring) {
             this.texCoords.push(text_length * (1 - ring / this.rings), (text_heigth * stack) / this.stacks);
             this.texCoords.push(text_length * (1 - (ring + 1) / this.rings), (text_heigth * stack) / this.stacks);
             this.texCoords.push(text_length * (1 - ring / this.rings), (text_heigth * (stack + 1)) / this.stacks);
             this.texCoords.push(text_length * (1 - (ring + 1) / this.rings), (text_heigth * (stack + 1)) / this.stacks);
         }
     }
 }