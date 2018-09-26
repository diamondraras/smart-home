const Entry = require('../models').Entry;
const Passing = require('../models').Passing;

const getEntry = async function (req, res) {
    [error, result] = await to(Entry.find({}));
    if (error) return ReE(res, { message: error });
    else return ReS(res, [ ...result ]);
}
module.exports.getEntry = getEntry;

const getPassing = async function (req, res) {
    [error, result] = await to(Passing.find({}));
    if (error) return ReE(res, { message: error });
    else return ReS(res, [ ...result ]);
}
module.exports.getPassing = getPassing;