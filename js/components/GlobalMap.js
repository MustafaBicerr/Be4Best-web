import { Api } from '../services/api.js';
import { i18n } from '../core/i18n.js';

const GlobalMap = {
   render: async () => {
        return `
            <section class="global-reach-section section-padding">
                <div class="container">
                    
                    <div class="section-header text-center mb-5 fade-up">
                        <span class="sub-title">${i18n.translations.pages.home_page.sections.global_map.quote}</span>
                        <h2 class="section-title">${i18n.translations.pages.home_page.sections.global_map.title}</h2>
                        <p class="section-desc">
                            ${i18n.translations.pages.home_page.sections.global_map.subtitle}
                        </p>
                    </div>
                    
                    <div class="map-card-wrapper reveal-image">
                        
                        <div id="world-map-container"></div>
                        
                        <div class="map-stats-container">
                            <div class="stat-item">
                                <span class="stat-number" data-target="12">0</span>
                                <span class="stat-label">${i18n.translations.pages.home_page.sections.global_map.counters.countries}</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-number" data-target="5000">0</span>
                                <span class="stat-label">${i18n.translations.pages.home_page.sections.global_map.counters.customers}</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-number" data-target="150">0</span>
                                <span class="stat-label">${i18n.translations.pages.home_page.sections.global_map.counters.global_prpjects}</span>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        `;
    },

    afterRender: async () => {
        const chartDom = document.getElementById('world-map-container');
        if (!chartDom) return;

        // ECharts'i başlat
        const myChart = echarts.init(chartDom);
        myChart.showLoading(); // Veri gelene kadar loading dönsün

        // 1. Verileri Çek
        const countries = await Api.getExportMap();
        
        // 2. Dünya Haritası JSON verisini çek (ECharts için gerekli)
        const mapResponse = await fetch('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json');
        const mapData = await mapResponse.json();
        
        // GeoJSON formatına çevir (TopoJSON -> GeoJSON)
        // ECharts için doğrudan world.json kullanmak daha pratik, 
        // burada ECharts'in hazır map'ini register ediyoruz.
        // Not: Basitlik için online bir GeoJSON kaynağı kullanıyoruz.
        const geoJsonUrl = 'https://raw.githubusercontent.com/apache/echarts-examples/master/public/data/asset/geo/world.json';
        
          // --- SAYAÇ ANİMASYONU (Counter Up) ---
        const counters = document.querySelectorAll('.stat-number');
        const speed = 200; // Hız ayarı

        const runCounter = () => {
            counters.forEach(counter => {
                const updateCount = () => {
                    const target = +counter.getAttribute('data-target');
                    const count = +counter.innerText.replace('+', ''); // + işaretini temizle
                    const inc = target / speed;

                    if (count < target) {
                        counter.innerText = Math.ceil(count + inc) + (target > 100 ? '+' : '');
                        setTimeout(updateCount, 20);
                    } else {
                        counter.innerText = target + (target > 100 ? '+' : '');
                    }
                };
                updateCount();
            });
        };

        // Sayaçlar ekrana girince çalışsın (Intersection Observer)
        const observer = new IntersectionObserver((entries) => {
            if(entries[0].isIntersecting) {
                runCounter();
                observer.disconnect();
            }
        });
        
        observer.observe(document.querySelector('.map-stats-container'));
        
        // ECharts Kodlarının devamı (fetch vb.) buraya gelecek...
        // ...
        // const myChart = echarts.init(chartDom);
        // ... (ECharts data çekme ve çizdirme kodları)
        // ...

        fetch(geoJsonUrl)
            .then(response => response.json())
            .then(geoJson => {
                myChart.hideLoading();
                echarts.registerMap('world', geoJson);

                // --- KAYSERİ KOORDİNATLARI (Sabit Merkez) ---
                const kayseriCoords = [35.4853, 38.7205]; // [Boylam, Enlem]

                // --- DATALARI HAZIRLA ---
                // Çizgiler (Lines) ve Noktalar (Scatter)
                const lineData = [];
                const scatterData = [];

                countries.forEach(country => {
                    const destCoords = [country.longitude, country.latitude];
                    
                    // Çizgi: Kayseri -> Hedef
                    lineData.push({
                        fromName: 'Kayseri',
                        toName: country.country_name,
                        coords: [kayseriCoords, destCoords]
                    });

                    // Hedef Noktası (Ripple Efekti için)
                    scatterData.push({
                        name: country.country_name,
                        value: destCoords.concat([10]) // 10: Değer büyüklüğü
                    });
                });

                // --- CHART AYARLARI ---
                const option = {
                    backgroundColor: 'transparent', // Arka plan şeffaf (Section rengini alsın)
                    geo: {
                        map: 'world',
                        roam: true, // Zoom yapılabilir
                        zoom: 1.2,
                        label: { show: false },
                        itemStyle: {
                            areaColor: '#e0e0e0', // Kara rengi (Gri)
                            borderColor: '#ffffff' // Sınır rengi
                        },
                        emphasis: { // Üzerine gelince
                            itemStyle: { areaColor: '#d1d1d1' },
                            label: { show: false }
                        }
                    },
                    series: [
                        // 1. ANİMASYONLU ÇİZGİLER (Uçak Rotası Gibi)
                        {
                            type: 'lines',
                            zlevel: 1,
                            effect: {
                                show: true,
                                period: 6, // Animasyon süresi (sn)
                                trailLength: 0.7, // Kuyruk uzunluğu
                                color: '#b88c4b', // GOLD Rengi (Lüks)
                                symbolSize: 3
                            },
                            lineStyle: {
                                color: '#b88c4b',
                                width: 0, // Ana çizgi görünmez, sadece akan ışık görünsün
                                curveness: 0.2 // Kavis oranı
                            },
                            data: lineData
                        },
                        // 2. ÇİZGİLERİN KENDİSİ (Soluk Arka Plan Çizgisi)
                        {
                            type: 'lines',
                            zlevel: 2,
                            symbol: ['none', 'arrow'],
                            symbolSize: 10,
                            lineStyle: {
                                color: '#b88c4b',
                                width: 1,
                                opacity: 0.4, // Hafif silik
                                curveness: 0.2
                            },
                            data: lineData
                        },
                        // 3. HEDEF NOKTALARI (Ripple Efekti)
                        {
                            type: 'effectScatter',
                            coordinateSystem: 'geo',
                            zlevel: 2,
                            rippleEffect: {
                                brushType: 'stroke'
                            },
                            label: {
                                show: true,
                                position: 'right',
                                formatter: '{b}', // Ülke adı
                                color: '#333',
                                fontSize: 10
                            },
                            itemStyle: {
                                color: '#b88c4b' // Nokta Rengi
                            },
                            data: scatterData
                        },
                        // 4. KAYSERİ (MERKEZ NOKTA)
                        {
                            type: 'effectScatter',
                            coordinateSystem: 'geo',
                            zlevel: 3,
                            rippleEffect: { brushType: 'fill' },
                            itemStyle: { color: '#000' }, // Kayseri Siyah olsun
                            data: [{
                                name: 'KAYSERİ (HQ)',
                                value: kayseriCoords
                            }]
                        }
                    ]
                };

                myChart.setOption(option);
            });

        // Pencere boyutu değişince haritayı yeniden boyutlandır
        window.addEventListener('resize', () => {
            myChart.resize();
        });

      
    }
};

export default GlobalMap;