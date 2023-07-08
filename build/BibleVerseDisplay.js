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
var _BibleVerseDisplay_instances, _BibleVerseDisplay_bibleMapRef, _BibleVerseDisplay_bibleQuotes, _BibleVerseDisplay_verseFlexbox, _BibleVerseDisplay_i18nRef, _BibleVerseDisplay_tagBarRef, _BibleVerseDisplay_bibleTranslationBarRef, _BibleVerseDisplay_messageBusRef, _BibleVerseDisplay_verseViewSelectorRef, _BibleVerseDisplay_displayQuotes, _BibleVerseDisplay_onMessage;
import { BibleQuote, BibleBook, BiblePassagePos } from "./BibleQuote.js";
import { assert } from "./Tools.js";
import { DataPath } from "./DataPath.js";
import { Message } from "./MessageBus.js";
import { VerseView } from "./VerseViewSelector.js";
export class BibleVerseDisplay {
    constructor(bibleMapRef, messageBusRef, i18nRef, tagBarRef, bibleTranslationBarRef, verseViewSelectorRef) {
        _BibleVerseDisplay_instances.add(this);
        _BibleVerseDisplay_bibleMapRef.set(this, void 0);
        _BibleVerseDisplay_bibleQuotes.set(this, void 0);
        _BibleVerseDisplay_verseFlexbox.set(this, void 0);
        _BibleVerseDisplay_i18nRef.set(this, void 0);
        _BibleVerseDisplay_tagBarRef.set(this, void 0);
        _BibleVerseDisplay_bibleTranslationBarRef.set(this, void 0);
        _BibleVerseDisplay_messageBusRef.set(this, void 0);
        _BibleVerseDisplay_verseViewSelectorRef.set(this, void 0);
        __classPrivateFieldSet(this, _BibleVerseDisplay_bibleMapRef, bibleMapRef, "f");
        __classPrivateFieldSet(this, _BibleVerseDisplay_bibleQuotes, [], "f");
        __classPrivateFieldSet(this, _BibleVerseDisplay_verseFlexbox, document.getElementById("verseFlexbox"), "f");
        __classPrivateFieldSet(this, _BibleVerseDisplay_i18nRef, i18nRef, "f");
        __classPrivateFieldSet(this, _BibleVerseDisplay_tagBarRef, tagBarRef, "f");
        __classPrivateFieldSet(this, _BibleVerseDisplay_bibleTranslationBarRef, bibleTranslationBarRef, "f");
        __classPrivateFieldSet(this, _BibleVerseDisplay_messageBusRef, messageBusRef, "f");
        __classPrivateFieldSet(this, _BibleVerseDisplay_verseViewSelectorRef, verseViewSelectorRef, "f");
        __classPrivateFieldGet(this, _BibleVerseDisplay_messageBusRef, "f").add(__classPrivateFieldGet(this, _BibleVerseDisplay_instances, "m", _BibleVerseDisplay_onMessage).bind(this));
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
            yield fetch(DataPath.BibleQuotes).then(response => response.json()).then(json => {
                console.log(json.quotes);
                for (let quote of json.quotes) {
                    assert(quote["passage"] && quote["tags"], ""); // this two fields are expected
                    let bookName = quote.passage[0];
                    let startChapter = 0;
                    let startVerse = 0;
                    let endChapter = 0;
                    let endVerse = 0;
                    // passage: <book>, start-chapter, start-verse [[, end-chapter], end-verse]
                    if (quote.passage.length == 3) {
                        startChapter = quote.passage[1];
                        startVerse = quote.passage[2];
                        endChapter = startChapter;
                        endVerse = startVerse;
                    }
                    else if (quote.passage.length == 4) {
                        startChapter = quote.passage[1];
                        startVerse = quote.passage[2];
                        endChapter = startChapter;
                        endVerse = quote.passage[3];
                    }
                    else if (quote.passage.length == 5) {
                        startChapter = quote.passage[1];
                        startVerse = quote.passage[2];
                        endChapter = quote.passage[3];
                        endVerse = quote.passage[4];
                    }
                    const book = BibleBook[bookName]; // convert string to enum
                    let tags = [];
                    for (let tag of quote.tags) {
                        tags.push(tag);
                    }
                    __classPrivateFieldGet(this, _BibleVerseDisplay_bibleQuotes, "f").push(new BibleQuote(new BiblePassagePos(book, startChapter, startVerse), new BiblePassagePos(book, endChapter, endVerse), tags));
                }
            });
            // Sort bible quotes:
            __classPrivateFieldGet(this, _BibleVerseDisplay_bibleQuotes, "f").sort((a, b) => { return a.compare(b); });
        });
    }
}
_BibleVerseDisplay_bibleMapRef = new WeakMap(), _BibleVerseDisplay_bibleQuotes = new WeakMap(), _BibleVerseDisplay_verseFlexbox = new WeakMap(), _BibleVerseDisplay_i18nRef = new WeakMap(), _BibleVerseDisplay_tagBarRef = new WeakMap(), _BibleVerseDisplay_bibleTranslationBarRef = new WeakMap(), _BibleVerseDisplay_messageBusRef = new WeakMap(), _BibleVerseDisplay_verseViewSelectorRef = new WeakMap(), _BibleVerseDisplay_instances = new WeakSet(), _BibleVerseDisplay_displayQuotes = function _BibleVerseDisplay_displayQuotes() {
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
            let isMobile = false;
            if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                isMobile = true;
            }
            // (1) Create verse text
            let bible = __classPrivateFieldGet(this, _BibleVerseDisplay_bibleMapRef, "f").get(__classPrivateFieldGet(this, _BibleVerseDisplay_bibleTranslationBarRef, "f").getSelected());
            let text = String(bible === null || bible === void 0 ? void 0 : bible.get(bibleQuote.startPos, bibleQuote.endPos));
            let textElement = document.createElement("div");
            textElement.innerHTML = "<span>" + text + "</span>";
            // <span> is required because bible.get() returns text which has tags and they only work like that.
            // (2) Create position box
            // 'positionContent' is required, so that the background color applies only around the position text.
            let bibleQuotePositionStr = bibleQuote.getPositionStr(__classPrivateFieldGet(this, _BibleVerseDisplay_i18nRef, "f"));
            let positionContent = document.createElement("a");
            positionContent.classList.add("bibleVerse-positionBox");
            positionContent.append(bibleQuotePositionStr);
            positionContent.title = "to bibleserver.com";
            positionContent.href = "https://www.bibleserver.com/" + (bible === null || bible === void 0 ? void 0 : bible.nameOnBibleServer) + "/" + bibleQuotePositionStr;
            positionContent.target = "_blank"; /* open in new tab */
            positionContent.rel = "noopener noreferrer"; /* security reasons, see: https://mathiasbynens.github.io/rel-noopener/; https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#attr-target */
            positionContent.bibleQuote = bibleQuote; /* save this for onLanguageEvent() */
            let positionBox = document.createElement("div");
            positionBox.append(positionContent);
            // (3) Create new verse
            let newVerse = document.createElement("div");
            // Set view:
            if (__classPrivateFieldGet(this, _BibleVerseDisplay_verseViewSelectorRef, "f").getSelected() == VerseView.Grid) {
                newVerse.classList.add("verseFlexbox-item", "verseFlexbox-item-gridView");
            }
            else
                newVerse.classList.add("verseFlexbox-item", "verseFlexbox-item-listView");
            // Set tile size:
            if (isMobile) {
                if (text.length > 100 && text.length < 200) {
                    newVerse.classList.add("verseFlexbox-item-medium");
                }
                else if (text.length >= 200) {
                    newVerse.classList.add("verseFlexbox-item-big");
                }
            }
            else {
                // ..desktop
                if (text.length > 200 && text.length < 400) {
                    newVerse.classList.add("verseFlexbox-item-medium");
                }
                else if (text.length >= 400) {
                    newVerse.classList.add("verseFlexbox-item-big");
                }
            }
            // Append childs:
            newVerse.append(textElement);
            newVerse.append(positionBox);
            // (4) Append verse
            (_a = __classPrivateFieldGet(this, _BibleVerseDisplay_verseFlexbox, "f")) === null || _a === void 0 ? void 0 : _a.append(newVerse);
        }
    }
}, _BibleVerseDisplay_onMessage = function _BibleVerseDisplay_onMessage(message) {
    if (message == Message.LanguageChanged) {
        let bibleVersePositionBoxes = document.getElementsByClassName("bibleVerse-positionBox");
        for (let bibleVersePositionBox of bibleVersePositionBoxes) {
            bibleVersePositionBox.innerHTML = bibleVersePositionBox.bibleQuote.getPositionStr(__classPrivateFieldGet(this, _BibleVerseDisplay_i18nRef, "f"));
        }
    }
    else if (message == Message.TagChanged || message == Message.TranslationChanged || message == Message.VerseViewChanged) {
        __classPrivateFieldGet(this, _BibleVerseDisplay_instances, "m", _BibleVerseDisplay_displayQuotes).call(this); // reset bible quotes if tag or translation changed
    }
};
//# sourceMappingURL=BibleVerseDisplay.js.map