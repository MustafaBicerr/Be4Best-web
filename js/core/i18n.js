/* js/core/i18n.js */
export class I18n {
    constructor() {
        this.lang = localStorage.getItem('lang') || 'tr';
        this.translations = {};
    }

    async init() {
        const response = await fetch(`./locales/${this.lang}.json`);
        this.translations = await response.json();
        this.updateDOM();
    }

    // HTML'deki data-i18n="nav.home" gibi yerleri bulup doldurur
    updateDOM() {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            const value = key.split('.').reduce((obj, i) => (obj ? obj[i] : null), this.translations);
            if (value) el.innerHTML = value; 
        });
        
        // Placeholder ve Aria Label güncellemesi (Footer için eklemiştik)
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            const value = key.split('.').reduce((obj, i) => (obj ? obj[i] : null), this.translations);
            if (value) el.placeholder = value;
        });
    }

    async toggleLang() {
        // 1. Dili değiştir
        this.lang = this.lang === 'tr' ? 'en' : 'tr';
        localStorage.setItem('lang', this.lang);
        
        // 2. Yeni JSON dosyasını çek
        await this.init();

        // 3. Uygulamaya "Dil Değişti" sinyali gönder (Sayfayı yenilemeden!)
        document.dispatchEvent(new CustomEvent('lang:change'));
    }
}

export const i18n = new I18n();