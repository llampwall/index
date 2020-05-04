'use strict'

const { validate, sanitize } = use('Validator')
const Hash = use('Hash')
const User = use('App/Models/User')
const Helpers = use('Helpers')

class AuthController {

    async register ({response, request, view}) {
        return view.render('auth/register')
    }

    async storeUser ({ request, session, response, auth }) {

        const rules = {
            fname: 'required', // THIS BREAKS IT FOR SOME REASON
            email: 'required|email|unique:users,email',
            profile_pic_upload: 'file|file_size:5mb|file_types:image',
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
            let uImg = '/img/user.jpg'

            if (request.input('profile_pic_upload') != null) {
                console.log('image exists')
                const imgFile = request.file('profile_pic_upload', {
                    types: ['image'],
                    size: '5mb'
                })
                console.log('passed first reqs')
                const imgName = request.input('fname') + request.input('lname') + '_profile.jpg'
                await imgFile.move(Helpers.publicPath('img/users'), {
                    name: imgName,
                    overwrite: true
                })
                if (!imgFile.moved()) {
                    console.log(imgFile.error())
                } else {
                    uImg = 'http://localhost:3000/public/img/users/' + imgName
                    console.log(imgName)
                }
            } else {
                console.log('no image')
                console.log(uImg)
            }

            let newUser = await User.create({
                fname: request.input('fname'),
                lname: request.input('lname'),
                email: request.input('email'),
                profile_img: uImg,
                login_source: 'email',
                password: request.input('password')
            })
            await auth.login(newUser)
            console.log('logged in')

        } catch(error) {
            session
            .withErrors([
                {field: 'database', message: "error adding user to database"}
            ])
            .flashExcept(['password'])

            return response.redirect('back')
        }

        session.flash({notification: 'registered'})
        return response.redirect('/')
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
                return response.redirect('/')
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
