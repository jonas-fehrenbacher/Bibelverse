export class Properties
{
    #map: Map<string, string>;
    #commentSymbol: string;

    constructor()
    {
        this.#map = new Map<string, string>;
        this.#commentSymbol = "#";
    }

    async load(filepath: string): Promise<void>
    {
        this.#map.clear();

        await fetch(filepath).then(response => response.text()).then(file => { 
            //file = file.replace(/\s/g, ""); // regex: /<cmd>/g; g: replace all occurrences (global); \s = whitespace
            file.trim(); // remove leading and trailing white spaces.
            let lines: string[] = file.split(/[\r\n]+/); // split on r, n, rn (for windows and linux) AND filters out empty lines
            for (let line of lines) 
            {
                if (line[0] != this.#commentSymbol) {
                    const key: string = line.substring(0, line.indexOf("=")).trim();
                    const val: string = line.substring(line.indexOf("=") + 1).trim();
                    this.#map.set(key, val);
                }
            }
        });
    }

    get(key: string): string | undefined
    {
        return this.#map.get(key);
    }
}