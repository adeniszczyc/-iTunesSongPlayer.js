# iTunesSongPlayer.js
Play iTunes song previews by exact song title. 

## Usage
```
<script src="//code.jquery.com/jquery-1.11.2.min.js"></script>
<script src="//code.jquery.com/jquery-migrate-1.2.1.min.js"></script>
<script src="iTunesSongPlayer.js"></script>

<script>
    var song = iTunesSongPlayer.get("Song Title");
    
    // Song has been found with title.
    song.then(function(data) {
    
      // Play song preview
      iTunesSongPlayer.play()
    
    });
    
    // Song not found with title or error occured.
    song.fail(function(data) {
      console.log(data);
    });
</script>
```

## Credits
- [Andrew Deniszczyc](http://andrewdeniszczyc.com)
- [iTunes Search API](https://www.apple.com/itunes/affiliates/resources/documentation/itunes-store-web-service-search-api.html)

## License
- MIT:  [http://rem.mit-license.org](http://rem.mit-license.org " http://rem.mit-license.org")
