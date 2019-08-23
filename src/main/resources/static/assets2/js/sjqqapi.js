var qqapiConfig = {

    url : "http://img2.sj.qq.com/api/",

    installerUrl : "http://agent.sj.qq.com/webservices/installer.do",

    qqphonemanagerUrl :"http://androidpc.app.qq.com/app1/downUrlJump.do?pv=2"

}

function ExtApi()

{

	var Ext = null;

	var IsIe = false;

	function LoadExt(bReload)

	{

		if(bReload || Ext == null)

		{

			var ua = navigator.userAgent.toLocaleLowerCase();

			IsIe = /msie/i.test(ua) && !/opera/.test(ua);

			if  (IsIe) {

				try {

					Ext = new ActiveXObject("QQAppIEAgentEx.AgentForAndroid");

					if(Ext)

					{

						Ext.TestClient();

					}

				} catch (e) {

					Ext = null;

				}

			}

			else {

				var html ='<embed id="qqappPlugin" width="0" height="0" type="application/qqphonemanagerplugin" >';

				if (document.getElementById("qqappextcontainer")!=null) {

					document.getElementById("qqappextcontainer").innerHTML=html;

				}

				else {

					var qqappextcontainer=document.createElement("div");

					qqappextcontainer.setAttribute("id","qqappextcontainer");

					qqappextcontainer.innerHTML=html;

					document.getElementsByTagName("body")[0].appendChild(qqappextcontainer);

				}

				Ext = document.getElementById("qqappPlugin");

				if(Ext)

				{

					try {

						Ext.TestClient();

					}

					catch(e)

					{

						//Ext.InitActiveX('QQAppIEAgentEx.AgentForAndroid');

						Ext = null;

					}

				}

			}

		}

		return Ext != null;

	}



	this.Init = function() {

		return LoadExt(true);

	}



	this.GetPluginVersion = function() {

		var result = -1;

		if(LoadExt())

		{

			try {

				result = Ext.GetPluginVersion();

			}

			catch(e)

			{

				result = -2;

			}

		}

		return result;

	}



	this.TestClient = function() {

		var result = -1;

		if(LoadExt())

		{

			try {

				result = Ext.TestClient();

			}

			catch(e)

			{

				result = -2;

			}

		}

		return result;

	}



	this.TestClientAssistant = function() {

		var result = -1;

		if(LoadExt())

		{

			try {

				result = Ext.TestClientAssistant();

			}

			catch(e)

			{

				result = -2;

			}

		}

		return result;

	}



	this.InstallClient = function(lMinVersion, strUrl, strParam) {

		var result = -1;

		if(LoadExt())

		{

			try {

				result = Ext.InstallClient(lMinVersion, strUrl, strParam);

			}

			catch(e)

			{

				result = -2;

			}

		}

		return result;

	}

	

	this.InstallClientEx = function(lMinVersion, strVersion, strChannelID, strParam) {

		var result = -1;

		if(LoadExt())

		{

			try {

				result = Ext.InstallClientEx(lMinVersion, strVersion, strChannelID, strParam);

			}

			catch(e)

			{

				result = -2;

			}

		}

		return result;

	}



	this.InstallToPhone = function(strParam) {

		var result = -1;

		if(LoadExt())

		{

			try {

				result = Ext.InstallToPhone(strParam);

			}

			catch(e)

			{

				result = -2;

			}

		}

		return result;

	}

}



var qqapiDotNet = function() {	

	var dotNETRuntimeVersion = "2.0.50727";

	var result;

	var apiurl = qqapiConfig.url;

	function IsIEAndNet(){

		if (HasRuntimeVersion(dotNETRuntimeVersion)){

	        return true

	    } 

	    else{

			dotNETRuntimeVersion = "4.0";

	        if(HasRuntimeVersionBase4(dotNETRuntimeVersion)){

				return true

			} 

			else{

				return false

			}

		}

	}

	function InstallAndDown(urlParam,downurl){



			dotNETRuntimeVersion = "2.0.50727";

	      	if (HasRuntimeVersion(dotNETRuntimeVersion)){

	        	result = apiurl+"Plugin/2.0/qpmco.application"

				var url = result + "?cu=" + downurl + "&up=" + encodeURIComponent(urlParam);

				result = url;

			

				if(IsIE7()){

					QQApi.RunUrl(result);

					//window.location.href = result;

				}

				else{

					QQApi.RunUrl(result);

					//window.open(result,'Installer','height=1,width=1,top=0,left=0,toolbar=no,menubar=no,scrollbars=no,resizable=no,location=no,status=no'); 

					//window.location.href = result;

				}

			

			

	      	} 

	      	else{

				dotNETRuntimeVersion = "4.0";

			

	        	if(HasRuntimeVersionBase4(dotNETRuntimeVersion)){

					result = apiurl +"Plugin/4.0/qpmco.application";

					var url = result + "?cu=" + downurl + "&up=" + encodeURIComponent(urlParam);

					result = url;

				

					if(IsIE7()){

						QQApi.RunUrl(result);

						//window.location.href = result;

					}	

					else{

						//window.open(result,'Installer','height=1,width=1,top=0,left=0,toolbar=no,menubar=no,scrollbars=no,resizable=no,location=no,status=no');

						QQApi.RunUrl(result);

						//window.location.href = result;

					}

				} 



	      	}	



	    }

	    

	    //

	    // Retrieve the version from the user agent string and 

	    // compare with the specified version.

	    //

	    function HasRuntimeVersion(versionToCheck){

	    	var userAgentString = navigator.userAgent.match(/.NET CLR [0-9.]+/g);

	      	if (userAgentString != null){

	      		var i;



	        	for (i = 0; i < userAgentString.length; ++i){

	          		if (CompareVersions(GetVersion(versionToCheck),GetVersion(userAgentString[i])) <= 0)

	            	return true;

	        	}

	    	}

	        	return false;

	    }

		

		function HasRuntimeVersionBase4(versionToCheck){

	    	var userAgentString = navigator.userAgent.match(/.NET[0-9.]+/g);

			if (userAgentString != null){

	        	var i;

	        	for (i = 0; i < userAgentString.length; ++i){

	          		if (CompareVersions(GetVersionBase4(versionToCheck),GetVersionBase4(userAgentString[i])) <= 0)

	            	return true;

	        	}

	      	}

		  

	      	return false;

	    }

	    //

	    // Extract the numeric part of the version string.

	    //

	    function GetVersion(versionString){

			

			var numericString;

			

			try{

				numericString = versionString.match(/([0-9]+)\.([0-9]+)\.([0-9]+)/i);

				numericString = numericString.slice(1)

			}

			catch(e){

				numericString = -1;//11111111111111111111111111111111

			}	  

			  return numericString;

	    }



		function GetVersionBase4(versionString){

			var numericString;

			

			try{

				numericString = versionString.match(/([0-9]+)\.([0-9]+)/i);

				numericString = numericString.slice(1)

			}

			catch(e){

				numericString = -1;//11111111111111111111111111111111

			}	  

			return numericString;

	    }

	    //

	    // Compare the 2 version strings by converting them to numeric format.

	    //

	    function CompareVersions(version1, version2){

	      for (i = 0; i < version1.length; ++i)

	      {

	        var number1 = new Number(version1[i]);

	        var number2 = new Number(version2[i]);

			

	        if (number1 < number2)

	          return -1;

			  

	        if (number1 > number2)

	          return 1;

	      }



	      return 0;

	    }

		function IsIE7(){

			var browser=navigator.appName



			var b_version=navigator.appVersion



			var version=b_version.split(";");



			var trim_Version=version[1].replace(/[ ]/g,"");



			if(browser=="Microsoft Internet Explorer" && trim_Version=="MSIE7.0"){

				return true;

			}

			else{

				return false;

			}

		}



		//window.qqapiInstallAndDown = InstallAndDown ;

		qqapiDotNet.prototype.exIsIEAndNet = function(){

		

			return false;



			var re =IsIEAndNet();

			return re;

			//alert(111);

		}



		qqapiDotNet.prototype.exInstallAndDown = function(urlParam,downurl){



			InstallAndDown(urlParam,downurl);

		}

		

}			



