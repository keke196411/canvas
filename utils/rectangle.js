function Rect(settings){
	this.vx = settings.vx,
  this.vy = settings.vy;
	this.x = settings.px;
	this.y = settings.py;
	this.color = settings.color;
	this.width = settings.width;
	this.height = settings.height;
	this.lineWidth = 1;
}
Rect.prototype.draw = function(ctx){
	ctx.save();
	ctx.translate(this.x,this.y);
	ctx.lineWidth = this.lineWidth;
	ctx.fillStyle = this.color;
	ctx.fillRect(0,0,this.width,this.height);
	ctx.restore()
}
export default Rect