import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

interface ChatMessage {
    role: 'user' | 'assistant';
    content: string;
    timestamp: string;
}

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('cursor-chat-saver.saveChatToMarkdown', async () => {
        try {
            const clipboard = await vscode.env.clipboard.readText();
            
            // 디버깅을 위한 로그 추가
            console.log('Clipboard content:', clipboard);
            
            const messages = parseChat(clipboard);
            console.log('Parsed messages:', messages);
            
            const markdown = convertToMarkdown(messages);
            
            const uri = await vscode.window.showSaveDialog({
                filters: {
                    'Markdown': ['md']
                },
                defaultUri: vscode.Uri.file('cursor-chat.md')
            });

            if (uri) {
                fs.writeFileSync(uri.fsPath, markdown);
                vscode.window.showInformationMessage('Chat saved successfully!');
            }
        } catch (error) {
            vscode.window.showErrorMessage('Failed to save chat: ' + error.message);
            console.error('Error details:', error);
        }
    });

    context.subscriptions.push(disposable);
}

function parseChat(text: string): ChatMessage[] {
    const messages: ChatMessage[] = [];
    let currentMessage: Partial<ChatMessage> | null = null;
    
    // 텍스트를 줄 단위로 분리
    const lines = text.split('\n');
    
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        
        // 새로운 메시지 시작 감지
        if (line.match(/^(Human|User):/i)) {
            if (currentMessage) {
                messages.push(currentMessage as ChatMessage);
            }
            currentMessage = {
                role: 'user',
                content: line.replace(/^(Human|User):\s*/i, ''),
                timestamp: new Date().toISOString()
            };
        } 
        else if (line.match(/^Assistant:/i)) {
            if (currentMessage) {
                messages.push(currentMessage as ChatMessage);
            }
            currentMessage = {
                role: 'assistant',
                content: line.replace(/^Assistant:\s*/i, ''),
                timestamp: new Date().toISOString()
            };
        }
        // 현재 메시지에 내용 추가
        else if (currentMessage && line) {
            currentMessage.content = `${currentMessage.content}\n${line}`;
        }
    }
    
    // 마지막 메시지 추가
    if (currentMessage) {
        messages.push(currentMessage as ChatMessage);
    }

    return messages;
}

function convertToMarkdown(messages: ChatMessage[]): string {
    let markdown = '# Cursor.ai Chat Log\n\n';
    
    if (messages.length === 0) {
        markdown += '*No messages found in clipboard*\n\n';
        return markdown;
    }
    
    for (const msg of messages) {
        markdown += `## ${msg.role === 'user' ? '👤 User' : '🤖 Assistant'}\n`;
        
        // 코드 블록 처리
        const content = msg.content.split('\n').map(line => {
            if (line.trim().startsWith('```')) {
                return line;
            }
            return line;
        }).join('\n');
        
        markdown += `${content}\n\n`;
    }

    return markdown;
}

export function deactivate() {}