'use strict'
const Post = use('App/Models/Post')
const Helpers = use('Helpers')

class PostController {

    async index() {

    }

    async store({request, response}) {
        let imgFile = {}
        let pImg = ''
        try {
            imgFile = request.file('image', {
                types: ['image'],
                size: '5mb'
            })
        } catch(error) {
            console.log(error)
        }

        if (imgFile != null) {
            console.log(imgFile)
            try {
                const imgName = request.input('user_id') + `${Date.now()}.jpg`
                await imgFile.move(Helpers.publicPath('img/posts'), {
                    name: imgName,
                    overwrite: true
                })

                if (!imgFile.moved()) {
                    console.log(imgFile.error())
                } else {
                    pImg = '/public/img/posts/' + imgName
                    console.log(imgName)
                }
            } catch (error) {
                console.log('error uploading image')
            }
        }

        const pType = (pImg.length > 0) ? 'image' : 'text' 
        try {
            const newPost = await Post.create({
                content: request.input('content'),
                user_id: request.input('user_id'),
                image_url: pImg,
                type: pType
            })
            console.log('saved post');
            return response.redirect('/')
        } catch (error) {
            console.log(error)
        }
    }

    async update() {
        return request.post()
    }

    async destroy() {
        return 'detroyed'
    }
}

module.exports = PostController
