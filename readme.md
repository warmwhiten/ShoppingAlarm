## About the Project
주요 쇼핑몰의 닌텐도 스위치 입고정보를 크롤링을 이용해 빠르게 제공하는 모바일 앱입니다.

## Build with
- Node.js
- ReactNative
- MongoDB Atlas
- mongoose
- node express
- puppeteer
- Bcrypt
- JWT
- Axios 
- cookie-parser
- body-parser
- node-cron

## Installation

**1) 안드로이드 기기에 직접 설치** 
```
/android/app/build/outputs/apk/debug/app-debug.apk 
```
해당 파일을 안드로이드 기기에 직접 설치하여 실행할 수 있습니다.

**2) 컴퓨터 가상 머신에서 실행**
<br>
컴퓨터에서 실행하는 경우 안드로이드 스튜디오의 AVD (sdk version 28) 를 준비하고(환경 변수 등 설정을 마쳐야합니다. (https://gritkim.tistory.com/5) <br>
```
git clone http://khuhub.khu.ac.kr/2018102162/OSSProject_ShoppingAlarm.git
```
```
cd client
npm install
react-native run-android
```

**3) ios** <br>
X-code 설치가 불가능해 로컬에서 ios 환경을 테스트하지 못했습니다. 안드로이드로 진행하는 것을 추천합니다.

## How to use

#### Sign up

![캡처2](/uploads/b25194a4bef420c740fc33be5f4b29f6/캡처2.PNG)
Join버튼을 눌러 회원가입 페이지로 이동하고, 사용할 아이디와 비밀번호를 입력한 뒤 다시 Join을 눌러 회원가입을 끝내주세요. 

#### Sign in

![캡처1](/uploads/22b075189a5c2400b8e4dcd9b05f694c/캡처1.PNG)
설정한 아이디와 비밀번호를 입력한 뒤 로그인하고, 홈 화면에서 입고 정보를 확인하세요. 





## License
MIT License

Copyright (c) 2020 DAHEE KIM

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
'''
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```