# Rota Reporter — Türkçe Kullanım Kılavuzu

## 1. Gereksinimler

- Node.js 22 veya 24 LTS ve npm.
- Testleri çalışan bir Playwright Test projesi.
- VS Code veya tercih ettiğiniz editör.

Terminalde sürümleri kontrol edin:

```bash
node --version
npm --version
npx playwright --version
```

Reporter 1.63.0 ile otomatik kontrol edildi. `peerDependencies` daha geniş aralık tanımlar; bu bütün sürümlerin doğrulandığı anlamına gelmez.

## 2. Kurulum paketini hazırlayın

GitHub reposunda **Code → Download ZIP** seçin ve ZIP'i çıkarın. Kaynakta `package.json` bulunan klasörü VS Code'da açın. Terminalde:

```bash
npm ci
npm pack
```

`rota-playwright-reporter-0.1.0.tgz` dosyası oluşur. Bu dosyayı kendi Playwright test projenizin `package.json` dosyasının yanına kopyalayın.

> Kaynak proje ile test projeniz iki ayrı klasördür. İlk iki komut kaynakta, sonraki kurulum komutu kendi test projenizde çalışır.

## 3. Test projenize ekleyin

Kendi test projenizin terminalinde:

```bash
npm install -D ./rota-playwright-reporter-0.1.0.tgz
```

```text
playwright-projeniz/
  tests/
  package.json
  playwright.config.ts
  rota-playwright-reporter-0.1.0.tgz
```

## 4. Playwright config'i düzenleyin

Mevcut `reporter: 'html'` satırını şu alanla değiştirin:

```ts
reporter: [
  ['list'],
  ['rota-playwright-reporter', {
    outputFolder: 'rota-report',
    title: 'Test Otomasyon Raporum',
  }],
],
```

Mevcut `use` alanına aşağıdaki seçenekleri ekleyin. `use` içinde zaten `trace` varsa ikinci kez eklemeyin, değerini değiştirin.

```ts
trace: 'retain-on-failure',
screenshot: 'only-on-failure',
video: 'retain-on-failure',
```

`baseURL`, `headless`, tarayıcı projeleri ve diğer ayarları koruyun. İsterseniz yerleşik HTML raporunu da aynı reporter listesine `['html', { open: 'never' }]` olarak ekleyebilirsiniz.

## 5. Testleri çalıştırın

Tüm testler:

```bash
npx playwright test
```

Tek dosya:

```bash
npx playwright test tests/service.spec.ts
```

Tek tarayıcı projesi:

```bash
npx playwright test tests/service.spec.ts --project=chromium
```

`chromium` adı config'inizdeki proje adıyla eşleşmelidir. `--reporter=html` verirseniz config'deki reporter listesini değiştirirsiniz; Rota raporu için bu seçeneği kullanmayın.

## 6. Raporu açın

Test bitince ayrı bir komut olarak:

```bash
npx rota-report rota-report
```

Tarayıcıdan http://127.0.0.1:9324 adresini açın. Terminal açık kalmalıdır; sunucuyu durdurmak için `Ctrl + C`.

Başka port:

```bash
npx rota-report rota-report 9400
```

Adres: http://127.0.0.1:9400

`rota-report/index.html` dosyası doğrudan da açılabilir. Paylaşırken `assets` klasörünü birlikte gönderin.

## 7. Windows'ta test bitince otomatik açılma

Bu ilk sürümde `open` reporter seçeneği yoktur. Windows'ta npm'nin varsayılan `cmd.exe` ortamında aşağıdaki scriptler kullanılabilir. `package.json` içindeki **mevcut scripts nesnesinin içine** satırları ekleyin; ikinci bir `scripts` nesnesi oluşturmayın.

```json
"scripts": {
  "test": "playwright test",
  "test:service": "playwright test tests/service.spec.ts & npm run report:open",
  "report:open": "start \"\" \"http://127.0.0.1:9324\" && rota-report rota-report"
}
```

```bash
npm run test:service
```

