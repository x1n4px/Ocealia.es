import { useState } from 'react';
import {
  Beaker,
  Droplets,
  TestTube,
  AlertTriangle,
  CheckCircle,
  Clock,
  Eye,
  TrendingUp,
  Activity,
  Shield,
  Info,
  ChevronDown,
  ChevronUp,
  Target,
  Zap,
  AlertCircle,
  BookOpen,
  Microscope,
  Palette,
  Timer,
  Calculator
} from 'lucide-react';

function TestingGuideComplete() {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [selectedTest, setSelectedTest] = useState<string>('general');

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 via-cyan-50 to-green-50 rounded-3xl shadow-xl p-8 border border-blue-200">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl mb-4">
          <Beaker className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Guía Completa de Tests de Acuario
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Domina el arte de medir los parámetros del agua con precisión profesional
        </p>
      </div>

      {/* Introducción */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-blue-100">
        <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
          <Microscope className="w-6 h-6 mr-3 text-blue-600" />
          ¿Por Qué Son Cruciales los Tests?
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-gradient-to-br from-red-50 to-red-100 p-4 rounded-xl">
            <div className="flex items-center mb-2">
              <Shield className="w-5 h-5 text-red-600 mr-2" />
              <h4 className="font-semibold text-red-800">Prevención</h4>
            </div>
            <p className="text-sm text-red-700">
              Detecta problemas antes de que sean visibles o afecten a tus peces
            </p>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl">
            <div className="flex items-center mb-2">
              <Activity className="w-5 h-5 text-green-600 mr-2" />
              <h4 className="font-semibold text-green-800">Salud</h4>
            </div>
            <p className="text-sm text-green-700">
              Mantén condiciones óptimas para el bienestar de peces y plantas
            </p>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl">
            <div className="flex items-center mb-2">
              <TrendingUp className="w-5 h-5 text-blue-600 mr-2" />
              <h4 className="font-semibold text-blue-800">Control</h4>
            </div>
            <p className="text-sm text-blue-700">
              Monitorea tendencias y ajusta antes de que ocurran problemas graves
            </p>
          </div>
        </div>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-start">
            <AlertTriangle className="w-5 h-5 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
            <div>
              <h5 className="font-semibold text-yellow-800 mb-1">Dato Importante:</h5>
              <p className="text-sm text-yellow-700">
                El 90% de los problemas en acuarios se deben a parámetros inadecuados del agua. 
                Los tests regulares pueden prevenir la mayoría de enfermedades y muertes de peces.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Comparación: Tests de Tiras vs Tests de Gotas */}
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
          <TestTube className="w-6 h-6 mr-3 text-purple-600" />
          Tests de Tiras vs Tests de Gotas: Comparación Detallada
        </h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Tests de Tiras */}
          <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl p-6 border border-orange-200">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center mr-4">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-gray-800">Tests de Tiras</h4>
                <span className="text-sm text-orange-600">Rápidos y Convenientes</span>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h5 className="font-semibold text-gray-700 mb-2 flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Ventajas
                </h5>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Resultados en 60 segundos</li>
                  <li>• Múltiples parámetros en una tira</li>
                  <li>• No requiere preparación</li>
                  <li>• Ideal para principiantes</li>
                  <li>• Portátiles y fáciles de almacenar</li>
                  <li>• Sin riesgo de derrames químicos</li>
                </ul>
              </div>

              <div>
                <h5 className="font-semibold text-gray-700 mb-2 flex items-center">
                  <AlertCircle className="w-4 h-4 text-red-500 mr-2" />
                  Desventajas
                </h5>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Menor precisión (±10-20%)</li>
                  <li>• Sensibles a humedad y luz</li>
                  <li>• Vida útil limitada (6-12 meses)</li>
                  <li>• Interpretación subjetiva del color</li>
                  <li>• Rango de medición limitado</li>
                  <li>• Costo por test más alto a largo plazo</li>
                </ul>
              </div>

              <div className="bg-orange-100 p-3 rounded-lg">
                <h5 className="font-semibold text-orange-800 mb-1">Precisión:</h5>
                <div className="flex items-center">
                  <div className="flex-1 bg-orange-200 rounded-full h-2 mr-2">
                    <div className="bg-orange-500 h-2 rounded-full" style={{width: '70%'}}></div>
                  </div>
                  <span className="text-sm font-medium text-orange-700">70%</span>
                </div>
              </div>

              <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                <h5 className="font-semibold text-yellow-800 mb-1">Mejor para:</h5>
                <p className="text-sm text-yellow-700">
                  Chequeos rápidos rutinarios, principiantes, detección inicial de problemas
                </p>
              </div>
            </div>
          </div>

          {/* Tests de Gotas */}
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-200">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mr-4">
                <Droplets className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-gray-800">Tests de Gotas</h4>
                <span className="text-sm text-blue-600">Precisos y Profesionales</span>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h5 className="font-semibold text-gray-700 mb-2 flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Ventajas
                </h5>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Alta precisión (±5%)</li>
                  <li>• Resultados consistentes y reproducibles</li>
                  <li>• Vida útil larga (2-3 años)</li>
                  <li>• Amplio rango de medición</li>
                  <li>• Costo por test muy bajo</li>
                  <li>• Estándares profesionales</li>
                </ul>
              </div>

              <div>
                <h5 className="font-semibold text-gray-700 mb-2 flex items-center">
                  <AlertCircle className="w-4 h-4 text-red-500 mr-2" />
                  Desventajas
                </h5>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Proceso más lento (3-5 minutos)</li>
                  <li>• Requiere múltiples kits</li>
                  <li>• Necesita espacio y organización</li>
                  <li>• Curva de aprendizaje inicial</li>
                  <li>• Inversión inicial mayor</li>
                  <li>• Manejo de reactivos químicos</li>
                </ul>
              </div>

              <div className="bg-blue-100 p-3 rounded-lg">
                <h5 className="font-semibold text-blue-800 mb-1">Precisión:</h5>
                <div className="flex items-center">
                  <div className="flex-1 bg-blue-200 rounded-full h-2 mr-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{width: '95%'}}></div>
                  </div>
                  <span className="text-sm font-medium text-blue-700">95%</span>
                </div>
              </div>

              <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                <h5 className="font-semibold text-green-800 mb-1">Mejor para:</h5>
                <p className="text-sm text-green-700">
                  Diagnósticos precisos, acuaristas experimentados, ciclado, situaciones críticas
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Recomendación Híbrida */}
        <div className="mt-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
          <div className="flex items-start">
            <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
              <Target className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="font-bold text-purple-800 mb-2">Estrategia Recomendada: Enfoque Híbrido</h4>
              <p className="text-sm text-purple-700 mb-3">
                Los acuaristas profesionales usan ambos tipos de tests estratégicamente:
              </p>
              <ul className="text-sm text-purple-700 space-y-1">
                <li><strong>• Tiras:</strong> Para chequeos diarios/semanales rápidos y detección inicial</li>
                <li><strong>• Gotas:</strong> Para confirmación, diagnóstico preciso y situaciones críticas</li>
                <li><strong>• Durante el ciclado:</strong> Usa tests de gotas exclusivamente para máxima precisión</li>
                <li><strong>• Mantenimiento rutinario:</strong> Alterna entre ambos según la situación</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Guía Detallada: Cómo Usar Tests de Tiras */}
      <div className="mb-8">
        <div 
          className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden cursor-pointer"
          onClick={() => toggleSection('strips')}
        >
          <div className="p-6 bg-gradient-to-r from-orange-500 to-yellow-500">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-bold text-white flex items-center">
                <Zap className="w-6 h-6 mr-3" />
                Guía Completa: Tests de Tiras
              </h3>
              {expandedSection === 'strips' ? 
                <ChevronUp className="w-6 h-6 text-white" /> : 
                <ChevronDown className="w-6 h-6 text-white" />
              }
            </div>
          </div>

          {expandedSection === 'strips' && (
            <div className="p-6 space-y-6">
              {/* Procedimiento Paso a Paso */}
              <div>
                <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <BookOpen className="w-5 h-5 mr-2 text-orange-600" />
                  Procedimiento Paso a Paso para Máxima Precisión
                </h4>
                
                <div className="space-y-4">
                  {[
                    {
                      step: 1,
                      title: "Preparación",
                      time: "30 segundos",
                      details: [
                        "Temperatura del agua: 20-25°C (ideal)",
                        "Agita suavemente el agua del acuario antes de tomar la muestra",
                        "Usa un vaso limpio y seco (nunca jabón)",
                        "Toma agua de la zona media del acuario, no de superficie ni fondo"
                      ],
                      tip: "El agua muy fría o caliente puede alterar los resultados hasta un 15%"
                    },
                    {
                      step: 2,
                      title: "Manipulación de la Tira",
                      time: "10 segundos",
                      details: [
                        "Lávate y seca las manos completamente",
                        "Extrae UNA tira sin tocar las almohadillas reactivas",
                        "Cierra inmediatamente el envase (la humedad las daña)",
                        "Observa que las almohadillas no estén decoloradas"
                      ],
                      tip: "Tiras decoloradas o con manchas = resultados incorrectos"
                    },
                    {
                      step: 3,
                      title: "Inmersión",
                      time: "2 segundos exactos",
                      details: [
                        "Sumerge la tira en movimiento horizontal",
                        "Todas las almohadillas deben mojarse uniformemente",
                        "NO dejes la tira sumergida más de 2 segundos",
                        "Retira en el mismo ángulo que la sumergiste"
                      ],
                      tip: "La sobre-exposición diluye los reactivos y falsea resultados"
                    },
                    {
                      step: 4,
                      title: "Eliminación del Exceso",
                      time: "3 segundos",
                      details: [
                        "Sostén la tira horizontalmente",
                        "Golpea suavemente el borde contra papel absorbente",
                        "NO sacudas la tira (mezcla reactivos entre almohadillas)",
                        "Mantén la tira horizontal durante todo el proceso"
                      ],
                      tip: "El exceso de agua causa 'sangrado' entre almohadillas"
                    },
                    {
                      step: 5,
                      title: "Tiempo de Espera",
                      time: "60 segundos EXACTOS",
                      details: [
                        "Usa un cronómetro o temporizador",
                        "Mantén la tira horizontal sobre superficie blanca",
                        "No la expongas a luz solar directa",
                        "Algunos parámetros cambian a los 30s, otros a los 60s"
                      ],
                      tip: "Lee las instrucciones: pH a 30s, nitratos a 60s, etc."
                    },
                    {
                      step: 6,
                      title: "Lectura e Interpretación",
                      time: "30 segundos",
                      details: [
                        "Compara bajo luz natural indirecta o LED blanco",
                        "Sostén la tira a 5cm de la carta de colores",
                        "Compara cada almohadilla con su escala correspondiente",
                        "Si el color está entre dos valores, usa el promedio"
                      ],
                      tip: "Luz amarilla/cálida altera la percepción hasta un 20%"
                    }
                  ].map(({ step, title, time, details, tip }) => (
                    <div key={step} className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl p-5 border border-orange-200">
                      <div className="flex items-start mb-3">
                        <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold mr-3 flex-shrink-0">
                          {step}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-center mb-2">
                            <h5 className="font-bold text-gray-800">{title}</h5>
                            <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full flex items-center">
                              <Timer className="w-3 h-3 mr-1" />
                              {time}
                            </span>
                          </div>
                          <ul className="text-sm text-gray-600 space-y-1 mb-3">
                            {details.map((detail, idx) => (
                              <li key={idx} className="flex items-start">
                                <span className="w-1.5 h-1.5 bg-orange-400 rounded-full mr-2 mt-1.5 flex-shrink-0"></span>
                                {detail}
                              </li>
                            ))}
                          </ul>
                          <div className="bg-yellow-100 p-2 rounded-lg border border-yellow-300">
                            <p className="text-xs text-yellow-800">
                              <strong>💡 Tip Pro:</strong> {tip}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Errores Comunes */}
              <div className="bg-red-50 rounded-xl p-6 border border-red-200">
                <h4 className="text-lg font-bold text-red-800 mb-4 flex items-center">
                  <AlertTriangle className="w-5 h-5 mr-2" />
                  Errores Comunes que Arruinan la Precisión
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-semibold text-red-700 mb-2">❌ Lo que NO debes hacer:</h5>
                    <ul className="text-sm text-red-600 space-y-1">
                      <li>• Usar tiras vencidas o mal almacenadas</li>
                      <li>• Tocar las almohadillas con los dedos</li>
                      <li>• Dejar la tira sumergida más de 2 segundos</li>
                      <li>• Leer resultados después de 2 minutos</li>
                      <li>• Comparar bajo luz artificial amarilla</li>
                      <li>• Usar la misma tira dos veces</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold text-red-700 mb-2">⚠️ Signos de tiras dañadas:</h5>
                    <ul className="text-sm text-red-600 space-y-1">
                      <li>• Almohadillas decoloradas o manchadas</li>
                      <li>• Envase con humedad visible</li>
                      <li>• Fecha de vencimiento pasada</li>
                      <li>• Almacenadas en baño o cocina</li>
                      <li>• Expuestas a temperaturas extremas</li>
                      <li>• Resultados inconsistentes repetidos</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Almacenamiento Correcto */}
              <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                <h4 className="text-lg font-bold text-green-800 mb-4 flex items-center">
                  <Shield className="w-5 h-5 mr-2" />
                  Almacenamiento para Máxima Vida Útil
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white p-4 rounded-lg">
                    <h5 className="font-semibold text-green-700 mb-2">🌡️ Temperatura</h5>
                    <p className="text-sm text-gray-600">15-25°C constante. Evita cambios bruscos.</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <h5 className="font-semibold text-green-700 mb-2">💧 Humedad</h5>
                    <p className="text-sm text-gray-600">Lugar seco. Incluye gel de sílice en el envase.</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <h5 className="font-semibold text-green-700 mb-2">🌑 Luz</h5>
                    <p className="text-sm text-gray-600">Oscuridad total. Cajón o armario cerrado.</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Guía Detallada: Cómo Usar Tests de Gotas */}
      <div className="mb-8">
        <div 
          className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden cursor-pointer"
          onClick={() => toggleSection('drops')}
        >
          <div className="p-6 bg-gradient-to-r from-blue-500 to-cyan-500">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-bold text-white flex items-center">
                <Droplets className="w-6 h-6 mr-3" />
                Guía Completa: Tests de Gotas
              </h3>
              {expandedSection === 'drops' ? 
                <ChevronUp className="w-6 h-6 text-white" /> : 
                <ChevronDown className="w-6 h-6 text-white" />
              }
            </div>
          </div>

          {expandedSection === 'drops' && (
            <div className="p-6 space-y-6">
              {/* Procedimiento Profesional */}
              <div>
                <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <Microscope className="w-5 h-5 mr-2 text-blue-600" />
                  Procedimiento Profesional para Resultados de Laboratorio
                </h4>
                
                <div className="space-y-4">
                  {[
                    {
                      step: 1,
                      title: "Preparación del Espacio",
                      time: "1 minuto",
                      details: [
                        "Superficie plana, estable y bien iluminada",
                        "Fondo blanco para mejor contraste (papel o azulejo)",
                        "Todos los reactivos a temperatura ambiente (20-25°C)",
                        "Tubos de ensayo limpios y secos",
                        "Jeringa o pipeta para medición exacta"
                      ],
                      tip: "Reactivos fríos pueden tardar 50% más en reaccionar"
                    },
                    {
                      step: 2,
                      title: "Toma de Muestra",
                      time: "30 segundos",
                      details: [
                        "Enjuaga el tubo 2-3 veces con agua del acuario",
                        "Toma agua del centro del acuario (30cm de profundidad)",
                        "Llena EXACTAMENTE hasta la marca (5ml típicamente)",
                        "El menisco inferior debe tocar la línea",
                        "Seca el exterior del tubo"
                      ],
                      tip: "Un error de 0.5ml puede cambiar el resultado hasta 10%"
                    },
                    {
                      step: 3,
                      title: "Adición de Reactivos",
                      time: "30 segundos",
                      details: [
                        "Agita SIEMPRE el frasco antes de usar",
                        "Sostén el frasco verticalmente",
                        "Cuenta las gotas en voz alta",
                        "Gotas completas, no medias gotas",
                        "Espera que cada gota caiga completamente"
                      ],
                      tip: "Gotas inclinadas = volumen incorrecto = error del 15-20%"
                    },
                    {
                      step: 4,
                      title: "Mezcla y Reacción",
                      time: "Variable (30s - 5min)",
                      details: [
                        "Tapa el tubo inmediatamente",
                        "Invierte suavemente 5-10 veces (no agites violentamente)",
                        "Algunos tests requieren agitación, otros inversión",
                        "Respeta el tiempo EXACTO de espera",
                        "Usa cronómetro, no aproximaciones"
                      ],
                      tip: "Agitación violenta introduce burbujas que alteran el color"
                    },
                    {
                      step: 5,
                      title: "Lectura del Resultado",
                      time: "30 segundos",
                      details: [
                        "Sostén el tubo contra fondo blanco",
                        "Vista lateral para color uniforme",
                        "Vista superior para intensidad",
                        "Compara con carta a 10cm de distancia",
                        "Si está entre valores, registra ambos"
                      ],
                      tip: "Luz natural indirecta o LED 6500K para máxima precisión"
                    },
                    {
                      step: 6,
                      title: "Limpieza y Registro",
                      time: "1 minuto",
                      details: [
                        "Enjuaga tubos 3 veces con agua del grifo",
                        "Enjuague final con agua destilada",
                        "Seca boca abajo sobre papel",
                        "Registra: fecha, hora, parámetro, valor",
                        "Anota cualquier observación inusual"
                      ],
                      tip: "Residuos de reactivos = contaminación del próximo test"
                    }
                  ].map(({ step, title, time, details, tip }) => (
                    <div key={step} className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-5 border border-blue-200">
                      <div className="flex items-start mb-3">
                        <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold mr-3 flex-shrink-0">
                          {step}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-center mb-2">
                            <h5 className="font-bold text-gray-800">{title}</h5>
                            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full flex items-center">
                              <Timer className="w-3 h-3 mr-1" />
                              {time}
                            </span>
                          </div>
                          <ul className="text-sm text-gray-600 space-y-1 mb-3">
                            {details.map((detail, idx) => (
                              <li key={idx} className="flex items-start">
                                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2 mt-1.5 flex-shrink-0"></span>
                                {detail}
                              </li>
                            ))}
                          </ul>
                          <div className="bg-cyan-100 p-2 rounded-lg border border-cyan-300">
                            <p className="text-xs text-cyan-800">
                              <strong>💡 Tip Pro:</strong> {tip}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tests Específicos y Sus Particularidades */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
                <h4 className="text-lg font-bold text-purple-800 mb-4 flex items-center">
                  <Beaker className="w-5 h-5 mr-2" />
                  Particularidades de Cada Test
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg">
                    <h5 className="font-semibold text-gray-800 mb-2 flex items-center">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
                      pH
                    </h5>
                    <ul className="text-xs text-gray-600 space-y-1">
                      <li>• Reactivo: Azul de bromofenol típicamente</li>
                      <li>• Tiempo: Lectura inmediata</li>
                      <li>• Rango: 6.0-7.6 (agua dulce) / 7.4-8.8 (marina)</li>
                      <li>• Tip: Mide siempre a la misma hora del día</li>
                    </ul>
                  </div>

                  <div className="bg-white p-4 rounded-lg">
                    <h5 className="font-semibold text-gray-800 mb-2 flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      Amoniaco (NH₃/NH₄)
                    </h5>
                    <ul className="text-xs text-gray-600 space-y-1">
                      <li>• Reactivo: Salicilato + catalizador</li>
                      <li>• Tiempo: 5 minutos exactos</li>
                      <li>• Color: Amarillo → Verde → Azul</li>
                      <li>• Crítico: Debe ser siempre 0 ppm</li>
                    </ul>
                  </div>

                  <div className="bg-white p-4 rounded-lg">
                    <h5 className="font-semibold text-gray-800 mb-2 flex items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                      Nitritos (NO₂)
                    </h5>
                    <ul className="text-xs text-gray-600 space-y-1">
                      <li>• Reactivo: Ácido sulfanílico + naftilamina</li>
                      <li>• Tiempo: 2-5 minutos</li>
                      <li>• Color: Rosa/Púrpura = Peligro</li>
                      <li>• Interferencia: Cloro puede dar falsos positivos</li>
                    </ul>
                  </div>

                  <div className="bg-white p-4 rounded-lg">
                    <h5 className="font-semibold text-gray-800 mb-2 flex items-center">
                      <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                      Nitratos (NO₃)
                    </h5>
                    <ul className="text-xs text-gray-600 space-y-1">
                      <li>• Reactivo: 2 botellas (reducción + color)</li>
                      <li>• Tiempo: Agitar 1 min + esperar 5 min</li>
                      <li>• Importante: Agitar VIGOROSAMENTE</li>
                      <li>• Objetivo: Mantener &gl; 20ppm dulce, &gl;5ppm marino</li>
                    </ul>
                  </div>

                  <div className="bg-white p-4 rounded-lg">
                    <h5 className="font-semibold text-gray-800 mb-2 flex items-center">
                      <div className="w-2 h-2 bg-cyan-500 rounded-full mr-2"></div>
                      GH (Dureza General)
                    </h5>
                    <ul className="text-xs text-gray-600 space-y-1">
                      <li>• Método: Titración (gota a gota)</li>
                      <li>• Cambio: Rojo → Verde</li>
                      <li>• Cálculo: 1 gota = 1°dGH típicamente</li>
                      <li>• Agitar después de cada gota</li>
                    </ul>
                  </div>

                  <div className="bg-white p-4 rounded-lg">
                    <h5 className="font-semibold text-gray-800 mb-2 flex items-center">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                      KH (Dureza de Carbonatos)
                    </h5>
                    <ul className="text-xs text-gray-600 space-y-1">
                      <li>• Método: Titración</li>
                      <li>• Cambio: Azul → Amarillo</li>
                      <li>• Importante: KH estabiliza el pH</li>
                      <li>• Mínimo: 3-4°dKH para estabilidad</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Técnicas Avanzadas */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
                <h4 className="text-lg font-bold text-green-800 mb-4 flex items-center">
                  <Target className="w-5 h-5 mr-2" />
                  Técnicas Avanzadas para Máxima Precisión
                </h4>
                
                <div className="space-y-3">
                  <div className="bg-white p-4 rounded-lg">
                    <h5 className="font-semibold text-green-700 mb-2">🔬 Dilución para Rangos Altos</h5>
                    <p className="text-sm text-gray-600 mb-2">
                      Si el resultado excede la escala máxima:
                    </p>
                    <ul className="text-xs text-gray-600 space-y-1">
                      <li>• Mezcla 50% agua del acuario + 50% agua destilada</li>
                      <li>• Realiza el test normalmente</li>
                      <li>• Multiplica el resultado x2</li>
                      <li>• Útil para nitratos muy altos (&gt;160ppm)</li>
                    </ul>
                  </div>

                  <div className="bg-white p-4 rounded-lg">
                    <h5 className="font-semibold text-green-700 mb-2">📊 Método de Verificación Cruzada</h5>
                    <p className="text-sm text-gray-600 mb-2">
                      Para resultados críticos o dudosos:
                    </p>
                    <ul className="text-xs text-gray-600 space-y-1">
                      <li>• Realiza 3 tests de la misma muestra</li>
                      <li>• Descarta el valor más alejado</li>
                      <li>• Promedia los dos restantes</li>
                      <li>• Precisión aumenta hasta 98%</li>
                    </ul>
                  </div>

                  <div className="bg-white p-4 rounded-lg">
                    <h5 className="font-semibold text-green-700 mb-2">🌡️ Compensación por Temperatura</h5>
                    <p className="text-sm text-gray-600 mb-2">
                      Para agua fuera del rango 20-25°C:
                    </p>
                    <ul className="text-xs text-gray-600 space-y-1">
                      <li>• &gl;20°C: Añade 10% al tiempo de reacción</li>
                      <li>• &gt;28°C: Reduce 10% el tiempo de reacción</li>
                      <li>• pH: +0.2 por cada 10°C sobre 25°C</li>
                      <li>• Amoniaco: Más tóxico a mayor temperatura</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Tabla de Colorimetría Estándar */}
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
          <Palette className="w-6 h-6 mr-3 text-indigo-600" />
          Guía de Colorimetría: Interpretación Profesional
        </h3>

        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-gray-800 mb-3">
              Colores Estándar y Su Significado
            </h4>
            
            {/* Selector de parámetro */}
            <div className="flex flex-wrap gap-2 mb-4">
              {['pH', 'Amoniaco', 'Nitritos', 'Nitratos', 'GH', 'KH'].map((param) => (
                <button
                  key={param}
                  onClick={() => setSelectedTest(param.toLowerCase())}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    selectedTest === param.toLowerCase()
                      ? 'bg-indigo-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {param}
                </button>
              ))}
            </div>

            {/* Escalas de color según el parámetro seleccionado */}
            <div className="space-y-4">
              {selectedTest === 'ph' && (
                <div>
                  <h5 className="font-semibold text-gray-700 mb-3">pH - Escala de Acidez/Alcalinidad</h5>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-full bg-gradient-to-r from-red-600 via-yellow-500 via-green-500 to-blue-600 h-8 rounded-lg"></div>
                    </div>
                    <div className="grid grid-cols-7 gap-2 text-xs text-center">
                      <div>
                        <div className="bg-red-600 h-12 rounded mb-1"></div>
                        <p className="font-semibold">6.0</p>
                        <p className="text-gray-600">Muy Ácido</p>
                      </div>
                      <div>
                        <div className="bg-orange-500 h-12 rounded mb-1"></div>
                        <p className="font-semibold">6.5</p>
                        <p className="text-gray-600">Ácido</p>
                      </div>
                      <div>
                        <div className="bg-yellow-500 h-12 rounded mb-1"></div>
                        <p className="font-semibold">7.0</p>
                        <p className="text-gray-600">Neutro</p>
                      </div>
                      <div>
                        <div className="bg-green-500 h-12 rounded mb-1"></div>
                        <p className="font-semibold">7.5</p>
                        <p className="text-gray-600">Ligeramente Alcalino</p>
                      </div>
                      <div>
                        <div className="bg-teal-500 h-12 rounded mb-1"></div>
                        <p className="font-semibold">8.0</p>
                        <p className="text-gray-600">Alcalino</p>
                      </div>
                      <div>
                        <div className="bg-blue-500 h-12 rounded mb-1"></div>
                        <p className="font-semibold">8.5</p>
                        <p className="text-gray-600">Muy Alcalino</p>
                      </div>
                      <div>
                        <div className="bg-purple-600 h-12 rounded mb-1"></div>
                        <p className="font-semibold">9.0</p>
                        <p className="text-gray-600">Extremo</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {selectedTest === 'amoniaco' && (
                <div>
                  <h5 className="font-semibold text-gray-700 mb-3">Amoniaco (NH₃/NH₄) - Tóxico</h5>
                  <div className="space-y-3">
                    <div className="grid grid-cols-6 gap-2 text-xs text-center">
                      <div>
                        <div className="bg-yellow-100 h-12 rounded mb-1 border border-yellow-300"></div>
                        <p className="font-semibold">0 ppm</p>
                        <p className="text-green-600 font-semibold">✓ Seguro</p>
                      </div>
                      <div>
                        <div className="bg-yellow-200 h-12 rounded mb-1"></div>
                        <p className="font-semibold">0.25 ppm</p>
                        <p className="text-yellow-600">Estrés</p>
                      </div>
                      <div>
                        <div className="bg-green-300 h-12 rounded mb-1"></div>
                        <p className="font-semibold">0.5 ppm</p>
                        <p className="text-orange-600">Peligro</p>
                      </div>
                      <div>
                        <div className="bg-green-500 h-12 rounded mb-1"></div>
                        <p className="font-semibold">1.0 ppm</p>
                        <p className="text-red-600">Tóxico</p>
                      </div>
                      <div>
                        <div className="bg-green-700 h-12 rounded mb-1"></div>
                        <p className="font-semibold">2.0 ppm</p>
                        <p className="text-red-700 font-semibold">Letal</p>
                      </div>
                      <div>
                        <div className="bg-blue-600 h-12 rounded mb-1"></div>
                        <p className="font-semibold">4.0+ ppm</p>
                        <p className="text-red-800 font-semibold">Muerte</p>
                      </div>
                    </div>
                    <div className="bg-red-50 p-3 rounded-lg border border-red-200">
                      <p className="text-xs text-red-700">
                        <strong>⚠️ Crítico:</strong> Cualquier lectura superior a 0 requiere acción inmediata.
                        El amoniaco es extremadamente tóxico y puede matar peces en horas.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {selectedTest === 'nitritos' && (
                <div>
                  <h5 className="font-semibold text-gray-700 mb-3">Nitritos (NO₂) - Tóxico</h5>
                  <div className="space-y-3">
                    <div className="grid grid-cols-6 gap-2 text-xs text-center">
                      <div>
                        <div className="bg-blue-100 h-12 rounded mb-1 border border-blue-300"></div>
                        <p className="font-semibold">0 ppm</p>
                        <p className="text-green-600 font-semibold">✓ Seguro</p>
                      </div>
                      <div>
                        <div className="bg-pink-200 h-12 rounded mb-1"></div>
                        <p className="font-semibold">0.25 ppm</p>
                        <p className="text-yellow-600">Alerta</p>
                      </div>
                      <div>
                        <div className="bg-pink-300 h-12 rounded mb-1"></div>
                        <p className="font-semibold">0.5 ppm</p>
                        <p className="text-orange-600">Estrés</p>
                      </div>
                      <div>
                        <div className="bg-pink-500 h-12 rounded mb-1"></div>
                        <p className="font-semibold">1.0 ppm</p>
                        <p className="text-red-600">Peligro</p>
                      </div>
                      <div>
                        <div className="bg-purple-500 h-12 rounded mb-1"></div>
                        <p className="font-semibold">2.0 ppm</p>
                        <p className="text-red-700 font-semibold">Tóxico</p>
                      </div>
                      <div>
                        <div className="bg-purple-700 h-12 rounded mb-1"></div>
                        <p className="font-semibold">5.0+ ppm</p>
                        <p className="text-red-800 font-semibold">Letal</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {selectedTest === 'nitratos' && (
                <div>
                  <h5 className="font-semibold text-gray-700 mb-3">Nitratos (NO₃) - Producto Final</h5>
                  <div className="space-y-3">
                    <div className="grid grid-cols-7 gap-2 text-xs text-center">
                      <div>
                        <div className="bg-yellow-100 h-12 rounded mb-1 border border-yellow-300"></div>
                        <p className="font-semibold">0 ppm</p>
                        <p className="text-blue-600">Plantado</p>
                      </div>
                      <div>
                        <div className="bg-yellow-200 h-12 rounded mb-1"></div>
                        <p className="font-semibold">5 ppm</p>
                        <p className="text-green-600 font-semibold">✓ Ideal</p>
                      </div>
                      <div>
                        <div className="bg-yellow-300 h-12 rounded mb-1"></div>
                        <p className="font-semibold">10 ppm</p>
                        <p className="text-green-600">Bueno</p>
                      </div>
                      <div>
                        <div className="bg-orange-300 h-12 rounded mb-1"></div>
                        <p className="font-semibold">20 ppm</p>
                        <p className="text-yellow-600">Aceptable</p>
                      </div>
                      <div>
                        <div className="bg-orange-500 h-12 rounded mb-1"></div>
                        <p className="font-semibold">40 ppm</p>
                        <p className="text-orange-600">Alto</p>
                      </div>
                      <div>
                        <div className="bg-red-500 h-12 rounded mb-1"></div>
                        <p className="font-semibold">80 ppm</p>
                        <p className="text-red-600">Peligroso</p>
                      </div>
                      <div>
                        <div className="bg-red-700 h-12 rounded mb-1"></div>
                        <p className="font-semibold">160+ ppm</p>
                        <p className="text-red-700 font-semibold">Crítico</p>
                      </div>
                    </div>
                    <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                      <p className="text-xs text-blue-700">
                        <strong>💡 Nota:</strong> Los nitratos son menos tóxicos pero su acumulación causa problemas a largo plazo.
                        Mantén &gl;20ppm en dulce y &gl;5ppm en marino.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {selectedTest === 'gh' && (
                <div>
                  <h5 className="font-semibold text-gray-700 mb-3">GH - Dureza General (Calcio + Magnesio)</h5>
                  <div className="space-y-3">
                    <div className="grid grid-cols-6 gap-2 text-xs text-center">
                      <div>
                        <div className="bg-blue-100 h-12 rounded mb-1 border border-blue-300"></div>
                        <p className="font-semibold">0-4°</p>
                        <p className="text-blue-600">Muy Blanda</p>
                        <p className="text-gray-500">Discus, Tetras</p>
                      </div>
                      <div>
                        <div className="bg-blue-200 h-12 rounded mb-1"></div>
                        <p className="font-semibold">4-8°</p>
                        <p className="text-blue-700">Blanda</p>
                        <p className="text-gray-500">Amazónicos</p>
                      </div>
                      <div>
                        <div className="bg-blue-300 h-12 rounded mb-1"></div>
                        <p className="font-semibold">8-12°</p>
                        <p className="text-green-600 font-semibold">Media</p>
                        <p className="text-gray-500">Comunitarios</p>
                      </div>
                      <div>
                        <div className="bg-blue-400 h-12 rounded mb-1"></div>
                        <p className="font-semibold">12-18°</p>
                        <p className="text-orange-600">Dura</p>
                        <p className="text-gray-500">Vivíparos</p>
                      </div>
                      <div>
                        <div className="bg-blue-500 h-12 rounded mb-1"></div>
                        <p className="font-semibold">18-25°</p>
                        <p className="text-red-600">Muy Dura</p>
                        <p className="text-gray-500">Cíclidos Africanos</p>
                      </div>
                      <div>
                        <div className="bg-blue-700 h-12 rounded mb-1"></div>
                        <p className="font-semibold">25+°</p>
                        <p className="text-red-700">Extrema</p>
                        <p className="text-gray-500">Lagos Rift</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {selectedTest === 'kh' && (
                <div>
                  <h5 className="font-semibold text-gray-700 mb-3">KH - Dureza de Carbonatos (Estabilizador de pH)</h5>
                  <div className="space-y-3">
                    <div className="grid grid-cols-6 gap-2 text-xs text-center">
                      <div>
                        <div className="bg-yellow-100 h-12 rounded mb-1 border border-red-300"></div>
                        <p className="font-semibold">0-2°</p>
                        <p className="text-red-600 font-semibold">Inestable</p>
                        <p className="text-gray-500">pH fluctuante</p>
                      </div>
                      <div>
                        <div className="bg-yellow-200 h-12 rounded mb-1"></div>
                        <p className="font-semibold">2-4°</p>
                        <p className="text-orange-600">Bajo</p>
                        <p className="text-gray-500">Vigilar pH</p>
                      </div>
                      <div>
                        <div className="bg-yellow-300 h-12 rounded mb-1"></div>
                        <p className="font-semibold">4-8°</p>
                        <p className="text-green-600 font-semibold">Ideal</p>
                        <p className="text-gray-500">pH estable</p>
                      </div>
                      <div>
                        <div className="bg-green-300 h-12 rounded mb-1"></div>
                        <p className="font-semibold">8-12°</p>
                        <p className="text-blue-600">Bueno</p>
                        <p className="text-gray-500">Muy estable</p>
                      </div>
                      <div>
                        <div className="bg-green-400 h-12 rounded mb-1"></div>
                        <p className="font-semibold">12-18°</p>
                        <p className="text-purple-600">Alto</p>
                        <p className="text-gray-500">Africanos</p>
                      </div>
                      <div>
                        <div className="bg-green-600 h-12 rounded mb-1"></div>
                        <p className="font-semibold">18+°</p>
                        <p className="text-purple-700">Muy Alto</p>
                        <p className="text-gray-500">Marino</p>
                      </div>
                    </div>
                    <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                      <p className="text-xs text-yellow-700">
                        <strong>⚠️ Importante:</strong> KH &gl; 3° puede causar caídas bruscas de pH mortales. 
                        Mantén siempre KH &gt; 4° para estabilidad.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Consejos para Interpretación de Colores */}
          <div className="mt-6 bg-gray-50 rounded-xl p-6">
            <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <Eye className="w-5 h-5 mr-2 text-gray-600" />
              Consejos Profesionales para Interpretación de Colores
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <h5 className="font-semibold text-gray-700">🌞 Iluminación Correcta:</h5>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Luz natural indirecta es la MEJOR</li>
                  <li>• LED blanco frío (6500K) como alternativa</li>
                  <li>• EVITA luz amarilla/cálida (distorsiona colores)</li>
                  <li>• No uses luz directa del sol (demasiado intensa)</li>
                </ul>
              </div>

              <div className="space-y-3">
                <h5 className="font-semibold text-gray-700">👁️ Técnicas de Comparación:</h5>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Mira desde arriba Y desde el lado</li>
                  <li>• Usa fondo blanco detrás del tubo/tira</li>
                  <li>• Si dudas entre dos valores, registra ambos</li>
                  <li>• Toma fotos para comparar evolución</li>
                </ul>
              </div>

              <div className="space-y-3">
                <h5 className="font-semibold text-gray-700">🎨 Problemas Comunes:</h5>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Daltonismo: Pide ayuda o usa app móvil</li>
                  <li>• Colores intermedios: Usa el valor más alto por seguridad</li>
                  <li>• Turbidez: Interfiere con lectura, filtra primero</li>
                  <li>• Medicamentos: Pueden teñir el agua y alterar tests</li>
                </ul>
              </div>

              <div className="space-y-3">
                <h5 className="font-semibold text-gray-700">📱 Herramientas Digitales:</h5>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Apps de análisis de color (ej: Aquarium Note)</li>
                  <li>• Fotómetros digitales para precisión máxima</li>
                  <li>• Calibra el balance de blancos de tu cámara</li>
                  <li>• Guarda fotos con fecha para historial</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Calendario de Tests Recomendado */}
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
          <Clock className="w-6 h-6 mr-3 text-green-600" />
          Calendario de Tests: Cuándo y Qué Medir
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Durante el Ciclado */}
          <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-6 border border-red-200">
            <h4 className="text-lg font-bold text-red-800 mb-4 flex items-center">
              <Activity className="w-5 h-5 mr-2" />
              Durante el Ciclado (0-6 semanas)
            </h4>
            <div className="space-y-3">
              <div className="bg-white p-3 rounded-lg">
                <h5 className="font-semibold text-gray-700 mb-2">📅 Diario:</h5>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Amoniaco (NH₃) - Crítico</li>
                  <li>• Nitritos (NO₂) - Crítico</li>
                  <li>• pH - Para detectar caídas</li>
                </ul>
              </div>
              <div className="bg-white p-3 rounded-lg">
                <h5 className="font-semibold text-gray-700 mb-2">📅 Cada 3 días:</h5>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Nitratos (NO₃)</li>
                  <li>• KH (si pH inestable)</li>
                </ul>
              </div>
              <div className="bg-red-100 p-3 rounded-lg border border-red-300">
                <p className="text-xs text-red-700">
                  <strong>⚠️ Usa tests de gotas:</strong> La precisión es crítica durante el ciclado
                </p>
              </div>
            </div>
          </div>

          {/* Acuario Maduro */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
            <h4 className="text-lg font-bold text-green-800 mb-4 flex items-center">
              <CheckCircle className="w-5 h-5 mr-2" />
              Acuario Maduro (&gt;2 meses)
            </h4>
            <div className="space-y-3">
              <div className="bg-white p-3 rounded-lg">
                <h5 className="font-semibold text-gray-700 mb-2">📅 Semanal:</h5>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Nitratos (NO₃)</li>
                  <li>• pH</li>
                  <li>• Test rápido con tiras</li>
                </ul>
              </div>
              <div className="bg-white p-3 rounded-lg">
                <h5 className="font-semibold text-gray-700 mb-2">📅 Mensual:</h5>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• GH y KH</li>
                  <li>• Fosfatos (si hay algas)</li>
                  <li>• Test completo con gotas</li>
                </ul>
              </div>
              <div className="bg-green-100 p-3 rounded-lg border border-green-300">
                <p className="text-xs text-green-700">
                  <strong>✓ Tip:</strong> Alterna tiras para rutina y gotas para confirmación
                </p>
              </div>
            </div>
          </div>

          {/* Situaciones Especiales */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200">
            <h4 className="text-lg font-bold text-purple-800 mb-4 flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2" />
              Situaciones Especiales
            </h4>
            <div className="space-y-3">
              <div className="bg-white p-3 rounded-lg">
                <h5 className="font-semibold text-gray-700 mb-2">🚨 Test Inmediato si:</h5>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Peces en superficie o jadeando</li>
                  <li>• Muerte súbita de peces</li>
                  <li>• Agua turbia o con olor</li>
                  <li>• Después de corte eléctrico</li>
                  <li>• Post-medicación</li>
                </ul>
              </div>
              <div className="bg-white p-3 rounded-lg">
                <h5 className="font-semibold text-gray-700 mb-2">🔬 Test Completo cuando:</h5>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Introduces peces nuevos</li>
                  <li>• Cambias de alimento</li>
                  <li>• Modificas filtración</li>
                  <li>• Aparecen algas</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Registro y Seguimiento */}
      <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl p-8 border border-indigo-200">
        <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
          <Calculator className="w-6 h-6 mr-3 text-indigo-600" />
          Sistema de Registro: Tu Historial es Oro
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-4">📊 Qué Registrar:</h4>
            <div className="bg-white p-4 rounded-lg space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Fecha y Hora</span>
                <span className="text-gray-800 font-medium">Siempre</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Todos los parámetros medidos</span>
                <span className="text-gray-800 font-medium">Valores exactos</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Tipo de test usado</span>
                <span className="text-gray-800 font-medium">Tiras/Gotas/Marca</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Acciones tomadas</span>
                <span className="text-gray-800 font-medium">Cambios de agua, etc.</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Observaciones</span>
                <span className="text-gray-800 font-medium">Comportamiento anormal</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-4">📈 Por Qué es Crucial:</h4>
            <div className="space-y-3">
              <div className="bg-indigo-100 p-3 rounded-lg">
                <h5 className="font-semibold text-indigo-800 mb-1">Detecta Tendencias</h5>
                <p className="text-xs text-indigo-700">
                  Los problemas raramente aparecen de repente, el historial muestra patrones
                </p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <h5 className="font-semibold text-blue-800 mb-1">Diagnóstico Rápido</h5>
                <p className="text-xs text-blue-700">
                  Ante problemas, el historial ayuda a identificar la causa raíz
                </p>
              </div>
              <div className="bg-cyan-100 p-3 rounded-lg">
                <h5 className="font-semibold text-cyan-800 mb-1">Optimización</h5>
                <p className="text-xs text-cyan-700">
                  Aprende qué funciona mejor para TU acuario específico
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Plantilla de Registro */}
        <div className="mt-6 bg-white rounded-xl p-6">
          <h4 className="font-semibold text-gray-800 mb-3">📝 Plantilla de Registro Sugerida:</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 px-3 text-gray-700">Fecha</th>
                  <th className="text-center py-2 px-3 text-gray-700">pH</th>
                  <th className="text-center py-2 px-3 text-gray-700">NH₃</th>
                  <th className="text-center py-2 px-3 text-gray-700">NO₂</th>
                  <th className="text-center py-2 px-3 text-gray-700">NO₃</th>
                  <th className="text-center py-2 px-3 text-gray-700">GH</th>
                  <th className="text-center py-2 px-3 text-gray-700">KH</th>
                  <th className="text-center py-2 px-3 text-gray-700">T°C</th>
                  <th className="text-left py-2 px-3 text-gray-700">Notas</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-2 px-3 text-gray-600">01/01/24</td>
                  <td className="text-center py-2 px-3">7.2</td>
                  <td className="text-center py-2 px-3 text-green-600">0</td>
                  <td className="text-center py-2 px-3 text-green-600">0</td>
                  <td className="text-center py-2 px-3 text-yellow-600">15</td>
                  <td className="text-center py-2 px-3">10</td>
                  <td className="text-center py-2 px-3">6</td>
                  <td className="text-center py-2 px-3">25</td>
                  <td className="py-2 px-3 text-gray-600 text-xs">Cambio 25%, peces activos</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 px-3 text-gray-600">08/01/24</td>
                  <td className="text-center py-2 px-3">7.0</td>
                  <td className="text-center py-2 px-3 text-green-600">0</td>
                  <td className="text-center py-2 px-3 text-green-600">0</td>
                  <td className="text-center py-2 px-3 text-orange-600">25</td>
                  <td className="text-center py-2 px-3">-</td>
                  <td className="text-center py-2 px-3">-</td>
                  <td className="text-center py-2 px-3">24</td>
                  <td className="py-2 px-3 text-gray-600 text-xs">Nitratos subiendo, cambio programado</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Conclusión y Call to Action */}
      <div className="mt-8 text-center bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-8 text-white">
        <h3 className="text-2xl font-bold mb-4">
          🎯 Domina los Tests, Domina tu Acuario
        </h3>
        <p className="text-lg mb-6 max-w-3xl mx-auto">
          Con estas técnicas profesionales, tus tests serán tan precisos como los de un laboratorio. 
          Recuerda: la constancia y precisión en las mediciones son la clave para un acuario próspero.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
            <h4 className="font-semibold mb-2">🏆 Objetivo Principal</h4>
            <p className="text-sm">
              Tests regulares = Prevención de problemas = Peces felices y sanos
            </p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
            <h4 className="font-semibold mb-2">📚 Próximo Paso</h4>
            <p className="text-sm">
              Establece tu rutina de tests y mantén un registro detallado
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TestingGuideComplete;
