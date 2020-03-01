---
tags: ['post']
title: 'Platformer Pathfinding with Pre-Recorded Inputs'
image: '/images/Bunkers_NavMeshTesting.png'
---

AI has never been my strong suit. I enjoy thinking about it from a design perspective, but actually programming pathfinding and state machines always tends to feel like a chore. It's never my first pick, unless I'm feeling masochistic. Recently, however, I started working on the most ambitious AI I've tried to program to date, and (much to my surprise) it's coming along quite well.

<!--more-->
# AI in Platformers 

For those of you who don't know, platformer AI comes with a couple challenges. Firstly, finding a path to any given point in a platformer level requires that you know exactly how high you can jump and how far you can travel, which for the physics savvy among us may not be too bad, but I still struggle with this. Secondly, you have to be able to put your level into a navmesh or point graph in order to handle pathfinding. As an added bonus, my project doesn't use a grid based level, so generating a point graph is a little harder.

With the above challenges in mind, I had two main options for AI pathfinding going into this: calculate a few jumps for the agent from every platform and see where you can go (a more procedural way to generate the point graph), or manually create edges between the platforms (a more tool-heavy approach). Inspired by [this post](https://www.gamedev.net/articles/programming/artificial-intelligence/generalized-platformer-ai-pathfinding-r3924/), I opted for the manual edge generation. What I read was pretty comprehensive, but I couldn't find anything about implementing this particular solution in Unity, so that will be the focus of this post.

The way I implemented this in Unity was pretty simple, but it should be noted that I'm generating these point graphs from the editor because the generation method is too slow to do in-game. This doesn't limit me entirely to static levels, however, as I can create multiple point graphs for different level states and assign them to each of my pathfinding agents based on the current level state. Alright, on to the good stuff.

# Creating the point graph
First, we must generate our nodes. These are the platforms that can be walked on by a pathfinding agent. To accomplish this, I first check each platform in the scene and determine whether an entity can stand on it. The resulting list of platforms will be our "unrefined" platforms. There are lots of them because platforms may be made up of several smaller pieces, but that's not a problem. There are also some platforms that are totally unreachable. That's not a problem either, as we can manually remove these from the point graph, or simply leave them there because they'll never be considered by our pathfinding algorithm.

![Unrefined nodes on a test level](/images/UnrefinedNodes_Bunkers.png)

Second, I refine the platforms. This is a simple pass over all of the unrefined platforms we detected in step one. We just check whether or not the platforms connect, and if they do, we merge them into one platform.

![Refined nodes on a test level](/images/RefinedNodes_Bunkers.png)

You may notice that my platforms are all flat. While it's true that (for simplicity's sake) I programmed this with flat platforms in mind, you could adjust your node generation code to handle slopes with just a little extra math. Should this be the route you choose to take, my process of edge creation and input recording should still work just fine.

Alright, that's all for generating the nodes. The next thing to do is edges. Something important to note about generating edges with recorded inputs is that the way your entities handle input has to be completely modular. This means that any entity you intend to use as a pathfinding agent must be able to receive player input as well as your desired AI's input. For my project, I simply created an input module super-class that monitors input axes and button states. Derived from this are a player input class and an AI input class which detect input from different sources (an AI state machine or a keyboard) which is then given to the entities to try to act on it. Alright, enough of that. Moving on.

To generate the edges, I created a simple input recorder. This class allows me to enable or disable edge recording as I muck about in the game. If edge recording is enabled, it detects when I leave or enter a node (platform), and reacts accordingly. If I've just left a node, it records my input as a series of input keyframes. Anytime the input I'm giving the entity changes, it creates an input keyframe, which is simply another class I created that stores a timestamp alongside the current input. If I land on a new node, it saves that series of input keyframes, as well as a start and end position/velocity, to a JSON file. Below is an example of one of these JSON files, which stores the AI agent type (enemy type, in my case), start position, end position, start velocity, and several input keyframes in that order.

``` json
{"x":-9.412946701049805,"y":-4.0,"z":0.0}
{"x":-10.232768058776856,"y":-6.9929399490356449,"z":0.0}
{"x":-4.0,"y":0.0}
{"timeStamp":0.0,"inputAxes":{"x":0.0,"y":0.0},"jumpButtonDown":false,"used":false}
{"timeStamp":0.0,"inputAxes":{"x":-1.0,"y":0.0},"jumpButtonDown":false,"used":false}
{"timeStamp":0.14909979701042176,"inputAxes":{"x":0.0,"y":0.0},"jumpButtonDown":false,"used":false}
{"timeStamp":0.16566582024097444,"inputAxes":{"x":1.0,"y":0.0},"jumpButtonDown":false,"used":false}
{"timeStamp":0.21536704897880555,"inputAxes":{"x":1.0,"y":0.0},"jumpButtonDown":false,"used":false}
```

It should be noted that you'll need to ensure that the timestamp you use is framerate-independent. It should be the same on a system running your game at 12 FPS as it is on one running it at 80 FPS. I didn't bother with this because I'm still just prototyping, but if I choose to take this project any further, I will definitely need to do something about that. Also, we use a JSON file here because it's not possible to store this data in a prefab. Unity isn't really built to store data like this across editor sessions, and script-based prefab creation has been very finicky in my experience. Lastly, I began working on my input recording solution before finding out about [InputVCR](https://github.com/EddieCameron/InputVCR), but if you're following along at home, I'd advise taking a look at it and saving some time. It appears to be the only reliable, open source tool for this type of thing at the time of writing. Anyway...

Once I've generated an edge, we can load it into the point graph pretty easily. I return to the editor and re-generate the point graph. This time, because there are edge files present, they are read and used to create edge objects in the scene. These objects are simply loaded from the edges files and stored in an array within the point graph object. Just like that, we've transferred our stored input sequences to edges between nodes! The hard part is done, and all we have to do is handle graph traversal.

![The completed point graph on a test level](/images/Bunkers_NavMeshTesting.png)

# Traversal

Graph traversal is pretty straightforward here. We just assign a weight to the edges based on the duration of their input sequence, the distance between their start and end points, and their distance from the point graph agent. Once we've weighted our point graph, we can use [Dijkstra's algorithm](https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm) to find a path from one node to another. I won't go too in depth on Dijkstra's algorithm because other people have explained it better than I ever could, but I will note that I'm using it because I had a hard time figuring out a proper heuristic to use for A*. Anyway, once a path is found, we simply send the agent towards the first edge's starting point. When it's there we stop taking input from the state machine. Instead, we take our input from an input sequence, going keyframe by keyframe. After we're done reading this input sequence, we re-evaluate our path and start the process over again until we've reached our target node.

# Conclusion

So there you have it, a fairly simple way to handle platformer AI. It wasn't nearly as much work as I'd expected, and the results have been promising. I still have some tweaking to do, but it already looks great. Another bonus to this method is that things like ladders and one way platforms don't take any extra work to implement. Whenever we leave one node and enter another, the input is recorded. In the case of a ladder, for example, all the agent needs to know is that we go to the base of the ladder (the start point of the edge) and hold down the up button until we're at the end point. It's handled in exactly the same way as any other platform change, which makes it pretty easy to add simple level traversal elements (think bouncy pads and wall jumping).

If you're interested in hearing more from my fat, stupid mouth (keyboard, I guess), feel free to follow me on twitter ([@morrilet](https://twitter.com/morrilet)) or leave me a comment. And, as always, feel free to tell me why I'm wrong.