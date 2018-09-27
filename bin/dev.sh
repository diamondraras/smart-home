#!/bin/sh
concurrently "source api/bin/activate && hass --config ./configuration/"  "ng serve --host=0.0.0.0" "nodemon ./bin/www" 