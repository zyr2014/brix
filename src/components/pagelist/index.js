KISSY.add('components/pagelist/index', function(S, Brick, Node, IO) {
    var $ = Node.all;
    function Pagelist() {
        Pagelist.superclass.constructor.apply(this, arguments);
    }
    Pagelist.FIRES = {
    	send:'send'
    }
    pagelist.ATTRS = {
		url: {
			value: ''
		},
		dataType: {
			value: ''
		}/*,
		tmpl: {
			value: 'xxxx'
		},
		data: {
			value: null	
		}*/
    }
    Pagelist.EVENTS = {
    	'.pagination':{
    		click: function(e) {
    			var me = this;
    			var cur = $(e.currentTarget).one('.current');
    			var target = $(e.target).parent().attr('class');
    			var flag = false;
    			debugger;
    			switch(target){
    				case 'prev':
    					prev = cur.prev();
    					if (prev) {
    						cur.removeClass('current');
    						prev.addClass('current');
    						flag = true;
    					}
    					break;
    				case 'next':
    					next = cur.next();
    					if (next) {
    						cur.removeClass('current');
    						next.addClass('current');
    						flag = true;
    					}
    					break;
    				case 'index-point':
    					target = $(e.target).attr('class');
    					if (target.indexOf('iconfont') != -1 && target.indexOf('current') == -1) {
    						$(e.target).addClass('current');
    						var siblings = $(e.target).siblings();
    						for (var i = 0; i < siblings.length; i++) {
    							$(siblings[i]).removeClass('current');
    						}
    						flag = true;
    					}
    			}
    			if (flag) {
    				var table = $('thead,tbody');
    				var fired = false;
    				table.animate({opacity:'0'},1,'easeNone',function(){
    					if (!fired) {
    						me.fire(Pagelist.FIRES.send);
    						fired = true;
    					}
    					
    				});
    				
    			}
    			


    		}
    	}
    };
	Pagelist.METHODS = {
		send: function(callback) {
			var me = this;
			var config = {
				url: me.get('url'),
				dataType: me.get('dataType'),
				success: function(data){
					callback(data);
				}
			}
			IO(config);
		}
	}    
    S.extend(Pagelist, Brick, {
        // 此处定义 Pagelist 自己的方法
        initialize: function() {
        /* @jintai's note
        	this.getTmpl
        	this.getData
        	render

        	initialize --> el, dom

        	*/
        	debugger;
        	var me = this;
        	me.on('send',function(e){
                me.send(function(data){
                  me.pagelet.setChunkData(data);
                  var table = $('thead,tbody');
                  table.animate({opacity:'1'},1,'easeNone');
                  });
             });
        	me.send(function(data){
          		me.pagelet.setChunkData(data);
          	});

        }
    });
    S.augment(Pagelist,Pagelist.METHODS);
    return Pagelist;
}, {
    requires: ['brix/core/brick','node','io']
});