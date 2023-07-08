import { MessageBus, Message } from "./MessageBus.js";

export enum VerseView
{
    Grid,
    List
}

/** Inside ::Header */
export class VerseViewSelector
{
    #gridViewBtn:   HTMLElement | null;
    #listViewBtn:   HTMLElement | null;
    #selected:      VerseView;
    #messageBusRef: MessageBus;

    constructor(messageBusRef: MessageBus)
    {
        this.#gridViewBtn   = document.getElementById("gridVerseView");
        this.#listViewBtn   = document.getElementById("listVerseView");
        this.#messageBusRef = messageBusRef;
        this.#selected      = VerseView.Grid;

        this.#gridViewBtn?.addEventListener("click", this.#onEvent.bind(this, this.#gridViewBtn, VerseView.Grid), false);
        this.#listViewBtn?.addEventListener("click", this.#onEvent.bind(this, this.#listViewBtn, VerseView.List), false);
    }

    init(): void
    {

    }

    getSelected(): VerseView
    {
        return this.#selected;
    }

    #onEvent(activeBtn: HTMLElement | null, verseView: VerseView): void
    {
        this.#selected = verseView;

        // clear 'active' class:
        this.#gridViewBtn?.classList.remove("img-btn-active");
        this.#listViewBtn?.classList.remove("img-btn-active");
        // Set clicked button active:
        activeBtn?.classList.add("img-btn-active");

        this.#messageBusRef.send(Message.VerseViewChanged);
    }
}