webpackJsonp([0],{

/***/ 152:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(39);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Post = function (_Component) {
    _inherits(Post, _Component);

    function Post() {
        _classCallCheck(this, Post);

        var _this = _possibleConstructorReturn(this, (Post.__proto__ || Object.getPrototypeOf(Post)).call(this));

        _this.state = {};
        return _this;
    }

    _createClass(Post, [{
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "div",
                { className: "post" },
                _react2.default.createElement(
                    "div",
                    { className: "post-header" },
                    _react2.default.createElement(
                        "div",
                        { className: "author" },
                        _react2.default.createElement("div", { className: "user-img", style: { background: 'url("/img/welcome.jpg")', backgroundPosition: 'center center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' } }),
                        _react2.default.createElement(
                            "a",
                            { href: "#", className: "username" },
                            "Jordan Hewitt"
                        ),
                        _react2.default.createElement(
                            "span",
                            { className: "text" },
                            "shared an article"
                        )
                    ),
                    _react2.default.createElement(
                        "div",
                        { className: "time" },
                        "43 min"
                    )
                ),
                _react2.default.createElement(
                    "div",
                    { className: "post-media" },
                    _react2.default.createElement("img", { src: "img/webdesign.jpg" })
                ),
                _react2.default.createElement(
                    "div",
                    { className: "post-info" },
                    _react2.default.createElement(
                        "h3",
                        { className: "title" },
                        "How to Become a Web Developer in 2020"
                    ),
                    _react2.default.createElement(
                        "p",
                        null,
                        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odit accusantium vero impedit, dolor earum error doloribus delectus deleniti rerum quis, voluptas debitis nesciunt perspiciatis voluptatibus ipsum sapiente necessitatibus laboriosam amet."
                    )
                ),
                _react2.default.createElement(
                    "div",
                    { className: "post-stats" },
                    _react2.default.createElement(
                        "div",
                        { className: "icons" },
                        _react2.default.createElement("i", { className: "fa fa-grin-alt" }),
                        _react2.default.createElement("i", { className: "fa fa-thumbs-up" })
                    ),
                    _react2.default.createElement(
                        "span",
                        { className: "text" },
                        "Sarah Jane and 23 others liked this post."
                    ),
                    _react2.default.createElement(
                        "div",
                        { className: "comment-count" },
                        "4 comments"
                    )
                ),
                _react2.default.createElement("textarea", { name: "comment", cols: 30, rows: 2, placeholder: "write a comment...", defaultValue: "" }),
                _react2.default.createElement(
                    "div",
                    { className: "buttons" },
                    _react2.default.createElement(
                        "div",
                        { className: "send-btn" },
                        _react2.default.createElement("i", { className: "fa fa-arrow-right" })
                    ),
                    _react2.default.createElement(
                        "div",
                        { className: "share-btn" },
                        _react2.default.createElement("i", { className: "fa fa-share" })
                    ),
                    _react2.default.createElement(
                        "div",
                        { className: "like-btn" },
                        _react2.default.createElement("i", { className: "fa fa-thumbs-up" })
                    )
                )
            );
        }
    }]);

    return Post;
}(_react.Component);

exports.default = Post;

/***/ }),

/***/ 231:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(39);

var _react2 = _interopRequireDefault(_react);

var _Post = __webpack_require__(152);

var _Post2 = _interopRequireDefault(_Post);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Compose = function (_Component) {
  _inherits(Compose, _Component);

  function Compose() {
    _classCallCheck(this, Compose);

    var _this = _possibleConstructorReturn(this, (Compose.__proto__ || Object.getPrototypeOf(Compose)).call(this));

    _this.state = {};
    return _this;
  }

  _createClass(Compose, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'section',
        { id: 'compose' },
        _react2.default.createElement('textarea', { name: 'post', cols: 30, rows: 10, placeholder: 'share something...', defaultValue: "" }),
        _react2.default.createElement('div', { className: 'user-img', style: { background: 'url("/img/welcome.jpg")', backgroundPosition: 'center center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' } }),
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
          { className: 'send-btn' },
          _react2.default.createElement('i', { className: 'fa fa-arrow-right' })
        )
      );
    }
  }]);

  return Compose;
}(_react.Component);

