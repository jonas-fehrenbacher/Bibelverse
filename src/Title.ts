import { I18n } from "./I18n.js";

export class Title
{
    #titleElement: HTMLElement | null;

    constructor()
    {
        this.#titleElement = document.getElementById("title");
    }

    onLanguageEvent(i18n : I18n)
    {
        if (this.#titleElement) {
            this.#titleElement.innerHTML = String(i18n.get("title"));
        }
    }
}