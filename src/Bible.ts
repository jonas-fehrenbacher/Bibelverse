// https://www.bibleserver.com/en
/*export*/ enum BibleBook
{
    None,
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

    getLocationStr(): string
    {
        let bookName = "";
        switch (this.startLocation.book) {
            case BibleBook.Genesis: bookName = "1.Mose"; break;
            case BibleBook.Exodus: bookName = "2.Mose"; break;
            case BibleBook.Leviticus: bookName = "3.Mose"; break;
            case BibleBook.Numbers: bookName = "4.Mose"; break;
            case BibleBook.Deuteronomy: bookName = "5.Mose"; break;
            case BibleBook.Joshua: bookName = "Josua"; break;
            case BibleBook.Judges: bookName = "Richter"; break;
            case BibleBook.Ruth: bookName = "Ruth"; break;
            case BibleBook.Samuel1: bookName = "1. Samuel"; break;
            case BibleBook.Samuel2: bookName = "2. Samuel"; break;
            case BibleBook.Kings1: bookName = "1. Könige"; break;
            case BibleBook.Kings2: bookName = "2. Könige"; break;
            case BibleBook.Chronicles1: bookName = "1. Chronik"; break;
            case BibleBook.Chronicles2: bookName = "2. Chronik"; break;
            case BibleBook.Ezra: bookName = "Esra"; break;
            case BibleBook.Nehemiah: bookName = "Nehemia"; break;
            case BibleBook.Esther: bookName = "Esther"; break;
            case BibleBook.Job: bookName = "Hiob"; break;
            case BibleBook.Psalms: bookName = "Psalmen"; break;
            case BibleBook.Proverbs: bookName = "Sprüche"; break;
            case BibleBook.Ecclesiastes: bookName = "Prediger"; break;
            case BibleBook.SongOfSolomon: bookName = "Hohelied"; break;
            case BibleBook.Isaiah: bookName = "Jesaja"; break;
            case BibleBook.Jeremiah: bookName = "Jeremia"; break;
            case BibleBook.Lamentations: bookName = "Klagelieder"; break;
            case BibleBook.Ezekiel: bookName = "Hesekiel"; break;
            case BibleBook.Daniel: bookName = "Daniel"; break;
            case BibleBook.Hosea: bookName = "Hosea"; break;
            case BibleBook.Joel: bookName = "Joel"; break;
            case BibleBook.Amos: bookName = "Amos"; break;
            case BibleBook.Obadiah: bookName = "Obadja"; break;
            case BibleBook.Jonah: bookName = "Jona"; break;
            case BibleBook.Micah: bookName = "Micha"; break;
            case BibleBook.Nahum: bookName = "Nahum"; break;
            case BibleBook.Habbakuk: bookName = "Habakuk"; break;
            case BibleBook.Zephaniah: bookName = "Zephanja"; break;
            case BibleBook.Haggai: bookName = "Haggai"; break;
            case BibleBook.Zechariah: bookName = "Sacharja"; break;
            case BibleBook.Malachi: bookName = "Maleachi"; break;
            case BibleBook.Matthew: bookName = "Matthäus"; break;
            case BibleBook.Mark: bookName = "Markus"; break;
            case BibleBook.Luke: bookName = "Lukas"; break;
            case BibleBook.John: bookName = "Johannes"; break;
            case BibleBook.Acts: bookName = "Apostelgeschichte"; break;
            case BibleBook.Romans: bookName = "Römer"; break;
            case BibleBook.Corinthias1: bookName = "1. Korinther"; break;
            case BibleBook.Corinthias2: bookName = "2. Korinther"; break;
            case BibleBook.Galatians: bookName = "Galater"; break;
            case BibleBook.Ephesians: bookName = "Epheser"; break;
            case BibleBook.Philippians: bookName = "Philipper"; break;
            case BibleBook.Colossians: bookName = "Kolosser"; break;
            case BibleBook.Thessalonians1: bookName = "1. Thessalonicher"; break;
            case BibleBook.Thessalonians2: bookName = "2. Thessalonicher"; break;
            case BibleBook.Timothy1: bookName = "1. Timotheus"; break;
            case BibleBook.Timothy2: bookName = "2. Timotheus"; break;
            case BibleBook.Titus: bookName = "Titus"; break;
            case BibleBook.Philemon: bookName = "Philemon"; break;
            case BibleBook.Hebrews: bookName = "Hebräer"; break;
            case BibleBook.James: bookName = "Jakobus"; break;
            case BibleBook.Peter1: bookName = "1. Petrus"; break;
            case BibleBook.Peter2: bookName = "2. Petrus"; break;
            case BibleBook.John1: bookName = "1. Johannes"; break;
            case BibleBook.John2: bookName = "2. Johannes"; break;
            case BibleBook.John3: bookName = "3. Johannes"; break;
            case BibleBook.Jude: bookName = "Judas"; break;
            case BibleBook.Revelation: bookName = "Offenbarung"; break;
        }

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

/*export*/ class BibleVerse
{
    location: BibleLocation;
    text:     string;

    constructor(location: BibleLocation, text: string) {
        this.location = location;
        this.text = text;
    }
}

/*export*/ class Bible
{
    verses: BibleVerse[];

    constructor(verses: BibleVerse[]) {
        this.verses = verses;
    }

    get(startLocation: BibleLocation, endLocation: BibleLocation): string
    {
        assert(startLocation.book == endLocation.book, "");

        let text: string = "";
        for (let verse of this.verses)
        {
            if (verse.location.chapter >= startLocation.chapter && verse.location.chapter <= endLocation.chapter &&
                verse.location.verse >= startLocation.verse && verse.location.verse <= endLocation.verse) 
            {
                text += verse.text;
            }
        }

        return text;
    }
}

// https://www.bibleserver.com/SLT/
/*export*/ function createSchlachter2000(): Bible
{
    let verses: BibleVerse[] = [
        new BibleVerse(new BibleLocation(BibleBook.Romans, 6, 23), "Denn der Lohn der Sünde ist der Tod; aber die Gnadengabe Gottes ist das ewige Leben in Christus Jesus, unserem Herrn."),
        new BibleVerse(new BibleLocation(BibleBook.Galatians, 4, 4), "Als aber die Zeit erfüllt war, sandte Gott seinen Sohn, geboren von einer Frau und unter das Gesetz getan,"),
        new BibleVerse(new BibleLocation(BibleBook.Galatians, 4, 5), "damit er die, welche unter dem Gesetz waren, loskaufte, damit wir die Sohnschaft empfingen."),
    ]
    return new Bible(verses);
}