/* js/router.js */
import Home from './views/Home.js';
import About from './views/About.js';
import Contact from './views/Contact.js';
// İleride About, Contact importları buraya gelecek
import { i18n } from './core/i18n.js';

const routes = {
    '/': Home,
    '/index.html': Home, // Bazen sunucular buraya atabilir
    '/about': About,
    '/contact': Contact
};

export const router = async () => {
    const app = document.getElementById('app');
    
    // 1. Rotayı Belirle
    let request = window.location.pathname;
    
    // Sondaki slash'ı temizle ( /about/ -> /about )
    if (request.length > 1 && request.endsWith('/')) {
        request = request.slice(0, -1);
    }

    // Rotayı bul veya Home'a (veya 404 sayfasına) yönlendir
    const view = routes[request] || Home;

    try {
        // 2. Sayfayı Render Et
        // Önce loading gösterebiliriz: app.innerHTML = '<div class="loader"></div>';
        app.innerHTML = await view.render();

        // 3. Dil Çevirilerini Uygula
        // Sayfa HTML'i oluştuktan hemen sonra, JS eventlerinden önce
        i18n.updateDOM();

        // 4. Sayfa Scriptlerini (Slider, Map, vb.) Çalıştır
        if (view.afterRender) await view.afterRender();

        // 5. Sayfa başına (Scroll to top) at
        window.scrollTo(0, 0);

    } catch (error) {
        console.error("Sayfa yüklenirken hata:", error);
        app.innerHTML = '<h2>Bir hata oluştu. Lütfen sayfayı yenileyin.</h2>';
    }
};