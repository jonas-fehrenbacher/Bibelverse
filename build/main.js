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
var _App_instances, _App_bibleMap, _App_i18n, _App_tagBar, _App_title, _App_bibleTranslationBar, _App_bibleVerseDisplay, _App_onLanguageEvent;
import { BibleTranslation, createEberfelder1905, createLuther1545, createSchlachter1951 } from "./Bible.js";
import { I18n } from "./I18n.js";
import { TagBar } from "./TagBar.js";
import { Title } from "./Title.js";
import { BibleTranslationBar } from "./BibleTranslationBar.js";
import { BibleVerseDisplay } from "./BibleVerseDisplay.js";
class App {
    constructor() {
        _App_instances.add(this);
        _App_bibleMap.set(this, void 0);
        _App_i18n.set(this, void 0);
        _App_tagBar.set(this, void 0);
        _App_title.set(this, void 0);
        _App_bibleTranslationBar.set(this, void 0);
        _App_bibleVerseDisplay.set(this, void 0);
        __classPrivateFieldSet(this, _App_bibleMap, new Map, "f");
        __classPrivateFieldSet(this, _App_i18n, new I18n, "f");
        __classPrivateFieldSet(this, _App_title, new Title, "f");
        __classPrivateFieldSet(this, _App_tagBar, new TagBar(__classPrivateFieldGet(this, _App_i18n, "f")), "f");
        __classPrivateFieldSet(this, _App_bibleTranslationBar, new BibleTranslationBar(__classPrivateFieldGet(this, _App_bibleMap, "f")), "f");
        __classPrivateFieldSet(this, _App_bibleVerseDisplay, new BibleVerseDisplay(__classPrivateFieldGet(this, _App_bibleMap, "f"), __classPrivateFieldGet(this, _App_i18n, "f"), __classPrivateFieldGet(this, _App_tagBar, "f"), __classPrivateFieldGet(this, _App_bibleTranslationBar, "f")), "f");
    }
    // Called when webpage is loading.
    init() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            // Init bible map:
            __classPrivateFieldGet(this, _App_bibleMap, "f").set(BibleTranslation.Schlachter1951, yield createSchlachter1951());
            __classPrivateFieldGet(this, _App_bibleMap, "f").set(BibleTranslation.Eberfelder1905, yield createEberfelder1905());
            __classPrivateFieldGet(this, _App_bibleMap, "f").set(BibleTranslation.Luther1545, yield createLuther1545());
            // Init i18n:
            yield __classPrivateFieldGet(this, _App_i18n, "f").load("de");
            (_a = document.getElementById("languageSelector")) === null || _a === void 0 ? void 0 : _a.addEventListener("change", __classPrivateFieldGet(this, _App_instances, "m", _App_onLanguageEvent), false);
            // Init bible verse display:
            yield __classPrivateFieldGet(this, _App_bibleVerseDisplay, "f").init();
            // Load navigation:
            yield __classPrivateFieldGet(this, _App_tagBar, "f").init(__classPrivateFieldGet(this, _App_bibleVerseDisplay, "f").displayQuotes.bind(__classPrivateFieldGet(this, _App_bibleVerseDisplay, "f"))); /* bind() defines 'BibleVerseDisplay::displayQuotes::this' */
            __classPrivateFieldGet(this, _App_bibleTranslationBar, "f").init(__classPrivateFieldGet(this, _App_bibleVerseDisplay, "f").displayQuotes.bind(__classPrivateFieldGet(this, _App_bibleVerseDisplay, "f")));
            // Set copyright:
            let copyrightElement = document.getElementById("copyright");
            let bible = __classPrivateFieldGet(this, _App_bibleMap, "f").get(__classPrivateFieldGet(this, _App_bibleTranslationBar, "f").getSelected());
            if (copyrightElement && bible) {
                copyrightElement.innerHTML = bible.htmlCopyright;
            }
            // Set title:
            __classPrivateFieldGet(this, _App_title, "f").onLanguageEvent(__classPrivateFieldGet(this, _App_i18n, "f"));
        });
    }
}
_App_bibleMap = new WeakMap(), _App_i18n = new WeakMap(), _App_tagBar = new WeakMap(), _App_title = new WeakMap(), _App_bibleTranslationBar = new WeakMap(), _App_bibleVerseDisplay = new WeakMap(), _App_instances = new WeakSet(), _App_onLanguageEvent = function _App_onLanguageEvent() {
    return __awaiter(this, void 0, void 0, function* () {
        // Update i18n:
        let languageSelector = document.getElementById("languageSelector");
        if (languageSelector.value != __classPrivateFieldGet(app, _App_i18n, "f").getLanguage()) {
            yield __classPrivateFieldGet(app, _App_i18n, "f").load(languageSelector.value); /* 'await' is required otherwise thread runs further and leaving the translation undefined. */
        }
        __classPrivateFieldGet(app, _App_tagBar, "f").onLanguageEvent();
        __classPrivateFieldGet(app, _App_title, "f").onLanguageEvent(__classPrivateFieldGet(app, _App_i18n, "f"));
        __classPrivateFieldGet(app, _App_bibleVerseDisplay, "f").onLanguageEvent();
    });
};
let app = new App();
app.init();
//# sourceMappingURL=main.js.map