webpackJsonp([0],{

/***/ 168:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = __webpack_require__(69);

var _extends3 = _interopRequireDefault(_extends2);

var _defineProperty2 = __webpack_require__(135);

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _regenerator = __webpack_require__(46);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(45);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = __webpack_require__(15);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(16);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(18);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(17);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(6);

var _react2 = _interopRequireDefault(_react);

var _Comments = __webpack_require__(275);

var _Comments2 = _interopRequireDefault(_Comments);

var _axios = __webpack_require__(39);

var _axios2 = _interopRequireDefault(_axios);

var _Modal = __webpack_require__(277);

var _Modal2 = _interopRequireDefault(_Modal);

var _reactLazyload = __webpack_require__(556);

var _reactLazyload2 = _interopRequireDefault(_reactLazyload);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Post = function (_Component) {
  (0, _inherits3.default)(Post, _Component);

  function Post() {
    var _this2 = this;

    (0, _classCallCheck3.default)(this, Post);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Post.__proto__ || Object.getPrototypeOf(Post)).call(this));

    _this.getHeight = function () {
      var height = 192;
      if (window.innerWidth <= 800 && window.innerHeight <= 600) {
        if (_this.props.post.content != " ") {
          height += 40;
        }
        if (_this.props.post.link_url != '') {
          height += 100;
        }
        if (_this.props.post.type != "text") {
          height += 250;
        }
        height += _this.state.numComments * 28;
      } else {
        if (_this.props.post.content != " ") {
          height += 52;
        }
        if (_this.props.post.link_url != '') {
          height += 100;
        }
        if (_this.props.post.type != "text") {
          height += 400;
        }
        height += _this.state.numComments * 41;
      }
      return height;
    };

    _this.getPoster = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
      var user;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              user = '';
              _context.prev = 1;
              _context.next = 4;
              return _axios2.default.get('/api/user/' + _this.props.post.user_id);

            case 4:
              user = _context.sent;
              _context.next = 10;
              break;

            case 7:
              _context.prev = 7;
              _context.t0 = _context['catch'](1);

              console.log(_context.t0);

            case 10:

              if (_this._isMounted) {
                _this.setState({
                  user: user.data[0]
                });
              }

            case 11:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this2, [[1, 7]]);
    }));

    _this.displayMedia = function () {
      if (_this.props.post.type == 'image') {
        return _react2.default.createElement('div', { className: 'post-media', onClick: function onClick() {
            _this.setState({ showModal: true });
          }, style: {
            backgroundImage: 'url("' + _this.props.post.image_url + '")',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover' } });
      } else if (_this.props.post.type == 'video') {
        return _react2.default.createElement(
          'video',
          { className: 'post-media', controls: true, muted: true, autoPlay: true, playsInline: true },
          _react2.default.createElement('source', { src: _this.props.post.image_url, type: 'video/mp4' }),
          'Your browser does not support html5 videos.'
        );
      } else {
        return null;
      }
    };

    _this.getFileType = function (filename) {
      var ext = filename.split('.').pop();
      if (ext == 'mov' || ext == 'MOV') {
        return 'video/quicktime';
      }
      if (ext == 'mp4') {
        return 'video/mp4';
      }
    };

    _this.handleChange = function (event) {
      var name = event.target.name;
      var value = event.target.type == 'checkbox' ? event.target.checked : event.target.value;

      _this.setState((0, _defineProperty3.default)({}, name, value), function () {
        // console.log(this.state)
      });
    };

    _this.submitComment = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
      var self, response;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              self = _this;

              if (!(_this.state.comment.length > 0)) {
                _context2.next = 11;
                break;
              }

              _context2.prev = 2;
              _context2.next = 5;
              return _axios2.default.post('/comments', {
                post_id: self.props.post.id,
                user_id: self.props.curuser.id,
                content: self.state.comment
              }).then(function (response) {
                self.setState((0, _extends3.default)({}, self.state, {
                  comment: "",
                  height: self.state.height + 35
                }));

                //update everyone else's comments
                self.chat.emit('message', {
                  comments: 'all'
                });

                self.commentArea.current.getComments();
                return 'comment saved';
              });

            case 5:
              response = _context2.sent;
              _context2.next = 11;
              break;

            case 8:
              _context2.prev = 8;
              _context2.t0 = _context2['catch'](2);

              console.log("axios didnt work: " + _context2.t0);

            case 11:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, _this2, [[2, 8]]);
    }));

    _this.touchSubmitComment = function (event) {
      _this.submitComment();
      return false;
    };

    _this.sendUp = function (num) {
      if (_this._isMounted) {
        _this.setState({
          numComments: num
        });
      }
    };

    _this.checkSubmit = function (event) {

      if (event.keyCode == 13) {
        event.preventDefault();
        _this.submitComment();
      }
    };

    _this.deletePost = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
      var self, deleted;
      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              self = _this;
              // console.log("post id: " + self.props.post.id)

              _context3.prev = 1;
              _context3.next = 4;
              return _axios2.default.get('/posts/' + self.props.post.id + '/delete').then(function (response) {
                console.log(response);
                // self.props.removePost(self.props.post.id)
                // //update everyone else's comments
                // self.chat.emit('message', {
                //   delete: self.props.post.id
                // })
              });

            case 4:
              deleted = _context3.sent;
              _context3.next = 10;
              break;

            case 7:
              _context3.prev = 7;
              _context3.t0 = _context3['catch'](1);

              console.log('error deleting post: ' + _context3.t0);

            case 10:
              self.props.removePost(self.props.post.id);
              //update everyone else's comments
              self.chat.emit('message', {
                delete: self.props.post.id
              });

            case 12:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, _this2, [[1, 7]]);
    }));

    _this.getCommentCount = function () {
      if (_this.state.numComments == 0) {
        return _react2.default.createElement('div', { className: 'comment-count' });
      } else {
        return _react2.default.createElement(
          'div',
          { className: 'comment-count' },
          _this.state.numComments,
          ' comments'
        );
      }
    };

    _this.like = function () {
      var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(u_id, p_id) {
        var self;
        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                self = _this;

                if (_this.state.liked) {
                  _context4.next = 12;
                  break;
                }

                _context4.prev = 2;
                _context4.next = 5;
                return _axios2.default.post('/likes', {
                  user_id: u_id,
                  post_id: p_id
                }).then(function () {
                  console.log('post liked');
                });

              case 5:
                _context4.next = 10;
                break;

              case 7:
                _context4.prev = 7;
                _context4.t0 = _context4['catch'](2);

                console.log("error liking post: " + _context4.t0);

              case 10:
                _context4.next = 20;
                break;

              case 12:
                _context4.prev = 12;
                _context4.next = 15;
                return _axios2.default.post('/likes/delete', {
                  user_id: u_id,
                  post_id: p_id
                });

              case 15:
                _context4.next = 20;
                break;

              case 17:
                _context4.prev = 17;
                _context4.t1 = _context4['catch'](12);

                console.log("error liking post: " + _context4.t1);

              case 20:
                _this.setState((0, _extends3.default)({}, _this.state, {
                  liked: !_this.state.liked
                }));
                _this.getLikes();
                //update everyone elses feed
                self.chat.emit('message', {
                  likes: 'all'
                });

              case 23:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, _this2, [[2, 7], [12, 17]]);
      }));

      return function (_x, _x2) {
        return _ref4.apply(this, arguments);
      };
    }();

    _this.getLikes = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5() {
      var self;
      return _regenerator2.default.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              self = _this;

              try {
                _axios2.default.get('/posts/' + self.props.post.id + '/likes').then(function (response) {
                  // console.log(response.data.likeData)
                  var like_d = response.data.likeData;
                  var numLikes = like_d.length;
                  var last = like_d.length > 0 ? like_d[0].users.fname + ' ' + like_d[0].users.lname : "";

                  if (self._isMounted) {
                    self.setState({
                      likes: numLikes,
                      lastLike: last
                    });
                  }
                });
              } catch (error) {
                console.log("error getting likes: " + error);
              }

            case 2:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, _this2);
    }));

    _this.deleteComment = function () {
      // console.log('deleting comment')
      _this.chat.emit('message', {
        comments: 'all'
      });
    };

    _this.displayStats = function () {

      if (_this.state.liked) {
        if (_this.state.likes > 2) {
          return 'You and ' + (_this.state.likes - 1) + ' other people like this.';
        } else if (_this.state.likes == 2) {
          return 'You and 1 other person like this.';
        } else {
          return 'You like this.';
        }
      } else {
        if (_this.state.likes > 2) {
          return _this.state.lastLike + ' and ' + (_this.state.likes - 1) + ' other people like this.';
        } else if (_this.state.likes == 2) {
          return _this.state.lastLike + ' and 1 other person like this.';
        } else if (_this.state.likes == 1) {
          return _this.state.lastLike + ' likes this.';
        } else {
          return 'Be the first to like this.';
        }
      }
    };

    _this.getType = function () {
      if (_this.props.post.type == 'image') {
        return 'an image';
      } else if (_this.props.post.type == 'video') {
        return 'a video';
      } else {
        return 'something';
      }
    };

    _this.displayLink = function () {
      if (!_this.state.link) {
        return;
      }
      return _react2.default.createElement(
        'a',
        { href: _this.props.post.link_url, target: '_blank', alt: 'external link', className: 'post-link' },
        _react2.default.createElement(
          'div',
          { className: 'link-image' },
          _react2.default.createElement('img', { src: _this.props.post.link_img, alt: 'no image' })
        ),
        _react2.default.createElement(
          'div',
          { className: 'link-info' },
          _react2.default.createElement(
            'div',
            { className: 'link-title' },
            _react2.default.createElement(
              'h2',
              null,
              _this.props.post.link_title
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'link-desc' },
            _react2.default.createElement(
              'h5',
              null,
              _this.props.post.link_desc
            )
          )
        )
      );
    };

    _this.showPostInfo = function () {
      if (_this.props.post.content.length == 0 || _this.props.post.content == " ") {
        return;
      } else {
        return _react2.default.createElement(
          'div',
          { className: 'post-info' },
          _react2.default.createElement(
            'p',
            null,
            _this.props.post.content
          )
        );
      }
    };

    _this.state = {
      post: {},
      user: {},
      comment: "",
      numComments: 0,
      liked: false,
      likes: 0,
      lastLike: "",
      link: false,
      showModal: false,
      height: 0
    };

    _this.commentArea = _react2.default.createRef(); // ref for updating comments
    _this._isMounted = false;
    return _this;
  }

  (0, _createClass3.default)(Post, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var self = this;

      this._isMounted = true;

      this._isMounted && this.getPoster();
      this._isMounted && this.getLikes();

      if (this._isMounted && this.props.post.link_url != '') {
        this.setState({
          link: true
        });
      }

      // chat setup
      this.chat = this.props.ws.getSubscription('chat') || this.props.ws.subscribe('chat');
      // update comments whenever someone comments
      this.chat.on('comments', function () {
        console.log('new comment');
        if (self.commentArea.current) {
          self.commentArea.current.getComments();
        }
      });
      this.chat.on('likes', function () {
        console.log('new likes');
        self.getLikes();
      });

      // get height for lazy loading
      var height = this.getHeight();
      this._isMounted && this.setState({ height: height });
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this._isMounted = false;
    }

    // get the user data for the person who posted this post


    // dont really need this because we are just lying and saying its mp4 anyway
    // because it wont work on chrome if we call it a quicktime file


    // fix to avoid double submits on mobile


    // this lets us get the comments from the child


    // allows comments to be submitted with the enter key


    // delete the post only if you posted it


    // displays the current post comments


    // like or unlike a post


    // get the like stats


    // display the post stats


    // display link area if there is a link

  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      if (this.props.post == undefined || this.props.curuser == undefined) {
        return _react2.default.createElement(
          'div',
          { className: 'load' },
          _react2.default.createElement('i', { className: 'ayn-spin3' })
        );
      } else {
        // console.log("current user: " + this.props.curuser)
        // console.log("posted by " + this.props.user.id)
        return _react2.default.createElement(
          _reactLazyload2.default,
          {
            height: this.getHeight(),
            offset: 200,
            once: true,
            overflow: true,
            scrollContainer: '.content-area'
          },
          _react2.default.createElement(
            'div',
            { className: 'post' },
            _react2.default.createElement(
              'div',
              { className: 'post-header' },
              _react2.default.createElement(
                'a',
                { href: '/profile/' + this.state.user.id, className: 'author' },
                _react2.default.createElement('div', { className: 'user-img', style: {
                    backgroundImage: 'url("' + this.state.user.profile_img + '")',
                    backgroundPosition: 'center center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover' } }),
                _react2.default.createElement(
                  'div',
                  { className: 'username' },
                  this.state.user.fname,
                  ' ',
                  this.state.user.lname
                )
              ),
              _react2.default.createElement(
                'a',
                { href: '/post/' + this.props.post.id, className: 'text' },
                'shared ',
                this.getType(),
                ' ',
                _react2.default.createElement('i', { className: 'ayn-link' })
              ),
              _react2.default.createElement(
                'div',
                { className: 'time' },
                new Date(this.props.post.created_at).toLocaleString()
              ),
              _react2.default.createElement(
                'div',
                { className: 'del-btn ' + (this.state.user.id == this.props.curuser.id ? 'active' : ''), onClick: this.deletePost },
                _react2.default.createElement('i', { className: 'ayn-trash' })
              )
            ),
            this.displayMedia(),
            this.displayLink(),
            _react2.default.createElement(
              _Modal2.default,
              { show: this.state.showModal, onClose: function onClose() {
                  _this3.setState({ showModal: false });
                } },
              _react2.default.createElement('img', { src: this.props.post.image_url })
            ),
            this.showPostInfo(),
            _react2.default.createElement(
              'div',
              { className: 'post-stats' },
              _react2.default.createElement(
                'div',
                { className: 'icons' },
                _react2.default.createElement(
                  'div',
                  { className: 'like-btn ' + (this.state.liked ? 'active' : ''), onClick: this.like.bind(null, this.props.curuser.id, this.props.post.id) },
                  _react2.default.createElement('i', { className: 'ayn-thumbs-up-1' })
                )
              ),
              _react2.default.createElement(
                'span',
                { className: 'text' },
                this.displayStats()
              ),
              this.getCommentCount()
            ),
            _react2.default.createElement(
              'div',
              { className: 'c-section' },
              _react2.default.createElement('textarea', { name: 'comment', cols: 30, rows: 2, placeholder: 'write a comment...', value: this.state.comment, onChange: this.handleChange, onKeyUp: this.checkSubmit })
            ),
            _react2.default.createElement(
              'div',
              { className: 'buttons' },
              _react2.default.createElement(_Comments2.default, { ref: this.commentArea, post: this.props.post, sendUp: this.sendUp, deleteComment: this.deleteComment, curuser: this.props.curuser }),
              _react2.default.createElement(
                'div',
                { className: 'send-btn', onTouchStart: this.touchSubmitComment.bind(null, { passive: false }), onMouseUp: this.submitComment },
                _react2.default.createElement('i', { className: 'ayn-right' })
              )
            )
          )
        );
      }
    }
  }]);
  return Post;
}(_react.Component);