var ConfigIcon = {

	App:{

		b:qqapiConfig.url+"images/yy.png", //澶у浘鍦板潃

		s:qqapiConfig.url+"images/yy-s.png"  //灏忓浘鍦板潃

	},

	Photo:{

		b:qqapiConfig.url+"images/bz.png",

		s:qqapiConfig.url+"images/bz-s.png"

	},

	Ebook:{

		b:qqapiConfig.url+"images/dzs.png",

		s:qqapiConfig.url+"images/dzs-s.png"

	},

	Video:{

		b:qqapiConfig.url+"images/sp.png",

		s:qqapiConfig.url+"images/sp-s.png"

	},

	Ring:{

		b:qqapiConfig.url+"images/ls.png",

		s:qqapiConfig.url+"images/ls-s.png"

	},

	Theme:{

		b:qqapiConfig.url+"images/zt.png",

		s:qqapiConfig.url+"images/zt-s.png"

	},

	Magazine:{

		b:qqapiConfig.url+"images/zz.png",

		s:qqapiConfig.url+"images/zz-s.png"

	}

};

    //璁剧疆鍥剧墖缂撳瓨

    (function(){

    	var QQAPI_ImgsSrc=new Array();

    	    QQAPI_ImgsSrc[0]=qqapiConfig.url+"/images/sjqq_sprite.png";

    	    QQAPI_ImgsSrc[1]=qqapiConfig.url+"/images/sj.gif";

    	    QQAPI_ImgsSrc[2]=qqapiConfig.url+"/images/sjbg.png";

    	for(var i=0;i<QQAPI_ImgsSrc.length;i++){

    		var QQAPI_Img = new Image();

    		QQAPI_Img.src=QQAPI_ImgsSrc[i];

    	}

    	   

    })();



    //璁剧疆鍥剧墖ie6缂撳瓨

   (function(){

    	if(window.ActiveXObject){

			var browser=navigator.appName 

        	var b_version=navigator.appVersion 

        	var version=b_version.split(";"); 

        	var trim_Version=version[1].replace(/[ ]/g,""); 

			if(browser=="Microsoft Internet Explorer" && trim_Version=="MSIE6.0") 

        	{  

    			document.execCommand("BackgroundImageCache", false, true);

       		 }

		}

	})();

	

