---
title: 'Making a Local Multiplayer Lobby'
image: '/images/posts/local_multiplayer_lobby/lobby_header.png'
date: 2017-04-12
excerpt: "Today I finished a two day long push to get a local multiplayer lobby set up, and I wanted to talk a bit about how I did it and the system I used. Who knows, maybe someone out there will find it useful."
---

# Inroduction

I’ve been working on a little two-week-then-release type game called Cart Fight (no name is perfect, it’s a work in progress). Cart Fight is a local multiplayer (yeah, no online multiplayer. Unet documentation is lacking) party game about beating down the other shoppers and filling your cart. Today I finished a two day long push to get a local multiplayer lobby set up, and I wanted to talk a bit about how I did it and the system I used. Who knows, maybe someone out there will find it useful.

Before I get into the details, the rules of the internet clearly state that the finished product must come first. Behold!

![A gif of three players selecting their control schemes in the lobby](/images/posts/local_multiplayer_lobby/cartfight_lobby.gif)

There are a couple things to note here. Firstly, all of this is a work in progress, and, secondly, I can’t simultaneously control three players for my life.

# The System
I handled the lobby with a few important objects: lobby panels, a lobby manager, and control schemes.

# Control Schemes
Control schemes are my solution to handling multiple players with different controls independent of their player numbers. Originally, I had it set up such that player one used ‘wasd’, player two used the arrow keys, player three… Yeah. You get it. The problem here is that I wanted players to be able to use any mix of keyboard or gamepad inputs. Control schemes are basically just an object containing a list of keys (or a gamepad number) and an update method. A keyboard based control scheme, for example, has an up, down, left, and right key. In its update method, the control scheme watches its input keys and sets two variables (horizontal and vertical) to -1, 0, or 1 (left/down, no input, right/up) based on what it reads. From there, a player can simply read the horizontal or vertical input from its own control scheme object in much the same way as it would from Unity’s Input.getAxisRaw() function.

# Lobby Panels
Without delving too deeply into the details, lobby panels store the data needed to spawn a player. This data (called joined player data) is composed of a control scheme and a player number. It is worth noting that lobby panels have an active (player joined) and inactive (no player joined) state, and that their functions are called almost exclusively by the lobby manager.

# Lobby Manager
This is the heart of the lobby system. The lobby manager contains a list of available control schemes and lobby panels. It also contains a static list of joined player data, but more on that in a moment. When a player hits one of the acceptable join keys, the lobby manager tells the first available panel to fill its joined player with a new joined player data object containing the control scheme associated with the join key and a player number. When enough players have joined, the start button becomes available. When it’s pressed, the lobby manager grabs every panels joined player and puts a copy of it in the static joined player list. Once that’s done, the lobby manager switches the scene to the main game scene. The best part? Because static objects in Unity persist between scenes, spawning a player for each joined player entry is as simple as calling spawn from the game manager and passing the control scheme and player number as parameters.

# Conclusion
I had some concerns going into it, but this is a pretty simple system that didn’t take too long to get up and running. I don’t see too many issues with it yet, either. How about you? Questions? Concerns? Want to tell me I’m some sort of asshole? Feel free to leave a comment or message me on twitter ([@morrilet](https://twitter.com/morrilet)).