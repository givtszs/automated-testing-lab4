const { assert } = require("chai");
const { Builder, Browser, By } = require("selenium-webdriver");

describe('Task 1', () => {
    let driver;
    before(async () => {
        driver = await new Builder()
            .forBrowser(Browser.EDGE)
            .build();
    });

    after(async () => await driver.quit());

    it('math test', async () => {
        // open the page
        await driver.get('http://suninjuly.github.io/math.html');

        // get the value of x
        const x = await driver.findElement(By.id('input_value')).getText();
        console.log('Input value', x);
        assert.isNotNaN(x);

        // calculate the function
        const answer = Math.log(Math.abs(12 * Math.sin(x)));
        console.log('Answer', answer);
        assert.isNotNaN(answer);
        
        // Write the answer in the input field
        const answerField = await driver.findElement(By.id('answer'));
        await answerField.sendKeys(answer.toString());

        // verify the input is correct
        const answerFieldValue = await answerField.getAttribute('value');
        console.log('Input value', answerFieldValue);
        assert.equal(answerFieldValue, answer);

        // check the 'I'm the robot' checkbox
        const checkbox = await driver.findElement(By.id('robotCheckbox'));
        await checkbox.click();

        // verify the checkbox is checked
        const isCheckboxChecked = await checkbox.isSelected();
        console.log('Checkbox selected', isCheckboxChecked);
        assert.isTrue(isCheckboxChecked);

        // select the 'Robots rule!' radio button
        const radioButton = await driver.findElement(By.id('robotsRule'));
        await radioButton.click();

        // verify the radio button is selected
        const isRadioButtonSelected = await radioButton.isSelected();
        console.log('Radio button selected', isRadioButtonSelected);
        assert.isTrue(isRadioButtonSelected);

        // click the 'Sumbit' button
        const submitButton = await driver.findElement(By.className('btn-default'));
        await submitButton.click();

        const alertText = await driver.switchTo().alert().getText();
        console.log('Alert text', alertText);
        assert.include(alertText, 'Congrats, you\'ve passed the task!');
    });
});