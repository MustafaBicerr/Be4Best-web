import { i18n } from '../core/i18n.js';

const Navbar = {
    render: async () => {
        return `
            <div class="container navbar-content">
                <a href="/" class="logo">
                    BE4BEST<span>.</span>
                </a>

                <nav class="nav-links">
                    <ul>
                        <li><a href="/" data-i18n="nav.home"></a></li>
                        <li><a href="/about" data-i18n="nav.about"></a></li>
                        
                        <li class="dropdown-trigger">
                            <a href="/shop" data-i18n="nav.shop"></a> <i class="ri-arrow-down-s-line" style="font-size: 0.8em;"></i>
                            
                            <div class="dropdown-menu">
                                <div class="mega-menu-grid">
                                    <a href="/shop?cat=living" class="menu-category-card">
                                        <div class="cat-img-placeholder"><img src="assets/images/ui/cat-living.png" onerror="this.style.display='none'"></div>
                                        <span data-i18n="nav.categories.living_room"></span>
                                    </a>
                                    <a href="/shop?cat=balcony" class="menu-category-card">
                                        <div class="cat-img-placeholder"><img src="assets/images/ui/cat-balcony.png" onerror="this.style.display='none'"></div>
                                        <span data-i18n="nav.categories.balcony"></span>
                                    </a>
                                    <a href="/shop?cat=sofa3" class="menu-category-card">
                                        <div class="cat-img-placeholder"><img src="assets/images/ui/cat-sofa3.png" onerror="this.style.display='none'"></div>
                                        <span data-i18n="nav.categories.sofa_3"></span>
                                    </a>
                                    <a href="/shop?cat=sofa2" class="menu-category-card">
                                        <div class="cat-img-placeholder"><img src="assets/images/ui/cat-sofa2.png" onerror="this.style.display='none'"></div>
                                        <span data-i18n="nav.categories.sofa_2"></span>
                                    </a>
                                    <a href="/shop?cat=armchair" class="menu-category-card">
                                        <div class="cat-img-placeholder"><img src="assets/images/ui/cat-armchair.png" onerror="this.style.display='none'"></div>
                                        <span data-i18n="nav.categories.armchair"></span>
                                    </a>
                                     <a href="/shop?cat=chair" class="menu-category-card">
                                        <div class="cat-img-placeholder"><img src="assets/images/ui/cat-chair.png" onerror="this.style.display='none'"></div>
                                        <span data-i18n="nav.categories.chair"></span>
                                    </a>
                                     <a href="/shop?cat=puff" class="menu-category-card">
                                        <div class="cat-img-placeholder"><img src="assets/images/ui/cat-puff.png" onerror="this.style.display='none'"></div>
                                        <span data-i18n="nav.categories.puff"></span>
                                    </a>
                                </div>
                            </div>
                        </li>
                        <li><a href="/contact" data-i18n="nav.contact"></a></li>
                    </ul>
                </nav>

                <div class="nav-icons">
                    <button id="lang-switch" class="icon-btn">${i18n.lang.toUpperCase()}</button>
                    <a href="/account" class="icon-btn"><i class="ri-user-line"></i></a>
                    <a href="/cart" class="icon-btn cart-btn">
                        <i class="ri-shopping-bag-line"></i>
                        <span class="cart-count">0</span>
                    </a>
                    <button id="menu-toggle" class="icon-btn mobile-only"><i class="ri-menu-4-line"></i></button>
                </div>
            </div>

            <div class="mobile-menu-overlay" id="mobile-menu">
                <button id="menu-close" class="mobile-menu-close"><i class="ri-close-line"></i></button>
                
                <ul class="mobile-nav-links">
                    <li><a href="/" data-i18n="nav.home"></a></li>
                    <li><a href="/about" data-i18n="nav.about"></a></li>
                    
                    <li class="mobile-dropdown-group">
                        <a href="javascript:void(0)" class="mobile-dropdown-trigger">
                            <span data-i18n="nav.shop"></span>
                            <i class="ri-arrow-down-s-line"></i>
                        </a>
                        
                        <ul class="mobile-dropdown-content">
                             <li>
                                <a href="/shop?cat=living">
                                    <img src="assets/images/ui/cat-living.png" onerror="this.style.display='none'">
                                    <span data-i18n="nav.categories.living_room"></span>
                                </a>
                            </li>
                            <li>
                                <a href="/shop?cat=balcony">
                                    <img src="assets/images/ui/cat-balcony.png" onerror="this.style.display='none'">
                                    <span data-i18n="nav.categories.balcony"></span>
                                </a>
                            </li>
                            <li>
                                <a href="/shop?cat=sofa3">
                                    <img src="assets/images/ui/cat-sofa3.png" onerror="this.style.display='none'">
                                    <span data-i18n="nav.categories.sofa_3"></span>
                                </a>
                            </li>
                            <li>
                                <a href="/shop?cat=sofa2">
                                    <img src="assets/images/ui/cat-sofa2.png" onerror="this.style.display='none'">
                                    <span data-i18n="nav.categories.sofa_2"></span>
                                </a>
                            </li>
                             <li>
                                <a href="/shop?cat=armchair">
                                    <img src="assets/images/ui/cat-armchair.png" onerror="this.style.display='none'">
                                    <span data-i18n="nav.categories.armchair"></span>
                                </a>
                            </li>
                            <li>
                                <a href="/shop?cat=chair">
                                    <img src="assets/images/ui/cat-chair.png" onerror="this.style.display='none'">
                                    <span data-i18n="nav.categories.chair"></span>
                                </a>
                            </li>
                             <li>
                                <a href="/shop?cat=puff">
                                    <img src="assets/images/ui/cat-puff.png" onerror="this.style.display='none'">
                                    <span data-i18n="nav.categories.puff"></span>
                                </a>
                            </li>
                        </ul>
                    </li>

                    <li><a href="/contact" data-i18n="nav.contact"></a></li>
                </ul>
            </div>
        `;
    },
    
    afterRender: async () => {
        // Dil Değiştirme
        document.getElementById('lang-switch').addEventListener('click', () => {
            i18n.toggleLang();
        });

        // Sticky Header
        const header = document.getElementById('main-header');
        if (window.scrollY > 50) header.classList.add('scrolled');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) header.classList.add('scrolled');
            else header.classList.remove('scrolled');
        });

        // MOBİL MENÜ MANTIĞI
        const menuToggle = document.getElementById('menu-toggle');
        const menuClose = document.getElementById('menu-close');
        const mobileMenu = document.getElementById('mobile-menu');

        // Aç / Kapa
        menuToggle.addEventListener('click', () => mobileMenu.classList.add('active'));
        menuClose.addEventListener('click', () => mobileMenu.classList.remove('active'));

        // ACCORDION MANTIĞI (İşte burası o problemi çözüyor)
        const dropdownTrigger = document.querySelector('.mobile-dropdown-trigger');
        const dropdownContent = document.querySelector('.mobile-dropdown-content');
        const dropdownIcon = document.querySelector('.mobile-dropdown-trigger i');

        if(dropdownTrigger) {
            dropdownTrigger.addEventListener('click', (e) => {
                e.preventDefault(); // Linke gitmeyi engelle
                
                // Toggle işlemi (Aç/Kapa)
                if (dropdownContent.style.maxHeight) {
                    // Kapat
                    dropdownContent.style.maxHeight = null;
                    dropdownIcon.style.transform = 'rotate(0deg)';
                } else {
                    // Aç
                    dropdownContent.style.maxHeight = dropdownContent.scrollHeight + "px";
                    dropdownIcon.style.transform = 'rotate(180deg)';
                }
            });
        }
    }
};

export default Navbar;