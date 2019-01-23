#!/bin/bash
echo $(date)
node=`which node`;
full=`pwd`;
convert=`which convert`;
composite=`which composite`;

$node $full/js/unsplash_get.js
$convert $full/img/pic-source.png -strokewidth 0 -fill "rgba( 0, 0, 0 , 0.5 )" -draw "rectangle 1080,0 0,1080 " $full/img/pic-1.png
echo 'Overlay done.'

$node $full/js/parse_quotes.js
a=`head -1 $full/resources/is_long.txt`;
if (($a == 1)); then
 $convert $full/img/pic-1.png -size 1080x1080  -gravity Center   \
            -font $full/resources/Roboto/Roboto-Light.ttf -stroke  none -fill white -pointsize 60  -annotate +10-38   "$(head -1 $full/resources/author.txt)"  \
            -font $full/resources/Roboto/Roboto-Italic.ttf -stroke  none -fill white -pointsize 50  -annotate +10+30  "$(tail -n  +2 $full/resources/author.txt )"  \
            -gravity Center \
           -font $full/resources/Roboto/Roboto-Thin.ttf -stroke  none -fill white -pointsize 30  -annotate +1+500   "@bot_keklik"  \
          $full/img/pic-2.png
 echo 'Long Quote + author done.'
 $composite -gravity Center -geometry  +10-118 $full/assets/rocket.png $full/img/pic-2.png  $full/img/pic-ready.png
 echo "Picture ready. img/pic-ready.png"
else
    $convert $full/img/pic-1.png -size 1080x1080  -gravity West   \
            -font $full/resources/Roboto/Roboto-Light.ttf -stroke  none -fill white -pointsize 40  -annotate +180-446   "$(head -1 $full/resources/author.txt)"  \
            -font $full/resources/Roboto/Roboto-Italic.ttf -stroke  none -fill white -pointsize 30  -annotate +180-398  "$(tail -n  +2 $full/resources/author.txt )"  \
            -gravity Center \
           -font $full/resources/Roboto/Roboto-Medium.ttf -stroke  none -fill white -pointsize 70  -annotate +1+20   "$(cat $full/resources/quote.txt)"  \
           -font $full/resources/Roboto/Roboto-Thin.ttf -stroke  none -fill white -pointsize 30  -annotate +1+500   "@bookeklik_"  \
          $full/img/pic-2.png
    echo 'Quote + author done.'
    $composite -geometry  +87+78 $full/assets/rocket.png $full/img/pic-2.png  $full/img/pic-ready.png
    echo "Picture ready. img/pic-ready.png"
fi

echo 'Uploading..'
php $full/php/uploadPhoto.php > $full/instagram.log
echo 'Uploaded.'
