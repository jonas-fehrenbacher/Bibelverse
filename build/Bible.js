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
import { DataPath } from "./DataPath.js";
export var BibleTranslation;
(function (BibleTranslation) {
    BibleTranslation[BibleTranslation["Schlachter1951"] = 0] = "Schlachter1951";
    BibleTranslation[BibleTranslation["Eberfelder1905"] = 1] = "Eberfelder1905";
    BibleTranslation[BibleTranslation["Luther1545"] = 2] = "Luther1545";
})(BibleTranslation || (BibleTranslation = {}));
export class Bible {
    constructor(verses, name, htmlCopyright, nameOnBibleServer) {
        this.verses = verses;
        this.name = name;
        this.htmlCopyright = htmlCopyright;
        this.nameOnBibleServer = nameOnBibleServer;
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
        let bible = new Bible([], "Schlachter1951", "copyright © 1951 Genfer Bibelgeschellschaft (Geneva Bible Society)<br/>Language: Deutsch (German, Standard)<br/>Translation by: Franz-Eugen Schlachter<br/>Contributor: Genfer Bibelgesellschaft", "SLT");
        yield fetch(DataPath.Schlachter1951).then(response => response.json()).then(json => {
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
        let bible = new Bible([], "Eberfelder1905", "This Bible is in the Public Domain.", "ELB");
        yield fetch(DataPath.Elberfelder1905).then(response => response.json()).then(json => {
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
        let bible = new Bible([], "Luther1545", "This Bible is in the Public Domain.", "LUT");
        yield fetch(DataPath.Luther1545).then(response => response.json()).then(json => {
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
        let bible = new Bible([], "KJV", "This Bible is in the Public Domain in most parts of the world. However, in the United Kingdom, it is under perpetual Crown copyright.", "KJV");
        // Needs a license in the UK..
        return bible;
    });
}
//# sourceMappingURL=Bible.js.map