exports.default = Compose;

/***/ }),

/***/ 232:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(39);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LeftMenu = function (_Component) {
  _inherits(LeftMenu, _Component);

  function LeftMenu() {
    _classCallCheck(this, LeftMenu);

    var _this = _possibleConstructorReturn(this, (LeftMenu.__proto__ || Object.getPrototypeOf(LeftMenu)).call(this));

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

  _createClass(LeftMenu, [{
    key: "render",
    value: function render() {
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
            "Jordan_Hewitt"
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
          "div",
          { className: "logout" },
          _react2.default.createElement(
            "a",
            { href: "/logout" },
            "logout ",
            _react2.default.createElement("i", { className: "fa fa-trash" })
          )
        )
      );
    }
  }]);

  return LeftMenu;
}(_react.Component);

exports.default = LeftMenu;

/***/ }),

/***/ 233:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(39);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Messenger = function (_Component) {
  _inherits(Messenger, _Component);

  function Messenger() {
    _classCallCheck(this, Messenger);

    var _this = _possibleConstructorReturn(this, (Messenger.__proto__ || Object.getPrototypeOf(Messenger)).call(this));

    _this.state = {};
    return _this;
  }

  _createClass(Messenger, [{
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
            "\\\\connect"
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

/***/ 234:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(39);

var _react2 = _interopRequireDefault(_react);

var _Post = __webpack_require__(152);

var _Post2 = _interopRequireDefault(_Post);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PostArea = function (_Component) {
  _inherits(PostArea, _Component);

  function PostArea() {
    _classCallCheck(this, PostArea);

    var _this = _possibleConstructorReturn(this, (PostArea.__proto__ || Object.getPrototypeOf(PostArea)).call(this));

    _this.state = {};
    return _this;
  }

  _createClass(PostArea, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'section',
        { id: 'all-posts' },
        _react2.default.createElement(
          'div',
          { className: 'post-container' },
          _react2.default.createElement(_Post2.default, null),
          _react2.default.createElement(_Post2.default, null)
        )
      );
    }
  }]);

  return PostArea;
}(_react.Component);

exports.default = PostArea;

/***/ }),

/***/ 235:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(39);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SearchHeader = function (_Component) {
    _inherits(SearchHeader, _Component);

    function SearchHeader() {
        _classCallCheck(this, SearchHeader);

        var _this = _possibleConstructorReturn(this, (SearchHeader.__proto__ || Object.getPrototypeOf(SearchHeader)).call(this));

        _this.state = {};
        return _this;
    }

    _createClass(SearchHeader, [{
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

/***/ 239:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(39);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(101);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _LeftMenu = __webpack_require__(232);

var _LeftMenu2 = _interopRequireDefault(_LeftMenu);

var _Messenger = __webpack_require__(233);

var _Messenger2 = _interopRequireDefault(_Messenger);

var _SearchHeader = __webpack_require__(235);

var _SearchHeader2 = _interopRequireDefault(_SearchHeader);

var _PostArea = __webpack_require__(234);

var _PostArea2 = _interopRequireDefault(_PostArea);

var _Compose = __webpack_require__(231);

var _Compose2 = _interopRequireDefault(_Compose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Layout = function (_Component) {
  _inherits(Layout, _Component);

  function Layout() {
    _classCallCheck(this, Layout);

    var _this = _possibleConstructorReturn(this, (Layout.__proto__ || Object.getPrototypeOf(Layout)).call(this));

    _this.state = {};
    return _this;
  }

  _createClass(Layout, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'app-container home-page' },
        _react2.default.createElement(_LeftMenu2.default, null),
        _react2.default.createElement(
          'section',
          { id: 'content-container' },
          _react2.default.createElement(_SearchHeader2.default, null),
          _react2.default.createElement(
            'div',
            { className: 'content-area' },
            _react2.default.createElement(_Compose2.default, null),
            _react2.default.createElement(_PostArea2.default, null)
          )
        ),
        _react2.default.createElement(_Messenger2.default, null)
      );
    }
  }]);

  return Layout;
}(_react.Component);

var app = document.getElementById('app');

_reactDom2.default.render(_react2.default.createElement(Layout, null), app);

/***/ })

},[239]);