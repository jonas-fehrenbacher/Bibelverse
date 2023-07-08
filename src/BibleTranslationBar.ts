import { BibleTranslation, Bible } from "./Bible.js";
import { MessageBus, Message } from "./MessageBus.js";

export class BibleTranslationBar
{
    #bibleTranslation: BibleTranslation; // TODO: compare translations
    #bibleMapRef:      Map<BibleTranslation, Bible>;
    #messageBusRef:    MessageBus;
    #gui:              HTMLElement | null; /* graphical user interface */

    constructor(bibleMap: Map<BibleTranslation, Bible>, messageBusRef: MessageBus)
    {
        this.#bibleTranslation = BibleTranslation.Schlachter1951;
        this.#messageBusRef    = messageBusRef;
        this.#bibleMapRef      = bibleMap;
        this.#gui              = document.getElementById("bibleBar");
    }

    init(): void
    {
        for (let [key, bible] of this.#bibleMapRef) {
            // (1) Create tag btn
            let button: HTMLDivElement = document.createElement("div");
            button.classList.add("bibleBar-item");
            button.append(bible.name);
            button.addEventListener("click", this.#onEvent.bind(this, key, button), false); /* the first parameter of bind() specifies what 'this' should be inside the function. */

            // (2) Add tag btn
            this.#gui?.append(button);

            //document.getElementById("tagBar")?.innerHTML += "<div onClick='onTagEvent(BibleTag." + tag + ", this)' class='tagBar-item'>" + i18n.get(tag) + "</div>";
        }

        // Select bible translation:
        this.#onEvent(this.#bibleTranslation, this.#gui?.getElementsByClassName("bibleBar-item")[0] as HTMLDivElement); // TODO: use ids for every translation and select an default translation
    }

    getSelected(): BibleTranslation
    {
        return this.#bibleTranslation;
    }

    #onEvent(bibleTranslation: BibleTranslation, button: HTMLDivElement): void
    {
        this.#bibleTranslation = bibleTranslation;

        // clear 'active' class:
        let buttons : HTMLCollection | undefined = button.parentElement?.children;
        if (buttons) {
            for (let it of buttons) {
                it.classList.remove("bibleBar-item-active");
            }
        }
        // Set clicked button active:
        button.classList.add("bibleBar-item-active");

        // Send message:
        // Used to call BibleVerseDisplay::displayQuotes() [which calls getSelected()] and Footer::changeCopyright()
        this.#messageBusRef.send(Message.TranslationChanged);
    }
}