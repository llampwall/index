webpackJsonp([0],{

/***/ 297:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = __webpack_require__(330);

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _regenerator = __webpack_require__(191);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(190);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = __webpack_require__(48);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(49);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(51);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(50);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(36);

var _react2 = _interopRequireDefault(_react);

var _axios = __webpack_require__(126);

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Compose = function (_Component) {
  (0, _inherits3.default)(Compose, _Component);

  function Compose() {
    var _this2 = this;

    (0, _classCallCheck3.default)(this, Compose);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Compose.__proto__ || Object.getPrototypeOf(Compose)).call(this));

    _this.submitPost = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return _axios2.default.post('/posts', {
                user_id: _this.props.initialData.userData.id,
                content: _this.state.postContent,
                image_url: 'img/webdesign.jpg',
                type: 'image'
              });

            case 3:
              document.getElementById('content').value = "";
              return _context.abrupt('return', 'item saved');

            case 7:
              _context.prev = 7;
              _context.t0 = _context['catch'](0);

              console.log("axios didnt work: " + _context.t0);

            case 10:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this2, [[0, 7]]);
    }));

    _this.handleChange = function (event) {
      var name = event.target.name;
      var value = event.target.type == 'checkbox' ? event.target.checked : event.target.value;

      _this.setState((0, _defineProperty3.default)({}, name, value), function () {
        console.log(_this.state);
      });
    };

    _this.state = {};
    return _this;
  }

  (0, _createClass3.default)(Compose, [{
    key: 'render',
    value: function render() {
      if (this.props.initialData.userData == undefined) {
        return _react2.default.createElement(
          'div',
          null,
          'Loading...'
        );
      } else {
        return _react2.default.createElement(
          'section',
          { id: 'compose' },
          _react2.default.createElement('textarea', { name: 'postContent', id: 'content', cols: 30, rows: 10, placeholder: 'share something...', defaultValue: "", onChange: this.handleChange, value: this.state.postContent }),
          _react2.default.createElement('div', { className: 'user-img', style: {
              backgroundImage: 'url("' + this.props.initialData.userData.profile_img + '")',
              backgroundPosition: 'center center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover' } }),
          _react2.default.createElement(
            'div',
            { className: 'photo-btn' },
            _react2.default.createElement('i', { className: 'fa fa-camera' })
          ),
          _react2.default.createElement(
            'div',
            { className: 'video-btn' },
            _react2.default.createElement('i', { className: 'fa fa-youtube' })
          ),
          _react2.default.createElement(
            'div',
            { className: 'send-btn', onClick: this.submitPost },
            _react2.default.createElement('i', { className: 'fa fa-arrow-right' })
          )
        );
      }
    }
  }]);
  return Compose;
}(_react.Component);

exports.default = Compose;

/***/ }),

