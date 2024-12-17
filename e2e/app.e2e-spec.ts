// e2e/app.e2e-spec.ts
import { browser, by, element } from 'protractor';

describe('Angular Standalone Component', () => {
  it('should display the app title', async () => {
    await browser.get('/');
    const title = await element(by.css('app-root h1')).getText();
    expect(title).toEqual('My Angular App');
  });
});