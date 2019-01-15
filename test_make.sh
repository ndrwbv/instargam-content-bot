#!/bin/bash
node js/unsplash_get.js
convert img/pic-source.png -strokewidth 0 -fill "rgba( 0, 0, 0 , 0.5 )" -draw "rectangle 1080,0 0,1080 " img/pic-1.png 
convert img/pic-1.png -size 1080x1080  -gravity West   \
            -font ~/Downloads/Roboto/Roboto-Light.ttf -stroke  none -fill white -pointsize 40  -annotate +180-446   "$(head -1 resources/author.txt)"  \
            -font ~/Downloads/Roboto/Roboto-Italic.ttf -stroke  none -fill white -pointsize 30  -annotate +180-398  "$(tail -n  +2 resources/author.txt )"  \
            -gravity Center \
           -font ~/Downloads/Roboto/Roboto-Medium.ttf -stroke  none -fill white -pointsize 70  -annotate +1+20   "$(cat resources/quote.txt)"  \
           -font ~/Downloads/Roboto/Roboto-Thin.ttf -stroke  none -fill white -pointsize 30  -annotate +1+500   "@bot_keklik"  \
          img/pic-2.png 
composite -geometry  +87+78 assets/rocket.png pic_ready.png  img/pic-ready.png 
