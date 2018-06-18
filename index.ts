require('chromedriver');
import {By, Key, until} from  'selenium-webdriver';
import * as webdriver from 'selenium-webdriver';
import {LOGIN_WIX, PASSWORD_WIX, PRICE,COUPON_CODES} from "./config";

(async function example() {
    const driver = new webdriver.Builder().forBrowser('chrome').build();

    try {
        await driver.get('http://www.wix.com');
        await driver.findElement(By.id('wm-signin-link')).click();
        await driver.wait(until.urlContains('user'), 5000);
        await driver.findElement(By.id('input_0')).sendKeys(LOGIN_WIX, Key.RETURN);
        await driver.findElement(By.id('input_1')).sendKeys(PASSWORD_WIX, Key.RETURN);
        await driver.findElement(By.css('.login-btn')).click();

        console.log('Human: you need to resolve captcha and click Sign in!');

        await driver.wait(until.urlContains('dashboard'), 600000);
        await driver.sleep(5000);
        await driver.findElement(By.xpath("//div[@id='root']/div/div[2]/div[1]/div[1]/div/div/div/div/div/div[1]/div/div[2]/span[6]/a")).click();
        await driver.sleep(5000);

        //We finally entered to the console!

        for(let KEY of COUPON_CODES){
            console.log(KEY);
            await driver.findElement(By.xpath("//div[@id='root']/div/div[2]/div[2]/div[2]/div/div/div/div/store-manager/div/main/coupon-list/page-header/div/div[2]/div/header-actions/button/span")).click();
            await driver.sleep(1000);
            await driver.findElement(By.id("couponCode")).click();
            await driver.findElement(By.id("couponCode")).clear();
            await driver.findElement(By.id("couponCode")).sendKeys(KEY);
            await driver.findElement(By.id("couponName")).click();
            await driver.findElement(By.id("couponName")).clear();
            await driver.findElement(By.id("couponName")).sendKeys(KEY);
            await driver.findElement(By.xpath("//div[@id='root']/div/div[2]/div[2]/div[2]/div/div/div/div/store-manager/div/div[2]/div/coupon/form/section/div/div[2]/div/section/div[2]")).click();
            await driver.findElement(By.id("couponDiscountValue")).click();
            await driver.findElement(By.id("couponDiscountValue")).clear();
            await driver.findElement(By.id("couponDiscountValue")).sendKeys(PRICE);
            await driver.findElement(By.xpath("//div[@id='root']/div/div[2]/div[2]/div[2]/div/div/div/div/store-manager/div/div[2]/div/coupon/form/section/div/div[2]/div/section")).click();
            await driver.findElement(By.xpath("//div[@id='root']/div/div[2]/div[2]/div[2]/div/div/div/div/store-manager/div/div[2]/div/coupon/form/section/div/div[2]/div/section/div[3]/div/div/div")).click();
            await driver.findElement(By.xpath("//div[@id='root']/div/div[2]/div[2]/div[2]/div/div/div/div/store-manager/div/div[2]/div/coupon/form/section/div/div[2]/div/section/div[3]/div/div/div[2]/div/div/div[2]/div/div")).click();
            await driver.findElement(By.xpath("//div[@id='root']/div/div[2]/div[2]/div[2]/div/div/div/div/store-manager/div/div[2]/div/coupon/form/section/div/div[2]/div/section/div[3]")).click();
            await driver.findElement(By.xpath("//div[@id='root']/div/div[2]/div[2]/div[2]/div/div/div/div/store-manager/div/div[2]/div/coupon/form/section/div/div[2]/div/section/div[5]/div/toggleable-input/div/div/div/wix-input/div/input")).click();
            await driver.findElement(By.xpath("//div[@id='root']/div/div[2]/div[2]/div[2]/div/div/div/div/store-manager/div/div[2]/div/coupon/form/section/div/div[2]/div/section/div[5]/div/toggleable-input/div/div/div/wix-input/div/input")).clear();
            await driver.findElement(By.xpath("//div[@id='root']/div/div[2]/div[2]/div[2]/div/div/div/div/store-manager/div/div[2]/div/coupon/form/section/div/div[2]/div/section/div[5]/div/toggleable-input/div/div/div/wix-input/div/input")).sendKeys("1");
            await driver.findElement(By.xpath("//div[@id='root']/div/div[2]/div[2]/div[2]/div/div/div/div/store-manager/div/div[2]/div/coupon/form/section/div/div[2]/div/section/div[5]")).click();
            await driver.findElement(By.xpath("//button[@type='submit']")).click();
            await driver.sleep(2000);
        }


    } finally {
      //await driver.quit();
    }
  })();