exports.default = Post;

/***/ }),

/***/ 247:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__(46);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(45);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = __webpack_require__(15);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(16);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(18);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(17);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(6);

var _react2 = _interopRequireDefault(_react);

var _axios = __webpack_require__(39);

var _axios2 = _interopRequireDefault(_axios);

var _PostArea = __webpack_require__(278);

var _PostArea2 = _interopRequireDefault(_PostArea);

var _Compose = __webpack_require__(276);

var _Compose2 = _interopRequireDefault(_Compose);

var _Post = __webpack_require__(168);

var _Post2 = _interopRequireDefault(_Post);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Handles updating the postarea when its sibling compose adds a post to the database

var Home = function (_Component) {
  (0, _inherits3.default)(Home, _Component);

  function Home() {
    var _this2 = this;

    (0, _classCallCheck3.default)(this, Home);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Home.__proto__ || Object.getPrototypeOf(Home)).call(this));

    _this.getPost = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
      var p_id, postData;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              p_id = _this.props.routeProps.match.params.id;
              _context.next = 3;
              return _axios2.default.get('/posts/' + p_id);

            case 3:
              postData = _context.sent;

              // console.log(postData)

              _this.setState({
                post: postData.data[0]
              });

            case 5:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this2);
    }));

    _this.state = {
      post: {}
    };

    _this.postAreaRef = _react2.default.createRef();
    return _this;
  }

  (0, _createClass3.default)(Home, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var self = this;

      if (this.props.single) {
        this.getPost();
      }

      this.chat = this.props.ws.getSubscription('chat') || this.props.ws.subscribe('chat');
      this.chat.on('delete', function (message) {
        console.log('someone deleted post ' + message);
        self.postAreaRef.current && self.postAreaRef.current.removePost(message);
      });
      this.chat.on('update', function (message) {
        console.log('new post');
        self.postAreaRef.current && self.postAreaRef.current.getNew();
      });
    }

    // if this is a single post page, get the data for the post and the poster

  }, {
    key: 'render',


    // pass down function to pass down to compose so it can update the whole area
    // update = () => {
    //   this.postAreaRef.current.getNew()
    // }

    value: function render() {
      if (this.props.user == undefined) {
        return _react2.default.createElement(
          'div',
          { 'class': 'load' },
          _react2.default.createElement('i', { className: 'ayn-spin3' })
        );
      } else {

        if (this.props.single && this.state.post != undefined) {
          return _react2.default.createElement(
            'div',
            { className: 'content-area' },
            _react2.default.createElement(
              'section',
              { id: 'all-posts' },
              _react2.default.createElement(
                'div',
                { className: 'post-container' },
                _react2.default.createElement(_Post2.default, { post: this.state.post, ws: this.props.ws, curuser: this.props.user, update: this.update })
              )
            )
          );
        } else {
          return _react2.default.createElement(
            'div',
            { className: 'content-area', id: 'scroll-this' },
            _react2.default.createElement(_Compose2.default, { user: this.props.user, ws: this.props.ws }),
            _react2.default.createElement(_PostArea2.default, { routeProps: this.props.routeProps, user: this.props.user, ws: this.props.ws, ref: this.postAreaRef })
          );
        }
      }
    }
  }]);
  return Home;
}(_react.Component);

