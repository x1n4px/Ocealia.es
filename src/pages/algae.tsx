import React, { useState, useEffect } from 'react';
import {
    Droplets,
    Search,
    AlertTriangle,
    CheckCircle,
    Eye,
    Lightbulb,
    X,
    Info, // Añadido para 'Impacto' o información adicional
    ImageIcon, // Añadido para la descripción visual
    HandCoins // O cualquier otro ícono que represente consejos/advertencias
} from 'lucide-react';

// Interfaces y tipos (sin cambios)
interface Family {
    id: string;
    name: string;
    color: string;
}

interface Alga {
    id: number;
    name: string;
    family: string;
    scientificName: string;
    image: string;
    difficulty: 'Fácil' | 'Moderado' | 'Difícil' | 'Muy Difícil';
    description: string;
    visualDescription?: string; // Nuevo campo para descripción visual
    impact?: string; // Nuevo campo para el impacto
    causes: string[];
    solutions: string[];
    prevention: string;
    dangerLevel: 'Muy Bajo' | 'Bajo' | 'Medio' | 'Alto' | 'Muy Alto';
    warnings?: string[]; // Nuevo campo para advertencias
}

type DifficultyLevel = 'Fácil' | 'Moderado' | 'Difícil' | 'Muy Difícil';
type DangerLevel = 'Muy Bajo' | 'Bajo' | 'Medio' | 'Alto' | 'Muy Alto';

