/* js/views/Home.js */
import { initScrollReveal } from '../modules/scroll.js';
import { Api } from '../services/api.js';

// Bileşenler (Hepsi components/ altında)
import HomeHero from '../components/HomeHero.js';
import SectionProductGrid from '../components/SectionProductGrid.js';
import HomeBanner from '../components/HomeBanner.js';
import GlobalMap from '../components/GlobalMap.js';
import Testimonials from '../components/Testimonials.js';

const Home = {
    render: async () => {
        // 1. Verileri Çek
        const [bestSellers, newArrivals, featured] = await Promise.all([
            Api.getBestSellers(),
            Api.getNewArrivals(),
            Api.getFeaturedProducts()
        ]);

        // 2. Hakkımızda Kısmı (Kısa olduğu için buraya gömdüm, istersen bunu da ayırabiliriz)
        const aboutHTML = `
            <section class="section-padding about-section">
                <div class="container">
                    <div class="row align-center">
                        <div class="col col-lg-6">
                            <div class="about-img-wrapper reveal-image">
                                <div class="img-big"><img src="assets/images/ui/about-1.jpg" alt="Interior"></div>
                                <div class="img-small parallax-effect"><img src="assets/images/ui/about-2.jpg" alt="Detail"></div>
                                <div class="img-shape"></div>
                            </div>
                        </div>
                        <div class="col col-lg-6">
                            <div class="about-content reveal-text">
                                <span class="sub-title" data-i18n="pages.home_page.sections.home_about.subtitle"></span>
                                <h2 class="section-title" data-i18n="pages.home_page.sections.home_about.title"></h2>
                                <p class="section-desc" data-i18n="pages.home_page.sections.home_about.desc"></p>
                                
                                <div class="about-features">
                                    <div class="feature-item"><i class="ri-global-line"></i><span data-i18n="pages.home_page.sections.home_about.feature_1"></span></div>
                                    <div class="feature-item"><i class="ri-medal-line"></i><span data-i18n="pages.home_page.sections.home_about.feature_2"></span></div>
                                    <div class="feature-item"><i class="ri-pantone-line"></i><span data-i18n="pages.home_page.sections.home_about.feature_3"></span></div>
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
        `;

        // 3. Bileşenleri Birleştir
        return `
            ${HomeHero.render()}
            
            ${aboutHTML}
            
            ${SectionProductGrid.render({
                titleKey: 'pages.home_page.sections.best_sellers.title',
                subtitleKey: 'pages.home_page.sections.best_sellers.subtitle',
                products: bestSellers
            })}

            ${HomeBanner.render()}

            ${SectionProductGrid.render({
                titleKey: 'pages.home_page.sections.new_arrivals.title',
                subtitleKey: 'pages.home_page.sections.new_arrivals.subtitle',
                products: newArrivals
            })}

            ${SectionProductGrid.render({
                titleKey: 'pages.home_page.sections.featured_products.title',
                subtitleKey: 'pages.home_page.sections.featured_products.subtitle',
                products: featured,
                bgClass: 'bg-light'
            })}

            ${await GlobalMap.render()}

            ${await Testimonials.render()}
        `;
    },

    afterRender: async () => {
        // Bileşenlerin scriptlerini çalıştır
        HomeHero.afterRender();
        HomeBanner.afterRender();
        await GlobalMap.afterRender();
        await Testimonials.afterRender();
        
        // Scroll Reveal'i en son başlat ki tüm HTML hazır olsun
        initScrollReveal();
    }
};

export default Home;