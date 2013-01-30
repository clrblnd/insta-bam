/*

 insta-bam

 Created at: 2012-11-20 21:22:09 +0100
 Updated at: 2013-01-30 10:40:47 +0100

 Author: @clrblnd (+ @ivow for the way of the code)
 Version: 1.2.2

*/
(function(c,e){function f(a,b,d){this.element=a;this.options=c.extend({},k,d);this.url=b;this.id=this.url.hashCode();this.cache=e.sessionStorage[g+this.id];this.init()}var g="instaBam",k={doneCallback:null,tmpl_feed:'<a href="{{instagram_url}}" class="instabam"><img src="{{instagram}}" alt="{{caption}}" data-likes="{{likes}}" /><time datetime="{{created_at_iso}}" title="{{created_at_formatted}}">{{created_at_formatted}}</time></a>'};f.prototype.init=function(){var a=this;e.JSON&&e.Storage&&void 0!==
a.cache?a.output(c.parseJSON(a.cache)):c.ajax({dataType:"jsonp",success:function(b){e.JSON&&e.Storage&&(e.sessionStorage[g+a.id]=JSON.stringify(b));a.output(b)},url:a.url})};f.prototype.output=function(a){var b=this,d=c(this.element),h=[],f=c("<ul />");b.options.whitelist?-1!=b.url.indexOf("https://api.instagram.com/v1/tags/")?c.each(a.data,function(a,j){-1!=c.inArray(j.user.username,b.options.whitelist)&&h.push(j)}):-1!=b.url.indexOf("https://api.instagram.com/v1/users/")?c.each(a.data,function(a,
j){c.each(j.tags,function(a,d){-1!=c.inArray(d,b.options.whitelist)&&h.push(j)})}):h=a.data:h=a.data;c.each(h,function(a,d){var h=c("<li />"),g=b.options.tmpl_feed,i=new e.Date(parseInt(1E3*d.created_time,10)),k=i.getFullYear()+"-"+(i.getMonth()+1)+"-"+i.getDate(),i=b.createdAtISO(i),g=g.replace(/\{\{instagram_url\}\}/g,d.link).replace(/\{\{instagram\}\}/g,d.images.standard_resolution.url).replace(/\{\{caption\}\}/g,d.caption.text).replace(/\{\{likes\}\}/g,d.likes.count).replace(/\{\{created_at_iso\}\}/g,
i).replace(/\{\{created_at_formatted\}\}/g,k);h.append(c(g)).appendTo(f)});f.appendTo(d);c.isFunction(this.options.doneCallback)&&this.options.doneCallback.call(this.element)};f.prototype.createdAtISO=function(a){function b(a){return 10>a?"0"+a:a}return a.getUTCFullYear()+"-"+b(a.getUTCMonth()+1)+"-"+b(a.getUTCDate())+"T"+b(a.getUTCHours())+":"+b(a.getUTCMinutes())+":"+b(a.getUTCSeconds())+"Z"};c.fn.instafeed=function(a,b){return this.each(function(){c(this).data(g,new f(this,a,b));c(this).data("instaBam")})};
String.prototype.hashCode=function(){var a=0,b,c;if(0===this.length)return a;for(b=0;b<this.length;b++)c=this.charCodeAt(b),a=(a<<5)-a+c,a&=a;return Math.abs(a)}})(jQuery,window);
