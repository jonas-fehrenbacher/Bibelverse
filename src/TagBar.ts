import { I18n } from "./I18n.js";
import { BibleTag } from "./Bible.js";

export class TagBar
{
    #selected: BibleTag;
    #displayQuotes: () => void;
    #i18nRef: I18n;

    constructor(i18nRef: I18n) {
        this.#selected = BibleTag.EternalLife;
        this.#displayQuotes = () => {};
        this.#i18nRef = i18nRef;
    }

    async init(displayQuotes: () => void): Promise<void>
    {
        this.#displayQuotes = displayQuotes;

        // Create tags:
        await fetch("data/bibleQuotes.json").then(response => response.json()).then(json => {
            let tag: string = "";
            for (tag of json.tags) {
                // (1) Create tag btn
                let button: HTMLDivElement = document.createElement("div");
                //button.id = "tagBar-item-id-" + tag;
                (button as any).langKey = tag;
                button.classList.add("tagBar-item");
                button.append(String(this.#i18nRef.get(tag)));
                button.addEventListener("click", this.#onEvent.bind(null, this, BibleTag[tag as keyof typeof BibleTag], button), false);

                // (2) Add tag btn
                const tagBar: HTMLElement | null = document.getElementById("tagBar");
                tagBar?.append(button);

                //document.getElementById("tagBar")?.innerHTML += "<div onClick='onTagEvent(BibleTag." + tag + ", this)' class='tagBar-item'>" + i18n.get(tag) + "</div>";
            }
        });

        // Select tag:
        const tagBar: HTMLElement | null = document.getElementById("tagBar");
        this.#onEvent(this, BibleTag.EternalLife, tagBar?.getElementsByClassName("tagBar-item")[0] as HTMLDivElement); // TODO: use ids for every tag and select an default tag
    }

    getSelected(): BibleTag
    {
        return this.#selected;
    }

    onLanguageEvent(): void
    {
        let tags: HTMLCollectionOf<Element> = document.getElementsByClassName("tagBar-item");
        for (let tag of tags)
        {
            tag.innerHTML = String(this.#i18nRef.get((tag as any).langKey));
        }
    }

    #onEvent(tagBar: TagBar, bibleTag: BibleTag, button: HTMLDivElement): void
    {
        /* Note: 'this' is here not 'tagBar' if its called from somewhere else. */

        tagBar.#selected = bibleTag;
        tagBar.#displayQuotes();

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