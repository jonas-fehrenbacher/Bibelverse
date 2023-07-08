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
var _VerseViewSelector_instances, _VerseViewSelector_gridViewBtn, _VerseViewSelector_listViewBtn, _VerseViewSelector_selected, _VerseViewSelector_messageBusRef, _VerseViewSelector_onEvent;
import { Message } from "./MessageBus.js";
export var VerseView;
(function (VerseView) {
    VerseView[VerseView["Grid"] = 0] = "Grid";
    VerseView[VerseView["List"] = 1] = "List";
})(VerseView || (VerseView = {}));
/** Inside ::Header */
export class VerseViewSelector {
    constructor(messageBusRef) {
        var _a, _b;
        _VerseViewSelector_instances.add(this);
        _VerseViewSelector_gridViewBtn.set(this, void 0);
        _VerseViewSelector_listViewBtn.set(this, void 0);
        _VerseViewSelector_selected.set(this, void 0);
        _VerseViewSelector_messageBusRef.set(this, void 0);
        __classPrivateFieldSet(this, _VerseViewSelector_gridViewBtn, document.getElementById("gridVerseView"), "f");
        __classPrivateFieldSet(this, _VerseViewSelector_listViewBtn, document.getElementById("listVerseView"), "f");
        __classPrivateFieldSet(this, _VerseViewSelector_messageBusRef, messageBusRef, "f");
        __classPrivateFieldSet(this, _VerseViewSelector_selected, VerseView.Grid, "f");
        (_a = __classPrivateFieldGet(this, _VerseViewSelector_gridViewBtn, "f")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", __classPrivateFieldGet(this, _VerseViewSelector_instances, "m", _VerseViewSelector_onEvent).bind(this, __classPrivateFieldGet(this, _VerseViewSelector_gridViewBtn, "f"), VerseView.Grid), false);
        (_b = __classPrivateFieldGet(this, _VerseViewSelector_listViewBtn, "f")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", __classPrivateFieldGet(this, _VerseViewSelector_instances, "m", _VerseViewSelector_onEvent).bind(this, __classPrivateFieldGet(this, _VerseViewSelector_listViewBtn, "f"), VerseView.List), false);
    }
    init() {
    }
    getSelected() {
        return __classPrivateFieldGet(this, _VerseViewSelector_selected, "f");
    }
}
_VerseViewSelector_gridViewBtn = new WeakMap(), _VerseViewSelector_listViewBtn = new WeakMap(), _VerseViewSelector_selected = new WeakMap(), _VerseViewSelector_messageBusRef = new WeakMap(), _VerseViewSelector_instances = new WeakSet(), _VerseViewSelector_onEvent = function _VerseViewSelector_onEvent(activeBtn, verseView) {
    var _a, _b;
    __classPrivateFieldSet(this, _VerseViewSelector_selected, verseView, "f");
    // clear 'active' class:
    (_a = __classPrivateFieldGet(this, _VerseViewSelector_gridViewBtn, "f")) === null || _a === void 0 ? void 0 : _a.classList.remove("img-btn-active");
    (_b = __classPrivateFieldGet(this, _VerseViewSelector_listViewBtn, "f")) === null || _b === void 0 ? void 0 : _b.classList.remove("img-btn-active");
    // Set clicked button active:
    activeBtn === null || activeBtn === void 0 ? void 0 : activeBtn.classList.add("img-btn-active");
    __classPrivateFieldGet(this, _VerseViewSelector_messageBusRef, "f").send(Message.VerseViewChanged);
};
//# sourceMappingURL=VerseViewSelector.js.map