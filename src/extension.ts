import * as vscode from 'vscode';
import { KoreanEnglishConverter } from './converter';

export function activate(context: vscode.ExtensionContext) {
  let engTypeToKorCommand = vscode.commands.registerCommand('ettk.engTypeToKor', () => {
    convertSelectedText('engToKor');
  });

  let korTypeToEngCommand = vscode.commands.registerCommand('ettk.korTypeToEng', () => {
    convertSelectedText('korToEng');
  });

  context.subscriptions.push(engTypeToKorCommand, korTypeToEngCommand);
}

function convertSelectedText(mode: 'engToKor' | 'korToEng') {
  const editor = vscode.window.activeTextEditor;
  if (editor) {
    const selection = editor.selection;
    const text = editor.document.getText(selection);
    
    let convertedText = '';
    if (mode === 'engToKor') {
      convertedText = KoreanEnglishConverter.engTypeToKor(text);
    } else {
      convertedText = KoreanEnglishConverter.korTypeToEng(text);
    }

    editor.edit(editBuilder => {
      editBuilder.replace(selection, convertedText);
    });
  }
}

export function deactivate() {}
