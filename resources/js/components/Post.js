import React, { Component} from 'react'
import Comments from "./Comments"
import axios from 'axios'
import Modal from './Modal'
import * as Vibrant from 'node-vibrant'

export default class Post extends Component {
  constructor () {
    super()
    this.state = { 
        post: {},
        user: {}, 
        comment: "",
        numComments: 0,
        liked: false, 
        likes: 0,
        lastLike: "",
        link: false,
        showModal: false
    }
    
    this.commentArea = React.createRef()  // ref for updating comments
    this._isMounted = false
  }


  componentDidMount() {
    const self = this

    this._isMounted = true

    this._isMounted && this.getPoster()
    this._isMounted && this.getLikes()

    this._isMounted && this.props.post.type == 'image' && this.getColor()

    if (this._isMounted && this.props.post.link_url != '') {
      this.setState({
        link: true
      })
    }

    // chat setup
    this.chat = this.props.ws.getSubscription('chat') || this.props.ws.subscribe('chat')
    // update comments whenever someone comments
    this.chat.on('comments', function() {
      console.log('new comment')
      if (self.commentArea.current) {
        self.commentArea.current.getComments()
      }
    })
    this.chat.on('likes', function() {
      console.log('new likes')
      self.getLikes()
    })

  }

  componentWillUnmount() {
    this._isMounted = false
  }

  // get the user data for the person who posted this post
  getPoster = async () => {
    let user = ''
    try {
      user = await axios.get(`/api/user/${this.props.post.user_id}`)
      // console.log(user)
    } catch(error) {
      console.log(error)
    }

    if (this._isMounted) {
      this.setState({
        user: user.data[0],
      })
    }
  }

  displayMedia = () => {
    if (this.props.post.type == 'image') {
        return (
            <img className="post-media" 
              id={`pm${this.props.post.id}`} 
              crossOrigin="Anonymous"
              src={this.props.post.image_url}
              onClick={() => {this.setState({showModal: true})}}
            >
            </img>
        )
    } else if (this.props.post.type == 'video') {
        return (
            <video className="post-media" controls muted autoPlay playsInline>
              <source src={this.props.post.image_url} type='video/mp4'/>
              Your browser does not support html5 videos.
            </video>
        )
    } else {
      return null
    }
  }

  // pulls color data from the image in the post and sets box shadow
  getColor = () => {
    var img = document.getElementById(`pm${this.props.post.id}`)
    const v = Vibrant.from(img)
    v.getPalette().then((palette) => {
      var post = document.getElementById(`post${this.props.post.id}`)
      // console.log(palette.Vibrant.hex)
      var dark = this.pSBC( -.6, palette.DarkMuted.hex)                 // get 20% darker/lighter version of swatch
      var light = this.pSBC( -.5, palette.Vibrant.hex)
      dark = this.pSBC( 0, dark, "c", true )                              // convert to rgb
      light = this.pSBC( 0, light, "c", true )

      // var darka = "rgba" + dark.substr(3, dark.length-4) + ",.4)"      // convert to rgba with 50% opacity
      // var lighta = "rgba" + light.substr(3, light.length-4) + ",.4)"
      // var bs = `0px 0px 5px 10px ${lighta}`
      // post.style.boxShadow = bs

      var bc = `linear-gradient(145deg, ${dark}, ${light})`
      post.style.background = bc

      post.style.border = `2px solid ${light}`
    })
  }

  // color utility function for lightening/darkening/converting
  pSBC = (p,c0,c1,l) => {
    let r,g,b,P,f,t,h,i=parseInt,m=Math.round,a=typeof(c1)=="string";
    if(typeof(p)!="number"||p<-1||p>1||typeof(c0)!="string"||(c0[0]!='r'&&c0[0]!='#')||(c1&&!a))return null;
    if(!this.pSBCr)this.pSBCr=(d)=>{
        let n=d.length,x={};
        if(n>9){
            [r,g,b,a]=d=d.split(","),n=d.length;
            if(n<3||n>4)return null;
            x.r=i(r[3]=="a"?r.slice(5):r.slice(4)),x.g=i(g),x.b=i(b),x.a=a?parseFloat(a):-1
        }else{
            if(n==8||n==6||n<4)return null;
            if(n<6)d="#"+d[1]+d[1]+d[2]+d[2]+d[3]+d[3]+(n>4?d[4]+d[4]:"");
            d=i(d.slice(1),16);
            if(n==9||n==5)x.r=d>>24&255,x.g=d>>16&255,x.b=d>>8&255,x.a=m((d&255)/0.255)/1000;
            else x.r=d>>16,x.g=d>>8&255,x.b=d&255,x.a=-1
        }return x};
    h=c0.length>9,h=a?c1.length>9?true:c1=="c"?!h:false:h,f=this.pSBCr(c0),P=p<0,t=c1&&c1!="c"?this.pSBCr(c1):P?{r:0,g:0,b:0,a:-1}:{r:255,g:255,b:255,a:-1},p=P?p*-1:p,P=1-p;
    if(!f||!t)return null;
    if(l)r=m(P*f.r+p*t.r),g=m(P*f.g+p*t.g),b=m(P*f.b+p*t.b);
    else r=m((P*f.r**2+p*t.r**2)**0.5),g=m((P*f.g**2+p*t.g**2)**0.5),b=m((P*f.b**2+p*t.b**2)**0.5);
    a=f.a,t=t.a,f=a>=0||t>=0,a=f?a<0?t:t<0?a:a*P+t*p:0;
    if(h)return"rgb"+(f?"a(":"(")+r+","+g+","+b+(f?","+m(a*1000)/1000:"")+")";
    else return"#"+(4294967296+r*16777216+g*65536+b*256+(f?m(a*255):0)).toString(16).slice(1,f?undefined:-2)
  }