const AlgasGuide: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [selectedFamily, setSelectedFamily] = useState<string>('todas');
    const [selectedAlga, setSelectedAlga] = useState<Alga | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const families: Family[] = [
        { id: 'todas', name: 'Todas las Familias', color: 'gray' },
        { id: 'verdes', name: 'Algas Verdes', color: 'green' },
        { id: 'marrones', name: 'Algas Marrones', color: 'yellow' },
        { id: 'azules', name: 'Cianobacterias', color: 'blue' },
        { id: 'rojas', name: 'Algas Rojas', color: 'red' },
        { id: 'filamentosas', name: 'Algas Filamentosas', color: 'emerald' }
    ];

    // Datos de algas mejorados con los nuevos campos
    const algas: Alga[] = [
        {
            id: 1,
            name: 'Algas Verdes en Cristal',
            family: 'verdes',
            scientificName: 'Chlorophyta spp.',
            image: 'https://www.nascapers.es/wp-content/uploads/2023/02/alga-punto-verde-acuarios-nascapers.webp',
            difficulty: 'Fácil',
            description: 'Película verde que se forma en cristales y decoraciones. Es la más común y generalmente indica un acuario saludable en pequeñas cantidades.',
            visualDescription: 'Aparece como puntos o una fina capa verde brillante adherida fuertemente a las superficies de cristal y la decoración. No se desprende fácilmente al frotar.',
            impact: 'Generalmente inofensivas y un signo de un acuario maduro. Un exceso puede ser antiestético y competir por nutrientes si la cantidad es masiva.',
            causes: [
                'Exceso de luz directa o muy intensa',
                'Niveles altos de fosfatos y nitratos',
                'Falta de plantas competidoras',
                'Desequilibrio en la fertilización'
            ],
            solutions: [
                'Reducir las horas de iluminación (6-8 horas y no más de 10)',
                'Limpiar cristales semanalmente con rasqueta (se recomiendan las de hoja de afeitar)',
                'Aumentar plantas de crecimiento rápido (ej. Hygrophila polysperma, Egeria densa)',
                'Realizar cambios de agua más frecuentes (25-30% semanal)',
                'Revisar sobrealimentación (alimentar solo lo que los peces consuman en 2-3 minutos)'
            ],
            prevention: 'Mantener un equilibrio adecuado entre luz, nutrientes (N, P, K) y CO₂.',
            dangerLevel: 'Bajo',
            warnings: ['Una limpieza regular previene su acumulación.']
        },
        {
            id: 2,
            name: 'Algas Marrones (Diatomeas)',
            family: 'marrones',
            scientificName: 'Bacillariophyta',
            image: 'https://pezverde.es/tienda/img/cms/Captura%20de%20pantalla%202020-03-19%20a%20las%203-49-42.png',
            difficulty: 'Fácil',
            description: 'Capa marrón polvorienta que cubre plantas, sustrato y decoraciones. Común en acuarios nuevos durante las primeras semanas.',
            visualDescription: 'Una capa fina y resbaladiza de color marrón que se asienta sobre todas las superficies del acuario, incluyendo hojas de plantas, sustrato y decoración. Se desprende fácilmente al frotar con los dedos.',
            impact: 'Son un signo de un acuario inmaduro y suelen desaparecer a medida que el acuario cicla. Raramente son perjudiciales pero pueden ser antiestéticas.',
            causes: [
                'Acuario en proceso de maduración (ciclo del nitrógeno)',
                'Acuarios viejos (acumulación de silicatos)',
                'Iluminación insuficiente o antigua (espectro inadecuado)',
                'Falta de CO2 (ralentiza el crecimiento de plantas)',
                'Exceso de silicatos en el agua (por el agua del grifo o sustratos)',
                'Falta de competencia de plantas (crecimiento lento de plantas)'
            ],
            solutions: [
                'Aspirar el sustrato regularmente con un sifón.',
                'Mejorar la iluminación (reemplazar bombillas antiguas, ajustar espectro LED).',
                'Usar filtro de silicatos si el problema es persistente y el agua de grifo es la causa.',
                'Introducir caracoles neritina o otocinclus (limpiadores de algas).'
            ],
            prevention: 'Una limpieza regular y un mantenimiento adecuado del acuario, especialmente en las primeras semanas de montaje. Asegurar buena circulación.',
            dangerLevel: 'Muy Bajo',
            warnings: ['Las diatomeas suelen ser autolimitantes y desaparecen solas cuando el acuario madura.']
        },
        {
            id: 3,
            name: 'Cianobacterias (Algas Azul-Verdes)',
            family: 'azules',
            scientificName: 'Cyanobacteria',
            image: 'https://pezverde.es/tienda/img/cms/Captura%20de%20pantalla%202020-03-19%20a%20las%203-45-41.png',
            difficulty: 'Difícil',
            description: 'Manta gelatinosa azul-verdosa con olor desagradable. Son bacterias, no algas verdaderas. Muy persistentes y tóxicas.',
            visualDescription: 'Forma una capa de color azul-verde oscuro a negro, resbaladiza y con apariencia de fango, que cubre el sustrato, las plantas y la decoración. Emite un olor fuerte y desagradable a "tierra húmeda" o "moho".',
            impact: 'Pueden ser muy perjudiciales, liberando toxinas que afectan a peces y plantas. Compiten agresivamente por nutrientes y luz, asfixiando a las plantas.',
            causes: [
                'Mala circulación del agua (zonas estancadas)',
                'Exceso de materia orgánica (restos de comida, hojas muertas)',
                'Iluminación excesiva o espectro incorrecto (luz roja y azul favorecen su crecimiento)',
                'Desequilibrio de nutrientes (especialmente bajo nitrato y alto fosfato)',
                'pH demasiado alto',
                'Exceso de fósforo en relación con el nitrógeno'
            ],
            solutions: [
                'Mejorar la circulación con bombas adicionales o reubicar salidas de filtro.',
                'Sifonear las áreas afectadas a diario para eliminar manualmente.',
                'Tratamiento con antibióticos específicos (eritromicina, solo bajo supervisión).',
                'Blackout de 3-4 días (cubrir el acuario completamente sin luz, suspender CO2 y fertilizantes).',
                'Revisión completa de parámetros del agua y ajuste de nitratos/fosfatos.',
                'Productos específicos como Seachem Excel (dosis doble por unos días) o ChemiClean.'
            ],
            prevention: 'Excelente circulación en todo el acuario y limpieza rigurosa del fondo y filtros. Evitar la sobrealimentación y mantener el equilibrio de nutrientes (Redfield Ratio).',
            dangerLevel: 'Muy Alto',
            warnings: ['Algunas cianobacterias pueden liberar toxinas. Evita el contacto directo sin guantes. El blackout es una solución drástica pero efectiva.', 'Los tratamientos con antibióticos pueden afectar la bacteria nitrificante del filtro.']
        },
        {
            id: 4,
            name: 'Algas Filamentosas Verdes',
            family: 'filamentosas',
            scientificName: 'Spirogyra, Cladophora',
            image: 'https://pezverde.es/tienda/img/cms/Captura%20de%20pantalla%202020-03-19%20a%20las%203-30-20.png',
            difficulty: 'Moderado',
            description: 'Son hilos largos, finos y verdes que forman masas densas. Muy comunes en acuarios plantados con buenos niveles de luz y nutrientes.',
            visualDescription: 'Hilos verdes largos y delgados que pueden ser suaves al tacto (Spirogyra) o más rígidos y ramificados (Cladophora). Forman "barbas" o "telarañas" que se adhieren a plantas, decoración y sustrato. Pueden alcanzar varios centímetros de longitud.',
            impact: 'Compiten directamente con las plantas por los nutrientes y la luz, pudiendo asfixiarlas si la proliferación es masiva. Indican un desequilibrio en el acuario.',
            causes: [
                'Exceso de luz o iluminación inadecuada (espectro o duración)',
                'Altos niveles de nitratos y fosfatos (desequilibrio de nutrientes)',
                'Falta de CO2 (limita el crecimiento de plantas superiores)',
                'Mala circulación del agua (no distribuye bien los nutrientes)',
                'Sobrepoblación o sobrealimentación'
            ],
            solutions: [
                'Reducir la duración o intensidad de la luz.',
                'Ajustar la inyección de CO2 para alcanzar 25-30 ppm.',
                'Realizar cambios de agua grandes y frecuentes (50% cada 2-3 días).',
                'Eliminar manualmente con un cepillo de dientes o girándolas con un palo.',
                'Introducir peces come algas (ej. Otocinclus, Siamesa Flying Fox).',
                'Dosis de Seachem Excel directamente sobre las algas con una jeringa.',
                'Plantas de crecimiento rápido para competir por nutrientes.'
            ],
            prevention: 'Mantener un equilibrio entre luz, CO2 y nutrientes. Realizar cambios de agua regulares y evitar la sobrealimentación.',
            dangerLevel: 'Medio',
            warnings: ['Pueden ser difíciles de erradicar completamente una vez establecidas. La paciencia y la consistencia son clave.']
        },
        {
            id: 5,
            name: 'Algas Negras (Barba Negra)',
            family: 'rojas',
            scientificName: 'Audouinella, Compsopogon',
            image: 'https://pezverde.es/tienda/img/cms/Captura%20de%20pantalla%202020-03-19%20a%20las%203-34-16.png',
            difficulty: 'Muy Difícil',
            description: 'Mechones negros o gris oscuro que se adhieren fuertemente a plantas y decoraciones. Muy difíciles de eliminar.',
            visualDescription: 'Pequeños mechones o "barbas" de color negro, gris oscuro o morado que crecen en los bordes de las hojas de las plantas, la decoración, las rocas y los equipos. Son duras al tacto y difíciles de quitar.',
            impact: 'Extremadamente persistentes y antiestéticas. Pueden asfixiar a las plantas si cubren sus hojas. Indican un desequilibrio severo en el acuario.',
            causes: [
                'Exceso de hierro o fosfatos (desequilibrio en micronutrientes)',
                'Ausencia o fluctuación inestable de CO₂',
                'Altos valores de KH (búfer de pH que dificulta la absorción de CO2)',
                'Corriente excesiva en áreas específicas',
                'Desequilibrio de nutrientes general, especialmente en acuarios de plantas'
            ],
            solutions: [
                'Estabilizar la inyección de CO₂ (mantener un nivel constante de 25-30 ppm).',
                'Podar las hojas de plantas severamente afectadas.',
                'Tratamiento con Seachem Excel o gluteraldehído líquido (dosis directa con jeringa sobre las algas, apagando el filtro por 15-20 min).',
                'Tratamiento externo: si las piezas son extraíbles, sumergirlas en una solución diluida de lejía (1:20 por 2-3 min) o Excel antes de enjuagar bien y volver a introducir.',
                'Aumentar la competencia de plantas de crecimiento rápido.',
                'Considerar el pez Zorro Volador Siamesa (Crossocheilus siamensis) en acuarios adecuados.'
            ],
            prevention: 'Mantener un CO₂ estable, corrientes moderadas y equilibrar los parámetros del agua y los nutrientes. Evitar cambios bruscos.',
            dangerLevel: 'Muy Alto',
            warnings: ['El tratamiento con lejía o gluteraldehído debe hacerse con extrema precaución para no dañar peces o plantas. La paciencia es fundamental para erradicarlas.']
        },
        {
            id: 6,
            name: 'Algas Punto Verde',
            family: 'verdes',
            scientificName: 'Choleochaete',
            image: 'https://pezverde.es/tienda/img/cms/Captura%20de%20pantalla%202020-03-19%20a%20las%203-14-15.png',
            difficulty: 'Moderado',
            description: 'Pequeños puntos verdes duros que se adhieren fuertemente a cristales y hojas de plantas. Resistentes al raspado.',
            visualDescription: 'Puntos pequeños, duros y de color verde oscuro que aparecen principalmente en el cristal del acuario y en las hojas más viejas de las plantas de crecimiento lento.',
            impact: 'Son un signo de bajo fosfato o desequilibrio de nutrientes. Aunque no son peligrosas, un exceso es antiestético y puede cubrir las plantas.',
            causes: [
                'Exceso de luz intensa o períodos de luz muy largos',
                'Niveles de fosfato y/o CO2 bajos',
                'Niveles altos de nitratos (desequilibrio N/P)'
            ],
            solutions: [
                'Reducir intensidad lumínica o la duración del fotoperíodo.',
                'Usar una rasqueta de metal o cuchilla de afeitar para los cristales.',
                'Valorar agregar fosfatos (dosis controladas) al acuario si los niveles son indetectables.',
                'Ajustar niveles de CO₂ para asegurar que las plantas crezcan bien.',
                'Caracol cebra (Neritina natalensis) es muy efectivo para su control.'
            ],
            prevention: 'Luz moderada y nutrientes equilibrados, prestando especial atención a los fosfatos. Mantener el CO2 en niveles óptimos.',
            dangerLevel: 'Bajo',
            warnings: ['Son muy difíciles de raspar de las plantas sin dañarlas.']
        },
        {
            id: 7,
            name: 'Algas Pelusa Verde',
            family: 'verdes',
            scientificName: 'Oedogonium',
            image: 'https://pezverde.es/tienda/img/cms/Captura%20de%20pantalla%202020-03-19%20a%20las%203-23-52.png',
            difficulty: 'Moderado',
            description: 'El Alga pelusa son hilos de algas delgados de solo un par de milímetros situados principalmente en las hojas de las plantas.',
            visualDescription: 'Hilos muy finos, cortos y suaves, de color verde claro, que forman una pelusa o vello sobre las hojas de las plantas y la decoración. Se desprenden fácilmente con un dedo.',
            impact: 'Indican desequilibrio lumínico o de CO2. No son altamente dañinas, pero pueden volverse antiestéticas y competir por nutrientes.',
            causes: [
                'Exceso de luz intensa o fotoperíodo demasiado largo',
                'Niveles de CO2 bajos o fluctuantes',
                'Desequilibrio en la fertilización (falta de macro o micronutrientes)'
            ],
            solutions: [
                'Reducir intensidad lumínica o la duración del fotoperíodo (6-8 horas).',
                'Ajustar niveles de CO₂ para alcanzar 25-30 ppm.',
                'Aplicación de Seachem Excel directamente sobre las algas.',
                'Productos específicos como Azoo Algae Away.'
            ],
            prevention: 'Luz moderada y un suministro de CO2 estable y adecuado. Mantener un buen equilibrio de nutrientes para las plantas.',
            dangerLevel: 'Bajo',
            warnings: ['Controlar la iluminación y el CO2 es clave para su eliminación.']
        },
        {
            id: 8,
            name: 'Alga Barba Verde',
            family: 'verdes',
            scientificName: 'Oedogonium',
            image: 'https://pezverde.es/tienda/img/cms/Captura%20de%20pantalla%202020-03-19%20a%20las%203-30-20.png', // Misma imagen que filamentosas, considerar si es correcto o si hay una más específica.
            difficulty: 'Moderado',
            description: 'El alga barba verde o filamentosa no es más que una forma más agresiva de alga pelusa verde. Los delgados hilos de la misma son bastante más largos y más viscosos que en la primera. Puede crecer y formar una capa verde densa en su superficie.',
            visualDescription: 'Hilos más largos y gruesos que la pelusa verde, formando densas "barbas" o mechones de color verde oscuro, especialmente en plantas y decoración. Se sienten más viscosos al tacto.',
            impact: 'Similar a las filamentosas, compiten con las plantas y pueden sofocarlas si no se controlan. Indican desequilibrios persistentes.',
            causes: [
                'Niveles de CO2 bajos o inconsistentes',
                'Exceso de luz',
                'Desequilibrio de nutrientes, especialmente nitratos y fosfatos.',
                'Circulación de agua inadecuada.'
            ],
            solutions: [
                'Reducir intensidad lumínica y ajustar el fotoperíodo.',
                'Ajustar niveles de CO₂ y asegurar una distribución uniforme.',
                'Aplicación de Seachem Excel (gluteraldehído líquido).',
                'Productos como Azoo Algae Away.',
                'Introducir Zorro Volador Siamesa (Crossocheilus siamensis) si el tamaño del acuario lo permite.'
            ],
            prevention: 'Luz moderada, CO2 estable y nutrientes equilibrados. Buen mantenimiento general del acuario.',
            dangerLevel: 'Medio',
            warnings: ['Requiere un enfoque más agresivo que la pelusa verde. La erradicación puede llevar tiempo.']
        },
        {
            id: 9,
            name: 'Alga Asta de Ciervo',
            family: 'rojas',
            scientificName: 'Compsopogon',
            image: 'https://pezverde.es/tienda/img/cms/Captura%20de%20pantalla%202020-03-19%20a%20las%203-40-43.png',
            difficulty: 'Moderado',
            description: 'Son de color gris claro y tienen forma de coral o asta de ciervo. Suelen aparecer en los bordes de las hojas. Le gustan las áreas más cercanas a la superficie. Se adhiere con fuerza pero si adquiere cierto tamaño se pueden arrancar con relativa facilidad.',
            visualDescription: 'Crecimientos ramificados, rígidos y de color gris verdoso a casi negro, que recuerdan a las astas de ciervo o pequeños corales. Se adhieren firmemente a los bordes de las hojas de las plantas y a la decoración, especialmente en zonas de corriente moderada.',
            impact: 'Son antiestéticas y pueden afectar la fotosíntesis de las plantas al cubrirlas. Indican inestabilidad en el acuario.',
            causes: [
                'Altos niveles de amoníaco (indicador de un ciclo de nitrógeno inestable)',
                'Bajo flujo de agua en ciertas zonas (permite su asentamiento)',
                'Desequilibrio de nutrientes (especialmente potasio o micronutrientes)',
                'Fluctuaciones en el CO2 o niveles muy bajos.'
            ],
            solutions: [
                'Corte las hojas de plantas infectadas si la infestación es severa.',
                'Aplicación de Seachem Excel directamente sobre las algas con una jeringa, apagando el filtro por 15-20 min.',
                'Asegurar una buena filtración y circulación en todo el acuario.',
                'Realizar cambios de agua para reducir amoníaco y otros contaminantes.',
                'Revisar y estabilizar la inyección de CO2.',
                'Introducir peces come algas (ej. Zorro Volador Siamesa, Amano shrimp) en acuarios adecuados.'
            ],
            prevention: 'Mantener un acuario bien equilibrado con buena circulación, niveles estables de CO2 y nutrientes. Evitar picos de amoníaco.',
            dangerLevel: 'Medio',
            warnings: ['Son más fáciles de eliminar manualmente que las algas barba negra, pero requieren constancia.']
        },
        {
            id: 10,
            name: 'Agua Verde (Alga Unicelular)',
            family: 'verdes',
            scientificName: 'Chlorella, Euglena, etc.',
            image: 'https://pezverde.es/tienda/img/cms/Captura%20de%20pantalla%202020-03-19%20a%20las%203-57-07.png',
            difficulty: 'Difícil',
            description: 'El agua verde es causada por algas flotantes microscópicas que tiñen el agua de un color verdoso. Su expansión es muy rápida.',
            visualDescription: 'El agua del acuario se vuelve opaca y adquiere una coloración verde intensa, como si alguien hubiera vertido pintura verde. La visibilidad dentro del acuario se reduce drásticamente.',
            impact: 'Aunque no es directamente tóxica para los peces, reduce la visibilidad y puede consumir oxígeno durante la noche, poniendo en riesgo a los habitantes. Indica un exceso masivo de nutrientes y luz.',
            causes: [
                'Altos niveles de amoníaco o nitritos (ciclo inestable, sobrealimentación)',
                'Exceso de luz (luz solar directa, fotoperíodo muy largo)',
                'Bajo flujo de agua (no distribuye nutrientes ni filtrado)',
                'Desequilibrio de nutrientes (especialmente nitratos y fosfatos muy altos)',
                'Filtración insuficiente o inmadura.'
            ],
            solutions: [
                'Mejorar la calidad del agua con cambios de agua grandes y frecuentes (50% diario) y limpieza del filtro.',
                'Apagón de luz durante 3-4 días (cubrir completamente el acuario y apagar las luces). Asegurar aireación.',
                'Aumentar aireación con una bomba de aire durante el apagón.',
                'Uso de un clarificador UV-C (esterilizador UV) en el filtro.',
                'Productos floculantes como Green Water Remover de Azoo, que aglomeran las partículas para ser filtradas.',
                'Introducir una gran cantidad de plantas flotantes (ej. lenteja de agua) para absorber nutrientes.'
            ],
            prevention: 'Controlar estrictamente la luz solar directa. Mantener la luz artificial en un fotoperíodo adecuado (6-8 horas). No sobrealimentar. Realizar cambios de agua regulares. Asegurar un filtrado eficiente.',
            dangerLevel: 'Medio',
            warnings: ['Durante el apagón de luz, asegúrate de que haya suficiente oxígeno para los peces. Un UV-C es la solución más efectiva a largo plazo.']
        }
    ];


    const filteredAlgas: Alga[] = algas.filter(alga => {
        const matchesSearch = alga.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            alga.scientificName.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFamily = selectedFamily === 'todas' || alga.family === selectedFamily;
        return matchesSearch && matchesFamily;
    });

    const openModal = (alga: Alga): void => {
        setSelectedAlga(alga);
        setIsModalOpen(true);
    };

    const closeModal = (): void => {
        setIsModalOpen(false);
        setSelectedAlga(null);
    };

    const getDifficultyColor = (difficulty: DifficultyLevel): string => {
        switch (difficulty) {
            case 'Fácil': return 'text-green-700 bg-green-100'; // Ajuste de tonos para mejor contraste
            case 'Moderado': return 'text-yellow-700 bg-yellow-100';
            case 'Difícil': return 'text-orange-700 bg-orange-100';
            case 'Muy Difícil': return 'text-red-700 bg-red-100';
            default: return 'text-gray-700 bg-gray-100';
        }
    };

    const getDangerColor = (level: DangerLevel): string => {
        switch (level) {
            case 'Muy Bajo': return 'text-green-700 bg-green-100';
            case 'Bajo': return 'text-blue-700 bg-blue-100';
            case 'Medio': return 'text-yellow-700 bg-yellow-100';
            case 'Alto': return 'text-orange-700 bg-orange-100';
            case 'Muy Alto': return 'text-red-700 bg-red-100';
            default: return 'text-gray-700 bg-gray-100';
        }
    };

    const getFamilyColorClass = (family: string): string => {
        const familyData = families.find(f => f.id === family);
        if (!familyData) return 'bg-gray-100 text-gray-700'; // Default
        // Ajustar clases Tailwind CSS para que coincidan con los colores definidos
        switch (familyData.color) {
            case 'green': return 'bg-green-100 text-green-700 hover:bg-green-200';
            case 'yellow': return 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200';
            case 'blue': return 'bg-blue-100 text-blue-700 hover:bg-blue-200';
            case 'red': return 'bg-red-100 text-red-700 hover:bg-red-200';
            case 'emerald': return 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200';
            default: return 'bg-gray-100 text-gray-700 hover:bg-gray-200';
        }
    };


    useEffect(() => {
        if (isModalOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isModalOpen]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 font-sans">
            {/* Header */}
            <div className="bg-white/95 backdrop-blur-sm shadow-lg border-b border-blue-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
                            <span className="bg-gradient-to-r from-green-600 via-blue-600 to-green-800 bg-clip-text text-transparent">
                                Guía Completa de Algas en Acuarios
                            </span>
                        </h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                            Identifica, comprende y controla las algas indeseadas en tu acuario.
                            Explora sus características, causas y las soluciones más efectivas
                            para mantener un ecosistema acuático sano y vibrante.
                        </p>
                        {/* Attribution - Más prominente */}
                        <p className="text-sm text-gray-500 mt-4">
                            Datos extraídos y adaptados de: <a href="https://pezverde.es/tienda/content/7-como-eliminar-las-algas-del-acuario" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline hover:text-blue-700 transition-colors duration-200">pezverde.es</a>
                        </p>
                    </div>

                    <div className="flex justify-center items-center col-span-full mt-6">
                        <button
                            onClick={() => window.history.back()} // Mejorar para volver a la página anterior
                            className="inline-flex items-center px-6 py-3 bg-gray-100 text-gray-800 rounded-xl font-semibold shadow-md hover:bg-gray-200 transition-all duration-200 text-lg"
                        >
                            Volver al menú principal
                        </button>
                    </div>
                </div>
            </div>

            {/* --- */}

            {/* Search and Filter Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-blue-100 p-6 mb-8">
                    <div className="flex flex-col lg:flex-row gap-6 mb-6">
                        {/* Search Bar */}
                        <div className="flex-1">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    placeholder="Buscar algas por nombre o nombre científico..."
                                    value={searchTerm}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 text-gray-700"
                                />
                            </div>
                        </div>

                        {/* Family Filter Dropdown */}
                        <div className="lg:w-64">
                            <select
                                value={selectedFamily}
                                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedFamily(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 appearance-none bg-white text-gray-700 pr-10"
                                style={{
                                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='%236B7280'%3E%3Cpath fill-rule='evenodd' d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z' clip-rule='evenodd'/%3E%3C/svg%3E")`,
                                    backgroundRepeat: 'no-repeat',
                                    backgroundPosition: 'right 0.75rem center',
                                    backgroundSize: '1.5em 1.5em'
                                }}
                            >
                                {families.map((family: Family) => (
                                    <option key={family.id} value={family.id}>
                                        {family.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Family Pills - Mejoradas */}
                    <div className="flex flex-wrap gap-3 mt-4">
                        {families.map((family: Family) => (
                            <button
                                key={family.id}
                                onClick={() => setSelectedFamily(family.id)}
                                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 shadow-sm
                                ${selectedFamily === family.id
                                        ? `${getFamilyColorClass(family.id)} ring-2 ring-offset-1 ring-${family.color}-300` // Anillo para selección
                                        : `bg-gray-100 text-gray-600 hover:bg-gray-200` // Cambio de color al pasar el ratón
                                    }`}
                            >
                                {family.name}
                            </button>
                        ))}
                    </div>
                </div>

                {/* --- */}

                {/* Results Count */}
                <div className="mb-8 text-center sm:text-left">
                    <p className="text-lg text-gray-700">
                        Mostrando <span className="font-bold text-blue-700">{filteredAlgas.length}</span> tipos de algas
                    </p>
                </div>

                {/* Algas Grid - Imágenes más grandes en las tarjetas */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredAlgas.map((alga: Alga) => (
                        <div
                            key={alga.id}
                            className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300 group cursor-pointer transform hover:-translate-y-1"
                            onClick={() => openModal(alga)}
                        >
                            <div className="relative p-4 bg-gradient-to-br from-blue-50 to-green-50 flex justify-center items-center h-48 overflow-hidden">
                                <img
                                    src={alga.image}
                                    alt={alga.name}
                                    className="object-contain w-full h-full transform group-hover:scale-105 transition-transform duration-300"
                                />
                                <div className="absolute top-4 right-4 flex flex-col gap-2">
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(alga.difficulty)} shadow-sm`}>
                                        {alga.difficulty}
                                    </span>
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getDangerColor(alga.dangerLevel)} shadow-sm`}>
                                        Peligro: {alga.dangerLevel}
                                    </span>
                                </div>
                            </div>

                            {/* Card Content */}
                            <div className="p-6">
                                <h3 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-blue-700 transition-colors leading-tight">
                                    {alga.name}
                                </h3>
                                <p className="text-sm text-gray-500 italic mb-4">{alga.scientificName}</p>

                                <div className={`inline-flex items-center px-4 py-2 rounded-full text-xs font-medium ${getFamilyColorClass(alga.family)} shadow-sm`}>
                                    <Droplets className="w-3.5 h-3.5 mr-2" />
                                    {families.find((f: Family) => f.id === alga.family)?.name}
                                </div>

                                <p className="text-gray-600 text-base mt-4 mb-5 line-clamp-3 leading-relaxed">
                                    {alga.description}
                                </p>

                                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                                        <div className="flex items-center">
                                            <AlertTriangle className="w-3.5 h-3.5 mr-1 text-orange-500" />
                                            {alga.causes.length} causas
                                        </div>
                                        <div className="flex items-center">
                                            <CheckCircle className="w-3.5 h-3.5 mr-1 text-green-500" />
                                            {alga.solutions.length} soluciones
                                        </div>
                                    </div>

                                    <button className="flex items-center text-blue-600 hover:text-blue-700 text-sm font-medium group-hover:translate-x-1 transition-all duration-200">
                                        <Eye className="w-4 h-4 mr-1.5" />
                                        Ver detalles
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* --- */}

                {/* No results */}
                {filteredAlgas.length === 0 && (
                    <div className="text-center py-16 bg-white/70 rounded-2xl shadow-lg mt-8">
                        <div className="text-gray-400 mb-6">
                            <Search className="w-20 h-20 mx-auto" />
                        </div>
                        <h3 className="text-2xl font-semibold text-gray-700 mb-3">¡Lo sentimos, no se encontraron algas!</h3>
                        <p className="text-gray-500 text-lg">Prueba a utilizar otros términos de búsqueda o ajusta los filtros de familia para encontrar lo que necesitas.</p>
                    </div>
                )}
            </div>

            {/* --- */}

            {/* Modal */}
            {isModalOpen && selectedAlga && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
                    <div className="bg-white rounded-3xl shadow-2xl max-w-5xl w-full max-h-[95vh] overflow-y-auto animate-fade-in-up">
                        {/* Modal Header con imagen más grande y flexible */}
                        <div className="relative bg-gradient-to-br from-blue-100 to-green-100 p-6 sm:p-8 rounded-t-3xl flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
                            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full">
                                <img
                                    src={selectedAlga.image}
                                    alt={selectedAlga.name}
                                    className="w-48 h-48 sm:w-64 sm:h-64 lg:w-124 lg:h-80 object-contain rounded-xl border border-gray-200 shadow-md flex-shrink-0"
                                />
                                <div className="text-center sm:text-left flex-grow">
                                    <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight mb-2">
                                        {selectedAlga.name}
                                    </h2>
                                    <p className="text-lg text-gray-600 italic mb-3">{selectedAlga.scientificName}</p>
                                    <div className="flex flex-wrap justify-center sm:justify-start items-center gap-2">
                                        <span className={`px-4 py-1.5 rounded-full text-sm font-semibold ${getDifficultyColor(selectedAlga.difficulty)} shadow-sm`}>
                                            Dificultad: {selectedAlga.difficulty}
                                        </span>
                                        <span className={`px-4 py-1.5 rounded-full text-sm font-semibold ${getDangerColor(selectedAlga.dangerLevel)} shadow-sm`}>
                                            Peligro: {selectedAlga.dangerLevel}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={closeModal}
                                className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors duration-200 text-gray-600 hover:text-gray-800"
                                aria-label="Cerrar"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Modal Content */}
                        <div className="p-6 sm:p-8 space-y-8">

                            {selectedAlga.visualDescription && (
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                                        <ImageIcon className="w-5 h-5 mr-2 text-purple-600" />
                                        ¿Cómo se ve? (Descripción Visual)
                                    </h3>
                                    <p className="text-gray-700 leading-relaxed bg-purple-50 p-4 rounded-lg border border-purple-100">
                                        {selectedAlga.visualDescription}
                                    </p>
                                </div>
                            )}

                            {/* Description */}
                            <div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                                    <Eye className="w-5 h-5 mr-2 text-blue-600" />
                                    Descripción General
                                </h3>
                                <p className="text-gray-700 leading-relaxed">{selectedAlga.description}</p>
                            </div>

                            {selectedAlga.impact && (
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                                        <Info className="w-5 h-5 mr-2 text-teal-600" />
                                        Impacto en tu Acuario
                                    </h3>
                                    <p className="text-gray-700 leading-relaxed bg-teal-50 p-4 rounded-lg border border-teal-100">
                                        {selectedAlga.impact}
                                    </p>
                                </div>
                            )}

                            {/* Causes */}
                            <div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                                    <AlertTriangle className="w-5 h-5 mr-2 text-orange-600" />
                                    Principales Causas de Proliferación
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {selectedAlga.causes.map((cause: string, index: number) => (
                                        <div key={index} className="flex items-start space-x-3 p-4 bg-orange-50 rounded-lg border border-orange-100 shadow-sm">
                                            <div className="w-6 h-6 bg-orange-200 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <span className="text-orange-700 font-bold text-sm">{index + 1}</span>
                                            </div>
                                            <p className="text-gray-700 text-base leading-relaxed">{cause}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Solutions */}
                            <div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                                    <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
                                    Soluciones Efectivas para Combatirlas
                                </h3>
                                <div className="space-y-4">
                                    {selectedAlga.solutions.map((solution: string, index: number) => (
                                        <div key={index} className="flex items-start space-x-3 p-4 bg-green-50 rounded-lg border border-green-100 shadow-sm">
                                            <div className="w-6 h-6 bg-green-200 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <CheckCircle className="w-4 h-4 text-green-700" />
                                            </div>
                                            <p className="text-gray-700 text-base leading-relaxed">{solution}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Prevention */}
                            <div className="bg-blue-50 rounded-xl p-6 border border-blue-100 shadow-inner">
                                <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                                    <Lightbulb className="w-5 h-5 mr-2 text-blue-600" />
                                    Claves para la Prevención
                                </h3>
                                <p className="text-gray-700 font-medium leading-relaxed">{selectedAlga.prevention}</p>
                            </div>

                            {selectedAlga.warnings && selectedAlga.warnings.length > 0 && (
                                <div className="bg-red-50 rounded-xl p-6 border border-red-100 shadow-inner">
                                    <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                                        <HandCoins className="w-5 h-5 mr-2 text-red-600" />
                                        Advertencias y Consideraciones Importantes
                                    </h3>
                                    <ul className="list-disc pl-5 space-y-2 text-gray-700">
                                        {selectedAlga.warnings.map((warning: string, index: number) => (
                                            <li key={index}>{warning}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AlgasGuide;