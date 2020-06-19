const puppeteer = require('puppeteer');

var soldout = new Array();

(async () => {
    const browser = await puppeteer.launch({
        headless : false
      }
    );
    const page = await browser.newPage();

    await page.goto('http://www.tmon.co.kr/deal/810158162?keyword=%EB%8B%8C%ED%85%90%EB%8F%84+%EC%8A%A4%EC%9C%84%EC%B9%98&tl_area=SALDEAL&tl_ord=1&searchClick=DL%7CND%7CBM&thr=ts');

        let data = await page.$eval(
            ".purchase_selector > li.soldout", element => {
                return element.textContent;
            });
            console.log(data); 

        let test = await page.$eval(
            ".purchase_selector > li.soldout", element => {
                return element.textContent;
            });
            console.log(test); 
    
   
  
    await browser.close();
  })();

