import React, { useState } from 'react';
import { 
  Droplets, 
  AlertTriangle, 
  ChevronDown, 
  ChevronUp,
  CheckCircle,
  XCircle,
  Clock,
  Thermometer,
  Beaker,
  TrendingUp,
  Shield,
  Heart,
  Leaf,
  AlertCircle,
  Calendar,
  Activity,
  TestTube,
  Zap,
  BookOpen,
  Target,
  FlaskConical,
  Microscope,
  FileText,
  HelpCircle,
  Settings,
  Wind,
  Home,
  Sun
} from 'lucide-react';
import InfoTooltip from './InfoTooltip';

const CyclingGuideComplete: React.FC = () => {
  const [expandedSections, setExpandedSections] = useState<string[]>(['intro']);
  const [activeTab, setActiveTab] = useState('basics');

  const toggleSection = (section: string) => {
    setExpandedSections(prev =>
      prev.includes(section)
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 rounded-3xl shadow-2xl p-8 border border-blue-200">
      {/* Header Principal */}
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent mb-4">
          Guía Completa del Ciclado del Acuario
        </h2>
        <p className="text-lg text-gray-700 max-w-4xl mx-auto">
          Todo lo que necesitas saber sobre el proceso más importante para el éxito de tu acuario
        </p>
      </div>

      {/* Tabs de navegación */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {[
          { id: 'basics', label: '🔬 Conceptos Básicos', color: 'blue' },
          { id: 'chemistry', label: '⚗️ Química del Agua', color: 'purple' },
          { id: 'methods', label: '🛠️ Métodos de Ciclado', color: 'green' },
          { id: 'monitoring', label: '📊 Monitoreo', color: 'orange' },
          { id: 'problems', label: '⚠️ Problemas Comunes', color: 'red' },
          { id: 'advanced', label: '🎓 Avanzado', color: 'indigo' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-full font-medium transition-all ${
              activeTab === tab.id
                ? `bg-${tab.color}-600 text-white shadow-lg scale-105`
                : `bg-white text-gray-700 hover:bg-${tab.color}-50 border border-${tab.color}-200`
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Contenido según tab activa */}
      {activeTab === 'basics' && (
        <div className="space-y-6">
          {/* ¿Qué es el Ciclado? */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <button
              onClick={() => toggleSection('intro')}
              className="w-full flex items-center justify-between text-left"
            >
              <h3 className="text-2xl font-bold text-gray-800 flex items-center">
                <Droplets className="w-6 h-6 mr-3 text-blue-600" />
                ¿Qué es el Ciclado del Acuario?
              </h3>
              {expandedSections.includes('intro') ? 
                <ChevronUp className="w-5 h-5 text-gray-500" /> : 
                <ChevronDown className="w-5 h-5 text-gray-500" />
              }
            </button>
            
            {expandedSections.includes('intro') && (
              <div className="mt-6 space-y-4">
                <div className="bg-blue-50 rounded-xl p-4 border-l-4 border-blue-500">
                  <p className="text-gray-700 leading-relaxed">
                    El ciclado es el proceso biológico fundamental mediante el cual establecemos colonias de 
                    bacterias beneficiosas
                    <InfoTooltip 
                      content="Las bacterias nitrificantes son microorganismos que convierten compuestos tóxicos (amoniaco y nitritos) en compuestos menos dañinos (nitratos)."
                    />
                    en el filtro y superficies del acuario. Estas bacterias son esenciales para procesar los 
                    desechos tóxicos que producen los peces, convirtiendo el amoniaco mortal en compuestos 
                    menos peligrosos.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-4 border border-red-200">
                    <div className="flex items-center mb-2">
                      <AlertTriangle className="w-5 h-5 text-red-600 mr-2" />
                      <h4 className="font-semibold text-red-800">Sin Ciclado</h4>
                    </div>
                    <p className="text-sm text-red-700">
                      Los peces mueren por envenenamiento con amoniaco
                      <InfoTooltip 
                        content="El amoniaco (NH₃) es extremadamente tóxico para los peces. Concentraciones tan bajas como 0.02 mg/L pueden causar daño permanente a las branquias."
                        advanced={true}
                      />
                      en 24-72 horas. Es cruel e innecesario.
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-4 border border-yellow-200">
                    <div className="flex items-center mb-2">
                      <Clock className="w-5 h-5 text-yellow-600 mr-2" />
                      <h4 className="font-semibold text-yellow-800">Durante el Ciclado</h4>
                    </div>
                    <p className="text-sm text-yellow-700">
                      Las bacterias se multiplican lentamente. Paciencia es clave: 4-8 semanas
                      <InfoTooltip 
                        content="El tiempo varía según temperatura (óptima 25-28°C), pH (7.0-8.0 ideal), superficie disponible y fuente de amoniaco."
                      />.
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 border border-green-200">
                    <div className="flex items-center mb-2">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                      <h4 className="font-semibold text-green-800">Acuario Ciclado</h4>
                    </div>
                    <p className="text-sm text-green-700">
                      Sistema biológico estable que procesa desechos continuamente
                      <InfoTooltip 
                        content="Un acuario ciclado puede procesar 2-3 ppm de amoniaco en 24 horas sin acumulación de amoniaco o nitritos."
                        advanced={true}
                      />.
                    </p>
                  </div>
                </div>

                {/* Importancia del ciclado */}
                <div className="bg-gradient-to-r from-blue-100 to-cyan-100 rounded-xl p-5 mt-6">
                  <h4 className="font-bold text-gray-800 mb-3 flex items-center">
                    <Heart className="w-5 h-5 text-red-500 mr-2" />
                    ¿Por qué es tan importante?
                  </h4>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span>
                        <strong>Bienestar animal:</strong> Los peces en agua no ciclada sufren quemaduras químicas
                        <InfoTooltip 
                          content="El amoniaco causa daño irreversible a las branquias, hígado y sistema nervioso. Los peces literalmente se queman por dentro."
                        />
                        en branquias, daño cerebral y muerte dolorosa.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span>
                        <strong>Estabilidad del ecosistema:</strong> Un acuario ciclado mantiene el equilibrio biológico
                        <InfoTooltip 
                          content="El equilibrio incluye bacterias nitrificantes, bacterias heterótrofas, protozoos y otros microorganismos que forman una cadena alimenticia microscópica."
                          advanced={true}
                        />
                        necesario para la vida acuática.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span>
                        <strong>Ahorro económico:</strong> Evita pérdidas de peces y tratamientos costosos por enfermedades
                        <InfoTooltip 
                          content="Los peces estresados por mala calidad del agua son susceptibles a ich, hongos, bacterias patógenas y parásitos."
                        />.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span>
                        <strong>Satisfacción personal:</strong> Ver prosperar a tus peces en un ambiente saludable es gratificante.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* El Ciclo del Nitrógeno */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <button
              onClick={() => toggleSection('nitrogen')}
              className="w-full flex items-center justify-between text-left"
            >
              <h3 className="text-2xl font-bold text-gray-800 flex items-center">
                <Activity className="w-6 h-6 mr-3 text-teal-600" />
                El Ciclo del Nitrógeno Explicado
              </h3>
              {expandedSections.includes('nitrogen') ? 
                <ChevronUp className="w-5 h-5 text-gray-500" /> : 
                <ChevronDown className="w-5 h-5 text-gray-500" />
              }
            </button>
            
            {expandedSections.includes('nitrogen') && (
              <div className="mt-6 space-y-6">
                {/* Diagrama visual del ciclo */}
                <div className="bg-gradient-to-br from-blue-50 to-teal-50 rounded-xl p-6">
                  <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-4">
                    <div className="text-center">
                      <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center text-white font-bold mb-2">
                        NH₃
                      </div>
                      <p className="font-semibold text-red-700">Amoniaco</p>
                      <p className="text-xs text-gray-600">Muy Tóxico</p>
                    </div>
                    <div className="text-3xl text-gray-400">→</div>
                    <div className="text-center">
                      <div className="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold mb-2">
                        NO₂⁻
                      </div>
                      <p className="font-semibold text-orange-700">Nitritos</p>
                      <p className="text-xs text-gray-600">Tóxico</p>
                    </div>
                    <div className="text-3xl text-gray-400">→</div>
                    <div className="text-center">
                      <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center text-white font-bold mb-2">
                        NO₃⁻
                      </div>
                      <p className="font-semibold text-green-700">Nitratos</p>
                      <p className="text-xs text-gray-600">Menos Tóxico</p>
                    </div>
                  </div>
                </div>

                {/* Detalles de cada compuesto */}
                <div className="space-y-4">
                  {/* Amoniaco */}
                  <div className="bg-red-50 rounded-xl p-5 border-l-4 border-red-500">
                    <h4 className="font-bold text-red-800 mb-3 flex items-center">
                      <FlaskConical className="w-5 h-5 mr-2" />
                      Amoniaco (NH₃/NH₄⁺)
                      <InfoTooltip 
                        content="El amoniaco existe en dos formas: NH₃ (amoniaco libre, muy tóxico) y NH₄⁺ (amonio, menos tóxico). El pH determina la proporción: pH alto = más NH₃ tóxico."
                        advanced={true}
                      />
                    </h4>
                    <div className="space-y-2 text-sm text-gray-700">
                      <p>
                        <strong>Origen:</strong> Desechos de peces, comida no consumida, plantas muertas, respiración de peces
                        <InfoTooltip 
                          content="Los peces excretan amoniaco directamente por las branquias (60-90%) y en menor medida por heces y orina."
                          advanced={true}
                        />.
                      </p>
                      <p>
                        <strong>Toxicidad:</strong> Letal a partir de 0.05 mg/L en pH alto
                        <InfoTooltip 
                          content="A pH 7.0, solo el 0.6% es NH₃ tóxico. A pH 8.0, sube al 5.4%. A pH 9.0, es el 36%!"
                          advanced={true}
                        />. Causa daño branquial, hemorragias, letargo.
                      </p>
                      <p>
                        <strong>Bacterias responsables:</strong> Nitrosomonas
                        <InfoTooltip 
                          content="Nitrosomonas europaea y N. marina son las especies más comunes. Se duplican cada 7-8 horas en condiciones óptimas."
                          advanced={true}
                        /> 
                        (tarda 7-21 días en establecerse).
                      </p>
                      <p>
                        <strong>Síntomas en peces:</strong> Respiración agitada, branquias rojas/inflamadas, letargo, pérdida de apetito, nado errático.
                      </p>
                      <div className="bg-red-100 rounded-lg p-3 mt-3">
                        <p className="text-xs text-red-800">
                          <strong>⚠️ Nivel seguro:</strong> 0 mg/L | <strong>Peligroso:</strong> &gt;0.02 mg/L | <strong>Letal:</strong> &gt;0.1 mg/L
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Nitritos */}
                  <div className="bg-orange-50 rounded-xl p-5 border-l-4 border-orange-500">
                    <h4 className="font-bold text-orange-800 mb-3 flex items-center">
                      <FlaskConical className="w-5 h-5 mr-2" />
                      Nitritos (NO₂⁻)
                      <InfoTooltip 
                        content="Los nitritos interfieren con la capacidad de la sangre para transportar oxígeno, causando 'enfermedad de la sangre marrón' (metahemoglobinemia)."
                        advanced={true}
                      />
                    </h4>
                    <div className="space-y-2 text-sm text-gray-700">
                      <p>
                        <strong>Origen:</strong> Oxidación del amoniaco por bacterias Nitrosomonas
                        <InfoTooltip 
                          content="NH₃ + O₂ → NO₂⁻ + 3H⁺ + 2e⁻. Esta reacción libera energía que las bacterias usan para crecer."
                          advanced={true}
                        />.
                      </p>
                      <p>
                        <strong>Toxicidad:</strong> Interfiere con transporte de oxígeno en sangre
                        <InfoTooltip 
                          content="Los nitritos convierten la hemoglobina en metahemoglobina, que no puede transportar oxígeno. Los peces literalmente se asfixian con branquias funcionales."
                        />. 
                        Tóxico a partir de 0.1 mg/L.
                      </p>
                      <p>
                        <strong>Bacterias responsables:</strong> Nitrobacter y Nitrospira
                        <InfoTooltip 
                          content="Nitrospira es más común en acuarios. Nitrobacter domina en sistemas con alto nitrito. Ambas son más lentas que Nitrosomonas."
                          advanced={true}
                        />
                        (tarda 14-30 días en establecerse).
                      </p>
                      <p>
                        <strong>Síntomas en peces:</strong> Boqueo en superficie, branquias marrones, letargo extremo, muerte súbita.
                      </p>
                      <p>
                        <strong>Protección:</strong> La sal de acuario (1-3 g/L) puede reducir toxicidad
                        <InfoTooltip 
                          content="Los iones cloruro (Cl⁻) compiten con los nitritos por absorción en las branquias, reduciendo su toxicidad. No todos los peces toleran sal."
                          advanced={true}
                        />.
                      </p>
                      <div className="bg-orange-100 rounded-lg p-3 mt-3">
                        <p className="text-xs text-orange-800">
                          <strong>⚠️ Nivel seguro:</strong> 0 mg/L | <strong>Peligroso:</strong> &gt;0.1 mg/L | <strong>Letal:</strong> &gt;1 mg/L
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Nitratos */}
                  <div className="bg-green-50 rounded-xl p-5 border-l-4 border-green-500">
                    <h4 className="font-bold text-green-800 mb-3 flex items-center">
                      <FlaskConical className="w-5 h-5 mr-2" />
                      Nitratos (NO₃⁻)
                      <InfoTooltip 
                        content="Los nitratos son el producto final del ciclo del nitrógeno en acuarios. Solo se eliminan con cambios de agua o consumo por plantas/algas."
                      />
                    </h4>
                    <div className="space-y-2 text-sm text-gray-700">
                      <p>
                        <strong>Origen:</strong> Oxidación de nitritos por bacterias Nitrobacter/Nitrospira
                        <InfoTooltip 
                          content="NO₂⁻ + ½O₂ → NO₃⁻. Esta es la etapa final del proceso de nitrificación aeróbica."
                          advanced={true}
                        />.
                      </p>
                      <p>
                        <strong>Toxicidad:</strong> Relativamente baja, pero problemática en altas concentraciones
                        <InfoTooltip 
                          content="Los nitratos causan estrés crónico, reducen inmunidad, afectan reproducción y crecimiento. También alimentan algas indeseadas."
                        />.
                      </p>
                      <p>
                        <strong>Eliminación:</strong> Cambios de agua semanales (20-30%), plantas vivas
                        <InfoTooltip 
                          content="Las plantas de crecimiento rápido como Pothos, Limnophila, Hygrophila pueden consumir 5-10 mg/L de nitratos por semana."
                          advanced={true}
                        />, 
                        filtros con desnitrificación
                        <InfoTooltip 
                          content="La desnitrificación anaeróbica convierte NO₃⁻ en N₂ gas. Requiere zonas sin oxígeno y fuente de carbono. Difícil en acuarios pequeños."
                          advanced={true}
                        />.
                      </p>
                      <p>
                        <strong>Efectos a largo plazo:</strong> Retraso en crecimiento, colores apagados, susceptibilidad a enfermedades, algas.
                      </p>
                      <div className="bg-green-100 rounded-lg p-3 mt-3">
                        <p className="text-xs text-green-800">
                          <strong>✓ Ideal:</strong> &lt;20 mg/L | <strong>Aceptable:</strong> 20-40 mg/L | <strong>Problemático:</strong> &gt;40 mg/L
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Factores que afectan el ciclo */}
                <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-5 mt-6">
                  <h4 className="font-bold text-purple-800 mb-3 flex items-center">
                    <Settings className="w-5 h-5 mr-2" />
                    Factores que Afectan el Ciclo del Nitrógeno
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div>
                        <p className="font-semibold text-purple-700 flex items-center">
                          <Thermometer className="w-4 h-4 mr-1" />
                          Temperatura
                          <InfoTooltip 
                            content="Las bacterias nitrificantes son más activas entre 25-30°C. Por debajo de 20°C su actividad se reduce drásticamente."
                          />
                        </p>
                        <p className="text-sm text-gray-600">Óptima: 25-28°C. Más frío = más lento</p>
                      </div>
                      <div>
                        <p className="font-semibold text-purple-700 flex items-center">
                          <Beaker className="w-4 h-4 mr-1" />
                          pH
                          <InfoTooltip 
                            content="pH óptimo para Nitrosomonas: 7.8-8.0. Para Nitrobacter: 7.3-7.5. pH bajo (<6.5) inhibe la nitrificación."
                            advanced={true}
                          />
                        </p>
                        <p className="text-sm text-gray-600">Ideal: 7.0-8.0. pH bajo inhibe bacterias</p>
                      </div>
                      <div>
                        <p className="font-semibold text-purple-700 flex items-center">
                          <Wind className="w-4 h-4 mr-1" />
                          Oxígeno
                          <InfoTooltip 
                            content="La nitrificación consume 4.57 mg O₂ por mg de NH₃ oxidado. Sin oxígeno suficiente, el proceso se detiene."
                            advanced={true}
                          />
                        </p>
                        <p className="text-sm text-gray-600">Esencial: &gt;5 mg/L. Buena aireación crucial</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <p className="font-semibold text-purple-700 flex items-center">
                          <Home className="w-4 h-4 mr-1" />
                          Superficie
                          <InfoTooltip 
                            content="Las bacterias nitrificantes son sésiles (se adhieren a superficies). Más superficie = más bacterias = ciclado más rápido."
                          />
                        </p>
                        <p className="text-sm text-gray-600">Más área = más bacterias. Biomedia porosa ideal</p>
                      </div>
                      <div>
                        <p className="font-semibold text-purple-700 flex items-center">
                          <Zap className="w-4 h-4 mr-1" />
                          KH (Dureza carbonatada)
                          <InfoTooltip 
                            content="La nitrificación consume 7.14 mg de CaCO₃ por mg de NH₃. KH bajo puede causar caídas de pH que detienen el proceso."
                            advanced={true}
                          />
                        </p>
                        <p className="text-sm text-gray-600">Buffer importante: &gt;4 dKH recomendado</p>
                      </div>
                      <div>
                        <p className="font-semibold text-purple-700 flex items-center">
                          <Sun className="w-4 h-4 mr-1" />
                          Luz
                          <InfoTooltip 
                            content="Las bacterias nitrificantes son fotosensibles. La luz directa puede inhibir su crecimiento, especialmente Nitrobacter."
                            advanced={true}
                          />
                        </p>
                        <p className="text-sm text-gray-600">Bacterias prefieren oscuridad. Evitar luz directa en filtro</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab de Química del Agua */}
      {activeTab === 'chemistry' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <TestTube className="w-6 h-6 mr-3 text-purple-600" />
              Parámetros Químicos Esenciales
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* pH */}
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-5 border border-indigo-200">
                <h4 className="font-bold text-indigo-800 mb-3">pH - Potencial de Hidrógeno</h4>
                <div className="space-y-2 text-sm">
                  <p className="text-gray-700">
                    Mide la acidez o alcalinidad del agua
                    <InfoTooltip 
                      content="Escala logarítmica de 0-14. Cada unidad representa 10x diferencia. pH 6 es 10 veces más ácido que pH 7."
                      advanced={true}
                    />
                  </p>
                  <div className="bg-white rounded-lg p-3">
                    <p className="font-semibold text-indigo-700">Rangos importantes:</p>
                    <ul className="mt-2 space-y-1 text-xs">
                      <li>• <strong>&lt;6.5:</strong> Inhibe nitrificación, tóxico para muchos peces</li>
                      <li>• <strong>6.5-7.5:</strong> Ideal mayoría peces tropicales</li>
                      <li>• <strong>7.5-8.5:</strong> Óptimo para ciclado y cíclidos africanos</li>
                      <li>• <strong>&gt;8.5:</strong> Aumenta toxicidad del amoniaco</li>
                    </ul>
                  </div>
                  <p className="text-xs text-purple-600 italic">
                    💡 El pH afecta directamente la toxicidad del amoniaco y la eficiencia del ciclado
                  </p>
                </div>
              </div>

              {/* KH */}
              <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl p-5 border border-teal-200">
                <h4 className="font-bold text-teal-800 mb-3">
                  KH - Dureza de Carbonatos
                  <InfoTooltip 
                    content="KH mide la capacidad tampón del agua. Previene cambios bruscos de pH. Se consume durante la nitrificación."
                  />
                </h4>
                <div className="space-y-2 text-sm">
                  <p className="text-gray-700">
                    Capacidad del agua para resistir cambios de pH
                  </p>
                  <div className="bg-white rounded-lg p-3">
                    <p className="font-semibold text-teal-700">Niveles recomendados:</p>
                    <ul className="mt-2 space-y-1 text-xs">
                      <li>• <strong>&lt;2 dKH:</strong> Peligroso, pH inestable</li>
                      <li>• <strong>2-4 dKH:</strong> Bajo, requiere monitoreo</li>
                      <li>• <strong>4-8 dKH:</strong> Ideal para mayoría de acuarios</li>
                      <li>• <strong>&gt;8 dKH:</strong> Alto, bueno para cíclidos africanos</li>
                    </ul>
                  </div>
                  <p className="text-xs text-teal-600 italic">
                    💡 KH bajo puede causar "crash" de pH durante el ciclado
                  </p>
                </div>
              </div>

              {/* GH */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-5 border border-green-200">
                <h4 className="font-bold text-green-800 mb-3">
                  GH - Dureza General
                  <InfoTooltip 
                    content="GH mide calcio y magnesio disueltos. Afecta osmorregulación, crecimiento de plantas y muda de invertebrados."
                    advanced={true}
                  />
                </h4>
                <div className="space-y-2 text-sm">
                  <p className="text-gray-700">
                    Cantidad de minerales disueltos (Ca²⁺, Mg²⁺)
                  </p>
                  <div className="bg-white rounded-lg p-3">
                    <p className="font-semibold text-green-700">Preferencias por tipo:</p>
                    <ul className="mt-2 space-y-1 text-xs">
                      <li>• <strong>0-4 dGH:</strong> Agua muy blanda (Discos, Tetras)</li>
                      <li>• <strong>4-8 dGH:</strong> Agua blanda (mayoría tropicales)</li>
                      <li>• <strong>8-12 dGH:</strong> Agua media (Guppys, Platys)</li>
                      <li>• <strong>&gt;12 dGH:</strong> Agua dura (Cíclidos africanos)</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Temperatura */}
              <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-5 border border-orange-200">
                <h4 className="font-bold text-orange-800 mb-3">
                  Temperatura
                  <InfoTooltip 
                    content="Afecta metabolismo, oxígeno disuelto, velocidad de reacciones químicas y actividad bacteriana."
                  />
                </h4>
                <div className="space-y-2 text-sm">
                  <p className="text-gray-700">
                    Factor crítico para el metabolismo
                  </p>
                  <div className="bg-white rounded-lg p-3">
                    <p className="font-semibold text-orange-700">Efectos en el ciclado:</p>
                    <ul className="mt-2 space-y-1 text-xs">
                      <li>• <strong>&lt;20°C:</strong> Ciclado muy lento (8-12 semanas)</li>
                      <li>• <strong>24-28°C:</strong> Óptimo para ciclado (4-6 semanas)</li>
                      <li>• <strong>&gt;30°C:</strong> Menos oxígeno, estrés bacteriano</li>
                    </ul>
                  </div>
                  <p className="text-xs text-orange-600 italic">
                    💡 Cada 10°C duplica la velocidad de las reacciones químicas
                  </p>
                </div>
              </div>
            </div>

            {/* Tests necesarios */}
            <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6">
              <h4 className="font-bold text-gray-800 mb-4 flex items-center">
                <Microscope className="w-5 h-5 mr-2 text-blue-600" />
                Tests de Agua Necesarios
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg p-4 border-l-4 border-red-500">
                  <p className="font-semibold text-red-700">Esenciales (Diario durante ciclado)</p>
                  <ul className="mt-2 text-sm space-y-1">
                    <li>✓ Amoniaco (NH₃/NH₄⁺)</li>
                    <li>✓ Nitritos (NO₂⁻)</li>
                    <li>✓ Nitratos (NO₃⁻)</li>
                    <li>✓ pH</li>
                  </ul>
                </div>
                <div className="bg-white rounded-lg p-4 border-l-4 border-yellow-500">
                  <p className="font-semibold text-yellow-700">Importantes (Semanal)</p>
                  <ul className="mt-2 text-sm space-y-1">
                    <li>✓ KH (Dureza carbonatada)</li>
                    <li>✓ GH (Dureza general)</li>
                    <li>✓ Temperatura</li>
                  </ul>
                </div>
                <div className="bg-white rounded-lg p-4 border-l-4 border-green-500">
                  <p className="font-semibold text-green-700">Opcionales (Mensual)</p>
                  <ul className="mt-2 text-sm space-y-1">
                    <li>• Fosfatos (PO₄³⁻)</li>
                    <li>• Hierro (Fe)</li>
                    <li>• Cobre (Cu)</li>
                    <li>• CO₂</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab de Métodos de Ciclado */}
      {activeTab === 'methods' && (
        <div className="space-y-6">
          {/* Método Sin Peces (Recomendado) */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <Leaf className="w-6 h-6 mr-3 text-green-600" />
              Ciclado Sin Peces (Método Ético y Recomendado)
            </h3>

            <div className="bg-green-50 rounded-xl p-4 mb-6 border-l-4 border-green-500">
              <p className="text-green-800">
                <strong>✅ Método más ético y eficiente.</strong> No somete a ningún animal a condiciones tóxicas.
                Permite control total del proceso y resultados predecibles.
              </p>
            </div>

            {/* Paso a paso detallado */}
            <div className="space-y-4">
              <h4 className="font-bold text-gray-800 text-lg">Guía Paso a Paso Completa:</h4>
              
              {[
                {
                  step: 1,
                  title: "Preparación del Sistema",
                  duration: "Día 1",
                  color: "blue",
                  tasks: [
                    "Instalar y verificar todo el equipamiento (filtro, calentador, aireador)",
                    "Llenar con agua declorada (usar acondicionador o dejar reposar 24-48h)",
                    "Ajustar temperatura a 26-28°C para acelerar el proceso",
                    "Encender filtro y aireación 24/7",
                    "Añadir bacterias comerciales si están disponibles (opcional pero acelera el proceso)"
                  ],
                  tips: "Usa agua del grifo tratada. El cloro/cloramina mata las bacterias beneficiosas.",
                  warning: "No uses jabón ni químicos para limpiar. Solo agua."
                },
                {
                  step: 2,
                  title: "Inicio del Ciclado - Fuente de Amoniaco",
                  duration: "Días 1-3",
                  color: "purple",
                  tasks: [
                    "Opción A: Añadir amoniaco puro (sin surfactantes) hasta 2-4 ppm",
                    "Opción B: Añadir comida de peces (1 pizca por cada 40L)",
                    "Opción C: Colocar un camarón crudo (1 por cada 40L)",
                    "Medir amoniaco diariamente",
                    "Mantener amoniaco entre 2-4 ppm añadiendo más si baja"
                  ],
                  tips: "El amoniaco puro es más preciso. Busca amoniaco al 9-10% sin aditivos.",
                  warning: "Demasiado amoniaco (>5 ppm) puede inhibir las bacterias."
                },
                {
                  step: 3,
                  title: "Fase 1: Desarrollo de Nitrosomonas",
                  duration: "Días 4-14",
                  color: "red",
                  tasks: [
                    "Continuar midiendo amoniaco diariamente",
                    "Mantener amoniaco en 2-4 ppm",
                    "Comenzar a medir nitritos a partir del día 5-7",
                    "Observar descenso gradual de amoniaco",
                    "Aparición y aumento de nitritos indica progreso"
                  ],
                  tips: "Paciencia. Las primeras bacterias tardan 7-10 días en multiplicarse.",
                  warning: "No hagas cambios de agua a menos que pH caiga por debajo de 6.5."
                },
                {
                  step: 4,
                  title: "Fase 2: Pico de Nitritos",
                  duration: "Días 15-25",
                  color: "orange",
                  tasks: [
                    "Los nitritos subirán rápidamente (puede superar 5 ppm)",
                    "Reducir adición de amoniaco a 1-2 ppm",
                    "Comenzar a medir nitratos",
                    "Esperar pacientemente - esta es la fase más larga",
                    "Si nitritos >8 ppm, hacer cambio de agua del 30%"
                  ],
                  tips: "El pico de nitritos es normal y necesario. No te alarmes.",
                  warning: "Nitritos muy altos (>8 ppm) pueden detener el proceso."
                },
                {
                  step: 5,
                  title: "Fase 3: Desarrollo de Nitrobacter",
                  duration: "Días 26-35",
                  color: "yellow",
                  tasks: [
                    "Los nitritos comenzarán a bajar",
                    "Los nitratos aumentarán constantemente",
                    "Continuar añadiendo 1-2 ppm de amoniaco diario",
                    "Medir los tres compuestos diariamente",
                    "Observar caída gradual de nitritos a 0"
                  ],
                  tips: "Ya casi terminas. Las Nitrobacter son más lentas pero llegarán.",
                  warning: "No te impacientes. Añadir peces ahora sería fatal."
                },
                {
                  step: 6,
                  title: "Finalización y Verificación",
                  duration: "Días 36-42",
                  color: "green",
                  tasks: [
                    "Añadir 2-3 ppm de amoniaco",
                    "Esperar 24 horas y medir",
                    "Si NH₃=0 y NO₂=0 en 24h, el ciclado está completo",
                    "Repetir el test 2-3 días para confirmar",
                    "Hacer cambio de agua del 50% antes de añadir peces"
                  ],
                  tips: "¡Felicidades! Tu acuario puede procesar desechos de forma segura.",
                  warning: "Añade peces gradualmente, no todos de golpe."
                }
              ].map(({ step, title, duration, color, tasks, tips, warning }) => (
                <div key={step} className={`bg-gradient-to-r from-${color}-50 to-${color}-100 rounded-xl p-5 border-l-4 border-${color}-500`}>
                  <div className="flex items-start justify-between mb-3">
                    <h5 className={`font-bold text-${color}-800 text-lg flex items-center`}>
                      <span className={`w-8 h-8 bg-${color}-600 text-white rounded-full flex items-center justify-center mr-3 text-sm`}>
                        {step}
                      </span>
                      {title}
                    </h5>
                    <span className={`text-sm font-semibold text-${color}-700 bg-white px-3 py-1 rounded-full`}>
                      {duration}
                    </span>
                  </div>
                  
                  <ul className="space-y-2 mb-3">
                    {tasks.map((task, idx) => (
                      <li key={idx} className="flex items-start text-sm text-gray-700">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        {task}
                      </li>
                    ))}
                  </ul>
                  
                  {tips && (
                    <div className="bg-white/70 rounded-lg p-3 mb-2">
                      <p className="text-sm text-gray-700">
                        <span className="font-semibold text-blue-600">💡 Consejo:</span> {tips}
                      </p>
                    </div>
                  )}
                  
                  {warning && (
                    <div className="bg-red-50 rounded-lg p-3 border border-red-200">
                      <p className="text-sm text-red-700">
                        <span className="font-semibold">⚠️ Precaución:</span> {warning}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Alternativas de fuentes de amoniaco */}
            <div className="mt-8 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6">
              <h4 className="font-bold text-indigo-800 mb-4">
                Fuentes de Amoniaco - Ventajas y Desventajas
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg p-4">
                  <h5 className="font-semibold text-purple-700 mb-2">Amoniaco Puro (Supermercado)</h5>
                  <div className="text-sm space-y-1">
                    <p className="text-green-600">✅ Preciso y controlable</p>
                    <p className="text-green-600">✅ Sin residuos</p>
                    <p className="text-green-600">✅ Proceso más rápido</p>
                    <p className="text-red-600">❌ Puede ser difícil de encontrar</p>
                    <p className="text-red-600">❌ Requiere cuidado al dosificar</p>
                  </div>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <h5 className="font-semibold text-purple-700 mb-2">Comida de Peces</h5>
                  <div className="text-sm space-y-1">
                    <p className="text-green-600">✅ Fácil de conseguir</p>
                    <p className="text-green-600">✅ Método tradicional</p>
                    <p className="text-red-600">❌ Impreciso</p>
                    <p className="text-red-600">❌ Puede causar hongos</p>
                    <p className="text-red-600">❌ Ensucia el acuario</p>
                  </div>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <h5 className="font-semibold text-purple-700 mb-2">Materia Orgánica</h5>
                  <div className="text-sm space-y-1">
                    <p className="text-green-600">✅ Simula condiciones naturales</p>
                    <p className="text-green-600">✅ Libera amoniaco gradualmente</p>
                    <p className="text-red-600">❌ Muy impreciso</p>
                    <p className="text-red-600">❌ Puede oler mal</p>
                    <p className="text-red-600">❌ Difícil de remover</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Otros métodos (con advertencias) */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <AlertTriangle className="w-6 h-6 mr-3 text-red-600" />
              Otros Métodos (No Recomendados)
            </h3>

            <div className="space-y-4">
              {/* Ciclado con peces */}
              <div className="bg-red-50 rounded-xl p-5 border-l-4 border-red-500">
                <h4 className="font-bold text-red-800 mb-3">
                  ❌ Ciclado con Peces (Fish-in Cycling)
                </h4>
                <p className="text-sm text-gray-700 mb-3">
                  Método antiguo y cruel que somete a los peces a envenenamiento por amoniaco y nitritos.
                </p>
                <div className="bg-red-100 rounded-lg p-3">
                  <p className="text-sm text-red-800">
                    <strong>Por qué NO hacerlo:</strong>
                  </p>
                  <ul className="mt-2 space-y-1 text-sm text-red-700">
                    <li>• Causa sufrimiento innecesario y muerte de peces</li>
                    <li>• Daño permanente a órganos aunque sobrevivan</li>
                    <li>• Requiere cambios de agua diarios estresantes</li>
                    <li>• Más lento que el método sin peces</li>
                    <li>• Éticamente inaceptable teniendo alternativas</li>
                  </ul>
                </div>
              </div>

              {/* Ciclado instantáneo */}
              <div className="bg-yellow-50 rounded-xl p-5 border-l-4 border-yellow-500">
                <h4 className="font-bold text-yellow-800 mb-3">
                  ⚠️ "Ciclado Instantáneo" con Productos Comerciales
                </h4>
                <p className="text-sm text-gray-700 mb-3">
                  Productos que prometen ciclado inmediato o en pocos días.
                </p>
                <div className="bg-yellow-100 rounded-lg p-3">
                  <p className="text-sm text-yellow-800">
                    <strong>Realidad:</strong>
                  </p>
                  <ul className="mt-2 space-y-1 text-sm text-yellow-700">
                    <li>• Las bacterias en botella pueden ayudar pero NO son instantáneas</li>
                    <li>• Muchos productos contienen bacterias muertas o incorrectas</li>
                    <li>• Aún requiere 2-3 semanas mínimo con los mejores productos</li>
                    <li>• Úsalos como acelerador, no como solución mágica</li>
                    <li>• Siempre verifica con tests antes de añadir peces</li>
                  </ul>
                </div>
              </div>

              {/* Ciclado silencioso */}
              <div className="bg-blue-50 rounded-xl p-5 border-l-4 border-blue-500">
                <h4 className="font-bold text-blue-800 mb-3">
                  🌱 Ciclado Silencioso (Con Plantas)
                </h4>
                <p className="text-sm text-gray-700 mb-3">
                  Método usando plantas de crecimiento rápido para absorber amoniaco directamente.
                </p>
                <div className="bg-blue-100 rounded-lg p-3">
                  <p className="text-sm text-blue-800">
                    <strong>Consideraciones:</strong>
                  </p>
                  <ul className="mt-2 space-y-1 text-sm text-blue-700">
                    <li>• Funciona pero es impredecible (1-3 meses)</li>
                    <li>• Requiere MUCHAS plantas de crecimiento rápido</li>
                    <li>• Las plantas pueden consumir el amoniaco antes que las bacterias</li>
                    <li>• Difícil saber cuándo está realmente ciclado</li>
                    <li>• Mejor como complemento, no como método principal</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab de Monitoreo */}
      {activeTab === 'monitoring' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <Activity className="w-6 h-6 mr-3 text-orange-600" />
              Monitoreo y Seguimiento del Ciclado
            </h3>

            {/* Calendario de mediciones */}
            <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl p-6 mb-6">
              <h4 className="font-bold text-orange-800 mb-4 flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                Calendario de Mediciones
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-4">
                  <p className="font-semibold text-orange-700 mb-2">Durante el Ciclado (Semanas 1-6)</p>
                  <ul className="space-y-1 text-sm">
                    <li className="flex items-center">
                      <span className="text-red-600 font-bold mr-2">Diario:</span>
                      NH₃, NO₂⁻, NO₃⁻, pH, Temperatura
                    </li>
                    <li className="flex items-center">
                      <span className="text-yellow-600 font-bold mr-2">Cada 3 días:</span>
                      KH, GH
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-600 font-bold mr-2">Semanal:</span>
                      Revisión general del sistema
                    </li>
                  </ul>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <p className="font-semibold text-green-700 mb-2">Acuario Ciclado (Mantenimiento)</p>
                  <ul className="space-y-1 text-sm">
                    <li className="flex items-center">
                      <span className="text-blue-600 font-bold mr-2">Semanal:</span>
                      NO₃⁻, pH, Temperatura
                    </li>
                    <li className="flex items-center">
                      <span className="text-purple-600 font-bold mr-2">Quincenal:</span>
                      NH₃, NO₂⁻, KH, GH
                    </li>
                    <li className="flex items-center">
                      <span className="text-gray-600 font-bold mr-2">Mensual:</span>
                      Test completo de todos los parámetros
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Gráfico típico del ciclado */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 mb-6">
              <h4 className="font-bold text-purple-800 mb-4 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2" />
                Evolución Típica de los Parámetros
              </h4>
              <div className="bg-white rounded-lg p-4">
                <div className="space-y-3">
                  <div className="flex items-center">
                    <span className="w-20 text-sm font-semibold text-red-600">Amoniaco:</span>
                    <div className="flex-1 ml-2">
                      <div className="text-xs text-gray-600 mb-1">Sube días 1-7, baja días 8-20, cero día 21+</div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-red-300 via-red-500 to-red-100" style={{width: '60%'}}></div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="w-20 text-sm font-semibold text-orange-600">Nitritos:</span>
                    <div className="flex-1 ml-2">
                      <div className="text-xs text-gray-600 mb-1">Aparece día 7-10, pico días 15-25, cero día 30+</div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-orange-100 via-orange-500 to-orange-100" style={{width: '80%'}}></div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="w-20 text-sm font-semibold text-green-600">Nitratos:</span>
                    <div className="flex-1 ml-2">
                      <div className="text-xs text-gray-600 mb-1">Aparece día 14+, aumenta constantemente</div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-green-100 to-green-500" style={{width: '90%'}}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Registro de datos */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h4 className="font-bold text-gray-800 mb-4 flex items-center">
                <FileText className="w-5 h-5 mr-2" />
                Plantilla de Registro Diario
              </h4>
              <div className="bg-white rounded-lg p-4 font-mono text-sm">
                <div className="grid grid-cols-6 gap-2 font-bold border-b pb-2 mb-2">
                  <div>Día</div>
                  <div>NH₃</div>
                  <div>NO₂⁻</div>
                  <div>NO₃⁻</div>
                  <div>pH</div>
                  <div>Notas</div>
                </div>
                <div className="space-y-1 text-gray-600">
                  <div className="grid grid-cols-6 gap-2">
                    <div>1</div>
                    <div>3.0</div>
                    <div>0</div>
                    <div>0</div>
                    <div>7.6</div>
                    <div>Inicio</div>
                  </div>
                  <div className="grid grid-cols-6 gap-2">
                    <div>7</div>
                    <div>2.5</div>
                    <div>0.25</div>
                    <div>5</div>
                    <div>7.4</div>
                    <div>¡Nitritos!</div>
                  </div>
                  <div className="grid grid-cols-6 gap-2">
                    <div>14</div>
                    <div>0.5</div>
                    <div>2.0</div>
                    <div>20</div>
                    <div>7.2</div>
                    <div>Progreso</div>
                  </div>
                  <div className="grid grid-cols-6 gap-2">
                    <div>...</div>
                    <div>...</div>
                    <div>...</div>
                    <div>...</div>
                    <div>...</div>
                    <div>...</div>
                  </div>
                </div>
              </div>
              <p className="text-xs text-gray-600 mt-2 italic">
                💡 Tip: Mantén un registro detallado. Te ayudará a identificar patrones y problemas.
              </p>
            </div>

            {/* Interpretación de resultados */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-green-50 rounded-xl p-5 border border-green-200">
                <h5 className="font-bold text-green-800 mb-3 flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Señales de Progreso Correcto
                </h5>
                <ul className="space-y-2 text-sm text-green-700">
                  <li>• Amoniaco comienza a bajar después de 7-10 días</li>
                  <li>• Aparición de nitritos indica bacterias activas</li>
                  <li>• Nitratos aumentando = ciclo funcionando</li>
                  <li>• pH estable o bajando lentamente</li>
                  <li>• Agua clara (turbidez inicial es normal)</li>
                </ul>
              </div>
              <div className="bg-red-50 rounded-xl p-5 border border-red-200">
                <h5 className="font-bold text-red-800 mb-3 flex items-center">
                  <XCircle className="w-5 h-5 mr-2" />
                  Señales de Problemas
                </h5>
                <ul className="space-y-2 text-sm text-red-700">
                  <li>• Amoniaco no baja después de 2 semanas</li>
                  <li>• pH cae por debajo de 6.5</li>
                  <li>• Nitritos &gt;8 ppm por más de una semana</li>
                  <li>• Olor a huevo podrido (bacterias anaeróbicas)</li>
                  <li>• Crecimiento excesivo de hongos/moho</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab de Problemas Comunes */}
      {activeTab === 'problems' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <AlertCircle className="w-6 h-6 mr-3 text-red-600" />
              Problemas Comunes y Soluciones
            </h3>

            <div className="space-y-4">
              {[
                {
                  problem: "El ciclado se detuvo (amoniaco no baja)",
                  causes: [
                    "pH muy bajo (<6.5)",
                    "Temperatura muy baja (<20°C)",
                    "Cloro/cloramina en el agua",
                    "Falta de oxígeno",
                    "Amoniaco muy alto (>5 ppm)"
                  ],
                  solutions: [
                    "Verificar y ajustar pH con bicarbonato",
                    "Subir temperatura a 26-28°C",
                    "Usar acondicionador de agua",
                    "Aumentar aireación",
                    "Cambio de agua del 50% si NH₃ >5 ppm"
                  ],
                  severity: "high"
                },
                {
                  problem: "Nitritos muy altos que no bajan",
                  causes: [
                    "Normal durante el pico (días 15-25)",
                    "Exceso de amoniaco inicial",
                    "Falta de bacterias Nitrobacter",
                    "pH inadecuado"
                  ],
                  solutions: [
                    "Paciencia si es el pico normal",
                    "Cambio de agua 30% si NO₂⁻ >8 ppm",
                    "Reducir adición de amoniaco",
                    "Añadir sal (1g/L) temporalmente",
                    "Verificar pH (ideal 7.0-7.5)"
                  ],
                  severity: "medium"
                },
                {
                  problem: "pH cayendo constantemente",
                  causes: [
                    "KH bajo (poca capacidad buffer)",
                    "Acumulación de ácidos por nitrificación",
                    "CO₂ excesivo",
                    "Materia orgánica descomponiéndose"
                  ],
                  solutions: [
                    "Añadir bicarbonato de sodio (1 cucharadita/40L)",
                    "Cambio de agua con agua de mayor KH",
                    "Aumentar aireación para eliminar CO₂",
                    "Remover materia orgánica en descomposición",
                    "Usar coral triturado en el filtro"
                  ],
                  severity: "high"
                },
                {
                  problem: "Agua turbia/lechosa",
                  causes: [
                    "Bloom bacteriano (normal días 2-5)",
                    "Partículas de sustrato",
                    "Sobrealimentación con comida",
                    "Bacterias muertas"
                  ],
                  solutions: [
                    "Esperar si es bloom inicial",
                    "No hacer cambios de agua los primeros días",
                    "Reducir fuente de amoniaco",
                    "Aumentar filtración mecánica",
                    "Paciencia - se aclarará solo"
                  ],
                  severity: "low"
                },
                {
                  problem: "Algas durante el ciclado",
                  causes: [
                    "Exceso de luz",
                    "Nitratos acumulándose",
                    "Fosfatos en el agua",
                    "Desequilibrio de nutrientes"
                  ],
                  solutions: [
                    "Reducir fotoperiodo a 6 horas",
                    "Normal - las algas consumen nitratos",
                    "No preocuparse durante ciclado",
                    "Limpiar después del ciclado",
                    "Añadir plantas de crecimiento rápido"
                  ],
                  severity: "low"
                },
                {
                  problem: "Olor desagradable",
                  causes: [
                    "Zonas anaeróbicas (sin oxígeno)",
                    "Materia orgánica pudriéndose",
                    "Sustrato muy compacto",
                    "Filtro sucio"
                  ],
                  solutions: [
                    "Aumentar flujo y aireación",
                    "Remover materia orgánica visible",
                    "Remover sustrato con palillo",
                    "Limpiar filtro mecánico",
                    "Sifonear zonas problemáticas"
                  ],
                  severity: "medium"
                }
              ].map(({ problem, causes, solutions, severity }) => (
                <div key={problem} className={`rounded-xl p-5 border-l-4 ${
                  severity === 'high' ? 'bg-red-50 border-red-500' :
                  severity === 'medium' ? 'bg-yellow-50 border-yellow-500' :
                  'bg-blue-50 border-blue-500'
                }`}>
                  <h4 className={`font-bold mb-3 ${
                    severity === 'high' ? 'text-red-800' :
                    severity === 'medium' ? 'text-yellow-800' :
                    'text-blue-800'
                  }`}>
                    {problem}
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="font-semibold text-gray-700 mb-2 text-sm">Causas posibles:</p>
                      <ul className="space-y-1">
                        {causes.map((cause, idx) => (
                          <li key={idx} className="text-sm text-gray-600 flex items-start">
                            <span className="text-gray-400 mr-2">•</span>
                            {cause}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-700 mb-2 text-sm">Soluciones:</p>
                      <ul className="space-y-1">
                        {solutions.map((solution, idx) => (
                          <li key={idx} className="text-sm text-gray-600 flex items-start">
                            <CheckCircle className="w-3 h-3 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            {solution}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* FAQ rápido */}
            <div className="mt-8 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6">
              <h4 className="font-bold text-gray-800 mb-4 flex items-center">
                <HelpCircle className="w-5 h-5 mr-2" />
                Preguntas Frecuentes Rápidas
              </h4>
              <div className="space-y-3">
                <details className="bg-white rounded-lg p-3">
                  <summary className="font-semibold text-gray-700 cursor-pointer">
                    ¿Puedo acelerar el ciclado?
                  </summary>
                  <p className="mt-2 text-sm text-gray-600">
                    Sí: temperatura 28°C, pH 7.5-8.0, bacterias comerciales de calidad, 
                    medio filtrante de acuario maduro, buena oxigenación. Pero nunca menos de 3 semanas.
                  </p>
                </details>
                <details className="bg-white rounded-lg p-3">
                  <summary className="font-semibold text-gray-700 cursor-pointer">
                    ¿Necesito luz durante el ciclado?
                  </summary>
                  <p className="mt-2 text-sm text-gray-600">
                    No es necesaria. Las bacterias prefieren oscuridad. Si tienes plantas, 
                    usa 6-8 horas máximo para evitar algas excesivas.
                  </p>
                </details>
                <details className="bg-white rounded-lg p-3">
                  <summary className="font-semibold text-gray-700 cursor-pointer">
                    ¿Cambios de agua durante el ciclado?
                  </summary>
                  <p className="mt-2 text-sm text-gray-600">
                    Solo si: pH &lt;6.5, amoniaco &gt;5 ppm, nitritos &gt;8 ppm. 
                    De lo contrario, no hagas cambios - retrasarás el proceso.
                  </p>
                </details>
                <details className="bg-white rounded-lg p-3">
                  <summary className="font-semibold text-gray-700 cursor-pointer">
                    Mi ciclado lleva 8 semanas y no termina
                  </summary>
                  <p className="mt-2 text-sm text-gray-600">
                    Revisa: temperatura (¿está muy baja?), pH (¿cayó mucho?), 
                    oxígeno (¿hay buena aireación?), cloro (¿usaste acondicionador?). 
                    Algunos sistemas tardan hasta 10 semanas.
                  </p>
                </details>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab Avanzada */}
      {activeTab === 'advanced' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <BookOpen className="w-6 h-6 mr-3 text-indigo-600" />
              Conceptos Avanzados y Optimización
            </h3>

            {/* Microbiología detallada */}
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 mb-6">
              <h4 className="font-bold text-indigo-800 mb-4 flex items-center">
                <Microscope className="w-5 h-5 mr-2" />
                Microbiología Profunda del Filtro
              </h4>
              <div className="space-y-3 text-sm">
                <p className="text-gray-700">
                  Un filtro maduro contiene un ecosistema complejo, no solo bacterias nitrificantes:
                </p>
                <div className="bg-white rounded-lg p-4">
                  <ul className="space-y-2">
                    <li>
                      <strong className="text-purple-700">Bacterias autótrofas:</strong>
                      <InfoTooltip 
                        content="Obtienen energía de compuestos inorgánicos (NH₃, NO₂⁻). Crecen lentamente, forman biofilm delgado."
                        advanced={true}
                      />
                      Nitrosomonas, Nitrobacter, Nitrospira (nitrificación)
                    </li>
                    <li>
                      <strong className="text-purple-700">Bacterias heterótrofas:</strong>
                      <InfoTooltip 
                        content="Descomponen materia orgánica. Crecen 10x más rápido que autótrofas. Compiten por espacio y oxígeno."
                        advanced={true}
                      />
                      Descomponen proteínas, carbohidratos, lípidos
                    </li>
                    <li>
                      <strong className="text-purple-700">Protozoos:</strong>
                      <InfoTooltip 
                        content="Ciliados, flagelados, amebas. Consumen bacterias muertas y partículas. Indicadores de madurez del filtro."
                        advanced={true}
                      />
                      Controlan población bacteriana, claridad del agua
                    </li>
                    <li>
                      <strong className="text-purple-700">Rotíferos y nematodos:</strong>
                      Microfauna que procesa detritus fino
                    </li>
                    <li>
                      <strong className="text-purple-700">Arqueas:</strong>
                      <InfoTooltip 
                        content="Thaumarchaeota realiza oxidación de amoniaco en algunos sistemas. Más eficientes que bacterias en baja concentración."
                        advanced={true}
                      />
                      Oxidación de amoniaco alternativa
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Optimización del proceso */}
            <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-xl p-6 mb-6">
              <h4 className="font-bold text-green-800 mb-4 flex items-center">
                <Target className="w-5 h-5 mr-2" />
                Técnicas de Optimización Avanzadas
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-4">
                  <h5 className="font-semibold text-green-700 mb-2">Siembra de Bacterias</h5>
                  <ul className="text-sm space-y-1 text-gray-600">
                    <li>• Usar medio filtrante de acuario maduro (mejor opción)</li>
                    <li>• Exprimir esponja de filtro establecido en tu filtro</li>
                    <li>• Transferir 20-30% del medio biológico</li>
                    <li>• Reduce tiempo a 2-3 semanas</li>
                  </ul>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <h5 className="font-semibold text-green-700 mb-2">Maximizar Superficie</h5>
                  <ul className="text-sm space-y-1 text-gray-600">
                    <li>• Usar biomedia de alta porosidad (30,000 m²/m³)</li>
                    <li>• Matrix, biohome, ceramic rings premium</li>
                    <li>• Fluidized bed filters para máxima eficiencia</li>
                    <li>• Superficie = velocidad de ciclado</li>
                  </ul>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <h5 className="font-semibold text-green-700 mb-2">Control Preciso</h5>
                  <ul className="text-sm space-y-1 text-gray-600">
                    <li>• Mantener NH₃ en 2-3 ppm exactos</li>
                    <li>• pH 7.8-8.0 para máxima eficiencia</li>
                    <li>• Temperatura constante 27-28°C</li>
                    <li>• KH &gt;4 para estabilidad</li>
                  </ul>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <h5 className="font-semibold text-green-700 mb-2">Suplementación</h5>
                  <ul className="text-sm space-y-1 text-gray-600">
                    <li>• Añadir trazas de fósforo (relación C:N:P = 100:10:1)</li>
                    <li>• Micronutrientes (Fe, Mo, Cu en trazas)</li>
                    <li>• Bacterias comerciales específicas</li>
                    <li>• Enzimas para acelerar descomposición</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Ciclado para diferentes sistemas */}
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6 mb-6">
              <h4 className="font-bold text-blue-800 mb-4">
                Ciclado Específico por Tipo de Sistema
              </h4>
              <div className="space-y-3">
                <div className="bg-white rounded-lg p-4">
                  <h5 className="font-semibold text-blue-700">Acuario Marino/Arrecife</h5>
                  <p className="text-sm text-gray-600 mt-1">
                    Usa roca viva curada, arena viva. Proceso más largo (6-12 semanas). 
                    Monitorear también fosfatos y silicatos. Skimmer después del ciclado.
                  </p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <h5 className="font-semibold text-blue-700">Acuario Plantado High-Tech</h5>
                  <p className="text-sm text-gray-600 mt-1">
                    Método DSM (Dry Start) o ciclado silencioso. CO₂ después de plantar. 
                    Las plantas pueden competir con bacterias por NH₃.
                  </p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <h5 className="font-semibold text-blue-700">Biotopo Amazónico (pH bajo)</h5>
                  <p className="text-sm text-gray-600 mt-1">
                    Ciclado más lento por pH ácido. Pre-ciclar a pH neutro, luego bajar gradualmente. 
                    Considerar taninos y su efecto antibacteriano.
                  </p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <h5 className="font-semibold text-blue-700">Goldfish/Koi (Alta carga biológica)</h5>
                  <p className="text-sm text-gray-600 mt-1">
                    Sobre-dimensionar filtración 2-3x. Ciclar a 4-5 ppm NH₃. 
                    Considerar filtro de cámara húmeda/seca. Más tiempo de maduración.
                  </p>
                </div>
              </div>
            </div>

            {/* Mantenimiento del ciclo */}
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-6">
              <h4 className="font-bold text-orange-800 mb-4 flex items-center">
                <Shield className="w-5 h-5 mr-2" />
                Mantenimiento del Ciclo Establecido
              </h4>
              <div className="bg-white rounded-lg p-4">
                <p className="font-semibold text-orange-700 mb-3">Cómo NO perder el ciclado:</p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start">
                    <span className="text-orange-500 mr-2">⚠️</span>
                    <span><strong>Limpieza del filtro:</strong> Nunca con agua del grifo. Usar agua del acuario, limpiar solo 1/3 del medio por vez.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-500 mr-2">⚠️</span>
                    <span><strong>Medicamentos:</strong> Antibióticos pueden matar bacterias beneficiosas. Usar con precaución.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-500 mr-2">⚠️</span>
                    <span><strong>Cortes de energía:</strong> Las bacterias mueren sin oxígeno en 2-4 horas. Tener backup.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-500 mr-2">⚠️</span>
                    <span><strong>Sobrealimentación:</strong> Puede sobrecargar el sistema. Las bacterias tienen límite de procesamiento.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-500 mr-2">⚠️</span>
                    <span><strong>Cambios drásticos:</strong> pH, temperatura, salinidad bruscos pueden shockear bacterias.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mensaje final motivacional */}
      <div className="mt-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-6 text-white text-center">
        <h3 className="text-2xl font-bold mb-3">¡El Ciclado es la Base del Éxito!</h3>
        <p className="text-lg mb-4">
          La paciencia durante el ciclado será recompensada con años de disfrute 
          viendo a tus peces prosperar en un ambiente saludable.
        </p>
        <div className="flex justify-center space-x-4">
          <div className="flex items-center">
            <Heart className="w-5 h-5 mr-2" />
            <span>Ético</span>
          </div>
          <div className="flex items-center">
            <Shield className="w-5 h-5 mr-2" />
            <span>Seguro</span>
          </div>
          <div className="flex items-center">
            <CheckCircle className="w-5 h-5 mr-2" />
            <span>Exitoso</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Imports necesarios adicionales ya están incluidos arriba

export default CyclingGuideComplete;
