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
			value: 'json'
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
    			var flag = me.switchHightlight(e.target, cur);
    			if (flag) {
    				var table = $('thead,tbody');
    				table.animate({opacity:'0'},1,'easeNone',function(){
    						me.fire(Pagelist.FIRES.send);
    				});
    			}
    		}
    	}
    };
	Pagelist.METHODS = {
		send: function(callback) {
			var me = this;
            var url = '../../../src/api/' + me.get('url');
			var config = {
				url: url,
				dataType: me.get('dataType'),
				success: function(data){
					callback(data);
				}
			}
			IO(config);
		},
        switchHightlight: function (target, cur) {
            targetClass = $(target).parent().attr('class');
            var flag = false;
            switch(targetClass){
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
                    targetClass = $(target).attr('class');
                    if (targetClass.indexOf('iconfont') != -1 && targetClass.indexOf('current') == -1) {
                        $(target).addClass('current');
                        var siblings = $(target).siblings();
                        for (var i = 0; i < siblings.length; i++) {
                            $(siblings[i]).removeClass('current');
                        }
                        flag = true;
                    }
            }
            return flag;
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