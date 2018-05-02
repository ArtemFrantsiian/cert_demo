import speakeasy from 'speakeasy';

export const verifySecret = (secret, userToken) => {
    return speakeasy.totp.verify({
        secret: secret.base32,
        encoding: 'base32',
        token: userToken
    });
};
