/* js/app.js */
import { router } from './router.js';
import { i18n } from './core/i18n.js';
import Navbar from './components/Navbar.js';
import Footer from './components/Footer.js';
import FloatingActions from './components/FloatingActions.js';

// Layout Bileşenlerini Tanımla
const layoutComponents = [
    { id: 'main-header', component: Navbar },
    { id: 'footer-container', component: Footer },
    { id: 'floating-actions-container', component: FloatingActions, isDynamic: true }
];

const renderLayout = async () => {
    for (const item of layoutComponents) {
        let container = document.getElementById(item.id);
        
        if (!container && item.isDynamic) {
            container = document.createElement('div');
            container.id = item.id;
            document.body.appendChild(container);
        }

        if (container) {
            container.innerHTML = item.component.render ? await item.component.render() : '';
            if (item.component.afterRender) await item.component.afterRender();
        }
    }
};

const init = async () => {
    try {
        // 1. Dili Yükle
        await i18n.init();

        // 2. Layout'u Oluştur
        await renderLayout();

        // 3. Router'ı Başlat (İlk yükleme)
        router();

        // 4. Tarayıcı Geri/İleri Tuşlarını Yakala
        window.addEventListener('popstate', router);

        // --- YENİ EKLENEN KISIM: DİL DEĞİŞİKLİĞİNİ DİNLE ---
        document.addEventListener('lang:change', async () => {
            // 1. Navbar ve Footer'ı yeni dille tekrar çiz
            await renderLayout();
            
            // 2. Mevcut sayfayı (Router) tekrar çalıştır
            router();
            
            // 3. Navbar'daki event listenerları (Menü aç/kapa) tekrar bağlamak gerekebilir
            // (Navbar.js içindeki render tekrar çalıştığı için)
        });
        
        // --- 5. GLOBAL LINK YAKALAYICI (SORUNU ÇÖZEN KISIM) ---
        // Sayfadaki tüm tıklamaları dinle
        // --- 5. GLOBAL LINK YAKALAYICI (ULTRA PRO VERSİYON) ---
        document.body.addEventListener('click', e => {
            // 1. Tıklanan elementin bir link (a tag) olup olmadığını bul
            // (İkon'a tıklasa bile en yakın a etiketini bulur)
            const link = e.target.closest('a');

            // Eğer link değilse veya href özelliği yoksa işlem yapma
            if (!link || !link.getAttribute('href')) return;

            const href = link.getAttribute('href');

            // --- F1 SEVİYESİ KONTROLLER --- //

            // 1. Eğer kullanıcı Ctrl, Shift, Alt veya Meta (Command) tuşuna basıyorsa
            // Müdahale etme, bırak tarayıcı yeni sekmede açsın.
            if (e.ctrlKey || e.shiftKey || e.altKey || e.metaKey) return;

            // 2. Eğer link dışarıya gidiyorsa (http/https) veya yeni sekme hedefliyorsa (_blank)
            // Müdahale etme.
            if (href.startsWith('http') || link.target === '_blank') return;

            // 3. Eğer sayfa içi çapa (anchor) ise (#)
            // Müdahale etme, bırak scroll yapsın.
            if (href.startsWith('#')) return;

            // --- SPA YÖNLENDİRMESİ --- //
            
            // Buraya geldiyse bu bir iç sayfadır (/about, /shop gibi)
            e.preventDefault(); // Sayfa yenilenmesini DURDUR.
            
            // URL'i güncelle
            history.pushState(null, null, href);
            
            // Router'ı çalıştır
            router();
        });

    } catch (error) {
        console.error("Uygulama başlatılırken hata oluştu:", error);
    }
};

window.addEventListener('load', init);