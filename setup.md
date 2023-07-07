# Project Setup

### VSCode - MSYS - MinGW64

1. Create MinGW terminal via .vscode/settings.json:
```json
{
    "terminal.integrated.profiles.windows": {
        "msys mingw64": {
            "path": "C:/msys64/msys2_shell.cmd",
            "args": [
                "-defterm",
                "-here",
                "-no-start",
                "-mingw64"
            ]
        }
    }
}
```

2. Select terminal as default: Crtl + Shift + P -> Terminal: Select Default Profile -> "msys mingw64"

3. Create tsconfig.json: tsc --init --sourceMap --rootDir . --outDir build

4. Compile on save: `$ tsc -w`

### Chrome Browser Cache

If you update an .css file, then a normal website reload will probably not display the changes. Use Strg+F5 to
make an hard reload and you should se the changes.
Unfortunately, when changing data files like .json it can happen that not even a hard reload will update your data and you have
to completly erase your cache. For this long press the reload button while your dev tools are open and you should get the options 
and one of them is hard reload + empty cache. Otherwise in your dev tools click on 'Network' and then on 'Disable Cache'.
See: https://stackoverflow.com/questions/5690269/disabling-chrome-cache-for-website-development
Another option would be to install a chrome extention like 'Classic Cache Killer'.



Note: You can do your project as an nodejs project (`npm init`, `npm i -g typescript`), so that you can easily install new typescript packages (`npm i <pkg>`) - saves it as dependency in package.json.