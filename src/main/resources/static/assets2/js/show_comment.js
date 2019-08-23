
/*****************璇勮********************************/
$(function(){
	$('.emotion').qqFace({
		id : 'facebox', //琛ㄦ儏鐩掑瓙鐨処D
		assign:'public_saytext', //缁欓偅涓帶浠惰祴鍊�
		path:'/statics/v3/images/face/'	//琛ㄦ儏瀛樻斁鐨勮矾寰�
	});
});

// QQ琛ㄦ儏鎻掍欢
(function($){  
	$.fn.qqFace = function(options){
		var defaults = {
			id : 'facebox',
			path : '/statics/v3/images/face/',
			assign : 'content',
			tip : 'em_'
		};



		var option = $.extend(defaults, options);
		var assign = $('#'+option.assign);
		var id = option.id;
		var path = option.path;
		var tip = option.tip;
		if(assign.length<=0){
			alert('缂哄皯琛ㄦ儏璧嬪€煎璞°€�');
			return false;
		}
		$(this).click(function(e){
			var strFace, labFace;
			if($('#'+id).length<=0){
				strFace = '<div id="'+id+'" style="position:absolute;display:none;z-index:1000;" class="qqFace">' +
							  '<table border="0" cellspacing="0" cellpadding="0"><tr>';
				for(var i=1; i<=90; i++){
					labFace = '['+tip+i+']';
					strFace += '<td><img src="'+path+i+'.gif" onclick="$(\'#'+option.assign+'\').setCaret();$(\'#'+option.assign+'\').insertAtCaret(\'' + labFace + '\');" /></td>';
					if( i % 15 == 0 ) strFace += '</tr><tr>';
				}
				strFace += '</tr></table></div>';
			}
			$(this).parent().append(strFace);
			var offset = $(this).position();
			var top = offset.top + $(this).outerHeight();
			$('#'+id).css('top',top);
			$('#'+id).css('left',offset.left);
			$('#'+id).show();
			e.stopPropagation();
		});

		$(document).click(function(){
			$('#'+id).hide();
			$('#'+id).remove();
		});
	};
})(jQuery);

jQuery.extend({ 
unselectContents: function(){ 
	if(window.getSelection) 
		window.getSelection().removeAllRanges(); 
	else if(document.selection) 
		document.selection.empty(); 
	} 
}); 
jQuery.fn.extend({ 
	selectContents: function(){ 
		$(this).each(function(i){ 
			var node = this; 
			var selection, range, doc, win; 
			if ((doc = node.ownerDocument) && (win = doc.defaultView) && typeof win.getSelection != 'undefined' && typeof doc.createRange != 'undefined' && (selection = window.getSelection()) && typeof selection.removeAllRanges != 'undefined'){ 
				range = doc.createRange(); 
				range.selectNode(node); 
				if(i == 0){ 
					selection.removeAllRanges(); 
				} 
				selection.addRange(range); 
			} else if (document.body && typeof document.body.createTextRange != 'undefined' && (range = document.body.createTextRange())){ 
				range.moveToElementText(node); 
				range.select(); 
			} 
		}); 
	}, 
	setCaret: function(){ 
	     $("#saytext").focus();
		if(!$.browser.msie) return; 
		var initSetCaret = function(){ 
			var textObj = $(this).get(0); 
			textObj.caretPos = document.selection.createRange().duplicate(); 
		}; 
		$(this).click(initSetCaret).select(initSetCaret).keyup(initSetCaret); 
	}, 

	insertAtCaret: function(textFeildValue){ 
		var textObj = $(this).get(0);
		if(document.all && textObj.createTextRange && textObj.caretPos){ 
			var caretPos=textObj.caretPos; 
			caretPos.text = caretPos.text.charAt(caretPos.text.length-1) == '' ? 
			textFeildValue+'' : textFeildValue; 
		} else if(textObj.setSelectionRange){ 
			var rangeStart=textObj.selectionStart; 
			var rangeEnd=textObj.selectionEnd; 
			var tempStr1=textObj.value.substring(0,rangeStart);
			var tempStr2=textObj.value.substring(rangeEnd); 
			textObj.value=tempStr1+textFeildValue+tempStr2; 
			textObj.focus(); 
			var len=textFeildValue.length; 
			textObj.setSelectionRange(rangeStart+len,rangeStart+len); 
			textObj.blur(); 
		}else{ 
			textObj.value+=textFeildValue; 
		} 
	} 
});

