import { I18n } from "./I18n.js";
import { MessageBus, Message } from "./MessageBus.js";
import { VerseViewSelector } from "./VerseViewSelector.js";

export class Header
{
    #titleElement:        HTMLElement | null;
    #i18nRef :            I18n;
    #languageSelectorBtn: HTMLSelectElement;
    #messageBusRef:       MessageBus;
    #verseViewSelector : VerseViewSelector;

    constructor(i18nRef: I18n, messageBusRef: MessageBus)
    {
        this.#titleElement        = document.getElementById("title");
        this.#i18nRef             = i18nRef;
        this.#languageSelectorBtn = document.getElementById("languageSelector") as HTMLSelectElement; // TODO: Maybe use class Header(Title, lsBtn)
        this.#messageBusRef       = messageBusRef;
        this.#verseViewSelector   = new VerseViewSelector(messageBusRef);

        this.#messageBusRef.add(this.#onLanguageEvent.bind(this));
    }

    init(): void
    {
        this.#languageSelectorBtn.addEventListener("change", this.#onLanguageSelectorBtnEvent.bind(this), false);
        this.#verseViewSelector.init();
        this.#onLanguageEvent();
    }

    getVerseViewSelector(): VerseViewSelector
    {
        return this.#verseViewSelector;
    }

    async #onLanguageSelectorBtnEvent(): Promise<void>
    {
        // Update i18n:
        if (this.#languageSelectorBtn.value != this.#i18nRef.getLanguage()) {
            // ..user selected different language
            await this.#i18nRef.load(this.#languageSelectorBtn.value); /* 'await' is required otherwise thread runs further and leaving the translation undefined. */
        }

        this.#messageBusRef.send(Message.LanguageChanged);

        // Note: Have a seperate #onLanguageEvent() callback, because other classes can also call a 'LanguageChanged' message.
    }

    #onLanguageEvent(): void
    {        
        if (this.#titleElement) {
            this.#titleElement.innerHTML = String(this.#i18nRef.get("title"));
        }
    }
}