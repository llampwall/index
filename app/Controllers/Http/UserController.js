'use strict'
const User = use('App/Models/User')
const Database = use('Database')

class UserController {
    async profile({auth, request, response}) {
        if (auth.user) {
            try {
                const user = await User.query().where('id', request.params.id).fetch()
                return user.toJSON()
            } catch (error) {
                console.log(error)
            }
        } else {
            return "LOGIN"
        }
    }

    async getAll({auth, request}) {
        if (auth.user) {
            try {
               const allUsers = await Database.table('users').select('*')
               console.log(allUsers)
               return allUsers
            } catch (error) {
                console.log(error)
            }
        } else {
            return "LOGIN"
        }
    }
}

module.exports = UserController
