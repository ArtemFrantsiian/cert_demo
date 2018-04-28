import {asn1, pki, util} from "node-forge";

export const fromBase64ToPem = base64 => {
  const der = util.decode64(base64);
  const asn1Obj = asn1.fromDer(der);
  const asnCert = pki.certificateFromAsn1(asn1Obj);
  return pki.certificateToPem(asnCert)
};