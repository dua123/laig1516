function Node(){
	this.id=null;
	this.material=null;
	this.texture=null;
	this.m=null;
	this.descendents=[];
}

Node.prototype.push=function(nodeName){
	this.descendents.push(nodeName);
};

Node.prototype.setMatrix=function(m){
	this.m=mat4.clone(m);
	console.log(this.m);
};