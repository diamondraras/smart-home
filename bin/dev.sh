#!/bin/sh
concurrently "source api/bin/activate && hass --config ./configuration/"  "ng build" "nodemon ./bin/www" 