exports.default = Home;

/***/ }),

/***/ 248:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = __webpack_require__(69);

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = __webpack_require__(15);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(16);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(18);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(17);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(6);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LeftMenu = function (_Component) {
  (0, _inherits3.default)(LeftMenu, _Component);

  function LeftMenu() {
    (0, _classCallCheck3.default)(this, LeftMenu);

    var _this = (0, _possibleConstructorReturn3.default)(this, (LeftMenu.__proto__ || Object.getPrototypeOf(LeftMenu)).call(this));

    _this.clickedOpen = function () {
      _this.setState((0, _extends3.default)({}, _this.state, {
        open: !_this.state.open
      }));
    };

    _this.clickedDropDown = function () {
      _this.setState((0, _extends3.default)({}, _this.state, {
        dropdown: !_this.state.dropdown
      }));
    };

    _this.logout = function () {
      _this.chat = _this.props.ws.getSubscription('chat') || _this.props.ws.subscribe('chat');
      _this.chat.emit('message', {
        offline: _this.props.user
      });
      _this.props.ws.close();

      window.location.href = '/logout';
    };

    _this.state = {
      dropdown: false,
      open: false
    };
    return _this;
  }

  (0, _createClass3.default)(LeftMenu, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (window.innerWidth > 1200) {
        this.setState((0, _extends3.default)({}, this.state, {
          open: true
        }));
      }
    }
  }, {
    key: 'render',
    value: function render() {
      if (this.props.user == undefined) {
        return _react2.default.createElement(
          'div',
          { className: 'load' },
          _react2.default.createElement('i', { className: 'ayn-spin3' })
        );
      } else {
        var _props$user = this.props.user,
            fname = _props$user.fname,
            lname = _props$user.lname;

        return _react2.default.createElement(
          'section',
          { id: 'left-menu', className: this.state.open ? "open" : "closed" },
          _react2.default.createElement(
            'a',
            { className: 'account-dropdown', href: '/profile/' + this.props.user.id },
            _react2.default.createElement(
              'div',
              { className: 'username' },
              fname + ' ' + lname
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'groups' },
            _react2.default.createElement(
              'div',
              { className: 'title' },
              '_usr'
            ),
            _react2.default.createElement(
              'ul',
              null,
              _react2.default.createElement(
                'li',
                null,
                'bio'
              ),
              _react2.default.createElement(
                'li',
                null,
                'work'
              ),
              _react2.default.createElement(
                'li',
                null,
                'media'
              )
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'groups' },
            _react2.default.createElement(
              'div',
              { className: 'title' },
              '_groups'
            ),
            _react2.default.createElement(
              'ul',
              null,
              _react2.default.createElement(
                'li',
                null,
                'software'
              ),
              _react2.default.createElement(
                'li',
                null,
                'photography'
              ),
              _react2.default.createElement(
                'li',
                null,
                'design'
              )
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'open-btn', onClick: this.clickedOpen },
            _react2.default.createElement('i', { className: 'ayn-left-open ' + (this.state.open ? '' : 'closed') })
          ),
          _react2.default.createElement(
            'div',
            { className: 'logout', onClick: this.logout },
            'logout ',
            _react2.default.createElement('i', { className: 'ayn-trash' })
          )
        );
      }
    }
  }]);
  return LeftMenu;
}(_react.Component);

exports.default = LeftMenu;

/***/ }),

/***/ 249:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = __webpack_require__(15);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(16);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(18);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(17);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(6);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Loading = function (_Component) {
  (0, _inherits3.default)(Loading, _Component);

  function Loading() {
    (0, _classCallCheck3.default)(this, Loading);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Loading.__proto__ || Object.getPrototypeOf(Loading)).call(this));

    _this.state = {};
    return _this;
  }

  (0, _createClass3.default)(Loading, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        "section",
        { id: "loading", className: this.props.active },
        _react2.default.createElement("i", { className: "ayn-spin3" })
      );
    }
  }]);
  return Loading;
}(_react.Component);

exports.default = Loading;

/***/ }),

/***/ 250:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__(46);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(45);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _extends2 = __webpack_require__(69);

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = __webpack_require__(15);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(16);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(18);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(17);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(6);

var _react2 = _interopRequireDefault(_react);

var _axios = __webpack_require__(39);

var _axios2 = _interopRequireDefault(_axios);

var _ChatWindow = __webpack_require__(274);

var _ChatWindow2 = _interopRequireDefault(_ChatWindow);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import Ws from '@adonisjs/websocket-client'
// import { SimpleDB } from 'aws-sdk'

