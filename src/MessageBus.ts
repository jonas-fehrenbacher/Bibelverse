export enum Message
{
    LanguageChanged,
    TagChanged,
    TranslationChanged,
    VerseViewChanged
}

export class MessageBus
{
    #receivers: { (message: Message): void }[];

    constructor()
    {
        this.#receivers = [];
    }

    add(receiver: (message: Message) => void): void
    {
        this.#receivers.push(receiver);
    }

    send(message: Message): void
    {
        for (let receiver of this.#receivers) {
            receiver(message);
        }
    }
}