import { BiblePassagePos } from "./BibleQuote.js";
import { assert } from "./Tools.js"
import { DataPath } from "./DataPath.js";

export enum BibleTranslation
{
    Schlachter1951,
    Eberfelder1905,
    Luther1545
}

export class Bible
{
    verses:            string[][][]; //< [book][chapter][verse]
    name:              string;
    htmlCopyright:     string;
    nameOnBibleServer: string; /* https://www.bibleserver.com/{nameOnBibleServer}/{passage} */

    constructor(verses: string[][][], name: string, htmlCopyright: string, nameOnBibleServer: string) {
        this.verses            = verses;
        this.name              = name;
        this.htmlCopyright     = htmlCopyright;
        this.nameOnBibleServer = nameOnBibleServer;
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

export async function createSchlachter1951(): Promise<Bible>
{
    let bible : Bible = new Bible(
        [], "Schlachter1951", 
        "copyright © 1951 Genfer Bibelgeschellschaft (Geneva Bible Society)<br/>Language: Deutsch (German, Standard)<br/>Translation by: Franz-Eugen Schlachter<br/>Contributor: Genfer Bibelgesellschaft",
        "SLT"
    );
    await fetch(DataPath.Schlachter1951).then(response => response.json()).then(json => { 
        for (let jsonBook of json) {
            const book : string[][] = jsonBook.chapters;
            bible.verses.push(book);
        }
    });

    return bible;
}

export async function createEberfelder1905(): Promise<Bible>
{
    let bible : Bible = new Bible(
        [], "Eberfelder1905", 
        "This Bible is in the Public Domain.",
        "ELB"
    );
    await fetch(DataPath.Elberfelder1905).then(response => response.json()).then(json => { 
        let currChapter: number = 1;
        let currBook: number = 1;
        let chapter: string[] = [];
        let book : string[][] = [];
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
}

export async function createLuther1545(): Promise<Bible>
{
    let bible : Bible = new Bible(
        [], "Luther1545", 
        "This Bible is in the Public Domain.",
        "LUT"
    );
    await fetch(DataPath.Luther1545).then(response => response.json()).then(json => { 
        let currChapter: number = 1;
        let currBook: number = 1;
        let chapter: string[] = [];
        let book : string[][] = [];
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
}

export async function createKJV(): Promise<Bible>
{
    let bible : Bible = new Bible(
        [], "KJV", 
        "This Bible is in the Public Domain in most parts of the world. However, in the United Kingdom, it is under perpetual Crown copyright.",
        "KJV"
    );
    // Needs a license in the UK..

    return bible;
}