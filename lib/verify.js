let verify = new Map();
let key = new Map();

function createVerify (token, sum) {
    return new Promise(async (resolve, reject) => {

        verify[token] = sum;

        return resolve(true);

    });
}

function getVerify (token, sum) {
    return new Promise(async (resolve, reject) => {

        if (verify[token]) {
            if (verify[token][1] == sum[1] && verify[token][2] == sum[2] && verify[token][3] == sum[3] && verify[token][4] == sum[4] && verify[token][5] == sum[5] && verify[token][6] == sum[6] && verify[token][7] == sum[7] && verify[token][8] == sum[8] && verify[token][9] == sum[9]) return resolve(true);
        
            else return resolve(false);
        }

        else return resolve(false);

    });
}

function expireVerify (token) {
    return new Promise(async (resolve, reject) => {

        delete verify[token];
        return resolve(true);

    });
}

function createKey () {
    return new Promise(async (resolve, reject) => {

        const keychain = await generate_token(32);
        key[keychain] = true;

        return resolve(keychain);

    });
}

function verifyKey (keychain) {
    return new Promise(async (resolve, reject) => {

        if (key[keychain]) return resolve(true);
        else return resolve(false);

    });
}

function expireKey (keychain) {
    return new Promise(async (resolve, reject) => {

        delete key[keychain];
        return resolve(true);

    });
}

function generate_token (length) {
    return new Promise(async (resolve, reject) => {
        let a = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split("");
        let b = [];
        for (let i=0; i<length; i++) {
            let j = (Math.random() * (a.length-1)).toFixed(0);
            b[i] = a[j];
        }
    
        return resolve(b.join(""));
    });
}

module.exports = {
    createVerify: createVerify,
    getVerify: getVerify,
    expireVerify: expireVerify,
    createKey: createKey,
    verifyKey: verifyKey,
    expireKey: expireKey
}