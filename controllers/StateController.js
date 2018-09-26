const request = require('request-promise');
const _ = require('underscore');

const getStates = async function (req, res) {
    const getStatesOptions = {
        url: 'http://localhost:8123/api/states',
        headers: {
            'x-ha-access': '1234'
        }
    };

    request(getStatesOptions)
        .then((response) => {
            let devicesList = JSON.parse(response)
                .filter(device => !device.entity_id.includes("group."))
                .map((device, index) => {
                    return {
                        id: index + 1,
                        name: device.entity_id,
                        state: device.entity_id.includes("door") ?
                            (device.state === 'off' ? 'open' : 'closed') : device.state,
                        type: device.entity_id.includes("door") ? 'door' : 'light'
                    }
                });

            request(getStatesOptions)
                .then((body) => {
                    const states = Array.from(JSON.parse(body));
                    let chambers = states
                        .filter(state => state.entity_id.includes("group.") && !state.entity_id.includes("group.all_switches"))
                        .map(state => {
                            const currentDevicesList = state.attributes.entity_id;
                            return {
                                id: state.attributes.order + 1,
                                name: state.attributes.friendly_name,
                                devices: devicesList.filter(device => currentDevicesList.indexOf(device.name) > -1)
                            };
                        });
                    return ReS(res, [ ...chambers ]);
                })
                .catch(error => {
                    return ReE(res, { message: error });
                });

        })
        .catch(error => {
            return ReE(res, { message: error });
        });


}
module.exports.getStates = getStates;

const getMainDoorState = async function (req, res) {
    options = {
        url: 'http://localhost:8123/api/states',
        headers: {
            'x-ha-access': '1234'
        }
    };

    request(options)
    .then((response) => {
        const devices = JSON.parse(response);
        const mainDoor = devices
        .find(device => device.entity_id == "switch.door_maindoor");
        const state = {
            id: 0,
            type: 'door',
            state: mainDoor.state == 'off' ? 'open' : 'closed',
            name: mainDoor.entity_id
        };
        return ReS(res, { ...state });
    })
    .catch((error) => {
        return ReE(res, { message: error }); 
    });
}
module.exports.getMainDoorState = getMainDoorState;