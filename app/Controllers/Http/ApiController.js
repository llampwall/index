'use strict'
const Post = use('App/Models/Post')

class ApiController {

    async initialize({auth}) {
        try {
            // get the latest 10 posts with all of the user data.
            // tables are nested so that we can avoid a conflict
            // with "id" columns. nesting makes it return the two
            // tables separately, so latestPosts.posts is the posts
            // table Data, and latestPosts.users is the user table data
            const latestPosts = await Post.query()
            .innerJoin('users', 'users.id', 'posts.user_id')
            .options({nestTables:true})
            .orderBy('posts.created_at', 'desc').limit(10).fetch()
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