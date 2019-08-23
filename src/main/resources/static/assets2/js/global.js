// JavaScript Document

$(document).ready(function() {
	if($(".new_topmini").html()) {
		$.ajax({
			type: "GET",
			url: 'http://passport.5857.com/home/index/new_top_mini.html',
			dataType: "jsonp",
			jsonp: "callback",
			jsonpCallback: "success_jsonpCallback",
			async: false,
			success: function(data) {
				if(data.userid > 0) {
					$(".topbox .topr").prepend('<li><a href="http://passport.5857.com/home/info/index.html" target="_blank">' + data.member.nickname + '</a></li><li><a href="javascript:;" class="logout"></a></li>');
				} else {
					$(".topbox .topr").prepend('<li><a href="http://passport.5857.com/home/index/login.html" target="_blank" class="login_a"></a></li><li><a href="http://passport.5857.com/home/index/register.html" target="_blank" class="reg_a"></a></li>');
				}
			}
		});


		var log_href = $(".login_a").attr('href');
		$(".login_a").attr('href', log_href + '?referurl=' + encodeURIComponent(window.location.href));
		var reg_href = $(".reg_a").attr('href');
		$(".reg_a").attr('href', reg_href + '?referurl=' + encodeURIComponent(window.location.href));
	}
	//閫€鍑虹櫥闄�
	$(document).on('click', ".logout", function() {
		var now_url = encodeURIComponent(window.location.href);
		$.ajax({
			type: "GET",
			url: 'http://passport.5857.com/home/index/logout.html',
			dataType: "jsonp",
			jsonp: "callback",
			jsonpCallback: "success_jsonpCallback",
			async: false,
			data: 'referer=' + now_url,
			success: function(data) {
				if(data.status == 1) {
					layer.msg(data.msg, {
						icon: 1,
						time: 2000
					});
					setTimeout(function() {
						window.location.reload();
					}, 2000);
				} else {
					layer.msg(data.msg, {
						icon: 2,
						time: 2000
					});
				}
			}
		});
	});
});

//绠€鍗曡繑鍥為《閮�
$(window).scroll(function() {
	if($(window).scrollTop() > 0) {
		$("#backTop").fadeIn(400); //褰撴粦鍔ㄦ爮鍚戜笅婊戝姩鏃讹紝鎸夐挳娓愮幇鐨勬椂闂�
	} else {
		$("#backTop").fadeOut(200); //褰撻〉闈㈠洖鍒伴《閮ㄧ涓€灞忔椂锛屾寜閽笎闅愮殑鏃堕棿
	}
});
$("#backTop").click(function() {
	$('html,body').animate({
		scrollTop: '0px'
	}, 200); //杩斿洖椤堕儴鎵€鐢ㄧ殑鏃堕棿
	$('#backTop span').hover(
		function() {
			$(this).addClass('hover');
		},
		function() {
			$(this).removeClass('hover');
		}
	);
});

//鎹竴鎵�
$('#btnRefresh').click(function() {
	var str = $('.wbody .wlist:lt(1)').clone();
	$('.wbody .wlist:lt(1)').remove();
	$('.wbody').append(str);
});

function tab1(o1, o2, c, e) {
	o1.each(function(i) {
		if(!i) {
			$(this).addClass('on');
		}
		$(this).bind(e, function() {
			o2.hide().eq(i).show();
			o1.removeClass(c);
			$(this).addClass(c);
		});
		if($(this).hasClass(c)) {
			$(this).addClass(c);
			o2.hide().eq(i).show();
		}
	})
};

// 鎺掕姒滃垏鎹�
$(function() {
	tab1($('.area-tab li'), $('.area_section'), 'on', 'hover');
});

//杩斿洖椤堕儴
$(document).ready(function() {
	var topMain = 200
	var nav = $(".sidebar");
	$(window).scroll(function() {
		if($(window).scrollTop() > topMain) {
			$(".sidebar").show();
		} else {
			$(".sidebar").fadeOut('slow');
		}
	});
	$("#share").hover(function() {
		$(".shareList").toggleClass("share-show", 1000);
	});
});

$(document).ready(function() {
	$(".nav2 li").hover(
		function() {
			$(this).addClass("hover");
			$(".nav2 li.mntp i").animate({
				rotate: "+=45deg" //涓簉otate灞炴€ц祴鍊�
			}, 'slow');
		},
		function() {
			$(this).removeClass("hover");
		}
	);
	$(".title_save").mouseover(function() {
		$(".smcode").show();
	});
	$(".title_save").mouseout(function() {
		$(".smcode").hide();
	});
	$("#head_app").mouseover(function() {
		$(".app_code").show();
	});
	$("#head_app").mouseout(function() {
		$(".app_code").hide();
	});
});

