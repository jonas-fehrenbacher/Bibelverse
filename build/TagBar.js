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
var _TagBar_instances, _TagBar_selected, _TagBar_displayQuotes, _TagBar_i18nRef, _TagBar_onEvent;
import { BibleTag } from "./Bible.js";
export class TagBar {
    constructor(i18nRef) {
        _TagBar_instances.add(this);
        _TagBar_selected.set(this, void 0);
        _TagBar_displayQuotes.set(this, void 0);
        _TagBar_i18nRef.set(this, void 0);
        __classPrivateFieldSet(this, _TagBar_selected, BibleTag.EternalLife, "f");
        __classPrivateFieldSet(this, _TagBar_displayQuotes, () => { }, "f");
        __classPrivateFieldSet(this, _TagBar_i18nRef, i18nRef, "f");
    }
    init(displayQuotes) {
        return __awaiter(this, void 0, void 0, function* () {
            __classPrivateFieldSet(this, _TagBar_displayQuotes, displayQuotes, "f");
            // Create tags:
            yield fetch("data/bibleQuotes.json").then(response => response.json()).then(json => {
                let tag = "";
                for (tag of json.tags) {
                    // (1) Create tag btn
                    let button = document.createElement("div");
                    //button.id = "tagBar-item-id-" + tag;
                    button.langKey = tag;
                    button.classList.add("tagBar-item");
                    button.append(String(__classPrivateFieldGet(this, _TagBar_i18nRef, "f").get(tag)));
                    button.addEventListener("click", __classPrivateFieldGet(this, _TagBar_instances, "m", _TagBar_onEvent).bind(null, this, BibleTag[tag], button), false);
                    // (2) Add tag btn
                    const tagBar = document.getElementById("tagBar");
                    tagBar === null || tagBar === void 0 ? void 0 : tagBar.append(button);
                    //document.getElementById("tagBar")?.innerHTML += "<div onClick='onTagEvent(BibleTag." + tag + ", this)' class='tagBar-item'>" + i18n.get(tag) + "</div>";
                }
            });
            // Select tag:
            const tagBar = document.getElementById("tagBar");
            __classPrivateFieldGet(this, _TagBar_instances, "m", _TagBar_onEvent).call(this, this, BibleTag.EternalLife, tagBar === null || tagBar === void 0 ? void 0 : tagBar.getElementsByClassName("tagBar-item")[0]); // TODO: use ids for every tag and select an default tag
        });
    }
    getSelected() {
        return __classPrivateFieldGet(this, _TagBar_selected, "f");
    }
    onLanguageEvent() {
        let tags = document.getElementsByClassName("tagBar-item");
        for (let tag of tags) {
            tag.innerHTML = String(__classPrivateFieldGet(this, _TagBar_i18nRef, "f").get(tag.langKey));
        }
    }
}
_TagBar_selected = new WeakMap(), _TagBar_displayQuotes = new WeakMap(), _TagBar_i18nRef = new WeakMap(), _TagBar_instances = new WeakSet(), _TagBar_onEvent = function _TagBar_onEvent(tagBar, bibleTag, button) {
    /* Note: 'this' is here not 'tagBar' if its called from somewhere else. */
    var _a;
    __classPrivateFieldSet(tagBar, _TagBar_selected, bibleTag, "f");
    __classPrivateFieldGet(tagBar, _TagBar_displayQuotes, "f").call(tagBar);
    // clear 'active' class:
    let buttons = (_a = button.parentElement) === null || _a === void 0 ? void 0 : _a.children;
    if (buttons) {
        for (let it of buttons) {
            it.classList.remove("active");
        }
    }
    // Set clicked button active:
    button.classList.add("active");
};
//# sourceMappingURL=TagBar.js.map