var QQAPI_UI = {

    util: function() {

        var windowWidth;

     	var windowHeight;

		 if(typeof document.compatMode != 'undefined' && document.compatMode == 'CSS1Compat') {

		 	try{

       	  		windowWidth = window.top.document.documentElement.clientWidth;

       	  		windowHeight= window.top.document.documentElement.clientHeight;

		 	}catch(ex){

		 		windowWidth = document.documentElement.clientWidth;

       	  		windowHeight=document.documentElement.clientHeight;	

		 	}

   		 } else if(typeof document.body != 'undefined' && (document.body.scrollLeft || document.body.scrollTop)) {

   		 	try{

       	  		windowWidth = window.top.document.body.clientWidth;

       	  		windowHeight= window.top.document.body.clientHeight;

		 	}catch(ex){

		 		windowWidth = document.body.clientWidth;

       	  		windowHeight=document.body.clientWidth;	



		 	}

	 }

		

		return {windowWidth:windowWidth, windowHeight:windowHeight};

	},

	UIDEFAULT: function (v, opts) {

		var windowopt = QQAPI_UI.util();

		var scrollTop;

		if (typeof window.pageYOffset != 'undefined') { 

            try{

       	  		scrollTop = window.top.pageYOffset ||  0 ; 

		 	}catch(ex){

		 		scrollTop = window.pageYOffset ||  0  ; 	

		 	}

        } 

        else if (typeof document.compatMode != 'undefined' && 

            document.compatMode != 'BackCompat') { 

        	try{

       	  		scrollTop = window.top.document.documentElement.scrollTop ||  0 ; 

		 	}catch(ex){

       	  		scrollTop = document.documentElement.scrollTop ||  0 ; 	

		 	}

        } 

        else if (typeof document.body != 'undefined') { 

            try{

       	  		scrollTop = window.top.document.body.scrollTop ||  0 ; 

		 	}catch(ex){

       	  		scrollTop = document.body.scrollTop || 0 ; 	

       	  		

		 	}

        } 

		var middle = scrollTop+windowopt.windowHeight/ 2;

		var left = 0;

		var top0=0;

		var top1=0;

		try{

			var inc0 = window.top.document.getElementById('tencent_qqapi_in0');

			var inc1 = window.top.document.getElementById('tencent_qqapi_in1');

		}catch(ex){

			var inc0 = document.getElementById('tencent_qqapi_in0');

			var inc1 = document.getElementById('tencent_qqapi_in1');

		}

		if (v == 0) {



			//var exqqapiDotNet = new qqapiDotNet();

			var apiEx = new ExtApi();



			var options = opts || {};

			options.url = options.url || "http://3g.qq.com";

			options.type = options.type || "soft";

			options.minVersion = options.minVersion  || 0 ;

			options.asistanturlid = options.asistanturlid || 710054;

			options.downversion = opts.downversion|| undefined;

			var strUrl = QQApi.FormatUrl(options);

			var theRes = apiEx.InstallClientEx(options.minVersion,options.downversion,options.asistanturlid,strUrl);



			if(theRes!=-1 && theRes!=-2){



			}else if(QQApi.installClient(opts)){



			}else{

				inc1.style.display="none";

				inc0.style.display="block";

				top0=(middle-inc0.offsetHeight/2) > 0 ? (middle-inc0.offsetHeight/2) : 0;

				inc0.style.top=top0+"px";

			}

		} 

        else if (v == 1) {

        

			inc0.style.display="none";

			inc1.style.display="none";

        }  

           var tencentclose,tencentclose1,sjqqapinext,sjqqapifin,startQQPhone,dckb,apidownloadapp;

           try{

           	tencentclose = window.top.document.getElementById("tencent_qqapi_close0");

           	tencentclose1 = window.top.document.getElementById("tencent_qqapi_close1");

           	sjqqapinext = window.top.document.getElementById("sjqqapi_next");

           	//sjqqapifin = window.top.document.getElementById("sjqqapi_fin");

           	startQQPhone = window.top.document.getElementById('startQQPhone');

           	//dckb=window.top.document.getElementById('dckb');

           	apidownloadapp=window.top.document.getElementById('apidownloadapp');

           }catch(ex){

           	tencentclose = document.getElementById("tencent_qqapi_close0");

           	tencentclose1 = document.getElementById("tencent_qqapi_close1");

           	sjqqapinext = document.getElementById("sjqqapi_next");

           	//sjqqapifin = document.getElementById("sjqqapi_fin");

           	startQQPhone = document.getElementById('startQQPhone');

           	//dckb=document.getElementById('dckb');

           	apidownloadapp=document.getElementById('apidownloadapp');

           }

		   tencentclose.onclick=function(){

				this.className='sjqqapi_close_click';

				inc0.style.display="none";

		   }

		   tencentclose.onmouseover=function(){

				this.className='sjqqapi_close_hover';

		   }

		   tencentclose.onmouseout=function(){

				this.className='sjqqapi_close';

		   }

		   tencentclose1.onclick=function(){

				this.className='sjqqapi_close_click';

				inc1.style.display="none";

		   }

		   tencentclose1.onmouseover=function(){

				this.className='sjqqapi_close_hover';

		   }

		   tencentclose1.onmouseout=function(){

				this.className='sjqqapi_close';

		   }

		   sjqqapinext.onclick=function(){

		   	    //this.className='sjqqapi_nextclick';

				QQApi.forceDownload(opts);

				inc0.style.display="none";

				inc1.style.display="block";

				top1=middle-inc1.offsetHeight/2;

				inc1.style.top=top1+"px";

		   }

		   apidownloadapp.onmouseover=function(){

		   		this.className='sjqqapi_downloadapphover';

		   }

		   apidownloadapp.onmouseout=function(){

		   		this.className='sjqqapi_downloadapp';

		   }

		   /*

		   sjqqapifin.onclick=function(){

		   	    this.className='sjqqapi_nextclick';

				inc1.style.display="none";

		   }

		   sjqqapifin.onmouseover=function(){

				this.className='sjqqapi_nexthover';

		   }

		   sjqqapifin.onmouseout=function(){

				this.className='sjqqapi_next';

		   }

           */

		   startQQPhone.onclick=function(){

				QQApi.forceDownload(opts);

				//QQApi.Download(opts);

			}

			

            /*

		   dckb.onclick=function(){



		   	  if(this.getAttribute("btvalue")=='1'){

		   	  	this.className='sjqqapi_checkboxclick';

		   	  	apidownloadapp.className='sjqqapi_downloadapp';

		   	  	this.setAttribute("btvalue",'2');

		   	  	return;

		   	   }

		   	  if(this.getAttribute("btvalue")=='2'){

		   	   	this.className='sjqqapi_checkbox';

		   	   	apidownloadapp.className='sjqqapi_downloadappdisable';

		   	   	this.setAttribute("btvalue",'1');

		   	   	return;

		   	  }

		   }

		   apidownloadapp.onmouseover=function(){

		   	   if(this.className!='sjqqapi_downloadappdisable'){

				this.className='sjqqapi_downloadapphover';

		   	   }

		   }

		   apidownloadapp.onmouseout=function(){

		   	if(this.className!='sjqqapi_downloadappdisable'){

				this.className='sjqqapi_downloadapp';

		   	}

		   }

           */

		   apidownloadapp.onclick=function(){

	    			QQAPI_UI.DownInstall(opts);

            /*

		   		if(this.className!='sjqqapi_downloadappdisable'){

		   			this.className='sjqqapi_downloadappclick';

	    			QQAPI_UI.DownInstall(opts);

		   		}

                */

	      }

          

            

	},

	DownInstall:function(opts){

        QQApi.RunUrl(opts.asistanturl);

        clearInterval(QQApi.Config.survey);

        QQApi.Config.survey=setInterval(function(){

        

            QQApi.SurveyDownload(opts);

        

        },1000);

            /*

		var checkbox;

		try{

			checkbox=window.top.document.getElementById('dckb');

		}catch(ex){

			checkbox=document.getElementById('dckb');	

		}

       if(checkbox.getAttribute("btvalue")=='2'){

       		QQApi.RunUrl(opts.asistanturl);

			//window.location.href=opts.asistanturl;

			clearInterval(QQApi.Config.survey);

			QQApi.Config.survey=setInterval(function(){

			

				QQApi.SurveyDownload(opts);

			

			},1000);



		

       }else{

       	  this.className='sjqqapi_downloadappdisable';

       	  alert("鎮ㄦ湭鍚屾剰鐢ㄦ埛鍗忚锛岃鍚屾剰鍚庡啀涓嬭浇");

       }

	    */

		

	},

	initPopwinInnerHTML: function (opts) {

		try{

			var tencent_qqapi_in0=window.top.document.getElementById("tencent_qqapi_in0");

			var tencent_qqapi_in1=window.top.document.getElementById("tencent_qqapi_in1");

			var popdiv=window.top.document.getElementById("popwindiv");

		}catch(ex){

			var tencent_qqapi_in0=document.getElementById("tencent_qqapi_in0");

			var tencent_qqapi_in1=document.getElementById("tencent_qqapi_in1");

			var popdiv=document.getElementById("popwindiv");	

		}

		if (tencent_qqapi_in0!=null) {

			if(popdiv!=null){

		        popdiv.removeChild(tencent_qqapi_in0);

			}

		}

		if (tencent_qqapi_in1!=null) {

		    if(popdiv!=null){

		        popdiv.removeChild(tencent_qqapi_in1);

			}

		}

		var _asistanturl = qqapiConfig.installerUrl;

		if(opts.asistanturl&&opts.asistanturl.length>0){

			_asistanturl = opts.asistanturl;

		}

        var installText = 'soft' === opts.type ? '瀹夎' : '涓嬭浇';

        // 鏈畨瑁呭簲鐢ㄥ疂

		var popwinInnerHTML = '<div id="tencent_qqapi_in0" class="sjqqapi_popwin">';

		popwinInnerHTML +='<div class="innner">';

        popwinInnerHTML += '<div class="sjqqapi_head fs14"><div class="sjqqapi_head_install">' + installText + '&nbsp;&nbsp;"</div><div class="sjqqapi_head_title_s">'+opts.title+'</div><div class="sjqqapi_head_install sjqqapiti0">"&nbsp;&nbsp;鍒版墜鏈�</div><button class="sjqqapi_close" id="tencent_qqapi_close0">鍏抽棴</button></div>';

		popwinInnerHTML += '<div class="sjqqapi_content" >';

        popwinInnerHTML += '<div class="sjqqapi_tp pt30 pb20 fs14"><div class="sjqqapi_content_text">' + installText + '搴旂敤鍓嶉渶鍦ㄧ數鑴戜笂瀹夎</div><div class="yyb_bg">&nbsp;</div><div class="sjqqapi_content_text">搴旂敤瀹�</div><div class="clear"></div></div>';

		popwinInnerHTML += '<div class="clear"></div><div class="sjqqapi_c">';

		popwinInnerHTML += '<img src="'+opts.icon.s+'"  width="72" height="72" class="sjqqapi_icon" id="sjqqapi_icon"/>';

		popwinInnerHTML += '<span class="sjqqapi_st_arrow"></span>';

		popwinInnerHTML += '<span class="sjqqapi_sj"></span>';

		//popwinInnerHTML += '<div class="sjqqapi_xyapp"><button class="sjqqapi_checkboxclick" id="dckb" btvalue="2">&nbsp;</button>&nbsp;闃呰骞跺悓鎰�<a href="http://kf.qq.com/info/80465.html" target="_blank" class="c1071bb">鐢ㄦ埛鍗忚</a></div>';

		popwinInnerHTML += '</div>';

		popwinInnerHTML += '<button class="sjqqapi_downloadapp" id="apidownloadapp">绔嬪嵆瀹夎</button>';

		popwinInnerHTML += '<div class="clear"></div>';

		//popwinInnerHTML += '<em class="sjqqapi_tp lh30 pt35" >鍦ㄧ偣鍑烩€滅珛鍗冲畨瑁呪€濇寜閽悗璇烽€夋嫨銆愯繍琛屻€戞垨鑰呫€愭墦寮€銆�</em>';

		popwinInnerHTML += '</div>';

		popwinInnerHTML += '<div class="content_bottom_arrow"></div>';

		popwinInnerHTML += '<div class="sjqqapi_foot">';

		//popwinInnerHTML += '<div class="sjqqapi_next" id="sjqqapi_next">绔嬪嵆瀹夎</div>';

		popwinInnerHTML += '<em class="sjqqapi_foot_info">濡傛灉宸插畨瑁呭簲鐢ㄥ疂锛岃鐐瑰嚮&nbsp;&nbsp;&nbsp;&nbsp;<span class="c1071bb" id="sjqqapi_next">绔嬪嵆鍚姩>></span></em>';

		popwinInnerHTML += '</div>';

		popwinInnerHTML += '</div>';

		popwinInnerHTML += '</div>';

		// 宸插畨瑁呭簲鐢ㄥ疂

		popwinInnerHTML += '<div class="sjqqapi_popwin" id="tencent_qqapi_in1">';

		popwinInnerHTML += '<div class="innner">';

        popwinInnerHTML += '<div class="sjqqapi_head fs14"><div class="sjqqapi_head_install">' + installText + '&nbsp;&nbsp;"</div><div class="sjqqapi_head_title_s">'+opts.title+'</div><div class="sjqqapi_head_install sjqqapiti0">"&nbsp;&nbsp;鍒版墜鏈�</div><button class="sjqqapi_close" id="tencent_qqapi_close1">鍏抽棴</button></div>';

		popwinInnerHTML += '<div class="sjqqapi_content">';

        popwinInnerHTML += '<div class="sjqqapi_tp pt30 pb50 fs14" ><div class="sjqqapi_content_text">姝ｅ湪鍚姩</div><div class="yyb_bg"></div><div class="sjqqapi_content_text">搴旂敤瀹濓紝' + installText + '&nbsp;&nbsp;"</div><div class="sjqqapi_content_app">' + opts.title + '</div><div class="sjqqapi_content_text">"</div><div class="clear"></div></div>';

		//popwinInnerHTML += '<p>搴旂敤 ' + productname + ' 涓嬭浇瀹夎涓紝璇蜂繚鎸佹墜鏈哄拰鐢佃剳澶勪簬杩炴帴鐘舵€併€�</p>';

		//popwinInnerHTML += '<p class="tencent_qqapi_tip">(&nbsp;璇蜂繚鎸佹墜鏈哄拰鐢佃剳澶勪簬杩炴帴鐘舵€�&nbsp;)</p>';

		popwinInnerHTML += '<div class="clear"></div><div class="sjqqapi_c">';

		popwinInnerHTML += '<img src="'+opts.icon.b+'" width="72" height="72" class="sjqqapi_iconimg" id="sjqqapi_iconimg"/>';

		popwinInnerHTML += '<span class="sjqqapi_st"></span>';

		popwinInnerHTML += '<span class="sjqqapi_sj"></span>';

		popwinInnerHTML += '<div class="clear"></div>';

		popwinInnerHTML += '</div>';

		//popwinInnerHTML += '<em class="sjqqapi_tp lh30 pt35" >濡傛灉娌℃湁寮€濮嬩笅杞藉畨瑁咃紝璇风偣鍑�&nbsp;<span class="c1071bb" id="startQQPhone">閲嶆柊鍚姩搴旂敤瀹�</span>&nbsp;鎴�&nbsp;<span class="c1071bb" onclick="window.location.href=\''+_asistanturl+'\'">閲嶆柊瀹夎搴旂敤瀹�</span></em>';

		popwinInnerHTML += '<div class="clear"></div>';

		popwinInnerHTML += '</div>';

		popwinInnerHTML += '<div class="sjqqapi_foot">';

		//popwinInnerHTML += '<div class="sjqqapi_next" id="sjqqapi_fin">瀹�&nbsp;&nbsp;鎴�</div>';

		popwinInnerHTML += '<em class="sjqqapi_foot_info" >濡傛灉娌℃湁寮€濮嬩笅杞藉畨瑁咃紝璇�&nbsp;&nbsp;<span class="c1071bb" id="startQQPhone">閲嶅惎搴旂敤瀹�</span>&nbsp;&nbsp;鎴�&nbsp;&nbsp;<span class="c1071bb" onclick="window.location.href=\''+_asistanturl+'\'">閲嶆柊瀹夎搴旂敤瀹�</span></em>';

		popwinInnerHTML += '</div>';

		popwinInnerHTML += '</div>';

		popwinInnerHTML += '</div>';

		if(popdiv==null){

			try{

				popdiv=window.top.document.createElement("div");

			}catch(ex){

				popdiv=document.createElement("div");	

			}

			popdiv.setAttribute("id","popwindiv");

	    }

	    popdiv.innerHTML=popwinInnerHTML;

	    try{

			window.top.document.getElementsByTagName("body")[0].appendChild(popdiv);

	    }catch(ex){

	    	document.getElementsByTagName("body")[0].appendChild(popdiv);

	    }

	    

	    

		var o= new Image();

        o.src = opts.icon.b;

        var tag=0;

        var imgcomp=setTimeout(function(){

        	if(o.complete){

        		try{

					window.top.document.getElementById('sjqqapi_icon').src=opts.icon.s;

					window.top.document.getElementById('sjqqapi_iconimg').src=opts.icon.b;

        		}catch(ex){

        			document.getElementById('sjqqapi_icon').src=opts.icon.s;

					document.getElementById('sjqqapi_iconimg').src=opts.icon.b;	

        		}

				tag=1;

			}

       },1000);

	}

}



