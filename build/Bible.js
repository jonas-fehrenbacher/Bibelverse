var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { assert } from "./Tools.js";
// https://www.bibleserver.com/en
export var BibleBook;
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
export var BibleTag;
(function (BibleTag) {
    BibleTag[BibleTag["EternalLife"] = 0] = "EternalLife";
    BibleTag[BibleTag["EternalDeath"] = 1] = "EternalDeath";
})(BibleTag || (BibleTag = {}));
export class BiblePassagePos {
    constructor(book, chapter, verse) {
        this.book = book;
        this.chapter = chapter;
        this.verse = verse;
    }
}
export class BibleQuote {
    constructor(startPos, endPos, tags) {
        this.startPos = startPos;
        this.endPos = endPos;
        this.tags = tags;
    }
    getPositionStr(i18n) {
        const bookName = i18n.get(BibleBook[this.startPos.book]);
        let pos = bookName + " ";
        pos += this.startPos.chapter + ":";
        pos += this.startPos.verse;
        if (this.startPos != this.endPos) {
            if (this.startPos.chapter == this.endPos.chapter) {
                pos += "-" + this.endPos.verse;
            }
            else {
                pos += "-" + this.endPos.chapter + ":" + this.endPos.verse;
            }
        }
        return pos;
    }
}
export var BibleTranslation;
(function (BibleTranslation) {
    BibleTranslation[BibleTranslation["Schlachter1951"] = 0] = "Schlachter1951";
    BibleTranslation[BibleTranslation["Eberfelder1905"] = 1] = "Eberfelder1905";
    BibleTranslation[BibleTranslation["Luther1545"] = 2] = "Luther1545";
})(BibleTranslation || (BibleTranslation = {}));
export class Bible {
    constructor(verses, name, htmlCopyright) {
        this.verses = verses;
        this.name = name;
        this.htmlCopyright = htmlCopyright;
    }
    get(startPos, endPos) {
        assert(startPos.book == endPos.book, "");
        let text = "";
        for (const [chapter, verses] of this.verses[startPos.book].entries()) {
            if (chapter >= startPos.chapter - 1 && chapter <= endPos.chapter - 1) // -1, because json starts at 1, but verses[][][] at index 0.
             {
                for (const [verseNumber, verse] of verses.entries()) {
                    let isLastVerse = chapter == endPos.chapter - 1 && verseNumber == endPos.verse - 1;
                    if ((chapter == startPos.chapter - 1 && chapter == endPos.chapter - 1 && (verseNumber >= startPos.verse - 1 && verseNumber <= endPos.verse - 1)) ||
                        (chapter == startPos.chapter - 1 && chapter != endPos.chapter - 1 && verseNumber >= startPos.verse - 1) ||
                        (chapter != startPos.chapter - 1 && chapter != endPos.chapter - 1) ||
                        (chapter == endPos.chapter - 1 && chapter != startPos.chapter - 1 && verseNumber <= endPos.verse - 1)) {
                        text += verse;
                        if (!isLastVerse) {
                            text += " <span class=\"bibleVerse-number\">" + (verseNumber + 1) + "</span> ";
                        }
                    }
                }
            }
        }
        return text;
    }
}
export function createSchlachter1951() {
    return __awaiter(this, void 0, void 0, function* () {
        let bible = new Bible([], "Schlachter1951", "copyright © 1951 Genfer Bibelgeschellschaft (Geneva Bible Society)<br/>Language: Deutsch (German, Standard)<br/>Translation by: Franz-Eugen Schlachter<br/>Contributor: Genfer Bibelgesellschaft");
        yield fetch("data/schlachter1951.json").then(response => response.json()).then(json => {
            for (let jsonBook of json) {
                const book = jsonBook.chapters;
                bible.verses.push(book);
            }
        });
        return bible;
    });
}
export function createEberfelder1905() {
    return __awaiter(this, void 0, void 0, function* () {
        let bible = new Bible([], "Eberfelder1905", "This Bible is in the Public Domain.");
        yield fetch("data/elberfelder1905.json").then(response => response.json()).then(json => {
            let currChapter = 1;
            let currBook = 1;
            let chapter = [];
            let book = [];
            for (let verse of json.verses) {
                // Note that there are books with only one chapter (even successively).
                // Fill book:
                if (currBook == verse.book && verse.chapter == currChapter) {
                    chapter.push(verse.text);
                }
                else {
                    book.push(chapter);
                    chapter = [];
                    chapter.push(verse.text);
                    currChapter = verse.chapter;
                }
                // Add book to bible:
                if (currBook != verse.book) {
                    bible.verses.push(book);
                    book = [];
                    currBook = verse.book;
                }
            }
            // Last book:
            book.push(chapter);
            bible.verses.push(book);
        });
        return bible;
    });
}
export function createLuther1545() {
    return __awaiter(this, void 0, void 0, function* () {
        let bible = new Bible([], "Luther1545", "This Bible is in the Public Domain.");
        yield fetch("data/luther1545.json").then(response => response.json()).then(json => {
            let currChapter = 1;
            let currBook = 1;
            let chapter = [];
            let book = [];
            for (let verse of json.verses) {
                // Note that there are books with only one chapter (even successively).
                // Fill book:
                if (currBook == verse.book && verse.chapter == currChapter) {
                    chapter.push(verse.text);
                }
                else {
                    book.push(chapter);
                    chapter = [];
                    chapter.push(verse.text);
                    currChapter = verse.chapter;
                }
                // Add book to bible:
                if (currBook != verse.book) {
                    bible.verses.push(book);
                    book = [];
                    currBook = verse.book;
                }
            }
            // Last book:
            book.push(chapter);
            bible.verses.push(book);
        });
        return bible;
    });
}
export function createKJV() {
    return __awaiter(this, void 0, void 0, function* () {
        let bible = new Bible([], "KJV", "This Bible is in the Public Domain in most parts of the world. However, in the United Kingdom, it is under perpetual Crown copyright.");
        // Needs a license in the UK..
        return bible;
    });
}
//# sourceMappingURL=Bible.js.map