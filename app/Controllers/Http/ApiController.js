'use strict'
const Post = use('App/Models/Post')
const Database = use('Database')

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
            .orderBy('posts.created_at', 'desc').limit(20).fetch()
            return {
                userData: auth.user,
                postData: latestPosts
            }
        } catch (error) {
            console.log('api call failed')
            console.log(error)
        }
    }

    async getConvo( { request, response } ) {
        const { from, to }= request._qs
        // console.log(from)
        
        const myMessages = await Database.table('messages').select('*').where('sender_id', from).andWhere('receiver_id', to)
        const theirMessages = await Database.table('messages').select('*').where('sender_id', to).andWhere('receiver_id', from)
        const messages = myMessages.concat(theirMessages)
        console.log(messages)
    }
}

module.exports = ApiController