// if implement of QQAPI_UI_CALLBACK, we will call it when install

// callback will get 0 = not installed, 1 = starting QQAppAssistant, 2 = need to install plugin.

// and an options

//var QQAPI_UI_CALLBACK;





var QQApi = {

	Config: {

		Scheme: "qqapp://",

		pluginId: "qqappPlugin",

		installPluginId : "intallQqappPlugin",

		pluginMimeType: "application/qq-appassistant",

		pluginMimeTypeN:"application/qqphonemanagerplugin",

		verCode:0,

		tag:false,

		survey:null

	},

	Utils: {

		DetectBrowser: function () {

			var ua = navigator.userAgent.toLocaleLowerCase();

			var bv = {

				safari: /webkit/i.test(ua) && !this.chrome,

				opera: /opera/i.test(ua),

				firefox: /firefox/i.test(ua),

				ie: /msie/i.test(ua) && !/opera/.test(ua),

				mozilla: /mozilla/i.test(ua) && !/(compatible|webkit)/.test(ua) && !this.chrome,

				chrome: /chrome/i.test(ua) && /webkit/i.test(ua) && /mozilla/i.test(ua)

			}

			return bv;

		},

		EncodeBase64: function (input) {

			var base64key = "ABCDEFGHIJKLMNOP" +

                "QRSTUVWXYZabcdef" +

                "ghijklmnopqrstuv" +

                "wxyz0123456789+/" +

                "=";

			var string = input;

			string = string.replace(/\r\n/g, "\n");

			var utftext = "";

			for (var n = 0; n < string.length; n++) {

				var c = string.charCodeAt(n);

				if (c < 128) {

					utftext += String.fromCharCode(c);

				} else if ((c > 127) && (c < 2048)) {

					utftext += String.fromCharCode((c >> 6) | 192);

					utftext += String.fromCharCode((c & 63) | 128);

				} else {

					utftext += String.fromCharCode((c >> 12) | 224);

					utftext += String.fromCharCode(((c >> 6) & 63) | 128);

					utftext += String.fromCharCode((c & 63) | 128);

				}



			}

			input = utftext;

			var output = "";

			var chr1, chr2, chr3 = "";

			var enc1, enc2, enc3, enc4 = "";

			var i = 0;



			do {

				chr1 = input.charCodeAt(i++);

				chr2 = input.charCodeAt(i++);

				chr3 = input.charCodeAt(i++);



				enc1 = chr1 >> 2;

				enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);

				enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);

				enc4 = chr3 & 63;



				if (isNaN(chr2)) {

					enc3 = enc4 = 64;

				} else if (isNaN(chr3)) {

					enc4 = 64;

				}



				output = output +

            base64key.charAt(enc1) +

            base64key.charAt(enc2) +

            base64key.charAt(enc3) +

            base64key.charAt(enc4);

				chr1 = chr2 = chr3 = "";

				enc1 = enc2 = enc3 = enc4 = "";

			} while (i < input.length);



			return output;

		}

	},

	installClient : function(options){



		var options = options || {};

		options.url = options.url || "http://3g.qq.com";

		options.type = options.type || "soft";

		options.minVersion = options.minVersion  || 0 ;

		options.asistanturlid = options.asistanturlid || "990420"

		var strUrl = QQApi.FormatUrl(options);

		//var downUrl = qqapiConfig.qqphonemanagerUrl+"&qdh="+options.asistanturlid;

		var downUrl = qqapiConfig.qqphonemanagerUrl;

		var browser = QQApi.Utils.DetectBrowser();

		if (browser.ie) {

			var ax = null;

			try {

				ax = new ActiveXObject("QQAppIEAgentEx.AgentForAndroid");

				var nRet = ax.InstallClient(options.minVersion, downUrl, strUrl);

				return (nRet == "1000") ? true : false;

			} catch (e) {

				return false;

	        }

		}

		else {

			var html = "";

			html = '<embed id="' + QQApi.Config.pluginId + '" width="0" height="0" type="' + QQApi.Config.pluginMimeTypeN + '" >';



			if (document.getElementById("qqappextcontainer")!=null) {

				document.getElementById("qqappextcontainer").innerHTML=html;

			}

			else {

				var qqappextcontainer=document.createElement("div");

				qqappextcontainer.setAttribute("id","qqappextcontainer");

				qqappextcontainer.innerHTML=html;

				document.getElementsByTagName("body")[0].appendChild(qqappextcontainer);

			}

			try {

				var nRet = document.getElementById(QQApi.Config.pluginId).InstallClient(options.minVersion,downUrl, strUrl);

				//console.log(nRet);

				//alert(nRet);

				return (nRet == "1000") ? true : false;

			}

			catch (e) {

				//alert("installClient鎻掍欢鏃犳晥");

				return false;

			}

		}

	},

	CheckVersion:function(options){

			options = options || {};

			options.url = options.url || "http://3g.qq.com";

			options.type = options.type || "soft";

			options.plugininstalled = true;

			options.version = 0;

			options.callback = null;

			if (typeof (QQAPI_UI_CALLBACK) === 'function') {

			options.callback = QQAPI_UI_CALLBACK;

		}

		else {

			options.callback = QQAPI_UI.UIDEFAULT;

		}



		var browser = QQApi.Utils.DetectBrowser();



		options.browser = browser;

		var Ex=0;

		if (browser.ie) {

			var ax = null;

			

			//鏂扮殑鎻掍欢

			try {

				ax = new ActiveXObject("QQAppIEAgentEx.AgentForAndroid");

				options.plugininstalled = true;

				options.version = ax.TestClient();

				Ex=1;

			} catch (e) {

	

					options.version = -1;

           }

			//鏂扮殑鎻掍欢娌℃湁鍔犺浇鏃х殑鎻掍欢

			if(!Ex){

				try {

					ax = new ActiveXObject("QQAppIEAgent.AgentForAndroid");

					options.plugininstalled = true;

					options.version = ax.TestClient();

				} catch (e) {

		

						options.version = -1;

	           }

		   }

			

			

		}

		else {

			var html = "";

				html = '<embed id="' + QQApi.Config.pluginId + '" width="0" height="0" type="' + QQApi.Config.pluginMimeTypeN + '" >';



			if (document.getElementById("qqappextcontainer")!=null) {

				document.getElementById("qqappextcontainer").innerHTML=html;

			}

			else {

				 var qqappextcontainer=document.createElement("div");

				 	 qqappextcontainer.setAttribute("id","qqappextcontainer");

					 qqappextcontainer.innerHTML=html;

					 document.getElementsByTagName("body")[0].appendChild(qqappextcontainer);

			}

			try {

				options.version = document.getElementById(QQApi.Config.pluginId).TestClient();

				options.plugininstalled = true;

				Ex=1;

			}

			catch (e) {

				options.version = -1;

			}

			

			if(!Ex){

				var html = "";

				html = '<embed id="' + QQApi.Config.pluginId + '" width="0" height="0" type="' + QQApi.Config.pluginMimeType + '" >';



			if (document.getElementById("qqappextcontainer")!=null) {

				document.getElementById("qqappextcontainer").innerHTML=html;

			}

			else {

				 var qqappextcontainer=document.createElement("div");

				 	 qqappextcontainer.setAttribute("id","qqappextcontainer");

					 qqappextcontainer.innerHTML=html;

					 document.getElementsByTagName("body")[0].appendChild(qqappextcontainer);

			}

			try {

				options.version = document.getElementById(QQApi.Config.pluginId).TestClient();

				options.plugininstalled = true;

			}

			catch (e) {

				options.version = -1;

			}

				

			}

			

		}

		return options;

	},

	forceDownload:function(options){

		

		var opts=QQApi.CheckVersion(options);

		if (opts.version != 0 ) {

			var url = QQApi.FormatUrl(opts);

			setTimeout(function () {

				try {

					clearInterval(QQApi.Config.survey);

					//window.location.href = url;

					QQApi.RunUrl(url);



				} catch (ex) {

				}



			}, 100);

		}



	},

	Download: function (options) {

		var opts=QQApi.CheckVersion(options);

	

		if (opts.version >= QQApi.Config.verCode) {

			var url = QQApi.FormatUrl(opts);

			setTimeout(function () {

				try {

					clearInterval(QQApi.Config.survey);

					//window.location.href = url;

					QQApi.RunUrl(url);

                    

				} catch (ex) {

				}



			}, 100);

		}



		QQApi.ShowResult(opts);

	},

	SurveyDownload: function (options) {

		var opts=QQApi.CheckVersion(options);

		if (opts.version >= QQApi.Config.verCode) {

			var url = QQApi.FormatUrl(opts);

			setTimeout(function () {

				try {

					clearInterval(QQApi.Config.survey);

					//window.location.href = url;

                    QQApi.RunUrl(url);

				} catch (ex) {

				}



			}, 100);

		}

	},

	ImPcDownload: function (options) {

		options = options || {};

		options.url = options.url || "http://3g.qq.com";

		options.type = options.type || "soft";

		options.plugininstalled = false;

		options.version = 0;

		options.callback = null;

			var url = QQApi.FormatUrl(options);

			setTimeout(function () {

				try {

					QQApi.RunUrl(url);

					//window.location.href = url;

				} catch (ex) {

				}



			}, 100);



	},

	FormatUrl: function (options) {

		var url = "";

		url += options.url;

		url += "|type=" + encodeURIComponent(options.type);

		if (options.title) {

			url += "&title=" + encodeURIComponent(options.title.replace(":", ""));

		}

		if (options.api) {

			url += "&api=" + encodeURIComponent(options.api);

		}

		if (options.appid) {

			url += "&appid=" + encodeURIComponent(options.appid);

		}

		if(options.cardpath){

			url += "&cardpath=" + encodeURIComponent(options.cardpath);

		}

		if(options.qq){

			url	+= "&qq=" + encodeURIComponent(options.qq);

		}

		return QQApi.Config.Scheme + QQApi.Utils.EncodeBase64(url);

	},

	ShowResult: function (options) {



		if (options.version >= QQApi.Config.verCode) {

			if (typeof (options.callback) === "function") {

				options.callback(1, options);

			}

		}

		else {

			if (typeof (options.callback) === "function") {

				//alert(1111111)

				options.callback(0, options);

			}

		}

	},

	RunUrl:function(url){

		if(typeof(oneClickOpenSwitch) != "undefined"){

			window.open(url,'Installer','height=1,width=1,top=0,left=0,toolbar=no,menubar=no,scrollbars=no,resizable=no,location=no,status=no');

		}else{

            window.location.href = url;

		}

	}

}



