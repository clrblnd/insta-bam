/** @preserve
 * insta-bam
 *
 * Created at: 2012-11-20 21:22:09 +0100
 * Updated at: 2012-11-23 17:31:06 +0100
 *
 * Author: @clrblnd (+ @ivow for the way of the code)
 * Version: 0.0.0
 *
 */

/*global jQuery:false*/

(function($, window) {
  "use strict";

  var tmpl_feed = '<a href="{{instagram_url}}"><img src="{{instagram}}" alt="{{caption}}" data-likes="{{likes}}" /><time datetime="{{created_at_iso}}" title="{{created_at_formatted}}">{{created_at_formatted}}</time></a>';

  var plugin_name = 'insta-bam',
      defaults    = {
        doneCallback: null,
        tmpl_feed: tmpl_feed
      },
      ISODateString;

  function InstaFeed(element, options){
    this.element  = element;
    this.id       = window.location.pathname.hashCode();
    this.options  = $.extend( {}, defaults, options);
    this.cache    = window.sessionStorage[plugin_name + this.id];
    this.url      = "https://api.instagram.com/v1/tags/" + options.tag + "/media/recent?access_token=" + options.accesstoken;

    this.init();
  }

  InstaFeed.prototype.init = function(){
    var _this = this;

    if ( window.JSON && window.Storage && this.cache !== undefined) {
      this.output( $.parseJSON(this.cache) );
    } else {
      $.ajax({
        dataType: 'jsonp',
        success: function( response_data ){
          if ( window.JSON && window.Storage ) {
            window.sessionStorage[plugin_name + _this.id] = JSON.stringify( response_data );
          }
          _this.output( response_data );
        },
        url: _this.url
      });

    }

  };

  InstaFeed.prototype.output = function(data){
    var _this = this,
    feed_result = [],
    $ul = $('<ul />');

    // check for preferred users
    if(_this.options.whitelist) {

      $.each( data.data, function(idx, value){

        if($.inArray(value.user.username,_this.options.whitelist) != -1) feed_result.push(value);

      });

    } else {

      feed_result = data.data;

    }

    // then read out result
    $.each( feed_result, function(idx, value) {

      console.log('idx ' + idx + " value " + value.filter);

      var $li                   = $('<li />'),
          template              = _this.options.tmpl_feed,
          created_at            = _this.createdAt( value.created_time ),
          created_at_formatted  = created_at.getFullYear() + '-' + (created_at.getMonth() + 1) + '-' + created_at.getDate(),
          created_at_iso        = _this.createdAtISO( created_at );

      template = template
        .replace(/\{\{instagram_url\}\}/g         , value.link)
        .replace(/\{\{instagram\}\}/g             , value.images.standard_resolution.url)
        .replace(/\{\{caption\}\}/g               , value.caption.text)
        .replace(/\{\{likes\}\}/g                 , value.likes.count)
        .replace(/\{\{created_at_iso\}\}/g        , created_at_iso)
        .replace(/\{\{created_at_formatted\}\}/g  , created_at_formatted);

      $li
        .append( $(template) )
        .appendTo( $ul );

    });

console.log($ul);

    // append content to element
    $ul.appendTo( $(this.element) );

    if ( $.isFunction( this.options.doneCallback) ) {
      this.options.doneCallback.call( this.element );
    }
  };

  InstaFeed.prototype.createdAt = function( time_value ) {
    var values = time_value.split(" ");
    return new Date( values[1] + " " + values[2] + ", " + values[5] + " " + values[3] );
  };

  InstaFeed.prototype.createdAtISO = function( date ) {
    function pad(n) {
      return n < 10 ? '0' + n : n;
    }
    return date.getUTCFullYear() + '-' + pad( date.getUTCMonth() + 1 ) + '-' + pad( date.getUTCDate() )+ 'T' + pad( date.getUTCHours() ) + ':' + pad( date.getUTCMinutes() ) + ':' + pad( date.getUTCSeconds() ) + 'Z';
  }

  // function
  $.fn.instafeed = function(options){

    return new InstaFeed( this, options );

  };

  // Helpers
  String.prototype.hashCode = function(){
    var hash = 0,
        i,
        character;

    if (this.length === 0) {
      return hash;
    }

    for (i = 0; i < this.length; i++) {
        character = this.charCodeAt(i);
        hash = ((hash<<5)-hash)+character;
        hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash);
  };

}(jQuery, window));
