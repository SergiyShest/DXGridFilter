import { Selector } from 'testcafe';

fixture `FilterControls`
    .page `file:///C:/Users/%D0%A8%D0%B5%D1%81%D1%82%D0%B0%D0%BA%D0%BE%D0%B2/source/repos/DEV/DevExpressGridFilter/DXGridFilter/TestsFilterControls.html`;

test('AddFilesTest', async t => {
    await t
        .click(Selector('label').withText('Добавить файл'))
        .setFilesToUpload(Selector('#file'), [
         'C:\\Program Files (x86)\\Google\\Chrome\\Application\\79.0.3945.130\\chrome.dll',
         'C:\\Program Files (x86)\\Google\\Chrome\\Application\\79.0.3945.130\\chrome.dll.sig',
         'C:\\Program Files (x86)\\Google\\Chrome\\Application\\79.0.3945.130\\chrome.exe.sig'])
         .typeText(Selector('#messageArea'), 'жпа')
        .pressKey('ctrl+enter')
        .rightClick(Selector('span').withText('Превышен максимальный размер 10 Мбт.'))
        .click(Selector('#filesPlace'))
        .click(Selector('[alt="удалить файл"]'));
        
});