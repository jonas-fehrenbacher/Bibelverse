import { Bible, BibleTranslation, createEberfelder1905, createLuther1545, createSchlachter1951 } from "./Bible.js";
import { I18n } from "./I18n.js";
import { TagBar } from "./TagBar.js";
import { Header } from "./Header.js"
import { BibleTranslationBar } from "./BibleTranslationBar.js";
import { BibleVerseDisplay } from "./BibleVerseDisplay.js";
import { Footer } from "./Footer.js";
import { MessageBus } from "./MessageBus.js";

class App
{
    #bibleMap:            Map<BibleTranslation, Bible>;
    #i18n:                I18n;
    #tagBar:              TagBar;
    #header:              Header;
    #bibleTranslationBar: BibleTranslationBar;
    #bibleVerseDisplay:   BibleVerseDisplay;
    #footer:              Footer;
    #messageBus:          MessageBus;

    constructor() {
        this.#messageBus          = new MessageBus;
        this.#bibleMap            = new Map<BibleTranslation, Bible>;
        this.#i18n                = new I18n;
        this.#header              = new Header(this.#i18n, this.#messageBus);
        this.#tagBar              = new TagBar(this.#i18n, this.#messageBus);
        this.#bibleTranslationBar = new BibleTranslationBar(this.#bibleMap, this.#messageBus);
        this.#bibleVerseDisplay   = new BibleVerseDisplay(this.#bibleMap, this.#messageBus, this.#i18n, this.#tagBar, this.#bibleTranslationBar);
        this.#footer              = new Footer(this.#messageBus, this.#bibleTranslationBar, this.#bibleMap);
    }

    // Called when webpage is loading.
    async init(): Promise<void>
    {
        // Init bible map:
        this.#bibleMap.set(BibleTranslation.Schlachter1951, await createSchlachter1951());
        this.#bibleMap.set(BibleTranslation.Eberfelder1905, await createEberfelder1905());
        this.#bibleMap.set(BibleTranslation.Luther1545, await createLuther1545());

        // Init components:
        await this.#i18n.load("de");
        await this.#bibleVerseDisplay.init();
        await this.#tagBar.init();
        this.#bibleTranslationBar.init();
        this.#footer.init();
        this.#header.init();
    }
}

let app: App = new App();
app.init();