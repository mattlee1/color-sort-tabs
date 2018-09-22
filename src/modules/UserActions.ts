import * as vscode from 'vscode';
var writeFile = require('write');
var read = require('read-file');

class UserActions {
    async getColorFromUser(){
        let input = await vscode.window.showInputBox({ prompt:'Enter the color or hex code you wish to use' });
        
        if(input !== undefined){
           this.HandleInput(input);
        }
        else{
            return null;
        }
        
    }

    HandleInput(color: String){
            //handle the case where active text editor is undefined
            let currTabName = vscode.window.activeTextEditor !== undefined ? vscode.window.activeTextEditor.document.fileName : '';
            let currTabIndex = currTabName === '' ? 0 : vscode.workspace.textDocuments.findIndex(x => x.fileName === currTabName) + 1;
            let cssLine = `.tab:nth-child(${currTabIndex}){ border-bottom:5px solid /*start${currTabIndex}*/${color};/*end${currTabIndex}*/ }`;
            let currentCSSContents = read.sync('C:/vscode.css').toString();
            let containsCurrIndex = currentCSSContents.includes(`.tab:nth-child(${currTabIndex})`);
            let finalCSSContents = '';
            if(containsCurrIndex){
                    let cssLinePt1 = currentCSSContents.split(`/*start${currTabIndex}*/`)[0];
                    let cssLinePt2 = currentCSSContents.split(`/*end${currTabIndex}*/`)[1];
                    finalCSSContents = cssLinePt1 + `/*start${currTabIndex}*/` + color + `/*end${currTabIndex}*/`+ cssLinePt2;
            }else{
                    finalCSSContents = currentCSSContents + '  ' + cssLine;
            }
                
            writeFile('C:/vscode.css', finalCSSContents, function(err: any) {});
        }
    }

}

export default new UserActions();
