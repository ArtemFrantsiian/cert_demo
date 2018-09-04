"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _jsSha = require("js-sha256");

var _jsSha2 = _interopRequireDefault(_jsSha);

var _functions = require("../functions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var router = _express2.default.Router();

/**
 * for create certificate
 */
router.put('/', function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var _req$body, certificate, token, secret, store;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, certificate = _req$body.certificate, token = _req$body.token, secret = _req$body.secret;

            if (!(secret && !(0, _functions.verifySecret)(secret, token))) {
              _context.next = 4;
              break;
            }

            res.status(400).json({ notValid: true });
            return _context.abrupt("return");

          case 4:
            _context.prev = 4;
            _context.next = 7;
            return (0, _functions.getCollection)("certificates");

          case 7:
            store = _context.sent;
            _context.next = 10;
            return store.insertOne({
              hashOfCertificate: (0, _jsSha2.default)(certificate.replace(/\r?\n?/g, "")),
              secret: secret
            });

          case 10:

            res.status(200).json({ success: true });
            _context.next = 17;
            break;

          case 13:
            _context.prev = 13;
            _context.t0 = _context["catch"](4);

            console.log(_context.t0);
            res.status(500);

          case 17:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined, [[4, 13]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());

exports.default = router;