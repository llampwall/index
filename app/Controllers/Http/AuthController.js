'use strict'

const { validate, sanitize } = use('Validator')
const Hash = use('Hash')
const User = use('App/Models/User')

class AuthController {

    async register ({response, request, view}) {
        return view.render('auth/register')
    }

    async storeUser ({ request, session, response, auth }) {

        const rules = {
            email: 'required|email|unique:users,email',
            password: 'required|min:8|max:32',
            confirm: 'required'
        }

        try {
            const validation = await validate(request.all(), rules)

            if (request.input('password') != request.input('confirm')) {
                session
                .withErrors([
                    {field: 'password', message: "passwords don't match"},
                    {field: 'confirm', message: "passwords don't match"}
                ])
                .flashExcept(['password'])
    
                return response.redirect('back')
            }
    
            if (validation.fails()) {
                session
                .withErrors(validation.messages())
                .flashExcept(['password'])
    
                return response.redirect('back')
            }

        } catch(error) {
            return 'error validating user input'
        }

        try {
            let newUser = await User.create({
                fname: request.input('fname'),
                lname: request.input('lname'),
                email: request.input('email'),
                password: request.input('password')
            })
            await auth.login(newUser)
        } catch(error) {
            session
            .withErrors([
                {field: 'database', message: "error adding user to database"}
            ])
            .flashExcept(['password'])

            return response.redirect('back')
        }

        session.flash({notification: 'registered'})
        return response.redirect('/home')
    }

    async login ({response, request, view}) {
        return view.render('auth/login')
    }

    async loginUser ({response, request, view, auth, session}) {
        
        const postData = request.post()
        const user = await User.query().where('email', postData.email).first()

        if (user) {
            const passwordVerified = await Hash.verify(postData.password, user.password)
            if (passwordVerified) {
                await auth.login(user)
                session.flash({notification: 'logged in'})
                return response.redirect('/home')
            } else {
                session
                .withErrors([
                    {field: 'email', message: "incorrect password"},
                ])
                .flashExcept(['password'])
    
                return response.redirect('back')
            }
        } else {
            session
            .withErrors([
                {field: 'password', message: "user not found"},
            ])
            .flashExcept(['password'])

            return response.redirect('back')
        }
    }

    async forgot ({response, request, view}) {
        return view.render('auth/forgot')
    }

    async logout ({response, request, view, auth}) {
        try {
            await auth.logout()
            return response.redirect('/')
        } catch (error) {
            console.log(error)
            return 'error - failed to log out'
        }
    }

    
}

module.exports = AuthController
