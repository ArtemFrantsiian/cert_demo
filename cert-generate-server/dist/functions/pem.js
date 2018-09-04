"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fromBase64ToPem = undefined;

var _nodeForge = require("node-forge");

var fromBase64ToPem = exports.fromBase64ToPem = function fromBase64ToPem(base64) {
  var der = _nodeForge.util.decode64(base64);
  var asn1Obj = _nodeForge.asn1.fromDer(der);
  var asnCert = _nodeForge.pki.certificateFromAsn1(asn1Obj);
  return _nodeForge.pki.certificateToPem(asnCert);
};