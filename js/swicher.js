//0.4.0
;(function($){
	$.fn.navs=function(o){
		this.each(function(){
			var th=$(this),
				data=th.data('navs'),
				_={
					enable:true,
					actCl:'active',
					changeEv:'change',
					indx:[],
					hshx:[],
					useHash:false,
					defHash:'#',
					outerHash:false,
					autoPlay:false,
					blockSame:true,
					hover:true,
					contRetFalse:true,
					preFu:function(){						
						_.li.each(function(n){
							var th=$(this)
							_.indx[n]=th
							_.useHash
								&&(_.hshx[n]=$('a',th).attr('href'))
								&&location.hash==_.hshx[n]
									&&th.addClass(_.actCl)
						})						
					},
					rfrshFu:function(){
						_.prev=_.curr
						_.pren=_.n
						_.curr=false
						_.n=-1
						_.param='close'
						
						_.li.each(function(n){
							var th=$(this)
							if(th.hasClass(_.actCl))
								_.curr=th,
								_.n=n,
								_.href=$('a',th).attr('href'),
								_.param=_.useHash?_.href:_.n
						})						
					},
					markFu:function(){
						_.li.each(function(n){
							var th=$(this)
							_.n==n?_.hvrin(th):_.hvrout(th)
						})
					},
					hashFu:function(){
						$(window)
							.bind('hashchange',function(){
								_.prevHash=_.hash
								_.checkHashFu(_.outerHash=_.hash=location.hash)
							})
						$('a',_.li)
							.click(function(){
								if(!_.enable)
									return false
							})
					},
					checkHashFu:function(hash){
						if(hash=='#back')
							return _.backFu()
						if(hash=='#close')
							return _.closeFu()
						_.li.each(function(n){
							if(_.hshx[n]==_.hash)
								_.chngFu(n),
								_.outerHash=false
						})
						if(_.outerHash)							
							_.li.removeClass(_.actCl),
							_.rfrshFu(),
							_.markFu(),
							_.param=_.outerHash,
							_.me.trigger(_.changeEv)
					},
					cntrFu:function(){
						_.li.each(function(n){
							var th=$(this)
							$('a',th)
								.click(function(){
									_.chngFu(n)
									if(_.contRetFalse)
										return false
								})									
						})
					},
					autoPlayFu:function(){
						if(!_.autoPlay)
							return false
						if(_.int)
							clearInterval(_.int)
						_.int=setInterval(_.nextFu,_.autoPlay)
					},
					chngFu:function(n){
						if(!_.enable)
							return false
						if(n==_.n&&_.blockSame)
							return false						
						_.indx[n]
							&&_.li.removeClass(_.actCl)
							&&_.indx[n].addClass(_.actCl)
						_.rfrshFu()
						_.markFu()
						_.autoPlayFu()
						if(_.useHash&&location.hash!=_.hshx[_.n])
							location.hash=_.hshx[_.n]
							
						_.me.trigger(_.changeEv)
					},
					closeFu:function(){
						_.li.removeClass(_.actCl)
						_.rfrshFu()
						_.markFu()
						_.me.trigger(_.changeEv)
						location.hash=_.defHash
					},
					backFu:function(){
						_.chngFu(_.pren)
					},
					nextFu:function(){
						var n=_.n
						_.chngFu(++n<_.li.length?n:0)
					},
					prevFu:function(){
						var n=_.n
						_.chngFu(--n>=0?n:_.li.length-1)
					},
					customStr:function(str){
						console.log(str)
					},
					init:function(){
						_.me.bind(_.changeEv,function(){_.defFunc(_.param,_)})
						_.li=$('>ul>li',_.me)
						_.preFu()
						_.rfrshFu()
						_.markFu()
						_.useHash
							?_.hashFu()
							:_.cntrFu()
						_.hoverFu()
						_.autoPlayFu()
						_.checkHashFu(_.outerHash=_.hash=location.hash)
						_.defFunc(_.param,_)
					},
					hoverFu:function(){
						_.li.each(function(n){
							var th=$(this)
							$('>a',th)
								.bind('mouseenter',function(){
									if(_.enable)
										if(_.hover&&n!=_.n)
											_.hvrin(th)
								})
								.bind('mouseleave',function(){
									if(_.enable)
										if(_.hover&&n!=_.n)
											_.hvrout(th)
								})
						})
					},
					hvrin:function(el){
						_.hoverIn(el,_)
						_.hover=='sprites'
							&&$('a',el).sprites('hoverin')
					},
					hvrout:function(el){
						_.hoverOut(el,_)
						_.hover=='sprites'
							&&$('a',el).sprites('hoverout')
					},
					hoverIn:function(){},
					hoverOut:function(){},
					defFunc:function(){}
				}
			data?_=data:th.data({navs:_})
			typeof o=='object'&&$.extend(_,o)
			_.me||_.init(_.me=th)
			
			typeof o=='number'&&_.chngFu(o)
			typeof o=='function'&&_.me.bind(_.changeEv,function(){o(_.param,_)}).trigger(_.changeEv)
			typeof o=='boolean'&&(_.enable=o)
			typeof o=='string'&&(o=='prev'||o=='next'||o=='close'||o=='back'?_[o+'Fu']():_.useHash?o.slice(0,3)=='#!/'&&(location.hash=o)||_.customStr(o):_.customStr(o))
		})
		return this
	}
	
	$.fn.tabs=function(o){
		this.each(function(){
			var th=$(this)
				data=th.data('tabs'),
				_={
					enable:true,
					blockSame:true,
					changeEv:'change',
					duration:800,
					itms:'>ul>li',
					easing:'linear',
					empty:'splash',
					preFu:function(){
						_.li.hide()
					},
					showFu:function(el){
						el.show()
					},
					hideFu:function(el){
						el.hide()
					},
					nextFu:function(){
						var n=_.n
					_.chngFu(++n<_.li.length?n:0)
					},
					prevFu:function(){
						var n=_.n
						_.chngFu(--n>=0?n:_.li.length-1)
					},
					navFu:function(str){
						if(_.prevStr==str)
							return false
						_.prevStr=str
						str.slice(3)==_.empty
							&&$.when(_.li).then(_.closeFu)
						_.li.each(function(n){
							$(this).attr('id')==str.slice(3)
								&&_.chngFu(n)
						})						
					},
					closeFu:function(){
						if(_.prevStr=='close')
							return false
						_.n=-1
						_.next=false
						_.prevStr='close'
						_.li.each(function(){_.hideFu($(this),_)})
					},
					backFu:function(){
						_.chngFu(_.prev)
					},
					chngFu:function(arg){
						if(!_.enable||arg==_.n&&_.blockSame)
							return false						
						var fu=function(){
							_.prev=_.n
							_.n=arg
							_.next=_.li.eq(arg)
							_.li.each(function(){_.hideFu($(this),_)})
							_.showFu(_.next,_)
							_.me.trigger(_.changeEv,_)
						}
						$.when(_.li).then(fu)
					},
					init:function(){
						_.li=$(_.itms,_.me)
						_.preFu(_)
					}
				}
			data?_=data:th.data({tabs:_})
			typeof o=='object'&&$.extend(_,o)
			_.me||_.init(_.me=th)
			
			typeof o=='function'&&_.me.bind(_.changeEv,function(){o(_.n,_)})
			typeof o=='boolean'&&(_.enable=o)
			typeof o=='number'&&_.chngFu(o)
			typeof o=='string'&&(o=='prev'||o=='next'||o=='close'||o=='back'?_[o+'Fu']():_.navFu(o))
		})
		return this
	}
})(jQuery)