Tek `&`, test başarısız olsa da rapor komutunu çalıştırır. Bu birleşik komut CI için uygun değildir; CI'da doğrudan Playwright kullanarak testin çıkış kodunu koruyun. PowerShell terminalinde `npm run` kullanabilirsiniz; Windows npm varsayılan script shell'i cmd'dir. Özel script-shell yapılandırdıysanız ayrı test ve rapor komutlarını tercih edin.

Tarayıcı sunucudan önce açılırsa sayfayı yenileyin. Sonraki testten önce sunucuyu `Ctrl + C` ile kapatın. Başka dosya için `test:service` satırındaki yolu değiştirin. Bu sabit script'e `-- dosya` ekleyerek farklı dosya seçmeyin.

## 8. Rapor alanları

| Alan | Anlamı |
| --- | --- |
| Senaryo | Dosya, kaynak konumu ve başlık üzerinden projeler arasında gruplanan test |
| Çalıştırma | Playwright TestCase sayısı; proje ve repeatEach dahil, retry hariç |
| Başarısız | Beklenmeyen test sonuçları |
| Toplam süre | Test koşumunun duvar saati süresi |
| Retry ile geçti | İlk denemede hata verip sonraki denemede geçen test |
| Adımlar | Playwright adımları ve `test.step` başlıkları |
| Hata Detayı | Seçilen denemenin hata mesajı, kod kesiti ve stack'i |
| Ekler | Seçilen denemede kaydedilen dosyalar |
| Loglar | Test stdout ve stderr çıktıları |

Beklenen başarısızlık (`test.fail`) başarılı kategoriye girebilir; detay paneli bunu belirtir. Paralel test sürelerinin toplamı koşum süresine eşit olmak zorunda değildir.

## 9. Anlaşılır adım isimleri

```ts
import { test, expect } from '@playwright/test';

test('Servisler Sayfası', async ({ page }) => {
  await test.step('Servisler sayfası açılır', async () => {
    await page.goto('https://siteniz.com/servisler');
  });
  await test.step('Başlık doğrulanır', async () => {
    await expect(page.getByRole('heading', { name: 'Servisler' })).toBeVisible();
  });
});
```

Adresi ve başlık metnini uygulamanıza göre değiştirin.

## 10. Trace inceleme

Raporda trace ekini indirin, ardından dosyanın yoluyla:

```bash
npx playwright show-trace "C:\Users\Kullanici\Downloads\trace.zip"
```

Trace viewer reporter içinde gömülü değildir.

## 11. Dosyalar nerede saklanır?

`outputFolder: 'rota-report'` ise çıktılar test komutunu başlattığınız çalışma klasörünün altındadır:

```text
rota-report/
  index.html
  report.json
  assets/
```

Yeni koşum raporu günceller; eski koşum geçmişi saklanmaz. Eski ekler otomatik temizlenmez. Testler bittiğinde ayrılmış rapor klasörünü elle temizleyebilirsiniz. Kaynak kontrolüne `rota-report/` ve `test-results/` eklemeyin.

## 12. Sık karşılaşılan sorunlar

| Belirti | Çözüm |
| --- | --- |
| Cannot find module rota-playwright-reporter | Kurulumu kendi test projenizde yapın; `npm ls rota-playwright-reporter` kontrol edin |
| package.json Expected string / JSON hatası | Script değerleri string olmalı; scripts içinde ikinci scripts nesnesi bulunmamalı; virgülleri kontrol edin |
| EADDRINUSE | Önceki sunucuyu kapatın veya 9400 gibi başka port seçin |
| Tarayıcı bağlantı hatası | Terminalde sunucunun çalıştığını kontrol edin ve sayfayı yenileyin |
| Video/screenshot yok | `use` kayıt ayarlarını kontrol edin; kayıt oluşmamış veya test tarayıcı açmamış olabilir |
| Eski rapor görünüyor | Son testin doğru klasörde çalıştığını kontrol edin ve tarayıcıyı yenileyin |
| Üç failed görünüyor | Üç projede test başarısız olmuş olabilir; her projenin hata detayını ayrı inceleyin |
| Tarayıcı executable bulunamadı | Test projenizde `npx playwright install` çalıştırın |

Rapor oluşturulurken hata olursa terminalde `Rota reporter raporu oluşturamadı` mesajı görünür. Rapor dosyalarındaki hassas bilgileri paylaşmadan önce inceleyin.
