(function($){
	$.fn.extend({
		thumbvr:function(opt){
		this.each(function(){
			var th=$(this),
				data=th.data('thumbvr'),
				_={
					duration:1000,
					easing:'linear',
					clone:false,
					preFu:function(){
						if(_.me.css('position')=='static')
							_.me.css({position:'relative',zIndex:1})
						_.me.css({overflow:'hidden'})
						if(_.clone)
							_.li.clone().addClass(_.cloneCl).appendTo(_.ul),
							_.li=_.ul.children()
						_.ul
							.css({position:'relative'})
							.width((function(){
								var ret=0
								_.li.each(function(i){
									var th=$(this)
									ret+=th.width()+parseInt(th.css('marginRight'))+parseInt(th.css('marginLeft'))
									th.data({num:i})
								})
								_.itmW=ret/_.li.length
								return _.ulW=ret
							})())
					},
					resizeFu:function(){
						if($(window).width()>_.me.width())
							_.ul
								.stop()
								.animate({
									left:0
								},{
									duration:_.duration,
									easing:_.easing
								})
						_.me.width(_.hW=$(window).width())
					},
					moveFu:function(x){
						var mouse=x-_.me.prop('offsetLeft'),
							dX=-((_.ulW-_.hW)-_.hW)*mouse/_.hW						
						//mouse=mouse<_.itmW/2?0:mouse
						//mouse=mouse>_.hW-_.itmW/2?_.hW:mouse
						if(mouse==dX)
							_.ul.stop()
						else
							if(mouse>dX)
								_.ul
									.stop()
									.animate({
										left:dX-mouse
									},{
										duration:_.duration,
										easing:_.easing
									})
							else
								_.ul
									.stop()
									.animate({
										left:mouse-dX
									},{
										duration:_.duration,
										easing:_.easing
									})
					},
					init:function(){
						_.me=this
						_.ul=$('>ul',_.me)
						_.li=$('>li',_.ul)
						_.body=$('body')
						_.preFu()
						_.me
							.bind('mousemove',function(e){
								if(_.hW<_.ulW)
									_.moveFu(e.pageX)
							})
						_.resizeFu()
						$(window)
							.bind('resize',function(){
								_.resizeFu()
							})
					}
				}
			if(!data)
				(typeof opt=='object'?$.extend(_,opt):_).init.call(th),
				th.data({thumbvr:_}),
				data=_
			else
				_=data		
		})
			return this
		}
	})
})(jQuery)