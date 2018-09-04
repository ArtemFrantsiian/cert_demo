"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _remme = require("remme");

var _remme2 = _interopRequireDefault(_remme);

var _remmeUtils = require("remme-utils");

var _redis = require("redis");

var _redis2 = _interopRequireDefault(_redis);

var _jsSha = require("js-sha256");

var _jsSha2 = _interopRequireDefault(_jsSha);

var _config = require("../config");

var _functions = require("../functions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var remme = new _remme2.default.Client({
  networkConfig: {
    nodeAddress: _config.nodeAddress
  }
});
var router = _express2.default.Router();
var session = _redis2.default.createClient();

router.get("/", function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var certificate, cert, backURL, isValid, check, userId, store, _ref2, secret;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            certificate = decodeURIComponent(req.get('X-SSL-Client-Cert'));
            cert = (0, _remmeUtils.certificateFromPem)(certificate);
            backURL = req.header('Referer');

            if (!certificate) {
              _context.next = 31;
              break;
            }

            isValid = false;
            _context.prev = 5;
            _context.next = 8;
            return remme.certificate.check(certificate);

          case 8:
            check = _context.sent;

            isValid = check.valid;
            _context.next = 15;
            break;

          case 12:
            _context.prev = 12;
            _context.t0 = _context["catch"](5);

            res.redirect(backURL + "?isOk=false&name=false&userId=false&ga=false");

          case 15:
            userId = (0, _functions.getUserId)();

            session.set(userId, certificate);

            if (!isValid) {
              _context.next = 28;
              break;
            }

            _context.next = 20;
            return (0, _functions.getCollection)("certificates");

          case 20:
            store = _context.sent;
            _context.next = 23;
            return store.findOne({ hashOfCertificate: (0, _jsSha2.default)(certificate.replace(/\r?\n?/g, "")) });

          case 23:
            _ref2 = _context.sent;
            secret = _ref2.secret;

            res.redirect(backURL + "?isOk=true&name=" + cert.subject.getField('CN').value.split(" ")[0] + "&userId=" + userId + "&ga=" + !!secret);
            _context.next = 29;
            break;

          case 28:
            res.redirect(backURL + "?isOk=false&name=false&userId=false&ga=false");

          case 29:
            _context.next = 32;
            break;

          case 31:
            res.redirect(backURL + "?isOk=false&name=false&userId=false&ga=false");

          case 32:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined, [[5, 12]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());

router.delete('/', function (req, res) {
  var userId = req.body.userId;

  session.del(userId);
  res.json({ success: true });
});

exports.default = router;