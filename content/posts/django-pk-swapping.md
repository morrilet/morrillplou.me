---
title: "Changing Primary Keys in Django"
image: "/images/posts/django_pk_swapping/Django_PK_Swap.png"
thumbnail_position: "right"
date: 2022-01-23
---

The primary key field in a database table isn't meant to change, so what happens when your database has a midlife crisis?

<!-- more -->

# The Setup

As you may or may not be aware, I run a small stat-tracking site for a semi-regular *Magic the Gathering* event hosted by a friend of mine. Recently it was announced that we would be doing our very first league event, with the goal of creating a four-week competition between all of our players. Players challenge each other to matches throughout the duration of the league and the winner climbs the ladder to the top. If you want to win, you've got to challenge the people immediately above you and claw your way up. 

This sounded like a fun event, and likewise a stellar challenge for the site. As-is we have no concept of an event like this in our database - events occupy a single day and location, and the players are ranked by how many points they score cumulatively. Leagues represent a radical departure from this model. For starters, the logic we currently use to calculate winners needs to account for *when* a match happened - something totally absent from the current match model. Additionally, matches now need some directionality, that is, it's not enough just to know who played in a match - we need to know who was the challenger and who was the defender.

All of these new concepts would be pretty rough to squeeze into the existing `Event` / `Match` models, so I decided the best thing to do here would be to create two new models: `League` and `LeagueMatch`. Of course, now we have to think about games. Games link to a `Match`, and they're going to be structured the exact same way whether or not that match is a `Match` or a `LeagueMatch`. So, what do we do about this? Do we make a new `LeagueGame` model?

Well, we probably could. There's nothing stopping us from doing that, really, and it'd technically work fine. It'd mean more code, for sure, and it might get tricky to maintain, but it would work. Instead, I think it's best we look to Object Oriented Programming for the solution. By using the [django-polymorphic](https://pypi.org/project/django-polymorphic/) package we can create models that inherit from other models in our database. This way we can have one central `Game` type and create a relationship to a new, central `Match` model with two subsclasses (`EventMatch` and `LeagueMatch`) that contain the specific details necessary for event / league play.

# Goals and Blockers

With this setup in mind, we have two goals we need to work towards before we can start building league-specific database models:
* We need to migrate our existing `Match` model to point to a new `EventModel`.
* We need to create a new `Match` model that inherits from `PolymorphicModel`.

All good so far, but `PolymorphicModel` objects need an `entity_ptr` as a PK, not a standard `ID`. This means a couple of things:
* We need to change the primary key of our `Match` model.
* When we change the PK of our match model, all related objects (those with foreign keys pointing to existing matches) will have their references broken.
* Django requires that our models and our migrations at least *loosely* match, so we can't remove a field in the database and then try to keep using it in the code.

# The Operations

In order to get around the issues described above, I devised a chain of operations. This process takes three migrations and two commits to complete, so it's pretty involved.

1. **Pre-Migrate PKs (Commit #1, Migration #1)**
    * Rename existing `Match` model to `Old_Match`. This frees up the name to use for our new `PolymorphicModel`.
    * Create the new polymorphic `Match` model. This contains no code - it only serves as a parent model.
    * Create the new `EventMatch` model. This is the final form of the original `Match` model we started with (now `Old_Match`), and it inherits from the new `Match` model.
    * Add a new foreign key field (`new_match`) to the `Game` model. This points to `EventMatch` and will eventually replace the existing `match` FK on the `Game` model.
2. **Migrate the PKs (Commit #1, Migration #2)**
    * For every `Old_Match` create a new `EventMatch` with the same attributes.
    * For every `Game` object pointing to `Old_Match`, populate the `new_match` FK with a reference to the freshly minted `EventMatch` object.
3. **Sanity Checks**
    * Ensure that every `Old_Match` has a matching `EventMatch` - data loss here would be no good!
    * Ensure that every `Game` has a linked `EventMatch` that matches the `Old_Match` it's already connected to.
4. **Post-Migrate PKs (Commit #2, Migration #3)**
    * Remove the `match` FK on the `Game` model.
    * Rename the `new_match` FK on the `Game` model to `match`.
5. **Clean-up**
    * Deprecate the `Old_Match` model and delete it after the next build.

It may not be immediately apparent why we use two commits here, but in order for the code not to throw errors when you're working through the migrations (especially migration #2, since it's a data migration) you'll need to make sure the model code and logic accurately reflects the state of the database. For example, in commit #1 we introduce the `new_match` FK on the `Game` model. This is then used in migration #2, as we need to populate it, but once you get to migration #3 Django expects that field to be gone in the model.

# Applying Everything

The way to apply this on a live server is as follows:
1. Check out commit #1.
2. Run migrations.
3. Check out commit #2.
4. Run migrations.

If we try to do it all at once, the code from commit #2 will cause errors when we try to run the first migration. These operations need to happen one at a time to keep the code and the database in lock-step. 

Is it clean? Not really. Can you do the same in raw SQL, but in one file? Probably. So where does that leave us...?

# Conclusion

There are many ways to skin a cat. As I write this all out, I see how tedious and horrible it sounds. That said, this is the solution that worked for me, and it has the benefit of keeping us within the Django ecosystem. No direct SQL was necessary here - it was done completely in Python. There's not much going back from this point, so making use of the migration system for reverts or building a new database from scratch might get a little dicey, but for my use case that's acceptable. I also believe it's a workable problem if you really need to keep those options on the table.

Do you have a better solution to this issue? I'd love to [hear from you](/contact) about it! If not, I hope this at least helped put you on the right track.