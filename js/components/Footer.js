/* js/components/Footer.js */
import { i18n } from '../core/i18n.js';

const Footer = {
    render: async () => {
        return `
            <footer class="site-footer">
                
                <div class="container">
                    <div class="footer-top">
                        
                        <div class="footer-col brand-col">
                            <a href="/" class="footer-logo">BE4BEST.</a>
                            <p class="footer-desc" data-i18n="footer.slogan"></p>
                            <div class="social-links">
                                <a href="#" title="Instagram"><i class="ri-instagram-line"></i></a>
                                <a href="#" title="LinkedIn"><i class="ri-linkedin-fill"></i></a>
                                <a href="#" title="Pinterest"><i class="ri-pinterest-line"></i></a>
                                <a href="#" title="Facebook"><i class="ri-facebook-fill"></i></a>
                            </div>
                        </div>

                        <div class="footer-col">
                            <h4 class="footer-title" data-i18n="footer.collections.title"></h4>
                            <ul class="footer-links">
                                <li><a href="#" data-i18n="footer.collections.living_room"></a></li>
                                <li><a href="#" data-i18n="footer.collections.dining_room"></a></li>
                                <li><a href="#" data-i18n="footer.collections.bedroom"></a></li>
                                <li><a href="#" data-i18n="footer.collections.accessories"></a></li>
                                <li><a href="#" data-i18n="footer.collections.new_arrivals"></a></li>
                            </ul>
                        </div>

                        <div class="footer-col">
                            <h4 class="footer-title" data-i18n="footer.corporate.title"></h4>
                            <ul class="footer-links">
                                <li><a href="#" data-i18n="footer.corporate.about"></a></li>
                                <li><a href="#" data-i18n="footer.corporate.sustainability"></a></li>
                                <li><a href="#" data-i18n="footer.corporate.hr"></a></li>
                                <li><a href="#" data-i18n="footer.corporate.shipping"></a></li>
                                <li><a href="#" data-i18n="footer.corporate.contact"></a></li>
                            </ul>
                        </div>

                        <div class="footer-col newsletter-col">
                            <h4 class="footer-title" data-i18n="footer.newsletter.title"></h4>
                            <p class="newsletter-text" data-i18n="footer.newsletter.text"></p>
                            
                            <form class="newsletter-form">
                                <input type="email" placeholder="E-mail" required>
                                
                                <button type="submit" data-i18n-aria="footer.newsletter.button_aria">
                                    <i class="ri-arrow-right-line"></i>
                                </button>
                            </form>

                            <div class="payment-methods">
                                <i class="ri-visa-line"></i>
                                <i class="ri-mastercard-line"></i>
                                <i class="ri-secure-payment-line"></i>
                            </div>
                        </div>

                    </div>
                </div>

                <div class="footer-bottom">
                    <div class="container bottom-content">
                        <p class="copyright">&copy; 2026 Be4Best Furniture. <span data-i18n="footer.bottom.rights"></span></p>
                        <div class="legal-links">
                            <a href="#" data-i18n="footer.bottom.privacy"></a>
                            <a href="#" data-i18n="footer.bottom.terms"></a>
                            <a href="#" data-i18n="footer.bottom.kvkk"></a>
                        </div>
                    </div>
                </div>
            </footer>
        `;
    },
    
    afterRender: async () => {
        // Newsletter form submit işlemi buraya eklenebilir

    }
};

export default Footer;