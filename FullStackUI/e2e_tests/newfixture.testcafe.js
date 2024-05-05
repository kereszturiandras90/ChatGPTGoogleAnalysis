import { Selector } from 'testcafe';

fixture `newFixture`
    .page `http://localhost:4200/translations/add`;

test('SwapButton_cached', async t => {
    await t
        .click('#sourceLanguage')
        .click(Selector('#sourceLanguage option').withText('English'))
        .click('#targetLanguage')
        .click(Selector('#targetLanguage option').withText('German'))
        .click('#swapButton [class^="mat-icon notranslate material-icons mat-ligature-f"]')
        .expect(Selector('#sourceLanguage').value).eql("4: de")
        .expect(Selector('#targetLanguage').value).eql("3: en");
});

test('SwapButton_non_cached', async t => {
    await t
        .click('#sourceLanguage')
        .click(Selector('#sourceLanguage option').withText('Belarusian'))
        .click('#targetLanguage')
        .click(Selector('#targetLanguage option').withText('Arabic'))
        .click('#swapButton [class^="mat-icon notranslate material-icons mat-ligature-f"]')
        .expect(Selector('#sourceLanguage').value).eql("11: ar")
        .expect(Selector('#targetLanguage').value).eql("15: be");
});

test('Swap_cacheds_non_cached', async t => {
    await t
        .click('#sourceLanguage')
        .wait(10000)
        .expect(Selector('#sourceLanguage').child(2).value).eql("3: en")
        .expect(Selector('#sourceLanguage').child(3).value).eql("4: de")
        .expect(Selector('#sourceLanguage').child(4).value).eql("5: es")
        .expect(Selector('#sourceLanguage').child(5).value).eql("6: cn")
        .expect(Selector('#sourceLanguage').child(6).value).eql("7: it")
        .click(Selector('#sourceLanguage option').withText('Spanish'))
        .click('#targetLanguage')
        .click(Selector('#targetLanguage option').withText('Azerbaijani'))
        .click('#swapButton')
        .expect(Selector('#sourceLanguage').value).eql("13: az")
        .expect(Selector('#targetLanguage').value).eql("5: es")
        .click('#targetLanguage')
        .expect(Selector('#targetLanguage').child(2).value).eql("3: az");
});

test('Automatic_language_detection', async t => {
    await t
        .click('#automaticDetection')
        .typeText('#inputText', 'szeretlek')
        .click('#targetLanguage')
        .expect(Selector('#sourceLanguage').value).eql("44: hu");
});

test('Automatic_language_detection_2', async t => {
    await t
        .typeText('#inputText', 'szeretlek')
        .click('#automaticDetection')
        .expect(Selector('#sourceLanguage').value).eql("44: hu");
});

test('Automatic_language_detection_off', async t => {
    await t
        .click(Selector('label').withText('Automatic Language Detection'))
        .click('#sourceLanguage')
        .click(Selector('#sourceLanguage option').withText('German'))
        .typeText('#inputText', 'Ich liebe dich')
        .click('#targetLanguage')
        .click(Selector('#targetLanguage option').withText('English'))
        .click('#automaticDetection')
        .expect(Selector('#sourceLanguage').value).eql("4: de");
});

test('BackTranslation_On', async t => {
    await t
        .click('#backTranslation')
        .click('#sourceLanguage')
        .click(Selector('#sourceLanguage option').withText('English'))
        .click('#targetLanguage')
        .click(Selector('#targetLanguage option').withText('Hungarian'))
        .click(Selector('button').withText('Translate'))
        .typeText('#inputText', 'The duck likes swimming in the water.')
        .typeText('#referenceTranslation', 'A kacsa szeret úszni a vízben.')
        .click(Selector('button').withText('Translate'))
        .wait(20000)
        .expect(Selector('#googleBackTranslation').visible).eql(true)
        .expect(Selector('#gptBackTranslation').visible).eql(true)
        .expect(Selector('#GoogleBleu').visible).eql(true)
        .expect(Selector('#GptBleu').visible).eql(true);
});

test('Back_Translation_off', async t => {
    await t
        .click('#sourceLanguage')
        .click(Selector('#sourceLanguage option').withText('English'))
        .click('#targetLanguage')
        .click(Selector('#targetLanguage option').withText('Hungarian'))
        .click(Selector('button').withText('Translate'))
        .typeText('#inputText', 'The duck likes swimming in the water.')
        .typeText('#referenceTranslation', 'A kacsa szeret úszni a vízben.')
        .click(Selector('button').withText('Translate'))
        .wait(20000)
        .expect(Selector('#googleBackTranslation').visible).eql(false)
        .expect(Selector('#gptBackTranslation').visible).eql(false);
});

test('Add_Rating', async t => {
    await t
        .click('#mat-expansion-panel-header-0 [class^="mat-expansion-panel-header-description ng-tns-c262"]')
        .click('#sourceLanguage')
        .click(Selector('#sourceLanguage option').withText('English'))
        .click('#targetLanguage')
        .click(Selector('#targetLanguage option').withText('Hungarian'))
        .typeText('#inputText', 'I love you.')
        .click(Selector('button').withText('Translate'))
        .click('#mat-expansion-panel-header-0 [class^="mat-expansion-panel-header-description ng-tns-c262"]')
        .expect(Selector('#feedbackGoogle').visible).eql(true)
        .expect(Selector('#feedbackGpt').visible).eql(true)
        .typeText('#feedbackGoogle', 'ok')
        .typeText('#feedbackGpt', 'ok')
        .click('#cdk-accordion-child-0 [class^="mat-icon notranslate material-icons mat-ligature-f"]')
        .click(Selector('#cdk-accordion-child-0 [class^="mat-icon notranslate padding-5 material-icons mat-"]').nth(1))
        .typeText('#feedback', 'super')
        .click('#mat-mdc-chip-0')
        .click('#mat-mdc-chip-4')
        .click('#mat-mdc-chip-3 [class^="mat-icon notranslate mat-mdc-chip-remove mat-mdc-c"]')
        .typeText('#mat-input-0', 'daily')
        .click(Selector('#cdk-accordion-child-0 [class^="mat-icon notranslate material-icons mat-ligature-f"]').nth(2))
        .click('#mat-mdc-chip-5')
        .click('#mat-expansion-panel-header-0 [class^="mat-expansion-panel-header-description ng-tns-c262"]')
        .wait(1000)
        .click('#mat-expansion-panel-header-0 [class^="mat-expansion-panel-header-description ng-tns-c262"]')
        .click(Selector('#cdk-accordion-child-0 button').withText('Add Rating'))
        .click(Selector('#navbarSupportedContent a').withText('Translations'))
        .expect(Selector('td').withText('I love you.').visible).eql(true);
});