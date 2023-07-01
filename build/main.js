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
class App {
    constructor() {
        this.tagFilter = BibleTag.EternalLife;
        this.schlachter1951 = new Bible([], "", "");
        this.bibleQuotes = [];
        this.verseFlexbox = document.getElementById("verseFlexbox");
        this.i18n = new I18n();
    }
    // Called when webpage is loading.
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            this.schlachter1951 = yield createSchlachter1951();
            this.i18n.load("de");
            console.log(this.i18n.map);
            // Load bible quotes:
            // File reading: 
            // Reading files was done with 'XMLHttpRequest', but now there is the fetch API which is a lot simpler.
            // The down side is that when running the webpage on a local system it causes an CORS error, but that
            // prevents security issue, so thats fine. We are now required to run the webpage on an local webserver
            // for development purposes.
            // Note: Use 'await' to wait for the function to finish (requires a 'async' function).
            // See: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS/Errors/CORSRequestNotHttp
            yield fetch("data/bibleQuotes.json").then(response => response.json()).then(json => {
                for (let quote of json.quotes) {
                    var book = BibleBook[quote.startPos.b]; // convert string to enum
                    let tags = [];
                    for (let tag of quote.tags) {
                        tags.push(BibleTag[tag]);
                    }
                    this.bibleQuotes.push(new BibleQuote(new BibleLocation(book, quote.startPos.c, quote.startPos.v), new BibleLocation(book, quote.endPos.c, quote.endPos.v), tags));
                }
            });
            // Load navigation:
            yield displayBibleTags(this.i18n);
            // Select tag:
            let navElement = document.getElementsByTagName("nav")[0];
            onTagEvent(BibleTag.EternalLife, navElement.getElementsByClassName("nav-item")[0]);
            // Set copyright:
            let copyrightElement = document.getElementById("copyright");
            if (copyrightElement)
                copyrightElement.innerHTML = this.schlachter1951.htmlCopyright;
            // Set title:
            let titleElement = document.getElementById("title");
            if (titleElement) {
                let title = this.i18n.get("title");
                if (title) {
                    titleElement.innerHTML = title;
                }
            }
        });
    }
    displayQuotes(bibleTag) {
        var _a;
        // Empty verse flexbox:
        // Using .innerHTML is slower
        if (this.verseFlexbox) {
            while (this.verseFlexbox.firstChild) {
                this.verseFlexbox.removeChild(this.verseFlexbox.firstChild); // lastChild
            }
        }
        this.tagFilter = bibleTag;
        // Load verse flexbox:
        for (let bibleQuote of this.bibleQuotes) {
            if (bibleQuote.tags.find(a => a == this.tagFilter) != undefined) {
                //.. tag found
                var text = document.createElement("div");
                text.innerHTML = "<span>" + this.schlachter1951.get(bibleQuote.startLocation, bibleQuote.endLocation) + "</span>";
                // <span> is required because bible.get() returns text which has tags and they only work like that.
                var locationContent = document.createElement("div");
                locationContent.classList.add("bibleLocation");
                locationContent.append(bibleQuote.getLocationStr(this.i18n));
                var location = document.createElement("div");
                location.append(locationContent);
                var newVerse = document.createElement("div");
                newVerse.classList.add("verseFlexbox-item");
                newVerse.append(text);
                newVerse.append(location);
                (_a = this.verseFlexbox) === null || _a === void 0 ? void 0 : _a.append(newVerse);
            }
        }
    }
}
function onTagEvent(bibleTag, button) {
    var _a;
    app.displayQuotes(bibleTag);
    // clear 'active' class:
    let buttons = (_a = button.parentElement) === null || _a === void 0 ? void 0 : _a.children;
    if (buttons) {
        for (let it of buttons) {
            it.classList.remove("active");
        }
    }
    // Set clicked button active:
    button.classList.add("active");
}
let app = new App();
app.init();
//# sourceMappingURL=main.js.map