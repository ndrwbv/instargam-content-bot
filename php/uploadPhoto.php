<?php

set_time_limit(0);
date_default_timezone_set('UTC');

require '/Users/andrew/Desktop/instagram/vendor/autoload.php';

/////// CONFIG ///////
$config = require 'php/config.php';
$debug = true;
$truncatedDebug = false;
//////////////////////


/////// MEDIA ////////
$photoFilename = 'img/pic-ready.png';

$quote = str_replace("\n", " ", file_get_contents('resources/quote.txt', FILE_USE_INCLUDE_PATH));
$author_s = explode("\n", file_get_contents('resources/author.txt', FILE_USE_INCLUDE_PATH));
$main_text = "👌 #debugging \n";

$captionText = $quote.' – '.$author_s[0].', '.$author_s[1].".\n.\n.\n.\n".$main_text;
//////////////////////

$ig = new \InstagramAPI\Instagram($debug, $truncatedDebug);

try {
    $ig->login($conifg['username'], $config['password']);
} catch (\Exception $e) {
    echo 'Something went wrong: '.$e->getMessage()."\n";
    exit(0);
}

try {
    // The most basic upload command, if you're sure that your photo file is
    // valid on Instagram (that it fits all requirements), is the following:
    // $ig->timeline->uploadPhoto($photoFilename, ['caption' => $captionText]);

    // However, if you want to guarantee that the file is valid (correct format,
    // width, height and aspect ratio), then you can run it through our
    // automatic photo processing class. It is pretty fast, and only does any
    // work when the input file is invalid, so you may want to always use it.
    // You have nothing to worry about, since the class uses temporary files if
    // the input needs processing, and it never overwrites your original file.
    //
    // Also note that it has lots of options, so read its class documentation!
    $photo = new \InstagramAPI\Media\Photo\InstagramPhoto($photoFilename);
    $ig->timeline->uploadPhoto($photo->getFile(), ['caption' => $captionText]);
} catch (\Exception $e) {
    echo 'Something went wrong: '.$e->getMessage()."\n";
}
