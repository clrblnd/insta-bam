# Insta-Bam

A simple, lightweight and flexible jQuery-plugin for all your instagram needs. It uses a template based result output, so that you can tweak the results to what you want, without any hassle. Hurrah!

## Features

* Scrape for a hashtag
* Pull in a user-feed
* whitelist results (filter on tags or users)
* apply css style based on # of likes
* very configurable and easy to use

## How to use


### Step 1, create your elment

You first create an element, with a class name that we'll call on later. This div fill be filled with the result output.

```
<span class='instabam results antwerp'></span>
```

### Step 2, include the plugin

Just put it in the head of course

```  
  <script src="http://www.google.com/jsapi?key="></script>
  <script>
    google.load("jquery", "1");
  </script>
  <script src="insta-bam-min.js"></script>
```

### Step 3, bring in the pain!

We can now call a simple jQuery function to our element, and flood it with results.


```  
  <script>

    $(function(){

      var access_token = "133738.60499ed.b5b9f817ef3f4f9a8f08bc22390cde4d",
          client_id    = "60499edcc1a84061b4dd1c97041a3dc3";

      $('.instabam.results.antwerp').instafeed('https://api.instagram.com/v1/tags/antwerp/media/recent?access_token=' + access_token, {
        clientid: client_id,
        whitelist: ['stadantwerpen'],
        doneCallback: function(){
          $(this).find('img').each(function (){
            if($(this).data('likes') >= 20){
              $(this).addClass('likeable');
            }
          });
        }
      });
  </script>
```

## The future will contain

We'll try and keep the plugin relevant. On the drawingboard are the following:

* better integration of the #-likes css style thingie
* nice preloading of the assets
* better error handling


## Thanks

Thanks to @ivow for many usefull tips on tackling the code (the template system is his idea). Thanks to you for using the plugin and letting us know how and where.