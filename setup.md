#Project Setup

###VSCode - MSYS - MinGW64

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

Note: You can do your project as an nodejs project (`npm init`, `npm i -g typescript`), so that you can easily install new typescript packages (`npm i <pkg>`) - saves it as dependency in package.json.