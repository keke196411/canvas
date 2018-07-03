function Rocket(settings){
	this.x = 0;
	this.y = 0;
	this.vx = 0;
	this.vy = 0;
	this.radius = 25;
	this.rotation = 0;
	this.fire = false;
	this.img = settings.img;
}

Rocket.prototype.draw = function(ctx){
	ctx.save();
	ctx.lineWidth = 2;
	ctx.strokeStyle = '#fff';
	ctx.beginPath();
	ctx.translate(this.x,this.y);
	ctx.rotate(this.rotation);
	ctx.drawImage(this.img,-this.radius,-this.radius,2*this.radius,2*this.radius);
	/*ctx.moveTo(10,0);
	ctx.lineTo(-10,10);
	ctx.lineTo(-5,0);
	ctx.lineTo(-10,-10);*/
	ctx.closePath();
	ctx.stroke();
	if(this.fire){
		ctx.save();
		ctx.strokeStyle = 'red';
		ctx.fillStyle = 'red';
		ctx.beginPath();
		ctx.moveTo(this.radius*Math.cos(195/180*Math.PI),this.radius*Math.sin(195/180*Math.PI));
		ctx.lineTo(-2*this.radius,0);
		ctx.lineTo(this.radius*Math.cos(165/180*Math.PI),this.radius*Math.sin(165/180*Math.PI));
		ctx.closePath();
		ctx.stroke();
		ctx.fill();
		ctx.restore()
	};
	ctx.restore()
}

export default Rocket