var Messenger = function (_Component) {
  (0, _inherits3.default)(Messenger, _Component);

  function Messenger() {
    var _this2 = this;

    (0, _classCallCheck3.default)(this, Messenger);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Messenger.__proto__ || Object.getPrototypeOf(Messenger)).call(this));

    _this.disconnect = function () {
      _this.props.ws.close();
    };

    _this.clickedOpen = function () {
      _this.setState((0, _extends3.default)({}, _this.state, {
        open: !_this.state.open
      }));
    };

    _this.startChat = function () {
      var self = _this;
      // connect to main chat
      // this.props.ws.connect()
      _this.chat = _this.props.ws.getSubscription('chat') || _this.props.ws.subscribe('chat');

      // send login
      _this.chat.on('ready', function () {
        self.setState((0, _extends3.default)({}, self.state, {
          connected: true
        }));
        // display online users
        _this.populate();
      });

      // update users online
      _this.chat.on('login', function (message) {
        self.populate();
      });

      _this.chat.on('message', function (message) {
        self.handleMsg(message);
      });

      _this.props.ws.on('error', function (error) {
        console.log(error);
        self.props.ws.close();
        self.setState((0, _extends3.default)({}, self.state, {
          connected: false,
          chatUser: null
        }));
      });

      _this.props.ws.on('close', function () {
        clearTimeout(_this.pingTimeout);
        self.setState((0, _extends3.default)({}, self.state, {
          connected: false,
          chatUser: null
        }));
      });

      _this.props.ws.on('open', function () {
        clearTimeout(_this.pingTimeout);
      });

      _this.props.ws.on('ping', function () {
        clearTimeout(_this.pingTimeout);
        console.log('ping');
        self.populate();
      });
    };

    _this.handleMsg = function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(message) {
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(message.from != undefined)) {
                  _context.next = 7;
                  break;
                }

                console.log('message to us!: ' + message.body);

                if (!_this.state.blinkIds.has(message.from.id)) {
                  _this.blink(message.from.id, 3000); // blink this users name for 4 seconds, then add it to unread
                }

                if (!(_this.state.chatUser == null)) {
                  _context.next = 6;
                  break;
                }

                _context.next = 6;
                return _this.openChat(message.from, false);

              case 6:

                if (_this.chatRef != null) {
                  _this.chatRef.current.getMessages();
                }

              case 7:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this2);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }();

    _this.blink = function (u_id, ms) {
      var self = _this;

      var oldBlink = new Set(self.state.blinkIds);
      if (oldBlink.has(u_id)) {
        oldBlink.delete(u_id);
      } // deal with already blinking
      var newBlink = new Set(oldBlink);
      newBlink.add(u_id);
      var blinking = false;

      if (_this.blinkInt) {
        // deal with already blinking
        clearInterval(_this.blinkInt);
        _this.blinkInt = null;
      }
      _this.blinkInt = setInterval(function () {
        // blink every .5 seconds
        if (blinking == false) {
          self.setState({
            blinkIds: newBlink
          });
          blinking = true;
        } else {
          self.setState({
            blinkIds: oldBlink
          });
          blinking = false;
        }
      }, 500);

      if (_this.blinkTo) {
        // deal with already blinking
        clearTimeout(_this.blinkTo);
        _this.blinkTo = null;
      }
      _this.blinkTo = setTimeout(function () {
        // stop blinking after ms milliseconds
        clearInterval(self.blinkInt);
        var isUnread = new Set(self.state.unread);
        if (self.state.chatUser != null && self.state.chatUser.id != u_id && !self.state.unread.has(u_id)) {
          isUnread.add(u_id);
        }
        self.setState((0, _extends3.default)({}, self.state, {
          blinkIds: oldBlink,
          unread: isUnread
        }));
      }, ms);
    };

    _this.openChat = function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(user, clicked) {
        var self, isDesktop, newBlink, newUnread;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                self = _this;
                isDesktop = window.innerWidth > 600;
                // console.log('clicked: ' + clicked)

                // do nothing if clicking your own name

                if (!(user.id == _this.props.user.id)) {
                  _context2.next = 4;
                  break;
                }

                return _context2.abrupt('return');

              case 4:

                if (_this.state.connected == false) {
                  _this.props.ws.connect();
                  _this.chat = _this.props.ws.getSubscription('chat') || _this.props.ws.subscribe('chat');
                }
                // send login
                _this.setState({
                  // ...this.state,
                  connected: true,
                  open: isDesktop //close on small devices
                });

                // if blinking, stop blinking
                if (_this.state.blinkIds.has(user.id)) {
                  newBlink = new Set(_this.state.blinkIds);

                  newBlink.delete(user.id);
                  _this.setState({
                    // ...this.state,
                    connected: true,
                    open: isDesktop,
                    blinkIds: newBlink
                  });
                  clearInterval(_this.blinkInt);
                  _this.blinkInt = null;
                  clearTimeout(_this.blinkTo);
                  _this.blinkTo = null;
                }

                // if unread, dont make it unread
                if (_this.state.unread.has(user.id)) {
                  newUnread = new Set(_this.state.unread);

                  newUnread.delete(user.id);
                  _this.setState({
                    // ...this.state,
                    connected: true,
                    open: isDesktop,
                    unread: newUnread
                  });
                }

                if (clicked == true || _this.state.chatUser == null) {
                  _this.setState({
                    // ...this.state,
                    connected: true,
                    open: isDesktop,
                    chatUser: user
                  });
                }

                if (_this.chatRef.current != null && clicked == true) {
                  _this.chatRef.current.switchUser(user);
                }

                if (_this.state.chatUser != null && user != _this.state.chatUser && clicked == true) {
                  _this.chatRef.current.switchUser(user);
                }

              case 11:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, _this2);
      }));

      return function (_x2, _x3) {
        return _ref2.apply(this, arguments);
      };
    }();

    _this.displayChat = function () {
      if (_this.state.chatUser != null) {
        return _react2.default.createElement(_ChatWindow2.default, { ref: _this.chatRef,
          from: _this.props.user,
          to: _this.state.chatUser,
          ws: _this.props.ws,
          chat: _this.chat,
          disconnect: _this.disconnect,
          close: _this.closeChatWindow,
          blink: _this.state.blinkIds.has(_this.state.chatUser.id)
        });
      }
    };

    _this.closeChatWindow = function () {
      _this.setState({
        chatUser: null
      });
    };

    _this.populate = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
      var self, allOnline, allOffline;
      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              self = _this;
              _context3.prev = 1;
              _context3.next = 4;
              return _axios2.default.get('/api/online');

            case 4:
              allOnline = _context3.sent;
              _context3.next = 7;
              return _axios2.default.get('/api/offline');

            case 7:
              allOffline = _context3.sent;

              // console.log("users: ")
              // console.log(allUsers)
              self.setState({
                users_on: allOnline.data,
                users_off: allOffline.data
              });
              _context3.next = 14;
              break;

            case 11:
              _context3.prev = 11;
              _context3.t0 = _context3['catch'](1);

              console.log("error fetching users: " + _context3.t0);

            case 14:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, _this2, [[1, 11]]);
    }));

    _this.displayUsers = function () {
      var self = _this;
      if (_this.state.users_off == undefined) {
        return _react2.default.createElement(
          'div',
          { className: 'load' },
          _react2.default.createElement('i', { className: 'ayn-spin3' })
        );
      } else {
        return _react2.default.createElement(
          'div',
          null,
          _this.state.users_on.map(function (user) {
            return _react2.default.createElement(
              'div',
              { className: 'user ' + (self.state.blinkIds.has(user.id) && self.state.chatUser != null && self.state.chatUser.id != user.id ? 'blink' : ''), key: user.id, onClick: _this.openChat.bind(null, user, true) },
              _react2.default.createElement('div', { className: 'user-img', style: {
                  backgroundImage: 'url("' + user.profile_img + '")',
                  backgroundPosition: 'center center',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover' } }),
              _react2.default.createElement(
                'div',
                { className: 'username' },
                user.fname,
                ' ',
                user.lname
              ),
              _react2.default.createElement(
                'div',
                { className: 'message-icon' },
                _react2.default.createElement('i', { className: 'ayn-comment' + (self.state.unread.has(user.id) ? '' : '-1') })
              )
            );
          }),
          _react2.default.createElement(
            'div',
            { className: 'divider' },
            '- offline -'
          ),
          _this.state.users_off.map(function (user) {
            return _react2.default.createElement(
              'div',
              { className: 'user off', key: user.id },
              _react2.default.createElement('div', { className: 'user-img', style: {
                  backgroundImage: 'url("' + user.profile_img + '")',
                  backgroundPosition: 'center center',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover' } }),
              _react2.default.createElement(
                'div',
                { className: 'username' },
                user.fname,
                ' ',
                user.lname
              ),
              _react2.default.createElement(
                'div',
                { className: 'message-icon' },
                _react2.default.createElement('i', { className: 'ayn-comment-1' })
              )
            );
          })
        );
      }
    };

    _this.state = {
      users_on: [],
      users_off: [],
      open: false,
      connected: false,
      chatUser: null,
      blinkIds: new Set(),
      unread: new Set()
    };

    _this.chat = null;
    _this.chatRef = _react2.default.createRef();

    _this.pingTimeout = setTimeout(function () {
      _this.props.ws.close();
    }, 32000);

    _this.blinkInt = null;
    _this.blinkTo = null;
    return _this;
  }

  (0, _createClass3.default)(Messenger, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.startChat();
      if (window.innerWidth > 1200) {
        this.setState((0, _extends3.default)({}, this.state, {
          open: true
        }));
      }

      // var pageVisibility = document.visibilityState
      // document.addEventListener('visibilitychange', this.wakeUp)
    }

    // wakeUp = () => {
    //   const self = this

    //   if (document.visibilityState == 'hidden') {
    //     document.title = 'hidden'
    //     self.props.ws.close()
    //     self.setState({
    //       ...self.state,
    //       connected: false
    //     })
    //   }

    //   if (document.visibilityState == 'visible') {
    //     self.startChat()
    //   }
    // }

  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.props.ws.close();
    }

    //open messenger sidebar


    // connect messenger


    // handle incomming messages


    // blink username color change when message received


    // open chat window / switch to a different one


    // instantiate chatwindow


    // fill messenger sidebar with users
    // fix to be only online users


    // render online users

  }, {
    key: 'render',
    value: function render() {
      if (this.state.users_off == undefined) {
        this.populate();
        return _react2.default.createElement(
          'div',
          { className: 'load' },
          _react2.default.createElement('i', { className: 'ayn-spin3' })
        );
      }
      return _react2.default.createElement(
        'section',
        { id: 'messenger', className: this.state.open ? "open" : "closed" },
        _react2.default.createElement(
          'div',
          { className: 'messenger-header' },
          _react2.default.createElement(
            'div',
            { className: 'messenger-icon' },
            _react2.default.createElement(
              'span',
              null,
              ' '
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'title' },
            'connect'
          ),
          _react2.default.createElement(
            'div',
            { className: 'options-icon' },
            _react2.default.createElement(
              'span',
              null,
              ' '
            )
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'users' },
          this.displayUsers()
        ),
        _react2.default.createElement(
          'div',
          { className: 'open-btn', onClick: this.clickedOpen },
          _react2.default.createElement('i', { className: 'ayn-right-open ' + (this.state.open ? '' : 'closed') })
        ),
        _react2.default.createElement(
          'div',
          { className: 'search' },
          _react2.default.createElement('i', { className: 'ayn-search' }),
          _react2.default.createElement('input', { type: 'text', name: 'friendSearch', placeholder: 'search...' })
        ),
        this.displayChat()
      );
    }
  }]);
  return Messenger;
}(_react.Component);

exports.default = Messenger;

/***/ }),

/***/ 251:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__(46);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends2 = __webpack_require__(69);

var _extends3 = _interopRequireDefault(_extends2);

var _asyncToGenerator2 = __webpack_require__(45);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = __webpack_require__(15);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(16);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(18);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(17);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(6);

var _react2 = _interopRequireDefault(_react);

var _axios = __webpack_require__(39);

var _axios2 = _interopRequireDefault(_axios);

