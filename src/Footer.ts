import { Bible, BibleTranslation } from "./Bible.js";
import { BibleTranslationBar } from "./BibleTranslationBar.js";
import { MessageBus, Message } from "./MessageBus.js";

export class Footer
{
    #gui:                    HTMLElement | null; /* graphical user interface */
    #bibleTranslationBarRef: BibleTranslationBar; // TODO: compare translations
    #bibleMapRef:            Map<BibleTranslation, Bible>;
    #messageBusRef:          MessageBus;

    constructor(messageBusRef: MessageBus, bibleTranslationBarRef: BibleTranslationBar, bibleMapRef: Map<BibleTranslation, Bible>)
    {
        this.#gui                    = document.getElementById("copyright");
        this.#bibleMapRef            = bibleMapRef;
        this.#bibleTranslationBarRef = bibleTranslationBarRef;
        this.#messageBusRef          = messageBusRef;

        this.#messageBusRef.add(this.#onMessage.bind(this));
    }

    init(): void
    {
        this.#changeCopyright();
    }

    #changeCopyright(): void
    {
        let bible: Bible | undefined = this.#bibleMapRef.get(this.#bibleTranslationBarRef.getSelected());
        if (this.#gui  && bible) {
            this.#gui.innerHTML = bible.htmlCopyright;
        }
    }

    #onMessage(message: Message): void
    {
        if (message == Message.TranslationChanged)
        {
            this.#changeCopyright();
        }
    }
}