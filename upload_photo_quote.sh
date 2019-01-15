#!/bin/bash

node unsplash_get.js #return pic.jpeg
convert pic.png -strokewidth 0 -fill "rgba( 0, 0, 0 , 0.5 )" -draw "rectangle 1080,0 0,1080 " pic-o.png

node parse_quotes.js #return quote.txt

#мы рисуем текст на фото, для этого текст должен быть отформатирован так, чтобы он не выходил за границы.
convert pic-o.png -size 1080x1080  -gravity Center  \ -font Roboto \
          -stroke  none -fill white -pointsize 72  -annotate +1+20   "$(cat quote.txt)"  \
          pic_ready.png

php uploadPhoto.php
