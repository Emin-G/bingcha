let getBingcha;

//CSS
let bingcha_css = document.createElement("link");
bingcha_css.setAttribute("id", "bingcha_css");
bingcha_css.setAttribute("rel", "stylesheet");
bingcha_css.setAttribute("type", "text/css");
bingcha_css.setAttribute("href", "https://bingcha.preming.link/css/style.css");
document.head.appendChild(bingcha_css);
//CSS

window.addEventListener("load", () => {
    let bingcha_key = null;

    getBingcha = function getBingcha () {
        return bingcha_key;
    }

    //HTML
    const bingcha_html = `
        <div id="bingcha_main">
            <div id="bingcha_check"></div>
            <p class="bingcha_sub">빙구가 아닙니다.</p>

            <div class="bingcha_right">
                <div class="bingcha_vt">
                    <div id="bingcha_icon"></div>
                    <p class="bingcha_txt">Bingcha</p>
                </div>

                <div class="bingcha_ht">
                    <p class="bingcha_tip">개인정보 보호</p>
                    <p class="bingcha_tip">약관</p>
                </div>
            </div>
        </div>

        <div id="bingcha_task">
            <div id="bingcha_top">
                <p class="bingcha_tilt" id="bingcha_type">음모를 꾸미는 빙하유</p>
                <p class="bingcha_mid">이(가) 있는 이미지를 모두 선택하세요</p>
                <p class="bingcha_mid">위의 조건과 일치하는 새 이미지를 모두 선택했으면 확인을 클릭하세요</p>
            </div>

            <div id="bingcha_content">
                <div class="bingcha_ht">
                    <div class="bingcha_pic" id="bingcha_1">
                        <div class="bingcha_checked" id="bingcha_1c"></div>
                    </div>

                    <div class="bingcha_pic" id="bingcha_2">
                        <div class="bingcha_checked" id="bingcha_2c"></div>
                    </div>

                    <div class="bingcha_pic" id="bingcha_3">
                        <div class="bingcha_checked" id="bingcha_3c"></div>
                    </div>
                </div>

                <div class="bingcha_ht">
                    <div class="bingcha_pic" id="bingcha_4">
                        <div class="bingcha_checked" id="bingcha_4c"></div>
                    </div>

                    <div class="bingcha_pic" id="bingcha_5">
                        <div class="bingcha_checked" id="bingcha_5c"></div>
                    </div>

                    <div class="bingcha_pic" id="bingcha_6">
                        <div class="bingcha_checked" id="bingcha_6c"></div>
                    </div>
                </div>

                <div class="bingcha_ht">
                    <div class="bingcha_pic" id="bingcha_7">
                        <div class="bingcha_checked" id="bingcha_7c"></div>
                    </div>
                    
                    <div class="bingcha_pic" id="bingcha_8">
                        <div class="bingcha_checked" id="bingcha_8c"></div>
                    </div>

                    <div class="bingcha_pic" id="bingcha_9">
                        <div class="bingcha_checked" id="bingcha_9c"></div>
                    </div>
                </div>

                <p id="bingcha_nope">모든 이미지를 선택해주세요.</p>
            </div>

            <div id="bingcha_bottom">
                <div id="bingcha_reload"></div>
                <div id="bingcha_audio"></div>
                <div id="bingcha_info"></div>

                <div class="bingcha_right">
                    <div id="bingcha_ent">건너뛰기</div>
                </div>
            </div>
        </div>
    `;

    document.getElementById("bingcha").innerHTML = bingcha_html;
    //HTML

    let checked;

    document.getElementById("bingcha_check").addEventListener("click", () => {
        checked = {
            1: false,
            2: false,
            3: false,
            4: false,
            5: false,
            6: false,
            7: false,
            8: false,
            9: false
        };

        //Load Bingcha
        document.getElementById("bingcha_check").style.animation = "0.5s 0s 1 check_close forwards";
        setTimeout(() => {
            document.getElementById("bingcha_check").style.backgroundColor = "transparent";
            document.getElementById("bingcha_check").style.border = "2px solid transparent";
            document.getElementById("bingcha_check").style.backgroundImage = "url('https://bingcha.preming.link/img/load1.gif')";
            document.getElementById("bingcha_check").style.backgroundSize = "80%";
            document.getElementById("bingcha_check").style.animation = "";
        }, 500);
        //Load Bingcha

        getJSON("create", (bingcha) => {
            //Open Bingcha
            setTimeout(() => {
                document.getElementById("bingcha_type").innerText = bingcha.type;

                document.getElementById("bingcha_check").style.animation = "0.5s 0s 1 check_open forwards";
                document.getElementById("bingcha_check").style.backgroundColor = "white";
                document.getElementById("bingcha_check").style.border = "2px solid #d2d2d2";
                document.getElementById("bingcha_check").style.backgroundImage = "";
                document.getElementById("bingcha_check").style.backgroundSize = "contain";

                document.getElementById("bingcha_task").style.display = "flex";
                document.getElementById("bingcha_task").style.animation = "1s 0s 1 bingcha_open forwards";
            }, 1000);
            //Open Bingcha

            //Load Bingcha Picker
            for (let o = 1; o < 10; o++) {
                regPick(o);
            }
        
            function regPick (index) {
                document.getElementById("bingcha_" + index).outerHTML = document.getElementById("bingcha_" + index).outerHTML;
                document.getElementById("bingcha_" + index + "c").style.display = "none";
                document.getElementById("bingcha_" + index).style.backgroundSize = "100%";

                document.getElementById("bingcha_" + index).addEventListener("click", () => {
                    if (!checked[index]) {
                        document.getElementById("bingcha_" + index + "c").style.display = "flex";
                        document.getElementById("bingcha_" + index).style.backgroundSize = "80%";
                        checked[index] = true;
                    }
        
                    else {
                        document.getElementById("bingcha_" + index + "c").style.display = "none";
                        document.getElementById("bingcha_" + index).style.backgroundSize = "100%";
                        checked[index] = false;
                    }
        
                    if (checked[1] || checked[2] || checked[3] || checked[4] || checked[5] || checked[6] || checked[7] || checked[8] || checked[9]) document.getElementById("bingcha_ent").innerText = "확인";
                    else document.getElementById("bingcha_ent").innerText = "건너뛰기";
                });
        
                document.getElementById("bingcha_" + index).style.backgroundImage = "url('https://bingcha.preming.link/api/getImage?token=" + bingcha.img[index] + "')";
            }
            //Load Bingcha Picker

            //Load Bingcha Summit
            document.getElementById("bingcha_ent").outerHTML = document.getElementById("bingcha_ent").outerHTML;
            document.getElementById("bingcha_ent").addEventListener("click", () => {
                document.getElementById("bingcha_check").style.animation = "0.5s 0s 1 check_close forwards";
                setTimeout(() => {
                    document.getElementById("bingcha_check").style.backgroundColor = "transparent";
                    document.getElementById("bingcha_check").style.border = "2px solid transparent";
                    document.getElementById("bingcha_check").style.backgroundImage = "url('https://bingcha.preming.link/img/load2.gif')";
                    document.getElementById("bingcha_check").style.backgroundSize = "80%";
                    document.getElementById("bingcha_check").style.animation = "";
                }, 500);

                poster("submit?token=" + bingcha.token, JSON.stringify(checked), async (vRes) => {
                    if (vRes) {
                        vRes = await vRes.json();
                        console.log(vRes);
                        bingcha_key = vRes.key;
                        return endup();
                    }

                    else return nope();
                });

                function endup () {
                    setTimeout(() => {
                        document.getElementById("bingcha_check").style.animation = "0.5s 0s 1 check_open";
                        document.getElementById("bingcha_check").style.backgroundImage = "url('https://bingcha.preming.link/img/clear.gif')";
                        document.getElementById("bingcha_check").style.backgroundSize = "contain";
                    }, 1000);
                    
                    document.getElementById("bingcha_task").style.animation = "1s 0s 1 bingcha_close forwards";
                    setTimeout(() => {
                        document.getElementById("bingcha_task").style.display = "none";
                    }, 1000);
                }
        
                function nope () {
                    setTimeout(() => {
                        document.getElementById("bingcha_check").style.animation = "0.5s 0s 1 check_open forwards";
                        document.getElementById("bingcha_check").style.backgroundColor = "white";
                        document.getElementById("bingcha_check").style.border = "2px solid #d2d2d2";
                        document.getElementById("bingcha_check").style.backgroundImage = "";
                        document.getElementById("bingcha_check").style.backgroundSize = "contain";
                    }, 1000);

                    document.getElementById("bingcha_nope").style.display = "flex";
                }
            });
            //Load Bingcha Summit
        });
    });

    async function getJSON (path, callback) {
        await fetch("https://bingcha.preming.link/api/" + path, {
            method: "GET",
            cache: "no-cache"
        })
    
        .then((response) => {
            if (response.status != 200) return null;
            return response.json();
        })
        
        .then((data) => {
            return callback(data);
        })
        
        .catch((error) => {
            console.log(error);
            return null;
        });
    }
    
    async function poster (path, data, callback) {
        await fetch("https://bingcha.preming.link/api/" + path, {
            method: "POST",
            cache: "no-cache",
            headers: {
                "Content-Type": "application/json"
            },
            body: data
        })
    
        .then((response) => {
            if (response.status != 200) return null;
            return response;
        })
        
        .then((data) => {
            return callback(data);
        })
        
        .catch((error) => {
            console.log(error);
            return null;
        });
    }

});