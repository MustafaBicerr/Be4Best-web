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
            const value = key.split('.').reduce((obj, i) => obj[i], this.translations);
            if (value) el.innerHTML = value; // innerHTML kullanıyoruz ki <br> çalışsın
        });
    }

    toggleLang() {
        this.lang = this.lang === 'tr' ? 'en' : 'tr';
        localStorage.setItem('lang', this.lang);
        location.reload(); // En temiz yöntem: sayfayı yenile
    }
}
export const i18n = new I18n();