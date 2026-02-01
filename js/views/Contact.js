/* js/views/Contact.js */
import HomeHero from '../components/HomeHero.js';
import GlobalMap from '../components/GlobalMap.js';
import { initScrollReveal } from '../modules/scroll.js';

const Contact = {
    render: async () => {
        return `
            ${HomeHero.render({
                titleKey: 'pages.contact_page.hero.title',
                subtitleKey: 'pages.contact_page.hero.subtitle',
                ctaKey: 'nav.shop', 
                ctaLink: '/shop'
            })}

            <section class="section-padding">
                <div class="container">
                    
                    <div class="contact-section-panel panel-gray fade-up">
                        <div class="row justify-content-center">
                            <div class="col col-lg-4 col-md-6 mb-4 mb-lg-0">
                                <div class="contact-info-card">
                                    <div class="contact-icon"><i class="ri-map-pin-2-fill"></i></div>
                                    <h3 data-i18n="pages.contact_page.info.address_title"></h3>
                                    <p data-i18n="pages.contact_page.info.address_desc"></p>
                                </div>
                            </div>

                            <div class="col col-lg-4 col-md-6 mb-4 mb-lg-0">
                                <div class="contact-info-card" style="transition-delay: 0.1s">
                                    <div class="contact-icon"><i class="ri-phone-fill"></i></div>
                                    <h3 data-i18n="pages.contact_page.info.phone_title"></h3>
                                    <a href="tel:+903520000000" class="fw-bold">+90 (352) 000 00 00</a>
                                    <a href="https://wa.me/905550000000" target="_blank" class="mt-2 text-success">
                                        <i class="ri-whatsapp-line"></i> WhatsApp Destek
                                    </a>
                                </div>
                            </div>

                            <div class="col col-lg-4 col-md-6">
                                <div class="contact-info-card" style="transition-delay: 0.2s">
                                    <div class="contact-icon"><i class="ri-mail-open-fill"></i></div>
                                    <h3 data-i18n="pages.contact_page.info.email_title"></h3>
                                    <a href="mailto:info@be4best.com" class="fw-bold">info@be4best.com</a>
                                    <a href="mailto:export@be4best.com" class="mt-2">export@be4best.com</a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="contact-section-panel panel-white-shadow reveal-text mt-5">
                        <div class="contact-wrapper">
                            
                            <div class="contact-form-box">
                                <h3 class="mb-4 section-title" style="font-size: 1.8rem;" data-i18n="pages.contact_page.form.title"></h3>
                                <form id="contact-form">
                                    <div class="row">
                                        <div class="col-md-6 form-group">
                                            <input type="text" class="form-control" data-i18n-placeholder="pages.contact_page.form.name" required>
                                        </div>
                                        <div class="col-md-6 form-group">
                                            <input type="email" class="form-control" data-i18n-placeholder="pages.contact_page.form.email" required>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <input type="text" class="form-control" data-i18n-placeholder="pages.contact_page.form.subject">
                                    </div>
                                    <div class="form-group">
                                        <textarea class="form-control" data-i18n-placeholder="pages.contact_page.form.message" required></textarea>
                                    </div>
                                    <button type="submit" class="btn-primary w-100" data-i18n="pages.contact_page.form.btn"></button>
                                </form>
                            </div>

                            <div class="map-box reveal-image">
                                <div class="map-frame">
                                    <iframe 
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3112.857742426588!2d35.37049987559455!3d38.72107495708928!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x152b1373c8f69487%3A0xce33be2f7f8f4759!2sB4B%20Furniture!5e0!3m2!1str!2str!4v1769950329082!5m2!1str!2str" 
                                        allowfullscreen="" 
                                        loading="lazy" 
                                        referrerpolicy="no-referrer-when-downgrade">
                                    </iframe>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>

            ${await GlobalMap.render()}
        `;
    },

    afterRender: async () => {
        HomeHero.afterRender();
        await GlobalMap.afterRender();
        initScrollReveal();

        // Form Submit Simulasyonu
        const form = document.getElementById('contact-form');
        if(form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                // Burada normalde API'ye istek atılır.
                // Biz şimdilik görsel bir geri bildirim verelim.
                const btn = form.querySelector('button[type="submit"]');
                const originalText = btn.innerHTML;
                btn.innerHTML = '<i class="ri-loader-4-line ri-spin"></i> Gönderiliyor...';
                btn.disabled = true;

                setTimeout(() => {
                    alert('Mesajınız başarıyla alındı. Teşekkür ederiz.');
                    form.reset();
                    btn.innerHTML = '<i class="ri-check-line"></i> Gönderildi';
                    setTimeout(() => {
                       btn.innerHTML = originalText;
                       btn.disabled = false;
                    }, 2000);
                }, 1500);
            });
        }
    }
};

export default Contact;