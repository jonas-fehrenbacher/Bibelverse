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
var _I18n_properties, _I18n_language;
import { Properties } from "./Properties.js";
import { DataPath } from "./DataPath.js";
/**
 * Internationalization (I18n) can load en and de as languages.
 * Use get() to get the translation to an corresponding key.
 * Write your translation inside an data/i18n_<lang>.properties file like this:
 * key = translation
 */
export class I18n {
    constructor() {
        _I18n_properties.set(this, void 0);
        _I18n_language.set(this, void 0);
        __classPrivateFieldSet(this, _I18n_properties, new Properties, "f");
        __classPrivateFieldSet(this, _I18n_language, "", "f"); // cannot be loaded here, because constructors may not be async
    }
    load(language) {
        return __awaiter(this, void 0, void 0, function* () {
            __classPrivateFieldSet(this, _I18n_language, language, "f");
            yield __classPrivateFieldGet(this, _I18n_properties, "f").load(DataPath.I18nDir + "i18n_" + language + ".properties");
        });
    }
    get(key) {
        return __classPrivateFieldGet(this, _I18n_properties, "f").get(key);
    }
    getLanguage() {
        return __classPrivateFieldGet(this, _I18n_language, "f");
    }
}
_I18n_properties = new WeakMap(), _I18n_language = new WeakMap();
//# sourceMappingURL=I18n.js.map