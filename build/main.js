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
var _App_bibleMap, _App_i18n, _App_tagBar, _App_header, _App_bibleTranslationBar, _App_bibleVerseDisplay, _App_footer, _App_messageBus;
import { BibleTranslation, createEberfelder1905, createLuther1545, createSchlachter1951 } from "./Bible.js";
import { I18n } from "./I18n.js";
import { TagBar } from "./TagBar.js";
import { Header } from "./Header.js";
import { BibleTranslationBar } from "./BibleTranslationBar.js";
import { BibleVerseDisplay } from "./BibleVerseDisplay.js";
import { Footer } from "./Footer.js";
import { MessageBus } from "./MessageBus.js";
class App {
    constructor() {
        _App_bibleMap.set(this, void 0);
        _App_i18n.set(this, void 0);
        _App_tagBar.set(this, void 0);
        _App_header.set(this, void 0);
        _App_bibleTranslationBar.set(this, void 0);
        _App_bibleVerseDisplay.set(this, void 0);
        _App_footer.set(this, void 0);
        _App_messageBus.set(this, void 0);
        __classPrivateFieldSet(this, _App_messageBus, new MessageBus, "f");
        __classPrivateFieldSet(this, _App_bibleMap, new Map, "f");
        __classPrivateFieldSet(this, _App_i18n, new I18n, "f");
        __classPrivateFieldSet(this, _App_header, new Header(__classPrivateFieldGet(this, _App_i18n, "f"), __classPrivateFieldGet(this, _App_messageBus, "f")), "f");
        __classPrivateFieldSet(this, _App_tagBar, new TagBar(__classPrivateFieldGet(this, _App_i18n, "f"), __classPrivateFieldGet(this, _App_messageBus, "f")), "f");
        __classPrivateFieldSet(this, _App_bibleTranslationBar, new BibleTranslationBar(__classPrivateFieldGet(this, _App_bibleMap, "f"), __classPrivateFieldGet(this, _App_messageBus, "f")), "f");
        __classPrivateFieldSet(this, _App_bibleVerseDisplay, new BibleVerseDisplay(__classPrivateFieldGet(this, _App_bibleMap, "f"), __classPrivateFieldGet(this, _App_messageBus, "f"), __classPrivateFieldGet(this, _App_i18n, "f"), __classPrivateFieldGet(this, _App_tagBar, "f"), __classPrivateFieldGet(this, _App_bibleTranslationBar, "f")), "f");
        __classPrivateFieldSet(this, _App_footer, new Footer(__classPrivateFieldGet(this, _App_messageBus, "f"), __classPrivateFieldGet(this, _App_bibleTranslationBar, "f"), __classPrivateFieldGet(this, _App_bibleMap, "f")), "f");
    }
    // Called when webpage is loading.
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            // Init bible map:
            __classPrivateFieldGet(this, _App_bibleMap, "f").set(BibleTranslation.Schlachter1951, yield createSchlachter1951());
            __classPrivateFieldGet(this, _App_bibleMap, "f").set(BibleTranslation.Eberfelder1905, yield createEberfelder1905());
            __classPrivateFieldGet(this, _App_bibleMap, "f").set(BibleTranslation.Luther1545, yield createLuther1545());
            // Init components:
            yield __classPrivateFieldGet(this, _App_i18n, "f").load("de");
            yield __classPrivateFieldGet(this, _App_bibleVerseDisplay, "f").init();
            yield __classPrivateFieldGet(this, _App_tagBar, "f").init();
            __classPrivateFieldGet(this, _App_bibleTranslationBar, "f").init();
            __classPrivateFieldGet(this, _App_footer, "f").init();
            __classPrivateFieldGet(this, _App_header, "f").init();
        });
    }
}
_App_bibleMap = new WeakMap(), _App_i18n = new WeakMap(), _App_tagBar = new WeakMap(), _App_header = new WeakMap(), _App_bibleTranslationBar = new WeakMap(), _App_bibleVerseDisplay = new WeakMap(), _App_footer = new WeakMap(), _App_messageBus = new WeakMap();
let app = new App();
app.init();
//# sourceMappingURL=main.js.map