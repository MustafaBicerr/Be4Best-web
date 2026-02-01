/* js/components/HomeBanner.js */
const HomeBanner = {
    render: () => {
        return `
            <section class="visual-break-banner" id="parallax-banner">
                <div class="banner-bg-wrapper">
                    <img src="assets/images/ui/banner-bg.jpg" class="banner-bg-img" alt="Luxury Living">
                </div>
                
                <div class="overlay"></div>
                
                <div class="container banner-content text-center">
                    <h2 class="reveal-text" data-i18n="pages.home_page.sections.banner1.title"></h2>
                    <p class="reveal-text delay-1" data-i18n="pages.home_page.sections.banner1.subtitle"></p>
                    <a href="/shop" class="btn-white reveal-text delay-2" data-i18n="pages.home_page.sections.banner1.btn"></a>
                </div>
            </section>
        `;
    },
    
    afterRender: () => {
        // --- PARALLAX ZOOM EFFECT ---
        const bannerSection = document.getElementById('parallax-banner');
        const bannerImg = document.querySelector('.banner-bg-img');

        if (bannerSection && bannerImg) {
            // Scroll eventini throttle (yavaşlatma) yapmadan basitçe ekliyoruz
            // Performans sorunu olursa buraya müdahale ederiz.
            window.addEventListener('scroll', () => {
                const rect = bannerSection.getBoundingClientRect();
                const windowHeight = window.innerHeight;

                if (rect.top < windowHeight && rect.bottom > 0) {
                    const scrollSpeed = 0.1;
                    const zoomSpeed = 0.00015;
                    const scrollOffset = window.scrollY - bannerSection.offsetTop;
                    
                    bannerImg.style.transform = `
                        translateY(${scrollOffset * scrollSpeed * 0.2}px) 
                        scale(${1 + Math.abs(scrollOffset) * zoomSpeed})
                    `;
                }
            });
        }
    }
};

export default HomeBanner;