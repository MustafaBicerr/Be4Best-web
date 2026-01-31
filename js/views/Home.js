/* js/views/Home.js */
import { initScrollReveal } from '../modules/scroll.js'; // En üste ekle
import { Api } from '../services/api.js';
import ProductCard from '../components/ProductCard.js';

const Home = {
    render: async () => {
        // --- RANDOM GÖRSEL MANTIĞI ---
        const totalImages = 20; // Klasörde kaç fotoğrafın varsa buraya yaz
        
        // 1 ile 20 arasında rastgele bir sayı tut
        const randomIndex = Math.floor(Math.random() * totalImages) + 1;
        
        // Dosya yolunu oluştur (Örn: assets/images/hero/hero-5.jpg)
        const heroImage = `assets/images/hero/hero-${randomIndex}.jpg`; 
        // -----------------------------

        // 1. TÜM VERİLERİ AYNI ANDA ÇEK (Parallel Fetching - Performans İçin)
        const [bestSellers, newArrivals, featured] = await Promise.all([
            Api.getBestSellers(),
            Api.getNewArrivals(),
            Api.getFeaturedProducts()
        ]);

        // 2. Yardımcı Fonksiyon: Ürün Listesini HTML'e Çevir
        const createGrid = (products) => {
            if (!products || products.length === 0) return '<p class="text-center">Ürün bulunamadı.</p>';
            return products.map(product => ProductCard(product)).join('');
        };
        return `
            <!-- Hero Section -->
            <section class="hero-section">
                <div class="hero-bg">
                    <img src="${heroImage}" alt="Luxury Furniture" class="hero-img">
                    <div class="overlay"></div>
                </div>

                <div class="container hero-content">
                    <h1 class="fade-up" data-i18n="hero.title"></h1>
                    <p class="fade-up delay-1" data-i18n="hero.subtitle"></p>
                    <a href="/shop" class="btn-primary fade-up delay-2" data-i18n="hero.cta"></a>
                </div>

                <div class="scroll-indicator">
                    <span data-i18n="hero.scroll"></span>
                    <div class="line"></div>
                </div>
            </section>

            <!-- About Section -->
            <section class="section-padding about-section">
                <div class="container">
                    <div class="row align-center">
                        
                        <div class="col col-lg-6">
                            <div class="about-img-wrapper reveal-image">
                                <div class="img-big">
                                    <img src="assets/images/ui/about-1.jpg" alt="Be4Best Interior">
                                </div>
                                <div class="img-small parallax-effect">
                                    <img src="assets/images/ui/about-2.jpg" alt="Detail">
                                </div>
                                <div class="img-shape"></div>
                            </div>
                        </div>

                        <div class="col col-lg-6">
                            <div class="about-content reveal-text">
                                <span class="sub-title" data-i18n="pages.home_page.sections.home_about.subtitle"></span>
                                <h2 class="section-title" data-i18n="pages.home_page.sections.home_about.title"></h2>
                                <p class="section-desc" data-i18n="pages.home_page.sections.home_about.desc"></p>

                                <div class="about-features">
                                    <div class="feature-item">
                                        <i class="ri-global-line"></i>
                                        <span data-i18n="pages.home_page.sections.home_about.feature_1"></span>
                                    </div>
                                    <div class="feature-item">
                                        <i class="ri-medal-line"></i>
                                        <span data-i18n="pages.home_page.sections.home_about.feature_2"></span>
                                    </div>
                                    <div class="feature-item">
                                        <i class="ri-pantone-line"></i>
                                        <span data-i18n="pages.home_page.sections.home_about.feature_3"></span>
                                    </div>
                                </div>

                                <a href="/about" class="btn-link">
                                    <span data-i18n="pages.home_page.sections.home_about.btn"></span>
                                    <i class="ri-arrow-right-line"></i>
                                </a>
                            </div>
                        </div>

                    </div>
                </div>
            </section>



            <!-- Best Sellers Section -->
            <section class="section-padding">
                <div class="container">
                    <div class="section-header text-center mb-5 fade-up">
                        <span class="sub-title" data-i18n="pages.home_page.sections.best_sellers.subtitle"></span>
                        <h2 class="section-title" data-i18n="pages.home_page.sections.best_sellers.title"></h2>
                    </div>
                    <div class="product-grid">
                        ${createGrid(bestSellers)}
                    </div>
                </div>
            </section>

            <!-- Banner Section-->
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

            <!-- New Arrivals Section-->
            <section class="section-padding">
                <div class="container">
                    <div class="section-header text-center mb-5 fade-up">
                        <span class="sub-title" data-i18n="pages.home_page.sections.new_arrivals.subtitle"></span>
                        <h2 class="section-title" data-i18n="pages.home_page.sections.new_arrivals.title"></h2>
                    </div>
                    <div class="product-grid">
                        ${createGrid(newArrivals)}
                    </div>
                </div>
            </section>

            <!-- Featured Products -->
            <section class="section-padding bg-light"> <div class="container">
                    <div class="section-header text-center mb-5 fade-up">
                        <span class="sub-title" data-i18n="pages.home_page.sections.featured_products.subtitle"></span>
                        <h2 class="section-title" data-i18n="pages.home_page.sections.featured_products.title"></h2>
                    </div>
                    <div class="product-grid">
                        ${createGrid(featured)}
                    </div>
                </div>
            </section>
        `;
    },
    afterRender: async () => {
        // İleride buraya başka animasyonlar ekleyeceğiz
        // SCROLL REVEAL BAŞLAT
        initScrollReveal();

        // --- PARALLAX ZOOM EFFECT ---
const bannerSection = document.getElementById('parallax-banner');
const bannerImg = document.querySelector('.banner-bg-img');

if (bannerSection && bannerImg) {
    window.addEventListener('scroll', () => {
        // Banner ekranda görünüyor mu kontrolü (Performans için)
        const rect = bannerSection.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Eğer banner ekranın içindeyse veya yakınındaysa hesapla
        if (rect.top < windowHeight && rect.bottom > 0) {
            
            // Scroll miktarına göre bir katsayı üret
            // Banner yukarı çıktıkça resim yavaşça aşağı kayar ve büyür
            const scrollSpeed = 0.1; // Resmin kayma hızı (0.5 = yarım hız)
            const zoomSpeed = 0.00015; // Zoom hızı
            
            // Banner'ın ekranın ortasına olan uzaklığına göre hesaplayalım
            const scrollOffset = window.scrollY - bannerSection.offsetTop;
            
            // Matematik: TranslateY ile Parallax, Scale ile Zoom
            // Scroll yaptıkça resim hafif aşağı kayar (parallax) ve büyür (scale)
            bannerImg.style.transform = `
                translateY(${scrollOffset * scrollSpeed * 0.2}px) 
                scale(${1 + Math.abs(scrollOffset) * zoomSpeed})
            `;
        }
    });
}

    }
};

export default Home;