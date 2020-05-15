'use strict'

const Database = use('Database')
const Post = use('App/Models/Post')
const Comment = use('App/Models/Comment')
const Like = use('App/Models/Like')
const Env = use('Env')
const aws = require('aws-sdk');
const Helpers = use('Helpers')
const Ws = use('Ws')

class PostController {

    async index() {

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

    // new post
    async store({request, response}) {

        let url = ''
        let file = ''
        if (request.input('img_name') != null) {
            file = request.input('img_name')
            url = `https://${Env.get('S3_BUCKET')}.s3.amazonaws.com/${file}`
        }

        // console.log(request.input('content'))
        // console.log(request.input('user_id'))
        // console.log(url)
        let pType = 'text'
        if (file.includes('mp4')) {
            pType = 'video'
        } else if (file.includes('jpg') || file.includes('png') || file.includes('webp')) {
            pType = 'image'
        }
        
        console.log(file)
        console.log(pType)
        console.log(url)
        // save post to db
        try {
            const newPost = await Post.create({
                content: request.input('content'),
                user_id: request.input('user_id'),
                image_url: url,
                type: pType
            })
        } catch (error) {
            console.log(error)
        }
        console.log('saved post');

        return response.redirect('/')
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
        // console.log(p_id)
        try {
            let likeData = await Like.query()
                .innerJoin('users', 'users.id', 'likes.user_id')
                .options({nestTables:true})
                .where('post_id', p_id).orderBy('likes.created_at', 'desc').fetch()
            likeData = likeData.toJSON()
            // console.log(likeData)
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
