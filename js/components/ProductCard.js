import { i18n } from '../core/i18n.js';

const ProductCard = (product) => {
    // Fiyatı formatla (15000 -> 15.000 TL)
    const formattedPrice = new Intl.NumberFormat(i18n.lang === 'tr' ? 'tr-TR' : 'en-US', {
        style: 'currency',
        currency: 'TRY',
        minimumFractionDigits: 0
    }).format(product.price);

    // Resimler (Veritabanından dizi olarak gelir)
    // Eğer 2. resim yoksa, 1. resmi tekrar kullan (Hata vermesin)
    const img1 = product.images[0]; 
    const img2 = product.images[1] || product.images[0]; 
    // YENİ ROZETİ MANTIĞI: Eğer ürün veritabanında "is_new: true" ise etiketi hazırla
    const isNewBadge = product.is_new 
        ? `<div class="new-badge">${i18n.lang === 'tr' ? 'YENİ' : 'NEW'}</div>` 
        : '';

    return `
        <div class="product-card reveal-text" data-id="${product.id}">

            ${isNewBadge}
            
            <div class="card-media">
                <a href="/product/${product.id}" class="img-link">
                    <img src="${img1}" class="img-front" alt="${product.name}">
                    <img src="${img2}" class="img-back" alt="${product.name}">
                </a>
                
                <div class="card-overlay-info">
                    <h3 class="product-title">${product.name}</h3>
                    <span class="product-category">${product.category}</span>
                </div>

                <div class="card-actions">
                    <button class="action-btn btn-quick-view" title="${i18n.translations.pages.home_page.sections.best_sellers.quick_view}">
                        <i class="ri-eye-line"></i>
                    </button>
                    <button class="action-btn btn-add-cart" title="${i18n.translations.pages.home_page.sections.best_sellers.add_to_cart}">
                        <i class="ri-shopping-bag-line"></i>
                    </button>
                </div>
            </div>

            <div class="card-details">
                <span class="price">${formattedPrice}</span>
            </div>

            <div class="detail-hover-card">
                <div class="detail-content">
                    <h4>${product.name}</h4>
                    <p class="detail-desc">${product.description.substring(0, 60)}...</p>
                    
                    <div class="mini-gallery">
                        ${product.images.slice(0, 3).map(img => `<img src="${img}">`).join('')}
                    </div>
                </div>
            </div>

        </div>
    `;
};

export default ProductCard;