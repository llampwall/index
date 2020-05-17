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

    async getAllOnline({auth, request}) {
        if (auth.user) {
            try {
               const allOnline = await Database.raw('select * from users where exists (select * from onlines where users.id = onlines.user_id)')
            //    console.log(allOnline[0])
               return allOnline[0]
            } catch (error) {
                console.log(error)
            }
        } else {
            return "LOGIN"
        }
    }

    async getAllOffline({auth, request}) {
        if (auth.user) {
            try {
               const allOffline = await Database.raw('select * from users where not exists (select * from onlines where users.id = onlines.user_id)')
               console.log(allOffline[0])
               return allOffline[0]
            } catch (error) {
                console.log(error)
            }
        } else {
            return "LOGIN"
        }
    }

}

module.exports = UserController