// tab鍒囨崲
$(".type-side a").mouseover(function() {
	var index = $(this).index();
	$(this).parents(".bd").find(".type-con ul").eq(index).show().siblings().hide();
	$(this).addClass("on").siblings().removeClass("on");
})

//娣诲姞涔︾
function AddFavorite(sTitle, sURL) {
	var sURL = window.location.href,
		sTitle = document.title;
	try {
		window.external.addFavorite(sURL, sTitle);
	} catch(e) {
		try {
			window.sidebar.addPanel(sTitle, sURL, "");
		} catch(e) {
			alert("鍔犲叆鏀惰棌澶辫触锛岃浣跨敤Ctrl+D杩涜娣诲姞");
		}
	}
};

//鎺ㄨ崘缁熻

$(function() {
	$('.seahotid').bind('click', function(event) {
		var id = $(this).attr('data');
		$.get("/api.php?op=seahot&id=" + id);
	})
});

//娣诲姞涔︾
var TY = {};
TY.add_bookmark = function(title, url) {
	var title = title || document.title;
	var url = url || window.location.href;
	if(document.all) {
		try {
			window.external.addFavorite(url, title);
		} catch(e) {
			alert("鍔犲叆鏀惰棌澶辫触锛岃浣跨敤Ctrl+D杩涜娣诲姞");
		}
	} else if(window.sidebar) {
		window.sidebar.addPanel(title, url, "");
	} else {
		alert("鍔犲叆鏀惰棌澶辫触锛岃浣跨敤Ctrl+D杩涜娣诲姞");
	}
};

Desk = function() {
	if(document.getElementById('nexturl') && document.getElementById('prevurl')) {
		document.onkeyup = this.keyUp();
	}
	if(document.getElementById('hits')) {
		this.hits();
	}
};
//鎰忚鍙嶉
Desk.prototype.feedback = function() {
	var submitBtn = document.getElementById('submitBtn');
	if(submitBtn) {
		submitBtn.addEventListener('click', function() {
			var pContent = $("#pContent").val();
			if(!pContent || pContent.length < 5) {
				$("#tips_msg").html('鍙嶉鍐呭涓嶈兘灏忎簬5涓瓧绗︽弿杩�');
				$("#pContent").focus();
				return;
			}
			var contact = $("#contact").val();
			if(!contact) {
				$("#tips_msg").html('鑱旂郴鏂瑰紡涓嶈兘涓虹┖');
				$("#contact").focus();
				return;
			}
			$("#tips_msg").html('');
			$.ajax({
				type: "post",
				url: 'http://passport.5857.com/home/index/feedback.html',
				dataType: "jsonp",
				jsonp: "callback",
				jsonpCallback: "success_jsonpCallback",
				async: false,
				data: 'content=' + pContent + '&contact=' + contact,
				success: function(data) {
					$("#tips_msg").html(data.msg);
					if(data.status == 1) {
						setTimeout(function() {
							$(".cover1").hide();
							$("#feedback").hide();
						}, 2000);
					}
				}
			});
		})
	}
	var feedclose = document.getElementById('feed-close');
	feedclose.addEventListener('click', function() {
		var feedback = document.getElementById('feedback');
		if(feedback) feedback.style.display = 'none';
		$(".cover1").hide();
	})

};
//鏄剧ず鎰忚鍙嶉
Desk.prototype.showFeedback = function() {
	var feedback = document.getElementById('feedback');
	if(feedback) {
		feedback.innerHTML = '';
		feedback.style.display = 'block';
		var div, h3, a, p, label, input;
		div = document.createElement('div');
		div.className = 'feed-tit';
		h3 = document.createElement('h3');
		h3.innerHTML = '鎰忚鍙嶉';
		div.appendChild(h3);
		a = document.createElement('a');
		a.href = 'javascript:void(0);';
		a.id = 'feed-close';
		a.className = 'feed-close';
		a.title = '鍏抽棴';
		div.appendChild(a);
		feedback.appendChild(div);
		div = document.createElement('div');
		div.className = 'feed-cont';
		div.innerHTML = '<p><label for="pContent">闂鎻忚堪锛�</label><textarea name="pContent" id="pContent" placeholder="璇峰湪杩欓噷璇︾粏鎻忚堪鎮ㄦ墍纰板埌鐨勯棶棰樺拰寤鸿..."></textarea></p><p><label for="contact"> 鑱旂郴鏂瑰紡锛�</label> <input type="text" name="contact" id="contact" placeholder="姝ら」涓洪€夊～锛屽彲鐣欎笅QQ鍙锋垨閭锛屼互渚挎垜浠洖澶嶆偍銆�"></p><p class="tips" id="tips_msg"></p><p><label for="submitBtn" class="fl"></label><input type="button" name="submit" id="submitBtn" value="鎻愪氦"></p><div class="clear"></div>';
		feedback.appendChild(div);
		this.feedback();
	}
}

