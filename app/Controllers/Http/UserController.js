'use strict'
const User = use('App/Models/User')
const Database = use('Database')

class UserController {

    async getLoggedInUser({auth, request, response}) {
        if (auth.user) {
            // console.log("hello")
           return auth.user
        } else {
            response.unauthorized('Login First')
        }
    }

    async profile({auth, request, response}) {
        if (auth.user) {
            // console.log(request)
            try {
                const user = await User.query().where('id', request.params.id).fetch()
                return user.toJSON()
            } catch (error) {
                console.log(error)
            }
        } else {
            response.unauthorized('Login First')
        }
    }

    async getAll({auth, request, response}) {
        if (auth.user) {
            // console.log("hello")
            try {
               const allUsers = await Database.table('users').select('*')
            //    console.log(allUsers)
               return allUsers
            } catch (error) {
                console.log(error)
            }
        } else {
            response.unauthorized('Login First')
        }
    }

    // search for online users by name
    async searchOnline({auth, request, response}) {

        const q = request.qs.q
        // console.log(q)
        if (auth.user) {
            try {                                 
                const onlineSearch = await Database.select('users.*').from('users')
                    .innerJoin('onlines', 'users.id', 'onlines.user_id')
                    .whereNot('users.id', auth.user.id)
                    .whereRaw(`concat(users.fname, " ", users.lname) like "%${q}%"`)
                    .groupBy('users.id')
            //    console.log(onlineSearch)
               response.send(onlineSearch)
            } catch (error) {
                console.log(error)
            }
        } else {
            response.unauthorized('Login First')
        }
    }

    async getAllOnline({auth, request, response}) {
        if (auth.user) {
            try {
               const allOnline = await Database.raw(`select * from users where exists (select * from onlines where users.id = onlines.user_id and users.id != ${auth.user.id})`)
            //    console.log(allOnline[0])
               return allOnline[0]
            } catch (error) {
                console.log(error)
            }
        } else {
            response.unauthorized('Login First')
        }
    }

    async getAllOffline({auth, request, response}) {
        if (auth.user) {
            try {
               const allOffline = await Database.raw('select * from users where not exists (select * from onlines where users.id = onlines.user_id)')
            //    console.log(allOffline[0])
               return allOffline[0]
            } catch (error) {
                console.log(error)
            }
        } else {
            response.unauthorized('Login First')
        }
    }

}

module.exports = UserController
