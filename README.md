## Что это?
Это бот. Он получает цитаты с сайта https://www.goodreads.com, красиво их оформляет используя фотографии с unspash, делает подпись, добавляет хештеги и выкладывает в инстаграм.

<img src="https://github.com/ndrwbv/instargam-content-bot/blob/master/Screen%20Shot%202019-02-15%20at%2015.51.43.png" width="850" title="https://www.instagram.com/bot_keklik/">

Ссылка на профиль: https://www.instagram.com/bot_keklik/

### Instalation

```
wget https://github.com/ndrwbv/instargam-content-bot/archive/1.1.zip
unzip 1.1.zip
cd instargam-content-bot-1.1
./init.sh
```
*Установка производится с помощью composer и npm*

### I don't have composer
```
wget https://github.com/ndrwbv/instargam-content-bot/releases/download/1.1/instargam-content-bot-full.zip
unzip instargam-content-bot-full.zip
cd instargam-content-bot-full
./init.sh
```
### Run
```bash
./start.sh
```

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

## Links
Библиотека инстаграмма: https://github.com/mgp25/Instagram-API
