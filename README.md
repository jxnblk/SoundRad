# SoundRad

A radically simpler & faster SoundCloud player

http://soundrad.com 

## Built with [Basscss](http://basscss.com) and [Angular](http://angularjs.org)

## Built for speed

With around a **200 Speed Index** on repeat view,
SoundRad is significantly faster than SoundCloud.

### First View

Metric            | SoundCloud | SoundRad
------------------|------------|---------
Load Time         | 3.008s     | 0.980s
First Byte        | 0.658s     | 0.242s
Start Render      | 2.895s     | 1.294s
Speed Index       | 4345       | 1559

### Repeat View

Metric            | SoundCloud | SoundRad
------------------|------------|---------
Load Time         | 4.301s     | 0.001s
First Byte        | 0.167s     | 0.000s
Start Render      | 1.694s     | 0.100s
Speed Index       | 2444       | 187

Sources:
SoundCloud: http://www.webpagetest.org/result/141019_0M_12NV/
SoundRad: http://www.webpagetest.org/result/141019_XP_12K9/

Because SoundRad is built with Angular, it really wins on repeat views.
For fun, you can check out this test of soundcloud.com with absurdly bad results:
http://www.webpagetest.org/result/141019_H9_12MS/

## How is it so much faster?
SoundRad focuses on content – in this case, audio.

### No images
SoundCloud loads separate images for each track cover.
It also loads every avatar for every comment on the page.

### No comments
Have you ever actually read a SoundCloud comment?

### Fewer network requests
With SoundCloud, I typically see anywhere from 500 to 1,000 network requests on initial load.
SoundRad keeps it under 20.

## Content-Centric
I use SoundCloud to listen to music. SoundRad focuses on loading audio above all else.

### License
[MIT License](http://opensource.org/licenses/MIT)

