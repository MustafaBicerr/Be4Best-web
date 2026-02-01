/* js/views/About.js */
import { initScrollReveal } from '../modules/scroll.js';
import HomeHero from '../components/HomeHero.js';

const About = {
    render: async () => {
        return `
            ${HomeHero.render({
                titleKey: 'pages.about_us_page.hero.title',
                subtitleKey: 'pages.about_us_page.hero.subtitle',
                ctaKey: 'nav.contact', // Butonda "İletişim" yazsın
                ctaLink: '/contact'    // Butona basınca iletişime gitsin
            })}

            <section class="section-padding">
                <div class="container">
                    <div class="row align-center">
                        <div class="col col-lg-6">
                            <div class="story-text reveal-text">
                                <h2 data-i18n="pages.about_us_page.story.title"></h2>
                                <p data-i18n="pages.about_us_page.story.p1"></p>
                                <p data-i18n="pages.about_us_page.story.p2"></p>
                                
                                <div class="mt-4">
                                    <img src="assets/images/ui/logo-altin.png" alt="Signature" style="height: 50px; opacity: 0.6;">
                                </div>
                            </div>
                        </div>
                        
                        <div class="col col-lg-6">
                            <div class="overlap-grid reveal-image">
                                <img src="assets/images/ui/story-1.jpg" class="overlap-img ov-1" alt="Be4Best Factory">
                                <img src="assets/images/ui/story-2.jpg" class="overlap-img ov-2" alt="Be4Best Design">
                            </div>
                        </div>
                    </div>

                    <div class="values-grid fade-up delay-1">
                        <div class="value-card">
                            <i class="ri-rocket-line value-icon"></i>
                            <h3 data-i18n="pages.about_us_page.values.mission_title"></h3>
                            <p data-i18n="pages.about_us_page.values.mission_desc"></p>
                        </div>
                        
                        <div class="value-card">
                            <i class="ri-eye-line value-icon"></i>
                            <h3 data-i18n="pages.about_us_page.values.vision_title"></h3>
                            <p data-i18n="pages.about_us_page.values.vision_desc"></p>
                        </div>

                        <div class="value-card">
                            <i class="ri-medal-line value-icon"></i>
                            <h3 data-i18n="pages.about_us_page.values.quality_title"></h3>
                            <p data-i18n="pages.about_us_page.values.quality_desc"></p>
                        </div>
                    </div>

                </div>
            </section>

            <section class="section-padding ceo-section">
                <div class="container">
                    <div class="ceo-wrapper">
                        <div class="ceo-img-box reveal-image">
                            <img src="assets/images/ui/ceo.jpg" class="ceo-img" alt="CEO Nuri Bey">
                        </div>

                        <div class="ceo-content reveal-text">
                            <i class="ri-double-quotes-l quote-icon-large"></i>
                            <span class="sub-title" data-i18n="pages.about_us_page.ceo.title"></span>
                            <blockquote class="ceo-quote" data-i18n="pages.about_us_page.ceo.quote"></blockquote>
                            
                            <div class="ceo-details">
                                <h4 class="mb-0" data-i18n="pages.about_us_page.ceo.name"></h4>
                                <span class="text-muted" data-i18n="pages.about_us_page.ceo.role"></span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        `;
    },

    afterRender: async () => {
        initScrollReveal();
    }
};

export default About;