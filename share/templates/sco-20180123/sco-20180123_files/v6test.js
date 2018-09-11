jQuery.cookie=function(name,value,options){if(typeof value!="undefined"){options=options||{};if(value===null){value="";options.expires=-1}var expires="";if(options.expires&&(typeof options.expires=="number"||options.expires.toUTCString)){var date;if(typeof options.expires=="number"){date=new Date;date.setTime(date.getTime()+options.expires*24*60*60*1e3)}else{date=options.expires}expires="; expires="+date.toUTCString()}var path=options.path?"; path="+options.path:"";var domain=options.domain?"; domain="+options.domain:"";var secure=options.secure?"; secure":"";document.cookie=[name,"=",encodeURIComponent(value),expires,path,domain,secure].join("")}else{var cookieValue=null;if(document.cookie&&document.cookie!=""){var cookies=document.cookie.split(";");for(var i=0;i<cookies.length;i++){var cookie=jQuery.trim(cookies[i]);if(cookie.substring(0,name.length+1)==name+"="){cookieValue=decodeURIComponent(cookie.substring(name.length+1));break}}}return cookieValue}};"use strict";var v6=v6||{};v6.version="1.30";v6.hosts=["ipv4","ipv6","ipv64"];v6.timeout=4;v6.api_server="//web.archive.org/web/20180122205328/http://www.v6test.develooper.com/";var $target;v6.check_timeout=function(){var now=(new Date).getTime();if(now-v6.start_timer>v6.timeout*1e3){v6.submit_results()}else{v6.timer=setTimeout(function(){v6.check_timeout()},500)}};v6.submit_results=function(){var q="version="+v6.version;for(var i=0;i<v6.hosts.length;i++){var host=v6.hosts[i];q+="&"+host+"=";if(v6.status[host]&&v6.status[host]=="ok"){var response_time=v6.times[host];q+=response_time;q+="&"+host+"_ip="+v6.ip[host];if($target){$target.append(host+": "+"ok<br>")}}else{q+=v6.status[host];if($target){$target.append(host+": failed<br>")}}}var v6uq=$.cookie("v6uq");if(!v6uq){v6uq=v6.uuid()}q+="&v6uq="+v6uq;q+="&site="+v6.site;jQuery.getJSON(v6.api_server+"/c/json?callback=?",q,function(json){if(json.ok&&$target){$target.append("<br>Results submitted, thanks!")}var cookie_path=v6.path||"/";$.cookie("v6uq",v6uq,{expires:10,path:cookie_path})})};v6.get_ip=function(host){var url="//"+host+".v6test.develooper.com/c/ip?callback=?";jQuery.getJSON(url,"",function(json){if(json.ip){v6.ip[host]=json.ip}})};v6.check_count=function(){if(v6.images_loaded==v6.images){for(var i=0;i<v6.hosts.length;i++){var host=v6.hosts[i];if(v6.status[host]=="ok"&&!v6.ip[host]){return}}if(v6.timer)clearTimeout(v6.timer);v6.submit_results()}};v6.test=function(){setTimeout(function(){(new Image).src="//"+v6.uuid()+".mapper.ntppool.org/none"},3200);if(v6.only_once){if($.cookie("v6uq"))return}document.write('<div id="v6test"></div>');v6.times={};v6.status={};v6.ip={};$(window).load(function(){if(v6.target){$target=$(v6.target);$target.append("Testing ipv4 and ipv6 connectivity:")}v6.images=v6.hosts.length;v6.images_loaded=0;var img_tags="";for(var i=0;i<v6.hosts.length;i++){var host=v6.hosts[i];img_tags+='<img id="v6test_img_'+host+'"'+' class="v6test_test_img" '+' src="//'+host+'.v6test.develooper.com/i/t.gif"'+' width="1" height="1">'}$("#v6test").append(img_tags);v6.start_timer=(new Date).getTime();$("img.v6test_test_img").load(function(){var time=(new Date).getTime();var id=$(this).attr("id");var host=id.slice(11);v6.times[host]=time-v6.start_timer;v6.status[host]="ok";$(this).data("isLoaded",true);v6.images_loaded++;v6.check_count();v6.get_ip(host)});$("img.v6test_test_img").error(function(){var id=$(this).attr("id");var host=id.slice(11);v6.status[host]="error";v6.images_loaded++;v6.check_count()});v6.timer=setTimeout(function(){v6.check_timeout()},1e3)})};v6.uuid=function(){var chars="0123456789abcdef".split("");var uuid=[],rnd=Math.random,r;uuid[8]=uuid[13]=uuid[18]=uuid[23]="-";uuid[14]="4";for(var i=0;i<36;i++){if(!uuid[i]){r=0|rnd()*16;uuid[i]=chars[i==19?r&3|8:r&15]}}return uuid.join("")};
/*
     FILE ARCHIVED ON 20:53:28 Jan 22, 2018 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 04:18:10 Sep 11, 2018.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  LoadShardBlock: 299.694 (3)
  esindex: 0.006
  captures_list: 330.941
  CDXLines.iter: 11.159 (3)
  PetaboxLoader3.datanode: 289.24 (5)
  exclusion.robots: 0.244
  exclusion.robots.policy: 0.231
  RedisCDXSource: 1.469
  PetaboxLoader3.resolve: 58.249 (3)
  load_resource: 65.431
*/