function AddOnPos(obj,charvalue){
	//闈濱E鍐呮牳娴忚鍣�
	if(window.getSelection){
		if(obj.value=="璇勮涓€涓嬪惂")
		{obj.value="";}
		obj.value = obj.value + charvalue;
		obj.focus();
	//IE鍐呮牳娴忚鍣�
	}else if(document.selection){
	obj.focus();
	var r = document.selection.createRange();
	var ctr = obj.createTextRange();
	var i;
	var s = obj.value;
	var ivalue = "&^asdjfls2FFFF325%$^&";
	r.text = ivalue;
	i = obj.value.indexOf(ivalue);
	r.moveStart("character", -ivalue.length);
	r.text = "";
	obj.value = s.substr(0,i) + charvalue + s.substr(i,s.length);
	ctr.collapse(true);
	ctr.moveStart("character", i + charvalue.length);
	ctr.select();
    }
}

$(function() {		
	$.fn.manhuaInputLetter = function(options) {
		var defaults = {			
			len : 200,
			showId : "show"
		};
		var options = $.extend(defaults,options);	
		var $input = $(this);		
		var $show = $("#"+options.showId);
		$show.html(options.len);
		$input.live("keydown keyup blur",function(e){						
		  	var content =$(this).val();
			var length = content.length;
			var result = options.len - length;
			if (result >= 0){
				$show.html(result);
			}else{
				$(this).val(content.substring(0,options.len))
			}
		});	
	}	
});

$(function(){
	$("#public_saytext").manhuaInputLetter({					       
		len : 200,//闄愬埗杈撳叆鐨勫瓧绗︿釜鏁�				       
		showId : "sid"//鏄剧ず鍓╀綑瀛楃鏂囨湰鏍囩鐨処D
	});

	//$(".lay-250 .hot_tags_box").after('<a href="https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=gQEe8DoAAAAAAAAAASxodHRwOi8vd2VpeGluLnFxLmNvbS9xLzN6am1xQzdsbnM3bnBiaVZleERaAAIEoUXFVwMEAAAAAA==" target="_blank" style="display:block;margin:5px 0;"><img src="http://www.5857.com/statics/new_img/20160907.gif" /></a>');
})

//闅愯棌楠岃瘉鐮�
function hide_code() {
	if ($('#yzmText').data('hide')==0) {
		$('#yzm').hide();
	}
}

//鍒嗛〉鎻掍欢
/**
2014-08-05 ch
**/
(function($){
	var ms = {
		init:function(obj,args){
			return (function(){
				ms.fillHtml(obj,args);
				ms.bindEvent(obj,args);
			})();
		},
		//濉厖html
		fillHtml:function(obj,args){
			return (function(){
				obj.empty();
				//涓婁竴椤�
				if(args.current > 1){
					obj.append('<a href="javascript:;" class="prevPage">涓婁竴椤�</a>');
				}else{
					obj.remove('.prevPage');
					obj.append('<span class="disabled">涓婁竴椤�</span>');
				}
				//涓棿椤电爜
				if(args.current != 1 && args.current >= 4 && args.pageCount != 4){
					obj.append('<a href="javascript:;" class="tcdNumber">'+1+'</a>');
				}
				if(args.current-2 > 2 && args.current <= args.pageCount && args.pageCount > 5){
					obj.append('<span>...</span>');
				}
				var start = args.current -2,end = args.current+2;
				if((start > 1 && args.current < 4)||args.current == 1){
					end++;
				}
				if(args.current > args.pageCount-4 && args.current >= args.pageCount){
					start--;
				}
				for (;start <= end; start++) {
					if(start <= args.pageCount && start >= 1){
						if(start != args.current){
							obj.append('<a href="javascript:;" class="tcdNumber">'+ start +'</a>');
						}else{
							obj.append('<span class="current">'+ start +'</span>');
						}
					}
				}
				if(args.current + 2 < args.pageCount - 1 && args.current >= 1 && args.pageCount > 5){
					obj.append('<span>...</span>');
				}
				if(args.current != args.pageCount && args.current < args.pageCount -2  && args.pageCount != 4){
					obj.append('<a href="javascript:;" class="tcdNumber">'+args.pageCount+'</a>');
				}
				//涓嬩竴椤�
				if(args.current < args.pageCount){
					obj.append('<a href="javascript:;" class="nextPage">涓嬩竴椤�</a>');
				}else{
					obj.remove('.nextPage');
					obj.append('<span class="disabled">涓嬩竴椤�</span>');
				}
			})();
		},
		//缁戝畾浜嬩欢
		bindEvent:function(obj,args){
			return (function(){
				obj.on("click","a.tcdNumber",function(){
					var current = parseInt($(this).text());
					ms.fillHtml(obj,{"current":current,"pageCount":args.pageCount});
					if(typeof(args.backFn)=="function"){
						args.backFn(current);
					}
				});
				//涓婁竴椤�
				obj.on("click","a.prevPage",function(){
					var current = parseInt(obj.children("span.current").text());
					ms.fillHtml(obj,{"current":current-1,"pageCount":args.pageCount});
					if(typeof(args.backFn)=="function"){
						args.backFn(current-1);
					}
				});
				//涓嬩竴椤�
				obj.on("click","a.nextPage",function(){
					var current = parseInt(obj.children("span.current").text());
					ms.fillHtml(obj,{"current":current+1,"pageCount":args.pageCount});
					if(typeof(args.backFn)=="function"){
						args.backFn(current+1);
					}
				});
			})();
		}
	}
	$.fn.createPage = function(options){
		var args = $.extend({
			pageCount : 10,
			current : 1,
			backFn : function(){}
		},options);
		ms.init(this,args);
	}
})(jQuery);
//鍒嗛〉鎻掍欢

