/*

 insta-bam

 Created at: 2012-11-20 21:22:09 +0100
 Updated at: 2012-11-26 09:54:23 +0100

 Author: @clrblnd (+ @ivow for the way of the code)
 Version: 0.0.0

*/
(function(d,f){function e(a,b,c){this.element=a;this.options=d.extend({},i,c);this.url=b;this.id=this.url.hashCode();this.cache=f.sessionStorage[g+this.id];this.init()}var g="instaBam",i={doneCallback:null,tmpl_feed:'<a href="{{instagram_url}}"><img src="{{instagram}}" alt="{{caption}}" data-likes="{{likes}}" /><time datetime="{{created_at_iso}}" title="{{created_at_formatted}}">{{created_at_formatted}}</time></a>'};e.prototype.init=function(){var a=this;f.JSON&&f.Storage&&void 0!==a.cache?a.output(d.parseJSON(a.cache)):
d.ajax({dataType:"jsonp",success:function(b){f.JSON&&f.Storage&&(f.sessionStorage[g+a.id]=JSON.stringify(b));a.output(b)},url:a.url})};e.prototype.output=function(a){var b=this,c=d(this.element),e=[],g=d("<ul />");b.options.whitelist?d.each(a.data,function(a,c){-1!=d.inArray(c.user.username,b.options.whitelist)&&e.push(c)}):e=a.data;d.each(e,function(a,c){var e=d("<li />"),j=b.options.tmpl_feed,h=new f.Date(parseInt(1E3*c.created_time,10)),i=h.getFullYear()+"-"+(h.getMonth()+1)+"-"+h.getDate(),h=
b.createdAtISO(h),j=j.replace(/\{\{instagram_url\}\}/g,c.link).replace(/\{\{instagram\}\}/g,c.images.standard_resolution.url).replace(/\{\{caption\}\}/g,c.caption.text).replace(/\{\{likes\}\}/g,c.likes.count).replace(/\{\{created_at_iso\}\}/g,h).replace(/\{\{created_at_formatted\}\}/g,i);e.append(d(j)).appendTo(g)});g.appendTo(c);d.isFunction(this.options.doneCallback)&&this.options.doneCallback.call(this.element)};e.prototype.createdAtISO=function(a){function b(a){return 10>a?"0"+a:a}return a.getUTCFullYear()+
"-"+b(a.getUTCMonth()+1)+"-"+b(a.getUTCDate())+"T"+b(a.getUTCHours())+":"+b(a.getUTCMinutes())+":"+b(a.getUTCSeconds())+"Z"};d.fn.instafeed=function(a,b){return this.each(function(){d(this).data(g,new e(this,a,b));var c=d(this).data("instaBam");console.log(c.url)})};String.prototype.hashCode=function(){var a=0,b,c;if(0===this.length)return a;for(b=0;b<this.length;b++)c=this.charCodeAt(b),a=(a<<5)-a+c,a&=a;return Math.abs(a)}})(jQuery,window);