  // dont really need this because we are just lying and saying its mp4 anyway
  // because it wont work on chrome if we call it a quicktime file
  getFileType = (filename) => {
    let ext = filename.split('.').pop();
    if (ext == 'mov' || ext == 'MOV') {
      return 'video/quicktime'
    }
    if (ext == 'mp4') {
      return 'video/mp4'
    }
  }

  handleChange = (event) => {
    const name = event.target.name
    const value = (event.target.type == 'checkbox') ? event.target.checked : event.target.value

    this.setState({
      [name]: value
    }, () => {
      // console.log(this.state)
    })
  }

  submitComment = async () => {
      const self = this
      if (this.state.comment.length > 0) {
          try {
            const response = await axios.post('/comments', {
              post_id: self.props.post.id,
              user_id: self.props.curuser.id,
              content: self.state.comment
            }).then (function(response) {
              self.setState({
                ...self.state,
                comment: "",
                height: self.state.height + 35
              })

              //update everyone else's comments
              self.chat.emit('message', {
                comments: 'all'
              })
            
              self.commentArea.current.getComments()
              return 'comment saved'
            })
          } catch (error) {
            console.log("axios didnt work: " + error)
          }
      }
  }

  // fix to avoid double submits on mobile
  touchSubmitComment = (event) => {
    // event.preventDefault()
    event.stopPropagation()
    this.submitComment()
  }

  // this lets us get the comments from the child
  sendUp = (num) => {
    if (this._isMounted) {
      this.setState({
        numComments: num
      })
    }
  }

  // allows comments to be submitted with the enter key
  checkSubmit = (event) => {

    if (event.keyCode == 13) {
      event.preventDefault()
      this.submitComment()
    }
  }

  // delete the post only if you posted it
  deletePost = async () => {
    const self = this
    // console.log("post id: " + self.props.post.id)
    try {
      let deleted = await axios.get(`/posts/${self.props.post.id}/delete`)
        .then(function(response) {
          console.log(response)
          // self.props.removePost(self.props.post.id)
          // //update everyone else's comments
          // self.chat.emit('message', {
          //   delete: self.props.post.id
          // })
        })
    } catch (error) {
      console.log('error deleting post: ' + error)
    }
    self.props.removePost(self.props.post.id)
    //update everyone else's comments
    self.chat.emit('message', {
      delete: self.props.post.id
    })
}


  // displays the current post comments
  getCommentCount = () => {
    if (this.state.numComments == 0) {
      return (
        <div className="comment-count"></div>
      )
    } else {
      return (
        <div className="comment-count">{this.state.numComments} comments</div>
      )
    }
  }
 
  // like or unlike a post
  like = async (u_id, p_id) => {
    const self = this
    if (!this.state.liked) {
      try {
        await axios.post('/likes', {
          user_id: u_id,
          post_id: p_id
        }).then(function() {
          console.log('post liked')
        })
      } catch (error) {
        console.log("error liking post: " + error)
      }
    } else {
      try {
        await axios.post('/likes/delete', {
          user_id: u_id,
          post_id: p_id
        })
      } catch (error) {
        console.log("error liking post: " + error)
      }
    }
    // this.setState({
    //   ...this.state,
    //   liked: !this.state.liked
    // })
    this.getLikes()
    //update everyone elses feed
    self.chat.emit('message', {
      likes: 'all'
    })
  }


  // get the like stats
  getLikes = async () => {
    const self = this;
    try {
      axios.get(`/posts/${self.props.post.id}/likes`)
      .then(function(response) {
        // console.log(response.data.likeData)
        const like_d = response.data.likeData
        const numLikes = like_d.length
        let last = ""
        let newLiked
        if (like_d.length > 0) {
          newLiked = (like_d.filter(item => item.users.id == self.props.curuser.id)).length > 0
          // console.log(like_d[0].users)
          last = (like_d[0].users.id == self.props.curuser.id) ? "You" : `${like_d[0].users.fname} ${like_d[0].users.lname}`
        }

        if (self._isMounted) {
          self.setState({
            likes: numLikes,
            lastLike: last,
            liked: newLiked
          })
        }
      })
      
    } catch (error) {
      console.log("error getting likes: " + error)
    }
  }

