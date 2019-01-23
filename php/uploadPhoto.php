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
//////////////////////

function Rand_u($min, $max, $quantity) {
    $numbers = range($min, $max);
    shuffle($numbers);
    return array_slice($numbers, 0, $quantity);
}

//////////////////////
$quote = str_replace("\n", " ", file_get_contents($PATH.'resources/quote.txt', FILE_USE_INCLUDE_PATH));
$author_s = explode("\n", file_get_contents($PATH.'resources/author.txt', FILE_USE_INCLUDE_PATH));

$emojis = ["📚", "📙", "📘", "📗", "📕", "📒", "📓", "📖" ];

$question_text = [
  "🔥 Tag someone who needs to read this!",
  "True?",
  "Agree?",
  "👏"];

$tags = [
  'all' => [
    "#positive",
    "#universe",
    "#inspired",
    "#positivevibes",
    "#goodvibes",
    "#inspirational",

    "#quotes",
    "#bookquote",
    "#book",
    "#bestquotes",
    "#dailyquotes",
  ],
  'author' => [
    "#".str_replace(" ", "", $author_s[0]),
    "#".str_replace(" ", "", $author_s[0])."quotes",
    "#".str_replace(" ", "", $author_s[0])."quote",
    "#bookeklik"
  ],
];

$quotes_amount = 6; // without $tags_author.

$tags_author = implode(' ', $tags['author']);
$tags_all = "";

$random_numbers = Rand_u( 0, count($tags['all'])-1, $quotes_amount);

for($i = 0; $i < $quotes_amount; $i++){
  $tags_all = $tags_all.$tags['all'][$random_numbers[$i]]." ";
}

$main_text = str_replace(" .", ".", $quote."\n✏️  ".$author_s[0].".\n".$emojis[rand(0, 7)]." ".$author_s[1]);

$captionText = $main_text."⠀\n"
              .$question_text[rand(0, 3)]."\n."."\n.\n.\n.\n.\n.\n"
              .$tags_all
              .$tags_author;

//////////////////////

$ig = new \InstagramAPI\Instagram($debug, $truncatedDebug);

try {
    $ig->login($config['username'], $config['password']);
} catch (\Exception $e) {
    echo 'Something went wrong: '.$e->getMessage()."\n";
    exit(0);
}

try {
    $photo = new \InstagramAPI\Media\Photo\InstagramPhoto($photoFilename);
    $ig->timeline->uploadPhoto($photo->getFile(), ['caption' => $captionText]);
} catch (\Exception $e) {
    echo 'Something went wrong: '.$e->getMessage()."\n";
}
