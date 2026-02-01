/* js/components/SectionProductGrid.js */
import ProductCard from './ProductCard.js'; // Aynı klasörde olduğu için ./

const SectionProductGrid = {
    // options: { titleKey, subtitleKey, products, bgClass }
    render: (options) => {
        const { titleKey, subtitleKey, products, bgClass = '' } = options;

        const createGrid = (items) => {
            if (!items || items.length === 0) return '<p class="text-center">Ürün bulunamadı.</p>';
            return items.map(product => ProductCard(product)).join('');
        };

        return `
            <section class="section-padding ${bgClass}">
                <div class="container">
                    <div class="section-header text-center mb-5 fade-up">
                        <span class="sub-title" data-i18n="${subtitleKey}"></span>
                        <h2 class="section-title" data-i18n="${titleKey}"></h2>
                    </div>
                    <div class="product-grid">
                        ${createGrid(products)}
                    </div>
                </div>
            </section>
        `;
    },
    
    afterRender: () => {
        // Grid için özel bir JS gerekirse buraya (Örn: Masonry layout)
    }
};

export default SectionProductGrid;