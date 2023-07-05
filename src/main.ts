import { Bible, BibleBook, BiblePassagePos, BibleQuote, BibleTag, BibleTranslation, createEberfelder1905, createLuther1545, createSchlachter1951 } from "./Bible.js";
import { I18n } from "./I18n.js";
import { TagBar } from "./TagBar.js";
import { Title } from "./Title.js"
import { BibleTranslationBar } from "./BibleTranslationBar.js";
import { BibleVerseDisplay } from "./BibleVerseDisplay.js";

class App
{
    #bibleMap:            Map<BibleTranslation, Bible>;
    #i18n:                I18n;
    #tagBar:              TagBar;
    #title:               Title;
    #bibleTranslationBar: BibleTranslationBar;
    #bibleVerseDisplay:   BibleVerseDisplay;

    constructor() {
        this.#bibleMap = new Map<BibleTranslation, Bible>;
        this.#i18n = new I18n;
        this.#title = new Title;
        this.#tagBar = new TagBar(this.#i18n);
        this.#bibleTranslationBar = new BibleTranslationBar(this.#bibleMap);
        this.#bibleVerseDisplay = new BibleVerseDisplay(this.#bibleMap, this.#i18n, this.#tagBar, this.#bibleTranslationBar);
    }

    // Called when webpage is loading.
    async init(): Promise<void>
    {
        // Init bible map:
        this.#bibleMap.set(BibleTranslation.Schlachter1951, await createSchlachter1951());
        this.#bibleMap.set(BibleTranslation.Eberfelder1905, await createEberfelder1905());
        this.#bibleMap.set(BibleTranslation.Luther1545, await createLuther1545());

        // Init i18n:
        await this.#i18n.load("de");
        document.getElementById("languageSelector")?.addEventListener("change", this.#onLanguageEvent, false);

        // Init bible verse display:
        await this.#bibleVerseDisplay.init();

        // Load navigation:
        await this.#tagBar.init(this.#bibleVerseDisplay.displayQuotes.bind(this.#bibleVerseDisplay)); /* bind() defines 'BibleVerseDisplay::displayQuotes::this' */
        this.#bibleTranslationBar.init(this.#bibleVerseDisplay.displayQuotes.bind(this.#bibleVerseDisplay));

        // Set copyright:
        let copyrightElement: HTMLElement | null = document.getElementById("copyright");
        let bible:            Bible | undefined  = this.#bibleMap.get(this.#bibleTranslationBar.getSelected());
        if (copyrightElement && bible) {
            copyrightElement.innerHTML = bible.htmlCopyright;
        }

        // Set title:
        this.#title.onLanguageEvent(this.#i18n);
    }

    async #onLanguageEvent(): Promise<void>
    {
        // Update i18n:
        let languageSelector: HTMLSelectElement = document.getElementById("languageSelector") as HTMLSelectElement;
        if (languageSelector.value != app.#i18n.getLanguage()) {
            await app.#i18n.load(languageSelector.value); /* 'await' is required otherwise thread runs further and leaving the translation undefined. */
        }

        app.#tagBar.onLanguageEvent();
        app.#title.onLanguageEvent(app.#i18n);
        app.#bibleVerseDisplay.onLanguageEvent();
    }
}

let app: App = new App();
app.init();