/***/ 298:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = __webpack_require__(48);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(49);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(51);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(50);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(36);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LeftMenu = function (_Component) {
  (0, _inherits3.default)(LeftMenu, _Component);

  function LeftMenu() {
    (0, _classCallCheck3.default)(this, LeftMenu);

    var _this = (0, _possibleConstructorReturn3.default)(this, (LeftMenu.__proto__ || Object.getPrototypeOf(LeftMenu)).call(this));

    _this.clickedDropDown = function () {
      _this.setState({
        dropdown: !_this.state.dropdown
      });
    };

    _this.state = {
      dropdown: false
    };
    return _this;
  }

  (0, _createClass3.default)(LeftMenu, [{
    key: "render",
    value: function render() {
      if (this.props.initialData.userData == undefined) {
        return _react2.default.createElement(
          "div",
          null,
          "Loading..."
        );
      } else {
        // console.log(this.props.initialData.userData)
        var _props$initialData$us = this.props.initialData.userData,
            fname = _props$initialData$us.fname,
            lname = _props$initialData$us.lname;

        return _react2.default.createElement(
          "section",
          { id: "left-menu" },
          _react2.default.createElement(
            "div",
            { className: "account-dropdown", onClick: this.clickedDropDown },
            _react2.default.createElement(
              "div",
              { className: "logo" },
              _react2.default.createElement("i", { className: "fa fa-archive" })
            ),
            _react2.default.createElement(
              "div",
              { className: "username" },
              fname + "_" + lname
            ),
            _react2.default.createElement(
              "div",
              { className: "icon-down" },
              _react2.default.createElement("i", { className: "fa fa-sort-down" })
            )
          ),
          _react2.default.createElement(
            "div",
            { className: "dropdown " + (this.state.dropdown ? 'active' : '') },
            _react2.default.createElement(
              "nav",
              null,
              _react2.default.createElement(
                "a",
                { href: "/profile" },
                "+ profile +"
              ),
              _react2.default.createElement(
                "a",
                { href: "/account" },
                "* account *"
              ),
              _react2.default.createElement(
                "a",
                { href: "/logout" },
                "- logout -"
              )
            )
          ),
          _react2.default.createElement(
            "div",
            { className: "groups" },
            _react2.default.createElement(
              "div",
              { className: "title" },
              "_usr"
            ),
            _react2.default.createElement(
              "ul",
              null,
              _react2.default.createElement(
                "li",
                null,
                "bio"
              ),
              _react2.default.createElement(
                "li",
                null,
                "work"
              ),
              _react2.default.createElement(
                "li",
                null,
                "media"
              )
            )
          ),
          _react2.default.createElement(
            "div",
            { className: "groups" },
            _react2.default.createElement(
              "div",
              { className: "title" },
              "_groups"
            ),
            _react2.default.createElement(
              "ul",
              null,
              _react2.default.createElement(
                "li",
                null,
                "software"
              ),
              _react2.default.createElement(
                "li",
                null,
                "photography"
              ),
              _react2.default.createElement(
                "li",
                null,
                "design"
              )
            )
          ),
          _react2.default.createElement(
            "a",
            { href: "/logout", className: "logout" },
            "logout ",
            _react2.default.createElement("i", { className: "fa fa-trash" })
          )
        );
      }
    }
  }]);
  return LeftMenu;
}(_react.Component);

exports.default = LeftMenu;

/***/ }),

/***/ 299:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = __webpack_require__(48);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(49);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(51);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(50);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(36);

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
        _react2.default.createElement(
          "div",
          { className: "loadingio-spinner-ball-u501e4ya8ji" },
          _react2.default.createElement(
            "div",
            { className: "ldio-vn3lighz4w" },
            _react2.default.createElement("div", null)
          )
        )
      );
    }
  }]);
  return Loading;
}(_react.Component);

exports.default = Loading;

/***/ }),

