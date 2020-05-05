'use strict'

const Database = use('Database')
const Post = use('App/Models/Post')
const Comment = use('App/Models/Comment')
const Like = use('App/Models/Like')
const Helpers = use('Helpers')

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

    // delete post
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
            // console.log(commentData)
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

    // delete comment
    async destroyComment({request}) {
        console.log(request.params)
        const { id } = request.params
        console.log("deleting comment: " + id)
        try {
            const target = await Comment.query().where('id', id).delete()
        } catch {
            console.log("error destroying comment: " + error)
        }
        console.log("done")
        return "destroyed"
    }

    async likes({request, response}) {
        // console.log(request.params)
        const p_id = request.params.id
        console.log(p_id)
        try {
            let likeData = await Like.query()
                .innerJoin('users', 'users.id', 'likes.user_id')
                .options({nestTables:true})
                .where('post_id', p_id).orderBy('likes.created_at', 'desc').fetch()
            likeData = likeData.toJSON()
            console.log(likeData)
            return {
                likeData
            }

        } catch (error) {
            console.log('api call failed')
            console.log(error)
        }
    }

    // like a post
    async likePost({request, response}) {
        console.log("liking post: " + request.input('post_id'))
        try {
            const newLike = await Like.create({
                user_id: request.input('user_id'),
                post_id: request.input('post_id'),
                comment_id: null
            })
        } catch (error) {
            console.log(error)
        }
    }

    // unlike a post
    async unlikePost({request}) {
        console.log("unliking post: " + request.input('post_id'))
        try {
            const query = `delete from likes where user_id = ${request.input('user_id')} and post_id = ${request.input('post_id')}`
            const target = await Database.raw(query)
        } catch (error) {
            console.log(error)
        }
        console.log('unliked post')
    }

    async update() {
        return request.post()
    }

}

module.exports = PostController