//TIP: 3 鍙傛暟闇€浼犲叆 涓嬭浇鍦板潃, 鏍囬, 搴旂敤id(鍦ㄦ暟鎹簱涓殑id, 鍚屽唴宓岀綉椤典腑鐨刬d.)

var qqapp_dl_apk = function (obj) {//浼犻€� 涓€涓猟om鑺傜偣

	var url = obj.getAttribute("ex_url");

	var appname = obj.getAttribute("appname");

	var appid = obj.getAttribute("appid");

	var title = obj.getAttribute("title");

	var icon=obj.getAttribute("appicon");

	var qq = obj.getAttribute("qq");

	var downversion = obj.getAttribute("downversion");

	var _title = title;

	var appicon={};

	QQApi.Config.verCode=1;

	QQApi.Config.tag=false;

	if(appname&&appname.length>0){

		//鏈塧ppname灞炴€�

		_title = appname;

	}

	var asistanturlid=obj.getAttribute("asistanturlid");

	if(asistanturlid&&asistanturlid.length>0&&asistanturlid!=''){



		var asistanturl=qqapiConfig.installerUrl+"?qdh="+asistanturlid;

		qqapiConfig.qqphonemanagerUrl = qqapiConfig.qqphonemanagerUrl + "&qdh="+asistanturlid ;

	}else{

		var asistanturl = obj.getAttribute("asistanturl");

		qqapiConfig.qqphonemanagerUrl = asistanturl ;

	}

	if(!icon||icon.length==0||icon==''){

		appicon=ConfigIcon.App;

	}else{

		appicon.b=icon;

		appicon.s=icon;

	}

	var opt = { "url": url,"asistanturlid":asistanturlid, "title": _title, "type": "soft", "api":"qqapp","asistanturl":asistanturl,"icon":appicon,"qq":qq, "downversion":downversion};

	QQAPI_UI.initPopwinInnerHTML(opt);

	QQApi.Download(opt);

	

}

