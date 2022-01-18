---
title: 'Zero to Sixty in 14 Seconds'
image: '/images/posts/cleandatabase.jpg'
date: 2019-08-29
excerpt: "In school we're taught about database normalization and the dream of third normal form - the platonic ideal of the database.
When starting a new project I think we all strive for a clean, cohesive schema. At some point, however, changes must be made.
I agonize over these changes. I work hard to keep my database clean, but I'm slowly gathering that I'm better off just... not."
---

### (or: Why You Should Forsake Your Schema)

In school we're taught about database normalization and the dream of third normal form - the platonic ideal of the database.
When starting a new project I think we all strive for a clean, cohesive schema. At some point, however, changes must be made.
I agonize over these changes. I work hard to keep my database clean, but I'm slowly gathering that I'm better off just... not.

I've been working on a stat-tracking site for a Magic the Gathering tournament that a buddy of mine runs but, quite frankly,
the performance was abysmal. I was incredibly proud of the simplicity of the database setup when I first put it together,
but I found that to be a huge drain. I had exactly four tables - Players, Events, Matches, and Games. I think you can probably
guess how these interlock, but for the sake of completeness:

* Events are made up of Matches.
* Matches are made up of Games.
* Games have one or more Players, plus a seprate field for the winner.

Super simple, right? I just put together a utility class to cleanly gather player win percentages, opponent win percentages, 
player events, event player counts, and so on. This was incredibly easy to comprehend and I loved how basic it felt, but (as 
you can probably guess) it got a little heavy.

Every time a user asked for a page we had to run tens of calculations, hundreds of database calls, and all for a detailed breakdown
of one players matches in one event. Hell, even loading events was a slog. For a player who had been to 14 events it took nearly _thirteen_
seconds to load a list of their events with a player-count for each event.

That's right. Thirteen seconds. Per page load. My greatest shame is that that's not even the worst of it. The _homepage_ took, on average, fourteen
full seconds to load. Sure, I was displaying some interesting, off-the-beaten-path data there, but this was the _homepage_. Unacceptable.

I tried caching, which helped to some degree, but we run these events once a month so the first person to visit the site was always going
to get a raw deal even if the data hadn't changed in weeks. (Ultimately property caching helped speed up the calculations by a small amount,
but it didn't even shave a second off the load times.)

Here's the interesting bit - the bit they don't teach you: it was only once I'd agreed to violate the sanctity of the schema that things started
to look better. They looked a lot better, actually. I introduced a new table called PlayerEventStats that tracked - you guessed it - individual player
stats for a single event. Whenever we saved a new game to the database we'd create (or update) the PlayerEventStats records for the players involved.
This moved the calculations to the backend, where they could rest safely on the broad, beautiful shoulders of the admin.

All in all this dropped the load times down a whopping 99.7%. We went from an average load time of 14.356 seconds to just 46.8 milliseconds.

I think the lesson to be learned here is that no matter how beautiful your database is, it is still just one piece of the whole.
If the site is taking 14 seconds to load, it's time to make some sacrifices.