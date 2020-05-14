webpackJsonp([0],{

/***/ 240:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__(50);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(49);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = __webpack_require__(19);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(20);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(22);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(21);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(6);

var _react2 = _interopRequireDefault(_react);

var _axios = __webpack_require__(43);

var _axios2 = _interopRequireDefault(_axios);

var _PostArea = __webpack_require__(272);

var _PostArea2 = _interopRequireDefault(_PostArea);

var _Compose = __webpack_require__(270);

var _Compose2 = _interopRequireDefault(_Compose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Handles updating the postarea when its sibling compose adds a post to the database


var Home = function (_Component) {
  (0, _inherits3.default)(Home, _Component);

  function Home() {
    var _this2 = this;

    (0, _classCallCheck3.default)(this, Home);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Home.__proto__ || Object.getPrototypeOf(Home)).call(this));

    _this.update = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
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
              // console.log(allData)

              _this.setState({
                initialData: allData
              }, function () {
                // console.log(this.state.initialData)
              });
              _context.next = 11;
              break;

            case 8:
              _context.prev = 8;
              _context.t0 = _context['catch'](0);

              console.log("Initialization error: " + _context.t0);

            case 11:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this2, [[0, 8]]);
    }));

    _this.state = {
      initialData: {}
    };
    return _this;
  }

  (0, _createClass3.default)(Home, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      // console.log(this.props)
      this.setState({
        initialData: this.props.initialData
      }, function () {
        // console.log(this.state)
      });
    }

    // pass down function to pass down to compose so it can update the whole area

  }, {
    key: 'render',
    value: function render() {
      if (this.props.initialData == undefined) {
        return _react2.default.createElement(
          'div',
          { 'class': 'load' },
          _react2.default.createElement('i', { className: 'ayn-spin3' })
        );
      } else {
        // console.log(this.props)
        return _react2.default.createElement(
          'div',
          { className: 'content-area' },
          _react2.default.createElement(_Compose2.default, { initialData: this.state.initialData, update: this.update }),
          _react2.default.createElement(_PostArea2.default, { routeProps: this.props.routeProps, initialData: this.state.initialData, update: this.update })
        );
      }
    }
  }]);
  return Home;
}(_react.Component);

exports.default = Home;

/***/ }),

