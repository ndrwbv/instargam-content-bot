#!/bin/bash
[ ! -d "img" ] &&  echo 'Creating img' && mkdir img
[ ! -d "resources" ] && echo 'Creating resources' && mkdir resources
[ ! -d "logs" ] &&  echo 'Creating logs' && mkdir logs
[ ! -d "node_modules" ] && npm install
[ ! -d "vendor" ] && composer require mgp25/instagram-php
if [ ! -f php/config.php ]; then
    echo 'Creating Instagram config in php/config.php..'
    read -p 'Instagram username: ' uservar
    read -sp 'Password: ' passvar
    touch php/config.php
    echo "<?php
    return [
    'username' => '$uservar',
    'password' =>  '$passvar'
  ];" >> php/config.php
  echo "Installation finished."
fi