var _reactTransitionGroup = __webpack_require__(575);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Profile = function (_Component) {
  (0, _inherits3.default)(Profile, _Component);

  function Profile() {
    (0, _classCallCheck3.default)(this, Profile);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Profile.__proto__ || Object.getPrototypeOf(Profile)).call(this));

    _this.getUser = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
      var _props$routeProps, match, history, location, self, user, image;

      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _props$routeProps = this.props.routeProps, match = _props$routeProps.match, history = _props$routeProps.history, location = _props$routeProps.location;
              self = this;
              user = '';
              _context.prev = 3;
              _context.next = 6;
              return _axios2.default.get('/api/user/' + match.params.id);

            case 6:
              user = _context.sent;
              _context.next = 12;
              break;

            case 9:
              _context.prev = 9;
              _context.t0 = _context['catch'](3);

              console.log(_context.t0);

            case 12:
              image = user.data[0].profile_img;

              if (image.slice(-6) == 'normal') {
                image = image.replace('normal', 'large');
              }

              this._isMounted && this.setState((0, _extends3.default)({}, this.state, {
                user: user.data[0],
                image: image
              }), function () {
                // console.log(this.state)
              });

            case 15:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this, [[3, 9]]);
    }));

    _this.editBio = function () {
      _this.setState((0, _extends3.default)({}, _this.state, {
        edit: true
      }), function () {
        // console.log(this.state)
      });
    };

    _this.displayBio = function () {
      // if (this.state.user == undefined) {
      //   return <div>bio loading...</div>
      // } else {

      //   // console.log(this.state.user)
      //   if (this.state.user.info == "") {
      //     return (
      //       <div className="bio">
      //         <textarea className={`bio-text ${this.state.edit ? 'active' : ''} `} ></textarea>
      //         <div className='bio-btn' onClick={this.editBio}> Add a bio </div>
      //       </div>
      //     )
      //   } else {
      //     return (
      //       <p>{this.state.user.info}</p>
      //     )
      //   }
      // }
      return;
    };

    _this.state = {
      user: "",
      edit: false,
      image: ""
    };
    _this._isMounted = false;
    return _this;
  }

  (0, _createClass3.default)(Profile, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._isMounted = true;
      this.getUser();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this._isMounted = false;
    }

    // value={this.state.comment} onChange={this.handleChange} onKeyUp={this.checkSubmit}

  }, {
    key: 'render',
    value: function render() {
      if (this.state.user == undefined) {
        return _react2.default.createElement(
          'div',
          { className: 'load' },
          _react2.default.createElement('i', { className: 'ayn-spin3' })
        );
      } else {
        // home
        // job
        // education
        // website
        // email
        // about
        // phone?
        // music
        // resume?

        return _react2.default.createElement(
          'div',
          { className: 'content-area profile-page' },
          _react2.default.createElement('div', { className: 'cover' }),
          _react2.default.createElement(
            'div',
            { className: 'user-img' },
            _react2.default.createElement('img', { src: this.state.image }),
            _react2.default.createElement(
              'div',
              { className: 'follow-btn' },
              'follow ',
              _react2.default.createElement('i', { className: 'ayn-bell' })
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'user-info', style: { display: 'none' } },
            this.displayBio()
          )
        );
      }
    }
  }]);
  return Profile;
}(_react.Component);

exports.default = Profile;

/***/ }),

/***/ 252:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = __webpack_require__(15);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(16);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(18);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(17);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(6);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SearchHeader = function (_Component) {
  (0, _inherits3.default)(SearchHeader, _Component);

  function SearchHeader() {
    (0, _classCallCheck3.default)(this, SearchHeader);

    var _this = (0, _possibleConstructorReturn3.default)(this, (SearchHeader.__proto__ || Object.getPrototypeOf(SearchHeader)).call(this));

    _this.state = {};
    return _this;
  }

  (0, _createClass3.default)(SearchHeader, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        "div",
        { className: "header" },
        _react2.default.createElement(
          "a",
          { href: "/" },
          _react2.default.createElement("img", { src: "/img/sun_small.JPG", alt: "index - home" })
        ),
        _react2.default.createElement(
          "div",
          { className: "search" },
          _react2.default.createElement("input", { type: "text", name: "search", placeholder: "search..." })
        )
      );
    }
  }]);
  return SearchHeader;
}(_react.Component);

exports.default = SearchHeader;

/***/ }),

/***/ 274:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = __webpack_require__(135);

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _regenerator = __webpack_require__(46);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends2 = __webpack_require__(69);

var _extends3 = _interopRequireDefault(_extends2);

var _asyncToGenerator2 = __webpack_require__(45);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = __webpack_require__(15);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(16);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(18);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(17);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(6);

var _react2 = _interopRequireDefault(_react);

var _axios = __webpack_require__(39);

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ChatWindow = function (_Component) {
  (0, _inherits3.default)(ChatWindow, _Component);

  function ChatWindow() {
    var _this2 = this;

    (0, _classCallCheck3.default)(this, ChatWindow);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ChatWindow.__proto__ || Object.getPrototypeOf(ChatWindow)).call(this));

    _this.switchUser = function (user) {
      _this.setState({
        to: user,
        min: false
      }, function () {
        console.log('changed user: ' + _this.state.to.fname);
        _this.getMessages();
      });
    };

    _this.getMessages = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
      var messages;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return _axios2.default.get('/api/convo', {
                params: {
                  from: _this.state.from.id,
                  to: _this.state.to.id
                }
              }).then(function (response) {
                // console.log(response.data.messages)
                _this.setState((0, _extends3.default)({}, _this.state, {
                  messages: response.data.messages
                }));
                _this.scrollToBottom();
              });

            case 2:
              messages = _context.sent;

            case 3:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this2);
    }));

    _this.scrollToBottom = function () {
      _this.msgEndRef.current.scrollIntoView({ behavior: 'auto' });
    };

    _this.displayMessages = function () {
      var self = _this;
      return _this.state.messages.map(function (msg, i) {
        return _react2.default.createElement(
          'div',
          { className: 'message ' + (msg.sender_id == self.props.from.id ? 'self' : ''), key: msg.id },
          _react2.default.createElement(
            'p',
            null,
            msg.content
          )
        );
      });
    };

    _this.changeText = function (event) {
      var name = event.target.name;
      var value = event.target.value;

      _this.setState((0, _defineProperty3.default)({}, name, value), function () {
        // console.log(this.state)
      });
    };

    _this.checkSubmit = function (event) {
      if (event.keyCode == 13) {
        event.preventDefault();
        _this.sendMsg();
      }
    };

    _this.sendMsg = function () {
      if (_this.state.message == '\n') {
        _this.setState((0, _extends3.default)({}, _this.state, {
          postContent: ''
        }));
        return;
      }
      if (_this.state.message.length == 0) {
        return;
      }

      console.log('sending message to ' + _this.state.to.fname);
      _this.state.chat.emit('message', {
        to: _this.state.to,
        body: _this.state.message
      });
      // this.addMsg(this.state.message)
      _this.setState((0, _extends3.default)({}, _this.state, {
        message: ''
      }));

      _this.getMessages();
    };

    _this.minChat = function () {
      _this.setState({
        min: !_this.state.min
      });
    };

    _this.closeChat = function () {
      _this.setState((0, _extends3.default)({}, _this.state, {
        to: undefined,
        min: false
      }));
      _this.props.close();
    };

    _this.state = {
      from: null,
      to: null,
      chat: null,
      message: '',
      messages: [],
      min: false
    };

    _this.msgEndRef = _react2.default.createRef();
    return _this;
  }

  (0, _createClass3.default)(ChatWindow, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var self = this;
      this.setState({
        from: this.props.from,
        to: this.props.to,
        chat: this.props.chat
      }, function () {
        // console.log(this.state)
        self.getMessages();
      });
    }

    // keeps the chat window always at the bottom


    // allows posts to be submit with the enter key


    // sends message, adds message to window, and clears message box


    // for now this doesn't do much

  }, {
    key: 'render',
    value: function render() {
      if (this.state.to == undefined) {
        return _react2.default.createElement(
          'div',
          { className: 'load' },
          _react2.default.createElement('i', { className: 'ayn-spin3' })
        );
      } else {
        return _react2.default.createElement(
          'div',
          { className: 'chat ' + (this.state.min ? 'min' : '') },
          _react2.default.createElement(
            'div',
            { className: 'chat-header' },
            _react2.default.createElement(
              'div',
              { className: 'min-btn', onClick: this.minChat },
              _react2.default.createElement('i', { className: 'ayn-down-open ' + (this.state.min ? 'min' : '') })
            ),
            _react2.default.createElement(
              'span',
              { className: 'chat-user ' + (this.props.blink ? 'blink' : '') },
              this.state.to.fname,
              ' ',
              this.state.to.lname
            ),
            _react2.default.createElement(
              'div',
              { className: 'close-btn', onClick: this.closeChat },
              _react2.default.createElement('i', { className: 'ayn-cancel' })
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'chat-body' },
            this.displayMessages(),
            _react2.default.createElement('div', { ref: this.msgEndRef })
          ),
          _react2.default.createElement(
            'div',
            { className: 'chat-compose' },
            _react2.default.createElement('input', { type: 'text', name: 'message', value: this.state.message, onKeyUp: this.checkSubmit, onChange: this.changeText, placeholder: 'enter a message' }),
            _react2.default.createElement(
              'div',
              { className: 'send-btn', onTouchStart: this.sendMsg, onClick: this.sendMsg },
              _react2.default.createElement('i', { className: 'ayn-paper-plane-1' })
            )
          )
        );
      }
    }
  }]);
  return ChatWindow;
}(_react.Component);

