# instargam-content-bot
content-maker-and-poster

в `core.js` хранятся функции по работе с файловой системой

в `photo.js` логика работы создания обычного поста

в `debug.js` экспортируемый класс для красивого вывода в консоль

## Usage
```
git clone https://github.com/ndrwbv/instargam-content-bot
cd instargam-content-bot
mkdir img resources logs
```
### Set up
```bash
composer require mgp25/instagram-php
npm install
```
Так же, нужно создать файл конфига в папке `php/`, в котором будет хранится логин и пароль от инстаграма.
```php
<?php
return [
    "username" => "yourName",
    "password" => "yourPassword"
];
```
### Run
```bash
./start.sh
```
## getQuote()
если json не пустой то выполнится функция getFirstQuote()
эта функция вырезает первую строку из json, раскидывает ее по файлам и перезаписывает json
если json пустой то парсятся цитаты с учетом последнего номера страницы, который хранится в page_number.txt
после парсинга число меняется.


## Server setup

### Cron
Для того, чтобы использовать cron, нужно прописать абсолютный путь в переменную `$full` в `start.sh`, а так же в переменную `PATH` в uploadPhoto.php и в `require './vendor/autoload.php'`.

Чтобы добавить задачу:
```bash
crontab -e
```
Для того чтобы исполнять задачу каждый день вставляем эту строку: 
```bash
0 1 * * * /home/pi/instagram/start.sh >> /home/pi/logs/insta_bot.log
```
Проверить что задача добавилась:
```bash
crontab -l
```
### scp
```bash
scp php/upload1.php pi@andrew-pi.local:/home/pi/
```

### screen
```bash
sudo apt-get install screen 
```
Список доступных сессий:
```bash
screen -ls
```
Создать сессию:
```bash
screen -S <NAME SESSSION>
```
Перейти в сессию:
```bash
screen -r <NUMBER>
```
Попасть из одной сессии в другую:
```bash
ctrl + A ctr + D 
```
Добавить скрипт в процессы:
```bash
python3.6 <script.name> >> bot.log &
```
## Links
Масс лайкер и масс фоловер: https://github.com/instabot-py/instabot.py 

Библиотека инстаграмма: https://github.com/mgp25/Instagram-API
