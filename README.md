# instargam-content-bot
### parse_quotes.js
если json не пустой то выполнится функция getFirstQuote()
эта функция вырезает первую строку из json, раскидывает ее по файлам и перезаписывает json
если json пустой то парсятся цитаты с учетом последнего номера страницы, который хранится в page_number.txt
после парсинга число меняется.

### Cron usage
Чтобы добавить задачу:
```bash
crontab -e
```
Вставляем эту строку:
```bash
0 1 * * * /home/pi/instagram/vendor/mgp25/instagram-php/instargam-content-bot/image_make_t1.sh >>
/home/pi/insta_bot.log
```
*Обязательно везеде должны быть абсолютные пути.*
Запускает скрипт каждый день с выводом логов в `insta_bot.log` 
Проверить что задача добавилась:
```bash
crontab -l
```
### scp
```bash
scp php/upload1.php pi@andrew-pi.local:/home/pi/instagram/vendor/mgp25/instagram-php/instargam-content-bot/php/
```
