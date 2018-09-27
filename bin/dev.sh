#!/bin/sh
source api/bin/activate
concurrently "hass --config ./configuration/"  "ng serve --host=0.0.0.0" "node ./bin/www" 