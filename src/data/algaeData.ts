// data/algaeData.ts

export interface Alga {
    id: number;
    name: string;
    family: string;
    scientificName: string;
    image: string;
    difficulty: 'Fácil' | 'Moderado' | 'Difícil' | 'Muy Difícil';
    description: string;
    visualDescription?: string;
    impact?: string;
    causes: string[];
    solutions: string[];
    prevention: string;
    dangerLevel: 'Muy Bajo' | 'Bajo' | 'Medio' | 'Alto' | 'Muy Alto';
    warnings?: string[];
}

export interface Family {
    id: string;
    name: string;
    color: string;
}

export const families: Family[] = [
    { id: 'todas', name: 'Todas las Familias', color: 'gray' },
    { id: 'verdes', name: 'Algas Verdes', color: 'green' },
    { id: 'marrones', name: 'Algas Marrones', color: 'yellow' },
    { id: 'azules', name: 'Cianobacterias', color: 'blue' },
    { id: 'rojas', name: 'Algas Rojas', color: 'red' },
    { id: 'filamentosas', name: 'Algas Filamentosas', color: 'emerald' }
];

export const algaeList: Alga[] = [
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
        image: 'https://pezverde.es/tienda/img/cms/Captura%20de%20pantalla%202020-03-19%20a%20las%203-30-20.png',
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