/***/ 241:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = __webpack_require__(77);

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = __webpack_require__(19);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(20);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(22);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(21);

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
      if (this.props.initialData.userData == undefined) {
        return _react2.default.createElement(
          'div',
          { className: 'load' },
          _react2.default.createElement('i', { className: 'ayn-spin3' })
        );
      } else {
        // console.log(this.props.initialData.userData)
        var _props$initialData$us = this.props.initialData.userData,
            fname = _props$initialData$us.fname,
            lname = _props$initialData$us.lname;

        return _react2.default.createElement(
          'section',
          { id: 'left-menu', className: this.state.open ? "open" : "closed" },
          _react2.default.createElement(
            'div',
            { className: 'account-dropdown', onClick: this.clickedDropDown },
            _react2.default.createElement(
              'div',
              { className: 'username' },
              '[: ' + fname + ' ' + lname + ' :]'
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'dropdown ' + (this.state.dropdown ? 'active' : '') },
            _react2.default.createElement(
              'nav',
              null,
              _react2.default.createElement(
                'a',
                { href: '/profile/' + this.props.initialData.userData.id },
                '+ profile +'
              ),
              _react2.default.createElement(
                'a',
                { href: '/settings/' + this.props.initialData.userData.id },
                '* settings *'
              ),
              _react2.default.createElement(
                'a',
                { href: '/logout' },
                '- logout -'
              )
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
            'a',
            { href: '/logout', className: 'logout' },
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

/***/ 242:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = __webpack_require__(19);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(20);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(22);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(21);

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

/***/ 243:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__(50);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(49);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _extends2 = __webpack_require__(77);

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = __webpack_require__(19);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(20);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(22);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(21);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(6);

var _react2 = _interopRequireDefault(_react);

var _axios = __webpack_require__(43);

var _axios2 = _interopRequireDefault(_axios);

var _ChatWindow = __webpack_require__(268);

var _ChatWindow2 = _interopRequireDefault(_ChatWindow);

var _websocketClient = __webpack_require__(157);

var _websocketClient2 = _interopRequireDefault(_websocketClient);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Messenger = function (_Component) {
  (0, _inherits3.default)(Messenger, _Component);

  function Messenger() {
    var _this2 = this;

    (0, _classCallCheck3.default)(this, Messenger);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Messenger.__proto__ || Object.getPrototypeOf(Messenger)).call(this));

    _this.clickedOpen = function () {
      _this.setState((0, _extends3.default)({}, _this.state, {
        open: !_this.state.open
      }));
    };

    _this.startChat = function () {
      // connect to main chat
      _this.ws.connect();
      _this.chat = _this.ws.subscribe('chat');

      // send login
      _this.chat.on('ready', function () {
        _this.setState((0, _extends3.default)({}, _this.state, {
          connected: true
        }));
        console.log('connected');
      });

      _this.chat.on('error', function (error) {
        console.log(error);
      });

      _this.chat.on('close', function () {
        _this.setState((0, _extends3.default)({}, _this.state, {
          connected: false
        }));
        console.log('disconnected');
      });

      _this.chat.on('message', function (message) {
        console.log(message);
      });
      // console.log(this.ws)
    };

    _this.openChat = function (user) {
      if (_this.state.chatUser != null && user != _this.state.chatUser) {
        _this.chatRef.current.switchUser(user);
      }
      _this.setState((0, _extends3.default)({}, _this.state, {
        chatUser: user
      }));
    };

    _this.displayChat = function () {
      if (_this.state.chatUser != null) {
        return _react2.default.createElement(_ChatWindow2.default, { ref: _this.chatRef, chat: _this.chat, to: _this.state.chatUser, from: _this.props.initialData.userData });
      }
    };

    _this.populate = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
      var self, allUsers;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              self = _this;
              _context.prev = 1;
              _context.next = 4;
              return _axios2.default.get('/api/users');

            case 4:
              allUsers = _context.sent;

              // console.log("users: ")
              // console.log(allUsers)
              self.setState({
                users: allUsers.data
              });
              _context.next = 11;
              break;

            case 8:
              _context.prev = 8;
              _context.t0 = _context['catch'](1);

              console.log("error fetching users: " + _context.t0);

            case 11:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this2, [[1, 8]]);
    }));

    _this.displayUsers = function () {
      if (_this.state.users == undefined) {
        return _react2.default.createElement(
          'div',
          { className: 'load' },
          _react2.default.createElement('i', { className: 'ayn-spin3' })
        );
      } else {
        return _this.state.users.map(function (user) {
          return _react2.default.createElement(
            'div',
            { className: 'user', key: user.id, onClick: _this.openChat.bind(null, user) },
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
        });
      }
    };

    _this.state = {
      users: [],
      open: false,
      connected: false,
      chatUser: null
    };

    _this.ws = (0, _websocketClient2.default)();
    _this.chat = null;
    _this.chatRef = _react2.default.createRef();
    return _this;
  }

  // check if user is on mobile and connect to chat


  (0, _createClass3.default)(Messenger, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.populate();
      if (window.innerWidth > 1200) {
        this.setState((0, _extends3.default)({}, this.state, {
          open: true
        }));
      }

      this.startChat();
    }

    //open messenger sidebar


    // connect and configure websocket client


    // open chat window / switch to a different one


    // instantiate chatwindow


    // fill messenger sidebar with users
    // fix to be only online users


    // render online users

  }, {
    key: 'render',
    value: function render() {
      if (this.state.users == undefined) {
        this.populate();
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
            '[:   connect   :]'
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

/***/ 244:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__(50);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends2 = __webpack_require__(77);

var _extends3 = _interopRequireDefault(_extends2);

var _asyncToGenerator2 = __webpack_require__(49);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = __webpack_require__(19);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(20);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(22);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(21);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(6);

var _react2 = _interopRequireDefault(_react);

var _axios = __webpack_require__(43);

var _axios2 = _interopRequireDefault(_axios);

var _reactTransitionGroup = __webpack_require__(564);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Profile = function (_Component) {
  (0, _inherits3.default)(Profile, _Component);

  function Profile() {
    (0, _classCallCheck3.default)(this, Profile);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Profile.__proto__ || Object.getPrototypeOf(Profile)).call(this));

    _this.getUser = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
      var _props$routeProps, match, history, location, self, user;

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

              this.setState((0, _extends3.default)({}, this.state, {
                user: user.data[0]
              }), function () {
                // console.log(this.state)
              });

            case 13:
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
      if (_this.state.user == undefined) {
        return _react2.default.createElement(
          'div',
          null,
          'bio loading...'
        );
      } else {

        // console.log(this.state.user)
        if (_this.state.user.info == "") {
          return _react2.default.createElement(
            'div',
            { className: 'bio' },
            _react2.default.createElement('textarea', { className: 'bio-text ' + (_this.state.edit ? 'active' : '') + ' ' }),
            _react2.default.createElement(
              'div',
              { className: 'bio-btn', onClick: _this.editBio },
              ' Add a bio '
            )
          );
        } else {
          return _react2.default.createElement(
            'p',
            null,
            _this.state.user.info
          );
        }
      }
    };

    _this.state = {
      initialData: {},
      user: "",
      edit: false
    };
    return _this;
  }

  (0, _createClass3.default)(Profile, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.setState({
        initialData: this.props.initialData
      }, function () {
        // console.log(this.state)
      });
      this.getUser();
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
            _react2.default.createElement('img', { src: this.state.user.profile_img }),
            _react2.default.createElement(
              'div',
              { className: 'follow-btn' },
              'follow ',
              _react2.default.createElement('i', { className: 'ayn-bell' })
            ),
            _react2.default.createElement(
              'div',
              { className: 'lower-5th' },
              _react2.default.createElement(
                'h1',
                null,
                this.state.user.fname,
                ' ',
                this.state.user.lname
              )
            )
          )
        );
      }
    }
  }]);
  return Profile;
}(_react.Component);

