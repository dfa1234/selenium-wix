import {COUPONS} from "./datas/eshop-bp";

require('chromedriver');
import {By, Key, until} from  'selenium-webdriver';
import * as webdriver from 'selenium-webdriver';
import {LOGIN_WIX, PASSWORD_WIX, PRICE} from "./config";
import {COOKIES} from "./datas/cookies";

(async function example() {
    const driver = new webdriver.Builder().forBrowser('chrome').build();

    while(true) {
        try {

            // await driver.get('http://www.wix.com');
            // await driver.findElement(By.id('wm-signin-link')).click();
            // await driver.wait(until.urlContains('user'), 5000);
            // await driver.findElement(By.id('input_0')).sendKeys(LOGIN_WIX, Key.RETURN);
            // await driver.findElement(By.id('input_1')).sendKeys(PASSWORD_WIX, Key.RETURN);
            // await driver.findElement(By.css('.login-btn')).click();
            // console.log('Human: you need to resolve captcha and click Sign in!');

            await driver.get('http://www.google.com');
            await driver.sleep(5000);
            for(let COOKIE of COOKIES){
                await driver.manage().addCookie(COOKIE);
            }
            await driver.get('http://www.wix.com/dashboard');

            await driver.wait(until.urlContains('dashboard'), 600000);
            await driver.sleep(5000);
            await driver.findElement(By.xpath("//div[@id='root']/div/div[2]/div[1]/div[1]/div/div/div/div/div/div[1]/div/div[2]/span[6]/a")).click();
            await driver.sleep(5000);


            //We finally entered to the console!

            for(let KEY of COUPONS){

                console.log(KEY);

                await driver.wait(until.elementIsVisible(driver.findElement(By.className("wix-style-svg-font-icons-plus"))));
                await driver.sleep(100);
                await driver.findElement(By.className("wix-style-svg-font-icons-plus")).click();
                await driver.wait(until.elementIsVisible(driver.findElement(By.id("couponCode"))));
                await driver.findElement(By.id("couponCode")).click();
                await driver.findElement(By.id("couponCode")).clear();
                await driver.findElement(By.id("couponCode")).sendKeys(KEY);
                await driver.sleep(100);
                await driver.findElement(By.id("couponName")).click();
                await driver.findElement(By.id("couponName")).clear();
                await driver.findElement(By.id("couponName")).sendKeys(KEY);
                await driver.sleep(100);
                await driver.findElement(By.id("couponDiscountValue")).click();
                await driver.findElement(By.id("couponDiscountValue")).clear();
                await driver.findElement(By.id("couponDiscountValue")).sendKeys(PRICE);
                await driver.sleep(100);
                await driver.findElement(By.className("selectize-input")).click();
                await driver.sleep(100);
                await driver.findElement(By.className("ui-select-search")).sendKeys(Key.RETURN);
                await driver.sleep(100);
                await driver.findElement(By.xpath("//button[@type='submit']")).click();
                await driver.sleep(1000);

            }


        } catch(e){
            console.log(e)
        }finally {
            //await driver.quit();
            //driver.manage().getCookies().then(
                //result => console.log(result)
            //);
        }
    }



  })();