exports.default = ChatWindow;

/***/ }),

/***/ 275:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__(46);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(45);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = __webpack_require__(15);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(16);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(18);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(17);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(6);

var _react2 = _interopRequireDefault(_react);

var _axios = __webpack_require__(39);

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Comments = function (_Component) {
  (0, _inherits3.default)(Comments, _Component);

  function Comments() {
    var _this2 = this;

    (0, _classCallCheck3.default)(this, Comments);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Comments.__proto__ || Object.getPrototypeOf(Comments)).call(this));

    _this.getComments = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
      var self, comments;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              self = this;
              _context.prev = 1;
              _context.next = 4;
              return _axios2.default.get('/posts/' + self.props.post.id + '/comments');

            case 4:
              comments = _context.sent;


              if (this._isMounted) {
                self.setState({
                  comments: comments.data.commentData
                });
              }
              _context.next = 11;
              break;

            case 8:
              _context.prev = 8;
              _context.t0 = _context['catch'](1);

              console.log("Initialization error: " + _context.t0);

            case 11:

              this.props.sendUp(this.state.comments.length);

            case 12:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this, [[1, 8]]);
    }));

    _this.deleteComment = function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(id) {
        var self;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                self = _this;

                console.log("comment id: " + id);
                _context2.prev = 2;
                _context2.next = 5;
                return _axios2.default.get('/comments/' + id + '/delete').then(function (response) {
                  console.log('comment deleted: ' + response);
                  self.getComments();
                });

              case 5:

                //update everyone else's comments
                self.props.deleteComment();
                _context2.next = 11;
                break;

              case 8:
                _context2.prev = 8;
                _context2.t0 = _context2['catch'](2);

                console.log('error deleting comment: ' + _context2.t0);

              case 11:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, _this2, [[2, 8]]);
      }));

      return function (_x) {
        return _ref2.apply(this, arguments);
      };
    }();

    _this.showComments = function () {
      return _this.state.comments.map(function (item) {
        var comment = item.comments;
        var user = item.users;
        var id = comment.id;
        return _react2.default.createElement(
          'div',
          { className: 'single-comment', key: id },
          _react2.default.createElement(
            'a',
            { href: '/profile/' + user.id, className: 'user' },
            _react2.default.createElement('div', { className: 'comment-pic', style: {
                backgroundImage: 'url("' + user.profile_img + '")',
                backgroundPosition: 'center center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover' } }),
            _react2.default.createElement(
              'h2',
              null,
              '' + user.fname + (user.lname == null ? "" : " ") + (user.lname == null ? "" : user.lname) + ': '
            )
          ),
          _react2.default.createElement(
            'p',
            null,
            comment.content
          ),
          _react2.default.createElement(
            'div',
            { className: 'del-btn ' + (user.id == _this.props.curuser.id ? 'active' : ''), onClick: _this.deleteComment.bind(null, id) },
            _react2.default.createElement('i', { className: 'ayn-trash' })
          )
        );
      });
    };

    _this.state = {
      comments: []
    };
    _this._isMounted = false;
    return _this;
  }

  (0, _createClass3.default)(Comments, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._isMounted = true;
      this._isMounted && this.getComments();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this._isMounted = false;
    }

    // delete the comment only if you posted it

  }, {
    key: 'render',
    value: function render() {
      if (this.props.post == undefined) {
        return _react2.default.createElement(
          'div',
          { className: 'load' },
          _react2.default.createElement('i', { className: 'ayn-spin3' })
        );
      } else {
        if (this.state.comments.length > 0) {
          return _react2.default.createElement(
            'div',
            { className: 'comments' },
            this.showComments()
          );
        } else {
          return null;
        }
      }
    }
  }]);
  return Comments;
}(_react.Component);

exports.default = Comments;

/***/ }),

/***/ 276:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = __webpack_require__(135);

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _regenerator = __webpack_require__(46);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends2 = __webpack_require__(69);

var _extends3 = _interopRequireDefault(_extends2);

var _asyncToGenerator2 = __webpack_require__(45);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = __webpack_require__(15);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(16);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(18);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(17);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(6);

var _react2 = _interopRequireDefault(_react);

var _axios = __webpack_require__(39);

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// should really generalize and save this component as an axios image uploader
// even has a preview window for the selected image file


