---
title: Jank City Stats
image: '/images/sites/jankcitystats/jc_home.jpg'
thumbnail: '/images/sites/jankcitystats/Thumbnail.png'
date: 2019-04-19
screenshots: [
    {alt: "A mockup of the site on desktop displays.", src: "/images/sites/jankcitystats/DesktopMockup_Dark.png"},
    {alt: "A mockup of the site on mobile displays.", src: "/images/sites/jankcitystats/MobileMockup_Dark.png"}
]
live_url: 'https://jankcitystats.com'
excerpt: A stat tracking website focused on a robust database structure built with Django and MySQL.
---

A stat tracking website for a semi-monthly *Magic the Gathering* event that a friend puts on. This was initially made as a way to practice with Django, MySQL, and Python 
but has since become the testing ground for a handful of other technologies (e.g. continuous integration, proper GitHub issue tracking / open source 
methodology). I've updated the site rather sporadically over the years, but it's always kept up with whatever whacky new rules the in-person event
decides to adopt. I wanted to build this with a flexible database structure that could calculate stats for games with more than two players, uneven
match counts per-player, and more. This site was also the focus of a [blog post I wrote](/blog/posts/zero-to-sixty-in-14-seconds/) about database adaptability.

## Tools Used

* Python
* Django REST Framework / Templates
* MySQL
* Travis CI
* Javascript (frontend framework incoming!)
* HTML / CSS

## Credits

* Ethan Morrill-Ploum
    * Design & code.