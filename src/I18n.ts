import { Properties } from "./Properties.js";

/**
 * Internationalization (I18n) can load en and de as languages.
 * Use get() to get the translation to an corresponding key.
 * Write your translation inside an data/i18n_<lang>.properties file like this:
 * key = translation 
 */
export class I18n
{
    #properties: Properties;
    #language: string;
    #dirPath: string;

    constructor()
    {
        this.#properties = new Properties;
        this.#language = ""; // cannot be loaded here, because constructors may not be async
        this.#dirPath = "data/";
    }

    async load(language: string): Promise<void>
    {
        this.#language = language;
        await this.#properties.load(this.#dirPath + "i18n_" + language + ".properties");
    }

    get(key: string): string | undefined
    {
        return this.#properties.get(key);
    }

    getLanguage(): string
    {
        return this.#language;
    }
}