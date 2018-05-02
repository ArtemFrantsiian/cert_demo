import {asn1, pkcs12, pki, rsa, util} from "node-forge";

export const createKeys = () => rsa.generateKeyPair(1024);

export const createCSR = ({ publicKey, privateKey, firstName, lastName, email }) => {
  const csr = pki.createCertificationRequest();
  csr.publicKey = publicKey;
  csr.setSubject([{
    name: 'commonName',
    value: `${firstName} ${lastName}`
  }, {
    name: 'countryName',
    value: 'UA'
  }, {
    shortName: 'ST',
    value: 'KIEV'
  }, {
    name: 'localityName',
    value: 'Kiev'
  }, {
    name: 'organizationName',
    value: 'REMME'
  }, {
    shortName: 'OU',
    value: 'Devops'
  }, {
    shortName: 'E',
    value: email
  }]);
  csr.sign(privateKey);
  return pki.certificationRequestToPem(csr)
};

export const createP12 = ({ privateKey, certificate, passphrase }) => {
  const newPkcs12Asn1 = pkcs12.toPkcs12Asn1(
    privateKey, [certificate], passphrase,
    { generateLocalKeyId: true, friendlyName: 'test', algorithm: '3des' });
  const newPkcs12Der = asn1.toDer(newPkcs12Asn1).getBytes();
  return util.encode64(newPkcs12Der);
};

export const createLink = ({ p12 }) => {
  const pkcs12AsBlob = `data:application/x-pkcs12;base64,${p12}`;
  const downloadLink = document.createElement("a");
  downloadLink.download = "pkcs12.p12";
  downloadLink.innerHTML = "Download File";

  // downloadLink.href = window.URL.createObjectURL(pkcs12AsBlob);
  downloadLink.href = pkcs12AsBlob;
  downloadLink.onclick = this.destroyClickedElement;
  downloadLink.style.display = "none";
  document.body.appendChild(downloadLink);

  downloadLink.click();
};