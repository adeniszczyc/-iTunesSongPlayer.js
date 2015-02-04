/* 
   
  iTunesSongPlayer.js 
  Play iTunes song previews with exact song title. 

  Github: 
  Andrew Deniszczyc

  Usage:

  <script>

  var song = iTunesSongPlayer.get("Desire");

  song.then(function(data) {
    console.log(data);
  });
  song.fail(function(data) {
    console.log(data);
  });

  </script>

*/


var iTunesSongPlayer = function() {
    
    var search = {

      // Ajax call to search iTunes
      api: function(match) {
        console.log(match)
        var url = "https://itunes.apple.com/search?term=" + encodeURIComponent(match) + "&entity=song"
        
        return $.ajax({
          type: 'GET',
          url: url,
          contentType: "application/json",
          dataType: 'jsonp',
        });

      },

      // Select only songs with exact title
      filter: function(data, match) {

        var promise = $.Deferred();

        var results = data.results;
        var filtered = [];
        $.each(results, function(index, value) {

          if ((value.trackName).toLowerCase() == (match).toLowerCase()) {


            filtered.push(value);
          }
        });

        return filtered;
      },

      // Run API search, filter and return first result.
      find: function(match) {

        var promise = $.Deferred();
        var iTunes = search.api(match);


        iTunes.then(function(data) {

          var filtered = search.filter(data, match);

          if (filtered.length > 0) {
            promise.resolve(filtered[0]);
          }

          else {

            // No songs with exact title found, return error.
            promise.reject("No songs found");
          }


        });

        // AJAX request returned error.
        iTunes.fail(function(data) {
          promise.reject("Unable to connect to iTunes API");
        });

        iTunes.error(function(data) {
          promise.reject("Unable to connect to iTunes API");
        });

        return promise;
      },


    };


    var self = {

      // Inititate the player object
      player: null,

      init: function() {
        self.player = new Audio();
      },


      // Find song on iTunes by name.
      get: function(match) {

        var promise = $.Deferred();
        var song = search.find(match);

        song.then(function(data) {
          
          self.load(data);
          promise.resolve(data);

        });

        song.fail(function(data) {
          
          promise.reject(data);

        });

        return promise;

      },

      // Load a new song from data.
      load: function(data) {

        self.player.src = "";
        self.player = new Audio(data.previewUrl);
        self.player.play();

      },

      // Play currently loaded song.
      play: function() {

        self.player.play();

      },

      // Pause currently loaded song.
      pause: function() {

        self.player.pause();

      },

      // Play/pause currently loaded song.
      toggle: function() {
        
        if (self.player.paused) {
          self.player.play();
        }
        else {
          self.player.pause();
        }

      }


    };

    self.init();

    return self;

}();
