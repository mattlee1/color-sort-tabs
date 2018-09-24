# color-sort-tabs README

This vscode extension is still in development and has limited features at the moment. There are a number of known issues. 


To use the extension you must first install the "vscode-custom-css" plugin that it is dependent on. The instructions on how to do this as well as the download link can be found here:
https://marketplace.visualstudio.com/items?itemName=be5invis.vscode-custom-css

Once it is installed, navigate to %USERPROFILE%\.vscode\extensions\be5invis.vscode-custom-css-2.7.1 and modify it's package.json to include the following keybinding under for easier use:

"keybindings":[{
				"command":"extension.updateCustomCSS",
				"key":"ctrl+7"
}],

Next download this repository and include it in the directory %USERPROFILE%\.vscode\extensions. Restart VSCode and press ctrl+8 to change the color of your active tab. A command prompt will appear asking you for the css color or hex code that you wish to use. Then press ctrl + 7 to reload the css, and click restart VSCode. 
