$(document).ready(function() {

  // Convert milliseconds into Hours (h), Minutes (m), and Seconds (s)
  var timecode = function(ms) {
    var hms = function(ms) {
          return {
            h: Math.floor(ms/(60*60*1000)),
            m: Math.floor((ms/60000) % 60),
            s: Math.floor((ms/1000) % 60)
          };
        }(ms),
        tc = []; // Timecode array to be joined with '.'

    if (hms.h > 0) {
      tc.push(hms.h);
    }

    tc.push((hms.m < 10 && hms.h > 0 ? "0" + hms.m : hms.m));
    tc.push((hms.s < 10  ? "0" + hms.s : hms.s));

    return tc.join('.');
  };

  var debug = true,
      log = function(args) {
        try {
          if(debug && window.console && window.console.log){
            window.console.log.apply(window.console, arguments);
          }
        } catch (e) {
          console.log('debug off');
          // no console available
        }
      },
      secureDocument = (document.location.protocol === 'https:'),

// jxn Should be able to ditch this once the data is being passed from sc.get
      // convert a SoundCloud resource URL to an API URL
      scApiUrl = function(url, apiKey) {
        var resolver = ( secureDocument || (/^https/i).test(url) ? 'https' : 'http') + '://api.soundcloud.com/resolve?url=',
            params = 'format=json&consumer_key=' + apiKey +'&callback=?'; // 

        // force the secure url in the secure environment
        if( secureDocument ) {
          url = url.replace(/^http:/, 'https:');
        }

        // check if it's already a resolved api url
        if ( (/api\./).test(url) ) {
          //log('is resolved url' + url + '?' + params);
          return url + '?' + params; 
        } else {
          //log('unresolved url' + resolver + url + '&' + params);
          return resolver + url + '&' + params;
        }
      };



  // Audio Engine
  var audioEngine = function() {

    callbacks = {
      onReady: function() {
        $(document).trigger('scPlayer:onAudioReady');
      },
      onPlay: function() {
        $(document).trigger('scPlayer:onMediaPlay');
      },
      onPause: function() {
        $(document).trigger('scPlayer:onMediaPause');
      },
      onEnd: function() {
        $(document).trigger('scPlayer:onMediaEnd');
      },
      onBuffer: function(percent) {
        $(document).trigger({type: 'scPlayer:onMediaBuffering', percent: percent});
      }
    };

    var html5Driver = function() {
      var player = new Audio(),
          onTimeUpdate = function(event){
            var obj = event.target,
                buffer = ((obj.buffered.length && obj.buffered.end(0)) / obj.duration) * 100;
            // ipad has no progress events implemented yet
            callbacks.onBuffer(buffer);
            // anounce if it's finished for the clients without 'ended' events implementation
            if (obj.currentTime === obj.duration) { callbacks.onEnd(); }
          },
          onProgress = function(event) {
            var obj = event.target,
                buffer = ((obj.buffered.length && obj.buffered.end(0)) / obj.duration) * 100;
            callbacks.onBuffer(buffer);
          };

      $('<div class="sc-player-engine-container"></div>').appendTo(document.body).append(player);

      // prepare the listeners
      player.addEventListener('play', callbacks.onPlay, false);
      player.addEventListener('pause', callbacks.onPause, false);
      // handled in the onTimeUpdate for now untill all the browsers support 'ended' event
      // player.addEventListener('ended', callbacks.onEnd, false);
      player.addEventListener('timeupdate', onTimeUpdate, false);
      player.addEventListener('progress', onProgress, false);


      return {
        load: function(track, apiKey) {
          player.pause();
          player.src = track.stream_url + (/\?/.test(track.stream_url) ? '&' : '?') + 'consumer_key=' + apiKey;
          player.load();
          player.play();
        },
        play: function() {
          player.play();
        },
        pause: function() {
          player.pause();
        },
        stop: function(){
          if (player.currentTime) {
            player.currentTime = 0;
            player.pause();
          }
        },
        seek: function(relative){
          player.currentTime = player.duration * relative;
          player.play();
        },
        getDuration: function() {
          return player.duration * 1000;
        },
        getPosition: function() {
          return player.currentTime * 1000;
        }
      };
    };
    return html5Driver();
  }();

  // End Audio Engine
  
  
  // Variables

  var apiKey,
      players = [],
      updates = {},
      currentUrl,
      loadTracksData = function($player, links, key) {
        var index = 0,
            playerObj = {node: $player, tracks: []};
            loadUrl = function(link) {
              var apiUrl = scApiUrl(link.url, apiKey);
              $.getJSON(apiUrl, function(data) {
                                                //SC.get(apiUrl, function(data) {
                                                //getTrackInfo(apiUrl, function(data){
                //log('data ' + data);
                index += 1;
                if(data.tracks){
                  //log('data.tracks', data.tracks);
                  playerObj.tracks = playerObj.tracks.concat(data.tracks);
                }else if(data.duration){
                  // a secret link fix, till the SC API returns permalink with secret on secret response
                  data.permalink_url = link.url;
                  // if track, add to player
                  playerObj.tracks.push(data);
                }else if(data.creator){
                  // it's a group!
                  links.push({url:data.uri + '/tracks'});
                }else if(data.username){
                  // if user, get his tracks or favorites
                  if(/favorites/.test(link.url)){
                    links.push({url:data.uri + '/favorites'});
                  }else{
                    links.push({url:data.uri + '/tracks'});
                  }
                }else if($.isArray(data)){
                  playerObj.tracks = playerObj.tracks.concat(data);
                }
                if(links[index]){
                  // if there are more track to load, get them from the api
                  loadUrl(links[index]);
                }else{
                  // if loading finishes, anounce it to the GUI
                  playerObj.node.trigger({type:'onTrackDataLoaded', playerObj: playerObj, url: apiUrl});
                }
             });
           };
            
        // update current API key
        apiKey = key;
        // update the players queue
        players.push(playerObj);
        // load first tracks
        $.each(links, function(i, val){   
          //log('links: ' + i + ':' + val);
          $.each(val, function(i, val){
            //log(i + ':' + val);
          });
        });
        loadUrl(links[index]);
      },
      
      // JXN - add waveform function
      addWaveform = function($player, track) {
          $('.sc-waveform-container', $player).show().html('<img src="' + track.waveform_url +'" />');
      },
      // JXN disabled to handle animation in CSS and keep loaded waveform images
      //removeWaveform = function($player) {
      //    $('.sc-waveform-container', $player).hide();
      //},
      
      updateTrackInfo = function($player, track) {
         
        // update the track duration in the progress bar
        $('.sc-duration', $player).html(timecode(track.duration));
        
        $('.sc-artist', $player).html(track.user.username);
              
        // insert track title instead of waveform
        $('.sc-title', $player).html('<h2>' + track.title + '</h2>'); 

        $player.trigger('onPlayerTrackSwitch.scPlayer', [track]);
      },
      play = function(track) {
        var url = track.permalink_url;
        if(currentUrl === url){
          //log('will play');
          audioEngine.play();
        }else{
          currentUrl = url;
          //log('will load', url);
          audioEngine.load(track, apiKey);
        };
      },
      getPlayerData = function(node) {
        return players[$(node).data('sc-player').id];
      },
      updatePlayStatus = function(player, status) {
        if(status){
          // reset all other players playing status
          $('div.sc-player.playing').removeClass('playing');
        }
        if(!status){
          // JXN disabling to handle animations in CSS
          //removeWaveform(player);
        }
        $(player)
          .toggleClass('playing', status)
          .trigger((status ? 'onPlayerPlay' : 'onPlayerPause'));
      },
      onPlay = function(player, id) {
        var track = getPlayerData(player).tracks[id || 0];
        updateTrackInfo(player, track);
        addWaveform(player, track);
        // cache the references to most updated DOM nodes in the progress bar
        updates = {
          $buffer: $('.sc-buffer', player),
          $played: $('.sc-played', player),
          position:  $('.sc-position', player)[0]
        };
        updatePlayStatus(player, true);
        play(track);
      },
      onPause = function(player) {
        updatePlayStatus(player, false);
        audioEngine.pause();
      },
      onFinish = function() {
        var $player = updates.$played.closest('.sc-player'),
            $nextItem;
        // update the scrubber width
        updates.$played.css('width', '0%');
        // show the position in the track position counter
        updates.position.innerHTML = timecode(0);
        // reset the player state
        updatePlayStatus($player, false);
        // stop the audio
        audioEngine.stop();
        $player.trigger('onPlayerTrackFinish');
      },
      onSeek = function(player, relative) {
        audioEngine.seek(relative);
        $(player).trigger('onPlayerSeek');
      },
      onSkip = function(player) {
        var $player = $(player);
        // continue playing through all players
        //log('track finished get the next one');
        $nextItem = $('.sc-trackslist li.active', $player).next('li');
        // try to find the next track in other player
        if(!$nextItem.length){
          // Use this if links are siblings
          //$player.nextAll('div.sc-player:first').find('.sc-trackslist li.active');
          
          // Use this if links are nested
          $parentElementType = $player.parent().prop('tagName');
          $nextItem = $player.parents($parentElementType).next($parentElementType).find('.sc-trackslist li.active');
        }
        $nextItem.click();
      },
      positionPoll;

    // listen to audio engine events
    $(document)
      .bind('scPlayer:onAudioReady', function(event) {
        //log('onPlayerReady: audio engine is ready');
        audioEngine.play();
        
      })
      // when the loaded track started to play
      .bind('scPlayer:onMediaPlay', function(event) {
        clearInterval(positionPoll);
        positionPoll = setInterval(function() {
          var duration = audioEngine.getDuration(),
              position = audioEngine.getPosition(),
              relative = (position / duration);

          // update the scrubber width
          updates.$played.css('width', (100 * relative) + '%');
          // show the position in the track position counter
          updates.position.innerHTML = timecode(position);
          // announce the track position to the DOM
          $(document).trigger({
            type: 'onMediaTimeUpdate.scPlayer',
            duration: duration,
            position: position,
            relative: relative
          });
        }, 500);
      })
      // when the loaded track is was paused
      .bind('scPlayer:onMediaPause', function(event) {
        clearInterval(positionPoll);
        positionPoll = null;
      })
      .bind('scPlayer:onMediaEnd', function(event) {
        onFinish();
      })
      .bind('scPlayer:onMediaBuffering', function(event) {
        updates.$buffer.css('width', event.percent + '%');
      });


  // Generate custom skinnable HTML/CSS/JavaScript based SoundCloud players from links to SoundCloud resources
  // Trying to bind this to document changes


  
  $.scPlayer = function(options, node) {
    var opts = $.extend({}, $.scPlayer.defaults, options),
        playerId = players.length,
        $source = node && $(node),
        sourceClasses = $source[0].className.replace('sc-player', ''),
        links = opts.links || $.map($('a', $source).add($source.filter('a')), function(val) { return {url: val.href, title: val.innerHTML}; }),
        $player = $('<div class="sc-player loading"></div>').data('sc-player', {id: playerId}),
        
        
        $controls = $('<div class="sc-controls"></div>').appendTo($player),
        $list = $('<ol class="sc-trackslist"></ol>').appendTo($player);

        // add the classes of the source node to the player itself
        // the players can be indvidually styled this way
        if(sourceClasses || opts.customClass){
          $player.addClass(sourceClasses).addClass(opts.customClass);
        }


        // adding controls to the player
        $player
          .find('.sc-controls')
                // Custom Geomicons SVG Play/Pause Buttons
                .append('<a href="#play" class="sc-play"><img src="images/play-btn.svg"/></a> <a href="#pause" class="sc-pause hidden"><img src="images/pause-btn.svg"/></a>')
          .end()
          
          .append('<div class="sc-scrubber"></div>')
            .find('.sc-scrubber')
              .append('<div class="sc-time-span"><div class="sc-artist"></div><div class="sc-title"></div><div class="sc-waveform-container"></div><div class="sc-buffer"></div><div class="sc-played"></div></div>')
              .append('<div class="sc-time-indicators"><span class="sc-position"></span> | <span class="sc-duration"></span></div>');

        // load and parse the track data from SoundCloud API
        
        // JXN call this within the view loop instead ?
        loadTracksData($player, links, opts.apiKey);
        // init the player GUI, when the tracks data was laoded
        $player.bind('onTrackDataLoaded.scPlayer', function(event) {
          //log('onTrackDataLoaded.scPlayer', event.playerObj, playerId, event.target);
          var tracks = event.playerObj.tracks;
          // create the playlist
          $.each(tracks, function(index, track) {
            var active = index === 0;
            // create an item in the playlist
            $('<li><a href="' + track.permalink_url +'">' + track.title + '</a><span class="sc-track-duration">' + timecode(track.duration) + '</span></li>').data('sc-track', {id:index}).toggleClass('active', active).appendTo($list);
          });
          // update the element before rendering it in the DOM
          $player.each(function() {
            if($.isFunction(opts.beforeRender)){
              opts.beforeRender.call(this, tracks);
            }
          });
          // set the first track's duration
          $('.sc-duration', $player)[0].innerHTML = timecode(tracks[0].duration);
          $('.sc-position', $player)[0].innerHTML = timecode(0);
          // set up the first track info
          updateTrackInfo($player, tracks[0]);

          // Continuous playback is not an option
          $player.bind('onPlayerTrackFinish', function(event) {
            onSkip($player);
          });
          

          // announce the succesful initialization
          $player.removeClass('loading').trigger('onPlayerInit');

        });


    // replace the DOM source (if there's one)
    $source.each(function(index) {
      $(this).replaceWith($player);
    });

    return $player;
  };
  

  // stop all players, might be useful, before replacing the player dynamically
  $.scPlayer.stopAll = function() {
    $('.sc-player.playing a.sc-pause').click();
  };

  // destroy all the players and audio engine, usefull when reloading part of the page and audio has to stop
  $.scPlayer.destroy = function() {
    $('.sc-player, .sc-player-engine-container').remove();
  };

  // plugin wrapper
  $.fn.scPlayer = function(options) {
    // create the players
    this.each(function() {
      $.scPlayer(options, this);
    });
    return this;
  };

  // default plugin options
  $.scPlayer.defaults = $.fn.scPlayer.defaults = {
    customClass: null,
    // do something with the dom object before you render it, add nodes, get more data from the services etc.
    beforeRender  :   function(tracksData) {
      var $player = $(this);
    },
    // initialization, when dom is ready
    onDomReady  : function() {
      console.log('derp');
    },
    //didn't i get rid of this guy?
    continuePlayback: true,

    // Jxnblk's API Key - Use your own - update this for scat??
    apiKey: '66828e9e2042e682190d1fde4b02e265'
  };

  /*
$(document).on('change', function(event){
    $('a.sc-player').css('color','#333');
    console.log('player links changed'); 
    $('a.sc-player').scPlayer();
  });
*/ 


  // the GUI event bindings
 //--------------------------------------------------------

  // toggling play/pause
  $(document).on('click','a.sc-play, a.sc-pause', function(event) {
    var $list = $(this).closest('.sc-player').find('ol.sc-trackslist');
    // simulate the click in the tracklist
    $list.find('li.active').click();
    return false;
  });

  // selecting tracks in the playlist
  $(document).on('click','.sc-trackslist li', function(event) {
    var $track = $(this),
        $player = $track.closest('.sc-player'),
        trackId = $track.data('sc-track').id,
        play = $player.is(':not(.playing)') || $track.is(':not(.active)');
    if (play) {
      onPlay($player, trackId);
    }else{
      onPause($player);
    }
    $track.addClass('active').siblings('li').removeClass('active');
    return false;
  });

  var scrub = function(node, xPos) {
    var $scrubber = $(node).closest('.sc-time-span'),
        $buffer = $scrubber.find('.sc-buffer'),
        $player = $scrubber.closest('.sc-player'),
        relative = Math.min($buffer.width(), (xPos  - $scrubber.offset().left)) / $scrubber.width();
    onSeek($player, relative);
  };

  // seeking in the loaded track buffer
  $(document)
    .on('click','.sc-time-span', function(event) {
      scrub(this, event.pageX);
      return false;
    })
  
 // -------------------------------------------------------------------
// end sc-player.js code

    
      
       
});
  
  