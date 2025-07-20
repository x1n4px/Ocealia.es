// data/productData.ts

export interface Product {
    id: number;
    image: string;
    title: string;
    brand: string;
    description: string;
    use: 'Alimentación' | 'Filtración' | 'Acondicionadores' | 'Decoración' | 'Iluminación' | 'Sustratos' | 'Calefacción' | 'Abonos';
    details: string[]; // Para información más detallada en el modal
}

export const productList: Product[] = [
    {
        id: 1,
        image: 'https://www.seachem.com/img/product-images/prime.jpg', // Asegúrate de tener estas imágenes en tu carpeta public/images
        title: 'Seachem Prime',
        brand: 'Seachem',
        description: 'Acondicionador de agua concentrado que elimina cloro, cloramina y amoníaco. Ideal para acuarios de agua dulce y salada.',
        use: 'Acondicionadores',
        details: [
            'Acondicionador completo y concentrado para agua dulce y salada.',
            'Elimina cloro, cloramina.',
            'Desintoxica amoníaco, nitrito y nitrato.',
            'Muy concentrado: 5ml trata 200L.',
        ]
    },
    {
        id: 2,
        image: 'https://www.seachem.com/img/product-images/stability.jpg',
        title: 'Seachem Stability',
        brand: 'Seachem',
        description: 'Bacterias vivas para establecer rápidamente el ciclo del nitrógeno en acuarios nuevos o recién limpiados.',
        use: 'Acondicionadores',
        details: [
            'Contiene cepas de bacterias beneficiosas para acuarios.',
            'Ayuda a establecer el ciclo del nitrógeno rápidamente.',
            'Reduce el riesgo de picos de amoníaco y nitrito.',
            'Ideal para acuarios nuevos o después de cambios de agua grandes.'
        ]
    },
    {
        id: 3,
        image: 'https://elitereefkanarias.es/998-medium_default/special-blend-251-ml-.jpg',
        title: 'Microbe-Lift Special Blend',
        brand: 'Microbe-Lift',
        description: 'Mezcla especial de bacterias beneficiosas para mejorar la calidad del agua y reducir los desechos orgánicos en acuarios.',
        use: 'Acondicionadores',
        details: [
            'Promueve un ambiente biológico saludable en acuarios.',
            'Reduce los desechos orgánicos y mejora la calidad del agua.',
            'Ayuda a controlar olores y estabilizar el ciclo del nitrógeno.',
            'Seguro para peces, plantas y corales.'
        ]
    },
    {
        id: 4,
        image: 'https://www.aq-arium.com/aqmarine/wp-content/uploads/2022/03/thera-P.png',
        title: 'Microbe-Lift Thera P',
        brand: 'Microbe-Lift',
        description: 'Bacterias beneficiosas para mejorar la salud de los peces y la calidad del agua en acuarios.',
        use: 'Acondicionadores',
        details: [
            'Promueve la salud de los peces mediante bacterias beneficiosas.',
            'Mejora la calidad del agua y reduce el estrés en los peces.',
            'Ayuda a controlar olores y estabilizar el ciclo del nitrógeno.',
            'Seguro para peces, plantas y corales.'
        ]
    },
    {
        id: 5,
        image: 'https://tienda.pzes.es/media/catalog/product/cache/2c6d97f21e5b8a1a997f50dfac7129ad/t/i/tidal-caracteristicas-filtro-mochila-skimmer-pzes.webp',
        title: 'Filtro de Mochila Seachem Tidal',
        brand: 'Seachem',
        description: 'Filtro de mochila (hang-on) con características premium como skimmer de superficie, bomba autocebante y gran capacidad para material filtrante.',
        use: 'Filtración',
        details: [
            'Skimmer de superficie integrado para un agua cristalina.',
            'Bomba autocebante que no requiere rellenado manual tras un corte de luz.',
            'Alerta de mantenimiento que avisa cuando el filtro necesita limpieza.',
            'Disponible en varios tamaños (Tidal 35, 55, 75, 110).',
        ]
    },
    {
        id: 6,
        image: 'https://pezverde.es/tienda/img/cms/Captura%20de%20pantalla%202024-07-09%20a%20las%2013-14-35.png',
        title: 'Filtro Exterior Oase BioMaster',
        brand: 'Oase',
        description: 'Filtro exterior (canister) de alta gama con un innovador módulo de prefiltro extraíble para una limpieza cómoda y rápida.',
        use: 'Filtración',
        details: [
            'Prefiltro EasyClean para un mantenimiento sencillo sin desmontar el filtro.',
            'Alto volumen de filtración biológica con esponjas y Hel-X.',
            'Disponible en versión Thermo con calentador integrado.',
            'Modelos para acuarios desde 250 hasta 850 litros.',
        ]
    },
    {
        id: 7,
        image: 'https://pezverde.es/tienda/4626/filtro-externo-aquael-ultramax-1500.jpg',
        title: 'Filtro Exterior Aquael Ultramax',
        brand: 'Aquael',
        description: 'Filtro exterior potente y eficiente que destaca por su gran capacidad para material filtrante y un prefiltro integrado en la tapa.',
        use: 'Filtración',
        details: [
            'Prefiltro de 1.9L integrado en la tapa para una limpieza frecuente y sencilla.',
            'Mecanismo de autocebado y un funcionamiento muy silencioso.',
            'Gran volumen para filtración biológica y mecánica.',
            'Gama con modelos de hasta 2000 L/h (1000, 1500, 2000).',
        ]
    },
    {
        id: 8,
        image: 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQahMQMoJ0WkI9NmI7TRepkb9Mb1HOE9ybkRLYPJZaBuFqqPSuM5hB5m8e8ArH7QdgSM9ucrKQ7iYySgfOHI62Uk5h5y8rJwqNif2aFlIFv',
        title: 'Filtro Exterior Eheim Professional',
        brand: 'Eheim',
        description: 'Un filtro legendario, conocido por su fiabilidad, durabilidad y simplicidad. Una opción robusta que ha demostrado su eficacia durante décadas.',
        use: 'Filtración',
        details: [
            'Diseño simple y extremadamente fiable, sin mecanismos complejos.',
            'Bajo consumo energético y funcionamiento silencioso.',
            'Todos los componentes, como el anillo de silicona, son de alta durabilidad.',
            'Modelos icónicos disponibles (2213, 2215, 2217) para acuarios de distintos tamaños.',
        ]
    },
    {
        id: 9,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtavroaur_M5G0iZqFyFizBKBtdWEjvgSK0g&s',
        title: 'Filtro Exterior JBL CristalProfi',
        brand: 'JBL',
        description: 'Filtro exterior de alta eficiencia energética con un gran volumen de prefiltrado para reducir la frecuencia de limpieza del material principal.',
        use: 'Filtración',
        details: [
            'Muy bajo consumo eléctrico gracias a su gama "greenline".',
            'Gran superficie de prefiltrado de fácil acceso en la parte superior.',
            'Completamente equipado y listo para conectar.',
            'Disponible en varios modelos para acuarios de 40 a 700 litros (e402, e702, etc.).',
        ]
    },
    {
        id: 10,
        image: 'https://pezverde.es/tienda/4130-thickbox_default/chihiros-wrgb-2-pro-30cm.jpg',
        title: 'Pantalla LED Chihiros WRGB II',
        brand: 'Chihiros',
        description: 'Pantalla LED de alto rendimiento para acuarios plantados, con control total del espectro y la intensidad a través de una aplicación móvil.',
        use: 'Iluminación',
        details: [
            'Controlador Bluetooth integrado para programar desde la app "My Chihiros".',
            'Espectro de luz RGB optimizado para resaltar los colores de peces y plantas.',
            'Permite simular amaneceres y atardeceres.',
            'Diseño de alta calidad con una excelente disipación del calor.',
        ]
    },
    {
        id: 11,
        image: 'https://www.tropiacuariumbilbao.com/contents/media/l_twinstar%20light%20600es%20b.jpg',
        title: 'Pantalla LED Twinstar Light E-Series',
        brand: 'Twinstar',
        description: 'Pantalla LED premium para aquascaping, diseñada para ofrecer un espectro de luz que reproduce los colores de forma increíblemente viva y natural.',
        use: 'Iluminación',
        details: [
            'Tecnología LED RGB-W para un espectro lumínico completo.',
            'Realza los tonos verdes y rojos de las plantas de forma espectacular.',
            'Diseño elegante y minimalista con soportes de acrílico o metálicos.',
            'Ideal para un crecimiento saludable y compacto de las plantas.',
        ]
    },
    {
        id: 12,
        image: 'https://pezverde.es/tienda/4345-large_default/aquario-neo-v-1000ml.jpg',
        title: 'Acondicionador Aquario Neo V',
        brand: 'Aquario',
        description: 'Tratamiento concentrado para el agua que contiene vitaminas y elementos esenciales para activar la filtración biológica y proteger a los peces.',
        use: 'Acondicionadores',
        details: [
            'Contiene vitaminas y aminoácidos que reducen el estrés de los peces.',
            'Activa las bacterias beneficiosas del filtro y sustrato.',
            'Ayuda a mejorar la vitalidad y el apetito de los habitantes del acuario.',
            'Ideal para el arranque de acuarios y después de cada cambio de agua.',
        ]
    },
    {
        id: 13,
        image: 'https://aquarioiberia.com/wp-content/uploads/2022/12/neoSolution.jpg',
        title: 'Abonos Aquario Neo Solution',
        brand: 'Aquario',
        description: 'Sistema de abonado líquido de dos partes (macros y micros) diseñado para un uso sencillo y eficaz en acuarios plantados de cualquier tipo.',
        use: 'Abonos',
        details: [
            'Sistema simple: Solution 1 para macronutrientes (NPK) y Solution 2 para micros y hierro.',
            'Formulado para un crecimiento saludable y una coloración intensa.',
            'Dosificación sencilla mediante un sistema de pulsaciones (pumps).',
            'Disponible también una versión K para acuarios con muchos peces.',
        ]
    },
    {
        id: 14,
        image: 'https://static.zoomalia.com/cdn-cgi/image/width=800,height=800/prod_img/46554/xl_6439b698eb3105bd82528f23d0c92dedfc01537449573.jpg',
        title: 'Abonos Tropica Specialised & Premium',
        brand: 'Tropica',
        description: 'Línea de abonado de la prestigiosa marca danesa. Premium para acuarios con pocos requisitos o muchos peces, y Specialised para acuarios muy plantados.',
        use: 'Abonos',
        details: [
            'Premium Nutrition: Contiene hierro y micronutrientes (sin Nitrógeno ni Fósforo).',
            'Specialised Nutrition: Abono completo con todos los macro y micronutrientes.',
            'Fórmulas muy estudiadas y de alta calidad.',
            'Dosificación semanal sencilla recomendada por el fabricante.',
        ]
    },
    {
        id: 15,
        image: 'https://www.acuarioplantado.com/13822-large_default/azoo-plant-premium-plus-120ml.jpg',
        title: 'Abono AZOO Plant Premium',
        brand: 'AZOO',
        description: 'Abono líquido todo en uno que proporciona un completo balance de nutrientes para el crecimiento y la coloración de las plantas acuáticas.',
        use: 'Abonos',
        details: [
            'Contiene macronutrientes, micronutrientes y oligoelementos en una sola botella.',
            'Fórmula quelatada para una máxima absorción de los nutrientes.',
            'Ayuda a potenciar los colores rojos y púrpuras de las plantas.',
            'Diseñado para prevenir la aparición de algas por desequilibrios.',
        ]
    },
    {
        id: 16,
        image: 'https://www.adana.co.jp/userfiles/elfinder/%E3%83%8B%E3%83%A5%E3%83%BC%E3%82%B9%E3%83%AA%E3%83%AA%E3%83%BC%E3%82%B9_JP/20170210_news.jpg',
        title: 'Sistema de Abonos ADA Brighty',
        brand: 'Aqua Design Amano',
        description: 'Sistema de abonado líquido de alta gama, parte del ecosistema de productos de ADA para crear un "Nature Aquarium" equilibrado y estético.',
        use: 'Abonos',
        details: [
            'Sistema modular con diferentes botellas para cada nutriente (K, Nitrogen, Mineral, Iron).',
            'Diseñado para complementar perfectamente los sustratos ADA Aqua Soil.',
            'Fórmulas de muy alta pureza para un control preciso.',
            'Packaging y dosificadores de alta calidad, acordes a la filosofía de la marca.',
        ]
    },
    {
        id: 17,
        image: 'https://www.acuarioplantado.com/446-large_default/seachem-flourish-250ml.jpg',
        title: 'Línea de Abonos Seachem Flourish',
        brand: 'Seachem',
        description: 'Gama completa y modular de suplementos que permite a los acuaristas avanzados abonar cada nutriente por separado según las necesidades de su acuario.',
        use: 'Abonos',
        details: [
            'Permite un control total al dosificar cada elemento individualmente.',
            'Componentes principales: Flourish (micros), Nitrogen, Phosphorus, Potassium, Iron.',
            'Incluye Flourish Excel, una fuente de carbono orgánico líquido.',
            'Ideal para corregir deficiencias específicas y ajustar el abonado con precisión.',
        ]
    }
];