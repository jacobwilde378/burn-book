const moment = require('moment')

function dateFormater(inputDate) {

    return moment(inputDate).format("YYYY-MM-DD")

}

module.exports = dateFormater