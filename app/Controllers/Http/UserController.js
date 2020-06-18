'use strict'
const User = use('App/Models/User')
const Database = use('Database')

class UserController {

    async getLoggedInUser({auth, request, response}) {
       if (auth.user) {
           return auth.user
       }
    }

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

    // search for online users by name
    async searchOnline({auth, request}) {
        const q = request.qs.q
        if (auth.user) {
            try {
                const onlineSearch = await Database.from('users')
                    .innerJoin('onlines', 'users.id', 'onlines.user_id')
                    .where('users.fname', 'like', ` %${q}% `)
                    .orWhere('users.lname', 'like', ` %${q}% `)
                // const onlineSearch = await Database.raw(`select * from users where users.fname like " %${q}% " and where exists (select * from onlines where users.id = onlines.user_id and users.id != ${auth.user.id})`)
               console.log(onlineSearch)
               return onlineSearch
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
               const allOnline = await Database.raw(`select * from users where exists (select * from onlines where users.id = onlines.user_id and users.id != ${auth.user.id})`)
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
            //    console.log(allOffline[0])
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
