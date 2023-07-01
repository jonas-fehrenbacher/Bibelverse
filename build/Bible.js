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
// https://www.bibleserver.com/en
/*export*/ var BibleBook;
(function (BibleBook) {
    BibleBook[BibleBook["None"] = -1] = "None";
    BibleBook[BibleBook["Genesis"] = 0] = "Genesis";
    BibleBook[BibleBook["Exodus"] = 1] = "Exodus";
    BibleBook[BibleBook["Leviticus"] = 2] = "Leviticus";
    BibleBook[BibleBook["Numbers"] = 3] = "Numbers";
    BibleBook[BibleBook["Deuteronomy"] = 4] = "Deuteronomy";
    BibleBook[BibleBook["Joshua"] = 5] = "Joshua";
    BibleBook[BibleBook["Judges"] = 6] = "Judges";
    BibleBook[BibleBook["Ruth"] = 7] = "Ruth";
    BibleBook[BibleBook["Samuel1"] = 8] = "Samuel1";
    BibleBook[BibleBook["Samuel2"] = 9] = "Samuel2";
    BibleBook[BibleBook["Kings1"] = 10] = "Kings1";
    BibleBook[BibleBook["Kings2"] = 11] = "Kings2";
    BibleBook[BibleBook["Chronicles1"] = 12] = "Chronicles1";
    BibleBook[BibleBook["Chronicles2"] = 13] = "Chronicles2";
    BibleBook[BibleBook["Ezra"] = 14] = "Ezra";
    BibleBook[BibleBook["Nehemiah"] = 15] = "Nehemiah";
    BibleBook[BibleBook["Esther"] = 16] = "Esther";
    BibleBook[BibleBook["Job"] = 17] = "Job";
    BibleBook[BibleBook["Psalms"] = 18] = "Psalms";
    BibleBook[BibleBook["Proverbs"] = 19] = "Proverbs";
    BibleBook[BibleBook["Ecclesiastes"] = 20] = "Ecclesiastes";
    BibleBook[BibleBook["SongOfSolomon"] = 21] = "SongOfSolomon";
    BibleBook[BibleBook["Isaiah"] = 22] = "Isaiah";
    BibleBook[BibleBook["Jeremiah"] = 23] = "Jeremiah";
    BibleBook[BibleBook["Lamentations"] = 24] = "Lamentations";
    BibleBook[BibleBook["Ezekiel"] = 25] = "Ezekiel";
    BibleBook[BibleBook["Daniel"] = 26] = "Daniel";
    BibleBook[BibleBook["Hosea"] = 27] = "Hosea";
    BibleBook[BibleBook["Joel"] = 28] = "Joel";
    BibleBook[BibleBook["Amos"] = 29] = "Amos";
    BibleBook[BibleBook["Obadiah"] = 30] = "Obadiah";
    BibleBook[BibleBook["Jonah"] = 31] = "Jonah";
    BibleBook[BibleBook["Micah"] = 32] = "Micah";
    BibleBook[BibleBook["Nahum"] = 33] = "Nahum";
    BibleBook[BibleBook["Habbakuk"] = 34] = "Habbakuk";
    BibleBook[BibleBook["Zephaniah"] = 35] = "Zephaniah";
    BibleBook[BibleBook["Haggai"] = 36] = "Haggai";
    BibleBook[BibleBook["Zechariah"] = 37] = "Zechariah";
    BibleBook[BibleBook["Malachi"] = 38] = "Malachi";
    BibleBook[BibleBook["Matthew"] = 39] = "Matthew";
    BibleBook[BibleBook["Mark"] = 40] = "Mark";
    BibleBook[BibleBook["Luke"] = 41] = "Luke";
    BibleBook[BibleBook["John"] = 42] = "John";
    BibleBook[BibleBook["Acts"] = 43] = "Acts";
    BibleBook[BibleBook["Romans"] = 44] = "Romans";
    BibleBook[BibleBook["Corinthias1"] = 45] = "Corinthias1";
    BibleBook[BibleBook["Corinthias2"] = 46] = "Corinthias2";
    BibleBook[BibleBook["Galatians"] = 47] = "Galatians";
    BibleBook[BibleBook["Ephesians"] = 48] = "Ephesians";
    BibleBook[BibleBook["Philippians"] = 49] = "Philippians";
    BibleBook[BibleBook["Colossians"] = 50] = "Colossians";
    BibleBook[BibleBook["Thessalonians1"] = 51] = "Thessalonians1";
    BibleBook[BibleBook["Thessalonians2"] = 52] = "Thessalonians2";
    BibleBook[BibleBook["Timothy1"] = 53] = "Timothy1";
    BibleBook[BibleBook["Timothy2"] = 54] = "Timothy2";
    BibleBook[BibleBook["Titus"] = 55] = "Titus";
    BibleBook[BibleBook["Philemon"] = 56] = "Philemon";
    BibleBook[BibleBook["Hebrews"] = 57] = "Hebrews";
    BibleBook[BibleBook["James"] = 58] = "James";
    BibleBook[BibleBook["Peter1"] = 59] = "Peter1";
    BibleBook[BibleBook["Peter2"] = 60] = "Peter2";
    BibleBook[BibleBook["John1"] = 61] = "John1";
    BibleBook[BibleBook["John2"] = 62] = "John2";
    BibleBook[BibleBook["John3"] = 63] = "John3";
    BibleBook[BibleBook["Jude"] = 64] = "Jude";
    BibleBook[BibleBook["Revelation"] = 65] = "Revelation";
})(BibleBook || (BibleBook = {}));
/*export*/ var BibleTag;
(function (BibleTag) {
    BibleTag[BibleTag["EternalLife"] = 0] = "EternalLife";
    BibleTag[BibleTag["EternalDeath"] = 1] = "EternalDeath";
})(BibleTag || (BibleTag = {}));
/*export*/ class BibleLocation {
    constructor(book, chapter, verse) {
        this.book = book;
        this.chapter = chapter;
        this.verse = verse;
    }
}
/*export*/ class BibleQuote {
    constructor(startLocation, endLocation, tags) {
        this.startLocation = startLocation;
        this.endLocation = endLocation;
        this.tags = tags;
    }
    getLocationStr(i18n) {
        let bookName = i18n.get(BibleBook[this.startLocation.book]);
        let location = bookName + " ";
        location += this.startLocation.chapter + ":";
        location += this.startLocation.verse;
        if (this.startLocation != this.endLocation) {
            if (this.startLocation.chapter == this.endLocation.chapter) {
                location += "-" + this.endLocation.verse;
            }
            else {
                location += "-" + this.endLocation.chapter + ":" + this.endLocation.verse;
            }
        }
        return location;
    }
}
/*export*/ class Bible {
    constructor(verses, name, htmlCopyright) {
        this.verses = verses;
        this.name = name;
        this.htmlCopyright = htmlCopyright;
    }
    get(startLocation, endLocation) {
        assert(startLocation.book == endLocation.book, "");
        let text = "";
        for (const [chapter, verses] of this.verses[startLocation.book].entries()) {
            if (chapter >= startLocation.chapter - 1 && chapter <= endLocation.chapter - 1) // -1, because json starts at 1, but verses[][][] at index 0.
             {
                for (const [verseNumber, verse] of verses.entries()) {
                    let isLastVerse = chapter == endLocation.chapter - 1 && verseNumber == endLocation.verse - 1;
                    if ((chapter == startLocation.chapter - 1 && chapter == endLocation.chapter - 1 && (verseNumber >= startLocation.verse - 1 && verseNumber <= endLocation.verse - 1)) ||
                        (chapter == startLocation.chapter - 1 && chapter != endLocation.chapter - 1 && verseNumber >= startLocation.verse - 1) ||
                        (chapter != startLocation.chapter - 1 && chapter != endLocation.chapter - 1) ||
                        (chapter == endLocation.chapter - 1 && chapter != startLocation.chapter - 1 && verseNumber <= endLocation.verse - 1)) {
                        text += verse;
                        if (!isLastVerse) {
                            text += " <span class=\"verse-number\">" + (verseNumber + 1) + "</span> ";
                        }
                    }
                }
            }
        }
        return text;
    }
}
// https://www.bibleserver.com/SLT/
/*export*/ function createSchlachter2000() {
    return new Bible([], "Schlachter2000", "");
}
/*export*/ function createSchlachter1951() {
    return __awaiter(this, void 0, void 0, function* () {
        let bible = new Bible([], "Schlachter1951", "copyright © 1951 Genfer Bibelgeschellschaft (Geneva Bible Society)<br/>Language: Deutsch (German, Standard)<br/>Translation by: Franz-Eugen Schlachter<br/>Contributor: Genfer Bibelgesellschaft");
        yield fetch("data/schlachter1951.json").then(response => response.json()).then(json => {
            for (let jsonBook of json) {
                let book = jsonBook.chapters;
                bible.verses.push(book);
            }
        });
        return bible;
    });
}
/*export*/ function displayBibleTags(i18n) {
    return __awaiter(this, void 0, void 0, function* () {
        yield fetch("data/bibleQuotes.json").then(response => response.json()).then(json => {
            let tag = "";
            for (tag of json.tags) {
                //var button = document.createElement("div");
                //button.setAttribute("onclick", "onTagEvent(BibleTag." + tag + ", this)");
                //button.classList.add("nav-item");
                //button.append(tag);
                //document.getElementsByTagName("nav")[0].append(button);
                document.getElementsByTagName("nav")[0].innerHTML += "<div onClick='onTagEvent(BibleTag." + tag + ", this)' class='nav-item'>" + i18n.get(tag) + "</div>";
            }
        });
    });
}
//# sourceMappingURL=Bible.js.map