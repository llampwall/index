'use strict'

/*
|--------------------------------------------------------------------------
| Websocket
|--------------------------------------------------------------------------
|
| This file is used to register websocket channels and start the Ws server.
| Learn more about same in the official documentation.
| https://adonisjs.com/docs/websocket
|
| For middleware, do check `wsKernel.js` file.
|
*/

const Ws = use('Ws')
const Online = use('App/Models/Online')

Ws.channel('chat', 'ChatController').middleware('auth')

// this checks the active connections against the listed ones in the 
// onlines database, deleting dead ones.
setInterval(async () => {
    var d = Date.now()
    try {

    //   Ws._connections.forEach(con => {
    //     console.log(con.id)
    //   })

      var connections = [...Ws._connections].map((conn) => "chat#" + conn.id)
      // console.log(connections)
      const target = await Online.query()
              .whereNotIn('socket_id', connections)
              .delete()
      if(target > 0) {
          console.log(target + ' dead connections removed')
      }
      // console.log(Ws._connections)
    } catch (error) {
      console.log(error)
    }
}, 30000);


// kill connections after they expire (1 hour since last use)
// update this to notify the user and reconnect them if necessary
// setInterval(async function() {
//   var d = Date.now()
//   try {
//     const target = await Online.query()
//           .where('expires', '<', d)
//           .delete()
//     if(target > 0) {
//       console.log(target + ' expired connections removed')
//     }
//   } catch(error) {
//     console.log(error)
//   }
// }, 3600000);          // check every hour