//鐐硅禐
Desk.prototype.hits = function() {
	var hits = document.getElementById('hits');
	if(!hits) return;
	var _this = this;
	hits.addEventListener('click', function() {
		var id = $('#hits').attr('data');
		if(_this.getCookie('id') == id) {
			alert('宸茬粡鍠滄杩囦簡');
			return false;
		}
		$.get('/api.php?op=count&id=' + id + '&modelid=3', function(data) {
			var hitsid = parseInt($('#hits').html()) + 1;
			var html = "<i></i>" + hitsid;
			$('#hits').html(html);
			_this.setCookie('id', id, 60);
		});
	})
};

Desk.prototype.setCookie = function(name, value, time) {
	if(!time) {
		var Days = 30;
		var exp = new Date();
		exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
		document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString() + ";path=/";
	} else {
		document.cookie = name + "=" + escape(value) + ";expires=" + time + ";path=/";
	}
};

Desk.prototype.getCookie = function(name) {
	var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
	if(arr = document.cookie.match(reg))
		return unescape(arr[2]);
	else
		return null;
};

Desk.prototype.keyUp = function() {
	var next = document.getElementById('nexturl').value;
	var prev = document.getElementById('prevurl').value;
	$(document).on("keydown", function(event) {
		switch(event.keyCode) {
			case 37:
				window.location.href = prev;
				break;
			case 39:
				window.location.href = next;
				break;
		}
	});
};

Desk.prototype.hits = function() {
	var hits = document.getElementById('hits');
	var _this = this;
	hits.addEventListener('click', function() {
		var id = $("#hits").attr("data");
		if(_this.getCookie("id") == id) {
			alert("宸茬粡鍠滄杩囦簡");
			return false
		}
		$.get("/api.php?op=count&id=" + id + "&modelid=3", function(data) {
			var hitsid = parseInt($("#hits").html());
			$("#hits").html(hitsid + 1);
			_this.setCookie("id", id, 1)
		})
	})
};

//瀹炰緥鍖栧嚱鏁�
var desk = new Desk();
$(function() {
	$('#head_feed').bind('click', function(e) {
		$(".cover1").show();
		desk.showFeedback();
		e.stopPropagation();
	});
	$('.feed-close,.cover1').on('click', function(e) {
		$(".cover1").hide();
		$("#feedback").hide();
	});
});

//鐗规畩浠ｇ爜娈�

tyMap = window.tyMap || {};

function tyViaJs(locationId) {
	var _f = undefined;
	var _fconv = 'tyMap[\"' + locationId + '\"]';
	try {
		_f = eval(_fconv);
		if(_f != undefined) {
			_f()
		}
	} catch(e) {}
}

function tyLoader(closetag) {
	var tyTest = null,
		tyTestPos = document.getElementsByTagName("span");
	for(var i = 0; i < tyTestPos.length; i++) {
		if(tyTestPos[i].className == "tyTestPos") {
			tyTest = tyTestPos[i];
			break
		}
	}
	if(tyTest == null) return;
	if(!closetag) {
		document.write("<span id=tyTestPos_" + tyTest.id + " style=display:none>");
		tyViaJs(tyTest.id);
		return
	}
	document.write("</span>");
	var real = document.getElementById("tyTestPos_" + tyTest.id);
	for(var i = 0; i < real.childNodes.length; i++) {
		var node = real.childNodes[i];
		if(node.tagName == "SCRIPT" && /closetag/.test(node.className)) continue;
		tyTest.parentNode.insertBefore(node, tyTest);
		i--
	}
	tyTest.parentNode.removeChild(tyTest);
	real.parentNode.removeChild(real)
}

//閫氭爮瀵艰埅
tyMap['1'] = function() {
	document.writeln("<script type=\"text/javascript\" src=\"http://www.5857.com/caches/poster_js/banner.js\"></script>");
}

tyMap['2'] = function() {
	document.writeln("<script type=\"text/javascript\" src=\"http://www.5857.com/caches/poster_js/banner1.js\"></script>");
}

//鍏ㄧ珯閫氭爮
tyMap['3'] = function() {
	document.writeln("<div style=\'width:1200px;margin:0 auto;margin-top:5px;\'>");
	document.writeln("<script type=\"text/javascript\" src=\"https://statics.3987.com/all_site/5857com/120.js\"></script>");
	document.writeln("</div>");

}

//鍒楄〃椤靛ぇ瀹堕兘鍦ㄦ祻瑙堥《閮�
tyMap['4'] = function() {

}

//鍐呴〉鍥剧墖涓婃柟
tyMap['5'] = function() {

}

