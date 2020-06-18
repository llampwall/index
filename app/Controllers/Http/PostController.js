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

    // get data for a specific post
    async getPost({request, response}) {
        const { id } = request.params
        const post = await Post.query().where('posts.id', id).fetch()
        // console.log(post.data)
        return post
    }

    // get 20 posts paginated
    async postPage({request, response}) {
        const { num } = request.params
        // console.log(request.params)
        const results = await Database
            .from('posts')
            .orderBy('posts.created_at', 'desc')
            .paginate(num, 20)
        // console.log(results)
        return results
    }

    // get next 20 posts
    async nextPage({request, response}) {
        const start = parseInt(request.params.start)
        const q = request.qs.q

        if (q && q != "") {     // keyword search
            // console.log(q)
            try {
                const results = await Database
                    .from('posts')
                    .where('posts.content', 'like', ` %${q}% `)            // only 2 letters is working
                    .orderBy('posts.created_at', 'desc')
                    .offset(start)
                    .limit(20)
                console.log(results)
                return results
            } catch (error) {
                console.log(error)
            }   

        } else {                // no search term
            try {
                const results = await Database
                    .from('posts')
                    .orderBy('posts.created_at', 'desc')
                    .offset(start)
                    .limit(20)
                // console.log(results)
                return results
            } catch (error) {
                console.log(error)
            }        
        }
    }

    // get latest 5 posts by a user
    async getPostsBy({request, response}) {
        const { id } = request.params
        const results = await Database
            .from('posts')
            .where('posts.user_id', id)
            .orderBy('posts.created_at', 'desc')
            .limit(5)
        console.log(results)
        return results
    }

    // search posts by user name
    // async getPostsUserSearch({request, response}) {
    //     const query = request.params
    //     const results = await Database
    //         .from('posts')
    //         .innerJoin('users', 'users.id', 'posts.user_id')
    //         .options({nestTables:true})
    //         .where('users.fname', 'like', ` %${q} `)
    //         .orWhere('users.lname', 'like', ` %${q} `)
    //         .orderBy('posts.created_at', 'desc')
    //     console.log(results)
    //     return results
    // }


    // get all new posts 
    async getNewPosts({request, response}) {
        const { id } = request.params
        const results = await Database
            .from('posts')
            .where('posts.id', '>', id)
            .orderBy('posts.created_at', 'desc')
        console.log(results)
        return results
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
        // console.log(fileName)
        // console.log(fileType)
        const s3Params = {
            Bucket: S3_BUCKET,
            Key: fileName,
            Expires: 60,
            ContentType: fileType,
            ACL: 'public-read'
        }
        // console.log(fileType)
        return await s3.getSignedUrlPromise('putObject', s3Params)
    }

    // new post
    async store({request, response}) {

        let url = ''
        let file = ''
        let link_u = ''
        let link_t = ''
        let link_i = ''
        let link_d = ''

        if (request.input('img_name') != null) {
            file = request.input('img_name')
            url = `https://${Env.get('S3_BUCKET')}.s3.amazonaws.com/${file}`
        }

        if (request.input('link_url') != null) {
            link_u = request.input('link_url')
            link_t = request.input('link_title')
            link_i = request.input('link_image')
            link_d = request.input('link_desc')
        }

        // console.log(link_u)
        // console.log(link_t)
        // console.log(link_i)
        // console.log(link_d)

        // console.log(request.input('content'))
        // console.log(request.input('user_id'))
        // console.log(url)
        let pType = 'text'
        if (file.toLocaleLowerCase().includes('mp4') || file.toLocaleLowerCase().includes('mov') || file.toLocaleLowerCase().includes('m4v') || file.toLocaleLowerCase().includes('webm') || file.toLocaleLowerCase().includes('ogg')) {
            pType = 'video'
        } else if (file.toLocaleLowerCase().includes('jpg') || file.toLocaleLowerCase().includes('jpeg') || file.toLocaleLowerCase().includes('gif') || file.toLocaleLowerCase().includes('png') || file.toLocaleLowerCase().includes('webp')) {
            pType = 'image'
        }
        
        // console.log(file)
        // console.log(pType)
        // console.log(url)
        
        // remove extra spaces and newlines
        let content = request.input('content').trim()
        content = content.replace(/(\r\n|\n|\r)/gm,"")
        console.log(content)

        // save post to db
        try {
            const newPost = await Post.create({
                content: content,
                user_id: request.input('user_id'),
                image_url: url,
                type: pType,
                link_url: link_u,
                link_title: link_t,
                link_img: link_i,
                link_desc: link_d
            })

            // this will ensure updates happen for others even if you arent connected to websockets
            const topic = Ws.getChannel('chat').topic('chat')
            if (topic){
                topic.broadcastToAll('update', 'refresh')
            } else {
                console.log('no topic')
            }

        } catch (error) {
            console.log(error)
        }

        console.log('saved post');

        return response.redirect('/')
    }

    // delete post
    async destroy({request, response}) {
        console.log(request.params)
        const { id } = request.params
        console.log("deleting: " + id)
        try {
            const affectedRows = await Database.table('posts').where('id', id).delete()
            if (affectedRows < 1) {
                console.log('delete failed')
            } else {
                console.log("done") 
                return affectedRows
            }
        } catch {
            console.log("error destroying post: " + error)
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
