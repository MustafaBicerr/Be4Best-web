/* js/components/FloatingActions.js */

const FloatingActions = {
    render: () => {
        // --- AYARLAR ---
        const phoneNumber = "905071917319"; // Müşterinin numarasını buraya yaz (Başında + olmadan)
        const whatsappMessage = "Merhaba, Be4best.com web sitesinden size ulaşıyorum.";
        
        // Linkleri Hazırla
        const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;
        const phoneLink = `tel:+${phoneNumber}`;

        return `
            <div class="floating-actions-container">
                
                <a href="${phoneLink}" class="fab-btn btn-phone" aria-label="Hemen Ara">
                    <i class="ri-phone-fill"></i>
                    <span class="tooltip-text">Hemen Ara</span>
                </a>

                <a href="${whatsappLink}" target="_blank" class="fab-btn btn-whatsapp" aria-label="WhatsApp'tan Yaz">
                    <i class="ri-whatsapp-line"></i>
                    <span class="tooltip-text">WhatsApp'tan Yaz</span>
                </a>

            </div>
        `;
    }
};

export default FloatingActions;