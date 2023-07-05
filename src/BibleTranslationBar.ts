import { BibleTranslation, Bible } from "./Bible.js";

export class BibleTranslationBar
{
    #bibleTranslation: BibleTranslation; // TODO: compare translations
    #bibleMapRef: Map<BibleTranslation, Bible>;
    #displayQuotes: () => void;

    constructor(bibleMap: Map<BibleTranslation, Bible>)
    {
        this.#bibleTranslation = BibleTranslation.Schlachter1951;
        this.#displayQuotes = () => {};
        this.#bibleMapRef = bibleMap;
    }

    init(displayQuotes: () => void): void
    {
        this.#displayQuotes = displayQuotes;

        for (let [key, bible] of this.#bibleMapRef) {
            // (1) Create tag btn
            let button: HTMLDivElement = document.createElement("div");
            button.classList.add("bibleBar-item");
            button.append(bible.name);
            button.addEventListener("click", this.#onEvent.bind(null, this, key, button), false);

            // (2) Add tag btn
            const bibleBar: HTMLElement | null = document.getElementById("bibleBar");
            bibleBar?.append(button);

            //document.getElementById("tagBar")?.innerHTML += "<div onClick='onTagEvent(BibleTag." + tag + ", this)' class='tagBar-item'>" + i18n.get(tag) + "</div>";
        }

        // Select bible translation:
        const bibleBar: HTMLElement | null = document.getElementById("bibleBar");
        this.#onEvent(this, this.#bibleTranslation, bibleBar?.getElementsByClassName("bibleBar-item")[0] as HTMLDivElement); // TODO: use ids for every translation and select an default translation
    }

    getSelected(): BibleTranslation
    {
        return this.#bibleTranslation;
    }

    #onEvent(_this: BibleTranslationBar, bibleTranslation: BibleTranslation, button: HTMLDivElement): void
    {
        _this.#bibleTranslation = bibleTranslation;
        _this.#displayQuotes();

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
        let bible:            Bible | undefined  = _this.#bibleMapRef.get(_this.#bibleTranslation);
        if (copyrightElement && bible) {
            copyrightElement.innerHTML = bible.htmlCopyright;
        }
    }
}