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
var _TagBar_instances, _TagBar_selected, _TagBar_messageBusRef, _TagBar_i18nRef, _TagBar_gui, _TagBar_onMessage, _TagBar_onEvent;
import { DataPath } from "./DataPath.js";
import { Message } from "./MessageBus.js";
export class TagBar {
    constructor(i18nRef, messageBusRef) {
        _TagBar_instances.add(this);
        _TagBar_selected.set(this, void 0);
        _TagBar_messageBusRef.set(this, void 0);
        _TagBar_i18nRef.set(this, void 0);
        _TagBar_gui.set(this, void 0); /* graphical user interface */
        __classPrivateFieldSet(this, _TagBar_selected, "", "f");
        __classPrivateFieldSet(this, _TagBar_messageBusRef, messageBusRef, "f");
        __classPrivateFieldSet(this, _TagBar_i18nRef, i18nRef, "f");
        __classPrivateFieldSet(this, _TagBar_gui, document.getElementById("tagBar"), "f");
        __classPrivateFieldGet(this, _TagBar_messageBusRef, "f").add(__classPrivateFieldGet(this, _TagBar_instances, "m", _TagBar_onMessage).bind(this));
    }
    init() {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            // Create tags:
            let tags = [];
            yield fetch(DataPath.BibleQuotes).then(response => response.json()).then(json => {
                for (let tag of json.tags) {
                    tags.push(tag);
                }
            });
            // Create tag buttons:
            for (let tag of tags) {
                // (1) Create tag btn
                let button = document.createElement("div");
                //button.id = "tagBar-item-id-" + tag;
                button.langKey = tag;
                button.classList.add("tagBar-item");
                let tagName = __classPrivateFieldGet(this, _TagBar_i18nRef, "f").get(tag);
                if (tagName) {
                    button.append(tagName);
                }
                else {
                    button.append(tag + "[i18n-undefined]");
                }
                button.addEventListener("click", __classPrivateFieldGet(this, _TagBar_instances, "m", _TagBar_onEvent).bind(this, tag, button), false);
                // (2) Add tag btn
                (_a = __classPrivateFieldGet(this, _TagBar_gui, "f")) === null || _a === void 0 ? void 0 : _a.append(button);
                //document.getElementById("tagBar")?.innerHTML += "<div onClick='onTagEvent(tag, this)' class='tagBar-item'>" + i18n.get(tag) + "</div>";
            }
            // Select tag:
            if (tags.length > 0) {
                __classPrivateFieldGet(this, _TagBar_instances, "m", _TagBar_onEvent).call(this, tags[0], (_b = __classPrivateFieldGet(this, _TagBar_gui, "f")) === null || _b === void 0 ? void 0 : _b.getElementsByClassName("tagBar-item")[0]); // TODO: use ids for every tag and select an default tag
            }
        });
    }
    getSelected() {
        return __classPrivateFieldGet(this, _TagBar_selected, "f");
    }
}
_TagBar_selected = new WeakMap(), _TagBar_messageBusRef = new WeakMap(), _TagBar_i18nRef = new WeakMap(), _TagBar_gui = new WeakMap(), _TagBar_instances = new WeakSet(), _TagBar_onMessage = function _TagBar_onMessage(message) {
    if (message == Message.LanguageChanged) {
        let tags = document.getElementsByClassName("tagBar-item");
        for (let tag of tags) {
            tag.innerHTML = String(__classPrivateFieldGet(this, _TagBar_i18nRef, "f").get(tag.langKey));
        }
    }
}, _TagBar_onEvent = function _TagBar_onEvent(bibleTag, button) {
    /* Note: 'this' is here not 'tagBar' if its called from somewhere else. */
    var _a;
    __classPrivateFieldSet(this, _TagBar_selected, bibleTag, "f");
    // clear 'active' class:
    let buttons = (_a = button.parentElement) === null || _a === void 0 ? void 0 : _a.children;
    if (buttons) {
        for (let it of buttons) {
            it.classList.remove("tagBar-item-active");
        }
    }
    // Set clicked button active:
    button.classList.add("tagBar-item-active");
    // Send message:
    // Used to call BibleVerseDisplay::displayQuotes() [which calls getSelected()]
    __classPrivateFieldGet(this, _TagBar_messageBusRef, "f").send(Message.TagChanged);
};
//# sourceMappingURL=TagBar.js.map