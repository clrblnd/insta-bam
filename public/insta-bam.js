/** @preserve
 * insta-bam
 *
 * Created at: 2012-11-20 21:22:09 +0100
 * Updated at: 2012-11-24 08:00:18 +0100
 *
 * Author: @clrblnd (+ @ivow for the way of the code)
 * Version: 0.0.0
 *
 */

/*global jQuery:false console window*/

(function($, window) {
  "use strict";

  var tmpl_feed = '<a href="{{instagram_url}}"><img src="{{instagram}}" alt="{{caption}}" data-likes="{{likes}}" /><time datetime="{{created_at_iso}}" title="{{created_at_formatted}}">{{created_at_formatted}}</time></a>';

  var plugin_name = 'instaBam',
      defaults    = {
        doneCallback  : null,
        tmpl_feed     : tmpl_feed
      },
      ISODateString;

  function InstaFeed(element, options){
    this.element  = element;
    this.options  = $.extend( {}, defaults, options );
    this.url      = "https://api.instagram.com/v1/tags/" + options.tag + "/media/recent?access_token=" + options.accesstoken;

    // I've changed your ID, now you can have multiple feeds in your cache
    // Instead of using window.location, use the api url
    this.id       = this.url.hashCode();
    this.cache    = window.sessionStorage[plugin_name + this.id];

    this.init();
  }

  InstaFeed.prototype.init = function(){
    var _this = this;

    if ( window.JSON && window.Storage && _this.cache !== undefined) {
      _this.output( $.parseJSON(_this.cache) );

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

  InstaFeed.prototype.output = function( data ){
    var _this       = this,
        $this       = $(this.element),
        feed_result = [],
        $ul         = $('<ul />');

    // check for preferred users
    if(_this.options.whitelist) {
      $.each( data.data, function(idx, value){
        if ( $.inArray(value.user.username,_this.options.whitelist) != -1 ) {
          feed_result.push(value);
        }
      });

    } else {
      feed_result = data.data;

    }

    // then read out result
    $.each( feed_result, function(idx, value) {

      var $li                   = $('<li />'),
          template              = _this.options.tmpl_feed,
          created_at            = new window.Date( parseInt(value.created_time * 1000, 10) ),
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

    // append content to element
    $ul.appendTo( $this );

    if ( $.isFunction( this.options.doneCallback) ) {
      this.options.doneCallback.call( this.element );
    }
  };

  InstaFeed.prototype.createdAtISO = function( date ) {
    function pad(n) {
      return n < 10 ? '0' + n : n;
    }
    return date.getUTCFullYear() + '-' + pad( date.getUTCMonth() + 1 ) + '-' + pad( date.getUTCDate() )+ 'T' + pad( date.getUTCHours() ) + ':' + pad( date.getUTCMinutes() ) + ':' + pad( date.getUTCSeconds() ) + 'Z';
  };

  // function
  $.fn.instafeed = function( options ){
    // Found the mistake
    // In a jQuery you have to loop your "this", because it's an array of jQuery
    // objects. You return this array, so the jQuery chaining keeps working

    // Not like this
    //return new InstaFeed( this, options );


    // But like this
    // Also check the data attribute we set with the plugin name
    // Via this way, you can access your instance
    return this.each( function() {
      $(this).data( plugin_name, new InstaFeed(this, options) );

      // Access your instance in other code like this
      var instabam_instance = $(this).data( 'instaBam' );
      console.log( instabam_instance );

    });

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
