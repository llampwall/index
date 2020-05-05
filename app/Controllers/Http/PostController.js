'use strict'
const Post = use('App/Models/Post')
const Comment = use('App/Models/Comment')
const Helpers = use('Helpers')
const Database = use('Database')

class PostController {

    async index() {

    }

    // new post
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
                    pImg = 'http://localhost:3000/public/img/posts/' + imgName
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

    // get all comments for a specific post
    async comments({ request, response }) {
        // console.log(request.params)
        const p_id = request.params.id
        // console.log(p_id)
        try {
            const commentData = await Comment.query()
                .innerJoin('users', 'users.id', 'comments.user_id')
                .options({nestTables:true})
                .where('post_id', p_id).orderBy('comments.created_at', 'desc').fetch()
            console.log(commentData)
            return {
                commentData
            }

        } catch (error) {
            console.log('api call failed')
            console.log(error)
        }
    }

    // submit a comment to a post
    async makeComment({request, response}) {
        try {
            const newComment = await Comment.create({
                content: request.input('content'),
                post_id: request.input('post_id'),
                user_id: request.input('user_id')
            })
            console.log('saved comment');
            return response.redirect('/')
        } catch (error) {
            console.log(error)
        }
    }

    async update() {
        return request.post()
    }

    async destroy({request}) {
        console.log(request.params)
        const { id } = request.params
        console.log("deleting: " + id)
        try {
            const target = await Post.query().where('id', id).delete()
        } catch {
            console.log("error destroying post: " + error)
        }
        console.log("done")
        return "destroyed"
    }

}

module.exports = PostController
