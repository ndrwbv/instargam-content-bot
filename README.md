# It was fun in 2019 but now this repository archived

## What is it?
This is a bot. It draw quotes from https://www.goodreads.com on pictures from unsplash, then adds description, hashtags and post it in instagram.

<img src="https://github.com/ndrwbv/instargam-content-bot/blob/master/preview.jpg" width="850" title="https://www.instagram.com/bot_keklik/">

## Dependencies
* convert
* Instagram-API (PHP)
* cheerio
* iconv-lite
* request

## Instalation
```
wget https://github.com/ndrwbv/instargam-content-bot/archive/1.1.zip
unzip 1.1.zip
cd instargam-content-bot-1.1
./init.sh
```
*npm and composer required*

### I don't have composer
```
wget https://github.com/ndrwbv/instargam-content-bot/releases/download/1.1/instargam-content-bot-full.zip
unzip instargam-content-bot-full.zip
cd instargam-content-bot-full
./init.sh
```
## Run
```bash
./start.sh
```

## Server setup
### Cron
To use cron, you need to set absolute path to variable `$full` in `start.sh`, as well as `PATH` in uploadPhoto.php and in` require './Vendor/autoload.php'`,

To add task:
```bash
crontab -e
```
To run task every day:
```bash
0 1 * * * /home/pi/instagram/start.sh >> /home/pi/logs/insta_bot.log
```
Check that the task has been added:
```bash
crontab -l
```

## Links
Profile: https://www.instagram.com/bot_keklik/

Instagram-API (PHP): https://github.com/mgp25/Instagram-API

