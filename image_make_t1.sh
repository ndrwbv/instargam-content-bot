#!/bin/bash
echo $(date)
/usr/local/bin/node /home/pi/instagram/vendor/mgp25/instagram-php/instargam-content-bot/js/unsplash_get.js
/usr/local/bin/convert /home/pi/instagram/vendor/mgp25/instagram-php/instargam-content-bot/img/pic-source.png -strokewidth 0 -fill "rgba( 0, 0, 0 , 0.5 )" -draw "rectangle 1080,0 0,1080 " /home/pi/instagram/vendor/mgp25/instagram-php/instargam-content-bot/img/pic-1.png 
echo 'Overlay done.'
/usr/local/bin/node /home/pi/instagram/vendor/mgp25/instagram-php/instargam-content-bot/js/parse_quotes.js
a=`head -1 /home/pi/instagram/vendor/mgp25/instagram-php/instargam-content-bot/resources/is_long.txt`;
if (($a == 1)); then
 /usr/local/bin/convert /home/pi/instagram/vendor/mgp25/instagram-php/instargam-content-bot/img/pic-1.png -size 1080x1080  -gravity Center   \
            -font ~/Downloads/Roboto/Roboto-Light.ttf -stroke  none -fill white -pointsize 60  -annotate +10-38   "$(head -1 /home/pi/instagram/vendor/mgp25/instagram-php/instargam-content-bot/resources/author.txt)"  \
            -font ~/Downloads/Roboto/Roboto-Italic.ttf -stroke  none -fill white -pointsize 50  -annotate +10+30  "$(tail -n  +2 /home/pi/instagram/vendor/mgp25/instagram-php/instargam-content-bot/resources/author.txt )"  \
            -gravity Center \
           -font ~/Downloads/Roboto/Roboto-Thin.ttf -stroke  none -fill white -pointsize 30  -annotate +1+500   "@bookeklik_"  \
          /home/pi/instagram/vendor/mgp25/instagram-php/instargam-content-bot/img/pic-2.png 
 echo 'Long Quote + author done.'
 /usr/local/bin/composite  -gravity Center -geometry  +10-118 /home/pi/instagram/vendor/mgp25/instagram-php/instargam-content-bot/assets/rocket.png /home/pi/instagram/vendor/mgp25/instagram-php/instargam-content-bot/img/pic-2.png  /home/pi/instagram/vendor/mgp25/instagram-php/instargam-content-bot/img/pic-ready.png 
 echo "Picture ready. img/pic-ready.png"
else 
    /usr/local/bin/convert /home/pi/instagram/vendor/mgp25/instagram-php/instargam-content-bot/img/pic-1.png -size 1080x1080  -gravity West   \
            -font ~/Downloads/Roboto/Roboto-Light.ttf -stroke  none -fill white -pointsize 40  -annotate +180-446   "$(head -1 /home/pi/instagram/vendor/mgp25/instagram-php/instargam-content-bot/resources/author.txt)"  \
            -font ~/Downloads/Roboto/Roboto-Italic.ttf -stroke  none -fill white -pointsize 30  -annotate +180-398  "$(tail -n  +2 /home/pi/instagram/vendor/mgp25/instagram-php/instargam-content-bot/resources/author.txt )"  \
            -gravity Center \
           -font ~/Downloads/Roboto/Roboto-Medium.ttf -stroke  none -fill white -pointsize 70  -annotate +1+20   "$(cat /home/pi/instagram/vendor/mgp25/instagram-php/instargam-content-bot/resources/quote.txt)"  \
           -font ~/Downloads/Roboto/Roboto-Thin.ttf -stroke  none -fill white -pointsize 30  -annotate +1+500   "@bookeklik_"  \
          /home/pi/instagram/vendor/mgp25/instagram-php/instargam-content-bot/img/pic-2.png 
    echo 'Quote + author done.'
    /usr/local/bin/composite -geometry  +87+78 /home/pi/instagram/vendor/mgp25/instagram-php/instargam-content-bot/assets/rocket.png /home/pi/instagram/vendor/mgp25/instagram-php/instargam-content-bot/img/pic-2.png  /home/pi/instagram/vendor/mgp25/instagram-php/instargam-content-bot/img/pic-ready.png 
    echo "Picture ready. img/pic-ready.png"
fi
echo 'Uploading..'
php /home/pi/instagram/vendor/mgp25/instagram-php/instargam-content-bot/php/uploadPhoto.php > /home/pi/instagram/vendor/mgp25/instagram-php/instargam-content-bot/instagram.log
echo 'Uploaded.'