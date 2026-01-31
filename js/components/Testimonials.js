import { Api } from '../services/api.js';
import { i18n } from '../core/i18n.js';

const Testimonials = {
    render: async () => {
        const reviews = await Api.getTestimonials();
        
        // Yıldız Oluşturucu (Helper)
        const createStars = (count) => {
            return Array(5).fill(0).map((_, i) => 
                `<i class="${i < count ? 'ri-star-fill' : 'ri-star-line'}"></i>`
            ).join('');
        };

        const slidesHTML = reviews.map(review => `
            <div class="swiper-slide testimonial-card">
                <div class="quote-icon"><i class="ri-double-quotes-l"></i></div>
                <p class="review-text">"${review.comment}"</p>
                <div class="stars">${createStars(review.rating)}</div>
                <div class="reviewer-info">
                    <div class="reviewer-details">
                        <h5 class="name">${review.full_name}</h5>
                        <span class="country"><i class="ri-map-pin-line"></i> ${review.country}</span>
                    </div>
                </div>
            </div>
        `).join('');

        return `
            <section class="testimonials-section section-padding bg-dark text-white">
                <div class="container">
                    <div class="section-header text-center mb-5 fade-up">
                        <span class="sub-title text-gold">${i18n.translations.pages.home_page.sections.testimonials.subtitle}</span>
                        <h2 class="section-title text-white">${i18n.translations.pages.home_page.sections.testimonials.title}</h2>
                    </div>

                    <div class="swiper testimonial-swiper reveal-text">
                        <div class="swiper-wrapper">
                            ${slidesHTML}
                        </div>
                        <div class="swiper-pagination"></div>
                    </div>
                </div>
            </section>
        `;
    },

    afterRender: async () => {
        // Swiper Başlatıcı
        new Swiper('.testimonial-swiper', {
            slidesPerView: 1, // Mobilde 1 tane
            spaceBetween: 30,
            loop: true, // Sonsuz döngü
            autoplay: {
                delay: 4000, // 4 saniyede bir kay
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            breakpoints: {
                768: {
                    slidesPerView: 2, // Tablette 2 tane
                },
                1024: {
                    slidesPerView: 3, // Masaüstünde 3 tane
                },
            }
        });
    }
};

export default Testimonials;