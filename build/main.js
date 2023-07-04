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
var _App_instances, _App_schlachter1951, _App_bibleQuotes, _App_tagFilter, _App_verseFlexbox, _App_i18n, _App_displayBibleTags, _App_displayQuotes, _App_onTagEvent;
import { Bible, BibleBook, BiblePassagePos, BibleQuote, BibleTag, createSchlachter1951 } from "./Bible.js";
import { I18n } from "./I18n.js";
class App {
    constructor() {
        _App_instances.add(this);
        _App_schlachter1951.set(this, void 0);
        _App_bibleQuotes.set(this, void 0);
        _App_tagFilter.set(this, void 0);
        _App_verseFlexbox.set(this, void 0);
        _App_i18n.set(this, void 0);
        __classPrivateFieldSet(this, _App_tagFilter, BibleTag.EternalLife, "f");
        __classPrivateFieldSet(this, _App_schlachter1951, new Bible([], "", ""), "f");
        __classPrivateFieldSet(this, _App_bibleQuotes, [], "f");
        __classPrivateFieldSet(this, _App_verseFlexbox, document.getElementById("verseFlexbox"), "f");
        __classPrivateFieldSet(this, _App_i18n, new I18n(), "f");
    }
    // Called when webpage is loading.
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            __classPrivateFieldSet(this, _App_schlachter1951, yield createSchlachter1951(), "f");
            __classPrivateFieldGet(this, _App_i18n, "f").load("de");
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
            yield __classPrivateFieldGet(this, _App_instances, "m", _App_displayBibleTags).call(this, __classPrivateFieldGet(this, _App_i18n, "f"));
            // Select tag:
            const navElement = document.getElementsByTagName("nav")[0];
            __classPrivateFieldGet(this, _App_instances, "m", _App_onTagEvent).call(this, BibleTag.EternalLife, navElement.getElementsByClassName("nav-item")[0]);
            // Set copyright:
            let copyrightElement = document.getElementById("copyright");
            if (copyrightElement)
                copyrightElement.innerHTML = __classPrivateFieldGet(this, _App_schlachter1951, "f").htmlCopyright;
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
_App_schlachter1951 = new WeakMap(), _App_bibleQuotes = new WeakMap(), _App_tagFilter = new WeakMap(), _App_verseFlexbox = new WeakMap(), _App_i18n = new WeakMap(), _App_instances = new WeakSet(), _App_displayBibleTags = function _App_displayBibleTags(i18n) {
    return __awaiter(this, void 0, void 0, function* () {
        yield fetch("data/bibleQuotes.json").then(response => response.json()).then(json => {
            let tag = "";
            for (tag of json.tags) {
                let button = document.createElement("div");
                button.classList.add("nav-item");
                button.append(String(i18n.get(tag)));
                button.addEventListener("click", __classPrivateFieldGet(this, _App_instances, "m", _App_onTagEvent).bind(null, BibleTag[tag], button), false);
                let tagBox = document.getElementsByTagName("nav")[0];
                tagBox.append(button);
                //document.getElementsByTagName("nav")[0].innerHTML += "<div onClick='onTagEvent(BibleTag." + tag + ", this)' class='nav-item'>" + i18n.get(tag) + "</div>";
            }
        });
    });
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
            let text = document.createElement("div");
            text.innerHTML = "<span>" + __classPrivateFieldGet(this, _App_schlachter1951, "f").get(bibleQuote.startPos, bibleQuote.endPos) + "</span>";
            // <span> is required because bible.get() returns text which has tags and they only work like that.
            let positionContent = document.createElement("div");
            positionContent.classList.add("bibleVerse-positionBox");
            positionContent.append(bibleQuote.getPositionStr(__classPrivateFieldGet(this, _App_i18n, "f")));
            let positionBox = document.createElement("div");
            positionBox.append(positionContent);
            let newVerse = document.createElement("div");
            newVerse.classList.add("verseFlexbox-item");
            newVerse.append(text);
            newVerse.append(positionBox);
            (_a = __classPrivateFieldGet(this, _App_verseFlexbox, "f")) === null || _a === void 0 ? void 0 : _a.append(newVerse);
        }
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