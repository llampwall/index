webpackJsonp([0],{

/***/ 205:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = __webpack_require__(208);

var _extends3 = _interopRequireDefault(_extends2);

var _defineProperty2 = __webpack_require__(207);

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _regenerator = __webpack_require__(87);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(86);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = __webpack_require__(32);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(33);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(35);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(34);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(17);

var _react2 = _interopRequireDefault(_react);

var _axios = __webpack_require__(75);

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

    _this.submitPost = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
      var fData, self, response;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              fData = new FormData();

              fData.append('user_id', _this.props.initialData.userData.id);
              if (_this.state.postContent == "" && _this.state.image != "") {
                fData.append('content', " ");
              } else {
                fData.append('content', _this.state.postContent);
              }
              fData.append('image', _this.state.image);
              self = _this;


              console.log(fData);
              _context.prev = 6;
              _context.next = 9;
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

            case 9:
              response = _context.sent;
              _context.next = 15;
              break;

            case 12:
              _context.prev = 12;
              _context.t0 = _context['catch'](6);

              console.log("axios didnt work: " + _context.t0);

            case 15:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this2, [[6, 12]]);
    }));

    _this.handleChange = function (event) {
      var name = event.target.name;
      var value = event.target.type == 'checkbox' ? event.target.checked : event.target.value;

      _this.setState((0, _defineProperty3.default)({}, name, value), function () {
        console.log(_this.state);
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
        console.log(_this.state);
      });
    };

    _this.removeImage = function () {
      _this.setState((0, _extends3.default)({}, _this.state, {
        image: ""
      }));
    };

    _this.state = {
      postContent: "",
      image: ""
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
          null,
          'Loading...'
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
            _react2.default.createElement('i', { className: 'fa fa-camera' }),
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

/***/ 307:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__(87);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(86);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = __webpack_require__(32);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(33);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(35);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(34);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(17);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(106);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRouterDom = __webpack_require__(137);

var _axios = __webpack_require__(75);

var _axios2 = _interopRequireDefault(_axios);

var _PostArea = __webpack_require__(335);

var _PostArea2 = _interopRequireDefault(_PostArea);

var _Compose = __webpack_require__(205);

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

      console.log(this.props);
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
        // console.log(this.props)
        return _react2.default.createElement(
          'div',
          { className: 'content-area' },
          _react2.default.createElement(_Compose2.default, { initialData: this.state.initialData, update: this.update }),
          _react2.default.createElement(_PostArea2.default, { routeProps: this.props.routeProps, initialData: this.state.initialData })
        );
      }
    }
  }]);
  return Home;
}(_react.Component);

exports.default = Home;

/***/ }),

/***/ 308:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = __webpack_require__(32);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(33);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(35);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(34);

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

/***/ 309:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = __webpack_require__(32);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(33);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(35);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(34);

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

/***/ 310:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = __webpack_require__(32);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(33);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(35);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(34);

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

/***/ 311:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = __webpack_require__(32);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(33);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(35);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(34);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(17);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(137);

var _axios = __webpack_require__(75);

var _axios2 = _interopRequireDefault(_axios);

var _Compose = __webpack_require__(205);

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

/***/ 312:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = __webpack_require__(32);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(33);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(35);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(34);

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

/***/ 333:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__(87);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(86);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = __webpack_require__(32);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(33);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(35);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(34);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(17);

var _react2 = _interopRequireDefault(_react);

