#!/bin/bash
node js/unsplash_get.js
convert img/pic-source.png -strokewidth 0 -fill "rgba( 0, 0, 0 , 0.5 )" -draw "rectangle 1080,0 0,1080 " img/pic-1.png 
echo 'Overlay done.'
node js/parse_quotes.js
a=`head -1 resources/is_long.txt`;
if (($a == 1)); then
 convert img/pic-1.png -size 1080x1080  -gravity Center   \
            -font ~/Downloads/Roboto/Roboto-Light.ttf -stroke  none -fill white -pointsize 60  -annotate +10-38   "$(head -1 resources/author.txt)"  \
            -font ~/Downloads/Roboto/Roboto-Italic.ttf -stroke  none -fill white -pointsize 50  -annotate +10+30  "$(tail -n  +2 resources/author.txt )"  \
            -gravity Center \
           -font ~/Downloads/Roboto/Roboto-Thin.ttf -stroke  none -fill white -pointsize 30  -annotate +1+500   "@bot_keklik"  \
          img/pic-2.png 
 echo 'Long Quote + author done.'
 composite  -gravity Center -geometry  +10-118 assets/rocket.png img/pic-2.png  img/pic-ready.png 
 echo "Picture ready. img/pic-ready.png"
else 
    convert img/pic-1.png -size 1080x1080  -gravity West   \
            -font ~/Downloads/Roboto/Roboto-Light.ttf -stroke  none -fill white -pointsize 40  -annotate +180-446   "$(head -1 resources/author.txt)"  \
            -font ~/Downloads/Roboto/Roboto-Italic.ttf -stroke  none -fill white -pointsize 30  -annotate +180-398  "$(tail -n  +2 resources/author.txt )"  \
            -gravity Center \
           -font ~/Downloads/Roboto/Roboto-Medium.ttf -stroke  none -fill white -pointsize 70  -annotate +1+20   "$(cat resources/quote.txt)"  \
           -font ~/Downloads/Roboto/Roboto-Thin.ttf -stroke  none -fill white -pointsize 30  -annotate +1+500   "@bot_keklik"  \
          img/pic-2.png 
    echo 'Quote + author done.'
    composite -geometry  +87+78 assets/rocket.png img/pic-2.png  img/pic-ready.png 
    echo "Picture ready. img/pic-ready.png"
fi