// https://www.bibleserver.com/en
/*export*/ enum BibleBook
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

/*export*/ enum BibleTag
{
    EternalLife,
    EternalDeath
}

/*export*/ class BibleLocation 
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

/*export*/ class BibleQuote
{
    startLocation: BibleLocation;
    endLocation:   BibleLocation;
    tags:          BibleTag[];

    constructor(startLocation: BibleLocation, endLocation: BibleLocation, tags: BibleTag[]) {
        this.startLocation = startLocation;
        this.endLocation = endLocation;
        this.tags = tags;
    }

    getLocationStr(i18n: I18n): string
    {
        let bookName = i18n.get(BibleBook[this.startLocation.book]);

        let location: string = bookName + " ";
        location += this.startLocation.chapter + ":";
        location += this.startLocation.verse;

        if (this.startLocation != this.endLocation)
        {
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

/*export*/ class Bible
{
    verses: string[][][]; //< [book][chapter][verse]
    name: string;
    htmlCopyright: string;

    constructor(verses: string[][][], name: string, htmlCopyright: string) {
        this.verses = verses;
        this.name = name;
        this.htmlCopyright = htmlCopyright;
    }

    get(startLocation: BibleLocation, endLocation: BibleLocation): string
    {
        assert(startLocation.book == endLocation.book, "");

        let text: string = "";
        for (const [chapter, verses] of this.verses[startLocation.book].entries())
        {
            if (chapter >= startLocation.chapter-1 && chapter <= endLocation.chapter-1) // -1, because json starts at 1, but verses[][][] at index 0.
            {
                for (const [verseNumber, verse] of verses.entries())
                {
                    let isLastVerse: Boolean = chapter == endLocation.chapter-1 && verseNumber == endLocation.verse-1;
                    if ((chapter == startLocation.chapter-1 && chapter == endLocation.chapter-1 && (verseNumber >= startLocation.verse-1 && verseNumber <= endLocation.verse-1)) ||
                        (chapter == startLocation.chapter-1 && chapter != endLocation.chapter-1 && verseNumber >= startLocation.verse-1) || 
                        (chapter != startLocation.chapter-1 && chapter != endLocation.chapter-1) ||
                        (chapter == endLocation.chapter-1 && chapter != startLocation.chapter-1 && verseNumber <= endLocation.verse-1)) {
                        text += verse;
                        if (!isLastVerse) {
                            text += " <span class=\"verse-number\">" + (verseNumber+1) + "</span> ";
                        }
                    }
                }
            }
        }

        return text;
    }
}

// https://www.bibleserver.com/SLT/
/*export*/ function createSchlachter2000(): Bible
{
    return new Bible([], "Schlachter2000", "");
}

/*export*/ async function createSchlachter1951(): Promise<Bible>
{
    let bible : Bible = new Bible(
        [], "Schlachter1951", 
        "copyright © 1951 Genfer Bibelgeschellschaft (Geneva Bible Society)<br/>Language: Deutsch (German, Standard)<br/>Translation by: Franz-Eugen Schlachter<br/>Contributor: Genfer Bibelgesellschaft"
    );
    await fetch("data/schlachter1951.json").then(response => response.json()).then(json => { 
        for (let jsonBook of json) {
            let book : string[][] = jsonBook.chapters;
            bible.verses.push(book);
        }
    });

    return bible;
}

/*export*/ async function displayBibleTags(i18n: I18n)
{
    await fetch("data/bibleQuotes.json").then(response => response.json()).then(json => {
        let tag: string = "";
        for (tag of json.tags) {
            //var button = document.createElement("div");
            //button.setAttribute("onclick", "onTagEvent(BibleTag." + tag + ", this)");
            //button.classList.add("nav-item");
            //button.append(tag);
            //document.getElementsByTagName("nav")[0].append(button);
            document.getElementsByTagName("nav")[0].innerHTML += "<div onClick='onTagEvent(BibleTag." + tag + ", this)' class='nav-item'>" + i18n.get(tag) + "</div>";
        }
    });
}