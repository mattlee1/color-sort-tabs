import * as vscode from 'vscode';
var writeFile = require('write');
var read = require('read-file');

class UserActions {
    async ChangeTabColorByUserInput(){
        let input = await vscode.window.showInputBox({ prompt:'Enter the color or hex code you wish to use' });
        
        if(input !== undefined){
           this.ConstructCSSFile(input);
        }
        else{
            return null;
        }
        
    }

    ConstructCSSFile(color: String){
            //name and index of current tab. if active text editor is undefined then only one tab is open
            let currTabName = vscode.window.activeTextEditor !== undefined ? vscode.window.activeTextEditor.document.fileName : '';
            let currTabIndex = currTabName === '' ? 1 : vscode.workspace.textDocuments.findIndex(x => x.fileName === currTabName) + 1;
            
            //css line to add to the file 
            let cssLine = `.tab:nth-child(${currTabIndex}){ border-bottom:5px solid /*start${currTabIndex}*/${color};/*end${currTabIndex}*/ } \n`;
            
            //get the entire contents of the current css file as a string
            let currentCSSContents = read.sync('C:/vscode.css').toString();
            //set variable for what will be saved to the file
            let finalCSSContents = '';
            
            //whether or not the tab index being changed is already in the css file
            let isAlreadyInCSS = currentCSSContents.includes(`.tab:nth-child(${currTabIndex})`);
            
            //if it is already in the css file, we just need to replace the color value for that tab
            if(isAlreadyInCSS){
                    let cssLinePt1 = currentCSSContents.split(`/*start${currTabIndex}*/`)[0];
                    let cssLinePt2 = currentCSSContents.split(`/*end${currTabIndex}*/`)[1];
                    finalCSSContents = cssLinePt1 + `/*start${currTabIndex}*/` + color + `/*end${currTabIndex}*/`+ cssLinePt2;
            }else{ //otherwise we add to the end of the file
                    finalCSSContents = currentCSSContents + '  ' + cssLine;
            }
                
            //writes the final css contents to the file
            writeFile('C:/vscode.css', finalCSSContents, function(err: any) {});
    }

}

export default new UserActions();