//鐢靛瓙涔︿笅杞�

var qqapp_dl_eb=function(obj){

	var url = obj.getAttribute("ex_url"); 	//涓嬭浇鍦板潃

	var title = obj.getAttribute("title");

    var asistanturlid=obj.getAttribute("asistanturlid");	//娓犻亾鍙�

    var dlname=obj.getAttribute("dlname");

    var _title = title;

    var cardpath = obj.getAttribute("cardpath"); //瀛樻斁璇ョ數瀛愪功鐨勮矾寰�

    var dlicon=obj.getAttribute("icon");

    var downversion = obj.getAttribute("downversion");

    var icon={};

    	QQApi.Config.verCode=1711;

    if(dlname&&dlname.length>0){

		//鏈塧ppname灞炴€�

		_title = dlname;

	}

	if(!dlicon||dlicon.length==0||dlicon==''){

		icon=ConfigIcon.Ebook;

	}else{

		icon.b=dlicon;

		icon.s=dlicon;

	}

	if(asistanturlid&&asistanturlid.length>0&&asistanturlid!=''){

		

		var asistanturl="http://agent.sj.qq.com/webservices/installer.do?qdh="+asistanturlid;

		

	}else{

		var asistanturl = obj.getAttribute("asistanturl");

	}

	var opt = { "url": url,"asistanturlid":asistanturlid, "title": _title, "type": "dlbook", "api":"qqapp","asistanturl":asistanturl,"cardpath":cardpath,"icon":icon, "downversion":downversion};

	QQAPI_UI.initPopwinInnerHTML(opt);

	QQApi.Download(opt);

	

}



