/* js/components/HomeHero.js */
const HomeHero = {
    // Props (Ayarlar) alacak şekilde güncelledik
    render: (props = {}) => {
        // Random Görsel Mantığı (Her sayfa için çalışır)
        const totalImages = 20; 
        const randomIndex = Math.floor(Math.random() * totalImages) + 1;
        const heroImage = `assets/images/hero/hero-${randomIndex}.jpg`; 

        // Varsayılan Değerler (Eğer parametre gelmezse Anasayfa textleri çalışsın)
        const titleKey = props.titleKey || 'hero.title';
        const subtitleKey = props.subtitleKey || 'hero.subtitle';
        // Buton linki ve texti de dinamik olabilir, yoksa gizleyelim mi? 
        // Şimdilik varsayılan CTA kalsın.
        const ctaKey = props.ctaKey || 'hero.cta';
        const ctaLink = props.ctaLink || '/shop';

        return `
            <section class="hero-section">
                <div class="hero-bg">
                    <img src="${heroImage}" alt="Luxury Furniture" class="hero-img">
                    <div class="overlay"></div>
                </div>

                <div class="container hero-content">
                    <h1 class="fade-up" data-i18n="${titleKey}"></h1>
                    <p class="fade-up delay-1" data-i18n="${subtitleKey}"></p>
                    
                    <a href="${ctaLink}" class="btn-primary fade-up delay-2" data-i18n="${ctaKey}"></a>
                </div>

                <div class="scroll-indicator">
                    <span data-i18n="hero.scroll"></span>
                    <div class="line"></div>
                </div>
            </section>
        `;
    },
    afterRender: () => {
        // Gerekirse buraya kod eklenir
    }
};

export default HomeHero;