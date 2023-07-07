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
var _Header_instances, _Header_titleElement, _Header_i18nRef, _Header_languageSelectorBtn, _Header_messageBusRef, _Header_onLanguageSelectorBtnEvent, _Header_onLanguageEvent;
import { Message } from "./MessageBus.js";
export class Header {
    constructor(i18nRef, messageBusRef) {
        _Header_instances.add(this);
        _Header_titleElement.set(this, void 0);
        _Header_i18nRef.set(this, void 0);
        _Header_languageSelectorBtn.set(this, void 0);
        _Header_messageBusRef.set(this, void 0);
        __classPrivateFieldSet(this, _Header_titleElement, document.getElementById("title"), "f");
        __classPrivateFieldSet(this, _Header_i18nRef, i18nRef, "f");
        __classPrivateFieldSet(this, _Header_languageSelectorBtn, document.getElementById("languageSelector"), "f"); // TODO: Maybe use class Header(Title, lsBtn)
        __classPrivateFieldSet(this, _Header_messageBusRef, messageBusRef, "f");
        __classPrivateFieldGet(this, _Header_messageBusRef, "f").add(__classPrivateFieldGet(this, _Header_instances, "m", _Header_onLanguageEvent).bind(this));
    }
    init() {
        __classPrivateFieldGet(this, _Header_languageSelectorBtn, "f").addEventListener("change", __classPrivateFieldGet(this, _Header_instances, "m", _Header_onLanguageSelectorBtnEvent).bind(this), false);
        __classPrivateFieldGet(this, _Header_instances, "m", _Header_onLanguageEvent).call(this);
    }
}
_Header_titleElement = new WeakMap(), _Header_i18nRef = new WeakMap(), _Header_languageSelectorBtn = new WeakMap(), _Header_messageBusRef = new WeakMap(), _Header_instances = new WeakSet(), _Header_onLanguageSelectorBtnEvent = function _Header_onLanguageSelectorBtnEvent() {
    return __awaiter(this, void 0, void 0, function* () {
        // Update i18n:
        if (__classPrivateFieldGet(this, _Header_languageSelectorBtn, "f").value != __classPrivateFieldGet(this, _Header_i18nRef, "f").getLanguage()) {
            // ..user selected different language
            yield __classPrivateFieldGet(this, _Header_i18nRef, "f").load(__classPrivateFieldGet(this, _Header_languageSelectorBtn, "f").value); /* 'await' is required otherwise thread runs further and leaving the translation undefined. */
        }
        __classPrivateFieldGet(this, _Header_messageBusRef, "f").send(Message.LanguageChanged);
        // Note: Have a seperate #onLanguageEvent() callback, because other classes can also call a 'LanguageChanged' message.
    });
}, _Header_onLanguageEvent = function _Header_onLanguageEvent() {
    if (__classPrivateFieldGet(this, _Header_titleElement, "f")) {
        __classPrivateFieldGet(this, _Header_titleElement, "f").innerHTML = String(__classPrivateFieldGet(this, _Header_i18nRef, "f").get("title"));
    }
};
//# sourceMappingURL=Header.js.map