import { Bible, BibleBook, BiblePassagePos, BibleQuote, BibleTag, createSchlachter1951 } from "./Bible.js";
import { I18n } from "./I18n.js";

class App
{
    #schlachter1951: Bible;
    #bibleQuotes:    BibleQuote[];
    #tagFilter:      BibleTag;
    #verseFlexbox:   HTMLElement | null;
    #i18n:           I18n;

    constructor() {
        this.#tagFilter = BibleTag.EternalLife;
        this.#schlachter1951 = new Bible([], "", "");
        this.#bibleQuotes = [];
        this.#verseFlexbox = document.getElementById("verseFlexbox");
        this.#i18n = new I18n();
    }

    // Called when webpage is loading.
    async init(): Promise<void>
    {
        this.#schlachter1951 = await createSchlachter1951();
        this.#i18n.load("de");

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

        // Load navigation:
        await this.#displayBibleTags(this.#i18n);

        // Select tag:
        const navElement: HTMLElement = document.getElementsByTagName("nav")[0];
        this.#onTagEvent(BibleTag.EternalLife, navElement.getElementsByClassName("nav-item")[0] as HTMLDivElement);

        // Set copyright:
        let copyrightElement = document.getElementById("copyright");
        if (copyrightElement) copyrightElement.innerHTML = this.#schlachter1951.htmlCopyright;

        // Set title:
        let titleElement: HTMLElement | null = document.getElementById("title");
        if (titleElement) {
            let title: string | undefined = this.#i18n.get("title");
            if (title) {
                titleElement.innerHTML = title;
            }
        }
    }

    async #displayBibleTags(i18n: I18n): Promise<void>
    {
        await fetch("data/bibleQuotes.json").then(response => response.json()).then(json => {
            let tag: string = "";
            for (tag of json.tags) {
                let button: HTMLDivElement = document.createElement("div");
                button.classList.add("nav-item");
                button.append(String(i18n.get(tag)));
                button.addEventListener("click", this.#onTagEvent.bind(null, BibleTag[tag as keyof typeof BibleTag], button), false);

                let tagBox: HTMLElement = document.getElementsByTagName("nav")[0];
                tagBox.append(button);

                //document.getElementsByTagName("nav")[0].innerHTML += "<div onClick='onTagEvent(BibleTag." + tag + ", this)' class='nav-item'>" + i18n.get(tag) + "</div>";
            }
        });
    }

    #displayQuotes(bibleTag: BibleTag): void
    {
        // Empty verse flexbox:
        // Using .innerHTML is slower
        if (this.#verseFlexbox) {
            while (this.#verseFlexbox.firstChild) {
                this.#verseFlexbox.removeChild(this.#verseFlexbox.firstChild); // lastChild
            }
        }

        this.#tagFilter = bibleTag;
        
        // Load verse flexbox:
        for (let bibleQuote of this.#bibleQuotes) {
            if (bibleQuote.tags.find(a => a == this.#tagFilter) != undefined) {
                //.. tag found
                let text = document.createElement("div");
                text.innerHTML = "<span>" + this.#schlachter1951.get(bibleQuote.startPos, bibleQuote.endPos) + "</span>";
                // <span> is required because bible.get() returns text which has tags and they only work like that.

                let positionContent = document.createElement("div");
                positionContent.classList.add("bibleVerse-positionBox");
                positionContent.append(bibleQuote.getPositionStr(this.#i18n));
                let positionBox = document.createElement("div");
                positionBox.append(positionContent);

                let newVerse = document.createElement("div");
                newVerse.classList.add("verseFlexbox-item");
                newVerse.append(text);
                newVerse.append(positionBox)

                this.#verseFlexbox?.append(newVerse);
            }
        }
    }

    #onTagEvent(bibleTag: BibleTag, button: HTMLDivElement): void
    {
        app.#displayQuotes(bibleTag);

        // clear 'active' class:
        let buttons : HTMLCollection | undefined = button.parentElement?.children;
        if (buttons) {
            for (let it of buttons) {
                it.classList.remove("active");
            }
        }
        // Set clicked button active:
        button.classList.add("active");
    }
}

let app: App = new App();
app.init();