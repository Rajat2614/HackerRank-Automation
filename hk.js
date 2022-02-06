const { type } = require("os");
const puppeteer = require("puppeteer");

const codeObj = require("./codes");

const loginLink = "https://www.hackerrank.com/auth/login";
const email = "mevat48746@mxclip.com";
const password = "4R$9uVsfQ*BeUav";
let page;
let browserOpen = puppeteer.launch({
    headless: false,
    slowMo: true,
    defaultViewport: null,
    args: ["--start-maximized"]
});

browserOpen
    .then(function (browserObj) {
        let browserOpenPromise = browserObj.newPage();
        return browserOpenPromise;
    }).then(function (newTab) {
        // open google on new page
        page = newTab;
        let openHackerrank = newTab.goto(loginLink);
        return openHackerrank;
    }).then(function () {
        let emailisEntered = page.type("input[id='input-1']", email, { delay: 50 });
        return emailisEntered;
    }).then(function () {
        let passwordisEntered = page.type("input[type='password']", password, { delay: 50 });
        return passwordisEntered;
    }).then(function () {
        return waitAndClick("button[type='submit']", page);
    }).then(function () {
        let clickAlgoPromise = waitAndClick(".topic-card a[data-attr1='algorithms']", page);
        return clickAlgoPromise;
    }).then(function () {
        let clickWarmupPromise = waitAndClick("input[value='warmup']", page);
        return clickWarmupPromise;
    }).then(function () {
        let waitFor3Seconds = page.waitForTimeout(3000);
        return waitFor3Seconds;
    }).then(function () {
        let allChallengesArr = page.$$('.challenge-submit-btn', { delay: 50 });
        return allChallengesArr;
    }).then(function (questionArr) {
        for(let i=0;i<2;i++){
        let questionWillBeSolved = questionSolver(page, questionArr[i], codeObj.answers[i]);
        return questionWillBeSolved;
        }
    })

// function to wait for the page to load
function waitAndClick(selector, cPage) {
    return new Promise(function (resolve, reject) {
        let waitPromise = cPage.waitForSelector(selector);
        waitPromise.then(function () {
            let clickModal = cPage.click(selector, { delay: 50 });
            return clickModal;
        }).then(function () {
            resolve();
        }).catch(function (err) {
            reject();
        })
    })
}

function questionSolver(page, question, answer) {
    return new Promise(function (resolve, reject) {
        let questionWillBeClicked = question.click();
        questionWillBeClicked.then(function () {
            let editorInFocusPromise = waitAndClick('.monaco-editor.no-user-select.vs', page);
            return editorInFocusPromise;
        }).then(function () {
            return waitAndClick(".checkbox-input", page);
        }).then(function () {
            return page.waitForSelector("textarea[id='input-1']", page);
        }).then(function () {
            return page.type("textarea[id='input-1']", answer, { delay: 10 });
        }).then(function () {
            let ctrlIsPressed = page.keyboard.down("Control");
            return ctrlIsPressed;
        }).then(function () {
            let AisPressed = page.keyboard.press("A", { delay: 100 });
            return AisPressed;
        }).then(function () {
            let XisPressed = page.keyboard.press("X", { delay: 100 });
            return XisPressed;
        }).then(function () {
            let ctrlIsUnpressed = page.keyboard.up("Control");
            return ctrlIsUnpressed;
        }).then(function () {
            let editorInFocusPromise = waitAndClick('.monaco-editor.no-user-select.vs', page);
            return editorInFocusPromise;
        }).then(function () {
            let ctrlIsPressed = page.keyboard.down("Control");
            return ctrlIsPressed;
        }).then(function () {
            let AisPressed = page.keyboard.press("A", { delay: 100 });
            return AisPressed;
        }).then(function () {
            let VisPressed = page.keyboard.press("V", { delay: 100 });
            return VisPressed;
        }).then(function () {
            let ctrlIsUnpressed = page.keyboard.up("Control");
            return ctrlIsUnpressed;
        }).then(function () {
            return page.click('.hr-monaco-submit', {delay:50}); 
        }).then(function () {
            resolve();
        }).catch(function (err) {
            reject();
        })
    })
}