/***/ 300:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = __webpack_require__(48);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(49);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(51);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(50);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(36);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Messenger = function (_Component) {
  (0, _inherits3.default)(Messenger, _Component);

  function Messenger() {
    (0, _classCallCheck3.default)(this, Messenger);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Messenger.__proto__ || Object.getPrototypeOf(Messenger)).call(this));

    _this.state = {};
    return _this;
  }

  (0, _createClass3.default)(Messenger, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        "section",
        { id: "messenger" },
        _react2.default.createElement(
          "div",
          { className: "messenger-header" },
          _react2.default.createElement(
            "div",
            { className: "messenger-icon" },
            _react2.default.createElement("i", { className: "fa fa-paper-plane" })
          ),
          _react2.default.createElement(
            "div",
            { className: "title" },
            "\\connect"
          ),
          _react2.default.createElement(
            "div",
            { className: "options-icon" },
            _react2.default.createElement("i", { className: "fa fa-ellipsis-v" })
          )
        ),
        _react2.default.createElement(
          "div",
          { className: "users" },
          _react2.default.createElement(
            "div",
            { className: "user" },
            _react2.default.createElement("div", { className: "user-img" }),
            _react2.default.createElement(
              "div",
              { className: "username" },
              "Eric Schmidt"
            ),
            _react2.default.createElement(
              "div",
              { className: "message-icon" },
              _react2.default.createElement("i", { className: "fa fa-comment" })
            )
          ),
          _react2.default.createElement(
            "div",
            { className: "user" },
            _react2.default.createElement("div", { className: "user-img" }),
            _react2.default.createElement(
              "div",
              { className: "username" },
              "Louis Verdes"
            ),
            _react2.default.createElement(
              "div",
              { className: "message-icon" },
              _react2.default.createElement("i", { className: "fa fa-comment" })
            )
          ),
          _react2.default.createElement(
            "div",
            { className: "user" },
            _react2.default.createElement("div", { className: "user-img" }),
            _react2.default.createElement(
              "div",
              { className: "username" },
              "Caroline Logan"
            ),
            _react2.default.createElement(
              "div",
              { className: "message-icon" },
              _react2.default.createElement("i", { className: "fa fa-comment" })
            )
          ),
          _react2.default.createElement(
            "div",
            { className: "user" },
            _react2.default.createElement("div", { className: "user-img" }),
            _react2.default.createElement(
              "div",
              { className: "username" },
              "Shawn Ramsey"
            ),
            _react2.default.createElement(
              "div",
              { className: "message-icon" },
              _react2.default.createElement("i", { className: "fa fa-comment" })
            )
          ),
          _react2.default.createElement(
            "div",
            { className: "user" },
            _react2.default.createElement("div", { className: "user-img" }),
            _react2.default.createElement(
              "div",
              { className: "username" },
              "Eric Schmidt"
            ),
            _react2.default.createElement(
              "div",
              { className: "message-icon" },
              _react2.default.createElement("i", { className: "fa fa-comment" })
            )
          ),
          _react2.default.createElement(
            "div",
            { className: "user" },
            _react2.default.createElement("div", { className: "user-img" }),
            _react2.default.createElement(
              "div",
              { className: "username" },
              "Louis Verdes"
            ),
            _react2.default.createElement(
              "div",
              { className: "message-icon" },
              _react2.default.createElement("i", { className: "fa fa-comment" })
            )
          ),
          _react2.default.createElement(
            "div",
            { className: "user" },
            _react2.default.createElement("div", { className: "user-img" }),
            _react2.default.createElement(
              "div",
              { className: "username" },
              "Caroline Logan"
            ),
            _react2.default.createElement(
              "div",
              { className: "message-icon" },
              _react2.default.createElement("i", { className: "fa fa-comment" })
            )
          ),
          _react2.default.createElement(
            "div",
            { className: "user" },
            _react2.default.createElement("div", { className: "user-img" }),
            _react2.default.createElement(
              "div",
              { className: "username" },
              "Shawn Ramsey"
            ),
            _react2.default.createElement(
              "div",
              { className: "message-icon" },
              _react2.default.createElement("i", { className: "fa fa-comment" })
            )
          ),
          _react2.default.createElement(
            "div",
            { className: "user" },
            _react2.default.createElement("div", { className: "user-img" }),
            _react2.default.createElement(
              "div",
              { className: "username" },
              "Eric Schmidt"
            ),
            _react2.default.createElement(
              "div",
              { className: "message-icon" },
              _react2.default.createElement("i", { className: "fa fa-comment" })
            )
          ),
          _react2.default.createElement(
            "div",
            { className: "user" },
            _react2.default.createElement("div", { className: "user-img" }),
            _react2.default.createElement(
              "div",
              { className: "username" },
              "Louis Verdes"
            ),
            _react2.default.createElement(
              "div",
              { className: "message-icon" },
              _react2.default.createElement("i", { className: "fa fa-comment" })
            )
          ),
          _react2.default.createElement(
            "div",
            { className: "user" },
            _react2.default.createElement("div", { className: "user-img" }),
            _react2.default.createElement(
              "div",
              { className: "username" },
              "Caroline Logan"
            ),
            _react2.default.createElement(
              "div",
              { className: "message-icon" },
              _react2.default.createElement("i", { className: "fa fa-comment" })
            )
          ),
          _react2.default.createElement(
            "div",
            { className: "user" },
            _react2.default.createElement("div", { className: "user-img" }),
            _react2.default.createElement(
              "div",
              { className: "username" },
              "Shawn Ramsey"
            ),
            _react2.default.createElement(
              "div",
              { className: "message-icon" },
              _react2.default.createElement("i", { className: "fa fa-comment" })
            )
          )
        ),
        _react2.default.createElement(
          "div",
          { className: "search" },
          _react2.default.createElement("i", { className: "fa fa-search" }),
          _react2.default.createElement("input", { type: "text", name: "friendSearch", placeholder: "search..." })
        )
      );
    }
  }]);
  return Messenger;
}(_react.Component);

exports.default = Messenger;

/***/ }),

/***/ 301:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = __webpack_require__(48);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(49);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(51);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(50);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(36);

var _react2 = _interopRequireDefault(_react);

var _Post = __webpack_require__(323);

