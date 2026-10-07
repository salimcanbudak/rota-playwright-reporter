const { test, expect } = require('@playwright/test');
test('Servisler Sayfası', async ({}, info) => {
  await test.step('Servis verisi hazırlanır', async () => {
    await info.attach('response', { body: Buffer.from('{"services":[]}'), contentType: 'application/json' });
  });
  await test.step('Servis sayısı doğrulanır', async () => { expect(0, 'En az bir servis olmalı').toBeGreaterThan(0); });
});
test('Başarılı kontrol', async () => { await test.step('Değer kontrolü', async () => expect(2+2).toBe(4)); });
test('Retry ile geçen kontrol', async ({}, info) => { expect(info.retry).toBe(1); });
test('Beklenen hata', async () => { test.fail(); expect(false).toBe(true); });
test.skip('Atlanan kontrol', async () => {});
