(function() {
  require.config({
    baseUrl: "js/modules",
    paths: {
      'jquery': 'https://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min'
    }
  });

  define(function(require) {
    var $, KEYS;
    $ = require('jquery');
    KEYS = {
      37: false,
      39: false
    };
    String.prototype.replaceAt = function(index, character) {
      return this.substr(0, index) + character + this.substr(index + character.length);
    };
    return {
      main: function() {
        var $start, Player, Wall, char, emptyChar, end, init, length, paused, points;
        char = '#';
        length = 100;
        points = 0;
        paused = true;
        emptyChar = '-';
        $start = $('#start');
        console.log("Hello there!");
        Player = (function() {
          function Player() {
            this.x = Math.floor(length / 2);
            this.char = 'O';
          }

          return Player;

        })();
        Wall = (function() {
          function Wall() {
            this.x = 0;
            this.v = true;
            this.peak = Math.floor(Math.random() * (length / 2));
          }

          Wall.prototype.toggle = function() {
            if (this.v) {
              this.v = false;
            } else {
              this.v = true;
            }
            if (this.v) {
              return this.peak = Math.floor(Math.random() * (length / 2 + 20));
            }
          };

          Wall.prototype.tick = function() {
            if (this.v) {
              this.x += 1;
            } else {
              this.x -= 1;
            }
            if (this.x >= this.peak || this.x <= 0) {
              this.toggle();
            }
            return this;
          };

          Wall.prototype.render = function() {
            var a;
            return ((function() {
              var _i, _ref, _results;
              _results = [];
              for (a = _i = 0, _ref = this.x; 0 <= _ref ? _i <= _ref : _i >= _ref; a = 0 <= _ref ? ++_i : --_i) {
                _results.push(char);
              }
              return _results;
            }).call(this)).join('');
          };

          return Wall;

        })();
        end = function() {
          paused = true;
          console.log("You crashed with " + points + " points!");
          console.timeEnd('How long it took for you to crash');
          return $start.text($start.text().replace(' s', ' res')).addClass('large');
        };
        init = function() {
          var player, render, tick, walls;
          if (!paused) {
            return;
          }
          console.time('How long it too for you to crash');
          paused = false;
          walls = [new Wall, new Wall];
          player = new Player;
          points = 0;
          render = function(row) {
            return console.log(row, "" + points + " points");
          };
          tick = function() {
            var a, air, row, space, w, _i, _len;
            space = length - walls[0].x - walls[1].x;
            air = ((function() {
              var _i, _results;
              _results = [];
              for (a = _i = 0; 0 <= space ? _i <= space : _i >= space; a = 0 <= space ? ++_i : --_i) {
                _results.push(emptyChar);
              }
              return _results;
            })()).join('');
            row = walls[0].render() + air + walls[1].render();
            if (row[player.x] !== emptyChar) {
              return end();
            }
            row = row.replaceAt(player.x, player.char);
            if ((200 < points && points < 450)) {
              console.clear();
              console.log("PARTY HARD MODE ACTIVATED!");
              if (points % 2 === 0) {
                render(row);
              }
            } else {
              render(row);
            }
            for (_i = 0, _len = walls.length; _i < _len; _i++) {
              w = walls[_i];
              w.tick();
            }
            if (KEYS[39]) {
              player.x += 1;
            }
            if (KEYS[37]) {
              player.x -= 1;
            }
            points += 1;
            return setTimeout(tick, Math.max(1, 1000 / (10 + points / 25)));
          };
          tick();
          return "Lets go!";
        };
        $start.on('click', init);
        $(window).on('keydown keyup', function(e) {
          if (KEYS.hasOwnProperty(e.keyCode)) {
            return KEYS[e.keyCode] = e.type === 'keydown';
          }
        });
        return null;
      }
    };
  });

}).call(this);
