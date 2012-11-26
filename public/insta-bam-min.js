/*

 insta-bam

 Created at: 2012-11-20 21:22:09 +0100
 Updated at: 2012-11-26 17:54:33 +0100

 Author: @clrblnd (+ @ivow for the way of the code)
 Version: 1.0.0

*/
(function(d,e){function f(a,b,c){this.element=a;this.options=d.extend({},j,c);this.url=b;this.id=this.url.hashCode();this.cache=e.sessionStorage[g+this.id];this.init()}var g="instaBam",j={doneCallback:null,tmpl_feed:'<a href="{{instagram_url}}" class="instabam"><img src="{{instagram}}" alt="{{caption}}" data-likes="{{likes}}" /><time datetime="{{created_at_iso}}" title="{{created_at_formatted}}">{{created_at_formatted}}</time></a>'};f.prototype.init=function(){var a=this;e.JSON&&e.Storage&&void 0!==
a.cache?a.output(d.parseJSON(a.cache)):d.ajax({dataType:"jsonp",success:function(b){e.JSON&&e.Storage&&(e.sessionStorage[g+a.id]=JSON.stringify(b));a.output(b)},url:a.url})};f.prototype.output=function(a){var b=this,c=d(this.element),h=[],f=d("<ul />");console.log(a.data);b.options.whitelist?-1!=b.url.indexOf("https://api.instagram.com/v1/tags/")?d.each(a.data,function(a,c){-1!=d.inArray(c.user.username,b.options.whitelist)&&h.push(c)}):-1!=b.url.indexOf("https://api.instagram.com/v1/users/")?d.each(a.data,
function(a,c){d.each(c.tags,function(a,e){-1!=d.inArray(e,b.options.whitelist)&&h.push(c)})}):h=a.data:h=a.data;d.each(h,function(a,c){var h=d("<li />"),g=b.options.tmpl_feed,i=new e.Date(parseInt(1E3*c.created_time,10)),j=i.getFullYear()+"-"+(i.getMonth()+1)+"-"+i.getDate(),i=b.createdAtISO(i),g=g.replace(/\{\{instagram_url\}\}/g,c.link).replace(/\{\{instagram\}\}/g,c.images.standard_resolution.url).replace(/\{\{caption\}\}/g,c.caption.text).replace(/\{\{likes\}\}/g,c.likes.count).replace(/\{\{created_at_iso\}\}/g,
i).replace(/\{\{created_at_formatted\}\}/g,j);h.append(d(g)).appendTo(f)});f.appendTo(c);d.isFunction(this.options.doneCallback)&&this.options.doneCallback.call(this.element)};f.prototype.createdAtISO=function(a){function b(a){return 10>a?"0"+a:a}return a.getUTCFullYear()+"-"+b(a.getUTCMonth()+1)+"-"+b(a.getUTCDate())+"T"+b(a.getUTCHours())+":"+b(a.getUTCMinutes())+":"+b(a.getUTCSeconds())+"Z"};d.fn.instafeed=function(a,b){return this.each(function(){d(this).data(g,new f(this,a,b));var c=d(this).data("instaBam");
console.log(c.url)})};String.prototype.hashCode=function(){var a=0,b,c;if(0===this.length)return a;for(b=0;b<this.length;b++)c=this.charCodeAt(b),a=(a<<5)-a+c,a&=a;return Math.abs(a)}})(jQuery,window);