var _Post2 = _interopRequireDefault(_Post);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PostArea = function (_Component) {
  (0, _inherits3.default)(PostArea, _Component);

  function PostArea() {
    (0, _classCallCheck3.default)(this, PostArea);

    var _this = (0, _possibleConstructorReturn3.default)(this, (PostArea.__proto__ || Object.getPrototypeOf(PostArea)).call(this));

    _this.showMyPosts = function () {
      console.log(_this.props.initialData.postData);
      return _this.props.initialData.postData.map(function (post, i) {
        return _react2.default.createElement(_Post2.default, { post: post });
      });
    };

    _this.state = {
      posts: []
    };
    return _this;
  }

  // componentDidMount() {
  //   this.setState({
  //     posts: this.props.posts
  //   })
  // }

  // must be async so it must be moved to componentwillmount or useeffect
  // also must be modified so it shows the posts of you and all of your friends
  // showLatestPostFeed() {
  //   const latestPosts = await Database
  //     .from('posts').where('user_id', auth.user.id).forPage(1,10)

  //   return (
  //     latestPosts.map((post, i) => {
  //       return <Post post={post} /> 
  //     })
  //   )
  // }

  (0, _createClass3.default)(PostArea, [{
    key: 'render',
    value: function render() {
      if (this.props.initialData.userData == undefined) {
        return _react2.default.createElement(
          'div',
          null,
          'Loading...'
        );
      } else {
        return _react2.default.createElement(
          'section',
          { id: 'all-posts' },
          _react2.default.createElement(
            'div',
            { className: 'post-container' },
            this.showMyPosts()
          )
        );
      }
    }
  }]);
  return PostArea;
}(_react.Component);

exports.default = PostArea;

/***/ }),

/***/ 302:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = __webpack_require__(48);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(49);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(51);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(50);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(36);

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
                _react2.default.createElement("div", { className: "nothing" }),
                _react2.default.createElement(
                    "div",
                    { className: "search" },
                    _react2.default.createElement("input", { type: "text", name: "search", placeholder: "search..." })
                ),
                _react2.default.createElement(
                    "div",
                    { className: "icons" },
                    _react2.default.createElement("i", { className: "fa fa-bell" }),
                    _react2.default.createElement("i", { className: "fa fa-comment" }),
                    _react2.default.createElement("i", { className: "fa fa-user" })
                )
            );
        }
    }]);
    return SearchHeader;
}(_react.Component);

exports.default = SearchHeader;

/***/ }),

/***/ 323:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = __webpack_require__(48);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(49);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(51);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(50);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(36);

var _react2 = _interopRequireDefault(_react);

