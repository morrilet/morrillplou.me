---
title: "Puttsy - A Post-Mortem"
image: "/images/posts/puttsy_post_mortem/puttsy_banner.png"
date: 2018-04-28
excerpt: "In this post I’ll explain the timeline for Puttsy as well as some reflections on my performance during this Ludum Dare. Let’s dive in!"

friday_images: [
    {src: "/images/posts/puttsy_post_mortem/friday_night_magic.jpg", alt: "Friday night MtG"},
    {src: "/images/posts/puttsy_post_mortem/dinner_and_brainstorming.jpg", alt: "Dinner and brainstorming"},
]

stats_images: [
    {src: "/images/posts/puttsy_post_mortem/itch_stats.png", alt: "The stats from the itch.io page from 5/19/2018"},
    {src: "/images/posts/puttsy_post_mortem/ldjam_stats.png", alt: "The statistics for Ludum Dare 41"},
    {src: "/images/posts/puttsy_post_mortem/final_scores.png", alt: "The final scores, calculated at the end of Ludum Dare 41"},
]
---

# Overview

[Puttsy](https://ldjam.com/events/ludum-dare/41/puttsy) is a tower-defense golf game made in 72 hours for Ludum Dare 41. I think it’s one of the most complete games I’ve done in 72 hours to date, and I really feel that I used my time well. That said, there are some areas that I would’ve liked to have spent more time on in order to make this entry really shine. In this post I’ll explain the timeline for Puttsy as well as some reflections on my performance during this Ludum Dare. Let’s dive in!

![A walk-through of one of the levels in Puttsy](/images/posts/puttsy_post_mortem/finalgameplay.gif)

# Timeline
I think I managed to get quite a bit done during the 72 hours, but I didn’t do it alone. Here are the broad strokes about how development went down.

## Friday (21:00 – 23:59)
* Get the theme and start brainstorming.
* Slow down a bit, play some MtG. No need to stress, right?
* Spontaneously assemble a team of contributors.

{% include components/image-slider with { images: friday_images } %}

## Saturday (00:00 – 23:59)
* Settle on a golf tower-defense game.
* Figure out the mood of the game and settle on an artistic direction.
* Create a system for importing levels from text files (because I’m lazy efficient).
* Sketch out and implement a bare-bones version of the in-game UI.
* Get ball physics and putting working.
* Set up click and drag (placeholder) towers.
* Receive the first tower model.

![Some pen-and-paper planning from Saturday](/images/posts/puttsy_post_mortem/pen_and_paper_plan.jpg)

## Sunday (00:00 – 23:59)
* Get towers to snap to the grid.
* Make the cannon tower load and shoot the ball.
* Make putters and windmills work.
* Add the shiny new putter and windmill models.
* Create the hole object.
* Implement game state checks to determine whether you’ve won or lost a level.
* Implement the par system.
* Begin creating the first finished levels.
* Implement a simple level select menu.
* Begin adding audio.
* Flesh out the in-game UI.
* Add a retry/next menu to tie the game and level select menu together.

## Monday (00:00 – 21:00 [22:00])
* Pretty up the level select menu.
* Continue to add and finalize level designs.
* Create the Puttsy logo/banner image.
* Pretty up the in-game GUI.
* Add arrows to the towers during the planning phase.
* Build the credits menu.
* Submission hour!

<iframe width="680" height="405" src="https://www.youtube.com/embed/WXd1eo5CNSY" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

# Reflections

## What went right?
The first thing that I think went right with Puttsy was the way I handled programming. In previous dares there were tons of stupid errors and game-breaking bugs all the way to the finish line. This time around I went for a much more modular approach which helped me debug more efficiently. I made my scripts atomic and added/removed them from objects as needed. An example of this is when the ball is fired from the cannon. The cannon adds a flight script to the ball, and when the ball lands the script is destroyed. I could’ve handled this in a mega-script such as ball.cs but I didn’t. In fact, the ball doesn’t even have a main script attached to it. It’s just a physics object that gets scripts stapled to it as needed. I also took the time in the start of the dare to make write text-based level importer. This ended up saving me so much time that I think I’ll start doing it more often in these types of games.

Second, I had a ton of time to devote to making the game this time around. While I did step out for a few hours for class and a party, I spent all of my time outside of that either eating, sleeping, or working on Puttsy. While this isn’t practical or healthy in the long run, it’s just what has to be done for Ludum Dare and I’m happy that I could bend my schedule enough to make it work.

Third, I stepped away from humor. Before Puttsy, I’d scored top 100 in humor three times in a row and I felt that it was getting harder and harder not to typecast myself into making comedy games. I feel that by taking myself out of that mindset and allowing myself focus more on mechanics and puzzles I ended up with a better game.

Lastly, I wasn’t working alone. I had four other people helping out by designing extra levels, recording sound effects, writing music, creating extra graphics, and modelling towers. If I had been doing everything I wouldn’t have had nearly as much time to spend on programming and the quality of the final product would’ve suffered in more ways than one.

## What went wrong?
As always, things get cut. That’s the nature of Ludum Dare, but it still doesn’t make it hurt any less. There are a few things I wish I could’ve implemented due to the time constraint. Here’s a list:

Triangular/angled wall pieces.
Persistent tower positions on retry.
More levels!
Rewards for coming in under par that would be used to unlock secret/special levels.
Drawbridges! This would make timing your putt relevant.
More tower types and objects that go on the green (i.e. honey traps, treadmills).
There were also a couple not-so-game-breaking-but-still-annoying bugs that stuck around for the whole 72 hours. The most annoying of these was a rendering issue that caused the towers in the planning menu to render from back to front instead of front to back (thanks Unity RenderTextures). The result of this wasn’t anything major, but if you look closely enough at the planning menu you can see my shame.

I also think I probably should’ve spent more time making levels. Several players have pointed out that seven levels felt short, and I would’ve loved have bumped it up to the original goal of ten levels. Beyond the level count, there’s the level difficulty. If you’ve played Puttsy, you may have noticed that the cannon tower makes things a little too easy. I think this is because I didn’t take the time to properly balance the later levels and ensure that their difficulty matched the power level of the new tower type. That’s just one more thing that had to be pushed back due to time, I suppose.

## What would I do differently?
I’m tempted to say “nothing” but I think the takeaway here is to focus more on the content rather than the presentation. More levels and a smoother restart state would’ve made the experience more enjoyable than all the fancy menu tweaks I made. That’s the nature of these jams, though, and I still think that I put out the best product I could’ve with the knowledge I had at the time.

## Results
At the time of writing, there are still 17 days of rating left before the results of the dare will be announced. In the meantime I’m trying to hit 150 downloads on [Puttsy](https://ldjam.com/events/ludum-dare/41/puttsy), so go out there and grab a copy if you haven’t already! I look forward to hearing what you have to say about it.

## Update (5/19/2018)
Ludum Dare 41 ended a little while ago, and the results are in! [Puttsy](https://ldjam.com/events/ludum-dare/41/puttsy) did crazy well, I think, and I’m really pleased with it. While it didn’t make top 100 in any categories, it scored very consistently in the 200 range, and I think that’s amazing. A few of my previous games had managed to score top 100 in humor, but their other scores were usually well into the 1000’s, so this marks a welcome change of pace for my work. [Puttsy](https://ldjam.com/events/ludum-dare/41/puttsy) also broke the 150 download mark shortly before the end of the dare, which I was really excited to see. Anyway, I’ve written more than enough about this now, so go ahead and have a gander at the results. Enjoy, and I’ll see you all next time!

{% include components/image-slider with { images: stats_images } %}