  deleteComment = () => {
    // console.log('deleting comment')
    this.chat.emit('message', {
      comments: 'all'
    })
  }


  // display the post stats
  displayStats = () => {
    
    if (this.state.liked) {
      if (this.state.likes > 2) {
        return `You and ${this.state.likes - 1} other people like this.`
      } else if (this.state.likes == 2) {
        return `You and 1 other person like this.`
      } else {
        return `You like this.`
      }
    } else {
      if (this.state.likes > 2) {
        return `${this.state.lastLike} and ${this.state.likes - 1} other people like this.`
      } else if (this.state.likes == 2) {
        return `${this.state.lastLike} and 1 other person like this.`
      } else if (this.state.likes == 1) {
        return `${this.state.lastLike} likes this.`
      } else {
        return `Be the first to like this.`
      }
    }
  }

  getType = () => {
    if (this.props.post.type == 'image') {
      return 'an image'
    } else if (this.props.post.type == 'video') {
      return 'a video'
    }
    else {
      return 'something'
    }
  }

  // display link area if there is a link
  displayLink = () => {
    if (!this.state.link) {
      return
    }
    return (
      <a href={this.props.post.link_url} target="_blank" alt="external link" className='post-link'>
        <div className='link-image'>
          <img src={this.props.post.link_img} alt="no image"/>
        </div>
        <div className='link-info'>
          <div className='link-title'>
            <h2>{this.props.post.link_title}</h2>
          </div>
          <div className='link-desc'>
            <h5>{this.props.post.link_desc}</h5>
          </div>
        </div> 
      </a>
    )
  }

  showPostInfo = () => {
    if (this.props.post && (this.props.post.content.length == 0 || this.props.post.content == " ")) {
      return
    } else {
      return (
        <div className="post-info">
            <p>{this.props.post.content}</p>
        </div>
      )
    }
  }

  showDelBtn = () => {
    if (this.state.user.id == this.props.curuser.id || this.props.curuser.id == 1) {
      return (
        <div style={{display: "flex", marginLeft: "auto"}}>
          <div className={`del-btn active`} onClick={this.deletePost}><i className="ayn-trash"></i></div>
          <div style={{width: "5px"}}></div>
        </div>
      )
    }
  }

  render () {

    if (this.props.post == undefined || this.props.curuser == undefined) {
        return (
          <div className='load'>
            <i className="ayn-spin3" />
          </div>
        )
    } else {
      // console.log("current user: " + this.props.curuser)
      // console.log("posted by " + this.props.user.id)
        return (
            <div className="post" id={`post${this.props.post.id}`}>
                <div className="post-header">
                    <a href={`/profile/${this.state.user.id}`} className="author">
                        <div className="user-img" style={{
                        backgroundImage: `url("${this.state.user.profile_img}")`, 
                        backgroundPosition: 'center center', 
                        backgroundRepeat: 'no-repeat', 
                        backgroundSize: 'cover'}} />
                        <div className="username">{this.state.user.fname} {this.state.user.lname}</div>
                    </a>

                    <a href={`/post/${this.props.post.id}`} className="text">shared {this.getType()} <i className="ayn-link"></i></a>
                      
                    <div className="time">{new Date(this.props.post.created_at).toLocaleString()}</div>
                    {this.showDelBtn()}
                </div>

                {this.displayMedia()}
                {this.displayLink()}

                <Modal show={this.state.showModal} onClose={() => {this.setState({showModal: false})}}>
                  <img src={this.props.post.image_url} />
                </Modal>

                {this.showPostInfo()}
                
                <div className="post-stats">
                    <div className="icons">
                        <div className={`like-btn ${this.state.liked ? 'active' : ''}`}  onClick={this.like.bind(null, this.props.curuser.id, this.props.post.id)}>
                          <i className="ayn-thumbs-up-1" />
                        </div>
                        {/* <div className="share-btn">
                          <i className="ayn-share" />
                        </div> */}
                    </div>
                    <span className="text">{this.displayStats()}</span>
                    {this.getCommentCount()}
                </div>
                <div className="c-section">
                  <textarea name="comment" cols={30} rows={2} placeholder="write a comment..." value={this.state.comment} onChange={this.handleChange} onKeyUp={this.checkSubmit}/>
                </div>
                <div className="buttons">

                    <Comments ref={this.commentArea} post={this.props.post} sendUp={this.sendUp} deleteComment={this.deleteComment} curuser={this.props.curuser}/>

                    <div className="send-btn" onClick={this.submitComment}>
                        <i className="ayn-right" />
                    </div>
                    
                </div>
            </div>

        )
    }
  }
}


{/* <div className="send-btn" onTouchStart={this.touchSubmitComment.bind(null, {passive: false})} onMouseUp={this.submitComment}></div> */}