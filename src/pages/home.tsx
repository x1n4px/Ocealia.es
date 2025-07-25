import { useState, useEffect } from 'react';
import {
  Fish,
  Droplets,
  Thermometer,
  Filter,
  Leaf,
  Settings,
  ChevronDown,
  Clock,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  Beaker,
  Heart,
  Shield,
  Zap,
  Waves,
  Eye,
  Activity,
  Github
} from 'lucide-react';

function Home() {
  const [activeSection, setActiveSection] = useState('inicio');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['inicio', 'ciclado', 'montaje', 'tipos', 'filtracion', 'peces', 'plantas', 'parametros', 'hospital', 'productos'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const NitrogenCycleChart = () => {
    return (
      <div className="bg-gradient-to-br from-blue-50 to-green-50 p-6 rounded-xl border border-blue-200">
        <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
          Evolución del Ciclo del Nitrógeno
        </h4>
        <div className="relative h-64 mb-4">
          <svg viewBox="0 0 400 200" className="w-full h-full">
            {/* Grid lines */}
            <defs>
              <pattern id="grid" width="40" height="20" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 20" fill="none" stroke="#e5e7eb" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="400" height="200" fill="url(#grid)" />

            {/* Axes */}
            <line x1="40" y1="180" x2="380" y2="180" stroke="#374151" strokeWidth="2" />
            <line x1="40" y1="20" x2="40" y2="180" stroke="#374151" strokeWidth="2" />

            {/* Ammonia curve (red) */}
            <path d="M 40 180 Q 80 60 120 80 Q 160 100 200 140 Q 240 160 280 170 Q 320 175 360 178"
              fill="none" stroke="#ef4444" strokeWidth="3" />

            {/* Nitrite curve (orange) */}
            <path d="M 40 180 Q 100 180 140 120 Q 180 60 220 80 Q 260 100 300 140 Q 340 160 380 170"
              fill="none" stroke="#f97316" strokeWidth="3" />

            {/* Nitrate curve (green) */}
            <path d="M 40 180 Q 120 180 160 160 Q 200 140 240 120 Q 280 100 320 80 Q 360 60 380 50"
              fill="none" stroke="#22c55e" strokeWidth="3" />

            {/* Labels */}
            <text x="50" y="15" className="text-xs fill-gray-600">Alto</text>
            <text x="50" y="195" className="text-xs fill-gray-600">Bajo</text>
            <text x="60" y="195" className="text-xs fill-gray-600">Semana 1</text>
            <text x="160" y="195" className="text-xs fill-gray-600">Semana 3</text>
            <text x="260" y="195" className="text-xs fill-gray-600">Semana 5</text>
            <text x="340" y="195" className="text-xs fill-gray-600">Semana 7</text>
          </svg>

          {/* Legend */}
          <div className="flex justify-center space-x-6 mt-4">
            <div className="flex items-center">
              <div className="w-4 h-1 bg-red-500 mr-2"></div>
              <span className="text-sm text-gray-600">Amoniaco (NH₃)</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-1 bg-orange-500 mr-2"></div>
              <span className="text-sm text-gray-600">Nitritos (NO₂⁻)</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-1 bg-green-500 mr-2"></div>
              <span className="text-sm text-gray-600">Nitratos (NO₃⁻)</span>
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-start">
            <AlertTriangle className="w-5 h-5 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
            <div>
              <h5 className="font-semibold text-yellow-800 mb-2">Consejos Importantes:</h5>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• Mide los parámetros diariamente con test de gotas</li>
                <li>• NO toques el agua durante el proceso de ciclado</li>
                <li>• NO hagas cambios de agua hasta completar el ciclo</li>
                <li>• La paciencia es clave: el proceso toma 4-8 semanas</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-lg z-50 border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Fish className="w-8 h-8 text-blue-600" />
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                AquaGuía
              </span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-1">
              {[
                { id: 'inicio', label: 'Inicio', icon: Fish },
                { id: 'ciclado', label: 'Ciclado', icon: Activity },
                { id: 'montaje', label: 'Montaje', icon: Settings },
                { id: 'tipos', label: 'Tipos', icon: Droplets },
                { id: 'filtracion', label: 'Filtración', icon: Filter },
                { id: 'peces', label: 'Peces', icon: Fish },
                { id: 'plantas', label: 'Plantas', icon: Leaf },
                { id: 'parametros', label: 'Parámetros', icon: Thermometer },
                { id: 'hospital', label: 'Hospital', icon: Heart },
                //{ id: 'productos', label: 'Productos', icon: Beaker }
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-1 ${activeSection === id
                      ? 'bg-blue-100 text-blue-700 shadow-sm'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                    }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{label}</span>
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-blue-50"
            >
              <ChevronDown className={`w-5 h-5 transition-transform ${isMenuOpen ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-blue-100">
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'inicio', label: 'Inicio', icon: Fish },
                  { id: 'ciclado', label: 'Ciclado', icon: Activity },
                  { id: 'montaje', label: 'Montaje', icon: Settings },
                  { id: 'tipos', label: 'Tipos', icon: Droplets },
                  { id: 'filtracion', label: 'Filtración', icon: Filter },
                  { id: 'peces', label: 'Peces', icon: Fish },
                  { id: 'plantas', label: 'Plantas', icon: Leaf },
                  { id: 'parametros', label: 'Parámetros', icon: Thermometer },
                  { id: 'hospital', label: 'Hospital', icon: Heart },
                 // { id: 'productos', label: 'Productos', icon: Beaker }
                ].map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => scrollToSection(id)}
                    className={`p-3 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${activeSection === id
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                      }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="inicio" className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-600 via-green-600 to-blue-800 bg-clip-text text-transparent">
                Guía Completa de
              </span>
              <br />
              <span className="bg-gradient-to-r from-green-600 via-blue-600 to-green-800 bg-clip-text text-transparent">
                Acuariofilia
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Todo lo que necesitas saber para crear y mantener un acuario próspero.
              Desde el ciclado hasta el cuidado avanzado de peces y plantas.
            </p>

            <div className="flex justify-center items-center mt-8">
            <div className="flex flex-col items-center space-y-2">
              <p className="text-sm text-gray-500 font-medium">
              Conoce la IA de acuariofilia más avanzada
              </p>
              <button
              onClick={() => window.location.href = "/nemo"}
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold shadow hover:bg-blue-700 transition-all duration-200 text-lg"
              >
              NemoAI
              <Fish className="w-5 h-5 ml-2" />
              </button>
            </div>
          </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-blue-100 hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4 mx-auto">
                <Droplets className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Fundamentos</h3>
              <p className="text-gray-600 text-sm">Aprende los conceptos básicos del ciclado y montaje</p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-green-100 hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-4 mx-auto">
                <Fish className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Vida Acuática</h3>
              <p className="text-gray-600 text-sm">Descubre peces y plantas compatibles para tu acuario</p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-purple-100 hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 mx-auto">
                <Settings className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Mantenimiento</h3>
              <p className="text-gray-600 text-sm">Mantén tu acuario saludable con técnicas avanzadas</p>
            </div>
          </div>
        </div>
      </section>

      {/* Ciclado Section */}
      <section id="ciclado" className="py-16 px-4 sm:px-6 lg:px-8 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Ciclado del Acuario
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              El proceso más importante antes de introducir vida en tu acuario
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-blue-100">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <Activity className="w-6 h-6 mr-3 text-blue-600" />
                ¿Qué es el Ciclado?
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                El ciclado es el proceso de establecer colonias de bacterias beneficiosas que convertirán
                los desechos tóxicos (amoniaco) en compuestos menos dañinos (nitratos) a través del ciclo del nitrógeno.
              </p>

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-red-600 font-bold text-sm">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Amoniaco (NH₃)</h4>
                    <p className="text-sm text-gray-600">Altamente tóxico para los peces</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-orange-600 font-bold text-sm">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Nitritos (NO₂⁻)</h4>
                    <p className="text-sm text-gray-600">También tóxicos, pero menos que el amoniaco</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-green-600 font-bold text-sm">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Nitratos (NO₃⁻)</h4>
                    <p className="text-sm text-gray-600">Relativamente seguros en concentraciones bajas</p>
                  </div>
                </div>
              </div>
            </div>

            <NitrogenCycleChart />
          </div>

          {/* Ciclado Sin Peces */}
          <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl shadow-lg p-8 border border-green-200">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <Leaf className="w-6 h-6 mr-3 text-green-600" />
              Ciclado Sin Peces (Recomendado)
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-4">Proceso Paso a Paso:</h4>
                <div className="space-y-4">
                  {[
                    { step: 1, title: "Preparación", desc: "Monta el acuario completo con filtro, calentador y decoración" },
                    { step: 2, title: "Fuente de Amoniaco", desc: "Añade comida de peces o amoniaco puro (2-3 ppm)" },
                    { step: 3, title: "Espera y Mide", desc: "Mide diariamente NH₃, NO₂⁻ y NO₃⁻" },
                    { step: 4, title: "Pico de Nitritos", desc: "Los nitritos subirán después del amoniaco" },
                    { step: 5, title: "Finalización", desc: "NH₃ y NO₂⁻ en 0, NO₃⁻ presente" }
                  ].map(({ step, title, desc }) => (
                    <div key={step} className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm">
                        {step}
                      </div>
                      <div>
                        <h5 className="font-semibold text-gray-800">{title}</h5>
                        <p className="text-sm text-gray-600">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-4">Ventajas:</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    No hay riesgo para los peces
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Proceso más rápido y controlado
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Permite ajustar parámetros sin estrés
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Método más ético y recomendado
                  </li>
                </ul>

                <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h5 className="font-semibold text-blue-800 mb-2 flex items-center">
                    <Clock className="w-4 h-4 mr-2" />
                    Duración del Proceso
                  </h5>
                  <p className="text-sm text-blue-700">
                    El ciclado completo toma entre 4-8 semanas dependiendo de la temperatura,
                    pH y cantidad de bacterias iniciales.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Montaje Section */}
      <section id="montaje" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Montaje del Acuario
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Guía paso a paso para montar tu acuario desde cero
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                step: 1,
                title: "Ubicación y Soporte",
                icon: Settings,
                items: [
                  "Superficie nivelada y resistente",
                  "Lejos de ventanas directas",
                  "Acceso fácil para mantenimiento",
                  "Cerca de tomas eléctricas"
                ]
              },
              {
                step: 2,
                title: "Instalación del Tanque",
                icon: Droplets,
                items: [
                  "Limpiar el acuario con agua",
                  "Colocar sobre el soporte",
                  "Verificar que esté nivelado",
                  "No usar jabones ni químicos"
                ]
              },
              {
                step: 3,
                title: "Sustrato y Decoración",
                icon: Leaf,
                items: [
                  "Lavar grava o arena",
                  "Añadir 3-5 cm de sustrato",
                  "Colocar rocas y troncos",
                  "Crear escondites y niveles"
                ]
              },
              {
                step: 4,
                title: "Equipamiento",
                icon: Filter,
                items: [
                  "Instalar sistema de filtración",
                  "Colocar calentador",
                  "Añadir termómetro",
                  "Instalar iluminación"
                ]
              },
              {
                step: 5,
                title: "Llenado de Agua",
                icon: Waves,
                items: [
                  "Llenar lentamente",
                  "Usar plato para evitar remover sustrato",
                  "Dejar reposar 24 horas",
                  "Verificar que no haya fugas"
                ]
              },
              {
                step: 6,
                title: "Puesta en Marcha",
                icon: Zap,
                items: [
                  "Encender filtro y calentador",
                  "Ajustar temperatura (24-26°C)",
                  "Verificar funcionamiento",
                  "Iniciar proceso de ciclado"
                ]
              }
            ].map(({ step, title, icon: Icon, items }) => (
              <div key={step} className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mr-3">
                    <span className="text-white font-bold">{step}</span>
                  </div>
                  <Icon className="w-6 h-6 text-blue-600 mr-2" />
                  <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
                </div>
                <ul className="space-y-2">
                  {items.map((item, index) => (
                    <li key={index} className="flex items-start text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tipos de Acuarios Section */}
      <section id="tipos" className="py-16 px-4 sm:px-6 lg:px-8 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Tipos de Acuarios
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Elige el tipo de acuario que mejor se adapte a tus necesidades y experiencia
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Acuario Comunitario",
                icon: Fish,
                description: "Múltiples especies compatibles viviendo en armonía",
                features: ["Peces pacíficos", "Fácil mantenimiento", "Ideal para principiantes", "Gran variedad visual"],
                difficulty: "Principiante",
                color: "green"
              },
              {
                title: "Acuario Plantado",
                icon: Leaf,
                description: "Enfocado en plantas acuáticas con peces complementarios",
                features: ["CO₂ suplementario", "Iluminación intensa", "Sustrato nutritivo", "Fertilización regular"],
                difficulty: "Intermedio",
                color: "emerald"
              },
              {
                title: "Acuario Biotopo",
                icon: Droplets,
                description: "Replica un ecosistema natural específico",
                features: ["Especies de una región", "Parámetros específicos", "Decoración natural", "Investigación previa"],
                difficulty: "Avanzado",
                color: "blue"
              },
              {
                title: "Acuario Marino",
                icon: Waves,
                description: "Peces y corales de agua salada",
                features: ["Agua salada", "Skimmer de proteínas", "Iluminación LED", "Parámetros estrictos"],
                difficulty: "Experto",
                color: "cyan"
              },
              {
                title: "Acuario Cíclidos",
                icon: Fish,
                description: "Especializado en peces cíclidos africanos o americanos",
                features: ["Peces territoriales", "Decoración rocosa", "pH específico", "Filtración potente"],
                difficulty: "Intermedio",
                color: "orange"
              },
              {
                title: "Nano Acuario",
                icon: Eye,
                description: "Acuarios pequeños de menos de 40 litros",
                features: ["Espacio reducido", "Especies pequeñas", "Mantenimiento frecuente", "Parámetros estables"],
                difficulty: "Intermedio",
                color: "purple"
              }
            ].map(({ title, icon: Icon, description, features, difficulty, color }) => (
              <div key={title} className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-br from-${color}-500 to-${color}-600 rounded-xl flex items-center justify-center mr-4`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full bg-${color}-100 text-${color}-700 font-medium`}>
                      {difficulty}
                    </span>
                  </div>
                </div>

                <p className="text-gray-600 mb-4 text-sm leading-relaxed">{description}</p>

                <ul className="space-y-2">
                  {features.map((feature, index) => (
                    <li key={index} className="flex items-center text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filtración Section - Expandida */}
      <section id="filtracion" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Sistema de Filtración
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              El corazón de tu acuario: mantiene el agua limpia y saludable
            </p>
          </div>

          {/* Importancia de la Filtración */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-lg p-8 border border-blue-200 mb-12">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <Filter className="w-6 h-6 mr-3 text-blue-600" />
              ¿Por qué es tan Importante la Filtración?
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/80 p-6 rounded-xl">
                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-4">
                  <Beaker className="w-6 h-6 text-red-600" />
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">Filtración Mecánica</h4>
                <p className="text-sm text-gray-600">Elimina partículas sólidas, restos de comida y detritos visibles del agua</p>
              </div>

              <div className="bg-white/80 p-6 rounded-xl">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                  <Activity className="w-6 h-6 text-green-600" />
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">Filtración Biológica</h4>
                <p className="text-sm text-gray-600">Las bacterias beneficiosas convierten amoniaco tóxico en nitratos menos dañinos</p>
              </div>

              <div className="bg-white/80 p-6 rounded-xl">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                  <Droplets className="w-6 h-6 text-purple-600" />
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">Filtración Química</h4>
                <p className="text-sm text-gray-600">Carbón activado y resinas eliminan químicos, olores y coloraciones</p>
              </div>
            </div>

            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-start">
                <AlertTriangle className="w-5 h-5 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
                <div>
                  <h5 className="font-semibold text-yellow-800 mb-1">Regla de Oro:</h5>
                  <p className="text-sm text-yellow-700">
                    El caudal del filtro debe ser en torno a 10 veces el volumen del acuario por hora.
                    Para un acuario de 100L, necesitas un filtro de 1000-1200 L/h.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Tipos de Filtros */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {[
              {
                title: "Filtros Internos",
                icon: Filter,
                description: "Ideales para acuarios pequeños hasta 20 litros",
                pros: ["Económicos", "Fácil instalación", "No ocupan espacio externo", "Silenciosos"],
                cons: ["Capacidad limitada", "Ocupan espacio interno", "Mantenimiento frecuente"],
                bestFor: "Nano acuarios, cuarentena, acuarios temporales",
                flow: "50-200 L/h",
                color: "blue"
              },
              {
                title: "Filtros de Mochila (HOB)",
                icon: Waves,
                description: "Cuelgan en el borde del acuario, muy populares",
                pros: ["Fácil mantenimiento", "Buen rendimiento", "Acceso sencillo a medios", "Oxigenación extra"],
                cons: ["Ruido de cascada", "Evaporación", "Estética externa"],
                bestFor: "Acuarios de 20-200 litros, principiantes",
                flow: "200-1000 L/h",
                color: "green"
              },
              {
                title: "Filtros Externos (Canister)",
                icon: Settings,
                description: "La opción más potente y versátil",
                pros: ["Máxima capacidad", "Silenciosos", "Múltiples medios", "No ocupan espacio interno"],
                cons: ["Más caros", "Instalación compleja", "Mantenimiento elaborado"],
                bestFor: "Acuarios grandes >100L, plantados, marinos",
                flow: "500-2000+ L/h",
                color: "purple"
              },
              {
                title: "Filtros Sump",
                icon: Activity,
                description: "Sistema de filtración separado, muy avanzado",
                pros: ["Capacidad máxima", "Personalizable", "Fácil mantenimiento", "Equipamiento adicional"],
                cons: ["Muy caro", "Instalación compleja", "Requiere espacio", "Riesgo de inundación"],
                bestFor: "Acuarios marinos, sistemas grandes >300L",
                flow: "1000-5000+ L/h",
                color: "indigo"
              }
            ].map(({ title, icon: Icon, description, pros, cons, bestFor, flow, color }) => (
              <div key={title} className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <div className="flex items-center mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-br from-${color}-500 to-${color}-600 rounded-xl flex items-center justify-center mr-4`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
                    <p className="text-sm text-gray-600">{description}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <h4 className="font-semibold text-green-700 mb-2 flex items-center">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Ventajas
                    </h4>
                    <ul className="space-y-1">
                      {pros.map((pro, index) => (
                        <li key={index} className="text-sm text-gray-600 flex items-center">
                          <span className="w-1 h-1 bg-green-500 rounded-full mr-2"></span>
                          {pro}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-red-700 mb-2 flex items-center">
                      <AlertTriangle className="w-4 h-4 mr-1" />
                      Desventajas
                    </h4>
                    <ul className="space-y-1">
                      {cons.map((con, index) => (
                        <li key={index} className="text-sm text-gray-600 flex items-center">
                          <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                          {con}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-4">
                  <div className="flex justify-between items-center text-sm">
                    <div>
                      <span className="font-semibold text-gray-700">Ideal para: </span>
                      <span className="text-gray-600">{bestFor}</span>
                    </div>
                    <div className={`px-3 py-1 bg-${color}-100 text-${color}-700 rounded-full font-medium`}>
                      {flow}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Medios Filtrantes */}
          <div className="mt-12 bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl shadow-lg p-8 border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <Beaker className="w-6 h-6 mr-3 text-blue-600" />
              Medios Filtrantes y su Orden
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl border border-blue-100">
                <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                  <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm mr-2">1</span>
                  Filtración Mecánica
                </h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Esponjas gruesas (entrada)</li>
                  <li>• Esponjas finas (salida)</li>
                  <li>• Perlón o guata filtrante</li>
                  <li>• Se limpia semanalmente</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-xl border border-green-100">
                <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                  <span className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm mr-2">2</span>
                  Filtración Biológica
                </h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Canutillos cerámicos</li>
                  <li>• Biobolas o biomedia</li>
                  <li>• Rocas porosas</li>
                  <li>• NUNCA lavar con cloro</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-xl border border-purple-100">
                <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                  <span className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm mr-2">3</span>
                  Filtración Química
                </h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Carbón activado</li>
                  <li>• Resinas intercambiadoras</li>
                  <li>• Zeolita (emergencias)</li>
                  <li>• Cambiar mensualmente</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Peces Section */}
      <section id="peces" className="py-16 px-4 sm:px-6 lg:px-8 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Selección de Peces
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Elige peces compatibles para crear un acuario armonioso
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                category: "Peces Comunitarios",
                icon: Fish,
                species: ["Neones", "Guppys", "Platys", "Corydoras", "Tetras"],
                characteristics: ["Pacíficos", "Fácil cuidado", "Coloridos", "Cardumen"],
                parameters: "pH: 6.5-7.5, T: 22-26°C",
                color: "blue"
              },
              {
                category: "Peces de Fondo",
                icon: Settings,
                species: ["Corydoras", "Pleco", "Botias", "Ancistrus"],
                characteristics: ["Limpiadores", "Nocturnos", "Resistentes", "Útiles"],
                parameters: "pH: 6.0-7.5, T: 22-28°C",
                color: "green"
              },
              {
                category: "Peces Cíclidos",
                icon: Shield,
                species: ["Escalares", "Ramirezi", "Apistogramma", "Discus"],
                characteristics: ["Territoriales", "Inteligentes", "Cuidado parental", "Exigentes"],
                parameters: "pH: 6.0-7.0, T: 26-30°C",
                color: "orange"
              },
              {
                category: "Peces Laberinto",
                icon: Heart,
                species: ["Bettas", "Gouramis", "Paraíso"],
                characteristics: ["Respiración aérea", "Territoriales", "Coloridos", "Nidos de burbujas"],
                parameters: "pH: 6.5-7.5, T: 24-28°C",
                color: "purple"
              },
              {
                category: "Peces Vivíparos",
                icon: Activity,
                species: ["Guppys", "Mollys", "Platys", "Espadas"],
                characteristics: ["Reproducción fácil", "Resistentes", "Activos", "Principiantes"],
                parameters: "pH: 7.0-8.0, T: 22-28°C",
                color: "pink"
              },
              {
                category: "Peces Grandes",
                icon: Eye,
                species: ["Oscars", "Arowanas", "Cíclidos grandes"],
                characteristics: ["Acuarios grandes", "Agresivos", "Inteligentes", "Expertos"],
                parameters: "pH: 6.5-7.5, T: 25-28°C",
                color: "red"
              }
            ].map(({ category, icon: Icon, species, characteristics, parameters, color }) => (
              <div key={category} className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-br from-${color}-500 to-${color}-600 rounded-xl flex items-center justify-center mr-4`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">{category}</h3>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold text-gray-700 mb-2">Especies Populares:</h4>
                  <div className="flex flex-wrap gap-1">
                    {species.map((fish, index) => (
                      <span key={index} className={`text-xs px-2 py-1 bg-${color}-100 text-${color}-700 rounded-full`}>
                        {fish}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold text-gray-700 mb-2">Características:</h4>
                  <ul className="space-y-1">
                    {characteristics.map((char, index) => (
                      <li key={index} className="text-sm text-gray-600 flex items-center">
                        <CheckCircle className="w-3 h-3 text-green-500 mr-2 flex-shrink-0" />
                        {char}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={`p-3 bg-${color}-50 rounded-lg border border-${color}-200`}>
                  <p className="text-sm font-medium text-gray-700">{parameters}</p>
                </div>
              </div>
            ))}

            <div className="flex justify-center items-center col-span-full mt-4">
              <button
                onClick={() => window.location.href = "/peces"}
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold shadow hover:bg-blue-700 transition-all duration-200 text-lg"
              >
                Ver el comparador de especies de peces
                <Fish className="w-5 h-5 ml-2" />
              </button>
            </div>
          </div>

          {/* Reglas de Compatibilidad - Mejorada */}
          <div className="mt-12 bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl shadow-lg p-8 border border-red-200">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <AlertTriangle className="w-6 h-6 mr-3 text-red-600" />
              Reglas de Compatibilidad - Parámetros del Agua
            </h3>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-4">Parámetros Críticos para Compatibilidad:</h4>

                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg border border-red-100">
                    <h5 className="font-semibold text-red-800 mb-2 flex items-center">
                      <Thermometer className="w-4 h-4 mr-2" />
                      Temperatura
                    </h5>
                    <p className="text-sm text-gray-600 mb-2">
                      La diferencia máxima entre especies debe ser de 2-3°C
                    </p>
                    <ul className="text-xs text-gray-600 space-y-1">
                      <li>• Tropicales: 24-28°C</li>
                      <li>• Agua fría: 18-22°C</li>
                      <li>• NUNCA mezclar tropicales con agua fría</li>
                    </ul>
                  </div>

                  <div className="bg-white p-4 rounded-lg border border-blue-100">
                    <h5 className="font-semibold text-blue-800 mb-2 flex items-center">
                      <Droplets className="w-4 h-4 mr-2" />
                      pH (Acidez/Alcalinidad)
                    </h5>
                    <p className="text-sm text-gray-600 mb-2">
                      Diferencias mayores a 1.0 punto causan estrés severo
                    </p>
                    <ul className="text-xs text-gray-600 space-y-1">
                      <li>• Ácido: pH 6.0-6.8 (Discus, Tetras amazónicos)</li>
                      <li>• Neutro: pH 6.8-7.2 (Mayoría de especies)</li>
                      <li>• Alcalino: pH 7.2-8.5 (Cíclidos africanos, Mollys)</li>
                    </ul>
                  </div>

                  <div className="bg-white p-4 rounded-lg border border-green-100">
                    <h5 className="font-semibold text-green-800 mb-2 flex items-center">
                      <Beaker className="w-4 h-4 mr-2" />
                      Dureza del Agua (GH/KH)
                    </h5>
                    <p className="text-sm text-gray-600 mb-2">
                      Afecta la osmorregulación y salud a largo plazo
                    </p>
                    <ul className="text-xs text-gray-600 space-y-1">
                      <li>• Blanda: 0-8 GH (Discus, Tetras)</li>
                      <li>• Media: 8-15 GH (Comunitarios)</li>
                      <li>• Dura: 15+ GH (Cíclidos africanos)</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-4">Incompatibilidades Críticas:</h4>

                <div className="space-y-3">
                  <div className="bg-red-100 p-4 rounded-lg border border-red-200">
                    <h5 className="font-semibold text-red-800 mb-2">❌ NUNCA Juntar:</h5>
                    <ul className="text-sm text-red-700 space-y-1">
                      <li>• Peces de agua fría + tropicales</li>
                      <li>• Especies de pH ácido + alcalino</li>
                      <li>• Peces grandes + pequeños (se los comen)</li>
                      <li>• Agresivos + pacíficos</li>
                      <li>• Diferentes necesidades de salinidad</li>
                    </ul>
                  </div>

                  <div className="bg-yellow-100 p-4 rounded-lg border border-yellow-200">
                    <h5 className="font-semibold text-yellow-800 mb-2">⚠️ Cuidado Especial:</h5>
                    <ul className="text-sm text-yellow-700 space-y-1">
                      <li>• Bettas con peces de aletas largas</li>
                      <li>• Cíclidos durante reproducción</li>
                      <li>• Peces territoriales en acuarios pequeños</li>
                      <li>• Especies nocturnas + diurnas</li>
                    </ul>
                  </div>

                  <div className="bg-green-100 p-4 rounded-lg border border-green-200">
                    <h5 className="font-semibold text-green-800 mb-2">✅ Combinaciones Ideales:</h5>
                    <ul className="text-sm text-green-700 space-y-1">
                      <li>• Tetras + Corydoras + Guppys</li>
                      <li>• Escalares + Cardenales + Ancistrus</li>
                      <li>• Mollys + Platys + Espadas</li>
                      <li>• Especies del mismo biotopo</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h5 className="font-semibold text-blue-800 mb-2 flex items-center">
                    <Eye className="w-4 h-4 mr-2" />
                    Regla de Oro
                  </h5>
                  <p className="text-sm text-blue-700">
                    <strong>Investiga SIEMPRE los parámetros específicos de cada especie antes de comprar.</strong>
                    Un pez estresado por parámetros incorrectos será más propenso a enfermedades y agresividad.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Plantas Section */}
      <section id="plantas" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Plantas Acuáticas
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Las plantas no solo decoran, sino que mejoran la calidad del agua
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                category: "Plantas Fáciles",
                icon: Leaf,
                species: ["Anubias", "Java Fern", "Musgo de Java", "Vallisneria"],
                light: "Baja a Media",
                co2: "No necesario",
                difficulty: "Principiante",
                color: "green"
              },
              {
                category: "Plantas Tapizantes",
                icon: Settings,
                species: ["Glossostigma", "HC Cuba", "Eleocharis", "Marsilea"],
                light: "Alta",
                co2: "Recomendado",
                difficulty: "Avanzado",
                color: "emerald"
              },
              {
                category: "Plantas de Tallo",
                icon: TrendingUp,
                species: ["Rotala", "Ludwigia", "Cabomba", "Limnophila"],
                light: "Media a Alta",
                co2: "Beneficioso",
                difficulty: "Intermedio",
                color: "blue"
              },
              {
                category: "Plantas Flotantes",
                icon: Waves,
                species: ["Pistia", "Jacinto", "Lechuga de agua", "Salvinia"],
                light: "Media",
                co2: "No necesario",
                difficulty: "Fácil",
                color: "cyan"
              },
              {
                category: "Plantas Rojas",
                icon: Heart,
                species: ["Alternanthera", "Rotala Red", "Ludwigia Red"],
                light: "Muy Alta",
                co2: "Esencial",
                difficulty: "Experto",
                color: "red"
              },
              {
                category: "Musgos y Helechos",
                icon: Eye,
                species: ["Musgo Christmas", "Riccia", "Bolbitis", "Microsorum"],
                light: "Baja a Media",
                co2: "Opcional",
                difficulty: "Fácil",
                color: "teal"
              }
            ].map(({ category, icon: Icon, species, light, co2, difficulty, color }) => (
              <div key={category} className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-br from-${color}-500 to-${color}-600 rounded-xl flex items-center justify-center mr-4`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{category}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full bg-${color}-100 text-${color}-700 font-medium`}>
                      {difficulty}
                    </span>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold text-gray-700 mb-2">Especies:</h4>
                  <div className="flex flex-wrap gap-1">
                    {species.map((plant, index) => (
                      <span key={index} className={`text-xs px-2 py-1 bg-${color}-100 text-${color}-700 rounded-full`}>
                        {plant}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-600">Iluminación:</span>
                    <span className="text-sm text-gray-800">{light}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-600">CO₂:</span>
                    <span className="text-sm text-gray-800">{co2}</span>
                  </div>
                </div>
              </div>
            ))}

            <div className="flex justify-center items-center col-span-full mt-4">
              <button
                onClick={() => window.location.href = "/algas"}
                className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-xl font-semibold shadow hover:bg-green-700 transition-all duration-200 text-lg"
              >
                Ver la guía para algas
                <Leaf className="w-5 h-5 ml-2" />
              </button>
            </div>
          </div>

          <div className="mt-12 bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl shadow-lg p-8 border border-green-200">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <Leaf className="w-6 h-6 mr-3 text-green-600" />
              Beneficios de las Plantas
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Droplets className="w-8 h-8 text-green-600" />
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">Oxigenación</h4>
                <p className="text-sm text-gray-600">Producen oxígeno durante la fotosíntesis</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Filter className="w-8 h-8 text-blue-600" />
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">Filtración Natural</h4>
                <p className="text-sm text-gray-600">Absorben nitratos y otros nutrientes</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-purple-600" />
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">Refugio</h4>
                <p className="text-sm text-gray-600">Proporcionan escondites y zonas de descanso</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Eye className="w-8 h-8 text-orange-600" />
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">Estética</h4>
                <p className="text-sm text-gray-600">Crean paisajes naturales hermosos</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Parámetros Section */}
      <section id="parametros" className="py-16 px-4 sm:px-6 lg:px-8 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Parámetros del Agua
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Mantén estos valores para un acuario saludable
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                parameter: "Temperatura",
                icon: Thermometer,
                ideal: "24-26°C",
                description: "Estabilidad es clave, evita cambios bruscos",
                tips: ["Usa calentador con termostato", "Verifica diariamente", "Gradúa cambios lentamente"],
                color: "red"
              },
              {
                parameter: "pH",
                icon: Beaker,
                ideal: "6.8-7.2",
                description: "Mide acidez/alcalinidad del agua",
                tips: ["Estabilidad > valor exacto", "Cambios graduales", "Testa semanalmente"],
                color: "blue"
              },
              {
                parameter: "Amoniaco (NH₃)",
                icon: AlertTriangle,
                ideal: "0 ppm",
                description: "Altamente tóxico, debe ser siempre 0",
                tips: ["Indica problemas de filtración", "Cambio de agua inmediato", "Revisar sobrealimentación"],
                color: "red"
              },
              {
                parameter: "Nitritos (NO₂⁻)",
                icon: Activity,
                ideal: "0 ppm",
                description: "Tóxicos, indican ciclado incompleto",
                tips: ["Filtro biológico inmaduro", "Paciencia durante ciclado", "No añadir peces"],
                color: "orange"
              },
              {
                parameter: "Nitratos (NO₃⁻)",
                icon: TrendingUp,
                ideal: "<20 ppm",
                description: "Producto final, menos tóxico pero acumulativo",
                tips: ["Cambios de agua regulares", "Plantas los absorben", "Indicador de limpieza"],
                color: "green"
              },
              {
                parameter: "Dureza (GH/KH)",
                icon: Droplets,
                ideal: "8-12 GH",
                description: "Minerales disueltos en el agua",
                tips: ["Afecta salud a largo plazo", "Específico por especie", "Estabiliza pH"],
                color: "cyan"
              }
            ].map(({ parameter, icon: Icon, ideal, description, tips, color }) => (
              <div key={parameter} className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-br from-${color}-500 to-${color}-600 rounded-xl flex items-center justify-center mr-4`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{parameter}</h3>
                    <span className={`text-sm px-2 py-1 rounded-full bg-${color}-100 text-${color}-700 font-medium`}>
                      {ideal}
                    </span>
                  </div>
                </div>

                <p className="text-gray-600 mb-4 text-sm leading-relaxed">{description}</p>

                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Consejos:</h4>
                  <ul className="space-y-1">
                    {tips.map((tip, index) => (
                      <li key={index} className="text-sm text-gray-600 flex items-start">
                        <CheckCircle className="w-3 h-3 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-gradient-to-br from-yellow-50 to-red-50 rounded-2xl shadow-lg p-8 border border-yellow-200">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <Clock className="w-6 h-6 mr-3 text-yellow-600" />
              Programa de Mantenimiento
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl border border-green-100">
                <h4 className="font-semibold text-green-800 mb-3">Diario</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Verificar temperatura
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Observar comportamiento peces
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Alimentar apropiadamente
                  </li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-xl border border-blue-100">
                <h4 className="font-semibold text-blue-800 mb-3">Semanal</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-blue-500 mr-2" />
                    Cambio de agua 20-25%
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-blue-500 mr-2" />
                    Limpiar cristales
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-blue-500 mr-2" />
                    Testar parámetros básicos
                  </li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-xl border border-purple-100">
                <h4 className="font-semibold text-purple-800 mb-3">Mensual</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-purple-500 mr-2" />
                    Limpiar filtro
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-purple-500 mr-2" />
                    Podar plantas
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-purple-500 mr-2" />
                    Test completo de agua
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Acuario Hospital Section - Nueva */}
      <section id="hospital" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Acuario Hospital
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Un acuario separado esencial para el cuidado y tratamiento de peces enfermos
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-2xl shadow-lg p-8 border border-red-200">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <Heart className="w-6 h-6 mr-3 text-red-600" />
                ¿Qué es un Acuario Hospital?
              </h3>

              <p className="text-gray-600 mb-6 leading-relaxed">
                Un acuario hospital es un tanque separado y temporal donde se aíslan y tratan peces enfermos,
                heridos o nuevos. Es fundamental para prevenir la propagación de enfermedades y proporcionar
                cuidados específicos sin afectar al acuario principal.
              </p>

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Shield className="w-4 h-4 text-red-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Aislamiento</h4>
                    <p className="text-sm text-gray-600">Previene contagio de enfermedades</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Activity className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Tratamiento Específico</h4>
                    <p className="text-sm text-gray-600">Medicación sin afectar otros peces</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Eye className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Observación</h4>
                    <p className="text-sm text-gray-600">Monitoreo cercano del estado del pez</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <Settings className="w-6 h-6 mr-3 text-blue-600" />
                Configuración del Acuario Hospital
              </h3>

              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-blue-800 mb-2">Tamaño Recomendado:</h4>
                  <p className="text-sm text-blue-700">
                    20-40 litros para peces pequeños a medianos.
                    Debe ser proporcional al tamaño del pez a tratar.
                  </p>
                </div>

                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <h4 className="font-semibold text-green-800 mb-2">Equipamiento Básico:</h4>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• Filtro de esponja (no carbón activado)</li>
                    <li>• Calentador con termostato</li>
                    <li>• Aireador o bomba de aire</li>
                    <li>• Termómetro</li>
                    <li>• Iluminación tenue</li>
                  </ul>
                </div>

                <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <h4 className="font-semibold text-yellow-800 mb-2">Decoración Mínima:</h4>
                  <ul className="text-sm text-yellow-700 space-y-1">
                    <li>• Sin sustrato (fácil limpieza)</li>
                    <li>• Escondite simple (PVC o cerámica)</li>
                    <li>• Sin plantas (pueden absorber medicamentos)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center items-center col-span-full my-4">
              <button
                onClick={() => window.location.href = "/enfermedades"}
                className="inline-flex items-center px-6 py-3 bg-red-600 text-white rounded-xl font-semibold shadow hover:bg-red-700 transition-all duration-200 text-lg"
              >
                Ver las enfermedades comunes de los peces
                <Fish className="w-5 h-5 ml-2" />
              </button>
            </div>

          {/* Usos del Acuario Hospital */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-red-100">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-4">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Tratamiento de Enfermedades</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Punto blanco (Ich)</li>
                <li>• Podredumbre de aletas</li>
                <li>• Infecciones bacterianas</li>
                <li>• Parásitos externos</li>
                <li>• Hongos</li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 border border-blue-100">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                <Fish className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Cuarentena de Nuevos Peces</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Observación 2-4 semanas</li>
                <li>• Detección de enfermedades</li>
                <li>• Aclimatación gradual</li>
                <li>• Prevención de contagios</li>
                <li>• Tratamiento preventivo</li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 border border-green-100">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                <Heart className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Recuperación y Cuidados</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Peces heridos o estresados</li>
                <li>• Post-cirugía o tratamiento</li>
                <li>• Alimentación especial</li>
                <li>• Ambiente controlado</li>
                <li>• Monitoreo intensivo</li>
              </ul>
            </div>
          </div>

          {/* Protocolo de Uso */}
          <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl shadow-lg p-8 border border-purple-200">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <Activity className="w-6 h-6 mr-3 text-purple-600" />
              Protocolo de Uso del Acuario Hospital
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-4">Antes del Uso:</h4>
                <div className="space-y-3">
                  {[
                    { step: 1, title: "Preparación", desc: "Llenar con agua del acuario principal" },
                    { step: 2, title: "Ciclado Rápido", desc: "Usar media filtrante del filtro principal" },
                    { step: 3, title: "Estabilización", desc: "Igualar temperatura y parámetros" },
                    { step: 4, title: "Verificación", desc: "Comprobar funcionamiento del equipo" }
                  ].map(({ step, title, desc }) => (
                    <div key={step} className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold">
                        {step}
                      </div>
                      <div>
                        <h5 className="font-semibold text-gray-800 text-sm">{title}</h5>
                        <p className="text-xs text-gray-600">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-4">Durante el Tratamiento:</h4>
                <div className="space-y-3">
                  {[
                    { step: 1, title: "Observación Diaria", desc: "Monitorear comportamiento y síntomas" },
                    { step: 2, title: "Medicación", desc: "Seguir dosis y horarios exactos" },
                    { step: 3, title: "Cambios de Agua", desc: "Más frecuentes (25-50% diario)" },
                    { step: 4, title: "Alimentación", desc: "Reducida y de alta calidad" }
                  ].map(({ step, title, desc }) => (
                    <div key={step} className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold">
                        {step}
                      </div>
                      <div>
                        <h5 className="font-semibold text-gray-800 text-sm">{title}</h5>
                        <p className="text-xs text-gray-600">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                <div>
                  <h5 className="font-semibold text-green-800 mb-1">Consejo Importante:</h5>
                  <p className="text-sm text-green-700">
                    Mantén siempre el acuario hospital listo para usar. Un pez enfermo necesita tratamiento
                    inmediato, y preparar el acuario puede tomar tiempo valioso. Considera tenerlo siempre
                    ciclado con un filtro de esponja conectado al acuario principal.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Productos Section */}
      {/* <section id="productos" className="py-16 px-4 sm:px-6 lg:px-8 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Productos Recomendados
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Descubre los mejores productos para mantener tu acuario saludable y próspero.
            </p>
          </div>

          <div className="flex justify-center items-center mt-8">
            <button
              onClick={() => window.location.href = "/product"}
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold shadow hover:bg-blue-700 transition-all duration-200 text-lg"
            >
              Ver Productos
              <Beaker className="w-5 h-5 ml-2" />
            </button>
          </div>
        </div>
      </section> */}

      {/* Footer */}
      <footer className="bg-gradient-to-r from-blue-900 to-green-900 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        {/* Logo */}
        <div className="flex items-center justify-center space-x-2 mb-6">
          <Fish className="w-8 h-8" />
          <span className="text-2xl font-bold">AquaGuía</span>
        </div>

        {/* Texto principal */}
        <p className="text-blue-200 mb-4">
          Tu compañero completo en el mundo de la acuariofilia
        </p>
        <p className="text-blue-300 text-sm mb-6">
          Recuerda: la paciencia y la observación son las claves del éxito en la acuariofilia
        </p>

        {/* Redes sociales */}
        <div className="flex justify-center space-x-4">
          <a
            href="https://github.com/x1n4px" // <-- PON AQUÍ TU GITHUB
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-white hover:text-blue-400 transition"
          >
            <Github className="w-6 h-6" />
            <span className="hidden sm:inline">GitHub</span>
          </a>
        </div>
      </div>
    </footer>
    </div>
  );
}

export default Home;