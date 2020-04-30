'use strict'

const User = use('App/Models/User')

class SocialController {

    async redirectf ({ ally }) {
        await ally.driver('facebook').redirect()
    }
    
    async redirectg ({ ally }) {
        await ally.driver('google').redirect()
    }

    
    async callbackf ({ ally, auth, response, session }) {
        
        const fUser = await ally.driver('facebook').getUser()

        // user details to be saved
        const userDetails = {
          fname: fUser.getName().split(' ').shift(),
          lname: fUser.getName().split(' ').pop(),
          email: fUser.getEmail(),
          profile_img: fUser.getAvatar(),
          password: '12345678',
          token: fUser.getAccessToken(),
          login_source: 'facebook'
        }

        // search for existing user
        const whereClause = {
          email: fUser.getEmail()
        }

        const user = await User.findOrCreate(whereClause, userDetails)

        console.log(user)

        try {
          await auth.login(user)
        } catch (error) {
          return ('login error ' + error)
        }
    
        session.flash({notification: 'logged in via Facebook'})
        return response.redirect('/home')
    }

    async callbackg ({ ally, auth }) {
        try {
          const gUser = await ally.driver('google').getUser()
    
          // user details to be saved
          const userDetails = {
            email: gUser.getEmail(),
            token: gUser.getAccessToken(),
            login_source: 'google'
          }
    
          // search for existing user
          const whereClause = {
            email: gUser.getEmail()
          }
    
          const user = await User.findOrCreate(whereClause, userDetails)
          await auth.login(user)
          
          session.flash({notification: 'logged in via Google'})
          return response.redirect('/home')
        } catch (error) {
          return 'Unable to authenticate. Try again later'
        }
    }
}

module.exports = SocialController