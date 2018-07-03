function Ball(settings){
	this.outerW = document.documentElement.offsetWidth;
	this.outerH = document.documentElement.offsetHeight;
	this.vx = settings.speedH||Math.random()*5-2.5,
  this.vy = settings.speedV||Math.random()*5-2.5;
	this.x = settings.px||Math.random()*this.outerW;
	this.y = settings.py||Math.random()*this.outerH;
	this.color = settings.color;
	this.scale = settings.scale||1;
	this.radius = settings.radius?settings.radius*this.scale:20;
	this.lineWidth = 1;
	this.gradient = {
		startX:(Math.random()*1-0.5)*this.radius,
		startY:(Math.random()*1-0.5)*this.radius
	}
};
Ball.prototype.draw = function(ctx){
	ctx.save();
	ctx.translate(this.x,this.y);
	let gradient = ctx.createRadialGradient(this.gradient.startX,this.gradient.startY,0,0,0,this.radius);
	gradient.addColorStop(0,'#fff');
	gradient.addColorStop(0.2,'#fff');
	gradient.addColorStop(1,this.color);
	ctx.lineWidth = this.lineWidth;
	ctx.strokeStyle = this.color;
	ctx.fillStyle = gradient;
	ctx.beginPath();
	ctx.arc(0,0,this.radius,0,Math.PI*2);
	ctx.closePath();
	ctx.fill();
	ctx.stroke();
	ctx.restore()
};
export default Ball