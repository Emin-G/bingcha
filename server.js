const express = require("express");
const app = express();

const helmet = require("helmet");
app.use(helmet({ crossOriginResourcePolicy: false }));

const path = require("path");

//POST Body Parser
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//POST Body Parser

const bingcha = require("./lib/bingcha.js");
const chain = require("./lib/chain.js");
const verify = require("./lib/verify.js");

//Routing
app.use("/css", express.static("sources/css"));
app.use("/img", express.static("sources/img"));
app.use("/js", express.static("sources/js"));
//Routing

app.get("/", async (req, res) => {
    console.log(req);
    return res.sendFile(path.join(__dirname, "./main/index.html"));
});

app.get("/api/:type", async (req, res) => {
    console.log(req);

    if (!req.params.type) return res.status(404).send();

    if (req.params.type === "create") {
        const cha_data = await bingcha.generate();

        console.log(cha_data);

        await verify.createVerify(cha_data.token, cha_data.sum);

        return res.status(200).send(JSON.stringify(cha_data.data));
    }

    else if (req.params.type === "getImage") {
        if (!req.query.token && req.query.token !== 0) return res.status(404).send();

        let tempChain = await chain.getChain(req.query.token);
        
        if (tempChain || tempChain === 0) return res.sendFile(path.join(__dirname, "./sources/bing/" + tempChain + ".png"));
        else return res.status(404).send();
    }

    else if (req.params.type === "verify") {
        if (!req.query.key) return res.status(404).send();

        const kVer = await verify.verifyKey(req.query.key);

        if (kVer) {
            await verify.expireKey(req.query.key);
            return res.status(200).send();
        }

        else return res.status(401).send();
    }

    else return res.status(404).send();
});

app.post("/api/:type", async (req, res) => {
    console.log(req);

    if (req.params.type === "submit") {
        if (!req.query.token) return res.status(404).send();

        console.log(req.body);

        let vRes = await verify.getVerify(req.query.token, req.body);

        if (vRes) {
            await verify.expireVerify(req.query.token);
            const keychain = await verify.createKey();

            return res.status(200).send('{"key": "' + keychain + '"}');
        }
        else return res.status(401).send();
    }

    else return res.status(404).send();
});

//404 Page
app.get("*", async (req, res) => {
    console.log(req);
    return res.status(404).sendFile(path.join(__dirname, "./main/404.html"));
});
//404 Page

//5xx Page
app.use(async (err, req, res) => {
    console.log(req);
    console.log(err);
    return res.sendFile(path.join(__dirname, "./main/5xx.html"));
});
//5xx Page

app.listen(7000, () => {
    console.log("Web Server is Running!");
});