'use strict'
const User = use('App/Models/User')

class UserController {
    async profile({auth, request, response}) {
        try {
            const user = await User.query().where('id', 1).fetch()
            return user.toJSON()
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = UserController
