"use strict";
// https://www.bibleserver.com/en
/*export*/ var BibleBook;
(function (BibleBook) {
    BibleBook[BibleBook["None"] = 0] = "None";
    BibleBook[BibleBook["Genesis"] = 1] = "Genesis";
    BibleBook[BibleBook["Exodus"] = 2] = "Exodus";
    BibleBook[BibleBook["Leviticus"] = 3] = "Leviticus";
    BibleBook[BibleBook["Numbers"] = 4] = "Numbers";
    BibleBook[BibleBook["Deuteronomy"] = 5] = "Deuteronomy";
    BibleBook[BibleBook["Joshua"] = 6] = "Joshua";
    BibleBook[BibleBook["Judges"] = 7] = "Judges";
    BibleBook[BibleBook["Ruth"] = 8] = "Ruth";
    BibleBook[BibleBook["Samuel1"] = 9] = "Samuel1";
    BibleBook[BibleBook["Samuel2"] = 10] = "Samuel2";
    BibleBook[BibleBook["Kings1"] = 11] = "Kings1";
    BibleBook[BibleBook["Kings2"] = 12] = "Kings2";
    BibleBook[BibleBook["Chronicles1"] = 13] = "Chronicles1";
    BibleBook[BibleBook["Chronicles2"] = 14] = "Chronicles2";
    BibleBook[BibleBook["Ezra"] = 15] = "Ezra";
    BibleBook[BibleBook["Nehemiah"] = 16] = "Nehemiah";
    BibleBook[BibleBook["Esther"] = 17] = "Esther";
    BibleBook[BibleBook["Job"] = 18] = "Job";
    BibleBook[BibleBook["Psalms"] = 19] = "Psalms";
    BibleBook[BibleBook["Proverbs"] = 20] = "Proverbs";
    BibleBook[BibleBook["Ecclesiastes"] = 21] = "Ecclesiastes";
    BibleBook[BibleBook["SongOfSolomon"] = 22] = "SongOfSolomon";
    BibleBook[BibleBook["Isaiah"] = 23] = "Isaiah";
    BibleBook[BibleBook["Jeremiah"] = 24] = "Jeremiah";
    BibleBook[BibleBook["Lamentations"] = 25] = "Lamentations";
    BibleBook[BibleBook["Ezekiel"] = 26] = "Ezekiel";
    BibleBook[BibleBook["Daniel"] = 27] = "Daniel";
    BibleBook[BibleBook["Hosea"] = 28] = "Hosea";
    BibleBook[BibleBook["Joel"] = 29] = "Joel";
    BibleBook[BibleBook["Amos"] = 30] = "Amos";
    BibleBook[BibleBook["Obadiah"] = 31] = "Obadiah";
    BibleBook[BibleBook["Jonah"] = 32] = "Jonah";
    BibleBook[BibleBook["Micah"] = 33] = "Micah";
    BibleBook[BibleBook["Nahum"] = 34] = "Nahum";
    BibleBook[BibleBook["Habbakuk"] = 35] = "Habbakuk";
    BibleBook[BibleBook["Zephaniah"] = 36] = "Zephaniah";
    BibleBook[BibleBook["Haggai"] = 37] = "Haggai";
    BibleBook[BibleBook["Zechariah"] = 38] = "Zechariah";
    BibleBook[BibleBook["Malachi"] = 39] = "Malachi";
    BibleBook[BibleBook["Matthew"] = 40] = "Matthew";
    BibleBook[BibleBook["Mark"] = 41] = "Mark";
    BibleBook[BibleBook["Luke"] = 42] = "Luke";
    BibleBook[BibleBook["John"] = 43] = "John";
    BibleBook[BibleBook["Acts"] = 44] = "Acts";
    BibleBook[BibleBook["Romans"] = 45] = "Romans";
    BibleBook[BibleBook["Corinthias1"] = 46] = "Corinthias1";
    BibleBook[BibleBook["Corinthias2"] = 47] = "Corinthias2";
    BibleBook[BibleBook["Galatians"] = 48] = "Galatians";
    BibleBook[BibleBook["Ephesians"] = 49] = "Ephesians";
    BibleBook[BibleBook["Philippians"] = 50] = "Philippians";
    BibleBook[BibleBook["Colossians"] = 51] = "Colossians";
    BibleBook[BibleBook["Thessalonians1"] = 52] = "Thessalonians1";
    BibleBook[BibleBook["Thessalonians2"] = 53] = "Thessalonians2";
    BibleBook[BibleBook["Timothy1"] = 54] = "Timothy1";
    BibleBook[BibleBook["Timothy2"] = 55] = "Timothy2";
    BibleBook[BibleBook["Titus"] = 56] = "Titus";
    BibleBook[BibleBook["Philemon"] = 57] = "Philemon";
    BibleBook[BibleBook["Hebrews"] = 58] = "Hebrews";
    BibleBook[BibleBook["James"] = 59] = "James";
    BibleBook[BibleBook["Peter1"] = 60] = "Peter1";
    BibleBook[BibleBook["Peter2"] = 61] = "Peter2";
    BibleBook[BibleBook["John1"] = 62] = "John1";
    BibleBook[BibleBook["John2"] = 63] = "John2";
    BibleBook[BibleBook["John3"] = 64] = "John3";
    BibleBook[BibleBook["Jude"] = 65] = "Jude";
    BibleBook[BibleBook["Revelation"] = 66] = "Revelation";
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
    getLocationStr() {
        let bookName = "";
        switch (this.startLocation.book) {
            case BibleBook.Genesis:
                bookName = "1.Mose";
                break;
            case BibleBook.Exodus:
                bookName = "2.Mose";
                break;
            case BibleBook.Leviticus:
                bookName = "3.Mose";
                break;
            case BibleBook.Numbers:
                bookName = "4.Mose";
                break;
            case BibleBook.Deuteronomy:
                bookName = "5.Mose";
                break;
            case BibleBook.Joshua:
                bookName = "Josua";
                break;
            case BibleBook.Judges:
                bookName = "Richter";
                break;
            case BibleBook.Ruth:
                bookName = "Ruth";
                break;
            case BibleBook.Samuel1:
                bookName = "1. Samuel";
                break;
            case BibleBook.Samuel2:
                bookName = "2. Samuel";
                break;
            case BibleBook.Kings1:
                bookName = "1. Könige";
                break;
            case BibleBook.Kings2:
                bookName = "2. Könige";
                break;
            case BibleBook.Chronicles1:
                bookName = "1. Chronik";
                break;
            case BibleBook.Chronicles2:
                bookName = "2. Chronik";
                break;
            case BibleBook.Ezra:
                bookName = "Esra";
                break;
            case BibleBook.Nehemiah:
                bookName = "Nehemia";
                break;
            case BibleBook.Esther:
                bookName = "Esther";
                break;
            case BibleBook.Job:
                bookName = "Hiob";
                break;
            case BibleBook.Psalms:
                bookName = "Psalmen";
                break;
            case BibleBook.Proverbs:
                bookName = "Sprüche";
                break;
            case BibleBook.Ecclesiastes:
                bookName = "Prediger";
                break;
            case BibleBook.SongOfSolomon:
                bookName = "Hohelied";
                break;
            case BibleBook.Isaiah:
                bookName = "Jesaja";
                break;
            case BibleBook.Jeremiah:
                bookName = "Jeremia";
                break;
            case BibleBook.Lamentations:
                bookName = "Klagelieder";
                break;
            case BibleBook.Ezekiel:
                bookName = "Hesekiel";
                break;
            case BibleBook.Daniel:
                bookName = "Daniel";
                break;
            case BibleBook.Hosea:
                bookName = "Hosea";
                break;
            case BibleBook.Joel:
                bookName = "Joel";
                break;
            case BibleBook.Amos:
                bookName = "Amos";
                break;
            case BibleBook.Obadiah:
                bookName = "Obadja";
                break;
            case BibleBook.Jonah:
                bookName = "Jona";
                break;
            case BibleBook.Micah:
                bookName = "Micha";
                break;
            case BibleBook.Nahum:
                bookName = "Nahum";
                break;
            case BibleBook.Habbakuk:
                bookName = "Habakuk";
                break;
            case BibleBook.Zephaniah:
                bookName = "Zephanja";
                break;
            case BibleBook.Haggai:
                bookName = "Haggai";
                break;
            case BibleBook.Zechariah:
                bookName = "Sacharja";
                break;
            case BibleBook.Malachi:
                bookName = "Maleachi";
                break;
            case BibleBook.Matthew:
                bookName = "Matthäus";
                break;
            case BibleBook.Mark:
                bookName = "Markus";
                break;
            case BibleBook.Luke:
                bookName = "Lukas";
                break;
            case BibleBook.John:
                bookName = "Johannes";
                break;
            case BibleBook.Acts:
                bookName = "Apostelgeschichte";
                break;
            case BibleBook.Romans:
                bookName = "Römer";
                break;
            case BibleBook.Corinthias1:
                bookName = "1. Korinther";
                break;
            case BibleBook.Corinthias2:
                bookName = "2. Korinther";
                break;
            case BibleBook.Galatians:
                bookName = "Galater";
                break;
            case BibleBook.Ephesians:
                bookName = "Epheser";
                break;
            case BibleBook.Philippians:
                bookName = "Philipper";
                break;
            case BibleBook.Colossians:
                bookName = "Kolosser";
                break;
            case BibleBook.Thessalonians1:
                bookName = "1. Thessalonicher";
                break;
            case BibleBook.Thessalonians2:
                bookName = "2. Thessalonicher";
                break;
            case BibleBook.Timothy1:
                bookName = "1. Timotheus";
                break;
            case BibleBook.Timothy2:
                bookName = "2. Timotheus";
                break;
            case BibleBook.Titus:
                bookName = "Titus";
                break;
            case BibleBook.Philemon:
                bookName = "Philemon";
                break;
            case BibleBook.Hebrews:
                bookName = "Hebräer";
                break;
            case BibleBook.James:
                bookName = "Jakobus";
                break;
            case BibleBook.Peter1:
                bookName = "1. Petrus";
                break;
            case BibleBook.Peter2:
                bookName = "2. Petrus";
                break;
            case BibleBook.John1:
                bookName = "1. Johannes";
                break;
            case BibleBook.John2:
                bookName = "2. Johannes";
                break;
            case BibleBook.John3:
                bookName = "3. Johannes";
                break;
            case BibleBook.Jude:
                bookName = "Judas";
                break;
            case BibleBook.Revelation:
                bookName = "Offenbarung";
                break;
        }
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
/*export*/ class BibleVerse {
    constructor(location, text) {
        this.location = location;
        this.text = text;
    }
}
/*export*/ class Bible {
    constructor(verses) {
        this.verses = verses;
    }
    get(startLocation, endLocation) {
        assert(startLocation.book == endLocation.book, "");
        let text = "";
        for (let verse of this.verses) {
            if (verse.location.chapter >= startLocation.chapter && verse.location.chapter <= endLocation.chapter &&
                verse.location.verse >= startLocation.verse && verse.location.verse <= endLocation.verse) {
                text += verse.text;
            }
        }
        return text;
    }
}
// https://www.bibleserver.com/SLT/
/*export*/ function createSchlachter2000() {
    let verses = [
        new BibleVerse(new BibleLocation(BibleBook.Romans, 6, 23), "Denn der Lohn der Sünde ist der Tod; aber die Gnadengabe Gottes ist das ewige Leben in Christus Jesus, unserem Herrn."),
        new BibleVerse(new BibleLocation(BibleBook.Galatians, 4, 4), "Als aber die Zeit erfüllt war, sandte Gott seinen Sohn, geboren von einer Frau und unter das Gesetz getan,"),
        new BibleVerse(new BibleLocation(BibleBook.Galatians, 4, 5), "damit er die, welche unter dem Gesetz waren, loskaufte, damit wir die Sohnschaft empfingen."),
    ];
    return new Bible(verses);
}
//# sourceMappingURL=Bible.js.map