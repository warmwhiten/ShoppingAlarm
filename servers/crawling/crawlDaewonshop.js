const puppeteer = require('puppeteer');

var isSoldout = "품절";
var url = 'https://www.daewonshop.com/goods/goods_view.php?goodsNo=1000094791';
var item = new Object(); 
var jsonData;
async function getItem () {
    const browser = await puppeteer.launch({
        headless : false
      }
    );
    const page = await browser.newPage();

    await page.goto(url);
        let data = await page.$eval(
            ".soldout > em", element => {
                return element.textContent;
                console.log('실행');
            });
        if(data == "구매 불가") {
            isSoldout = "품절";
        }
        else{
            isSoldout = "입고";
        } 
    item.title = "대원샵";
    item.isSoldout = isSoldout;
    item.url = url;
    jsonData = JSON.stringify(item);
    await browser.close();
    return jsonData;
  };

  

  module.exports = {getItem}

