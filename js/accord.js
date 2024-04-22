(function($){
	$.fn.extend({
		accord:function(opt){
			var th=this,
				data=th.data('accord'),
				_={
					duration:400,
					easing:'swing',
					activeCl:'active',
					changeEv:'click',
					blocked:false,
					sameClose:false,
					afterShow:function(){},
					preFu:function(){
						_.dd.each(function(i){
							var th=$(this)
							th
								.data({
									num:i,
									height:th.height()
								})
								.hide()
						})
						_.dt.each(function(i){
							$(this).data({num:i})
						})
					},
					contolsFu:function(){
						_.dt.each(function(i){
							$('>a',this)
								.bind(_.changeEv,function(){									
									_.dt.removeClass(_.activeCl)
									_.dt.eq(i).addClass(_.activeCl)
									_.changeFu(i)
									return false
								})
						})
					},
					closeAllFu:function(){
						_.blocked=true
						_.dt.removeClass(_.activeCl)
						var ddV=_.dd.not(':hidden')
						ddV
							.stop()
							.animate({
								height:0
							},{
								duration:_.duration,
								easing:_.easing,
								complete:function(){									
									ddV.each(function(){
										var th=$(this)
										th
											.hide()
											.height(th.data('height'))
									})
									_.blocked=false
									_.n=-1
									_.afterShow()
								}
							})
					},
					changeFu:function(n){
						if(_.n==n||_.blocked)
							if(_.sameClose)								
								return _.closeAllFu()
							else
								return false
						_.n=n
						_.next=_.dd.eq(n)						
						_.showFu()
					},
					showFu:function(){
						var nH=_.next.data('height'),
							ddV=_.dd.not(':hidden')
						_.blocked=true
						_.next
							.stop()
							.css({height:0})
							.show()
							.animate({
								height:nH
							},{
								duration:_.duration,
								easing:_.easing,
								step:function(now){
									ddV.each(function(){
										var th=$(this),
											hV=th.data('height')
										th.height(hV-now/nH*hV)
									})
								},
								complete:function(){
									ddV.each(function(){
										var th=$(this)
										th
											.hide()
											.height(th.data('height'))
									})
									_.blocked=false
									_.afterShow()
								}
							})
					},
					init:function(){
						_.me=this
						_.dd=$('>dd',_.me)
						_.dt=$('>dt',_.me)
						_.preFu()
						_.contolsFu()
					}
				}
			if(!data)
				(typeof opt=='object'?$.extend(_,opt):_).init.call(th),
				th.data({accord:_}),
				data=_
			else
				_=data
				

			if(typeof opt=='number')
				_.changeFu(opt)
			
			return th
		}
	})
})(jQuery)