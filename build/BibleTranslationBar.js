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
var _BibleTranslationBar_instances, _BibleTranslationBar_bibleTranslation, _BibleTranslationBar_bibleMapRef, _BibleTranslationBar_messageBusRef, _BibleTranslationBar_gui, _BibleTranslationBar_onEvent;
import { BibleTranslation } from "./Bible.js";
import { Message } from "./MessageBus.js";
export class BibleTranslationBar {
    constructor(bibleMap, messageBusRef) {
        _BibleTranslationBar_instances.add(this);
        _BibleTranslationBar_bibleTranslation.set(this, void 0); // TODO: compare translations
        _BibleTranslationBar_bibleMapRef.set(this, void 0);
        _BibleTranslationBar_messageBusRef.set(this, void 0);
        _BibleTranslationBar_gui.set(this, void 0); /* graphical user interface */
        __classPrivateFieldSet(this, _BibleTranslationBar_bibleTranslation, BibleTranslation.Schlachter1951, "f");
        __classPrivateFieldSet(this, _BibleTranslationBar_messageBusRef, messageBusRef, "f");
        __classPrivateFieldSet(this, _BibleTranslationBar_bibleMapRef, bibleMap, "f");
        __classPrivateFieldSet(this, _BibleTranslationBar_gui, document.getElementById("bibleBar"), "f");
    }
    init() {
        var _a, _b;
        for (let [key, bible] of __classPrivateFieldGet(this, _BibleTranslationBar_bibleMapRef, "f")) {
            // (1) Create tag btn
            let button = document.createElement("div");
            button.classList.add("bibleBar-item");
            button.append(bible.name);
            button.addEventListener("click", __classPrivateFieldGet(this, _BibleTranslationBar_instances, "m", _BibleTranslationBar_onEvent).bind(this, key, button), false); /* the first parameter of bind() specifies what 'this' should be inside the function. */
            // (2) Add tag btn
            (_a = __classPrivateFieldGet(this, _BibleTranslationBar_gui, "f")) === null || _a === void 0 ? void 0 : _a.append(button);
            //document.getElementById("tagBar")?.innerHTML += "<div onClick='onTagEvent(BibleTag." + tag + ", this)' class='tagBar-item'>" + i18n.get(tag) + "</div>";
        }
        // Select bible translation:
        __classPrivateFieldGet(this, _BibleTranslationBar_instances, "m", _BibleTranslationBar_onEvent).call(this, __classPrivateFieldGet(this, _BibleTranslationBar_bibleTranslation, "f"), (_b = __classPrivateFieldGet(this, _BibleTranslationBar_gui, "f")) === null || _b === void 0 ? void 0 : _b.getElementsByClassName("bibleBar-item")[0]); // TODO: use ids for every translation and select an default translation
    }
    getSelected() {
        return __classPrivateFieldGet(this, _BibleTranslationBar_bibleTranslation, "f");
    }
}
_BibleTranslationBar_bibleTranslation = new WeakMap(), _BibleTranslationBar_bibleMapRef = new WeakMap(), _BibleTranslationBar_messageBusRef = new WeakMap(), _BibleTranslationBar_gui = new WeakMap(), _BibleTranslationBar_instances = new WeakSet(), _BibleTranslationBar_onEvent = function _BibleTranslationBar_onEvent(bibleTranslation, button) {
    var _a;
    __classPrivateFieldSet(this, _BibleTranslationBar_bibleTranslation, bibleTranslation, "f");
    // clear 'active' class:
    let buttons = (_a = button.parentElement) === null || _a === void 0 ? void 0 : _a.children;
    if (buttons) {
        for (let it of buttons) {
            it.classList.remove("bibleBar-item-active");
        }
    }
    // Set clicked button active:
    button.classList.add("bibleBar-item-active");
    // Send message:
    // Used to call BibleVerseDisplay::displayQuotes() [which calls getSelected()] and Footer::changeCopyright()
    __classPrivateFieldGet(this, _BibleTranslationBar_messageBusRef, "f").send(Message.TranslationChanged);
};
//# sourceMappingURL=BibleTranslationBar.js.map