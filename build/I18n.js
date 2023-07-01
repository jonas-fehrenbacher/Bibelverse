"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/*export*/ class I18n {
    constructor() {
        this.map = new Map;
        this.language = ""; // cannot be loaded here, because constructors may not be async
    }
    load(language) {
        return __awaiter(this, void 0, void 0, function* () {
            let commentSymbol = "#";
            yield fetch("data/i18n_" + language + ".properties").then(response => response.text()).then(file => {
                //file = file.replace(/\s/g, ""); // regex: /<cmd>/g; g: replace all occurrences (global); \s = whitespace
                file.trim(); // remove leading and trailing white spaces.
                let lines = file.split(/[\r\n]+/); // split on r, n, rn (for windows and linux) AND filters out empty lines
                for (let line of lines) {
                    if (line[0] != commentSymbol) {
                        let key = line.substring(0, line.indexOf("=")).trim();
                        let val = line.substring(line.indexOf("=") + 1).trim();
                        this.map.set(key, val);
                    }
                }
            });
        });
    }
    get(key) {
        return this.map.get(key);
    }
}
//# sourceMappingURL=I18n.js.map