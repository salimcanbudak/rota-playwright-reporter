# Doğrulama — 7 Ekim 2026

- Node.js 24.19.0, Playwright Test 1.63.0.
- 2 Node test geçti: güvenli HTML veri gömme ve retry/ek/hata serileştirme.
- Gerçek Playwright Test runner ile 3 proje, 15 TestCase: 6 expected, 3 unexpected, 3 flaky, 3 skipped. Beklenen başarısızlık örnekleri expected kategorisinde. Bilerek hatalı testler nedeniyle runner exit code 1.
- jsdom ile arayüz çalıştırıldı: sayaçlar, sonuç filtresi, retry seçimi, hata paneli, süre tablosu, ek listesi, tema ve boş arama başarılı. Bu DOM kontrolüdür, görsel tarayıcı QA değildir.
- npm pack başarılı; oluşan tgz ayrı klasöre kuruldu ve reporter export'u çözümlendi.
- Tarayıcı ZIP indirmeleri bu ortamda bozuk/eksik döndüğünden gerçek tarayıcı ekran görüntüsü ve screenshot/video/trace üretimi uçtan uca doğrulanamadı. Dosya ve Buffer ekleri kopyalama testiyle doğrulandı.
- 1.50–1.62 peer sürümleri, shard merge ve büyük koşum yük testi henüz doğrulanmadı.
