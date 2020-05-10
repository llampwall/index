'use strict'

class PageController {

    async home ({response, request, view, auth}) {
        
        if (auth.user) {
            return view.render('pages/react')
        } else {
            return view.render('pages/welcome', {
                rand_int: Math.floor(Math.random()*10) + 1
            })
        } 

    }
}

module.exports = PageController
