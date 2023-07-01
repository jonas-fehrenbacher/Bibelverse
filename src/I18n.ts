/*export*/ class I18n
{
    map: Map<string, string>;
    language: string;

    constructor()
    {
        this.map = new Map<string, string>;
        this.language = ""; // cannot be loaded here, because constructors may not be async
    }

    async load(language: string)
    {
        let commentSymbol: string = "#";
        await fetch("data/i18n_" + language + ".properties").then(response => response.text()).then(file => { 
            //file = file.replace(/\s/g, ""); // regex: /<cmd>/g; g: replace all occurrences (global); \s = whitespace
            file.trim(); // remove leading and trailing white spaces.
            let lines: string[] = file.split(/[\r\n]+/); // split on r, n, rn (for windows and linux) AND filters out empty lines
            for (let line of lines) 
            {
                if (line[0] != commentSymbol) {
                    let key: string = line.substring(0, line.indexOf("=")).trim();
                    let val: string = line.substring(line.indexOf("=") + 1).trim();
                    this.map.set(key, val);
                }
            }
        });
    }

    get(key: string): string | undefined
    {
        return this.map.get(key);
    }
}