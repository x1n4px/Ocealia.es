// data/fishDiseaseData.ts

export interface FishDisease {
    id: number;
    name: string;
    category: string;
    scientificName?: string;
    image: string;
    severity: 'Leve' | 'Moderada' | 'Grave' | 'Crítica';
    description: string;
    visualSymptoms?: string;
    behavioralSymptoms?: string;
    causes: string[];
    treatments: string[];
    prevention: string;
    contagiousLevel: 'No contagiosa' | 'Poco contagiosa' | 'Moderadamente contagiosa' | 'Altamente contagiosa';
    affectedSpecies?: string[];
    warnings?: string[];
    timeToTreat?: string;
    prognosis?: 'Excelente' | 'Bueno' | 'Regular' | 'Reservado' | 'Malo';
    symptoms?: string[];
    medications?: string[];
    notes?: string[];
}

export interface DiseaseCategory {
    id: string;
    name: string;
    color: string;
    description: string;
}

export const diseaseCategories: DiseaseCategory[] = [
    { id: 'todas', name: 'Todas las Categorías', color: 'gray', description: 'Ver todas las enfermedades' },
    { id: 'bacterianas', name: 'Infecciones Bacterianas', color: 'red', description: 'Causadas por bacterias patógenas' },
    { id: 'fungicas', name: 'Infecciones Fúngicas', color: 'yellow', description: 'Hongos que afectan piel y branquias' },
    { id: 'parasitarias', name: 'Infecciones Parasitarias', color: 'purple', description: 'Parásitos externos e internos' },
    { id: 'virales', name: 'Infecciones Virales', color: 'blue', description: 'Virus que afectan diversos órganos' },
    { id: 'nutricionales', name: 'Problemas Nutricionales', color: 'green', description: 'Deficiencias y excesos alimentarios' },
    { id: 'ambientales', name: 'Problemas Ambientales', color: 'orange', description: 'Causados por condiciones del agua' }
];

