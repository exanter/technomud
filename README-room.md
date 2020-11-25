# technomud::room design

The inital thought is to store all data for each room into it's own json file, format of which is to be determined in a bit.

Then, upon initial instance startup, all room files would be loaded into redis, and then accessed as needed.

Room meta-data should include:

  1) Description (shown to the player)
  2) list of actions that can be performed.
  3) list of current players in the room
  4) list of npcs (static and/or wandering)
  5) list of monsters / set battles (could be random, pulled from a list, in which case this could be a hinting system)
  6) pointer(s) to next room(s), presented as exits
  
