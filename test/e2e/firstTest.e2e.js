/* eslint-disable no-undef */
describe('Example', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should have landing screen', async () => {
    await expect(element(by.id('landing'))).toBeVisible();
  });

  it('should login', async () => {
    await element(by.id('login')).tap();
    await expect(element(by.id('home'))).toBeVisible();
  });

  it('should logout', async () => {
    await element(by.id('logout')).tap();
    await expect(element(by.id('landing'))).toBeVisible();
  });
});
