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
var _BibleVerseDisplay_bibleMapRef, _BibleVerseDisplay_bibleQuotes, _BibleVerseDisplay_verseFlexbox, _BibleVerseDisplay_i18nRef, _BibleVerseDisplay_tagBarRef, _BibleVerseDisplay_bibleTranslationBarRef;
import { BibleQuote, BibleBook, BibleTag, BiblePassagePos } from "./Bible.js";
import { assert } from "./Tools.js";
export class BibleVerseDisplay {
    constructor(bibleMapRef, i18nRef, tagBarRef, bibleTranslationBarRef) {
        _BibleVerseDisplay_bibleMapRef.set(this, void 0);
        _BibleVerseDisplay_bibleQuotes.set(this, void 0);
        _BibleVerseDisplay_verseFlexbox.set(this, void 0);
        _BibleVerseDisplay_i18nRef.set(this, void 0);
        _BibleVerseDisplay_tagBarRef.set(this, void 0);
        _BibleVerseDisplay_bibleTranslationBarRef.set(this, void 0);
        __classPrivateFieldSet(this, _BibleVerseDisplay_bibleMapRef, bibleMapRef, "f");
        __classPrivateFieldSet(this, _BibleVerseDisplay_bibleQuotes, [], "f");
        __classPrivateFieldSet(this, _BibleVerseDisplay_verseFlexbox, document.getElementById("verseFlexbox"), "f");
        __classPrivateFieldSet(this, _BibleVerseDisplay_i18nRef, i18nRef, "f");
        __classPrivateFieldSet(this, _BibleVerseDisplay_tagBarRef, tagBarRef, "f");
        __classPrivateFieldSet(this, _BibleVerseDisplay_bibleTranslationBarRef, bibleTranslationBarRef, "f");
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
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
                    __classPrivateFieldGet(this, _BibleVerseDisplay_bibleQuotes, "f").push(new BibleQuote(new BiblePassagePos(book, quote.startPos.c, quote.startPos.v), new BiblePassagePos(book, quote.endPos.c, quote.endPos.v), tags));
                }
            });
        });
    }
    displayQuotes() {
        var _a;
        assert(this instanceof BibleVerseDisplay, ""); /* use displayQuotes.bind(this) to achive this. */
        // Empty verse flexbox:
        // Using .innerHTML is slower
        if (__classPrivateFieldGet(this, _BibleVerseDisplay_verseFlexbox, "f")) {
            while (__classPrivateFieldGet(this, _BibleVerseDisplay_verseFlexbox, "f").firstChild) {
                __classPrivateFieldGet(this, _BibleVerseDisplay_verseFlexbox, "f").removeChild(__classPrivateFieldGet(this, _BibleVerseDisplay_verseFlexbox, "f").firstChild); // lastChild
            }
        }
        // Load verse flexbox:
        for (let bibleQuote of __classPrivateFieldGet(this, _BibleVerseDisplay_bibleQuotes, "f")) {
            if (bibleQuote.tags.find(a => a == __classPrivateFieldGet(this, _BibleVerseDisplay_tagBarRef, "f").getSelected()) != undefined) {
                //.. tag found
                // (1) Create verse text
                let bible = __classPrivateFieldGet(this, _BibleVerseDisplay_bibleMapRef, "f").get(__classPrivateFieldGet(this, _BibleVerseDisplay_bibleTranslationBarRef, "f").getSelected());
                let text = document.createElement("div");
                text.innerHTML = "<span>" + (bible === null || bible === void 0 ? void 0 : bible.get(bibleQuote.startPos, bibleQuote.endPos)) + "</span>";
                // <span> is required because bible.get() returns text which has tags and they only work like that.
                // (2) Create position box
                // 'positionContent' is required, so that the background color applies only around the position text. 
                let positionContent = document.createElement("div");
                positionContent.classList.add("bibleVerse-positionBox");
                positionContent.append(bibleQuote.getPositionStr(__classPrivateFieldGet(this, _BibleVerseDisplay_i18nRef, "f")));
                positionContent.bibleQuote = bibleQuote; /* save this for onLanguageEvent() */
                let positionBox = document.createElement("div");
                positionBox.append(positionContent);
                // (3) Create new verse
                let newVerse = document.createElement("div");
                newVerse.classList.add("verseFlexbox-item");
                newVerse.append(text);
                newVerse.append(positionBox);
                // (4) Append verse
                (_a = __classPrivateFieldGet(this, _BibleVerseDisplay_verseFlexbox, "f")) === null || _a === void 0 ? void 0 : _a.append(newVerse);
            }
        }
    }
    onLanguageEvent() {
        let bibleVersePositionBoxes = document.getElementsByClassName("bibleVerse-positionBox");
        for (let bibleVersePositionBox of bibleVersePositionBoxes) {
            bibleVersePositionBox.innerHTML = bibleVersePositionBox.bibleQuote.getPositionStr(__classPrivateFieldGet(this, _BibleVerseDisplay_i18nRef, "f"));
        }
    }
}
_BibleVerseDisplay_bibleMapRef = new WeakMap(), _BibleVerseDisplay_bibleQuotes = new WeakMap(), _BibleVerseDisplay_verseFlexbox = new WeakMap(), _BibleVerseDisplay_i18nRef = new WeakMap(), _BibleVerseDisplay_tagBarRef = new WeakMap(), _BibleVerseDisplay_bibleTranslationBarRef = new WeakMap();
//# sourceMappingURL=BibleVerseDisplay.js.map