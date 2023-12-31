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
var _Header_titleElement, _Header_i18nRef;
export class Header {
    constructor(i18nRef) {
        _Header_titleElement.set(this, void 0);
        _Header_i18nRef.set(this, void 0);
        __classPrivateFieldSet(this, _Header_titleElement, document.getElementById("title"), "f");
        __classPrivateFieldSet(this, _Header_i18nRef, i18nRef, "f");
    }
    init() {
        this.onLanguageEvent();
    }
    onLanguageEvent() {
        if (__classPrivateFieldGet(this, _Header_titleElement, "f")) {
            __classPrivateFieldGet(this, _Header_titleElement, "f").innerHTML = String(__classPrivateFieldGet(this, _Header_i18nRef, "f").get("title"));
        }
    }
}
_Header_titleElement = new WeakMap(), _Header_i18nRef = new WeakMap();
//# sourceMappingURL=Title.js.map