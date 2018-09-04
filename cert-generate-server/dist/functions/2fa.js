'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.verifySecret = undefined;

var _speakeasy = require('speakeasy');

var _speakeasy2 = _interopRequireDefault(_speakeasy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var verifySecret = exports.verifySecret = function verifySecret(secret, userToken) {
    return _speakeasy2.default.totp.verify({
        secret: secret.base32,
        encoding: 'base32',
        token: userToken
    });
};