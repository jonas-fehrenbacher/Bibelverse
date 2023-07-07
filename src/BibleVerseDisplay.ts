import { BibleTranslation, Bible } from "./Bible.js";
import { BibleQuote, BibleBook, BiblePassagePos } from "./BibleQuote.js";
import { I18n } from "./I18n.js";
import { TagBar } from "./TagBar.js";
import { BibleTranslationBar } from "./BibleTranslationBar.js";
import { assert } from "./Tools.js";
import { DataPath } from "./DataPath.js";
import { MessageBus, Message } from "./MessageBus.js";

export class BibleVerseDisplay
{
    #bibleMapRef:            Map<BibleTranslation, Bible>;
    #bibleQuotes:            BibleQuote[];
    #verseFlexbox:           HTMLElement | null;
    #i18nRef:                I18n;
    #tagBarRef:              TagBar;
    #bibleTranslationBarRef: BibleTranslationBar;
    #messageBusRef:          MessageBus;

    constructor(bibleMapRef: Map<BibleTranslation, Bible>, messageBusRef: MessageBus, i18nRef: I18n, tagBarRef: TagBar, bibleTranslationBarRef: BibleTranslationBar)
    {
        this.#bibleMapRef            = bibleMapRef;
        this.#bibleQuotes            = [];
        this.#verseFlexbox           = document.getElementById("verseFlexbox");
        this.#i18nRef                = i18nRef;              
        this.#tagBarRef              = tagBarRef;    
        this.#bibleTranslationBarRef = bibleTranslationBarRef;
        this.#messageBusRef          = messageBusRef;

        this.#messageBusRef.add(this.#onMessage.bind(this));
    }

    async init(): Promise<void>
    {
        // Load bible quotes:
        // File reading: 
        // Reading files was done with 'XMLHttpRequest', but now there is the fetch API which is a lot simpler.
        // The down side is that when running the webpage on a local system it causes an CORS error, but that
        // prevents security issue, so thats fine. We are now required to run the webpage on an local webserver
        // for development purposes.
        // Note: Use 'await' to wait for the function to finish (requires a 'async' function).
        // See: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS/Errors/CORSRequestNotHttp
        await fetch(DataPath.BibleQuotes).then(response => response.json()).then(json => { 
            console.log(json.quotes);

            for (let quote of json.quotes) 
            {
                assert(quote["passage"] && quote["tags"], ""); // this two fields are expected

                let bookName: string = quote.passage[0];
                let startChapter: number = 0;
                let startVerse: number = 0;
                let endChapter: number = 0;
                let endVerse: number = 0;

                // passage: <book>, start-chapter, start-verse [[, end-chapter], end-verse]
                if (quote.passage.length == 3) {
                    startChapter = quote.passage[1];
                    startVerse = quote.passage[2];
                    endChapter = startChapter;
                    endVerse = startVerse;
                }
                else if (quote.passage.length == 4) {
                    startChapter = quote.passage[1];
                    startVerse = quote.passage[2];
                    endChapter = startChapter;
                    endVerse = quote.passage[3];
                }
                else if (quote.passage.length == 5) {
                    startChapter = quote.passage[1];
                    startVerse = quote.passage[2];
                    endChapter = quote.passage[3];
                    endVerse = quote.passage[4];
                }

                const book : BibleBook = BibleBook[bookName as keyof typeof BibleBook]; // convert string to enum
                let tags: string[] = [];
                for (let tag of quote.tags) {
                    tags.push(tag);
                }
                this.#bibleQuotes.push(new BibleQuote(
                    new BiblePassagePos(book, startChapter, startVerse),
                    new BiblePassagePos(book, endChapter, endVerse),
                    tags
                ));
            }
        });

        // Sort bible quotes:
        this.#bibleQuotes.sort((a: BibleQuote, b: BibleQuote ) => { return a.compare(b); });
    }

    #displayQuotes(): void
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
        for (let bibleQuote of this.#bibleQuotes) 
        {
            if (bibleQuote.tags.find(a => a == this.#tagBarRef.getSelected()) != undefined) {
                //.. tag found

                // (1) Create verse text
                let bible: Bible | undefined  = this.#bibleMapRef.get(this.#bibleTranslationBarRef.getSelected());
                let text = document.createElement("div");
                text.innerHTML = "<span>" + bible?.get(bibleQuote.startPos, bibleQuote.endPos) + "</span>";
                // <span> is required because bible.get() returns text which has tags and they only work like that.

                // (2) Create position box
                // 'positionContent' is required, so that the background color applies only around the position text.
                let bibleQuotePositionStr: string = bibleQuote.getPositionStr(this.#i18nRef);
                let positionContent: HTMLDivElement = document.createElement("div");
                positionContent.classList.add("bibleVerse-positionBox");
                positionContent.append(bibleQuotePositionStr);
                (positionContent as any).bibleQuote = bibleQuote; /* save this for onLanguageEvent() */
                let positionBox: HTMLAnchorElement = document.createElement("a");
                positionBox.title = "to bibleserver.com";
                positionBox.href = "https://www.bibleserver.com/" + bible?.nameOnBibleServer + "/" + bibleQuotePositionStr;
                positionBox.target ="_blank"; /* open in new tab */
                positionBox.rel = "noopener noreferrer"; /* security reasons, see: https://mathiasbynens.github.io/rel-noopener/; https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#attr-target */
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

    #onMessage(message: Message): void
    {
        if (message == Message.LanguageChanged)
        {
            let bibleVersePositionBoxes: HTMLCollectionOf<Element> = document.getElementsByClassName("bibleVerse-positionBox");
            for (let bibleVersePositionBox of bibleVersePositionBoxes)
            {
                bibleVersePositionBox.innerHTML = (bibleVersePositionBox as any).bibleQuote.getPositionStr(this.#i18nRef);
            }
        }
        else if (message == Message.TagChanged || message == Message.TranslationChanged) {
            this.#displayQuotes(); // reset bible quotes if tag or translation changed
        }
    }
}