//鍐呴〉鏍囩涓婃柟
tyMap['6'] = function() {
	document.writeln("<div style=\'width:1200px;margin:0 auto;\'>");
	document.writeln("<script type=\"text/javascript\" src=\"https://statics.3987.com/all_site/5857com/121.js\"></script>");
	document.writeln("</div>");
}

//鍐呴〉鐩稿叧澹佺焊涓婃柟
tyMap['7'] = function() {

}

//鍐呴〉鐑棬鏍囩涓婃柟
tyMap['8'] = function() {
}


tyMap['9'] = function() {
	document.writeln("<div style=\'width:1200px;margin:0 auto;\'>");
	document.writeln("<script type=\"text/javascript\" src=\"https://statics.3987.com/all_site/5857com/122.js\"></script>");
	document.writeln("</div>");
}
tyMap['11'] = function() {

}

//涓撻姹囨€讳笂鏂�
tyMap['12'] = function() {

}

tyMap['13'] = function() {
}

tyMap['14'] = function() {

}

tyMap['15'] = function() {

}

tyMap['20'] = function() {
	document.writeln("<script>");
	document.writeln("var _hmt = _hmt || [];");
	document.writeln("(function() {");
	document.writeln("var hm = document.createElement(\'script\');");
	document.writeln("hm.src = \'https://hm.baidu.com/hm.js?7e5db5fc25d22aea38eb444e3d5cb4aa\';");
	document.writeln("var s = document.getElementsByTagName(\'script\')[0]; ");
	document.writeln("s.parentNode.insertBefore(hm, s);");
	document.writeln("})();");
	document.writeln("</script>");
	//cnzz
	document.writeln("<script src=\'https://s4.cnzz.com/z_stat.php?id=1259579670&web_id=1259579670\' language=\'JavaScript\'></script>");

	//鐧惧害绔欓暱鎺ㄩ€�
	document.writeln("<script>");
	document.writeln("(function(){");
	document.writeln("var bp = document.createElement(\'script\');");
	document.writeln("var curProtocol = window.location.protocol.split(\':\')[0];");
	document.writeln("if (curProtocol === \'https\') {");
	document.writeln("bp.src = \'https://zz.bdstatic.com/linksubmit/push.js\';");
	document.writeln("}");
	document.writeln("else {");
	document.writeln("bp.src = \'http://push.zhanzhang.baidu.com/push.js\';");
	document.writeln("}");
	document.writeln("var s = document.getElementsByTagName(\"script\")[0];");
	document.writeln("s.parentNode.insertBefore(bp, s);");
	document.writeln("})();");
	document.writeln("</script>");

	//360绔欓暱鎺ㄩ€�
	document.writeln("<script>");
	document.writeln("(function(){");
	document.writeln("var src = (document.location.protocol == \'http:\') ? \'http://js.passport.qihucdn.com/11.0.1.js?695fbcecd842bf0f5f5195be5dc89fca\':\'https://jspassport.ssl.qhimg.com/11.0.1.js?695fbcecd842bf0f5f5195be5dc89fca\';");
	document.writeln("document.write(\"<script src=\'\' + src + \'\' id=\'sozz\'><\/\//script>\");");
	document.writeln("})();");
	document.writeln("</script>");

	document.writeln("<script type=\"text/javascript\" src=\"https://statics.3987.com/all_site/3987com/181.js\"></script>");

	$("#bottomclose").click(function() {
		$("#botoomfooter").hide();
	})

}

//鍥炬枃澶╀笅
tyMap['25'] = function() {}
tyMap['26'] = function() {}
tyMap['27'] = function() {}
tyMap['28'] = function() {}
tyMap['29'] = function() {}
tyMap['30'] = function() {}
tyMap['31'] = function() {}
tyMap['32'] = function() {}
tyMap['33'] = function() {}

//鍒楄〃椤靛簳閮�
tyMap['40'] = function() {
	/*document.writeln("<script type=\'text/javascript\' language=\'javascript\' charset=\'utf-8\'  src=\'//static.mediav.com/js/mvf_news_feed.js\'></script>");
	document.writeln("<script>");
	document.writeln("NEWS_FEED({\'w\':1200,\'h\':0,\'showid\':\'oKXcKu\',\'sign\':\'show_44ccbf0a\',\'inject\':\'bottom\',\'layout\':\'singleColumn\',\'userConf\':{\'titleFontSize\':14,\'titleFontColor\':\'#000000\',\'contentBackground\':\'#ffffff\',\'titleHover\':\'#ff1e34\',\'titleFontFamily\':\'Microsoft YaHei\',\'tabFontColor\':\'#0c69d4\',\'tabFontSize\':14,\'tabFontFamily\':\'Microsoft YaHei\',\'tabBackground\':\'#ffffff\',\'tabActive\':\'#d43d3d\',\'tabHover\':\'#ff1e34\',\'isShowTab\':true}});");
	document.writeln("</script>");*/
}