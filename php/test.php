<?php
//закидывать фотку в нейронку и получать ключевые слова

//
// $quote = str_replace("\n", " ", file_get_contents($PATH.'resources/quote.txt', FILE_USE_INCLUDE_PATH));
// $author_s = explode("\n", file_get_contents($PATH.'resources/author.txt', FILE_USE_INCLUDE_PATH));
// $author_tags = " #".str_replace(" ", "", $author_s[0])." #".str_replace(" ", "", $author_s[0])."quotes"." #".str_replace(" ", "", $author_s[0])."quote";
// $tags_ = ["#positive", "#universe", "#inspired", "#positivevibes", "#goodvibes", "#inspirational"];
// $tags = "#quotes #bookquote #book #bestquotes #dailyquotes #bookeklik ".$tags_[rand(0,5)];
// $emojis = ["📚", "📙", "📘", "📗", "📕", "📒", "📓", "📖" ];
// $question_text = ["🔥Tag someone who needs to read this!", "True?", "Agree?", "👏"];

$tags = [
  'universal' => [
    "#positive",
    "#universe",
    "#inspired",
    "#positivevibes",
    "#goodvibes",
    "#inspirational"
  ],
  'author' => [
    "#".str_replace(" ", "", $author_s[0]),
    "#".str_replace(" ", "", $author_s[0])."quotes",
    "#".str_replace(" ", "", $author_s[0])."quote"
  ],
  'specialize' => [
    "#quotes",
    "#bookquote",
    "#book",
    "#bestquotes",
    "#dailyquotes",
  ]

];
//gen 3 random num no repeate
//make a cicle
echo count($tags['universal']);
$tags['universal'][ rand( 0,count($tags['universal'])-1 ).
$tags['universal'][ rand( 0,count($tags['universal'])-1 ).
$tags['universal'][ rand( 0,count($tags['universal'])-1 ).
$tags['author'][0]).
$tags['author'][1]).
$tags['author'][2]).
$tags['author'][0]).

var_dump($tags['author'][ rand( 0,count($tags['universal'])-1 ) ]);
// $captionText = $emojis[rand(0, 7)].$quote.' – '.$author_s[0].', '.$author_s[1]."⠀\n".$question_text[rand(0, 3)]."\n."."\n.\n.\n.\n.\n.\n".$tags.$author_tags;
