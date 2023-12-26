let type = {
    0: "음모를 꾸미는 빙하유",
    1: "위험한 인물",
    2: "청초한 빙하유",
    3: "한복을 입은 빙하유",
    4: "교복을 입은 빙하유",
    5: "혐오를 표하는 빙하유",
    6: "햇반을 준비하는 빙하유",
    7: "야자수"
}

const chain = require("./chain.js");

const bing = require("./bing.json");

function generate () {
    return new Promise(async (resolve, reject) => {

        const token = await generate_token(32);

        const select = Math.floor(Math.random() * 8);

        let pickle = new Map();
        let route = new Map();
        let sum = new Map();

        for (let o = 1; o < 10; o++) {
            pickle[o] = Math.floor(Math.random() * Object.keys(bing).length);
            route[o] = await chain.createChain(pickle[o]);
            sum[o] = bing[pickle[o]][select];
        }

        console.log(pickle);

        const printer = {
            "token": token,
            "select": select,
            "pick": pickle,
            "sum": sum,

            "data": {
                "token": token,
                "type": type[select],
                "img": route
            }
        }

        return resolve(printer);

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
    generate: generate
}