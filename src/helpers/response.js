buildResponse = (res, st, mess) => res.status(st).json(mess)

module.exports = {buildResponse}