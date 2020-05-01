'use strict'
const Post = use('App/Models/Post')

class ApiController {

    async initialize({auth}) {
        try {
            const latestPosts = await Post.query().innerJoin('users', 'users.id', 'posts.user_id').orderBy('posts.created_at', 'desc').limit(10).fetch()
            return {
                userData: auth.user,
                postData: latestPosts
            }
        } catch (error) {
            console.log('api call failed')
            console.log(error)
        }
    }

    // async getPoster({auth})
}

module.exports = ApiController