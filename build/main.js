var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _App_instances, _App_bibleMap, _App_bibleQuotes, _App_tagFilter, _App_verseFlexbox, _App_i18n, _App_bibleTranslation, _App_initTagBar, _App_initBibleBar, _App_displayQuotes, _App_onBibleTranslationEvent, _App_onTagEvent;
import { BibleBook, BiblePassagePos, BibleQuote, BibleTag, BibleTranslation, createEberfelder1905, createLuther1545, createSchlachter1951 } from "./Bible.js";
import { I18n } from "./I18n.js";
class App {
    constructor() {
        _App_instances.add(this);
        _App_bibleMap.set(this, void 0);
        _App_bibleQuotes.set(this, void 0);
        _App_tagFilter.set(this, void 0);
        _App_verseFlexbox.set(this, void 0);
        _App_i18n.set(this, void 0);
        _App_bibleTranslation.set(this, void 0); // TODO: compare translations
        __classPrivateFieldSet(this, _App_tagFilter, BibleTag.EternalLife, "f");
        __classPrivateFieldSet(this, _App_bibleMap, new Map, "f");
        __classPrivateFieldSet(this, _App_bibleQuotes, [], "f");
        __classPrivateFieldSet(this, _App_verseFlexbox, document.getElementById("verseFlexbox"), "f");
        __classPrivateFieldSet(this, _App_i18n, new I18n(), "f");
        __classPrivateFieldSet(this, _App_bibleTranslation, BibleTranslation.Schlachter1951, "f");
    }
    // Called when webpage is loading.
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            __classPrivateFieldGet(this, _App_bibleMap, "f").set(BibleTranslation.Schlachter1951, yield createSchlachter1951());
            __classPrivateFieldGet(this, _App_bibleMap, "f").set(BibleTranslation.Eberfelder1905, yield createEberfelder1905());
            __classPrivateFieldGet(this, _App_bibleMap, "f").set(BibleTranslation.Luther1545, yield createLuther1545());
            __classPrivateFieldGet(this, _App_i18n, "f").load("de");
            console.log(__classPrivateFieldGet(this, _App_bibleMap, "f"));
            // Load bible quotes:
            // File reading: 
            // Reading files was done with 'XMLHttpRequest', but now there is the fetch API which is a lot simpler.
            // The down side is that when running the webpage on a local system it causes an CORS error, but that
            // prevents security issue, so thats fine. We are now required to run the webpage on an local webserver
            // for development purposes.
            // Note: Use 'await' to wait for the function to finish (requires a 'async' function).
            // See: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS/Errors/CORSRequestNotHttp
            yield fetch("data/bibleQuotes.json").then(response => response.json()).then(json => {
                for (let quote of json.quotes) {
                    const book = BibleBook[quote.startPos.b]; // convert string to enum
                    let tags = [];
                    for (let tag of quote.tags) {
                        tags.push(BibleTag[tag]);
                    }
                    __classPrivateFieldGet(this, _App_bibleQuotes, "f").push(new BibleQuote(new BiblePassagePos(book, quote.startPos.c, quote.startPos.v), new BiblePassagePos(book, quote.endPos.c, quote.endPos.v), tags));
                }
            });
            // Load navigation:
            yield __classPrivateFieldGet(this, _App_instances, "m", _App_initTagBar).call(this, __classPrivateFieldGet(this, _App_i18n, "f"));
            __classPrivateFieldGet(this, _App_instances, "m", _App_initBibleBar).call(this);
            // Select tag:
            const tagBar = document.getElementById("tagBar");
            __classPrivateFieldGet(this, _App_instances, "m", _App_onTagEvent).call(this, BibleTag.EternalLife, tagBar === null || tagBar === void 0 ? void 0 : tagBar.getElementsByClassName("tagBar-item")[0]); // TODO: use ids for every tag and select an default tag
            // Select bible translation:
            const bibleBar = document.getElementById("bibleBar");
            __classPrivateFieldGet(this, _App_instances, "m", _App_onBibleTranslationEvent).call(this, __classPrivateFieldGet(this, _App_bibleTranslation, "f"), bibleBar === null || bibleBar === void 0 ? void 0 : bibleBar.getElementsByClassName("bibleBar-item")[0]); // TODO: use ids for every translation and select an default translation
            // Set copyright:
            let copyrightElement = document.getElementById("copyright");
            let bible = __classPrivateFieldGet(this, _App_bibleMap, "f").get(__classPrivateFieldGet(this, _App_bibleTranslation, "f"));
            if (copyrightElement && bible) {
                copyrightElement.innerHTML = bible.htmlCopyright;
            }
            // Set title:
            let titleElement = document.getElementById("title");
            if (titleElement) {
                let title = __classPrivateFieldGet(this, _App_i18n, "f").get("title");
                if (title) {
                    titleElement.innerHTML = title;
                }
            }
        });
    }
}
_App_bibleMap = new WeakMap(), _App_bibleQuotes = new WeakMap(), _App_tagFilter = new WeakMap(), _App_verseFlexbox = new WeakMap(), _App_i18n = new WeakMap(), _App_bibleTranslation = new WeakMap(), _App_instances = new WeakSet(), _App_initTagBar = function _App_initTagBar(i18n) {
    return __awaiter(this, void 0, void 0, function* () {
        yield fetch("data/bibleQuotes.json").then(response => response.json()).then(json => {
            let tag = "";
            for (tag of json.tags) {
                // (1) Create tag btn
                let button = document.createElement("div");
                button.classList.add("tagBar-item");
                button.append(String(i18n.get(tag)));
                button.addEventListener("click", __classPrivateFieldGet(this, _App_instances, "m", _App_onTagEvent).bind(null, BibleTag[tag], button), false);
                // (2) Add tag btn
                const tagBar = document.getElementById("tagBar");
                tagBar === null || tagBar === void 0 ? void 0 : tagBar.append(button);
                //document.getElementById("tagBar")?.innerHTML += "<div onClick='onTagEvent(BibleTag." + tag + ", this)' class='tagBar-item'>" + i18n.get(tag) + "</div>";
            }
        });
    });
}, _App_initBibleBar = function _App_initBibleBar() {
    for (let [key, bible] of __classPrivateFieldGet(this, _App_bibleMap, "f")) {
        // (1) Create tag btn
        let button = document.createElement("div");
        button.classList.add("bibleBar-item");
        button.append(bible.name);
        button.addEventListener("click", __classPrivateFieldGet(this, _App_instances, "m", _App_onBibleTranslationEvent).bind(null, key, button), false);
        // (2) Add tag btn
        const bibleBar = document.getElementById("bibleBar");
        bibleBar === null || bibleBar === void 0 ? void 0 : bibleBar.append(button);
        //document.getElementById("tagBar")?.innerHTML += "<div onClick='onTagEvent(BibleTag." + tag + ", this)' class='tagBar-item'>" + i18n.get(tag) + "</div>";
    }
}, _App_displayQuotes = function _App_displayQuotes(bibleTag) {
    var _a;
    // Empty verse flexbox:
    // Using .innerHTML is slower
    if (__classPrivateFieldGet(this, _App_verseFlexbox, "f")) {
        while (__classPrivateFieldGet(this, _App_verseFlexbox, "f").firstChild) {
            __classPrivateFieldGet(this, _App_verseFlexbox, "f").removeChild(__classPrivateFieldGet(this, _App_verseFlexbox, "f").firstChild); // lastChild
        }
    }
    __classPrivateFieldSet(this, _App_tagFilter, bibleTag, "f");
    // Load verse flexbox:
    for (let bibleQuote of __classPrivateFieldGet(this, _App_bibleQuotes, "f")) {
        if (bibleQuote.tags.find(a => a == __classPrivateFieldGet(this, _App_tagFilter, "f")) != undefined) {
            //.. tag found
            // (1) Create verse text
            let bible = __classPrivateFieldGet(this, _App_bibleMap, "f").get(__classPrivateFieldGet(this, _App_bibleTranslation, "f"));
            let text = document.createElement("div");
            text.innerHTML = "<span>" + (bible === null || bible === void 0 ? void 0 : bible.get(bibleQuote.startPos, bibleQuote.endPos)) + "</span>";
            // <span> is required because bible.get() returns text which has tags and they only work like that.
            // (2) Create position box
            // 'positionContent' is required, so that the background color applies only around the position text. 
            let positionContent = document.createElement("div");
            positionContent.classList.add("bibleVerse-positionBox");
            positionContent.append(bibleQuote.getPositionStr(__classPrivateFieldGet(this, _App_i18n, "f")));
            let positionBox = document.createElement("div");
            positionBox.append(positionContent);
            // (3) Create new verse
            let newVerse = document.createElement("div");
            newVerse.classList.add("verseFlexbox-item");
            newVerse.append(text);
            newVerse.append(positionBox);
            (_a = __classPrivateFieldGet(this, _App_verseFlexbox, "f")) === null || _a === void 0 ? void 0 : _a.append(newVerse);
        }
    }
}, _App_onBibleTranslationEvent = function _App_onBibleTranslationEvent(bibleTranslation, button) {
    var _a;
    __classPrivateFieldSet(app, _App_bibleTranslation, bibleTranslation, "f");
    __classPrivateFieldGet(app, _App_instances, "m", _App_displayQuotes).call(app, __classPrivateFieldGet(app, _App_tagFilter, "f"));
    // clear 'active' class:
    let buttons = (_a = button.parentElement) === null || _a === void 0 ? void 0 : _a.children;
    if (buttons) {
        for (let it of buttons) {
            it.classList.remove("active");
        }
    }
    // Set clicked button active:
    button.classList.add("active");
    // Set copyright:
    let copyrightElement = document.getElementById("copyright");
    let bible = __classPrivateFieldGet(app, _App_bibleMap, "f").get(__classPrivateFieldGet(app, _App_bibleTranslation, "f"));
    if (copyrightElement && bible) {
        copyrightElement.innerHTML = bible.htmlCopyright;
    }
}, _App_onTagEvent = function _App_onTagEvent(bibleTag, button) {
    var _a;
    __classPrivateFieldGet(app, _App_instances, "m", _App_displayQuotes).call(app, bibleTag);
    // clear 'active' class:
    let buttons = (_a = button.parentElement) === null || _a === void 0 ? void 0 : _a.children;
    if (buttons) {
        for (let it of buttons) {
            it.classList.remove("active");
        }
    }
    // Set clicked button active:
    button.classList.add("active");
};
let app = new App();
app.init();
//# sourceMappingURL=main.js.map