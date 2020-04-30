'use strict'

class ApiController {

    async initialize({auth}) {
        return auth.user
    }
}

module.exports = ApiController