exports.default = Profile;

/***/ }),

/***/ 245:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = __webpack_require__(19);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(20);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(22);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(21);

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

/***/ 268:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = __webpack_require__(19);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(20);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(22);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(21);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(6);

var _react2 = _interopRequireDefault(_react);

var _axios = __webpack_require__(43);

var _axios2 = _interopRequireDefault(_axios);

var _websocketClient = __webpack_require__(157);

var _websocketClient2 = _interopRequireDefault(_websocketClient);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ChatWindow = function (_Component) {
  (0, _inherits3.default)(ChatWindow, _Component);

  function ChatWindow() {
    (0, _classCallCheck3.default)(this, ChatWindow);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ChatWindow.__proto__ || Object.getPrototypeOf(ChatWindow)).call(this));

    _this.switchUser = function (user) {
      _this.setState({
        user: user
      }, function () {
        console.log('changed user: ' + _this.state.user.fname);
      });
    };

    _this.state = {
      user: null,
      chat: null
    };
    return _this;
  }

  (0, _createClass3.default)(ChatWindow, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      this.setState({
        user: this.props.user,
        chat: this.props.chat
      }, function () {
        console.log(_this2.state);
      });
    }
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
        return _react2.default.createElement(
          'div',
          { className: 'chat' },
          _react2.default.createElement(
            'div',
            { className: 'chat-header' },
            _react2.default.createElement(
              'span',
              { className: 'chat-user' },
              this.state.user.fname,
              ' ',
              this.state.user.lname
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'chat-body' },
            _react2.default.createElement(
              'div',
              { className: 'message' },
              _react2.default.createElement(
                'p',
                null,
                'this is a message. '
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'message self' },
              _react2.default.createElement(
                'p',
                null,
                'this is a message. '
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'message' },
              _react2.default.createElement(
                'p',
                null,
                'this is a message. '
              )
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'chat-compose' },
            _react2.default.createElement('input', { type: 'text', name: 'newmessage', placeholder: 'enter a message' }),
            _react2.default.createElement(
              'div',
              { className: 'send-btn' },
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

/***/ 269:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__(50);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(49);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = __webpack_require__(19);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(20);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(22);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(21);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(6);

var _react2 = _interopRequireDefault(_react);

var _axios = __webpack_require__(43);

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
              // console.log(this.props)

              _context.prev = 1;
              _context.next = 4;
              return _axios2.default.get('/posts/' + self.props.post.id + '/comments');

            case 4:
              comments = _context.sent;

              //   console.log(comments.data.commentData)

              self.setState({
                comments: comments.data.commentData
              }, function () {
                //   console.log(self.state)
              });
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
                _context2.next = 10;
                break;

              case 7:
                _context2.prev = 7;
                _context2.t0 = _context2['catch'](2);

                console.log('error deleting comment: ' + _context2.t0);

              case 10:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, _this2, [[2, 7]]);
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
    return _this;
  }

  (0, _createClass3.default)(Comments, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.getComments();
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

/***/ 270:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = __webpack_require__(201);

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _regenerator = __webpack_require__(50);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends2 = __webpack_require__(77);

var _extends3 = _interopRequireDefault(_extends2);

var _asyncToGenerator2 = __webpack_require__(49);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = __webpack_require__(19);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(20);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(22);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(21);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(6);

var _react2 = _interopRequireDefault(_react);

var _axios = __webpack_require__(43);

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
      var self, fData, response, file, filename, type, _response;

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

              if (!(_this.state.postContent == '')) {
                _context3.next = 13;
                break;
              }

              if (!(_this.state.image == '')) {
                _context3.next = 10;
                break;
              }

              return _context3.abrupt('return');

            case 10:
              // if there is just an image append a space for the content
              fData.append('content', ' ');

            case 11:
              _context3.next = 14;
              break;

            case 13:
              fData.append('content', _this.state.postContent);

            case 14:
              fData.append('user_id', _this.props.initialData.userData.id);

              if (!(_this.state.image == '')) {
                _context3.next = 23;
                break;
              }

              fData.append('img_name', '');
              console.log('no image');
              _context3.next = 20;
              return (0, _axios2.default)({
                method: 'post',
                url: '/posts',
                data: fData,
                headers: { 'Content-Type': 'multipart/form-data boundary=' + fData._boundary }
              }).then(function (response) {
                self.setState({
                  postContent: "",
                  image: ""
                });
                self.props.update();
                return 'item saved';
              });

            case 20:
              response = _context3.sent;
              _context3.next = 37;
              break;

            case 23:
              // disable input while image uploads - maybe add loading symbol
              document.getElementById("content").disabled = true;

              // get signed url from the server
              _context3.prev = 24;
              file = self.state.image;
              filename = file.name;
              type = encodeURIComponent(file.type);
              // console.log(filename)

              console.log(type);
              _context3.next = 31;
              return _axios2.default.get('/posts/url/' + filename + '/' + type).then(function () {
                var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(response) {
                  var options;
                  return _regenerator2.default.wrap(function _callee2$(_context2) {
                    while (1) {
                      switch (_context2.prev = _context2.next) {
                        case 0:
                          console.log('signed url: ' + response.data);

                          // upload file to s3
                          options = {
                            headers: {
                              'Content-Type': file.type
                            }
                          };

                          _axios2.default.put(response.data, file, options).then(function () {
                            var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(response) {
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
                                          image: ""
                                        });
                                        document.getElementById("content").disabled = false; // enable input again
                                        self.props.update();
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
                              return _ref3.apply(this, arguments);
                            };
                          }()).catch(function (err) {
                            console.log('upload failed: ' + err);
                          });

                        case 3:
                        case 'end':
                          return _context2.stop();
                      }
                    }
                  }, _callee2, this);
                }));

                return function (_x) {
                  return _ref2.apply(this, arguments);
                };
              }());

            case 31:
              _response = _context3.sent;
              _context3.next = 37;
              break;

            case 34:
              _context3.prev = 34;
              _context3.t0 = _context3['catch'](24);

              console.log("axios didnt work: " + _context3.t0);

            case 37:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, _this2, [[24, 34]]);
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
      _this.setState((0, _extends3.default)({}, _this.state, {
        image: event.target.files[0]
      }), function () {
        // console.log(this.state)
      });
    };

    _this.removeImage = function () {
      _this.setState((0, _extends3.default)({}, _this.state, {
        image: ""
      }));
    };

    _this.state = {
      postContent: '',
      image: ''
    };
    return _this;
  }

  // allows posts to be submit with the enter key


  (0, _createClass3.default)(Compose, [{
    key: 'render',
    value: function render() {
      if (this.props.initialData.userData == undefined) {
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
              backgroundImage: 'url("' + this.props.initialData.userData.profile_img + '")',
              backgroundPosition: 'center center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover' } }),
          _react2.default.createElement(
            'div',
            { className: 'photo-btn', onClick: this.imageSelect },
            _react2.default.createElement('i', { className: 'ayn-camera' }),
            _react2.default.createElement('input', { type: 'file', id: 'hidden-input', name: 'post_img', onChange: this.getImage })
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

/***/ 271:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__(50);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends2 = __webpack_require__(77);

var _extends3 = _interopRequireDefault(_extends2);

var _asyncToGenerator2 = __webpack_require__(49);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _defineProperty2 = __webpack_require__(201);

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _classCallCheck2 = __webpack_require__(19);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(20);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(22);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(21);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(6);

var _react2 = _interopRequireDefault(_react);

var _Comments = __webpack_require__(269);

var _Comments2 = _interopRequireDefault(_Comments);

var _axios = __webpack_require__(43);

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Post = function (_Component) {
  (0, _inherits3.default)(Post, _Component);

  function Post() {
    var _this2 = this;

    (0, _classCallCheck3.default)(this, Post);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Post.__proto__ || Object.getPrototypeOf(Post)).call(this));

    _this.displayMedia = function () {
      if (_this.props.post.type == 'image') {
        return _react2.default.createElement('div', { className: 'post-media', style: {
            backgroundImage: 'url("' + _this.props.post.image_url + '")',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover' } });
      } else if (_this.props.post.type == 'video') {
        return _react2.default.createElement(
          'video',
          { className: 'post-media', autoPlay: true, muted: true, controls: true, loop: true },
          _react2.default.createElement('source', { src: _this.props.post.image_url, type: 'video/mp4' }),
          'Your browser does not support html5 videos.'
        );
      }
    };

    _this.handleChange = function (event) {
      var name = event.target.name;
      var value = event.target.type == 'checkbox' ? event.target.checked : event.target.value;

      _this.setState((0, _defineProperty3.default)({}, name, value), function () {
        // console.log(this.state)
      });
    };

    _this.submitComment = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
      var self, response;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              self = _this;

              if (!(_this.state.comment.length > 0)) {
                _context.next = 11;
                break;
              }

              _context.prev = 2;
              _context.next = 5;
              return _axios2.default.post('/comments', {
                post_id: self.props.post.id,
                user_id: self.props.curuser.id,
                content: self.state.comment
              }).then(function (response) {
                self.setState((0, _extends3.default)({}, self.state, {
                  comment: ""
                }));

                self.commentArea.current.getComments();
                return 'comment saved';
              });

            case 5:
              response = _context.sent;
              _context.next = 11;
              break;

            case 8:
              _context.prev = 8;
              _context.t0 = _context['catch'](2);

              console.log("axios didnt work: " + _context.t0);

            case 11:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this2, [[2, 8]]);
    }));

    _this.sendUp = function (num) {
      _this.setState((0, _extends3.default)({}, _this.state, {
        numComments: num
      }));
    };

    _this.checkSubmit = function (event) {

      if (event.keyCode == 13) {
        event.preventDefault();
        _this.submitComment();
      }
    };

    _this.deletePost = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
      var self;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              self = _this;
              // console.log("post id: " + self.props.post.id)

              _context2.prev = 1;
              _context2.next = 4;
              return _axios2.default.get('/posts/' + self.props.post.id + '/delete').then(function (response) {
                console.log('post deleted: ' + response);
                self.props.update();
              });

            case 4:
              _context2.next = 9;
              break;

            case 6:
              _context2.prev = 6;
              _context2.t0 = _context2['catch'](1);

              console.log('error deleting post: ' + _context2.t0);

            case 9:
              console.log('post deleted');
              self.props.update();

            case 11:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, _this2, [[1, 6]]);
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
      var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(u_id, p_id) {
        var self;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                self = _this;

                if (_this.state.liked) {
                  _context3.next = 12;
                  break;
                }

                _context3.prev = 2;
                _context3.next = 5;
                return _axios2.default.post('/likes', {
                  user_id: u_id,
                  post_id: p_id
                }).then(function () {
                  console.log('post liked');
                });

              case 5:
                _context3.next = 10;
                break;

              case 7:
                _context3.prev = 7;
                _context3.t0 = _context3['catch'](2);

                console.log("error liking post: " + _context3.t0);

              case 10:
                _context3.next = 20;
                break;

              case 12:
                _context3.prev = 12;
                _context3.next = 15;
                return _axios2.default.post('/likes/delete', {
                  user_id: u_id,
                  post_id: p_id
                });

              case 15:
                _context3.next = 20;
                break;

              case 17:
                _context3.prev = 17;
                _context3.t1 = _context3['catch'](12);

                console.log("error liking post: " + _context3.t1);

              case 20:
                _this.setState((0, _extends3.default)({}, _this.state, {
                  liked: !_this.state.liked
                }));
                _this.getLikes();

              case 22:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, _this2, [[2, 7], [12, 17]]);
      }));

      return function (_x, _x2) {
        return _ref3.apply(this, arguments);
      };
    }();

    _this.getLikes = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4() {
      var self, likes;
      return _regenerator2.default.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              self = _this;
              _context4.prev = 1;
              _context4.next = 4;
              return _axios2.default.get('/posts/' + self.props.post.id + '/likes').then(function (response) {
                // console.log(response.data.likeData)
                var like_d = response.data.likeData;
                if (like_d.length > 0) {
                  self.setState((0, _extends3.default)({}, self.state, {
                    likes: like_d.length,
                    lastLike: like_d[0].users.fname + ' ' + like_d[0].users.lname
                  }), function () {
                    // console.log(self.state)
                  });
                } else {
                  self.setState((0, _extends3.default)({}, self.state, {
                    likes: 0,
                    lastLike: ""
                  }), function () {
                    // console.log(self.state)
                  });
                }
              });

            case 4:
              likes = _context4.sent;
              _context4.next = 10;
              break;

            case 7:
              _context4.prev = 7;
              _context4.t0 = _context4['catch'](1);

              console.log("error getting likes: " + _context4.t0);

            case 10:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, _this2, [[1, 7]]);
    }));

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

    _this.state = {
      post: {},
      poster: {},
      comment: "",
      numComments: 0,
      update: false,
      liked: false,
      likes: 0,
      lastLike: ""
    };
    _this.commentArea = _react2.default.createRef(); // ref for updating comments
    return _this;
  }

  (0, _createClass3.default)(Post, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.getLikes();
    }

    // this lets us get the comments from the child


    // allows comments to be submitted with the enter key


    // delete the post only if you posted it


    // displays the current post comments


    // like or unlike a post


    // get the like stats


    // display the post stats

  }, {
    key: 'render',
    value: function render() {

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
          'div',
          { className: 'post' },
          _react2.default.createElement(
            'div',
            { className: 'post-header' },
            _react2.default.createElement(
              'a',
              { href: '/profile/' + this.props.user.id, className: 'author' },
              _react2.default.createElement('div', { className: 'user-img', style: {
                  backgroundImage: 'url("' + this.props.user.profile_img + '")',
                  backgroundPosition: 'center center',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover' } }),
              _react2.default.createElement(
                'div',
                { className: 'username' },
                this.props.user.fname,
                ' ',
                this.props.user.lname
              ),
              _react2.default.createElement(
                'span',
                { className: 'text' },
                'shared ',
                this.getType()
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'time' },
              new Date(this.props.post.created_at).toLocaleString()
            ),
            _react2.default.createElement(
              'div',
              { className: 'del-btn ' + (this.props.user.id == this.props.curuser.id ? 'active' : ''), onClick: this.deletePost },
              _react2.default.createElement('i', { className: 'ayn-trash' })
            )
          ),
          this.displayMedia(),
          _react2.default.createElement(
            'div',
            { className: 'post-info' },
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
            _react2.default.createElement(_Comments2.default, { ref: this.commentArea, post: this.props.post, update: this.state.update, sendUp: this.sendUp, curuser: this.props.curuser }),
            _react2.default.createElement(
              'div',
              { className: 'send-btn', onClick: this.submitComment },
              _react2.default.createElement('i', { className: 'ayn-right' })
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

/***/ 272:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = __webpack_require__(19);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(20);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(22);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(21);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(6);

var _react2 = _interopRequireDefault(_react);

var _Post = __webpack_require__(271);

var _Post2 = _interopRequireDefault(_Post);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PostArea = function (_Component) {
  (0, _inherits3.default)(PostArea, _Component);

  function PostArea() {
    (0, _classCallCheck3.default)(this, PostArea);

    var _this = (0, _possibleConstructorReturn3.default)(this, (PostArea.__proto__ || Object.getPrototypeOf(PostArea)).call(this));

    _this.showMyPosts = function () {
      // console.log(this.props.initialData.postData)
      return _this.props.initialData.postData.map(function (item) {
        var post = item.posts;
        var user = item.users;
        return _react2.default.createElement(_Post2.default, { post: post, user: user, curuser: _this.props.initialData.userData, update: _this.props.update, key: post.id });
      });
    };

    _this.state = {
      posts: []
    };
    return _this;
  }

  (0, _createClass3.default)(PostArea, [{
    key: 'render',
    value: function render() {
      if (this.props.initialData.userData == undefined) {
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

/***/ 273:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _regenerator = __webpack_require__(50);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(49);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = __webpack_require__(19);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(20);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(22);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(21);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(6);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(70);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRouterDom = __webpack_require__(248);

var _axios = __webpack_require__(43);

var _axios2 = _interopRequireDefault(_axios);

var _Home = __webpack_require__(240);

var _Home2 = _interopRequireDefault(_Home);

var _Profile = __webpack_require__(244);

var _Profile2 = _interopRequireDefault(_Profile);

var _LeftMenu = __webpack_require__(241);

var _LeftMenu2 = _interopRequireDefault(_LeftMenu);

var _Messenger = __webpack_require__(243);

var _Messenger2 = _interopRequireDefault(_Messenger);

var _SearchHeader = __webpack_require__(245);

var _SearchHeader2 = _interopRequireDefault(_SearchHeader);

var _Loading = __webpack_require__(242);

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
    key: 'componentDidMount',
    value: function componentDidMount() {

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
                  // console.log(allData)

                  self.setState({
                    initialData: allData
                  }, function () {
                    // console.log(self.state.initialData)
                  });
                  _context.next = 11;
                  break;

                case 8:
                  _context.prev = 8;
                  _context.t0 = _context['catch'](0);

                  console.log("Initialization error: " + _context.t0);

                case 11:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, this, [[0, 8]]);
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
      var _this2 = this;

      return _react2.default.createElement(
        _reactRouterDom.BrowserRouter,
        null,
        _react2.default.createElement(
          'div',
          { className: 'app-container home-page' },
          _react2.default.createElement(_Loading2.default, { active: this.state.initialData != undefined ? "" : 'active' }),
          _react2.default.createElement(_LeftMenu2.default, { initialData: this.state.initialData }),
          _react2.default.createElement(
            'section',
            { id: 'content-container' },
            _react2.default.createElement(_SearchHeader2.default, null),
            _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/', component: function component(props) {
                return _react2.default.createElement(_Home2.default, { routeProps: props, initialData: _this2.state.initialData });
              } }),
            _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/profile/:id', component: function component(props) {
                return _react2.default.createElement(_Profile2.default, { routeProps: props, initialData: _this2.state.initialData });
              } })
          ),
          _react2.default.createElement(_Messenger2.default, { initialData: this.state.initialData })
        )
      );
    }
  }]);
  return Layout;
}(_react.Component);

var app = document.getElementById('app');

_reactDom2.default.render(_react2.default.createElement(Layout, null), app);

/***/ })

},[273]);