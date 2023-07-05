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
var _Title_titleElement;
export class Title {
    constructor() {
        _Title_titleElement.set(this, void 0);
        __classPrivateFieldSet(this, _Title_titleElement, document.getElementById("title"), "f");
    }
    onLanguageEvent(i18n) {
        if (__classPrivateFieldGet(this, _Title_titleElement, "f")) {
            __classPrivateFieldGet(this, _Title_titleElement, "f").innerHTML = String(i18n.get("title"));
        }
    }
}
_Title_titleElement = new WeakMap();
//# sourceMappingURL=Title.js.map