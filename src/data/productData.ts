// data/productData.ts

export interface Product {
    id: number;
    image: string;
    title: string;
    brand: string;
    description: string;
    use: 'Alimentación' | 'Filtración' | 'Acondicionadores' | 'Decoración' | 'Iluminación' | 'Sustratos' | 'Calefacción';
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
    }
];