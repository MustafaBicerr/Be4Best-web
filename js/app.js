/* js/app.js */
import { router } from './router.js';
import { i18n } from './core/i18n.js';
import Navbar from './components/Navbar.js';
import Footer from './components/Footer.js';
import FloatingActions from './components/FloatingActions.js';

// Layout Bileşenlerini Tanımla (Hedef ID ve Bileşen Eşleşmesi)
const layoutComponents = [
    { id: 'main-header', component: Navbar },
    { id: 'footer-container', component: Footer },
    { id: 'floating-actions-container', component: FloatingActions, isDynamic: true } 
    // isDynamic: HTML'de yeri yoksa (Floating gibi), body'ye biz ekleriz.
];

const renderLayout = async () => {
    for (const item of layoutComponents) {
        let container = document.getElementById(item.id);
        
        // Eğer container yoksa ve dinamikse (FAB gibi), oluştur ve body'ye ekle
        if (!container && item.isDynamic) {
            container = document.createElement('div');
            container.id = item.id;
            document.body.appendChild(container);
        }

        // Eğer container varsa (veya oluşturulduysa) render et
        if (container) {
            container.innerHTML = item.component.render ? await item.component.render() : '';
            if (item.component.afterRender) await item.component.afterRender();
        }
    }
};

const init = async () => {
    try {
        // 1. Dili Yükle (En kritik adım)
        await i18n.init();

        // 2. Sabit Layout'u (Header, Footer, FAB) Oluştur
        await renderLayout();

        // 3. Router'ı Başlat (Sayfa İçeriği)
        router();

        // 4. SPA Link Yönetimi (Sayfa yenilenmesini engelle)
        window.addEventListener('popstate', router);
        
    } catch (error) {
        console.error("Uygulama başlatılırken hata oluştu:", error);
    }
};

window.addEventListener('load', init);