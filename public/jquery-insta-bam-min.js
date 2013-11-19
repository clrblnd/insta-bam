/*

 insta-bam

 Created at: 2012-11-20 21:22:09 +0100
 Updated at: 2013-11-19 16:21:40 +0100

 Author: @clrblnd (+ @ivow for the way of the code)
 Version: 1.2.2

*/
(function(c,e){function f(a,b,d){this.element=a;this.options=c.extend({},m,d);this.url=b;this.id=this.url.hashCode();this.cache=e.sessionStorage[g+this.id];this.init()}var g="instaBam",m={doneCallback:null,list:null,tmpl_feed:'<a href="{{instagram_url}}" class="instabam"><img src="{{instagram}}" alt="{{caption}}" data-likes="{{likes}}" /><time datetime="{{created_at_iso}}" title="{{created_at_formatted}}">{{created_at_formatted}}</time></a>'};f.prototype.init=function(){var a=this;e.JSON&&e.Storage&&
void 0!==a.cache?a.output(c.parseJSON(a.cache)):c.ajax({dataType:"jsonp",success:function(b){200!==b.meta.code?c.isFunction(a.options.onErrorAPI)&&a.options.onErrorAPI.call(a.element,b):(e.JSON&&e.Storage&&(e.sessionStorage[g+a.id]=JSON.stringify(b)),a.output(b))},url:a.url})};f.prototype.output=function(a){var b=this,d=c(this.element),h=[],f=this.options.list?this.options.list:c("<ul />");b.options.whitelist?-1!=b.url.indexOf("https://api.instagram.com/v1/tags/")?c.each(a.data,function(a,l){-1!=
c.inArray(l.user.username,b.options.whitelist)&&h.push(l)}):-1!=b.url.indexOf("https://api.instagram.com/v1/users/")?c.each(a.data,function(a,l){c.each(l.tags,function(a,d){-1!=c.inArray(d,b.options.whitelist)&&h.push(l)})}):h=a.data:h=a.data;c.each(h,function(a,d){var h=c("<li />"),g=b.options.tmpl_feed,k=new e.Date(parseInt(1E3*d.created_time,10)),m=k.getFullYear()+"-"+(k.getMonth()+1)+"-"+k.getDate(),k=b.createdAtISO(k),n=d.caption?d.caption.text:"",g=g.replace(/\{\{instagram_url\}\}/g,d.link).replace(/\{\{instagram\}\}/g,
d.images.standard_resolution.url).replace(/\{\{caption\}\}/g,n).replace(/\{\{likes\}\}/g,d.likes.count).replace(/\{\{created_at_iso\}\}/g,k).replace(/\{\{created_at_formatted\}\}/g,m);h.append(c(g)).appendTo(f)});f.appendTo(d);c.isFunction(this.options.doneCallback)&&this.options.doneCallback.call(this.element)};f.prototype.createdAtISO=function(a){function b(a){return 10>a?"0"+a:a}return a.getUTCFullYear()+"-"+b(a.getUTCMonth()+1)+"-"+b(a.getUTCDate())+"T"+b(a.getUTCHours())+":"+b(a.getUTCMinutes())+
":"+b(a.getUTCSeconds())+"Z"};c.fn.instafeed=function(a,b){return this.each(function(){c(this).data(g,new f(this,a,b));c(this).data("instaBam")})};String.prototype.hashCode=function(){var a=0,b,c;if(0===this.length)return a;for(b=0;b<this.length;b++)c=this.charCodeAt(b),a=(a<<5)-a+c,a&=a;return Math.abs(a)}})(jQuery,window);
