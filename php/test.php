<?php
$quote = str_replace("\n", " ", file_get_contents('resources/quote.txt', FILE_USE_INCLUDE_PATH));
$author_s = explode("\n", file_get_contents('resources/author.txt', FILE_USE_INCLUDE_PATH));
$author_tags = $author_tags = "#".str_replace(" ", "", $author_s[0])." #".str_replace(" ", "", $author_s[0])."quotes"." #".str_replace(" ", "", $author_s[0])."quote";

echo $author_tags;