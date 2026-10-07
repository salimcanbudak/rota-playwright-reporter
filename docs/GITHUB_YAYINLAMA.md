# GitHub'a yükleme

## Web arayüzü ile

1. GitHub hesabınızda yeni repository oluşturun.
2. Önerilen ad: `rota-playwright-reporter`. Public seçerseniz herkes indirebilir.
3. Açıklama: `Türkçe arayüzlü, yerel çalışan Playwright Test HTML reporter.`
4. Bu pakette README, MIT lisansı ve gitignore zaten var; GitHub'da ayrıca oluşturmayın.
5. Boş repository sayfasında **uploading an existing file** veya **Add file → Upload files** seçin.
6. ZIP'i çıkarın. `rota-playwright-reporter` klasörünün **içeriğini** yükleyin; ZIP'i tek dosya olarak kaynak yerine yüklemeyin. Repo kökünde `package.json`, `README.md`, `src/`, `docs/` olmalı.
7. `.github/workflows/checks.yml` ve `.gitignore` dosyalarının da yüklendiğini kontrol edin. Web yükleyici gizli klasörleri almazsa aşağıdaki Git yöntemini kullanın.
8. Commit mesajı: `Initial release: Rota Playwright Reporter`.

## Git ile (önerilir)

GitHub'da boş repo oluşturduktan sonra kaynak klasörünün terminalinde:

```bash
git init
git add .
git commit -m "Initial release: Rota Playwright Reporter"
git branch -M main
git remote add origin https://github.com/KULLANICI_ADINIZ/rota-playwright-reporter.git
git push -u origin main
```

`KULLANICI_ADINIZ` değerini değiştirin. Git kimliğiniz ayarlı değilse Git kullanıcı adınızı/e-postanızı yapılandırın. GitHub kimlik doğrulamasını kendi bilgisayarınızda tamamlayın; token'ınızı kaynak dosyalara yazmayın.

## İndirilebilir release

1. Kaynakta `npm ci`, `npm test`, `npm pack` çalıştırın.
2. GitHub'da **Releases → Draft a new release** seçin.
3. Tag: `v0.1.0`; başlık: `Rota Playwright Reporter v0.1.0`.
4. `rota-playwright-reporter-0.1.0.tgz` dosyasını release eki olarak yükleyin.
5. Açıklamaya özellikler ve VALIDATION.md'deki sınırları ekleyin.
6. Release'i yayımlayın. LinkedIn'de repository ve release bağlantısını paylaşabilirsiniz.

Repo adı npm paketinin müsait olduğunu garanti etmez. npm yayını ayrıca hesap, isim müsaitliği ve sürüm kontrolleri gerektirir. Bu kılavuz npm registry yayını yapmaz.
