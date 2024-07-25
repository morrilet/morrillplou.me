---
title: Grammy
image: '/images/sites/grammy/Header.png'
thumbnail: '/images/sites/grammy/MobileMockup-Dark.png'
date: 2024-07-24
screenshots: [
    {alt: "A mockup of the site on mobile displays.", src: "/images/sites/grammy/MobileMockup-Dark.png"},
    {alt: "A mockup of the site on desktop displays.", src: "/images/sites/grammy/DesktopMockup-Dark.png"}
]
live_url: 'https://grammy.morrillplou.me'
excerpt: An AI-powered, on-the-go anagram generator built with Next.js and Google Gemini.
---

Does it generate good anagrams? Very rarely! Is it fun to use? **You bet it is.**

Grammy was built quickly as a way to get hands-on with AI tools and re-familiarize myself with Next.js. The MVP took roughly four hours of work to stand up, but as they say, the devil's in the details. Netlify Functions were a bonus when I decided that maybe (just maybe) I should treat my Gemini API key with some dignity.

I learned a lot building this project (maybe I'll blog about it later, who knows) and wrote plent of notes over on the [GitHub repo](https://github.com/morrilet/grammy). One major takeaway is just how much fine-tuning is needed to generate reliable outputs using LLMs. Apparently some folks are even [calling anagram generation a "cognitive blind spot"](https://www.researchgate.net/publication/372611886_Large_Language_Models_are_Extremely_Bad_at_Creating_Anagrams) in LLMs, which I totally buy given my experience on this project. Super interesting stuff!

## Tools Used

* Next.js
* Netlify Functions
* Google Gemini
* HTML / CSS
* V0 / Shadcn/UI

## Credits

* Ethan Morrill-Ploum
    * Design & code.