export const fishDiseaseList: FishDisease[] = [
    {
        id: 1,
        name: 'Punto Blanco (Ich)',
        category: 'parasitarias',
        scientificName: 'Ichthyophthirius multifiliis',
        image: 'https://imagenes.cope.es/files/microformat_image/uploads/2024/07/10/668e2ccaece48.jpeg',
        severity: 'Moderada',
        description: 'Enfermedad parasitaria muy común causada por un protozoo. Se caracteriza por pequeños puntos blancos que aparecen en el cuerpo, aletas y branquias de los peces.',
        visualSymptoms: 'Pequeños puntos blancos del tamaño de granos de sal que cubren el cuerpo, aletas y branquias. Los peces pueden mostrar irritación cutánea y enrojecimiento.',
        behavioralSymptoms: 'Los peces se frotan contra decoraciones y plantas, respiración acelerada, pérdida de apetito, letargo y tendencia a permanecer en el fondo.',
        causes: [
            'Estrés por cambios bruscos de temperatura',
            'Introducción de peces infectados sin cuarentena',
            'Mala calidad del agua (altos nitratos, pH inadecuado)',
            'Sobrepoblación del acuario',
            'Sistema inmune debilitado por mala alimentación',
            'Temperaturas demasiado bajas para la especie'
        ],
        treatments: [
            'Elevar gradualmente la temperatura a 28-30°C para acelerar el ciclo del parásito',
            'Aumentar la aireación debido a la menor solubilidad del oxígeno a temperaturas altas',
            'Tratamiento con sal de acuario (1-3 gramos por litro) en acuarios sin plantas',
            'Medicamentos específicos: Verde de malaquita + formol (ej. Sera Costapur)',
            'Azufre coloidal o medicamentos con formalina para casos severos',
            'Cambios de agua diarios del 25% durante el tratamiento',
            'Tratamiento debe durar 10-14 días mínimo para romper el ciclo completo'
        ],
        prevention: 'Cuarentena obligatoria de 2-3 semanas para peces nuevos. Mantener temperatura estable, excelente calidad del agua y evitar el estrés. No introducir plantas o decoraciones de acuarios infectados.',
        contagiousLevel: 'Altamente contagiosa',
        affectedSpecies: ['Todos los peces de agua dulce'],
        warnings: [
            'Retirar carbón activado del filtro durante el tratamiento',
            'Algunos tratamientos pueden ser tóxicos para peces sin escamas (plecos, corydoras)',
            'El parásito puede permanecer latente y reaparecer bajo estrés'
        ],
        timeToTreat: '10-14 días',
        prognosis: 'Excelente'
    },
    {
        id: 2,
        name: 'Podredumbre de Aletas',
        category: 'bacterianas',
        scientificName: 'Aeromonas, Pseudomonas, Flexibacter',
        image: 'https://www.croa.com.ar/wp-content/uploads/2020/05/Podredumbre-bacteriana-de-aletas.png',
        severity: 'Leve',
        description: 'Infección bacteriana que afecta las aletas, causando deterioro progresivo desde los bordes hacia la base. Es una de las enfermedades más comunes en acuarios.',
        visualSymptoms: 'Aletas deshilachadas, bordes blanquecinos o rojos, reducción del tamaño de las aletas, en casos severos pueden aparecer úlceras en la base.',
        behavioralSymptoms: 'Pérdida de apetito, letargo, tendencia a esconderse, aletas pegadas al cuerpo, comportamiento anormal al nadar.',
        causes: [
            'Mala calidad del agua (altos nitratos, amoníaco presente)',
            'Lesiones por peleas, decoración afilada o manejo brusco',
            'Estrés crónico por sobrepoblación o compañeros agresivos',
            'Alimentación inadecuada o deficiente',
            'Temperatura del agua inadecuada para la especie',
            'pH fuera del rango óptimo'
        ],
        treatments: [
            'Mejorar inmediatamente la calidad del agua con cambios frecuentes (25% diario)',
            'Revisar y corregir parámetros: amoníaco=0, nitritos=0, nitratos<20ppm',
            'Antibióticos específicos: Kanamicina, Eritromicina o Tetraciclina',
            'Sal de acuario (1-2 gramos por litro) como antiséptico suave',
            'Medicamentos comerciales: Sera Baktopur, API Fin & Body Cure',
            'En casos leves, solo mejora de condiciones puede ser suficiente',
            'Separar peces afectados si hay agresión'
        ],
        prevention: 'Mantener excelente calidad del agua, alimentación balanceada, evitar sobrepoblación, revisar decoraciones puntiagudas, realizar cambios de agua regulares del 25% semanal.',
        contagiousLevel: 'Poco contagiosa',
        affectedSpecies: ['Especialmente Bettas, Goldfish, Guppies, pero puede afectar cualquier especie'],
        warnings: [
            'Si no se trata, puede avanzar hasta el cuerpo del pez',
            'Nunca usar antibióticos sin confirmar que es bacterial',
            'El uso excesivo de sal puede dañar plantas y peces sensibles'
        ],
        timeToTreat: '1-3 semanas',
        prognosis: 'Excelente'
    },
    {
        id: 3,
        name: 'Hongos (Saprolegnia)',
        category: 'fungicas',
        scientificName: 'Saprolegnia spp.',
        image: 'https://www.croa.com.ar/wp-content/uploads/2017/08/sapro.jpg',
        severity: 'Moderada',
        description: 'Infección fúngica que aparece como crecimiento algodonoso blanco o gris en la piel, aletas o branquias. Común en peces con heridas o sistema inmune debilitado.',
        visualSymptoms: 'Crecimiento algodonoso blanco, gris o amarillento que parece algodón o moho. Puede cubrir heridas, ojos, boca o cualquier área dañada de la piel.',
        behavioralSymptoms: 'Pérdida de apetito, letargo, respiración dificultosa si afecta branquias, tendencia a frotar el cuerpo contra objetos.',
        causes: [
            'Lesiones previas o heridas abiertas',
            'Estrés prolongado que debilita el sistema inmune',
            'Mala calidad del agua con altos niveles de materia orgánica',
            'Temperatura inadecuada (muy baja o fluctuante)',
            'Peces debilitados por otras enfermedades',
            'Exceso de comida descomponiéndose en el acuario'
        ],
        treatments: [
            'Mejorar la calidad del agua inmediatamente',
            'Aumentar ligeramente la temperatura (25-27°C) y aireación',
            'Tratamiento con sal de acuario (2-3 gramos por litro) en acuario hospital',
            'Antifúngicos específicos: Azul de metileno, Verde de malaquita',
            'Medicamentos comerciales: Sera Mycopur, API Fungus Cure',
            'Baños con sal durante 5-10 minutos en casos severos',
            'Eliminar peces muertos inmediatamente para evitar propagación'
        ],
        prevention: 'Evitar lesiones durante el manejo, mantener excelente calidad del agua, no sobrealimentar, cuarentena para peces nuevos, temperatura estable.',
        contagiousLevel: 'Moderadamente contagiosa',
        affectedSpecies: ['Todos los peces, especialmente vulnerables peces con heridas o estrés'],
        warnings: [
            'Puede ser mortal si afecta branquias o se extiende internamente',
            'Los hongos prosperan en agua con mucha materia orgánica',
            'Retirar carbón activado durante tratamiento antifúngico'
        ],
        timeToTreat: '1-2 semanas',
        prognosis: 'Bueno'
    },
    {
        id: 4,
        name: 'Hexamita (Enfermedad del Agujero en la Cabeza)',
        category: 'parasitarias',
        scientificName: 'Hexamita spp.',
        image: 'https://i.imgur.com/z0Cati2.jpg',
        severity: 'Grave',
        description: 'Enfermedad parasitaria intestinal que puede causar úlceras distintivas en la cabeza y línea lateral, especialmente común en cíclidos como discos y escalares.',
        visualSymptoms: 'Agujeros o úlceras en la cabeza y línea lateral, heces blancas y filamentosas, pérdida de color, ojos hundidos, adelgazamiento extremo.',
        behavioralSymptoms: 'Pérdida severa de apetito, letargo extremo, aislamiento del grupo, respiración acelerada, comportamiento errático.',
        causes: [
            'Estrés crónico severo (mala calidad del agua, sobrepoblación)',
            'Deficiencias nutricionales (falta de vitaminas A, C)',
            'Introducción de peces portadores asintomáticos',
            'Temperaturas inadecuadas para la especie',
            'Cambios bruscos en las condiciones del acuario',
            'Sistema inmune comprometido por otras enfermedades'
        ],
        treatments: [
            'Metronidazol (medicamento de elección): 250mg por 100L durante 3 días, descanso 2 días, repetir',
            'Mejorar drásticamente la calidad del agua',
            'Alimentación con alimentos medicados (con metronidazol)',
            'Tratamiento en acuario hospital para dosis más controladas',
            'Complementar con vitaminas A y C en la alimentación',
            'Elevar temperatura gradualmente a 28-30°C (para cíclidos)',
            'Cambios de agua frecuentes durante tratamiento'
        ],
        prevention: 'Cuarentena rigurosa, excelente calidad del agua, alimentación variada y rica en vitaminas, evitar sobrepoblación, mantener parámetros estables específicos para cíclidos.',
        contagiousLevel: 'Moderadamente contagiosa',
        affectedSpecies: ['Principalmente cíclidos (Discos, Escalares, Cíclidos americanos), pero puede afectar otros peces'],
        warnings: [
            'Enfermedad muy seria que puede ser mortal sin tratamiento',
            'Los agujeros en la cabeza pueden ser irreversibles',
            'Requiere tratamiento prolongado y paciencia',
            'El metronidazol puede afectar la biología del filtro'
        ],
        timeToTreat: '3-6 semanas',
        prognosis: 'Regular'
    },
    {
        id: 5,
        name: 'Dropsy (Hidropesía)',
        category: 'bacterianas',
        scientificName: 'Aeromonas hydrophila, A. sobria',
        image: 'https://es.aquaryus.com/photos/maladies/hydropisie-poisson-aquarium.jpg',
        severity: 'Crítica',
        description: 'Condición grave caracterizada por acumulación de fluido en la cavidad corporal, causando hinchazón severa. Generalmente indica falla orgánica múltiple.',
        visualSymptoms: 'Hinchazón severa del abdomen, escamas levantadas (aspecto de piña), ojos saltones, palidez o oscurecimiento, posible prolapso anal.',
        behavioralSymptoms: 'Dificultad extrema para nadar, permanece en el fondo, pérdida total de apetito, respiración laboriosa, letargo severo.',
        causes: [
            'Infección bacteriana sistémica severa',
            'Falla renal o hepática',
            'Calidad del agua muy pobre durante tiempo prolongado',
            'Estrés crónico extremo',
            'Alimentación de muy mala calidad o caduca',
            'Genética (predisposición en algunas líneas de peces)'
        ],
        treatments: [
            'Antibióticos sistémicos agresivos: Kanamicina + Nitrofurazona',
            'Aislamiento inmediato en acuario hospital',
            'Baños con sal epsom (sulfato de magnesio) para reducir hinchazón',
            'Mejora drástica de calidad del agua',
            'Medicamentos comerciales: Sera Baktopur Direct, API E.M. Erythromycin',
            'Soporte nutricional con alimentos de alta calidad si come',
            'En casos muy avanzados, considerar eutanasia humanitaria'
        ],
        prevention: 'Excelente calidad del agua constante, alimentación de alta calidad, evitar estrés, cuarentena estricta, no sobrealimentar, cambios de agua regulares.',
        contagiousLevel: 'Poco contagiosa',
        affectedSpecies: ['Cualquier especie, más común en Goldfish, Bettas, Guppies'],
        warnings: [
            'Pronóstico muy reservado, especialmente en casos avanzados',
            'La hinchazón severa indica daño orgánico que puede ser irreversible',
            'Enfermedad terminal en muchos casos',
            'Considerar eutanasia humanitaria si el pez sufre'
        ],
        timeToTreat: '2-4 semanas (si es tratable)',
        prognosis: 'Malo'
    },
    {
        id: 6,
        name: 'Oodinium (Terciopelo)',
        category: 'parasitarias',
        scientificName: 'Oodinium pilularis',
        image: 'https://www.planeta-neli.es/wp-content/gallery/killis_1/Oodinium-notho-02.jpg',
        severity: 'Grave',
        description: 'Parasitosis causada por un dinoflagelado que da apariencia aterciopelada dorada o parduzca a la piel. Muy contagioso y potencialmente mortal.',
        visualSymptoms: 'Película dorada, bronceada o aterciopelada que cubre el cuerpo, especialmente visible con luz lateral. Branquias pueden verse irritadas o rojas.',
        behavioralSymptoms: 'Respiración muy acelerada, los peces se frotan intensamente contra objetos, pérdida de apetito, letargo, pueden permanecer cerca de la superficie.',
        causes: [
            'Introducción de peces infectados sin cuarentena',
            'Estrés que debilita el sistema inmune',
            'Mala calidad del agua',
            'Sobrepoblación del acuario',
            'Cambios bruscos de temperatura o pH',
            'Iluminación excesiva que favorece al parásito'
        ],
        treatments: [
            'Oscurecer completamente el acuario durante 3-5 días (el parásito necesita luz)',
            'Aumentar temperatura gradualmente a 28-30°C',
            'Tratamiento con sulfato de cobre (muy controlado, tóxico en exceso)',
            'Medicamentos específicos: Sera Protazol, API Super Ick Cure',
            'Sal de acuario (1-2 gramos por litro) en acuarios sin plantas',
            'Mejorar oxigenación debido a alta temperatura',
            'Cambios de agua frecuentes para eliminar esporas'
        ],
        prevention: 'Cuarentena obligatoria de nuevos peces, evitar estrés, mantener calidad del agua excelente, iluminación moderada, no introducir agua de otros acuarios.',
        contagiousLevel: 'Altamente contagiosa',
        affectedSpecies: ['Todos los peces de agua dulce, especialmente sensibles Bettas, Discos, Escalares'],
        warnings: [
            'Puede ser mortal en 3-5 días sin tratamiento',
            'El sulfato de cobre es muy tóxico, usar con extrema precaución',
            'Retirar carbón activado y plantas durante tratamiento',
            'Monitorear oxígeno constantemente por alta temperatura'
        ],
        timeToTreat: '1-2 semanas',
        prognosis: 'Bueno'
    },
    {
        id: 7,
        name: 'Costia',
        category: 'parasitarias',
        scientificName: 'Ichthyobodo necator',
        image: 'https://acuarismofacil.wordpress.com/wp-content/uploads/2018/09/costiasis.jpg',
        severity: 'Moderada',
        description: 'Parásito flagelado microscópico que causa irritación severa de piel y branquias, especialmente problemático en agua blanda y ácida.',
        visualSymptoms: 'Película azul-grisácea o blanquecina en la piel, branquias rojas e inflamadas, posible descamación, mucosidad excesiva en piel.',
        behavioralSymptoms: 'Intenso frotamiento contra objetos, respiración muy acelerada, permanecen cerca de la superficie buscando oxígeno, pérdida de apetito.',
        causes: [
            'Agua blanda y ácida (pH < 7) favorece al parásito',
            'Temperaturas bajas (< 25°C)',
            'Introducción de peces o plantas infectadas',
            'Estrés por mala calidad del agua',
            'Sistema inmune debilitado',
            'Sobrepoblación'
        ],
        treatments: [
            'Elevar pH gradualmente a 7.5-8.0 (ambiente desfavorable para Costia)',
            'Aumentar temperatura a 28-30°C progresivamente',
            'Tratamiento con sal de acuario (2-3 gramos por litro)',
            'Formalina al 0.25% en baños de 45-60 minutos',
            'Medicamentos específicos: Verde de malaquita + formol',
            'Mejorar aireación debido a alta temperatura',
            'Cambios de agua frecuentes con agua de pH más alto'
        ],
        prevention: 'Mantener pH neutro a ligeramente alcalino, temperatura adecuada para las especies, cuarentena de plantas y peces nuevos, buena oxigenación.',
        contagiousLevel: 'Altamente contagiosa',
        affectedSpecies: ['Todos los peces, especialmente vulnerables peces de agua blanda como Discos, Tetras'],
        warnings: [
            'Los cambios de pH deben ser muy graduales para no estresar más a los peces',
            'La formalina es tóxica, usar solo en acuario hospital',
            'Monitorear oxígeno constantemente',
            'Puede reaparecer si las condiciones no se corrigen'
        ],
        timeToTreat: '1-2 semanas',
        prognosis: 'Bueno'
    },
    {
        id: 8,
        name: 'Columnaris',
        category: 'bacterianas',
        scientificName: 'Flavobacterium columnare',
        image: 'https://laguiadelacuario.es/wp-content/uploads/2020/06/flexibacter_columnarispda.jpg',
        severity: 'Grave',
        description: 'Infección bacteriana agresiva que afecta piel, branquias y aletas, caracterizada por lesiones blanquecinas que parecen algodón pero son de origen bacteriano.',
        visualSymptoms: 'Lesiones blancas o grisáceas en boca, branquias o aletas que parecen hongos pero son más planas. Erosión de tejidos, branquias pálidas o necróticas.',
        behavioralSymptoms: 'Respiración dificultosa, pérdida rápida de apetito, letargo, pueden presentar comportamiento errático, muerte súbita en casos agudos.',
        causes: [
            'Estrés severo (mala calidad del agua, cambios bruscos)',
            'Temperatura demasiado alta (>28°C favorece la bacteria)',
            'pH alcalino (>7.5) y agua dura',
            'Lesiones o heridas que facilitan la entrada de bacterias',
            'Sobrepoblación y mala filtración',
            'Manejo brusco de los peces'
        ],
        treatments: [
            'Reducir temperatura gradualmente a 24-26°C',
            'Antibióticos específicos: Kanamicina, Furan-2, Terramicina',
            'Baños con sal de acuario (2-4 gramos por litro)',
            'Medicamentos comerciales: Sera Baktopur, API Triple Sulfa',
            'Mejorar calidad del agua inmediatamente',
            'Aislamiento en acuario hospital',
            'Tratamiento debe ser agresivo y rápido'
        ],
        prevention: 'Evitar temperaturas altas sostenidas, mantener excelente calidad del agua, pH ligeramente ácido a neutro, evitar estrés y lesiones, cuarentena estricta.',
        contagiousLevel: 'Altamente contagiosa',
        affectedSpecies: ['Especialmente vulnerables peces tropicales, Goldfish, Bettas'],
        warnings: [
            'Progresión muy rápida, puede matar en 24-48 horas',
            'A menudo se confunde con hongos, pero requiere tratamiento antibiótico',
            'La temperatura alta empeora la condición',
            'Puede afectar múltiples peces simultáneamente'
        ],
        timeToTreat: '1-2 semanas',
        prognosis: 'Reservado'
    },
    {
        id: 9,
        name: 'Neon Tetra Disease',
        category: 'parasitarias',
        scientificName: 'Pleistophora hyphessobryconis',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRToD1g6Eq48fZ1sBnd2utTySkjCoXFcmWyrg&s',
        severity: 'Crítica',
        description: 'Enfermedad parasitaria específica de tetras causada por microsporidios. No tiene cura conocida y es altamente contagiosa entre tetras.',
        visualSymptoms: 'Pérdida de coloración (especialmente la banda azul), quistes blancos en músculos, deformidades corporales, adelgazamiento extremo.',
        behavioralSymptoms: 'Comportamiento errático al nadar, dificultad para mantener el equilibrio, aislamiento del banco, pérdida de apetito, letargo.',
        causes: [
            'Parásito específico que infecta internamente',
            'Transmisión por canibalismo de peces muertos infectados',
            'Alimentos vivos contaminados',
            'Estrés que facilita la manifestación de la enfermedad',
            'Introducción de tetras infectados'
        ],
        treatments: [
            'NO HAY TRATAMIENTO CURATIVO efectivo',
            'Eutanasia humanitaria del pez afectado',
            'Aislamiento inmediato para evitar contagio',
            'Mejora de condiciones para fortalecer peces sanos',
            'Algunos intentan con Fumagillin (limitada efectividad)',
            'Desinfección completa del acuario si hay brote masivo'
        ],
        prevention: 'Cuarentena estricta de tetras nuevos (mínimo 4 semanas), no alimentar con alimentos vivos de fuentes dudosas, eliminar peces muertos inmediatamente, mantener excelente calidad del agua.',
        contagiousLevel: 'Altamente contagiosa',
        affectedSpecies: ['Tetras Neón, Tetras Cardenal, otros Characidos pequeños'],
        warnings: [
            'Enfermedad incurable y mortal',
            'Puede infectar todo un banco de tetras',
            'Los peces infectados deben ser eutanasiados humanitariamente',
            'Desinfectar completamente el equipo usado'
        ],
        timeToTreat: 'No aplicable (incurable)',
        prognosis: 'Malo'
    },
    {
        id: 10,
        name: 'Enfermedad de la Vejiga Natatoria',
        category: 'ambientales',
        image: 'https://acuarioland.com/wp-content/uploads/2021/04/Swim-Bladder-Disease-in-Oranda.jpg',
        severity: 'Moderada',
        description: 'Trastorno que afecta la capacidad del pez para controlar su flotabilidad, causado por diversos factores desde sobrealimentación hasta infecciones.',
        visualSymptoms: 'Pez flota en superficie sin control, nada de costado, permanece en el fondo sin poder ascender, abdomen hinchado.',
        behavioralSymptoms: 'Incapacidad para mantener posición normal en el agua, dificultad para nadar, puede seguir comiendo normalmente en algunos casos.',
        causes: [
            'Sobrealimentación (causa más común)',
            'Estreñimiento por dieta inadecuada',
            'Cambios bruscos de temperatura',
            'Infección bacteriana de la vejiga natatoria',
            'Defectos genéticos (especialmente en Goldfish)',
            'Traumatismo físico',
            'Alimentos secos que se expanden en el estómago'
        ],
        treatments: [
            'Ayuno de 2-3 días para casos por sobrealimentación',
            'Alimentación con guisantes cocidos sin piel (fibra)',
            'Elevar temperatura gradualmente 2-3°C',
            'Antibióticos si se sospecha infección bacteriana',
            'Reducir nivel del agua para facilitar el nado',
            'Alimentación con alimentos hundidos',
            'En casos crónicos, considerar dieta permanente especial'
        ],
        prevention: 'No sobrealimentar, remojar alimentos secos antes de dar, alimentación variada con fibra, evitar cambios bruscos de temperatura, calidad del agua excelente.',
        contagiousLevel: 'No contagiosa',
        affectedSpecies: ['Especialmente Goldfish, Bettas, pero puede afectar cualquier especie'],
        warnings: [
            'En casos crónicos puede ser permanente',
            'Los peces afectados son más vulnerables a otras enfermedades',
            'Algunos casos requieren eutanasia humanitaria si hay sufrimiento',
            'La genética juega un papel importante en algunas razas'
        ],
        timeToTreat: '1-4 semanas',
        prognosis: 'Reservado'
    },
    {
        id: 11,
        name: 'Deficiencia Nutricional',
        category: 'nutricionales',
        image: 'https://i.redd.it/ya7f57ohzjpc1.jpeg',
        severity: 'Leve',
        description: 'Diversos problemas causados por alimentación inadecuada, falta de vitaminas específicas o dieta monótona que afecta el crecimiento y salud general.',
        visualSymptoms: 'Crecimiento retardado, deformidades esqueléticas, pérdida de coloración, ojos hundidos, adelgazamiento, deformidades en aletas.',
        behavioralSymptoms: 'Pérdida de apetito, letargo, mayor susceptibilidad a enfermedades, comportamiento anormal, falta de reproducción.',
        causes: [
            'Dieta monótona (solo un tipo de alimento)',
            'Alimentos vencidos o de mala calidad',
            'Falta de vitaminas A, C, D, E específicas',
            'Ausencia de alimentos vivos o congelados',
            'Sobrealimentación que causa problemas digestivos',
            'Alimentos inadecuados para la especie'
        ],
        treatments: [
            'Cambiar inmediatamente a dieta variada y de alta calidad',
            'Suplementar con vitaminas específicas (A, C, E)',
            'Incluir alimentos vivos o congelados (artemia, daphnia)',
            'Alimentar con vegetales frescos para herbívoros',
            'Alimentos comerciales específicos para la especie',
            'Reducir cantidad si hay sobrealimentación',
            'Mejorar condiciones generales del acuario'
        ],
        prevention: 'Dieta variada con alimentos de alta calidad, alimentos específicos para cada especie, no usar alimentos vencidos, incluir vitaminas regularmente, observar el comportamiento alimentario.',
        contagiousLevel: 'No contagiosa',
        affectedSpecies: ['Todas las especies, especialmente juveniles en crecimiento'],
        warnings: [
            'Las deficiencias prolongadas pueden causar daños permanentes',
            'Los juveniles son especialmente vulnerables',
            'Puede predisponer a otras enfermedades',
            'La recuperación puede ser lenta'
        ],
        timeToTreat: '2-8 semanas',
        prognosis: 'Excelente'
    },
    {
        id: 12,
        name: 'Intoxicación por Amoníaco',
        category: 'ambientales',
        image: 'https://upload.wikimedia.org/wikipedia/commons/a/ac/Goldfishes.jpg',
        severity: 'Grave',
        description: 'Envenenamiento causado por niveles tóxicos de amoníaco en el agua, común en acuarios nuevos o con filtración inadecuada.',
        visualSymptoms: 'Branquias rojas e inflamadas, quemaduras en aletas y piel, hemorragias puntiformes, mucosidad excesiva, ojos turbios.',
        behavioralSymptoms: 'Respiración muy acelerada, permanecen cerca de la superficie, letargo severo, pérdida total de apetito, comportamiento errático.',
        causes: [
            'Acuario nuevo sin ciclar (síndrome del acuario nuevo)',
            'Sobrepoblación severa',
            'Sobrealimentación excesiva',
            'Filtración inadecuada o filtro colapsado',
            'Limpieza excesiva del filtro biológico',
            'Medicamentos que afectan bacterias beneficiosas'
        ],
        treatments: [
            'Cambios de agua inmediatos y masivos (50-75%)',
            'Continuar cambios diarios hasta que amoníaco = 0',
            'Reducir o suspender alimentación temporalmente',
            'Agregar bacterias nitrificantes comerciales',
            'Mejorar aireación al máximo',
            'Productos neutralizantes de amoníaco (emergencia)',
            'Revisar y mejorar sistema de filtración'
        ],
        prevention: 'Ciclar completamente el acuario antes de introducir peces, no sobrepoblar, no sobrealimentar, mantener filtración adecuada, cambios de agua regulares, monitoreo de parámetros.',
        contagiousLevel: 'No contagiosa',
        affectedSpecies: ['Todas las especies, especialmente vulnerables peces pequeños y juveniles'],
        warnings: [
            'Puede ser mortal en pocas horas',
            'Los daños en branquias pueden ser permanentes',
            'Requiere acción inmediata',
            'Monitorear amoníaco diariamente durante el tratamiento'
        ],
        timeToTreat: '1-2 semanas',
        prognosis: 'Bueno'
    },
    {
        "id": 13,
        "name": "Exophthalmia",
        "category": "bacteriana",
        "image": "https://le-cdn.website-editor.net/s/dc05cd8dda1b4290ae0d73847f535d5e/dms3rep/multi/opt/enfermedades-de-los-peces-de-acuario-Hidropes%C3%ADa-1920w.jpg?Expires=1756027548&Signature=EB1qA4PjWu9H6QGqlL9ThoZZArXSdQrKwjwGZik56tJiuDhxwanEk9mVa2LAnetv4OtMw7SPO3AuOrZcJrp4iORaW5amJ6LxfDKViIcXgg~CSDo8jh4XcoQWLvPLqfHQzSmJFVAOHlnSCHfFdzZFqS-oLUeHc6uyncxwCvM2-2YtKxbqjppQnioAlUpfKdiGZrmTCsS2GgRtmJBSm~vobkd6SN-eIrskV07FbfxaFWywol-FqTdGsFjNQgFn2q5HlNep2Zmoiio12Y9axajnrtbWrtbYsMm4oebpOBeSVVgDWUZfOqjRFWoXpT9caGrd138Kuf5lOw5o5spmMh5W4Q__&Key-Pair-Id=K2NXBXLF010TJW",
        "severity": "Moderada",
        "description": "Exophthalmia, conocida como ojos saltones, es una afección en la que uno o ambos ojos del pez se hinchan y sobresalen debido a acumulación de líquidos o infección subyacente. Puede ser síntoma de problemas internos graves.",
        "visualSymptoms": "Ojos hinchados o que sobresalen, opacidad en la córnea, enrojecimiento alrededor del ojo, posible secreción.",
        "behavioralSymptoms": "Pérdida de apetito, movimientos torpes, tendencia a aislarse, dificultad para orientarse.",
        "causes": [
            "Infección bacteriana interna",
            "Lesiones físicas",
            "Parásitos internos",
            "Problemas renales que causan acumulación de líquidos",
            "Mala calidad del agua (niveles altos de amoníaco, nitritos o nitratos)"
        ],
        "treatments": [
            "Aislar al pez afectado en un acuario hospital",
            "Antibióticos de amplio espectro en el agua (ej. eritromicina)",
            "Mejorar calidad del agua con cambios parciales frecuentes",
            "Uso de sal de acuario en dosis controladas para reducir inflamación",
            "En casos graves, tratamiento oral o inyectado por especialista"
        ],
        "prevention": "Mantener una buena calidad del agua, evitar lesiones, proporcionar dieta equilibrada, realizar cuarentena a nuevos peces antes de introducirlos al acuario.",
        "contagiousLevel": "Poco contagiosa",
        "affectedSpecies": ["Peces de agua dulce y salada, especialmente peces de acuario ornamentales"],
        "warnings": [
            "Puede ser síntoma de enfermedad sistémica grave",
            "Si no se trata, puede causar pérdida del ojo o muerte del pez",
            "Requiere diagnóstico rápido para determinar causa subyacente"
        ],
        "timeToTreat": "1-3 semanas",
        "prognosis": "Bueno"
    },
    {
        id: 14,
        name: 'Gusano Lernaea',
        category: 'parasitarias',
        scientificName: 'Lernaea spp.',
        image: 'https://www.croa.com.ar/wp-content/uploads/2020/05/Lernaea.png',
        severity: 'Grave',
        description: 'Parásito externo que se adhiere a la piel y músculos del pez, causando lesiones graves e infecciones secundarias.',
        visualSymptoms: 'Parásitos visibles como hilos blancos o verdes incrustados en la piel, heridas rojas e inflamadas.',
        behavioralSymptoms: 'Frotamiento contra objetos, pérdida de apetito, letargo.',
        causes: [
            'Introducción de peces infectados sin cuarentena',
            'Agua contaminada de otras fuentes',
            'Falta de higiene en el acuario'
        ],
        treatments: [
            'Extracción manual del parásito con pinzas (en casos individuales)',
            'Baños antiparasitarios (permanganato potásico, sal de acuario)',
            'Antiparasitarios sistémicos (diflubenzurón, lufenurón)',
            'Antibióticos si hay infección secundaria'
        ],
        prevention: 'Cuarentena estricta para nuevos peces y plantas, limpieza y desinfección de equipo.',
        contagiousLevel: 'Moderadamente contagiosa',
        affectedSpecies: ['Carpas, peces dorados, peces de agua dulce en general'],
        warnings: [
            'Puede causar muerte por infecciones secundarias',
            'Difícil de erradicar sin tratar todo el acuario'
        ],
        timeToTreat: '2-4 semanas',
        prognosis: 'Regular',
        medications: ['Diflubenzurón', 'Lufenurón', 'Permanganato potásico'],
        notes: ['No usar antiparasitarios en acuarios con invertebrados']
    },
    {
        id: 15,
        name: 'Saprolegniasis',
        category: 'fungicas',
        scientificName: 'Saprolegnia spp.',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfmMZiTkb9hm4CvRVVSXyKc_A3Rh6blCTSKg&s',
        severity: 'Moderada',
        description: 'Infección fúngica que afecta piel, aletas y huevos, común en peces debilitados o con heridas.',
        visualSymptoms: 'Manchas algodonosas blancas o grises en la piel, huevos cubiertos de hongo.',
        behavioralSymptoms: 'Aletargamiento, pérdida de apetito, aislamiento.',
        causes: [
            'Mala calidad del agua',
            'Heridas en la piel',
            'Estrés prolongado',
            'Temperaturas inadecuadas'
        ],
        treatments: [
            'Baños de sal no yodada',
            'Tratamiento con azul de metileno o verde malaquita',
            'Mejora de la calidad del agua'
        ],
        prevention: 'Evitar lesiones, mantener parámetros estables, buena oxigenación.',
        contagiousLevel: 'Poco contagiosa',
        affectedSpecies: ['Todas las especies de agua dulce'],
        warnings: ['Puede propagarse rápidamente en huevos', 'Afecta peces debilitados'],
        timeToTreat: '1-2 semanas',
        prognosis: 'Bueno',
        medications: ['Azul de metileno', 'Verde malaquita'],
        notes: ['Evitar sobredosificación para no dañar alevines']
    },
    {
        id: 16,
        name: 'Exoftalmia',
        category: 'bacterianas',
        scientificName: 'Signo clínico, no enfermedad única',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbnDT8t2YPpK_ZDZTfi9vmc9lhBUp8o9s8wA&s',
        severity: 'Moderada',
        description: 'Protrusión de uno o ambos ojos, causada por infecciones bacterianas, lesiones o problemas internos.',
        visualSymptoms: 'Ojo hinchado y saliente, opacidad corneal.',
        behavioralSymptoms: 'Letargo, pérdida de apetito.',
        causes: [
            'Infección bacteriana',
            'Golpes',
            'Mala calidad del agua',
            'Enfermedad renal'
        ],
        treatments: [
            'Mejora de calidad del agua',
            'Antibióticos en alimento o agua (eritromicina, tetraciclina)',
            'Aislamiento del pez'
        ],
        prevention: 'Mantener agua limpia, evitar lesiones y estrés.',
        contagiousLevel: 'No contagiosa',
        affectedSpecies: ['Peces ornamentales'],
        warnings: ['Puede causar pérdida del ojo', 'Síntoma de enfermedad grave'],
        timeToTreat: '2-3 semanas',
        prognosis: 'Reservado',
        medications: ['Eritromicina', 'Tetraciclina'],
        notes: ['Actuar rápido para evitar complicaciones sistémicas']
    }
    ,
    {
        id: 17,
        name: 'Linfocistis',
        category: 'virales',
        scientificName: 'Iridoviridae (Lymphocystivirus)',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRX9KvK-c1Pwc8hZpWIFQwmoUJWAMztSX1xaw&s',
        severity: 'Leve',
        description: 'Enfermedad viral que provoca la formación de nódulos blancos en la piel y aletas.',
        visualSymptoms: 'Pequeños crecimientos similares a verrugas en aletas y piel.',
        behavioralSymptoms: 'Generalmente no altera el comportamiento, pero puede causar pérdida de apetito si hay lesiones internas.',
        causes: [
            'Virus transmitido por contacto directo',
            'Estrés',
            'Introducción de peces infectados'
        ],
        treatments: [
            'No existe tratamiento específico',
            'Mantener agua en condiciones óptimas',
            'Eliminar estrés'
        ],
        prevention: 'Cuarentena estricta y evitar estrés.',
        contagiousLevel: 'Poco contagiosa',
        affectedSpecies: ['Carpas, peces ornamentales'],
        warnings: ['Lesiones pueden tardar semanas en desaparecer'],
        timeToTreat: '4-8 semanas',
        prognosis: 'Bueno',
        medications: [],
        notes: ['Normalmente autolimitante, pero puede durar meses']
    }
    ,
    {
        id: 18,
        name: 'Viruela de la carpa',
        category: 'virales',
        scientificName: 'Herpesvirus CyHV-1',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCmgTjdbkGig5D-5apNgt8y7xRvKwlLHU3nQ&s',
        severity: 'Moderada',
        description: 'Enfermedad viral que produce placas cerosas o blanquecinas en piel y aletas.',
        visualSymptoms: 'Manchas blancas y cerosas, especialmente en cabeza y aletas.',
        behavioralSymptoms: 'Generalmente normal, pero puede haber reducción de actividad.',
        causes: [
            'Herpesvirus CyHV-1',
            'Temperaturas bajas favorecen la aparición'
        ],
        treatments: [
            'No hay cura específica',
            'Mejorar condiciones de agua',
            'Mantener temperatura estable'
        ],
        prevention: 'Evitar estrés y cambios bruscos de temperatura.',
        contagiousLevel: 'Poco contagiosa',
        affectedSpecies: ['Carpa koi, peces dorados'],
        warnings: ['Enfermedad crónica, recidivas frecuentes'],
        timeToTreat: 'Semanas a meses',
        prognosis: 'Bueno',
        medications: [],
        notes: ['Lesiones son más estéticas que mortales']
    }
    ,
    {
        id: 19,
        name: 'Estreñimiento',
        category: 'nutricionales',
        scientificName: 'Condición digestiva',
        image: 'https://www.croa.com.ar/wp-content/uploads/2020/05/Estre%C3%B1imiento.png',
        severity: 'Leve',
        description: 'Problema digestivo común por alimentación inadecuada o falta de fibra.',
        visualSymptoms: 'Abdomen hinchado, ausencia de heces.',
        behavioralSymptoms: 'Letargo, pérdida de apetito, dificultad para nadar.',
        causes: [
            'Exceso de alimento seco sin fibra',
            'Falta de vegetales',
            'Baja actividad física'
        ],
        treatments: [
            'Ayuno por 24-48h',
            'Alimentar con guisantes hervidos sin piel',
            'Baños de sal para reducir hinchazón'
        ],
        prevention: 'Dieta variada, no sobrealimentar.',
        contagiousLevel: 'No contagiosa',
        affectedSpecies: ['Peces tropicales y ornamentales'],
        warnings: ['Puede derivar en prolapso intestinal si no se trata'],
        timeToTreat: '1-3 días',
        prognosis: 'Excelente',
        medications: [],
        notes: ['Nunca forzar evacuación manualmente']
    },
    {
        id: 20,
        name: 'Estrés en peces',
        category: 'ambientales',
        image: 'https://laguiadelacuario.es/wp-content/uploads/2021/02/estres_pecesacuariopda.jpg',
        severity: 'Moderada',
        description: 'Condición que debilita el sistema inmune y predispone a enfermedades.',
        visualSymptoms: 'Colores apagados, aletas retraídas.',
        behavioralSymptoms: 'Esconderse, nado errático, pérdida de apetito.',
        causes: [
            'Cambios bruscos de temperatura',
            'Parámetros del agua inestables',
            'Sobrepoblación'
        ],
        treatments: [
            'Corregir parámetros del agua',
            'Reducir sobrepoblación',
            'Añadir refugios en el acuario'
        ],
        prevention: 'Evitar cambios bruscos y estrés prolongado.',
        contagiousLevel: 'No contagiosa',
        affectedSpecies: ['Todas'],
        warnings: ['Estrés prolongado lleva a enfermedades graves'],
        timeToTreat: 'Depende de la causa',
        prognosis: 'Bueno',
        medications: [],
        notes: ['Reducir manipulación innecesaria']
    }





];