var _axios = __webpack_require__(126);

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Post = function (_Component) {
    (0, _inherits3.default)(Post, _Component);

    function Post() {
        (0, _classCallCheck3.default)(this, Post);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Post.__proto__ || Object.getPrototypeOf(Post)).call(this));

        _this.state = {
            post: {},
            poster: {}
        };
        return _this;
    }

    //   componentDidMount() {
    //     const self = this;
    //     const getPoster = async function() {
    //         try {
    //             const data = await axios.get('/api/intialize')
    //             const allData = data.data
    //             // console.log(allData)

    //             self.setState({
    //                 initialData: allData
    //             }, () => {
    //                 console.log(self.state.initialData)
    //             })
    //             } catch (error) {
    //                 console.log("This it? " + error)
    //             }
    //     }
    //   }

    (0, _createClass3.default)(Post, [{
        key: 'render',
        value: function render() {
            if (this.props.post == undefined) {
                return _react2.default.createElement(
                    'div',
                    null,
                    'Loading...'
                );
            } else {
                console.log(this.props.post);
                return _react2.default.createElement(
                    'div',
                    { className: 'post' },
                    _react2.default.createElement(
                        'div',
                        { className: 'post-header' },
                        _react2.default.createElement(
                            'div',
                            { className: 'author' },
                            _react2.default.createElement('div', { className: 'user-img', style: {
                                    backgroundImage: 'url("' + this.props.post.profile_img + '")',
                                    backgroundPosition: 'center center',
                                    backgroundRepeat: 'no-repeat',
                                    backgroundSize: 'cover' } }),
                            _react2.default.createElement(
                                'a',
                                { href: '#', className: 'username' },
                                this.props.post.fname,
                                ' ',
                                this.props.post.lname
                            ),
                            _react2.default.createElement(
                                'span',
                                { className: 'text' },
                                'shared ',
                                this.props.post.type == 'image' ? 'an image' : 'something'
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'time' },
                            '43 min'
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'post-media' },
                        _react2.default.createElement('img', { src: this.props.post.image_url })
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'post-info' },
                        _react2.default.createElement(
                            'h3',
                            { className: 'title' },
                            'How to Become a Web Developer in 2020'
                        ),
                        _react2.default.createElement(
                            'p',
                            null,
                            this.props.post.content
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'post-stats' },
                        _react2.default.createElement(
                            'div',
                            { className: 'icons' },
                            _react2.default.createElement('i', { className: 'fa fa-grin-alt' }),
                            _react2.default.createElement('i', { className: 'fa fa-thumbs-up' })
                        ),
                        _react2.default.createElement(
                            'span',
                            { className: 'text' },
                            'Sarah Jane and 23 others liked this post.'
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'comment-count' },
                            '4 comments'
                        )
                    ),
                    _react2.default.createElement('textarea', { name: 'comment', cols: 30, rows: 2, placeholder: 'write a comment...', defaultValue: "" }),
                    _react2.default.createElement(
                        'div',
                        { className: 'buttons' },
                        _react2.default.createElement(
                            'div',
                            { className: 'send-btn' },
                            _react2.default.createElement('i', { className: 'fa fa-arrow-right' })
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'share-btn' },
                            _react2.default.createElement('i', { className: 'fa fa-share' })
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'like-btn' },
                            _react2.default.createElement('i', { className: 'fa fa-thumbs-up' })
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

/***/ 324:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _regenerator = __webpack_require__(191);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(190);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = __webpack_require__(48);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(49);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(51);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(50);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(36);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(127);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _axios = __webpack_require__(126);

var _axios2 = _interopRequireDefault(_axios);

var _LeftMenu = __webpack_require__(298);

var _LeftMenu2 = _interopRequireDefault(_LeftMenu);

var _Messenger = __webpack_require__(300);

var _Messenger2 = _interopRequireDefault(_Messenger);

var _SearchHeader = __webpack_require__(302);

var _SearchHeader2 = _interopRequireDefault(_SearchHeader);

var _PostArea = __webpack_require__(301);

var _PostArea2 = _interopRequireDefault(_PostArea);

var _Compose = __webpack_require__(297);

var _Compose2 = _interopRequireDefault(_Compose);

var _Loading = __webpack_require__(299);

var _Loading2 = _interopRequireDefault(_Loading);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Layout = function (_Component) {
  (0, _inherits3.default)(Layout, _Component);

  function Layout() {
    (0, _classCallCheck3.default)(this, Layout);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Layout.__proto__ || Object.getPrototypeOf(Layout)).call(this));

    _this.state = {
      initialData: {}
    };
    return _this;
  }

  (0, _createClass3.default)(Layout, [{
    key: 'componentWillMount',
    value: function componentWillMount() {

      var self = this;
      var getUser = function () {
        var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
          var data, allData;
          return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.prev = 0;
                  _context.next = 3;
                  return _axios2.default.get('/api/intialize');

                case 3:
                  data = _context.sent;
                  allData = data.data;

                  console.log(allData);

                  self.setState({
                    initialData: allData
                  }, function () {
                    console.log(self.state.initialData);
                  });
                  _context.next = 12;
                  break;

                case 9:
                  _context.prev = 9;
                  _context.t0 = _context['catch'](0);

                  console.log("This it? " + _context.t0);

                case 12:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, this, [[0, 9]]);
        }));

        return function getUser() {
          return _ref.apply(this, arguments);
        };
      }();

      getUser();
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'app-container home-page' },
        _react2.default.createElement(_Loading2.default, { active: this.state.initialData != undefined ? "" : 'active' }),
        _react2.default.createElement(_LeftMenu2.default, { initialData: this.state.initialData }),
        _react2.default.createElement(
          'section',
          { id: 'content-container' },
          _react2.default.createElement(_SearchHeader2.default, null),
          _react2.default.createElement(
            'div',
            { className: 'content-area' },
            _react2.default.createElement(_Compose2.default, { initialData: this.state.initialData }),
            _react2.default.createElement(_PostArea2.default, { initialData: this.state.initialData })
          )
        ),
        _react2.default.createElement(_Messenger2.default, { initialData: this.state.initialData })
      );
    }
  }]);
  return Layout;
}(_react.Component);

var app = document.getElementById('app');

_reactDom2.default.render(_react2.default.createElement(Layout, null), app);

/***/ })

},[324]);