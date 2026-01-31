import { router } from './router.js';
import { i18n } from './core/i18n.js';
import Navbar from './components/Navbar.js';
import Footer from './components/Footer.js';
import FloatingActions from './components/FloatingActions.js';

const init = async () => {
    // 1. Dili yükle
    await i18n.init();

    // 2. Header'ı oluştur ve bas
    document.getElementById('main-header').innerHTML = await Navbar.render();
    await Navbar.afterRender(); // Event listenerları bağla

    const footerContainer = document.getElementById('footer-container');
    if (footerContainer) {
        footerContainer.innerHTML = await Footer.render();
        await Footer.afterRender();
    }

    // 3. Floating Actions (YENİ EKLENEN KISIM)
    // Bunu direkt body'ye append edebiliriz, container'a gerek yok.
    const fabWrapper = document.createElement('div');
    fabWrapper.innerHTML = FloatingActions.render();
    document.body.appendChild(fabWrapper);

    // 4. Router'ı başlat (Sayfa içeriğini yükle)
    router();
    
    // Link tıklamalarını yakala (Sayfa yenilenmesini engelle - SPA Mantığı)
    window.addEventListener('popstate', router);
};

window.addEventListener('load', init);