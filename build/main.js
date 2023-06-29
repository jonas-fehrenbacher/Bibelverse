"use strict";
class App {
    constructor() {
        this.tagFilter = BibleTag.EternalLife;
        this.schlachter2000 = createSchlachter2000();
        this.bibleQuotes = [
            new BibleQuote(new BibleLocation(BibleBook.Romans, 6, 23), new BibleLocation(BibleBook.Romans, 6, 23), [BibleTag.EternalLife, BibleTag.EternalDeath]),
            new BibleQuote(new BibleLocation(BibleBook.Galatians, 4, 4), new BibleLocation(BibleBook.Galatians, 4, 5), [BibleTag.EternalLife])
        ];
        this.verseFlexbox = document.getElementById("verseFlexbox");
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
                text.append(this.schlachter2000.get(bibleQuote.startLocation, bibleQuote.endLocation));
                var locationContent = document.createElement("div");
                locationContent.classList.add("bibleLocation");
                locationContent.append(bibleQuote.getLocationStr());
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
let app = new App();
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
// When webpage is loading:
let navElement = document.getElementsByTagName("nav")[0];
onTagEvent(BibleTag.EternalLife, navElement.getElementsByClassName("nav-item")[0]);
//# sourceMappingURL=main.js.map