//绗笁鏂规帴鍏ヨ棰戞ā鍧楄棰戜笅杞�

var qqapp_video=function(obj){

	var url = obj.getAttribute("ex_url"); 	//涓嬭浇鍦板潃

	var title = obj.getAttribute("title");

    var asistanturlid=obj.getAttribute("asistanturlid");	//娓犻亾鍙�

    var dlname=obj.getAttribute("dlname");

    var _title = title;

    var cardpath = obj.getAttribute("cardpath"); //瀛樻斁璇ョ數瀛愪功鐨勮矾寰�

    var downversion = obj.getAttribute("downversion");

    if(dlname&&dlname.length>0){

		//鏈塧ppname灞炴€�

		_title = dlname;

	}

	if(asistanturlid&&asistanturlid.length>0&&asistanturlid!=''){

		

		var asistanturl="http://androidpc.app.qq.com/app1/downUrlJump.do?qdh="+asistanturlid;

		

	}else{

		var asistanturl = obj.getAttribute("asistanturl");

	}

	var opt = { "url": url,"asistanturlid":asistanturlid, "title": _title, "type": "video", "api":"qqapp","asistanturl":asistanturl,"cardpath":cardpath, "downversion":downversion};

	QQApi.ImPcDownload(opt);

	

}

//涓€閿笅杞借棰戜笅杞�

var qqapp_dl_video=function(obj){

	var url = obj.getAttribute("ex_url"); 	//涓嬭浇鍦板潃

	var title = obj.getAttribute("title");

    var asistanturlid=obj.getAttribute("asistanturlid");	//娓犻亾鍙�

    var dlname=obj.getAttribute("dlname");

    var dlicon=obj.getAttribute("icon");

    var downversion = obj.getAttribute("downversion");

    var icon={};

    var _title = title;

    var cardpath = obj.getAttribute("cardpath"); //瀛樻斁璇ョ數瀛愪功鐨勮矾寰�

    	QQApi.Config.verCode=1711;

    if(dlname&&dlname.length>0){

		//鏈塧ppname灞炴€�

		_title = dlname;

	}

	if(asistanturlid&&asistanturlid.length>0&&asistanturlid!=''){

		

		var asistanturl="http://agent.sj.qq.com/webservices/installer.do?qdh="+asistanturlid;

		

	}else{

		var asistanturl = obj.getAttribute("asistanturl");

	}

	if(!dlicon||dlicon.length==0||dlicon==''){

		icon=ConfigIcon.Video;

	}else{

		icon.b=dlicon;

		icon.s=dlicon;

	}

	var opt = { "url": url,"asistanturlid":asistanturlid, "title": _title, "type": "dlvideo", "api":"qqapp","asistanturl":asistanturl,"cardpath":cardpath,"icon":icon, "downversion":downversion};

	QQAPI_UI.initPopwinInnerHTML(opt);

	QQApi.Download(opt);

	

}

