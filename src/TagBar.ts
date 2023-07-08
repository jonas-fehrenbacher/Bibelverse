import { I18n } from "./I18n.js";
import { DataPath } from "./DataPath.js";
import { MessageBus, Message } from "./MessageBus.js";

export class TagBar
{
    #selected:      string;
    #messageBusRef: MessageBus;
    #i18nRef:       I18n;
    #gui:           HTMLElement | null; /* graphical user interface */

    constructor(i18nRef: I18n, messageBusRef: MessageBus) {
        this.#selected      = "";
        this.#messageBusRef = messageBusRef;
        this.#i18nRef       = i18nRef;
        this.#gui           = document.getElementById("tagBar");

        this.#messageBusRef.add(this.#onMessage.bind(this));
    }

    async init(): Promise<void>
    {
        // Create tags:
        let tags: string[] = [];
        await fetch(DataPath.BibleQuotes).then(response => response.json()).then(json => {
            for (let tag of json.tags) {
                tags.push(tag);
            }
        });

        // Create tag buttons:
        for (let tag of tags) {
            // (1) Create tag btn
            let button: HTMLDivElement = document.createElement("div");
            //button.id = "tagBar-item-id-" + tag;
            (button as any).langKey = tag;
            button.classList.add("tagBar-item");
            let tagName: string | undefined = this.#i18nRef.get(tag);
            if (tagName) {
                button.append(tagName);
            }
            else {
                button.append(tag + "[i18n-undefined]");
            }
            button.addEventListener("click", this.#onEvent.bind(this, tag, button), false);

            // (2) Add tag btn
            this.#gui?.append(button);

            //document.getElementById("tagBar")?.innerHTML += "<div onClick='onTagEvent(tag, this)' class='tagBar-item'>" + i18n.get(tag) + "</div>";
        }

        // Select tag:
        if (tags.length > 0) {
            this.#onEvent(tags[0], this.#gui?.getElementsByClassName("tagBar-item")[0] as HTMLDivElement); // TODO: use ids for every tag and select an default tag
        }
    }

    getSelected(): string
    {
        return this.#selected;
    }

    #onMessage(message: Message): void
    {
        if (message == Message.LanguageChanged)
        {
            let tags: HTMLCollectionOf<Element> = document.getElementsByClassName("tagBar-item");
            for (let tag of tags)
            {
                tag.innerHTML = String(this.#i18nRef.get((tag as any).langKey));
            }
        }
    }

    #onEvent(bibleTag: string, button: HTMLDivElement): void
    {
        /* Note: 'this' is here not 'tagBar' if its called from somewhere else. */

        this.#selected = bibleTag;

        // clear 'active' class:
        let buttons : HTMLCollection | undefined = button.parentElement?.children;
        if (buttons) {
            for (let it of buttons) {
                it.classList.remove("tagBar-item-active");
            }
        }
        // Set clicked button active:
        button.classList.add("tagBar-item-active");

        // Send message:
        // Used to call BibleVerseDisplay::displayQuotes() [which calls getSelected()]
        this.#messageBusRef.send(Message.TagChanged);
    }
}