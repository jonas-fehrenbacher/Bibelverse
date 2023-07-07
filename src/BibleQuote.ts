import { I18n } from "./I18n.js";

// https://www.bibleserver.com/en
export enum BibleBook
{
    None = -1,
    Genesis, Exodus, Leviticus, Numbers, Deuteronomy, Joshua, Judges, Ruth, Samuel1, Samuel2,
    Kings1, Kings2, Chronicles1, Chronicles2, Ezra, Nehemiah, Esther, Job, Psalms, Proverbs,
    Ecclesiastes, SongOfSolomon, Isaiah, Jeremiah, Lamentations, Ezekiel, Daniel, Hosea, Joel,
    Amos, Obadiah, Jonah, Micah, Nahum, Habbakuk, Zephaniah, Haggai, Zechariah, Malachi,
    Matthew, Mark, Luke, John, Acts, Romans, Corinthias1, Corinthias2, Galatians, Ephesians,
    Philippians, Colossians, Thessalonians1, Thessalonians2, Timothy1, Timothy2, Titus, Philemon,
    Hebrews, James, Peter1, Peter2, John1, John2, John3, Jude, Revelation
}

export class BiblePassagePos
{
    book:    BibleBook;
    chapter: number;
    verse:   number;

    constructor(book: BibleBook, chapter: number, verse: number) {
        this.book    = book;
        this.chapter = chapter;
        this.verse   = verse;
    }

    equals(other: BiblePassagePos): boolean
    {
        /* objA === objB; objA == objB; Object.is(objA, objB): same location in memory (useful to detect references) */
        return other.book == this.book && other.chapter == this.chapter && other.verse == this.verse;
    }

    compare(other: BiblePassagePos): number
    {
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

export class BibleQuote
{
    startPos: BiblePassagePos;
    endPos:   BiblePassagePos;
    tags:     string[];

    constructor(startPos: BiblePassagePos, endPos: BiblePassagePos, tags: string[]) {
        this.startPos = startPos;
        this.endPos   = endPos;
        this.tags     = tags;
    }

    getPositionStr(i18n: I18n): string
    {
        const bookName = i18n.get(BibleBook[this.startPos.book]);

        let pos: string = bookName + " ";
        pos += this.startPos.chapter + ":";
        pos += this.startPos.verse;

        if (!this.startPos.equals(this.endPos))
        {
            if (this.startPos.chapter == this.endPos.chapter) {
                pos += "-" + this.endPos.verse;
            }
            else {
                pos += "-" + this.endPos.chapter + ":" + this.endPos.verse;
            }
        }

        return pos;
    }

    compare(other: BibleQuote): number
    {
        return this.startPos.compare(other.startPos);
    }
}