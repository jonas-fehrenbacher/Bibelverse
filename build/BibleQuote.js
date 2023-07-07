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
export class BiblePassagePos {
    constructor(book, chapter, verse) {
        this.book = book;
        this.chapter = chapter;
        this.verse = verse;
    }
    equals(other) {
        /* objA === objB; objA == objB; Object.is(objA, objB): same location in memory (useful to detect references) */
        return other.book == this.book && other.chapter == this.chapter && other.verse == this.verse;
    }
    compare(other) {
        if (this.book == other.book && this.chapter == other.chapter && this.verse == other.verse) {
            return 0;
        }
        if (this.book < other.book ||
            (this.book == other.book && this.chapter < other.chapter) ||
            (this.book == other.book && this.chapter == other.chapter && this.verse < other.verse)) {
            return -1;
        }
        return 1;
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
        if (!this.startPos.equals(this.endPos)) {
            if (this.startPos.chapter == this.endPos.chapter) {
                pos += "-" + this.endPos.verse;
            }
            else {
                pos += "-" + this.endPos.chapter + ":" + this.endPos.verse;
            }
        }
        return pos;
    }
    compare(other) {
        return this.startPos.compare(other.startPos);
    }
}
//# sourceMappingURL=BibleQuote.js.map