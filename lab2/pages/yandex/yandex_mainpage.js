const { By } = require('selenium-webdriver');

class MainPage{
    constructor(driver) {
      this.driver = driver;
    }
    async open() { //открыть нужную страницу и развернуть на весь экран
        await this.driver.get('https://market.yandex.ru');
        await this.driver.manage().window().maximize();
    }
    async checkStartPage() {
        const size =await this.driver.findElements(By.className("_3lpeU _6tyDq _1ea6I _2Imo_")).then(found => !!found.length);;
        return size;
    }
    async clickCatalog() {
        await this.driver.findElement(By.xpath("//div[@data-zone-name='catalog']")).click();
        await this.driver.sleep(2000);
    }
    async hoverGaming() {
        const gamingLink = await this.driver.findElement(By.xpath("//a[@href='/catalog--geiming/41813350']"));
        const actions = this.driver.actions({ async: true });
        await actions.move({ origin: gamingLink }).perform();
        await this.driver.sleep(2000);
    }
    async clickGamingPhone(){
        await this.driver.sleep(1000);
        const actions = this.driver.actions({ async: true });
        const iframe = this.driver.findElement(By.xpath("/html/body/div[7]/div/div/div/div/div/div/div[2]/div/div/div/div[1]/div/div/div/div/div/div/div/div[3]/div[2]/ul/li[1]/div/a"));
        const hoverable = this.driver.findElement(By.xpath("/html/body/div[7]/div/div/div/div/div/div/div[2]/div/div/div/div[1]/div/div/div/div/div/div/div/div[2]/div[6]/div/div/a"));
        await actions.move({origin: hoverable}).perform();
        await actions.scroll(0, 0, 0, 0, iframe).perform();
        await this.driver.sleep(3000);
        await this.driver.findElement(By.xpath("/html/body/div[7]/div/div/div/div/div/div/div[2]/div/div/div/div[1]/div/div/div/div/div/div/div/div[3]/div[2]/ul/li[1]/div/a")).click();
    }
}
module.exports = MainPage;