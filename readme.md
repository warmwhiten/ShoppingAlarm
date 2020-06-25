## 프로젝트 설명

AWS Node.js 서버를 기반(node express사용)으로 한 React-Native 모바일 앱이다. 품절 사태가 4개월 째 계속되고 있는 닌텐도 스위치의 구매정보를 크롤링을 이용하여 빠르게 얻기 위해 위해 본 앱을 제작하게 되었다. 데이터베이스는 MongoDB를 사용하였고, MongoDB에서 제공하는 Atlas(클라우드)서비스를 이용하였다. (nodejs의 mongoose 이용) 크롤링의 경우 Nodejs의 puppeteer를 사용했다. 이는 페이지가 전부 render 된 후에 크롤링이 진행되어야 원하는 데이터를 얻을 수 있는 경우가 많았기 때문이다. 앱에서 로그인 기능을 구현하였는데, 비밀번호 암호화는 Bycrypt를 이용하였고 로그인 유지는 jsonwebtoken을 이용, 서버와의 통신은 axios를 이용하여 rest api를 사용하였다.

## 설치방법

1) 안드로이드 기기에 직접 설치하는 경우
/android/app/build/outputs/apk/debug/app-debug.apk 파일을 안드로이드 기기에 직접 설치할 수 있다. 

2) 컴퓨터에서 실행하는 경우
컴퓨터에서 실행하는 경우 안드로이드 스튜디오의 AVD (sdk version 28) 를 준비하고(환경 변수 등 설정을 마쳐야한다. 참고 : https://gritkim.tistory.com/5),  client 폴더에서 npm install, react-native run-android 명령을 통해 AVD에 앱을 설치하여 실행한다.

3) ios의 경우
X-code 설치가 불가능해 로컬에서 ios 환경을 테스트하지 못했다. 안드로이드로 진행하는 것을 추천한다.

## 사용방법
앱을 실행하여 join버튼을 눌러 가입을 진행하고, login을 해 home에 진입한다. home에서는 입고 정보를 순차적으로 확인할 수 있다. settings의 logout을 통해 로그아웃이 가능하다.



## License
MIT License

Copyright (c) [year] [fullname]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```