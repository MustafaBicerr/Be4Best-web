import Home from './views/Home.js';
import { i18n } from './core/i18n.js';

const routes = {
    '/': Home
};

export const router = async () => {
    const app = document.getElementById('app');
    const view = routes[window.location.pathname] || Home;
    
    // Sayfa HTML'ini bas
    app.innerHTML = await view.render();
    
    // Dil çevirilerini uygula
    i18n.updateDOM();
    
    // Sayfa yüklendikten sonra (afterRender) çalışacak scriptleri tetikle
    if (view.afterRender) await view.afterRender();
};