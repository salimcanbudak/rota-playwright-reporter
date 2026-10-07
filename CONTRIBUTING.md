# Katkı rehberi

Hata bildirirken Node/Playwright sürümünüzü, işletim sisteminizi, tekrar üretme adımlarını ve beklenen davranışı ekleyin. Token ve kişisel veri içeren raporları paylaşmayın.

Geliştirme: `npm ci`, `npm test`. Ardından `npx playwright test -c examples/playwright.config.cjs` (bilerek hatalı örnekler nedeniyle exit 1 beklenir), `npm run test:ui`.

Değişiklikleri küçük pull request'lerle gönderin; etkilenen davranışı ve doğrulamayı açıklayın. Reporter test sonuçlarını başarılıya çevirmemeli, dosya adlarını ve HTML içeriğini güvenli işlemeli, retry sonuçlarını korumalıdır.

Tarayıcıyla görsel kontrol, sürüm matrisi, koşum geçmişi ve otomatik açılma davranışının platformlar arasında iyileştirilmesi katkı alanlarıdır. Büyük değişiklikler için önce issue açın.
