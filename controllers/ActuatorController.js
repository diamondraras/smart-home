const request = require('request');

const BASE_URL = 'http://127.0.0.1:8123/api';
const HA_ACCESS = 1234

const switchOn = function(req, res){
    let state= req.state;
    let entity_id= req.entity_id;

    var options = {
        method: 'POST',
        url: BASE_URL+'/switch/turn_on',
        headers: {
          'x-ha-access': HA_ACCESS,
          'Content-Type': 'application/json',
          'entity.id': entity_id
        }
      };

      request(options, (error, response, body) => {
        console.log(response);
      })
}

module.exports.switchOn = switchOn;