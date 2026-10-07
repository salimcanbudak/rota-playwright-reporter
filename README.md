# Rota Playwright Reporter

Playwright Test için sade, Türkçe ve yerel çalışan HTML rapor eklentisi.

Senaryoları projeler arasında gruplar; test sonuçları, adımlar, retry denemeleri, hatalar ve ekleri tek ekranda gösterir. Rapor verilerini harici bir servise göndermez.

> İlk sürüm: v0.1.0. Bağımsız bir topluluk projesidir; Microsoft veya Playwright tarafından yayımlanmış resmî bir ürün değildir.

## Özellikler

- Senaryo sayısı ile proje bazındaki çalıştırma sayısını ayırır.
- Arama, sonuç ve proje filtreleri.
- İç içe test adımları ve süreleri.
- Retry denemelerini ayrı inceleme ve flaky sonuçlar.
- Beklenen başarısızlıkları (`test.fail`) doğru sınıflandırma.
- Hata mesajları, stdout/stderr ve genel koşum hataları.
- Ekran görüntüsü/video önizleme, trace dosyasını indirme.
- Süreye göre sıralama, açık/koyu tema, mobil uyumlu yerleşim.

## Hızlı kurulum

Node.js 22 veya 24 LTS ve mevcut bir Playwright Test projesi önerilir. Doğrulanan Playwright sürümü 1.63.0'dır; 1.62.1 kullanıcı kurulumu da denenmiştir fakat otomatik sürüm matrisi değildir.

Repo dosyalarını indirin. Kaynak klasöründe:

```bash
npm ci
npm pack
```

Oluşan `rota-playwright-reporter-0.1.0.tgz` dosyasını kendi test projenize kopyalayın. Test projenizin terminalinde:

```bash
npm install -D ./rota-playwright-reporter-0.1.0.tgz
```

`playwright.config.ts` içindeki `reporter` alanını değiştirin:

```ts
reporter: [
  ['list'],
  ['rota-playwright-reporter', {
    outputFolder: 'rota-report',
    title: 'Test Otomasyon Raporum',
  }],
],
```

Test çalıştırma ve raporu görüntüleme ayrı komutlardır:

```bash
npx playwright test tests/service.spec.ts
npx rota-report rota-report
```

Tarayıcı: http://127.0.0.1:9324

## Kılavuzlar

- [Adım adım Türkçe kullanım kılavuzu](docs/KULLANIM_KILAVUZU.md)
- [GitHub'a yükleme ve paylaşma](docs/GITHUB_YAYINLAMA.md)
- [Katkıda bulunma](CONTRIBUTING.md)
- [Yapılan doğrulamalar ve sınırlar](VALIDATION.md)

## Yerel demo

```bash
npm ci
npm run demo
node src/serve.cjs demo-report
```

Demo örnek hata verisi içerir. Veri dosyası HTML içine gömülüdür; `demo-report/index.html` doğrudan açılabilir.

## Geliştirme ve kontrol

```bash
npm test
npx playwright test -c examples/playwright.config.cjs
npm run test:ui
```

Entegrasyon örneğinde hatalar bilerek bulunur; Playwright komutunun çıkış kodu 1 olması beklenir. `test:ui` için önce entegrasyon raporu üretilmelidir. Bu testler tarayıcı çalıştırmaz; Node ve DOM kontrolleridir.

## Mevcut sınırlar

Canlı koşum ekranı, koşum geçmişi, bulut paylaşımı ve gömülü trace viewer yoktur. Ekler için kendi testlerinizde kayıt seçeneklerini açın. Assertion hata mesajları korunur; tüm assertion türleri için otomatik beklenen/gerçekleşen alanları üretilmez.

Her koşum `index.html` ve `report.json` dosyalarını günceller. Eski ekler otomatik silinmez. Aynı çıktı klasörüne eşzamanlı rapor yazmayın. Rapor paylaşırken `assets` dahil bütün rapor klasörünü paylaşın; test çıktılarında kişisel veri/token bulunabileceğini kontrol edin.

## Lisans

[MIT](LICENSE). Kod yeniden kullanılabilir ve geliştirilebilir. Paket npm registry'de henüz yayımlanmamıştır; kurulum yerel `.tgz` ile yapılır.

API referansları: [Reporter API](https://playwright.dev/docs/api/class-reporter), [Reporters](https://playwright.dev/docs/test-reporters).