var _axios = __webpack_require__(75);

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Comments = function (_Component) {
  (0, _inherits3.default)(Comments, _Component);

  function Comments() {
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
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this, [[1, 8]]);
    }));

    _this.showComments = function () {
      return _this.state.comments.map(function (item) {
        var comment = item.comments;
        var user = item.users;
        return _react2.default.createElement(
          'div',
          { className: 'single-comment', key: comment.id },
          _react2.default.createElement(
            'div',
            { className: 'user' },
            _react2.default.createElement('div', { className: 'comment-pic', style: {
                backgroundImage: 'url("' + user.profile_img + '")',
                backgroundPosition: 'center center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover' } }),
            _react2.default.createElement(
              'h2',
              null,
              user.fname + ' ' + (user.lname == null ? "" : user.lname) + ':'
            )
          ),
          _react2.default.createElement(
            'p',
            null,
            comment.content
          )
        );
      });
    };

    _this.state = {
      comments: []
    };
    return _this;
  }

  // this wont work in react 16, but i didn't feel like upgrading


  (0, _createClass3.default)(Comments, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(props) {
      var _props = this.props,
          post = _props.post,
          update = _props.update;

      if (props.update !== update) {
        this.getComments();
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.getComments();
    }
  }, {
    key: 'render',
    value: function render() {
      if (this.props.post == undefined) {
        return _react2.default.createElement(
          'div',
          null,
          'Loading...'
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

/***/ 334:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__(87);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(86);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _extends2 = __webpack_require__(208);

var _extends3 = _interopRequireDefault(_extends2);

var _defineProperty2 = __webpack_require__(207);

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _classCallCheck2 = __webpack_require__(32);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(33);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(35);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(34);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(17);

var _react2 = _interopRequireDefault(_react);

var _Comments = __webpack_require__(333);

var _Comments2 = _interopRequireDefault(_Comments);

var _axios = __webpack_require__(75);

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
      }
    };

    _this.handleChange = function (event) {
      var name = event.target.name;
      var value = event.target.type == 'checkbox' ? event.target.checked : event.target.value;

      _this.setState((0, _defineProperty3.default)({}, name, value), function () {
        console.log(_this.state);
      });
    };

    _this.refreshComments = function () {
      _this.setState((0, _extends3.default)({}, _this.state, {
        update: !_this.state.update
      }));
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
                user_id: self.props.curuser,
                content: self.state.comment
              }).then(function (response) {
                self.setState((0, _extends3.default)({}, self.state, {
                  comment: ""
                }));

                // should use the ref commented out in the constructor
                // to update the comment area, but in react 15 this 
                // way makes more sense
                //   this.commentArea.current.getComments()
                self.refreshComments();
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

    _this.checkSubmit = function (event) {
      if (event.keyCode == 13) {
        event.preventDefault();
        _this.submitComment();
      }
    };

    _this.state = {
      post: {},
      poster: {},
      comment: "",
      update: false
      // this.commentArea = React.createRef()
    };return _this;
  }

  // allows comments to be submitted with the enter key


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
              new Date(this.props.post.created_at).toLocaleString()
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
                { className: 'like-btn' },
                _react2.default.createElement('i', { className: 'fa fa-thumbs-up' })
              )
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
          _react2.default.createElement(
            'div',
            { className: 'c-section' },
            _react2.default.createElement('textarea', { name: 'comment', cols: 30, rows: 2, placeholder: 'write a comment...', value: this.state.comment, onChange: this.handleChange, onKeyUp: this.checkSubmit })
          ),
          _react2.default.createElement(
            'div',
            { className: 'buttons' },
            _react2.default.createElement(_Comments2.default, { post: this.props.post, update: this.state.update }),
            _react2.default.createElement(
              'div',
              { className: 'send-btn', onClick: this.submitComment },
              _react2.default.createElement('i', { className: 'fa fa-arrow-right' })
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

/***/ 335:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = __webpack_require__(32);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(33);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(35);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(34);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(17);

var _react2 = _interopRequireDefault(_react);

var _Post = __webpack_require__(334);

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
        return _react2.default.createElement(_Post2.default, { post: post, user: user, curuser: _this.props.initialData.userData.id, key: post.id });
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

/***/ 336:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _regenerator = __webpack_require__(87);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(86);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = __webpack_require__(32);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(33);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(35);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(34);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(17);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(106);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRouterDom = __webpack_require__(137);

var _axios = __webpack_require__(75);

var _axios2 = _interopRequireDefault(_axios);

var _Home = __webpack_require__(307);

var _Home2 = _interopRequireDefault(_Home);

var _Profile = __webpack_require__(311);

var _Profile2 = _interopRequireDefault(_Profile);

var _LeftMenu = __webpack_require__(308);

var _LeftMenu2 = _interopRequireDefault(_LeftMenu);

var _Messenger = __webpack_require__(310);

var _Messenger2 = _interopRequireDefault(_Messenger);

var _SearchHeader = __webpack_require__(312);

var _SearchHeader2 = _interopRequireDefault(_SearchHeader);

var _Loading = __webpack_require__(309);

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

},[336]);