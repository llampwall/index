'use strict'
const Post = use('App/Models/Post')

class PostController {

    async index() {

    }

    async store({auth, request, response}) {
        try {
            console.log(request)
            const newPost = await Post.create({
                content: request.input('content'),
                user_id: request.input('user_id'),
                image_url: request.input('image_url'),
                type: request.input('type')
            })
            console.log('saved post');
            return response.redirect('/')
        } catch (error) {
            console.log('error saving post')
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
