---
title: "Streaming Video Over LAN with FFMPEG"
image: "/images/posts/video_over_lan_ffmpeg/banner.png"
date: 2019-03-04
date_modified: 2022-01-17
---

I’ve been offline for a while and I figured it’s probably time to check back in with something completely different. This may not be my usual shtick, but I’m super happy I had the opportunity to do this, and I wanted to share a bit about it. Without further ado, this is “Streaming Video Over LAN with FFMPEG”. (Alternatively, “Spying on Your Friends.”)

<!-- more -->

# Setup and Constraints
First things first, I’ll let you know a bit about my set up and constraints. I had access to a USB webcam hooked up to a Raspberry Pi Model B+ (I’ve heard this will work fine with a Zero W, too, but I didn’t have the right adapters for it) with a 16 GB USB key jammed in there for storage. On the receiving end, I had my laptop to pull down the video.

This whole thing, while being something I’ve wanted to do for a while regardless, came about when I was asked to help with the back-end of an at-home escape room. With this in mind, I knew that my setup could only tolerate moderate (2-5 seconds) latency, and that I’d need both audio and video feeds. I also decided that storing the video as we stream it would be a nice touch, as it would allow us to make a best-of video later and hand it out to the participants.

# Initial Attempts
Once I knew what I had to do, I set about learning [FFMPEG](https://www.ffmpeg.org/). I’d used it before for simple file type conversion, but I had never attempted something like this with it. As such, I got to Googling. I saw plenty of people using FFSERVER to facilitate the stream, so I gave that a go and it worked!

Sort of. It was the first attempt that actually allowed me to stream video over the network successfully, but it wasn’t great. There was a good bit more latency than I was expecting, and the set up was a little heavier than I would’ve liked. FFSERVER required that I define stream and feed objects in an /etc/ffserver.conf file and send data to those. I was a complete novice when it came to encoding, decoding, containers, etc, so finding the right settings for these was really just trial and error. In the end, it just didn’t feel like the right path for me to go down, so I opted to try my hand at pure FFMPEG.

That’s not to say that FFSERVER won’t be right for you, however, as it did have some upsides. I liked that it let me stream to localhost and pull down the video from the Pi via it’s local IP address. Streaming with FFMPEG alone required that I send the stream to any receivers directly, which meant that I had to know exactly what computers would be monitoring the feed. I also liked that using FFSERVER allowed me to view the stream in VLC. This is something that should theoretically still work with pure FFMPEG, but I could never get it set up. All of this was fine for my purposes, but I understand that not everyone will be able to ditch FFSERVER so easily.

# Making Progress
After I ditched FFSERVER I went about getting the stream to run through FFMPEG via UDP and this is what I came up with:

``` bash
ffmpeg -s 1024x786 -i /dev/video0 \
    -preset ultrafast -tune zerolatency -codec libx264 \
	-f mpegts udp://192.168.2.61:8090
```

The line above resulted in pretty good video quality and only had about 2 seconds of latency. Let’s have a look at each piece of this command and see what’s going on.

Firstly, it’s important to note that the order of options in relation to streams matters here. FFMPEG allows you to specify input and output streams in a single command and it applies options to the next stream in the command. There are also global options which precede everything else, but I won’t really be covering those.

**ffmpeg** – The command to run. Yes, I’m fairly certain we all know this, but maybe it’ll help someone?

**-s 1024×786** – This specifies the size of the video. Note that because this precedes the video input, it’ll apply to the video input stream and we’ll be capturing video at this size. If we put this in front of the output stream (after the video input), we’d be resizing the video after it’s been captured.

**-i /dev/video0** – This is the input stream we’re using. I’m using /dev/video0 here because that’s where my camera got mounted but your system may be different so you should figure out where your camera is and use that. As an aside, this could also be a file such as ~/Videos/myvid.mp4 if you so choose.

**-preset ultrafast** – This, according to the [FFMPEG h264 encoding guide](https://trac.ffmpeg.org/wiki/Encode/H.264), is “a collection of options that will provide a certain encoding speed to compression ratio.” I chose the one with the highest encoding speed (and lowest compression ratio) because I wanted to reduce latency. Note that this is the beginning of a series of options that precede the output stream, and as such this and all of the following options apply to the output, not the input.

**-tune zerolatency** – This is similar to the preset option, but it specifies the settings to use based on the input you’re drawing from. I chose zerolatency because according to the [encoding guide](https://trac.ffmpeg.org/wiki/Encode/H.264) it’s best for “fast encoding and low-latency streaming.”

**-codec libx264** – This specifies the codec to use when encoding the output stream. We have [plenty of options here](https://en.wikipedia.org/wiki/Video_codec#Commonly_used_video_codecs), but I went with [x264](https://www.videolan.org/developers/x264.html) because as far as I can tell it’s widely used and encodes to h264 and MPEG-4 AVC well. Plus, it’s made by the folks that make VLC and I trust them so far.

**-f mpegts** – This specifies the format to output to. This could be something like FLV or WMV, but I opted for MPEG-TS because I noted a huge decrease in latency when I switched over to it from FLV. Upon further inspection I discovered that it was actually designed for live-streaming. An interesting note here is that it handles file input poorly, so it’s not what you want to go with if you’re encoding to a file.

An important note about the format you use: something like AVI that contains index information at the end of the file won’t work here as (in theory) we never reach the end of a live stream. Do some research on the format you want to use and play around with other ones if you’re not getting the results you want.

**udp://192.168.2.61:8090** – This is the output stream. Here, we’re using UDP to send the output to 192.168.2.61 on port 8090. UDP requires that you send the packets to the receiver, not your own local loopback address. This was a bit of a sticking point for me, so be sure you replace the IP with that of the computer you’ll be receiving the stream on and choose a port you like. I went with 8090 because it’s FFSERVER’s default, and I figured it wouldn’t conflict with anything else.

![A picture of the room we built this in. It's the very first image from the stream!](/images/posts/video_over_lan_ffmpeg/CamView_0.png)

We have video.

All in all, this command worked better than I could’ve hoped. There was one issue though, and that’s that it doesn’t take any audio input. I quickly set about solving this, but I ran into some more hurdles.

# Adding Audio
Let’s start by looking at the command I used to stream audio and video together, and then I’ll break down the new options and explain the issues I had.

``` bash
ffmpeg -f alsa -thread_queue_size 2048 -i plughw:1,0 \
	-s 1024x768 -itsoffset 0.9 -i /dev/video0 \
	-vcodec h264 -acodec mp2 -b:v 3m -b:a 192k \
	-preset ultrafast -tune zerolatency \
	-f mpegts udp://192.168.2.61:8090
```

Okay, so there’s a lot of new stuff here. First, let’s take a look at the basics. Next, we’ll take a look at each new option through the lens of the problem it’s there to solve.

**-f alsa** – Raspbian uses ALSA (Advanced Linux Sound Architecture) to provide an API for sound cards, which includes the one on your webcam. ALSA is built into the kernel (it replaced OSS), so it’s not going anywhere. You can use other sound managers if you like, but ALSA did what I needed so I stuck with it.

**-i plughw:1,0** – You may recognize the -i option here. This specifies an input stream (the one we’ll use for audio), and it points to an ALSA device. The name of this stream, much like /dev/video0, is dependent on your system. You’ll have to [find it using some ALSA commands](https://superuser.com/questions/53957/what-do-alsa-devices-like-hw0-0-mean-how-do-i-figure-out-which-to-use). As far as I can tell, the naming here goes something like this: plughw is plug hardware, or a USB, and 1,0 is the card number, followed by the device number. ALSA is still a bit confusing to me, but I’m sure some of you Linux veterans will have no problem with this.

**-vcodec h264** – This is just another way of specifying a codec to use. By using vcodec, we’re telling FFMPEG that we want our output stream to have it’s video encoded in h264.

Okay, with the basics explained we can move on to some more interesting stuff. Firstly, latency issues. When I first added audio to the stream, it absolutely tanked the latency. The dreamy 2 second delay I had with only video turned to a 10 second nightmare. To fix this, I used the following options:

**-acodec mp2** – This specifies the audio codec to use for the output stream. I chose mp2 because it’s faster than mp3 and I wasn’t too worried about audio quality. As long as the folks in the control room could hear what the players were saying well enough to give them hints I was happy.

**-b:v 3m** – This specifies the video bitrate for the output stream. I opted for 3 Mbps because, again, I wasn’t super worried about quality and keeping it low results in less latency. If you’re wondering what bitrate is right for you, [YouTube has an excellent chart for that](https://support.google.com/youtube/answer/1722171?hl=en).

**-b:a 192k** – This basically the same as the b:v option, but it specifies the bitrate of the audio. Again, I was more worried about latency than quality so I kept this fairly low. This is definitely another option to play around with if you’re having issues.

So at this point everything seemed like it should be running smoothly but it wasn’t. I was running into an error in my stream that caused stuttering and incoherent audio. Every 20 frames or so, the console would output “ALSA buffer xrun,” which as far as I can tell meant that I was overflowing the ALSA buffer. This wasn’t going to work for me, so I began investigating and found a fix.

**-thread_queue_size 2048** – Honestly, I’m not entirely sure why this works. I think it allows more packets to pile up before they’re sent out over the network, which keeps the ALSA buffer from overflowing. This theory is backed up by the fact that when the network hiccuped during my stream I got a number of these errors logged to the console before the network re-stabilized. Here I use this as an option for the audio stream, but I’ve seen people use this as an option for both audio and video before as well. Additionally, the size that you use is up to you. Play around with it and see what works. I’ve tried 1024, and I’ve even seen people go up above 10,000. Finally, it’s also worth noting that you may still get a buffer xrun error at the very start of the stream. This is normal, and as far as I’ve been able to tell it’s due to the handshake between the sender and receiver as they set up a connection.

Okay, great! So now everything is technically working, but the audio isn’t synced to the video. I was stumped on this one for a long time, but in the end it was a fairly simple fix.

**-itsoffset 0.9** – This is something you’ll definitely need to play around with. It offsets the stream it’s applied to, but the amount is entirely based on the amount of de-sync you’re dealing with. I landed on 0.9 for my streaming setup, but as you’ll see in the next command, I had to change it when I introduced another output stream. Your audio may be arriving before the video or after, but this should fix it either way. Just keep playing around with the value and you’ll eventually land on something that works.

At this point I had the stream working almost exactly as I wanted it. The latency was brought under 5 seconds and the audio was, while choppy at times, totally coherent. I was getting excited, but I still had one more improvement to make before I could use this to capture the confused musings of our players.

!["The view from the camera as one of the players reads a note aloud in confusion."](/images/posts/video_over_lan_ffmpeg/CamView_1.png)

# Saving the Stream
Saving the stream was fairly straightforward, actually. FFMPEG provides us with an easy way to split output into multiple streams: [Tee](https://ffmpeg.org/ffmpeg-formats.html#tee-1).

``` bash
ffmpeg -f alsa -thread_queue_size 2048 -i plughw:1,0 \
		-s 1024x768 -itsoffset 0.65 -i /dev/video0 \
		-f tee -vcodec h264 -acodec mp2 -b:v 3m -b:a 192k \
		-preset ultrafast -tune zerolatency -map 0:a -map 1:v \
		"localCopy.mp4|[f=mpegts]udp://192.168.2.61:8090"
```

Much of this we’ve seen already, but there are definitely a couple new pieces we can go over.

**-f tee** – Here we specify that we want our output to be handled by tee, but we still apply the same options to the output stream. Any options that aren’t specific to the individual output streams (written like “[opt=value]”) are shared by all the places you pipe the output. So in this case, both localCopy.mp4 and my UDP stream have the same video codec, audio codec, preset, etc.

**-map 0:a** – Typically, FFMPEG manages to map your input stream to your output stream behind the scenes, but sometimes that doesn’t work. While using Tee I was getting an error stating that “output file #0 does not contain any stream,” so I manually mapped the inputs to my output stream. By using 0:a I specified that input stream #0 (the first one) was an audio stream to be added to the output stream.

**-map 1:v** – This is the same as above but we’re adding input stream #1 to the output as a video stream.

**“localCopy.mp4|[f=mpegts]udp://192.168.2.61:8090”** – This specifies the locations we want to send the output stream. Here, we decide to send it to a file called localCopy.mp4, as well as udp://192.168.2.61:8090 (delimited by a ‘|’). There are a couple important notes here. Firstly, if you choose to send this to a file, FFMPEG will either create the file if it doesn’t exist, or overwrite it if it does. There are global options you can use to modify this behavior, but I didn’t want to take any risks so I just did some validation in the streaming script I wrote and made the user pass a file name as an argument. Lastly, you may notice that the UDP stream has an option in front of it. Here, we’re basically just using “-f mpegts,” but it’s formatted for use in tee. We only apply this to the UDP stream because by using the .mp4 file extension on localCopy.mp4 we’re giving FFMPEG a hint as to what format to use for that file.

And that should do it! The stream is now capturing audio and video, as well as saving everything to a file. Note that if there are any artifacts in the stream due to poor network connectivity, they won’t be captured in the file. In my case the video sometimes had some tearing or pixelation, but because we’re storing the file locally we don’t see any of that in the output file.

There’s one last thing we need to do, though, and it’s possibly the second most critical part of this whole setup.

# Viewing the Stream (Updated, see P.P.S.)
With the stream set up, we now need to view the it on the receiving computer. This can theoretically be done in a number of ways, but I used FFPLAY. Head on over to the receiving computer and run this command:

``` bash
ffplay -f mpegts udp://192.168.2.62:8090
```

Okay, so looking back on it I’m not sure why that’s 192.168.2.62 instead of 127.0.0.1 (localhost), but that’s the command that worked for me. Regardless, the IP and port number will be different for you depending on your network setup. This is pretty straightforward, but let’s quickly run through this command.

**ffplay** – The command to use. This should be pretty obvious. If it’s not working for you, you may need to [download FFMPEG](https://www.ffmpeg.org/download.html) on your receiving machine.

**-f mpegts** – The format we’re expecting to receive. Recall that this is the format we specified for the UDP output stream in the commands we ran on the Raspberry Pi.

**udp://192.168.2.62:8090** – Again, I can’t for the life of me recall why I used this IP address, but just know that this should point to wherever you sent the UDP output stream from the FFMPEG command. The port should be the same one you used to send the stream.

And that’s all there is to it! I know this post has been an absolute beast, so let’s wrap things up.

!["The view from the camera as I help someone re-position it."](/images/posts/video_over_lan_ffmpeg/CamSetup_0.png)

# Wrapping Things Up
If you’ve made it this far you have the patience of a saint. Or maybe you’re just a huge nerd. Either way, you may run into problems with your stream in the form of latency, artifacting, or downright insubordination. It took me nearly two full days to get this thing working the way I did, so don’t get too discouraged if you run into issues. Hopefully this post is able to help out a bit, but if not head over to the [FFMPEG documentation](https://www.ffmpeg.org/documentation.html). It’s super important to know exactly what you’re putting into your commands, and there’s a ton of stuff in there about audio and video codecs, output formats, etc.

I had a blast setting this up, and the end result was totally worth it. We had several groups of people huddled around a laptop to watch their friends fail the escape room the same way they did 45 minutes earlier. We were also able to send players hints through a pair of bluetooth speakers when we saw they were getting too off-track. All in all, it was an amazing experience, and getting to learn just how deep the FFMPEG rabbit-hole goes was a huge plus for me.

If you have any comments or concerns feel free to post them down below. I’d love to hear about why everything I’ve said is wrong.

**P.S.** After I’d finished this whole adventure, I learned something interesting about saving to an .mp4 file. Apparently, the header data for an MP4 is saved to the end of the file. This means that if your stream is interrupted unexpectedly you may not write this data and you won’t be able to view the file’s contents, despite them still technically being there. A fix for this is to use MKV files for your saved stream data. These apparently write their headers throughout the file so if the stream cuts out unexpectedly you can still salvage the recorded file.

**P.P.S. (12/28/2021)** A reader reached out asking about whether or not there’s any way to improve the latency here, and I’m happy to report that I’ve found a way to bring it down to ~1s. I’ll leave the explanation to [this StackOverflow post](https://stackoverflow.com/questions/16658873/how-to-minimize-the-delay-in-a-live-streaming-with-ffmpeg/49273163#49273163) (it’s pretty in-depth) but here’s the updated command for the receiving PC:

```bash
ffplay -fflags nobuffer -flags low_delay -framedrop udp://192.168.2.62:8090
```