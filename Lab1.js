const assert = require('assert');
const { Builder, Browser, By} = require('selenium-webdriver');

let driver = new Builder().forBrowser(Browser.CHROME).build();

let total = 5, //кол-во элементов в списке
    remaining = 5; //кол-во оставшихся элементов

async function lambdaTest() {
    try {
        //открываем страницу
        await driver.get("https://lambdatest.github.io/sample-todo-app/");

        //развернем на весь экран
        await driver.manage().window().maximize();

        await driver.sleep(2000);

        //найдем заголовок над ul
        let header = await driver.findElement(By.className("ng-binding"));
        let headerText = await header.getText();

        //проверим заголовок над unmarked list (ШАГ 2 из задания)
        assert.equal(headerText, "5 of 5 remaining");



        //подождем секунду
        await driver.sleep(1000);


        //будем перебирать элементы ul от 1 до total
        for (let i = 1; i <= total; i++) {

            //получим заголовок над ul
            let remainingElem = driver.findElement(By.xpath("//span[@class='ng-binding']"));
            let text = await remainingElem.getText();

            //проверим количество неотмеченных элементов списка
            let expectedText = `${remaining} of ${total} remaining`;
            assert.equal(text, expectedText);

            let item = await driver.findElement(By.xpath(`//input[@name='li${i}']/following-sibling::span`));

            let itemClass = await item.getAttribute("class");
            assert.equal(itemClass, "done-false");

            await driver.findElement(By.name("li" + i)).click();
            remaining--;

            await driver.sleep(1000);

            itemClass = await item.getAttribute("class");
            assert.equal(itemClass, "done-true");
        } 

        //Вводим в поле для ввода какое то новое значение
        await driver.findElement(By.id("sampletodotext")).sendKeys("Some new cool value");
        await driver.sleep(1000);

        //жмем кнопку "добавить"
        await driver.findElement(By.id("addbutton")).click();

        //находим новый элемент
        let item = await driver.findElement(By.xpath("//input[@name='li6']/following-sibling::span"));
        let itemText = await item.getText();
        let itemClass = await item.getAttribute("class");

        //проверяем значение, которое мы ввели и состояние элемента списка
        assert.equal(itemText, "Some new cool value");
        assert.equal(itemClass, "done-false");

        await driver.sleep(1000);

        //отметим галочку нашего нового элемента списка
        await driver.findElement(By.name("li6")).click();

        //проверим, что наш новый элемент зачеркнулся
        itemClass = await item.getAttribute("class");
        assert.equal(itemClass, "done-true");

        await driver.sleep(3000);

    } catch(err) {

        driver.takeScreenshot().then(function (image) {
            require("fs").writeFileSync('screenshot.jpg', image, 'base64')
        })

        console.error("Тест упал по причине %s", err);
    } finally {
        await driver.quit();
    }
}

lambdaTest();
