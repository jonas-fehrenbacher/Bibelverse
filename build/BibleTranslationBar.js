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
var _BibleTranslationBar_instances, _BibleTranslationBar_bibleTranslation, _BibleTranslationBar_bibleMapRef, _BibleTranslationBar_displayQuotes, _BibleTranslationBar_onEvent;
import { BibleTranslation } from "./Bible.js";
export class BibleTranslationBar {
    constructor(bibleMap) {
        _BibleTranslationBar_instances.add(this);
        _BibleTranslationBar_bibleTranslation.set(this, void 0); // TODO: compare translations
        _BibleTranslationBar_bibleMapRef.set(this, void 0);
        _BibleTranslationBar_displayQuotes.set(this, void 0);
        __classPrivateFieldSet(this, _BibleTranslationBar_bibleTranslation, BibleTranslation.Schlachter1951, "f");
        __classPrivateFieldSet(this, _BibleTranslationBar_displayQuotes, () => { }, "f");
        __classPrivateFieldSet(this, _BibleTranslationBar_bibleMapRef, bibleMap, "f");
    }
    init(displayQuotes) {
        __classPrivateFieldSet(this, _BibleTranslationBar_displayQuotes, displayQuotes, "f");
        for (let [key, bible] of __classPrivateFieldGet(this, _BibleTranslationBar_bibleMapRef, "f")) {
            // (1) Create tag btn
            let button = document.createElement("div");
            button.classList.add("bibleBar-item");
            button.append(bible.name);
            button.addEventListener("click", __classPrivateFieldGet(this, _BibleTranslationBar_instances, "m", _BibleTranslationBar_onEvent).bind(null, this, key, button), false);
            // (2) Add tag btn
            const bibleBar = document.getElementById("bibleBar");
            bibleBar === null || bibleBar === void 0 ? void 0 : bibleBar.append(button);
            //document.getElementById("tagBar")?.innerHTML += "<div onClick='onTagEvent(BibleTag." + tag + ", this)' class='tagBar-item'>" + i18n.get(tag) + "</div>";
        }
        // Select bible translation:
        const bibleBar = document.getElementById("bibleBar");
        __classPrivateFieldGet(this, _BibleTranslationBar_instances, "m", _BibleTranslationBar_onEvent).call(this, this, __classPrivateFieldGet(this, _BibleTranslationBar_bibleTranslation, "f"), bibleBar === null || bibleBar === void 0 ? void 0 : bibleBar.getElementsByClassName("bibleBar-item")[0]); // TODO: use ids for every translation and select an default translation
    }
    getSelected() {
        return __classPrivateFieldGet(this, _BibleTranslationBar_bibleTranslation, "f");
    }
}
_BibleTranslationBar_bibleTranslation = new WeakMap(), _BibleTranslationBar_bibleMapRef = new WeakMap(), _BibleTranslationBar_displayQuotes = new WeakMap(), _BibleTranslationBar_instances = new WeakSet(), _BibleTranslationBar_onEvent = function _BibleTranslationBar_onEvent(_this, bibleTranslation, button) {
    var _a;
    __classPrivateFieldSet(_this, _BibleTranslationBar_bibleTranslation, bibleTranslation, "f");
    __classPrivateFieldGet(_this, _BibleTranslationBar_displayQuotes, "f").call(_this);
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
    let bible = __classPrivateFieldGet(_this, _BibleTranslationBar_bibleMapRef, "f").get(__classPrivateFieldGet(_this, _BibleTranslationBar_bibleTranslation, "f"));
    if (copyrightElement && bible) {
        copyrightElement.innerHTML = bible.htmlCopyright;
    }
};
//# sourceMappingURL=BibleTranslationBar.js.map