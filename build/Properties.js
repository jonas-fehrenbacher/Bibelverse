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
var _Properties_map, _Properties_commentSymbol;
export class Properties {
    constructor() {
        _Properties_map.set(this, void 0);
        _Properties_commentSymbol.set(this, void 0);
        __classPrivateFieldSet(this, _Properties_map, new Map, "f");
        __classPrivateFieldSet(this, _Properties_commentSymbol, "#", "f");
    }
    load(filepath) {
        return __awaiter(this, void 0, void 0, function* () {
            __classPrivateFieldGet(this, _Properties_map, "f").clear();
            yield fetch(filepath).then(response => response.text()).then(file => {
                //file = file.replace(/\s/g, ""); // regex: /<cmd>/g; g: replace all occurrences (global); \s = whitespace
                file.trim(); // remove leading and trailing white spaces.
                let lines = file.split(/[\r\n]+/); // split on r, n, rn (for windows and linux) AND filters out empty lines
                for (let line of lines) {
                    if (line[0] != __classPrivateFieldGet(this, _Properties_commentSymbol, "f")) {
                        const key = line.substring(0, line.indexOf("=")).trim();
                        const val = line.substring(line.indexOf("=") + 1).trim();
                        __classPrivateFieldGet(this, _Properties_map, "f").set(key, val);
                    }
                }
            });
        });
    }
    get(key) {
        return __classPrivateFieldGet(this, _Properties_map, "f").get(key);
    }
}
_Properties_map = new WeakMap(), _Properties_commentSymbol = new WeakMap();
//# sourceMappingURL=Properties.js.map