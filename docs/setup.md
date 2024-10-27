## github 저장소 생성

```sh
cd C:\JnJ-soft\Playground\vscode-extension\vscode-extension-hello-ts

# create
github -e pushRepo -n vscode-extension-hello-ts -u jnjsoftweb -d "vscode extension hello world in typescript"

# copy
github -e pushRepo -n vscode-extension-hello-ts -u jnjsoftweb
npm install
```

## 실행

VS Code 확장 기능을 실행하고 테스트하는 방법은 다음과 같습니다:
1. 확장 기능 프로젝트 열기:
VS Code에서 확장 기능 프로젝트 폴더를 엽니다.
디버그 모드로 실행:
F5 키를 누르거나 디버그 뷰(Ctrl+Shift+D)에서 "Run Extension"을 선택합니다.
새로운 VS Code 창(Extension Development Host)이 열립니다.
3. 테스트 실행:
새 창에서 텍스트 파일을 열거나 생성합니다.
영어나 한글 텍스트를 입력합니다.
텍스트를 선택합니다.
오른쪽 클릭하여 컨텍스트 메뉴를 엽니다.
"영어 키보드 입력을 한글로" 또는 "한글 키보드 입력을 영어로" 옵션을 선택합니다.
선택한 텍스트가 변환되는지 확인합니다.
4. 디버깅:
문제가 발생하면 원래의 VS Code 창으로 돌아가 디버그 콘솔을 확인합니다.
필요한 경우 중단점을 설정하여 코드를 단계별로 실행할 수 있습니다.
5. 로그 확인:
'Output' 패널(Ctrl+Shift+U)에서 'Extension Development Host' 채널을 선택하여 로그를 확인할 수 있습니다.
6. 변경 사항 적용:
코드를 수정한 후에는 디버그 세션을 다시 시작해야 합니다.
디버그 창을 닫고 F5를 다시 눌러 새로운 Extension Development Host를 시작합니다.
7. 패키징 및 설치 테스트 (선택사항):
확장 기능이 제대로 작동하면 vsce package 명령으로 VSIX 파일을 생성할 수 있습니다.
생성된 VSIX 파일을 일반 VS Code에 설치하여 실제 환경에서 테스트할 수 있습니다.