var Compose = function (_Component) {
  (0, _inherits3.default)(Compose, _Component);

  function Compose() {
    var _this2 = this;

    (0, _classCallCheck3.default)(this, Compose);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Compose.__proto__ || Object.getPrototypeOf(Compose)).call(this));

    _this.submitPost = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
      var self, fData, _ref2, text, link, response, file, filename, type, _response;

      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              self = _this;
              // deal with just newline case

              if (!(_this.state.postContent == '\n')) {
                _context3.next = 4;
                break;
              }

              _this.setState((0, _extends3.default)({}, _this.state, {
                postContent: ''
              }));
              return _context3.abrupt('return');

            case 4:

              // get post data
              fData = new FormData();

              // check for link data and get it

              _context3.next = 7;
              return _this.checkLink();

            case 7:
              _ref2 = _context3.sent;
              text = _ref2.text;
              link = _ref2.link;

              // console.log(text)
              // console.log(link)
              if (text && link != '') {
                fData.append('link_url', _this.state.linkUrl);
                fData.append('link_title', _this.state.linkTitle);
                fData.append('link_image', _this.state.linkImage);
                fData.append('link_desc', _this.state.linkDesc);
              }

              if (!(text == '' && _this.state.linkUrl == '')) {
                _context3.next = 19;
                break;
              }

              if (!(_this.state.image == '')) {
                _context3.next = 16;
                break;
              }

              return _context3.abrupt('return');

            case 16:
              // if there is just an image append a space for the content
              fData.append('content', ' ');

            case 17:
              _context3.next = 20;
              break;

            case 19:
              if (text == '' && _this.state.linkUrl != '') {
                fData.append('content', ' ');
              } else {
                fData.append('content', text);
              }

            case 20:
              fData.append('user_id', _this.props.user.id);

              if (!(_this.state.image == '')) {
                _context3.next = 28;
                break;
              }

              fData.append('img_name', '');
              // console.log('no image')
              _context3.next = 25;
              return (0, _axios2.default)({
                method: 'post',
                url: '/posts',
                data: fData,
                headers: { 'Content-Type': 'multipart/form-data boundary=' + fData._boundary }
              }).then(function (response) {
                self.setState({
                  postContent: "",
                  image: "",
                  linkUrl: "",
                  linkTitle: "",
                  linkImage: "",
                  linkDesc: ""
                });
                // self.props.update()
                //update everyone else's feed
                var chat = self.props.ws.getSubscription('chat') || self.props.ws.subscribe('chat');
                chat.emit('message', {
                  update: 'all'
                });
                return 'item saved';
              });

            case 25:
              response = _context3.sent;
              _context3.next = 42;
              break;

            case 28:
              // there is an image or video in the post

              // disable input while image uploads - maybe add loading symbol
              document.getElementById("content").disabled = true;
              document.getElementById("content").innerText = 'Loading...';

              // get signed url from the server
              _context3.prev = 30;
              file = self.state.image;
              filename = file.name;
              type = encodeURIComponent(file.type);
              // console.log(filename)
              // console.log(type)

              _context3.next = 36;
              return _axios2.default.get('/posts/url/' + filename + '/' + type).then(function () {
                var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(response) {
                  var options;
                  return _regenerator2.default.wrap(function _callee2$(_context2) {
                    while (1) {
                      switch (_context2.prev = _context2.next) {
                        case 0:
                          // console.log('signed url: ' + response.data)

                          // upload file to s3
                          options = {
                            headers: {
                              'Content-Type': file.type
                            }
                          };

                          _axios2.default.put(response.data, file, options).then(function () {
                            var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(response) {
                              var res;
                              return _regenerator2.default.wrap(function _callee$(_context) {
                                while (1) {
                                  switch (_context.prev = _context.next) {
                                    case 0:
                                      console.log(response);

                                      // store the url in database
                                      fData.append('img_name', self.state.image.name);

                                      _context.next = 4;
                                      return (0, _axios2.default)({
                                        method: 'post',
                                        url: '/posts',
                                        data: fData,
                                        headers: { 'Content-Type': 'multipart/form-data boundary=' + fData._boundary }
                                      }).then(function () {
                                        self.setState({
                                          postContent: "",
                                          image: "",
                                          linkUrl: "",
                                          linkTitle: "",
                                          linkImage: "",
                                          linkDesc: ""
                                        });
                                        document.getElementById("content").disabled = false; // enable input again

                                        // // update the feed
                                        // self.props.update()

                                        //update everyone else's feed
                                        var chat = self.props.ws.getSubscription('chat') || self.props.ws.subscribe('chat');
                                        chat.emit('message', {
                                          update: 'all'
                                        });

                                        return 'item saved';
                                      });

                                    case 4:
                                      res = _context.sent;

                                    case 5:
                                    case 'end':
                                      return _context.stop();
                                  }
                                }
                              }, _callee, this);
                            }));

                            return function (_x2) {
                              return _ref4.apply(this, arguments);
                            };
                          }()).catch(function (err) {
                            console.log('upload failed: ' + err);
                          });

                        case 2:
                        case 'end':
                          return _context2.stop();
                      }
                    }
                  }, _callee2, this);
                }));

                return function (_x) {
                  return _ref3.apply(this, arguments);
                };
              }());

            case 36:
              _response = _context3.sent;
              _context3.next = 42;
              break;

            case 39:
              _context3.prev = 39;
              _context3.t0 = _context3['catch'](30);

              console.log("axios didnt work: " + _context3.t0);

            case 42:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, _this2, [[30, 39]]);
    }));
    _this.checkLink = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5() {
      var self, text, link, expression, regex, data, i, secureUrl;
      return _regenerator2.default.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              self = _this;
              text = ' ';
              link = '';
              expression = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
              regex = new RegExp(expression);

              if (!(_this.state.postContent.length > 0)) {
                _context5.next = 27;
                break;
              }

              data = _this.state.postContent.split(' ');
              // console.log(data)

              if (!(data.length > 0)) {
                _context5.next = 27;
                break;
              }

              i = 0;

            case 9:
              if (!(i < data.length)) {
                _context5.next = 27;
                break;
              }

              if (!data[i].match(regex)) {
                _context5.next = 22;
                break;
              }

              // found a url
              secureUrl = data[i].replace(/^http:\/\//i, 'https://'); // http to https

              _context5.prev = 12;
              _context5.next = 15;
              return _axios2.default.post( // get preview info from link metadata
              'https://api.linkpreview.net', {
                q: encodeURIComponent(secureUrl),
                key: '3f0c5b8e7b6ebf2fb7302a9eaa4c1a1a'
              }).then(function () {
                var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(resp) {
                  var secureImg;
                  return _regenerator2.default.wrap(function _callee4$(_context4) {
                    while (1) {
                      switch (_context4.prev = _context4.next) {
                        case 0:
                          // console.log(resp.data)

                          secureImg = resp.data.image.replace(/^http:\/\//i, 'https://'); // http to https

                          self.setState({
                            linkTitle: resp.data.title,
                            linkDesc: resp.data.description,
                            linkImage: secureImg,
                            linkUrl: resp.data.url
                          });
                          link = resp.data.url;

                        case 3:
                        case 'end':
                          return _context4.stop();
                      }
                    }
                  }, _callee4, this);
                }));

                return function (_x3) {
                  return _ref6.apply(this, arguments);
                };
              }());

            case 15:
              _context5.next = 20;
              break;

            case 17:
              _context5.prev = 17;
              _context5.t0 = _context5['catch'](12);

              console.log(_context5.t0);

            case 20:
              _context5.next = 24;
              break;

            case 22:
              text += data[i];
              text += ' ';

            case 24:
              i++;
              _context5.next = 9;
              break;

            case 27:
              return _context5.abrupt('return', { text: text, link: link });

            case 28:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, _this2, [[12, 17]]);
    }));

    _this.handleChange = function (event) {
      var name = event.target.name;
      var value = event.target.type == 'checkbox' ? event.target.checked : event.target.value;

      _this.setState((0, _defineProperty3.default)({}, name, value), function () {
        // console.log(this.state)
      });
    };

    _this.checkSubmit = function (event) {
      if (event.keyCode == 13) {
        event.preventDefault();
        _this.submitPost();
      }
    };

    _this.imageSelect = function (event) {
      var fileElem = document.getElementById("hidden-input");
      fileElem.click();
    };

    _this.getImage = function (event) {

      if (event.target.files[0]) {

        _this.setState((0, _extends3.default)({}, _this.state, {
          image: event.target.files[0]
        }), function () {
          // console.log(this.state)
        });
      }
    };

    _this.removeImage = function () {
      _this.setState((0, _extends3.default)({}, _this.state, {
        image: ""
      }));
    };

    _this.state = {
      postContent: '',
      image: '',
      linkUrl: '',
      linkTitle: '',
      linkImage: '',
      linkDesc: ''
    };
    return _this;
  }

  // check if a link is in the post and update it accordingly


  // allows posts to be submit with the enter key


  (0, _createClass3.default)(Compose, [{
    key: 'render',
    value: function render() {
      if (this.props.user == undefined) {
        return _react2.default.createElement(
          'div',
          { className: 'load' },
          _react2.default.createElement('i', { className: 'ayn-spin3' })
        );
      } else {
        return _react2.default.createElement(
          'section',
          { id: 'compose' },
          _react2.default.createElement('textarea', { name: 'postContent', id: 'content', cols: 30, rows: 10, placeholder: 'share something...', onChange: this.handleChange, onKeyUp: this.checkSubmit, value: this.state.postContent }),
          _react2.default.createElement('div', { className: 'user-img', style: {
              backgroundImage: 'url("' + this.props.user.profile_img + '")',
              backgroundPosition: 'center center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover' } }),
          _react2.default.createElement(
            'div',
            { className: 'photo-btn', onClick: this.imageSelect },
            _react2.default.createElement('i', { className: 'ayn-camera' }),
            _react2.default.createElement('input', { type: 'file', id: 'hidden-input', name: 'post_img', accept: 'image/png, image/jpeg, image/jpg, image/gif, video/*', onChange: this.getImage })
          ),
          _react2.default.createElement('div', { className: 'preview ' + (this.state.image == "" ? "" : "active"), onClick: this.removeImage, style: {
              backgroundImage: 'url("' + (this.state.image == "" ? "" : URL.createObjectURL(this.state.image)) + '")',
              backgroundPosition: 'center center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover' } }),
          _react2.default.createElement(
            'div',
            { className: 'send-btn', onClick: this.submitPost },
            _react2.default.createElement('i', { className: 'ayn-right' })
          )
        );
      }
    }
  }]);
  return Compose;
}(_react.Component);

exports.default = Compose;

/***/ }),

/***/ 277:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = __webpack_require__(15);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(16);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(18);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(17);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(6);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(24);

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Modal = function (_React$Component) {
  (0, _inherits3.default)(Modal, _React$Component);

  function Modal() {
    (0, _classCallCheck3.default)(this, Modal);
    return (0, _possibleConstructorReturn3.default)(this, (Modal.__proto__ || Object.getPrototypeOf(Modal)).apply(this, arguments));
  }

  (0, _createClass3.default)(Modal, [{
    key: 'render',
    value: function render() {
      // Render nothing if the "show" prop is false
      if (!this.props.show) {
        return null;
      }

      // The gray background
      var backdropStyle = {
        position: 'fixed',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0,0,0,0.3)',
        padding: '100px'
      };

      // The modal "window"
      var modalStyle = {
        backgroundColor: '#fff',
        borderRadius: '5px',
        maxWidth: '1400px',
        minHeight: '300px',
        margin: '0 auto',
        padding: '30px'
      };

      return _react2.default.createElement(
        'div',
        { className: 'backdrop', style: { backdropStyle: backdropStyle }, onClick: this.props.onClose },
        _react2.default.createElement(
          'div',
          { className: 'modal', style: { modalStyle: modalStyle } },
          this.props.children,
          _react2.default.createElement('div', { className: 'footer' })
        )
      );
    }
  }]);
  return Modal;
}(_react2.default.Component);

Modal.propTypes = {
  onClose: _propTypes2.default.func.isRequired,
  show: _propTypes2.default.bool,
  children: _propTypes2.default.node
};

exports.default = Modal;

/***/ }),

/***/ 278:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = __webpack_require__(488);

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _classCallCheck2 = __webpack_require__(15);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(16);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(18);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(17);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(6);

var _react2 = _interopRequireDefault(_react);

var _Post = __webpack_require__(168);

var _Post2 = _interopRequireDefault(_Post);

