import { router } from './router.js';
import { i18n } from './core/i18n.js';
import Navbar from './components/Navbar.js';

const init = async () => {
    // 1. Dili yükle
    await i18n.init();

    // 2. Header'ı oluştur ve bas
    document.getElementById('main-header').innerHTML = await Navbar.render();
    await Navbar.afterRender(); // Event listenerları bağla

    // 3. Router'ı başlat (Sayfa içeriğini yükle)
    router();
    
    // Link tıklamalarını yakala (Sayfa yenilenmesini engelle - SPA Mantığı)
    window.addEventListener('popstate', router);
};

window.addEventListener('load', init);