'use strict'

const { validate, sanitize } = use('Validator')
const Hash = use('Hash')
const User = use('App/Models/User')
const Helpers = use('Helpers')
const Env = use('Env')

class AuthController {

    async register ({response, request, view}) {
        return view.render('auth/register')
    }

    // get and return a signed aws url for image uploading
    async getUrl({request, response}) {

        console.log(request.params)
        // prepare aws
        aws.config.region = 'us-west-1'
        const S3_BUCKET = Env.get('S3_BUCKET')
        const s3 = new aws.S3()
        const fileName = request.params.filename
        const fileType = decodeURIComponent(request.params.type)
        console.log(fileName)
        console.log(fileType)
        const s3Params = {
            Bucket: S3_BUCKET,
            Key: fileName,
            Expires: 60,
            ContentType: fileType,
            ACL: 'public-read'
        }
        console.log(fileType)
        return await s3.getSignedUrlPromise('putObject', s3Params)
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

            // console.log(request.input('profile_pic'))
            let uImg = '/img/user.jpg'
            if (request.input('profile_pic') != undefined) {
                uImg = request.input('profile_pic')
            }

            const imgFile = request.file('profile_pic_upload', {
                types: ['image'],
                size: '5mb'
            })
            const imgName = request.input('fname') + request.input('lname') + '_profile.jpg'
            await imgFile.move(Helpers.publicPath('img/users'), {
                name: imgName,
                overwrite: true
            })

            if (!imgFile.moved()) {
                console.log(imgFile.error())
            } else {
                uImg = `${Env.get('APP_URL')}/public/img/users/` + imgName
                console.log(imgName)
            }

            let first = 'somebody'
            if (request.input('fname') != null) {
                first = request.input('fname')
            }

            let last = ""
            if (request.input('lname') != null) {
                last = request.input('lname')
            }

            let newUser = await User.create({
                fname: first,
                lname: last,
                email: request.input('email'),
                profile_img: uImg,
                login_source: 'email',
                info: '',
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