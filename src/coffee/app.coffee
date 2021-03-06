require.config
  baseUrl: "js/modules"
  paths: 
    'jquery': 'https://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min'
        
define (require) ->
  $ = require('jquery')

  KEYS = 
    37: false
    39: false

  String::replaceAt = (index, character) ->
    @substr(0, index) + character + @substr(index + character.length)
  
  main: () ->
    char = '#'
    length = 100
    points = 0
    paused = true
    emptyChar = '-'
    $start = $('#start')
    console.log "Hello there!"

    class Player
      constructor: ->
        @x = Math.floor(length / 2)
        @char = 'O'
    
    class Wall
      constructor: ->
        @x = 0
        @v = true
        @peak = Math.floor(Math.random() * (length/2))
      
      toggle: ->
        if @v then @v = false else @v = true
        @peak = Math.floor(Math.random() * (length/2 + 20)) if @v

      tick: ->
        if @v then @x += 1 else @x -= 1
        @toggle() if @x >= @peak or @x <= 0
        @
      render: -> (char for a in [0..@x]).join ''

    end = ->
      paused = true

      console.log "You crashed with #{points} points!"
      console.timeEnd 'How long it took for you to crash'
      $start.text($start.text().replace ' s', ' res').addClass 'large'

    init = ->
      return unless paused
      console.time 'How long it took for you to crash'
      paused = false
      walls = [new Wall, new Wall]
      player = new Player
      points = 0

      render = (row) -> 
        console.log row, "#{points} points"

      tick = ->  
        space = length - walls[0].x - walls[1].x
        air = (emptyChar for a in [0..space]).join ''

        row = walls[0].render() + air + walls[1].render()

        return end() if row[player.x] isnt emptyChar

        row = row.replaceAt player.x, player.char


        if 200 < points < 450
          console.clear()
          console.log "PARTY HARD MODE ACTIVATED!"
          render(row) if points % 2 is 0

        else
          render(row)

        w.tick() for w in walls
        player.x += 1 if KEYS[39]
        player.x -= 1 if KEYS[37]
        points += 1
        
        setTimeout tick, Math.max 1, 1000/ (10 + points/25)

      tick()

      return "Lets go!"

    $start.on 'click', init

    $(window).on 'keydown keyup', (e) ->
      KEYS[e.keyCode] = e.type == 'keydown' if KEYS.hasOwnProperty e.keyCode

    null
