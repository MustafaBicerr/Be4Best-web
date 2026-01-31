/* js/services/api.js */

// Supabase Kütüphanesini CDN'den çekiyoruz (Kuruluma gerek yok)
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm'

// --- AYARLAR (Burayı Kendi Bilgilerinle Doldur) ---
const SUPABASE_URL = 'https://hmilpknoyyljoahucxye.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhtaWxwa25veXlsam9haHVjeHllIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk2NzE3MzQsImV4cCI6MjA4NTI0NzczNH0.49wHo34hypiLcLUqxUAtIXgFP_2PbngRLPAEoWbr2WY'; 
// (Anon Key herkese açıktır, korkma. Güvenliği RLS ile sağladık.)

// İstemciyi Başlat
export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// --- SERVİS FONKSİYONLARI ---
export const Api = {
    
    // 1. En Çok Satanları Getir
    async getBestSellers() {
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .eq('is_bestseller', true)
            .order('sort_order', { ascending: true });
            
        if (error) {
            console.error('Best Sellers Hatası:', error);
            return [];
        }
        return data;
    },

    // 2. Kategoriye Göre Ürünleri Getir
    async getProductsByCategory(category) {
        let query = supabase.from('products').select('*');
        
        if (category) {
            query = query.eq('category', category);
        }
        
        const { data, error } = await query;
        if (error) {
            console.error('Ürün Çekme Hatası:', error);
            return [];
        }
        return data;
    },

    // 3. Tekil Ürün Detayı Getir (ID ile)
    async getProductById(id) {
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .eq('id', id)
            .single();

        if (error) return null;
        return data;
    },

    // 4. Resim URL'ini Tamamla (Storage'dan tam link alma)
    getImageUrl(path) {
        if (!path) return 'assets/images/no-image.png'; // Placeholder
        if (path.startsWith('http')) return path; // Zaten tam linkse elleme
        
        // Supabase Storage Linkini Oluştur
        const { data } = supabase.storage.from('product-images').getPublicUrl(path);
        return data.publicUrl;
    },
    // 2. Yeni Gelenleri Getir (is_new = true)
    async getNewArrivals() {
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .eq('is_new', true)
            .order('created_at', { ascending: false }) // En yeniler en başta
            .limit(6); // Sadece 6 tane
            
        if (error) { console.error('New Arrivals Hatası:', error); return []; }
        return data;
    },

    // 3. Editörün Seçimi (is_featured = true)
    async getFeaturedProducts() {
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .eq('is_featured', true)
            .limit(6);

        if (error) { console.error('Featured Hatası:', error); return []; }
        return data;
    },

    // 4. İhracat Yapılan Ülkeleri Getir
    async getExportMap() {
        const { data, error } = await supabase
            .from('export_countries')
            .select('*');
            
        if (error) { console.error('Map Data Hatası:', error); return []; }
        return data;
    },
    
    // 5. Müşteri Yorumlarını Getir
    async getTestimonials() {
        const { data, error } = await supabase
            .from('testimonials')
            .select('*')
            .eq('is_active', true) // Sadece aktif olanları çek
            .order('created_at', { ascending: false });
            
        if (error) { console.error('Testimonials Error:', error); return []; }
        return data;
    },
};