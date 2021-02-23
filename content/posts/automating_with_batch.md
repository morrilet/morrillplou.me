---
title: "Automating Tasks with Batch"
image: "/images/posts/automating_with_batch/batch_header.png"
date: 2017-04-19
---

Most people who know me know that I love automation. Taking simple, repetitive, horrible tasks and writing out little scripts to do them for me. Actually, I even went so far as to buy a little water pump and an Arduino a while back and set up an automated watering system for my cactus. This type of stuff is strangely cathartic, and today I had the good fortune of coming across a task that screamed “automate me”.

<!-- more -->

# The Task
So, basically, there were two files that needed to be combined. One was a list of [OTUs](https://en.wikipedia.org/wiki/Operational_taxonomic_unit) (Operational Taxonomic Units), and the other was a [.shared](https://www.mothur.org/wiki/Shared_file) file, which basically shows how many times an OTU was observed across multiple samples. Truthfully, I’m not totally sure what all this is, but it’s got something to do with gene sequencing is what I’m told. The files looked something like this…

**OTU list:**
``` batch
OTU Size Taxonomy
Otu0001 162999 Bacteria(100);Cyanobacteria(100);Cyanobacteria(100);uncultured(100);uncultured_fa(100);uncultured_ge(100);
Otu0002 66637 Bacteria(100);Cyanobacteria(100);Cyanobacteria(100);SubsectionII(100);FamilyII(100);Chroococcidiopsis(100);
```

**.shared file:**
``` batch
label Group numOtus Otu0001 Otu0002 Otu0003 Otu0004 Otu0005
0.03 DV 4762 563 345 5835 11 8
0.03 E32 4762 17 0 4 2 7 2
```

…now let’s take into account that in this small sample, there are 4,762 OTUs. The entire job was to take the 2nd and 4th sub-fields of the taxonomy field in the OTU file and replace the OTU[#] field in the .shared file with the data. The end result looks like this…

``` batch
label Group numOtus Cyanobacteria(100),uncultured(100)  Cyanobacteria(100),SubsectionII(100)  Actinobacteria(100),Frankiales(100)
0.03 DV 4762 563 345 5835
0.03 E32 4762 17 0 4
```

…not exactly complex work, just tedious. This was expected to be done by hand, but I mean come on. This was a job for a small batch script and my new friend [FART](http://fart-it.sourceforge.net/) (Find and Replace Text).

# The Solution
If you have any background working with a command line interface, then the solution to this problem is probably pretty clear. I took a pretty quick’n’dirty approach. First I copied the OTUs and the taxonomy information from the OTU file into a temporary file. After that I simply used FART to replace any OTU number in the .shared file with the taxonomic data linked to the same OTU number in the temporary file. The complete code looked like this…

``` batch
@echo off

set taxFile=%1
set sharedFile=%2

@copy NUL tempFile > NUL
@NUL > tempFile
echo Working...

for /F "tokens=1,3 skip=1 delims=," %%h IN (%taxFile%) DO (
    for /F "tokens=2,4 delims=;" %%j IN ("%%i") DO (
        echo Adding... %%h:%%j,%%k
        echo %%h:%%j,%%k >> tempFile
    )
)

for /F "tokens=1,2,3 delims=:," %%a IN (tempFile) DO (
    fart.exe -i -w -v -- "%sharedFile%" "%%a" "%%b,%%c"
)

del tempFile
echo Done!
pause
```

# Conclusion
All in all, this was just one example of using simple scripting and automation to make tedious tasks easier. This particular example was fun because it was fairly simple and saved a ton of time. Plus I learned about FART, which is another great tool to add to my toolbox (and more importantly, my $PATH).

Questions? Concerns? FART jokes? Drop me a line! I’d love to hear from you, especially if you know any other/better ways to tackle tasks like these.