//绛夊緟椤甸潰鍔犺浇瀹屾垚
$(function(){
	window.onload= function(){
		setTimeout("get_total()",3000);
	};
	$("#comment_page").click(function() {
		var sTop=$('#comment_list_box').offset().top-90;
    	$('html,body').animate({scrollTop:sTop+"px"},1000);
	});
	$(".arc_comment").click(function() {
		foucs_comment();
	});

	$("#_userText").focus(function() {
		var username=$.trim($(this).val());
		if(username=='澹佺焊缃戝弸'){
			$(this).val('');
		}
	});
	$("#_userText").blur(function() {
		var username=$.trim($(this).val());
		if(username==''){
			$(this).val('澹佺焊缃戝弸').css('color', '#999');;
		}
	});
})

//鑾峰彇璇勮鎬绘暟
function get_total(){
	var commentid=$("#comment_box").attr('data');
	$.ajax({
		url: '/index.php?m=comment&c=index&a=comment_total',
		type: 'GET',
		dataType: 'json',
		data: {commentid:commentid},
		success: function(data){
		    if(data['status']==1){
		    	if(!data['result']['total']){
		    		return;
		    	}
                if(data['result']['total']>0){
                    $(".list-comment-empty-w").hide();
                    if(data['result']['total']>10){
                        $(".cmt-list-more").show();
                    }
                    comment_list();
                }
                $(".cmt-list").show();
		    	$(".cmt-list .cmt-list-title em").html(data['result']['total']);
		    }
		}
	});
}
//鑾峰彇璇勮鏁版嵁
function comment_list(){
    var page=$('.cmt-list-more').attr('page');
    var pagesize=$('.cmt-list-more').attr('pagesize');
    var commentid=$('#comment_box').attr('data');
	$.ajax({
		url: '/index.php?m=comment&c=index&a=comment_ajax',
		type: 'GET',
		dataType: 'json',
		data: {page:page,pagesize:pagesize,commentid:commentid},
		success: function(data){
			if(data['status']==1){
				var html='';
				$.each(data['result'], function(index,r) {
                    var content=replace_em(r['content']);
                    html +='<div class="block-cont clearfix"><div class="cont-head"><em></em><img src="/statics/v3/images/user'+ Math.round(Math.random()*3+1) +'.png"></div> <div class="cont-msg" id="reply_'+ r['id'] +'"> <div class="wrap-user"> <span class="user-star fr"><i class="stars star4"></i></span> <span class="user-name">'+ r.username +'</span> <span class="user-time">'+r['creat_at']+'</span> </div> <div class="wrap-issue"> <p>'+ content +'</p> </div> <div class="wrap-action"> <span class="click-reply"><a href="javascript:void(0)" onclick="reply('+r['id']+','+"'"+r['commentid']+"'"+','+"'"+r['username']+"'"+')">鍥炲</a></span> | <span class="click-support"><a href="javascript:void(0)" onclick="support('+r['id']+','+"'"+r['commentid']+"'"+')">鏀寔(<font id="support_'+r['id']+'">'+r['support']+'</font>)</a></span> </div> </div> </div>';
				});
                page++;
                $('.cmt-list-more').attr('page',page);
				$(".cmt-list-block").append(html);
			}else{
                $(".cmt-list-more a").html(data.msg);
                $(".cmt-list-more a").removeAttr('onclick');
            }
		}
	});
}

