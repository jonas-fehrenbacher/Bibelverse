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
var _Footer_instances, _Footer_gui, _Footer_bibleTranslationBarRef, _Footer_bibleMapRef, _Footer_messageBusRef, _Footer_changeCopyright, _Footer_onMessage;
import { Message } from "./MessageBus.js";
export class Footer {
    constructor(messageBusRef, bibleTranslationBarRef, bibleMapRef) {
        _Footer_instances.add(this);
        _Footer_gui.set(this, void 0); /* graphical user interface */
        _Footer_bibleTranslationBarRef.set(this, void 0); // TODO: compare translations
        _Footer_bibleMapRef.set(this, void 0);
        _Footer_messageBusRef.set(this, void 0);
        __classPrivateFieldSet(this, _Footer_gui, document.getElementById("copyright"), "f");
        __classPrivateFieldSet(this, _Footer_bibleMapRef, bibleMapRef, "f");
        __classPrivateFieldSet(this, _Footer_bibleTranslationBarRef, bibleTranslationBarRef, "f");
        __classPrivateFieldSet(this, _Footer_messageBusRef, messageBusRef, "f");
        __classPrivateFieldGet(this, _Footer_messageBusRef, "f").add(__classPrivateFieldGet(this, _Footer_instances, "m", _Footer_onMessage).bind(this));
    }
    init() {
        __classPrivateFieldGet(this, _Footer_instances, "m", _Footer_changeCopyright).call(this);
    }
}
_Footer_gui = new WeakMap(), _Footer_bibleTranslationBarRef = new WeakMap(), _Footer_bibleMapRef = new WeakMap(), _Footer_messageBusRef = new WeakMap(), _Footer_instances = new WeakSet(), _Footer_changeCopyright = function _Footer_changeCopyright() {
    let bible = __classPrivateFieldGet(this, _Footer_bibleMapRef, "f").get(__classPrivateFieldGet(this, _Footer_bibleTranslationBarRef, "f").getSelected());
    if (__classPrivateFieldGet(this, _Footer_gui, "f") && bible) {
        __classPrivateFieldGet(this, _Footer_gui, "f").innerHTML = bible.htmlCopyright;
    }
}, _Footer_onMessage = function _Footer_onMessage(message) {
    if (message == Message.TranslationChanged) {
        __classPrivateFieldGet(this, _Footer_instances, "m", _Footer_changeCopyright).call(this);
    }
};
//# sourceMappingURL=Footer.js.map