//鏉傚織涓嬭浇 

var qqapp_dl_magazine=function(obj){

	var url = obj.getAttribute("ex_url"); 	//涓嬭浇鍦板潃

	var title = obj.getAttribute("title");

    var asistanturlid=obj.getAttribute("asistanturlid");	//娓犻亾鍙�

    var dlname=obj.getAttribute("dlname");

    var _title = title;

    var cardpath = obj.getAttribute("cardpath"); //瀛樻斁璇ョ數瀛愪功鐨勮矾寰�

    var dlicon=obj.getAttribute("icon");

    var downversion = obj.getAttribute("downversion");

    var icon={};

    	QQApi.Config.verCode=1711;

    if(dlname&&dlname.length>0){

		//鏈塧ppname灞炴€�

		_title = dlname;

	}

	if(asistanturlid&&asistanturlid.length>0&&asistanturlid!=''){

		

		var asistanturl="http://agent.sj.qq.com/webservices/installer.do?qdh="+asistanturlid;

		

	}else{

		var asistanturl = obj.getAttribute("asistanturl");

	}

	if(!dlicon||dlicon.length==0||dlicon==''){

		

		icon=ConfigIcon.Magazine;

	}else{

		icon.b=dlicon;

		icon.s=dlicon;

	}

	var opt = { "url": url,"asistanturlid":asistanturlid, "title": _title, "type": "magazine", "api":"qqapp","asistanturl":asistanturl,"cardpath":cardpath,"icon":icon, "downversion":downversion};

	QQAPI_UI.initPopwinInnerHTML(opt);

	QQApi.Download(opt);

	

}



//閾冨０涓嬭浇 

var qqapp_dl_ring=function(obj){

	var url = obj.getAttribute("ex_url"); 	//涓嬭浇鍦板潃

	var title = obj.getAttribute("title");

    var asistanturlid=obj.getAttribute("asistanturlid");	//娓犻亾鍙�

    var dlname=obj.getAttribute("dlname");

    var _title = title;

    var cardpath = obj.getAttribute("cardpath"); //瀛樻斁璇ョ數瀛愪功鐨勮矾寰�

    var dlicon=obj.getAttribute("icon");

    var downversion = obj.getAttribute("downversion");

    var icon={};

    	QQApi.Config.verCode=1711;

    if(dlname&&dlname.length>0){

		//鏈塧ppname灞炴€�

		_title = dlname;

	}

	if(asistanturlid&&asistanturlid.length>0&&asistanturlid!=''){

		

		var asistanturl="http://agent.sj.qq.com/webservices/installer.do?qdh="+asistanturlid;

		

	}else{

		var asistanturl = obj.getAttribute("asistanturl");

	}

	if(!dlicon||dlicon.length==0||dlicon==''){

		

		icon=ConfigIcon.Ring;

	}else{

		icon.b=dlicon;

		icon.s=dlicon;

	}

	var opt = { "url": url,"asistanturlid":asistanturlid, "title": _title, "type": "ring", "api":"qqapp","asistanturl":asistanturl,"cardpath":cardpath,"icon":icon, "downversion":downversion};

	QQAPI_UI.initPopwinInnerHTML(opt);



	QQApi.Download(opt);

	

}



//澹佺焊涓嬭浇 

var qqapp_dl_photo=function(obj){

	var url = obj.getAttribute("ex_url"); 	//涓嬭浇鍦板潃

	var title = obj.getAttribute("title");

    var asistanturlid=obj.getAttribute("asistanturlid");	//娓犻亾鍙�

    var dlname=obj.getAttribute("dlname");

    var _title = title;

    var cardpath = obj.getAttribute("cardpath"); //瀛樻斁璇ョ數瀛愪功鐨勮矾寰�

    var dlicon=obj.getAttribute("icon");

    var downversion = obj.getAttribute("downversion");

    var icon={};

    	QQApi.Config.verCode=1711;

    if(dlname&&dlname.length>0){

		//鏈塧ppname灞炴€�

		_title = dlname;

	}

	if(asistanturlid&&asistanturlid.length>0&&asistanturlid!=''){

		

		var asistanturl="http://agent.sj.qq.com/webservices/installer.do?qdh="+asistanturlid;

		

	}else{

		var asistanturl = obj.getAttribute("asistanturl");

	}

	if(!dlicon||dlicon.length==0||dlicon==''){

		

		icon=ConfigIcon.Photo;

	}else{

		icon.b=dlicon;

		icon.s=dlicon;

	}

	var opt = { "url": url,"asistanturlid":asistanturlid, "title": _title, "type": "photo", "api":"qqapp","asistanturl":asistanturl,"cardpath":cardpath,"icon":icon, "downversion":downversion};

	QQAPI_UI.initPopwinInnerHTML(opt);

	QQApi.Download(opt);

	

}



//涓婚涓嬭浇 

var qqapp_dl_theme=function(obj){

	var url = obj.getAttribute("ex_url"); 	//涓嬭浇鍦板潃

	var title = obj.getAttribute("title");

    var asistanturlid=obj.getAttribute("asistanturlid");	//娓犻亾鍙�

    var dlname=obj.getAttribute("dlname");

    var _title = title;

    var cardpath = obj.getAttribute("cardpath"); //瀛樻斁璇ョ數瀛愪功鐨勮矾寰�

    var dlicon=obj.getAttribute("icon");

    var downversion = obj.getAttribute("downversion");

    var icon={};

    	QQApi.Config.verCode=1711;

    if(dlname&&dlname.length>0){

		//鏈塧ppname灞炴€�

		_title = dlname;

	}

	if(asistanturlid&&asistanturlid.length>0&&asistanturlid!=''){

		

		var asistanturl="http://agent.sj.qq.com/webservices/installer.do?qdh="+asistanturlid;

		

	}else{

		var asistanturl = obj.getAttribute("asistanturl");

	}

	if(!dlicon||dlicon.length==0||dlicon==''){

		

		icon=ConfigIcon.Theme;

	}else{

		icon.b=dlicon;

		icon.s=dlicon;

	}

	var opt = { "url": url,"asistanturlid":asistanturlid, "title": _title, "type": "theme", "api":"qqapp","asistanturl":asistanturl,"cardpath":cardpath,"icon":icon, "downversion":downversion};

	QQAPI_UI.initPopwinInnerHTML(opt);

	QQApi.Download(opt);

	

}
