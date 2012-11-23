/*

 insta-bam

 Created at: 2012-11-20 21:22:09 +0100
 Updated at: 2012-11-23 17:31:06 +0100

 Author: @clrblnd (+ @ivow for the way of the code)
 Version: 0.0.0

*/
(function(d,c){function f(a,b){this.element=a;this.id=c.location.pathname.hashCode();this.options=d.extend({},j,b);this.cache=c.sessionStorage[h+this.id];this.url="https://api.instagram.com/v1/tags/"+b.tag+"/media/recent?access_token="+b.accesstoken;this.init()}var h="insta-bam",j={doneCallback:null,tmpl_feed:'<a href="{{instagram_url}}"><img src="{{instagram}}" alt="{{caption}}" data-likes="{{likes}}" /><time datetime="{{created_at_iso}}" title="{{created_at_formatted}}">{{created_at_formatted}}</time></a>'};
f.prototype.init=function(){var a=this;c.JSON&&c.Storage&&void 0!==this.cache?this.output(d.parseJSON(this.cache)):d.ajax({dataType:"jsonp",success:function(b){c.JSON&&c.Storage&&(c.sessionStorage[h+a.id]=JSON.stringify(b));a.output(b)},url:a.url})};f.prototype.output=function(a){var b=this,e=[],c=d("<ul />");b.options.whitelist?d.each(a.data,function(a,c){-1!=d.inArray(c.user.username,b.options.whitelist)&&e.push(c)}):e=a.data;d.each(e,function(a,e){console.log("idx "+a+" value "+e.filter);var f=
d("<li />"),i=b.options.tmpl_feed,g=b.createdAt(e.created_time),h=g.getFullYear()+"-"+(g.getMonth()+1)+"-"+g.getDate(),g=b.createdAtISO(g),i=i.replace(/\{\{instagram_url\}\}/g,e.link).replace(/\{\{instagram\}\}/g,e.images.standard_resolution.url).replace(/\{\{caption\}\}/g,e.caption.text).replace(/\{\{likes\}\}/g,e.likes.count).replace(/\{\{created_at_iso\}\}/g,g).replace(/\{\{created_at_formatted\}\}/g,h);console.log(i);f.append(d(i)).appendTo(c)});c.appendTo(d(this.element));d.isFunction(this.options.doneCallback)&&
this.options.doneCallback.call(this.element)};f.prototype.createdAt=function(a){a=a.split(" ");return new Date(a[1]+" "+a[2]+", "+a[5]+" "+a[3])};f.prototype.createdAtISO=function(a){function b(a){return 10>a?"0"+a:a}return a.getUTCFullYear()+"-"+b(a.getUTCMonth()+1)+"-"+b(a.getUTCDate())+"T"+b(a.getUTCHours())+":"+b(a.getUTCMinutes())+":"+b(a.getUTCSeconds())+"Z"};d.fn.instafeed=function(a){return new f(this,a)};String.prototype.hashCode=function(){var a=0,b,c;if(0===this.length)return a;for(b=0;b<
this.length;b++)c=this.charCodeAt(b),a=(a<<5)-a+c,a&=a;return Math.abs(a)}})(jQuery,window);