//椤甸潰瀹氫綅鑷宠瘎璁烘ā鍧�
function foucs_comment(){
	var sTop=$('#comment_box').offset().top-90;
    $('html,body').animate({scrollTop:sTop+"px"},1000);
    $("#public_saytext").focus();
}

//up
function support(id,commentid) {
	$.ajax({
		url: '/index.php?m=comment&c=index&a=public_support',
		type: 'GET',
		dataType: 'json',
		data: {'commentid':commentid,'id':id},
		success: function(data){
			if(data['status']==1){
				$('#support_'+id).html(parseInt($('#support_'+id).html())+1);
				$('#support_'+id).css('color', '#ff0000');
			}else{
				alert(data['msg']);
			}
		}
	});
}

//call back
function reply(id,commentid,username){
    if(!id || !commentid){
        alert('鍙傛暟閿欒,璇峰埛鏂伴噸璇�');
        return;
    }
    $("#comment_parent").val('');
    var isnow=$('.post-rpbox_'+id).html();
    if(isnow){
        $('.post-rpbox_'+id).remove();
        return;
    }
    $('.post-rpbox').remove();
    var html = '<div class="post-rpbox clearfix post-rpbox_"'+id+'><em class="angle"></em><div class="post-rpbox-in"><div class="rpbox-lf"> <span class="user-name">@5857鍘﹂棬甯傜敤鎴�</span><input autocomplete="off" class="user-input reply_text_say" type="text"></div><div class="rpbox-gh"> <a href="javascript:void(0)"><button class="btn-hf" node-type="issue" onclick="btn_comment();">鍥炲</button> </a> </div> </div></div> ';
    $("#reply_"+id).append(html);
    $("#comment_parent").val(id);
}

//鎻愪氦璇勮
function btn_comment(){
	var commentid=$("#comment_box").attr('data');
	var username=$.trim($("#userText").val());
	var comment_parent=$("#comment_parent").val();
	var title=$("#title").val();
	var url=$("#url").val();
    if(comment_parent!='0' && comment_parent!=''){
        var content=$.trim($("#reply_"+comment_parent+" .reply_text_say").val());
    }else{
        var content=$.trim($("#public_saytext").val());
    }

	if(username==''){
        alert("鏄电О涓嶈兘涓虹┖锛�");
		$("#userText").focus();
		return;
	}
	if(content=='' || content.length<5){
        alert("璇勮淇℃伅涓嶈兘涓虹┖锛涙垨鑰呰瘎璁哄瓧鏁板お灏戜簡");
		return;
	}
	if(commentid==''){
        alert("鍙傛暟閿欒锛屾棤娉曡瘎璁猴紒");
		return;
	}
	$.ajax({
		url: '/index.php?m=comment&c=index&a=public_post&commentid='+commentid,
		type: 'POST',
		dataType: 'json',
		data: {'nick':username,'id':comment_parent,'title':title,'url':url,'content':content},
		success: function(data){
			if(data['status']==1){
				var content=replace_em(data['content']);
                var html='<div class="block-cont clearfix"><div class="cont-head"><em></em><img src="/statics/v3/images/user'+ Math.round(Math.random()*4) +'.png"></div><div class="cont-msg"><div class="wrap-user"><span class="user-star fr"><i class="stars star4"></i></span> <span class="user-name">'+username+'</span><span class="user-time">1绉掑墠</span></div><div class="wrap-issue"><p>'+content+'</p></div><font color="red">鎮ㄧ殑璇勮姝ｅ湪绛夊緟灏忕紪瀹℃牳涓�...</font></div></div>';
				$(".cmt-list-block").prepend(html);
				$("#public_saytext").val('');
                if(comment_parent){
                    $("#comment_parent").val('');
                    $('#reply_'+comment_parent+' .reply_text_say').val('');
                }
                $(".cmt-list").show();
                $(".list-comment-empty-w").hide();
            }else{
                alert(data['msg']);
			}
		}
	})
}


//鏇挎崲琛ㄦ儏
function replace_em(str){
	str = str.replace(/\[em_([0-9]*)\]/g,'<img src="/statics/v3/images/face/$1.gif"/>');
	return str;
}