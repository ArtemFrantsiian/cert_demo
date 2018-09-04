'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _redis = require('redis');

var _redis2 = _interopRequireDefault(_redis);

var _util = require('util');

var _functions = require('../functions');

var _jsSha = require('js-sha256');

var _jsSha2 = _interopRequireDefault(_jsSha);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var session = _redis2.default.createClient();
var getFromSession = (0, _util.promisify)(session.get).bind(session);

var router = _express2.default.Router();

router.post('/', function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var _req$body, userId, token, store, certificate, _ref2, secret;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, userId = _req$body.userId, token = _req$body.token;
            _context.next = 3;
            return (0, _functions.getCollection)("certificates");

          case 3:
            store = _context.sent;
            _context.next = 6;
            return getFromSession(userId);

          case 6:
            certificate = _context.sent;
            _context.next = 9;
            return store.findOne({ hashOfCertificate: (0, _jsSha2.default)(certificate.replace(/\r?\n?/g, "")) });

          case 9:
            _ref2 = _context.sent;
            secret = _ref2.secret;

            res.status(200).json({ success: (0, _functions.verifySecret)(secret, token) });

          case 12:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());

exports.default = router;