let chain = new Map();

function createChain (index) {
    return new Promise(async (resolve, reject) => {

        const token = await generate_token(8);

        chain[token] = index;

        return resolve(token);

    });
}

function getChain (token) {
    return new Promise(async (resolve, reject) => {

        if (chain[token] || chain[token] === 0) return resolve(chain[token]);
        else return resolve(null);

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
    createChain: createChain,
    getChain: getChain
}