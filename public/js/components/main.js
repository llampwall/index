webpackJsonp([0],{

/***/ 203:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = __webpack_require__(339);

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _regenerator = __webpack_require__(134);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(133);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = __webpack_require__(37);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(38);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(40);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(39);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(17);

var _react2 = _interopRequireDefault(_react);

var _axios = __webpack_require__(85);

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
                type: 'text'
              });

            case 3:
              _this.setState({
                postContent: ""
              });
              _this.props.update();
              return _context.abrupt('return', 'item saved');

            case 8:
              _context.prev = 8;
              _context.t0 = _context['catch'](0);

              console.log("axios didnt work: " + _context.t0);

            case 11:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this2, [[0, 8]]);
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

/***/ 304:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__(134);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(133);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = __webpack_require__(37);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(38);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(40);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(39);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(17);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(103);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRouterDom = __webpack_require__(135);

var _axios = __webpack_require__(85);

var _axios2 = _interopRequireDefault(_axios);

var _PostArea = __webpack_require__(331);

var _PostArea2 = _interopRequireDefault(_PostArea);

var _Compose = __webpack_require__(203);

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
                console.log(_this.state.initialData);
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
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _this3 = this;

      this.setState({
        initialData: this.props.initialData
      }, function () {
        console.log(_this3.state);
      });
    }

    //pass down function to pass down to compose change state and update the whole area

  }, {
    key: 'render',
    value: function render() {
      if (this.props.initialData == undefined) {
        return _react2.default.createElement(
          'div',
          null,
          'posts loading...'
        );
      } else {
        return _react2.default.createElement(
          'div',
          { className: 'content-area' },
          _react2.default.createElement(_Compose2.default, { initialData: this.state.initialData, update: this.update }),
          _react2.default.createElement(_PostArea2.default, { initialData: this.state.initialData })
        );
      }
    }
  }]);
  return Home;
}(_react.Component);

exports.default = Home;

/***/ }),

/***/ 305:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = __webpack_require__(37);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(38);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(40);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(39);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(17);

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
                { href: "/profile/" + this.props.initialData.userData.id },
                "+ profile +"
              ),
              _react2.default.createElement(
                "a",
                { href: "/account/" + this.props.initialData.userData.id },
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

/***/ 306:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = __webpack_require__(37);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(38);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(40);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(39);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(17);

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

/***/ 307:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = __webpack_require__(37);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(38);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(40);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(39);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(17);

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

/***/ 308:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = __webpack_require__(37);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(38);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(40);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(39);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(17);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(135);

var _axios = __webpack_require__(85);

var _axios2 = _interopRequireDefault(_axios);

var _Compose = __webpack_require__(203);

var _Compose2 = _interopRequireDefault(_Compose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Handles updating the postarea when its sibling compose adds a post to the database


var Profile = function (_Component) {
  (0, _inherits3.default)(Profile, _Component);

  function Profile() {
    (0, _classCallCheck3.default)(this, Profile);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Profile.__proto__ || Object.getPrototypeOf(Profile)).call(this));

    _this.state = {
      initialData: {}
    };
    return _this;
  }

  (0, _createClass3.default)(Profile, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.setState({
        initialData: this.props.initialData
      }, function () {
        // console.log(this.state)
      });
    }

    // const getUser = async function() {
    //   const 
    // }

  }, {
    key: 'render',
    value: function render() {
      if (this.props.initialData.userData == undefined) {
        return _react2.default.createElement(
          'div',
          null,
          'profile loading...'
        );
      } else {
        // console.log(this.props.initialData.userData)
        return _react2.default.createElement(
          'div',
          { className: 'content-area profile-page' },
          _react2.default.createElement(
            'div',
            { className: 'user-img' },
            _react2.default.createElement('img', { src: this.props.initialData.userData.profile_img }),
            _react2.default.createElement(
              'h1',
              null,
              this.props.initialData.userData.fname,
              ' ',
              this.props.initialData.userData.lname
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'user-info' },
            _react2.default.createElement(
              'div',
              { className: 'follow-btn' },
              _react2.default.createElement('span', null),
              _react2.default.createElement('span', null),
              _react2.default.createElement('span', null),
              _react2.default.createElement('span', null),
              'follow'
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

/***/ 309:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = __webpack_require__(37);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(38);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(40);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(39);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(17);

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

/***/ 330:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = __webpack_require__(37);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(38);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(40);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(39);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(17);

var _react2 = _interopRequireDefault(_react);

var _axios = __webpack_require__(85);

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Post = function (_Component) {
    (0, _inherits3.default)(Post, _Component);

    function Post() {
        (0, _classCallCheck3.default)(this, Post);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Post.__proto__ || Object.getPrototypeOf(Post)).call(this));

        _this.displayMedia = function () {
            if (_this.props.post.type == 'image') {
                return _react2.default.createElement(
                    'div',
                    { className: 'post-media' },
                    _react2.default.createElement('img', { src: _this.props.post.image_url })
                );
            }
        };

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
                // console.log(this.props.post)
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
                                    backgroundImage: 'url("' + this.props.user.profile_img + '")',
                                    backgroundPosition: 'center center',
                                    backgroundRepeat: 'no-repeat',
                                    backgroundSize: 'cover' } }),
                            _react2.default.createElement(
                                'a',
                                { href: '/profile/' + this.props.user.id, className: 'username' },
                                this.props.user.fname,
                                ' ',
                                this.props.user.lname
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
                            this.props.post.created_at
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
                            { className: 'comments' },
                            _react2.default.createElement(
                                'p',
                                null,
                                'Jordan Hewitt: yeah you would know loser'
                            ),
                            _react2.default.createElement(
                                'p',
                                null,
                                'Jordan Hewitt: yeah you would know loser'
                            ),
                            _react2.default.createElement(
                                'p',
                                null,
                                'Jordan Hewitt: yeah you would know loser'
                            ),
                            _react2.default.createElement(
                                'p',
                                null,
                                'Jordan Hewitt: yeah you would know loser'
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'send-btn' },
                            _react2.default.createElement('i', { className: 'fa fa-arrow-right' })
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

/***/ 331:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = __webpack_require__(37);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(38);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(40);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(39);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(17);

var _react2 = _interopRequireDefault(_react);

var _Post = __webpack_require__(330);

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
        return _react2.default.createElement(_Post2.default, { post: post, user: user, key: post.id });
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

/***/ 332:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _regenerator = __webpack_require__(134);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(133);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = __webpack_require__(37);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(38);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(40);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(39);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(17);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(103);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRouterDom = __webpack_require__(135);

var _axios = __webpack_require__(85);

var _axios2 = _interopRequireDefault(_axios);

var _Home = __webpack_require__(304);

var _Home2 = _interopRequireDefault(_Home);

var _Profile = __webpack_require__(308);

var _Profile2 = _interopRequireDefault(_Profile);

var _LeftMenu = __webpack_require__(305);

var _LeftMenu2 = _interopRequireDefault(_LeftMenu);

var _Messenger = __webpack_require__(307);

var _Messenger2 = _interopRequireDefault(_Messenger);

var _SearchHeader = __webpack_require__(309);

var _SearchHeader2 = _interopRequireDefault(_SearchHeader);

var _Loading = __webpack_require__(306);

var _Loading2 = _interopRequireDefault(_Loading);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import ImagePicker from '../components/ImagePicker'


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
                  // console.log(allData)

                  self.setState({
                    initialData: allData
                  }, function () {
                    console.log(self.state.initialData);
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

},[332]);