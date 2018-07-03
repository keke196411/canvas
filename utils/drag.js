export default (()=>{
	function Dragger(option){
		this.changeable = option.changeable||false;
		this._orig = option.from;
		this._dest = option.to;
    	this.pathGap = 1;
    	this.pathWidth = 3;
		this.dragging = false;
		this.draggingLine = null;
		this.init()
	};
	Dragger.prototype.init = function(){
		let _this = this;
		this._orig.each((i,el)=>{
			let linkTop = el.getBoundingClientRect().top+el.offsetHeight/2
			el.rightPoint = [el.getBoundingClientRect().right,linkTop];
			el.origIndex = i;
			$(el).addClass("left-linker");
		});
		this._dest.each((i,el)=>{
			let linkTop = el.getBoundingClientRect().top+el.offsetHeight/2
			el.leftPoint = [el.getBoundingClientRect().left,linkTop];
			el.destIndex = i;
			$(el).addClass("right-linker");
		});
		this._orig.on("mousedown",function(e){
			let begining = this;
			let rightP = this.rightPoint,
				origPosX = rightP[0],
				origPosY = rightP[1],
				origIndex = this.origIndex,
				line,path;
			this.line&&$(this.line).remove();
			$(window).on("mousemove",function(e){
				let curtPosX = e.pageX,
					curtPosY = e.pageY,
					distanceX = curtPosX-origPosX,
					distanceY = curtPosY-origPosY;
				if(distanceX>=5){
					let w = distanceX,
						h = Math.max(Math.abs(distanceY),4),
                    gap = _this.pathGap;
					if(!line){
						$("body").append(`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" id="line_${origIndex}" style="position:fixed;z-index:100;top:${distanceY>0?rightP[1]:rightP[1]-h}px;left:${rightP[0]}px;pointer-events:none;">
							<path class="conponent-linker" d="M ${distanceY>0?gap+" "+gap:gap+" "+(h-gap)} L ${distanceY>0?(w-gap)+" "+(h-gap):(w-gap)+" "+gap}" stroke="#4d84fe" stroke-width="${_this.pathWidth}" pointer-events="visiblePainted">
						</svg>`);
						line = $(`#line_${origIndex}`);
						path = line.find("path");
						path.click(function(){
							if(!$(this).hasClass("active")) $(this).attr("stroke","red").addClass("active")
						else $(this).attr("stroke","#4d84fe").removeClass("active")
						});
						_this.draggingLine = line.get(0);
						_this.draggingLine.begining = begining;
					}else{
						line.attr({"width":w,"height":h}).css("top",`${distanceY>0?rightP[1]:rightP[1]-h}px`);
						path.attr("d",`M ${distanceY>0?gap+" "+gap:gap+" "+(h-gap)} L ${distanceY>0?(w-gap)+" "+(h-gap):(w-gap)+" "+gap}`)
					}
				}
				
			})
		});
		this._dest.on("mouseup mousedown",function(e){
			if(_this.draggingLine){
				let leftP = this.leftPoint,
					line = _this.draggingLine,
					path = line.children[0],
					from = line.begining,
					distanceY = leftP[1]-from.rightPoint[1],
					w = leftP[0]-from.rightPoint[0],
					h = Math.max(Math.abs(distanceY),4),
                gap = _this.pathGap;
				$(window).off("mousemove");
				$(line).attr({"width":w,"height":h});
				from.line = line;
				line.ending = this;
				$(path).attr("d",`M ${distanceY>0?gap+" "+gap:gap+" "+(h-gap)} L ${distanceY>0?(w-gap)+" "+(h-gap):(w-gap)+" "+gap}`);
				_this.draggingLine = null
			}
		});
	};
	Dragger.prototype.reset = function(from,to){
		this._orig.off("mousedown");
		this._dest.off("mouseup mousedown");
		this._orig = from;
		this._dest = to;
		this.init()
	};
	Dragger.prototype.deleteLine = function(target){
		target.remove();
		target.get(0).begining.line = null;
	};
	Dragger.prototype.connect = function(target,dest){
		let _this = this;
		let left = target.get(0).rightPoint,
			lineId = `line_${target.get(0).origIndex}`,
			right = dest.get(0).leftPoint,
			w = right[0] - left[0],
			distanceY = right[1] - left[1],
			h = Math.max(Math.abs(distanceY),4),
        gap = _this.pathGap;
		$("body").append(`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" id="${lineId}" style="position:fixed;z-index:100;top:${distanceY>0?left[1]:left[1]-h}px;left:${left[0]}px;pointer-events:none;">
			<path class="conponent-linker" d="M ${distanceY>0?gap+" "+gap:gap+" "+(h-gap)} L ${distanceY>0?(w-gap)+" "+(h-gap):(w-gap)+" "+gap}" stroke="#4d84fe" stroke-width="${_this.pathWidth}" pointer-events="visiblePainted">
		</svg>`);
		let line = $(`#${lineId}`);
		let path = line.find("path");
		path.click(function(){
			if(!$(this).hasClass("active")) $(this).attr("stroke","red").addClass("active")
			else $(this).attr("stroke","#4d84fe").removeClass("active")
		});
		target.get(0).line = line.get(0);
		line.get(0).begining = target.get(0);
		line.get(0).ending = dest.get(0)
	};
	Dragger.prototype.test = ()=>{
		console.log("ok")
	};
	$(window).on("keydown",function(e){
		if(e.key=="Delete"&&$(".conponent-linker.active").length){
			if(window.confirm("确认删除该连线？")) Dragger.prototype.deleteLine($(".conponent-linker.active").parent())
		}
	});
	return Dragger
})()