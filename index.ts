require('chromedriver');
import {By, Key, until} from  'selenium-webdriver';
import * as webdriver from 'selenium-webdriver';

import {COOKIES, COUPONS, LOGIN_WIX, PASSWORD_WIX, PRICE} from "./config";

// const couponType = process.argv[2];
// if(!couponType){
//     console.log('need coupon type');
//     process.exit(1);
// }

(async function example() {

    const driver = new webdriver.Builder().forBrowser('chrome').build();

    async function login(){
        await driver.get('http://www.wix.com');
        await driver.findElement(By.id('wm-signin-link')).click();
        await driver.wait(until.urlContains('user'), 5000);
        await driver.findElement(By.id('input_0')).sendKeys(LOGIN_WIX, Key.RETURN);
        await driver.findElement(By.id('input_1')).sendKeys(PASSWORD_WIX, Key.RETURN);
        await driver.findElement(By.css('.login-btn')).click();
        console.log('Human: you need to resolve captcha and click Sign in!');
        await driver.wait(until.urlContains('dashboard'), 600000);
        let COOKIES = await driver.manage().getCookies();
        console.log('Hooray! Keep yours cookies for next time: ',COOKIES);
        //TODO save in file ourselves, and add a failback on reconnect which use this login function and go back to reconnect
    }

    async function reconnect(){
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
    }

    let done = false;

    while(!done) {
        try {

            //no longer need if we have the cookies
            //for displaying the cookies we need to use it on the 1st time only
            //await login();

            await reconnect();

            //We finally entered to the console!

            for(let COUPON_KEY of COUPONS){

                console.log(COUPON_KEY);

                await driver.wait(until.elementIsVisible(driver.findElement(By.className("wix-style-svg-font-icons-plus"))));
                await driver.sleep(100);
                await driver.findElement(By.className("wix-style-svg-font-icons-plus")).click();
                await driver.wait(until.elementIsVisible(driver.findElement(By.id("couponCode"))));
                await driver.findElement(By.id("couponCode")).click();
                await driver.findElement(By.id("couponCode")).clear();
                await driver.findElement(By.id("couponCode")).sendKeys(COUPON_KEY);
                await driver.sleep(100);
                await driver.findElement(By.id("couponName")).click();
                await driver.findElement(By.id("couponName")).clear();
                await driver.findElement(By.id("couponName")).sendKeys(COUPON_KEY);
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

            done = true;

        } catch(e) {
            console.log(e)
        } finally {
            //to close the window on
            //await driver.quit();
        }
    }

  })();