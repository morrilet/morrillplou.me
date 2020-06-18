---
title: 'MemErr - A Post-Mortem'
image: '/images/posts/mem_err/MemErr_Header.png'
date: 2016-11-20
---

Of all the games I’ve made for game jams, [MemErr](http://gamejolt.com/games/memerr/208550) flew closest to the sun. I really felt the time constraints this time around, as the development process was cut short by other plans. Asylum Jam also put me well outside my comfort zone (I never quite subscribed to the horror genre). Despite all of this, I feel that I came away from it with a relatively complete game and a few new tools tucked away.

<!-- more -->

# Preparations

Well before Asylum Jam 2016 started, I knew I had to prepare to make something in the horror genre. I’d never much enjoyed horror anything, so I started watching horror movies with a list of classics in hand. I found a few films that I liked and incorporated them into MemErr in some not so subtle ways (via the record player and the final clip). As my 48 hour window opened up, I found myself on an hour-long bus ride with a notebook, so I paid special attention to the brainstorming and design aspect of the jam. I laid out floor plans for the room to escape as well as some ideas for spooky events and writings for the post-it notes. (In case you’re curious, I have scanned in all of the notes I wrote for the game and packed them in a [.zip file.](https://drive.google.com/uc?export=download&id=0B6-b30JV-rlYVzYzNXpMYVh5Vms))

![A sketch of the first floor in MemErr](/images/posts/mem_err/floorplan_floor1.jpg)
![A sketch of the second floor in MemErr](/images/posts/mem_err/floorplan_floor1.jpg)

# Concept

The concept that I chose to go with was partially based on a [Reddit post](https://www.reddit.com/r/legaladvice/comments/34l7vo/ma_postit_notes_left_in_apartment/) I read a while back about a CO2 leak, and partially based on my own serious fear of memory loss. I wanted it to seem as though the player were being stalked by some unseen entity that was leaving notes and turning things on and off, while in reality, these things were being done by the character and abruptly forgotten. This is also the reason that the house is floating in space, and not given some neighborhood as a backdrop. I felt that the main character wouldn’t have any remaining memories of the world outside of his or her home.

# Goals

My goals for this project were fairly simple, but the project itself was quite ambitious for the 48 hour window. I knew that I wanted to make something in 3D, and I wanted to use the optional theme (room escape). Setting the mood was important to me as well, considering I tend to make games that devolve into slapstick humor. Typically, there’s nothing wrong with that (I’m proud of the fact that I can make funny games) but for this project I wanted to be taken a little more seriously. Also, based on the original plan for the game, I was expecting to do lots of 3D modelling and texturing, but I quickly realized I didn’t have time to relearn Blender before the jam, let alone make all the assets I needed.

# Process

I spent a surprisingly large chunk of my 48 hours away from the computer, which was a first for me in any game jam. Despite this, I feel that I managed to pull together a fairly playable game. Here’s the breakdown of how I spent my time:

- **Night 1**: Planned out the game on the bus. This included the floor plan, the core mechanics, and the story/concept. I also did a little thinking about how I would make the whole thing work in code. I didn’t touch my PC until the next day.

- **Day 1**: I spent just about all of my time on the first day working on the environment. I underestimated how much I’d enjoy working in a 3D scene and found myself putting in loads of little details (my favorite is the sped up clock). This was also when it became apparent that I’d need to cut out the second level of the house from my design if I wanted to finish on time.

- **Night 2**: Spent more time on the environment, but also turned my attention to some scripting aspects. I found that the while the environment was in a playable state, there was still no functionality to anything. Post-it’s still hadn’t made their appearance, and the game had no end.

- **Day 2**: I spent the morning writing out post-it notes on the back of a diner menu, and was out of the house until mid-afternoon. At this point, the stress that comes with a jam setting was in full swing. I got post-it’s working and starting collecting/editing media for use in the record player and final cutscene. It was around this time that I decided to cut the ceiling from the final game.

- **Night 3**: I wrote the door and record player scripts, set up the final cutscene, made a sign off (“Thanks for Playing”) menu, and began the process of taking screenshots and putting the game on Game Jolt.

There were a few notable decisions that were made during development that I’d like to point out here as well. The first is the omission of the ceiling. I had actually finished making the ceiling but decided to cut it on the second day. The reason behind this was twofold: It made the scene darker because it cut down on ambient light, and it made the scene feel more claustrophobic. Both of these things could’ve been seen as advantages in a horror game, given some work, but I felt that I didn’t have the time to spend on it. The open roof also exposed a beautiful starry sky, which, to me made the scene feel more isolated and thoughtful. The second big cut was audio. I don’t have any experience with sound aside from cutting audio clips and using BFXR, so I tend to rely on outside talent for that. Unfortunately, it wasn’t until the first night of my 48 hour window that I remembered I’d need to ask someone to help out. Of course, nobody was available on a weekend on such short notice and I was left to handle sound on my own. I found a couple free, creepy sound clips that I could use and cut my own audio for the record player. Aside from that, this project only needed some ambient noises so it wasn’t too much of a blow to omit those. The other notable cuts that I made were the second floor of the house (though I still left the stairs in the scene because I felt that they filled the space well), and events such as periphery shadows, flickering lights, writing on the walls, and the TV turning on and off sporadically. These cuts were almost entirely due to time constrictions.

![The house with ceiling disabled](/images/posts/mem_err/scene_noceiling.png)
![The house with ceiling enabled](/images/posts/mem_err/scene_withceiling.png)

# Results

I honestly wasn’t sure how the game would turn out, considering how much time I spent away from my computer, but I feel that the environment and all the care that I put into arranging it paid off. The game has been getting lots of attention, which I’m over the moon about. MemErr was ranked #84 in the jam, and at the time of writing this, it has 182 views, 57 downloads, and has been featured in 3 videos, which is more than any other game I’ve posted to date. Despite this, there are definitely some things that I felt could’ve gone better. The first of these things is the execution of the concept. I had a hard time conveying the story that I’d had in my head, and seeing that it wasn’t quite panning out, went with more of a generalized creepy theme. I don’t feel like I was able to do the concept justice, and I would’ve liked to have had a wider variety of cohesive post-it notes throughout the scene, as well as some other interesting events like flickering lights and creepy scenes being played on the TV. I also think that my forgetfulness when it came to sound design diminished the creepiness of the scene by some degree. It definitely would’ve been spookier with some creaky floorboards or howling wind. On the other side of the coin are things that I think went right. I was very happy with the environment that I assembled, and I think that the openness of the scene without the ceiling is a major strength, lending the game some style. Another thing that I think helped the style of the game are the hand written post-it notes. They were originally done this way to save time, but I think that the real grime (yes, they were coffee stained before I decided to make this game) and imperfections that come with a note that’s been scanned in were very important to the games aesthetic.

# Assets Used

I’d like to extend a huge thank you to anyone who has put free assets on the Unity asset store. These people made getting back into 3D development in a jam setting much easier for me, and I wanted to give something back to the community. So, in the spirit of giving back, here’s a link to the [GitHub repository](https://github.com/morrilet/MemErr) I made for this game, as well as a list of all the assets I found on the asset store and used to make MemErr.

| Asset Name                                                               | Author                                                                                                    |   |   |   |
|--------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------|---|---|---|
| [Retro Lamps V1](https://www.assetstore.unity3d.com/en/#!/content/19601) | [Artur G.](https://www.assetstore.unity3d.com/en/#!/search/page=1/sortby=popularity/query=publisher:2501) |   |   |   |
|                                                                          |                                                                                                           |   |   |   |
|                                                                          |                                                                                                           |   |   |   |

**I'd like to give an extra special thanks to VIS Games, whose free Clock and Record Player assets came with controller scripts. Those were super helpful.*