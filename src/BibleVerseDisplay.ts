import { BibleTranslation, Bible, BibleQuote, BibleBook, BibleTag, BiblePassagePos } from "./Bible.js";
import { I18n } from "./I18n.js";
import { TagBar } from "./TagBar.js";
import { BibleTranslationBar } from "./BibleTranslationBar.js";
import { assert } from "./Tools.js";

export class BibleVerseDisplay
{
    #bibleMapRef:            Map<BibleTranslation, Bible>;
    #bibleQuotes:            BibleQuote[];
    #verseFlexbox:           HTMLElement | null;
    #i18nRef:                I18n;
    #tagBarRef:              TagBar;
    #bibleTranslationBarRef: BibleTranslationBar;

    constructor(bibleMapRef: Map<BibleTranslation, Bible>, i18nRef: I18n, tagBarRef: TagBar, bibleTranslationBarRef: BibleTranslationBar)
    {
        this.#bibleMapRef = bibleMapRef;
        this.#bibleQuotes = [];
        this.#verseFlexbox = document.getElementById("verseFlexbox");
        this.#i18nRef = i18nRef;              
        this.#tagBarRef = tagBarRef;    
        this.#bibleTranslationBarRef = bibleTranslationBarRef;
    }

    async init()
    {
        // Load bible quotes:
        // File reading: 
        // Reading files was done with 'XMLHttpRequest', but now there is the fetch API which is a lot simpler.
        // The down side is that when running the webpage on a local system it causes an CORS error, but that
        // prevents security issue, so thats fine. We are now required to run the webpage on an local webserver
        // for development purposes.
        // Note: Use 'await' to wait for the function to finish (requires a 'async' function).
        // See: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS/Errors/CORSRequestNotHttp
        await fetch("data/bibleQuotes.json").then(response => response.json()).then(json => { 
            for (let quote of json.quotes) {
                const book : BibleBook = BibleBook[quote.startPos.b as keyof typeof BibleBook]; // convert string to enum
                let tags: BibleTag[] = [];
                for (let tag of quote.tags) {
                    tags.push(BibleTag[tag as keyof typeof BibleTag]);
                }
                this.#bibleQuotes.push(new BibleQuote(
                    new BiblePassagePos(book, quote.startPos.c, quote.startPos.v),
                    new BiblePassagePos(book, quote.endPos.c, quote.endPos.v),
                    tags
                ));
            }
        });
    }

    displayQuotes(): void
    {
        assert(this instanceof BibleVerseDisplay, ""); /* use displayQuotes.bind(this) to achive this. */

        // Empty verse flexbox:
        // Using .innerHTML is slower
        if (this.#verseFlexbox) {
            while (this.#verseFlexbox.firstChild) {
                this.#verseFlexbox.removeChild(this.#verseFlexbox.firstChild); // lastChild
            }
        }
        
        // Load verse flexbox:
        for (let bibleQuote of this.#bibleQuotes) {
            if (bibleQuote.tags.find(a => a == this.#tagBarRef.getSelected()) != undefined) {
                //.. tag found

                // (1) Create verse text
                let bible: Bible | undefined  = this.#bibleMapRef.get(this.#bibleTranslationBarRef.getSelected());
                let text = document.createElement("div");
                text.innerHTML = "<span>" + bible?.get(bibleQuote.startPos, bibleQuote.endPos) + "</span>";
                // <span> is required because bible.get() returns text which has tags and they only work like that.

                // (2) Create position box
                // 'positionContent' is required, so that the background color applies only around the position text. 
                let positionContent: HTMLDivElement = document.createElement("div");
                positionContent.classList.add("bibleVerse-positionBox");
                positionContent.append(bibleQuote.getPositionStr(this.#i18nRef));
                (positionContent as any).bibleQuote = bibleQuote; /* save this for onLanguageEvent() */
                let positionBox = document.createElement("div");
                positionBox.append(positionContent);

                // (3) Create new verse
                let newVerse = document.createElement("div");
                newVerse.classList.add("verseFlexbox-item");
                newVerse.append(text);
                newVerse.append(positionBox)

                // (4) Append verse
                this.#verseFlexbox?.append(newVerse);
            }
        }
    }

    onLanguageEvent(): void
    {
        let bibleVersePositionBoxes: HTMLCollectionOf<Element> = document.getElementsByClassName("bibleVerse-positionBox");
        for (let bibleVersePositionBox of bibleVersePositionBoxes)
        {
            bibleVersePositionBox.innerHTML = (bibleVersePositionBox as any).bibleQuote.getPositionStr(this.#i18nRef);
        }
    }
}