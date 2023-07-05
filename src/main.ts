import { Bible, BibleBook, BiblePassagePos, BibleQuote, BibleTag, BibleTranslation, createEberfelder1905, createLuther1545, createSchlachter1951 } from "./Bible.js";
import { I18n } from "./I18n.js";

class App
{
    #bibleMap:         Map<BibleTranslation, Bible>;
    #bibleQuotes:      BibleQuote[];
    #tagFilter:        BibleTag;
    #verseFlexbox:     HTMLElement | null;
    #i18n:             I18n;
    #bibleTranslation: BibleTranslation; // TODO: compare translations

    constructor() {
        this.#tagFilter = BibleTag.EternalLife;
        this.#bibleMap = new Map<BibleTranslation, Bible>;
        this.#bibleQuotes = [];
        this.#verseFlexbox = document.getElementById("verseFlexbox");
        this.#i18n = new I18n();
        this.#bibleTranslation = BibleTranslation.Schlachter1951;
    }

    // Called when webpage is loading.
    async init(): Promise<void>
    {
        this.#bibleMap.set(BibleTranslation.Schlachter1951, await createSchlachter1951());
        this.#bibleMap.set(BibleTranslation.Eberfelder1905, await createEberfelder1905());
        this.#bibleMap.set(BibleTranslation.Luther1545, await createLuther1545());
        this.#i18n.load("de");
        console.log(this.#bibleMap);

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
        await this.#initTagBar(this.#i18n);
        this.#initBibleBar();

        // Select tag:
        const tagBar: HTMLElement | null = document.getElementById("tagBar");
        this.#onTagEvent(BibleTag.EternalLife, tagBar?.getElementsByClassName("tagBar-item")[0] as HTMLDivElement); // TODO: use ids for every tag and select an default tag

        // Select bible translation:
        const bibleBar: HTMLElement | null = document.getElementById("bibleBar");
        this.#onBibleTranslationEvent(this.#bibleTranslation, bibleBar?.getElementsByClassName("bibleBar-item")[0] as HTMLDivElement); // TODO: use ids for every translation and select an default translation

        // Set copyright:
        let copyrightElement: HTMLElement | null = document.getElementById("copyright");
        let bible:            Bible | undefined  = this.#bibleMap.get(this.#bibleTranslation);
        if (copyrightElement && bible) {
            copyrightElement.innerHTML = bible.htmlCopyright;
        }

        // Set title:
        let titleElement: HTMLElement | null = document.getElementById("title");
        if (titleElement) {
            let title: string | undefined = this.#i18n.get("title");
            if (title) {
                titleElement.innerHTML = title;
            }
        }
    }

    async #initTagBar(i18n: I18n): Promise<void>
    {
        await fetch("data/bibleQuotes.json").then(response => response.json()).then(json => {
            let tag: string = "";
            for (tag of json.tags) {
                // (1) Create tag btn
                let button: HTMLDivElement = document.createElement("div");
                button.classList.add("tagBar-item");
                button.append(String(i18n.get(tag)));
                button.addEventListener("click", this.#onTagEvent.bind(null, BibleTag[tag as keyof typeof BibleTag], button), false);

                // (2) Add tag btn
                const tagBar: HTMLElement | null = document.getElementById("tagBar");
                tagBar?.append(button);

                //document.getElementById("tagBar")?.innerHTML += "<div onClick='onTagEvent(BibleTag." + tag + ", this)' class='tagBar-item'>" + i18n.get(tag) + "</div>";
            }
        });
    }

    #initBibleBar(): void
    {
        for (let [key, bible] of this.#bibleMap) {
            // (1) Create tag btn
            let button: HTMLDivElement = document.createElement("div");
            button.classList.add("bibleBar-item");
            button.append(bible.name);
            button.addEventListener("click", this.#onBibleTranslationEvent.bind(null, key, button), false);

            // (2) Add tag btn
            const bibleBar: HTMLElement | null = document.getElementById("bibleBar");
            bibleBar?.append(button);

            //document.getElementById("tagBar")?.innerHTML += "<div onClick='onTagEvent(BibleTag." + tag + ", this)' class='tagBar-item'>" + i18n.get(tag) + "</div>";
        }
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

                // (1) Create verse text
                let bible: Bible | undefined  = this.#bibleMap.get(this.#bibleTranslation);
                let text = document.createElement("div");
                text.innerHTML = "<span>" + bible?.get(bibleQuote.startPos, bibleQuote.endPos) + "</span>";
                // <span> is required because bible.get() returns text which has tags and they only work like that.

                // (2) Create position box
                // 'positionContent' is required, so that the background color applies only around the position text. 
                let positionContent = document.createElement("div");
                positionContent.classList.add("bibleVerse-positionBox");
                positionContent.append(bibleQuote.getPositionStr(this.#i18n));
                let positionBox = document.createElement("div");
                positionBox.append(positionContent);

                // (3) Create new verse
                let newVerse = document.createElement("div");
                newVerse.classList.add("verseFlexbox-item");
                newVerse.append(text);
                newVerse.append(positionBox)

                this.#verseFlexbox?.append(newVerse);
            }
        }
    }

    #onBibleTranslationEvent(bibleTranslation: BibleTranslation, button: HTMLDivElement): void
    {
        app.#bibleTranslation = bibleTranslation;
        app.#displayQuotes(app.#tagFilter);

        // clear 'active' class:
        let buttons : HTMLCollection | undefined = button.parentElement?.children;
        if (buttons) {
            for (let it of buttons) {
                it.classList.remove("active");
            }
        }
        // Set clicked button active:
        button.classList.add("active");

        // Set copyright:
        let copyrightElement: HTMLElement | null = document.getElementById("copyright");
        let bible:            Bible | undefined  = app.#bibleMap.get(app.#bibleTranslation);
        if (copyrightElement && bible) {
            copyrightElement.innerHTML = bible.htmlCopyright;
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