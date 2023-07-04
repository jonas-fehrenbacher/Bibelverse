import { I18n } from "./I18n.js";
import { assert } from "./Tools.js"

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

export enum BibleTag
{
    EternalLife = 0,
    EternalDeath
}

export class BiblePassagePos
{
    book:    BibleBook;
    chapter: number;
    verse:   number;

    constructor(book: BibleBook, chapter: number, verse: number) {
        this.book = book;
        this.chapter = chapter;
        this.verse = verse;
    }
}

export class BibleQuote
{
    startPos: BiblePassagePos;
    endPos:   BiblePassagePos;
    tags:          BibleTag[];

    constructor(startPos: BiblePassagePos, endPos: BiblePassagePos, tags: BibleTag[]) {
        this.startPos = startPos;
        this.endPos = endPos;
        this.tags = tags;
    }

    getPositionStr(i18n: I18n): string
    {
        const bookName = i18n.get(BibleBook[this.startPos.book]);

        let pos: string = bookName + " ";
        pos += this.startPos.chapter + ":";
        pos += this.startPos.verse;

        if (this.startPos != this.endPos)
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
}

export class Bible
{
    verses: string[][][]; //< [book][chapter][verse]
    name: string;
    htmlCopyright: string;

    constructor(verses: string[][][], name: string, htmlCopyright: string) {
        this.verses = verses;
        this.name = name;
        this.htmlCopyright = htmlCopyright;
    }

    get(startPos: BiblePassagePos, endPos: BiblePassagePos): string
    {
        assert(startPos.book == endPos.book, "");

        let text: string = "";
        for (const [chapter, verses] of this.verses[startPos.book].entries())
        {
            if (chapter >= startPos.chapter-1 && chapter <= endPos.chapter-1) // -1, because json starts at 1, but verses[][][] at index 0.
            {
                for (const [verseNumber, verse] of verses.entries())
                {
                    let isLastVerse: Boolean = chapter == endPos.chapter-1 && verseNumber == endPos.verse-1;
                    if ((chapter == startPos.chapter-1 && chapter == endPos.chapter-1 && (verseNumber >= startPos.verse-1 && verseNumber <= endPos.verse-1)) ||
                        (chapter == startPos.chapter-1 && chapter != endPos.chapter-1 && verseNumber >= startPos.verse-1) || 
                        (chapter != startPos.chapter-1 && chapter != endPos.chapter-1) ||
                        (chapter == endPos.chapter-1 && chapter != startPos.chapter-1 && verseNumber <= endPos.verse-1)) {
                        text += verse;
                        if (!isLastVerse) {
                            text += " <span class=\"bibleVerse-number\">" + (verseNumber+1) + "</span> ";
                        }
                    }
                }
            }
        }

        return text;
    }
}

// https://www.bibleserver.com/SLT/
export function createSchlachter2000(): Bible
{
    return new Bible([], "Schlachter2000", "");
}

export async function createSchlachter1951(): Promise<Bible>
{
    let bible : Bible = new Bible(
        [], "Schlachter1951", 
        "copyright © 1951 Genfer Bibelgeschellschaft (Geneva Bible Society)<br/>Language: Deutsch (German, Standard)<br/>Translation by: Franz-Eugen Schlachter<br/>Contributor: Genfer Bibelgesellschaft"
    );
    await fetch("data/schlachter1951.json").then(response => response.json()).then(json => { 
        for (let jsonBook of json) {
            const book : string[][] = jsonBook.chapters;
            bible.verses.push(book);
        }
    });

    return bible;
}