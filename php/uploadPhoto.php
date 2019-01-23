<?php

set_time_limit(0);
date_default_timezone_set('UTC');

require './vendor/autoload.php';
$PATH = '';

/////// CONFIG ///////
$config = require $PATH.'php/config.php';
$debug = true;
$truncatedDebug = false;
//////////////////////


/////// MEDIA ////////

$photoFilename = $PATH.'img/pic-ready.png';

$quote = str_replace("\n", " ", file_get_contents($PATH.'resources/quote.txt', FILE_USE_INCLUDE_PATH));
$author_s = explode("\n", file_get_contents($PATH.'resources/author.txt', FILE_USE_INCLUDE_PATH));
$author_tags = " #".str_replace(" ", "", $author_s[0])." #".str_replace(" ", "", $author_s[0])."quotes"." #".str_replace(" ", "", $author_s[0])."quote";
$tags = "#quote #quotes #bookquote #book #unsplash #bestquotes #dailyquotes #dailyquotesforyou";
$emojis = ["📚", "📙]", "📘", "📗", "📕", "📒", "📓", "📖" ];

$captionText = $emojis[rand(0, 7)].$quote.' – '.$author_s[0].', '.$author_s[1]."⠀\n🔥Tag someone who needs to read this!\n."."\n.\n.\n.\n.\n.\n".$tags.$author_tags;
//////////////////////

$ig = new \InstagramAPI\Instagram($debug, $truncatedDebug);

try {
    $ig->login($config['username'], $config['password']);
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
