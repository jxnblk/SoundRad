# SoundRad

A radically simpler & faster SoundCloud player

http://soundrad.com 

## Built for speed

SoundRad is much faster than SoundCloud.
The reason: it focuses on the content.

### First View

Metric            | SoundCloud | SoundRad
------------------|------------|---------
Load Time         | 4.324s     | 1.356s
First Byte        | 0.885s     | 0.231s
Start Render      | 4.325s     | 0.944s
Speed Index       | 5645       | 1500

### Second View

Metric            | SoundCloud | SoundRad
------------------|------------|---------
Load Time         | 2.177s     | 0.507s
First Byte        | 0.347s     | 0.219s
Start Render      | 1.295s     | 0.492s
Speed Index       | 1926       | 500

Sources:
http://www.webpagetest.org/result/140422_PY_140H/
http://www.webpagetest.org/result/140422_SW_13ZC/

## How is it so much faster?

### No images
SoundCloud loads separate images for each track cover.
It also loads every avatar for every comment on the page.

### No comments
Have you ever actually read a SoundCloud comment?

### Fewer network requests
With SoundCloud, I typically see anywhere from 500 to 1,000 network requests on initial load.
SoundRad keeps it under 40. I'm working on making that even less.

## Content-Centric
I use SoundCloud to listen to music. SoundRad focuses on loading audio above all else.