var _axios = __webpack_require__(39);

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PostArea = function (_Component) {
  (0, _inherits3.default)(PostArea, _Component);

  function PostArea() {
    (0, _classCallCheck3.default)(this, PostArea);

    var _this = (0, _possibleConstructorReturn3.default)(this, (PostArea.__proto__ || Object.getPrototypeOf(PostArea)).call(this));

    _this.handleObserver = function (entities, observer) {
      if (_this.state.page == _this.state.lastPage) {
        return;
      }
      var y = entities[0].boundingClientRect.y;
      if (_this.state.prevY > y) {
        console.log('bottom');
        _this.getNextPage();
      }
      _this._isMounted && _this.setState({ prevY: y });
    };

    _this.getNextPage = function () {
      var self = _this;

      _this._isFetching = true;
      try {
        _axios2.default.get('/posts/page/' + (_this.state.page + 1)).then(function (res) {
          if (self._isMounted) {
            self.setState({
              total: res.data.total,
              perPage: res.data.perPage,
              lastPage: res.data.lastPage,
              posts: [].concat((0, _toConsumableArray3.default)(_this.state.posts), (0, _toConsumableArray3.default)(res.data.data)),
              page: _this.state.page + 1,
              showBtn: true
            });
            _this._isFetching = false;
          }
        });
      } catch (error) {
        console.log("error fetching next page: " + error);
      }
    };

    _this.getNew = function () {
      var self = _this;

      if (_this._isFetching) {
        // deal with race condition
        return;
      }

      _this._isFetching = true;
      try {
        _axios2.default.get('/posts/new/' + _this.state.posts[0].id).then(function (res) {
          console.log(res);
          var diff = res.data.length;
          var newTotal = _this.state.total + diff;
          var newLast = Math.ceil(newTotal / _this.state.perPage);
          var newPage = Math.round(diff / _this.state.perPage) + _this.state.page;

          _this._isMounted && self.setState({
            total: newTotal,
            lastPage: newLast,
            posts: [].concat((0, _toConsumableArray3.default)(res.data), (0, _toConsumableArray3.default)(_this.state.posts)),
            page: newPage
          });
          _this._isFetching = false;
        });
      } catch (error) {
        console.log("error fetching next page: " + error);
      }
    };

    _this.removePost = function (id) {
      var newPosts = _this.state.posts.filter(function (post) {
        return post.id != id;
      });
      var newTotal = _this.state.total - 1;
      var newLast = Math.ceil(newTotal / _this.state.perPage);
      _this._isMounted && _this.setState({
        total: _this.state.total - 1,
        lastPage: newLast,
        posts: newPosts
      });
    };

    _this.scrollUp = function () {
      document.querySelector('#scroll-this').scrollTop = 0;
      // this.setState({showBtn: false})
    };

    _this.state = {
      total: 0,
      perPage: 20,
      lastPage: 100,
      page: 1,
      posts: [],
      prevY: 0,
      showBtn: false
    };
    _this._isMounted = false;
    _this._isFetching = false;
    _this.loadingRef = _react2.default.createRef();
    return _this;
  }

  (0, _createClass3.default)(PostArea, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      var self = this;
      this._isMounted = true;
      this._isFetching = true;
      try {
        _axios2.default.get('/posts/page/1').then(function (res) {
          if (self._isMounted) {
            self.setState({
              total: res.data.total,
              perPage: res.data.perPage,
              lastPage: res.data.lastPage,
              posts: res.data.data
            });
            _this2._isFetching = false;
          }
        });
      } catch (error) {
        console.log("error fetching next page: " + error);
      }

      // intersection observer setup
      var options = {
        root: document.querySelector("#scroll-this"),
        rootMargin: '0px',
        threshold: 1.0
        // make observer
      };this.observer = new IntersectionObserver(this.handleObserver, //callback
      options);
      // observe the `loadingRef`
      if (this.loadingRef.current) {
        this.observer.observe(this.loadingRef.current);
        console.log('observing');
      }
    }

    // observer code to fetch more stuff

  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this._isMounted = false;
    }

    // fetch next page of results


    // gets all new posts when someone else posts


    // for when a post is deleted


    // scroll to top

  }, {
    key: 'render',


    // make sure posts have sa
    // uniqueId = () => {
    //   return (Math.random().toString(36) + '00000000000000000').slice(2, 10);
    // }


    value: function render() {
      var _this3 = this;

      if (this.state.posts == undefined) {
        return _react2.default.createElement(
          'div',
          { className: 'load' },
          _react2.default.createElement('i', { className: 'ayn-spin3' })
        );
      } else {
        return _react2.default.createElement(
          'section',
          { id: 'all-posts' },
          _react2.default.createElement(
            'div',
            { className: 'post-container' },
            _react2.default.createElement(
              'div',
              { className: 'scrollUpBtn ' + (this.state.showBtn ? 'active' : ''), onClick: this.scrollUp },
              'top'
            ),
            this.state.posts.map(function (post) {

              return _react2.default.createElement(_Post2.default, { post: post, ws: _this3.props.ws, curuser: _this3.props.user, update: _this3.getNew, removePost: _this3.removePost, key: post.id });
            }),
            _react2.default.createElement(
              'div',
              { ref: this.loadingRef, style: { height: '100px', margin: '30px', color: '#94c4d4' } },
              _react2.default.createElement(
                'span',
                { style: { display: this._isFetching ? 'block' : 'none' } },
                this.state.page != this.state.lastPage ? 'Loading...' : 'No more posts!'
              )
            )
          )
        );
      }
    }
  }]);
  return PostArea;
}(_react.Component);

exports.default = PostArea;

/***/ }),

/***/ 279:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _regenerator = __webpack_require__(46);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(45);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = __webpack_require__(15);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(16);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(18);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(17);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(6);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(64);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRouterDom = __webpack_require__(255);

var _axios = __webpack_require__(39);

var _axios2 = _interopRequireDefault(_axios);

var _Home = __webpack_require__(247);

var _Home2 = _interopRequireDefault(_Home);

var _Profile = __webpack_require__(251);

var _Profile2 = _interopRequireDefault(_Profile);

var _LeftMenu = __webpack_require__(248);

var _LeftMenu2 = _interopRequireDefault(_LeftMenu);

var _Messenger = __webpack_require__(250);

var _Messenger2 = _interopRequireDefault(_Messenger);

var _SearchHeader = __webpack_require__(252);

var _SearchHeader2 = _interopRequireDefault(_SearchHeader);

var _Loading = __webpack_require__(249);

var _Loading2 = _interopRequireDefault(_Loading);

var _websocketClient = __webpack_require__(246);

var _websocketClient2 = _interopRequireDefault(_websocketClient);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Layout = function (_Component) {
  (0, _inherits3.default)(Layout, _Component);

  function Layout() {
    (0, _classCallCheck3.default)(this, Layout);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Layout.__proto__ || Object.getPrototypeOf(Layout)).call(this));

    _this.startChat = function () {
      var self = _this;

      _this.ws.connect();
      _this.chat = _this.ws.getSubscription('chat') || _this.ws.subscribe('chat');
      // reconnect function doesnt work
      // this.ws.on('close', function() {
      //   self.retry = setInterval(() => {
      //     console.log('attempting to reconnect every 10 seconds')
      //     self.ws = null
      //     self.ws = Ws()
      //     self.ws.on('open', () => {
      //       self.ws.connect()
      //       self.chat = self.ws.getSubscription('chat') || self.ws.subscribe('chat')
      //       self.chat.on('ready', () => {
      //         clearInterval(self.retry)
      //         self.retry = null
      //       })
      //     })
      //   }, 10000);
      // })
    };

    _this.closeNotify = function () {
      document.getElementsByClassName('notify')[0].classList.remove('active');
    };

    _this.state = {
      user: {}
    };

    _this.retry = null;

    _this.homeRef = _react2.default.createRef();

    _this.ws = (0, _websocketClient2.default)();
    return _this;
  }

  // hook up to the websockets


  (0, _createClass3.default)(Layout, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var self = this;
      var getUser = function () {
        var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
          var user;
          return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.prev = 0;
                  _context.next = 3;
                  return _axios2.default.get('/api/authuser');

                case 3:
                  user = _context.sent;


                  self.setState({
                    user: user.data
                  });
                  _context.next = 10;
                  break;

                case 7:
                  _context.prev = 7;
                  _context.t0 = _context['catch'](0);

                  console.log("Initialization error: " + _context.t0);

                case 10:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, this, [[0, 7]]);
        }));

        return function getUser() {
          return _ref.apply(this, arguments);
        };
      }();

      this.startChat();
      getUser();

      setTimeout(this.closeNotify, 3000); // notification bar stays for 3 seconds
    }

    // get rid of notification bar

  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.ws.close();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        _reactRouterDom.BrowserRouter,
        null,
        _react2.default.createElement(
          'div',
          { className: 'app-container home-page' },
          _react2.default.createElement(_Loading2.default, { active: this.state.user != undefined ? "" : 'active' }),
          _react2.default.createElement(_LeftMenu2.default, { user: this.state.user, ws: this.ws }),
          _react2.default.createElement(
            'section',
            { id: 'content-container' },
            _react2.default.createElement(_SearchHeader2.default, null),
            _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/', component: function component(props) {
                return _react2.default.createElement(_Home2.default, { routeProps: props, user: _this2.state.user, ws: _this2.ws, ref: _this2.homeRef, single: false });
              } }),
            _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/post/:id', component: function component(props) {
                return _react2.default.createElement(_Home2.default, { routeProps: props, user: _this2.state.user, ws: _this2.ws, ref: _this2.homeRef, single: true });
              } }),
            _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/profile/:id', component: function component(props) {
                return _react2.default.createElement(_Profile2.default, { routeProps: props, user: _this2.state.user });
              } })
          ),
          _react2.default.createElement(_Messenger2.default, { user: this.state.user, ws: this.ws })
        )
      );
    }
  }]);
  return Layout;
}(_react.Component);

var app = document.getElementById('app');

_reactDom2.default.render(_react2.default.createElement(Layout, null), app);

/***/ })

},[279]);