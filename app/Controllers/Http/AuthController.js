'use strict'

const { validate } = use('Validator')
const Hash = use('Hash')
const User = use('App/Models/User')
const Helpers = use('Helpers')
const Env = use('Env')
const Drive = use('Drive')

class AuthController {

    async register ({response, request, view}) {
        return view.render('auth/register')
    }

    // get and return a signed aws url for image uploading
    async getUrl(fileName, fileType) {
        // prepare aws
        const s3Params = {
            Key: fileName,
            ContentType: fileType,
            ACL: 'public-read'
        }
        // get url
        return await Drive.disk('s3').getSignedUrl(filename, s3Params)
    }

    async storeUser ({ request, session, response, auth }) {

        console.log(request.body)

        const rules = {
            email: 'required|email|unique:users,email',
            password: 'required|min:8|max:32',
            confirm: 'required'
        }

        let first, last, email, img, pw, url


        // validate input
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

        // 
        try {

            first = 'somebody'
            if (request.input('fname') != null) {
                first = request.input('fname')
            }

            last = ""
            if (request.input('lname') != null) {
                last = request.input('lname')
            }

            email = request.input('email')
            img = request.input('image_name')
            pw = request.input('password')

        } catch(error) {
            session
            .withErrors([
                {field: 'database', message: "error getting input fields"}
            ])
            .flashExcept(['password'])

            return response.redirect('back')
        }

        url = img ? `https://${Env.get('S3_BUCKET')}.s3.amazonaws.com/${img}` : '/img/user.jpg'

        console.log(first)
        console.log(last)
        console.log(email)
        console.log(img)
        console.log(pw)
        console.log(url)

        // save new user
        try {
            let newUser = await User.create({
                fname: first,
                lname: last,
                email: email,
                profile_img: url,
                login_source: 'register',
                info: '',
                password: pw
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