# Asistente de Análisis de Algas IA

## Descripción

El **Asistente de Análisis de Algas IA** es un componente completo que utiliza inteligencia artificial para identificar tipos de algas en acuarios mediante análisis de imágenes. El componente proporciona una experiencia interactiva paso a paso donde los usuarios pueden subir fotos de sus problemas de algas y recibir identificación automática junto con soluciones específicas.

## Características Principales

- **Análisis de Imágenes con IA**: Utiliza el servicio Gemini para procesar imágenes
- **Interfaz Paso a Paso**: Guía al usuario a través del proceso de análisis
- **Base de Datos Completa**: Incluye 10 tipos diferentes de algas con información detallada
- **Identificación Automática**: Devuelve el ID de la alga más cercana basado en la imagen y descripción
- **Soluciones Específicas**: Proporciona causas, soluciones, prevención y advertencias
- **UI Responsiva**: Diseño moderno con Tailwind CSS

## Estructura de Archivos

```
src/
├── components/
│   └── AssistantComponent.tsx    # Componente principal del asistente
├── data/
│   └── algaeData.ts             # Base de datos de algas
├── pages/
│   └── assistant.tsx            # Página que usa el componente
└── service/
    └── gemini.tsx               # Servicio de conexión con IA
```

## Flujo de Trabajo

### 1. Pantalla de Bienvenida
- Presentación del asistente
- Explicación del proceso
- Botón para iniciar análisis

### 2. Subida de Imagen
- Drag & drop o click para subir imagen
- Validación de formato (PNG, JPG, JPEG)
- Vista previa inmediata

### 3. Descripción del Usuario
- Campo de texto para describir las algas observadas
- Contador de caracteres (máximo 500)
- Validación de longitud mínima

### 4. Análisis con IA
- Envío de imagen y descripción a Gemini API
- Comparación con base de datos de algas
- Extracción del ID de la alga más cercana

### 5. Resultados
- Visualización de la información completa del alga identificada
- Secciones organizadas: descripción, causas, soluciones, prevención, advertencias
- Opción para realizar otro análisis

## Uso del Componente

### Importación Básica

```tsx
import AlgaeAssistant from '../components/AssistantComponent';

function MyPage() {
    return (
        <div>
            <AlgaeAssistant />
        </div>
    );
}
```

### Integración en Página Completa

```tsx
import React from 'react';
import AlgaeAssistant from '../components/AssistantComponent';

const AssistantPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 py-8 px-4">
            <div className="container mx-auto">
                <AlgaeAssistant />
            </div>
        </div>
    );
};
```

## Base de Datos de Algas

La base de datos incluye 10 tipos de algas comunes:

1. **Algas Verdes en Cristal** (Chlorophyta spp.)
2. **Algas Marrones (Diatomeas)** (Bacillariophyta)
3. **Cianobacterias** (Cyanobacteria)
4. **Algas Filamentosas Verdes** (Spirogyra, Cladophora)
5. **Algas Negras (Barba Negra)** (Audouinella, Compsopogon)
6. **Algas Punto Verde** (Choleochaete)
7. **Algas Pelusa Verde** (Oedogonium)
8. **Alga Barba Verde** (Oedogonium)
9. **Alga Asta de Ciervo** (Compsopogon)
10. **Agua Verde (Alga Unicelular)** (Chlorella, Euglena, etc.)

### Estructura de Datos

```typescript
interface Alga {
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
```

## Integración con IA

### Prompt de Análisis

El componente envía un prompt estructurado a la IA que incluye:
- La descripción del usuario
- La base de datos completa de algas en formato JSON
- Instrucciones para devolver únicamente el ID de la alga más cercana

### Procesamiento de Respuesta

```typescript
// Extracción del ID de la respuesta de la IA
let algaeId: number;
if (typeof response === 'object' && response.parts) {
    const content = response.parts;
    algaeId = parseInt(content.match(/\d+/)?.[0] || '1');
} else {
    algaeId = parseInt(response.toString().match(/\d+/)?.[0] || '1');
}
```

## Configuración de Rutas

Para usar el componente como página independiente, agrega la ruta en `App.tsx`:

```tsx
import AssistantPage from './pages/assistant';

// En las rutas:
<Route path="/assistant" element={<AssistantPage />} />
```

## Estados del Componente

- `currentStep`: Controla el paso actual del flujo
- `imageFile`: Archivo de imagen seleccionado
- `imagePreview`: URL de vista previa de la imagen
- `description`: Texto descriptivo del usuario
- `result`: Alga identificada por la IA
- `loading`: Estado de carga durante el análisis
- `error`: Mensajes de error

## Estilos y Temas

El componente utiliza:
- **Tailwind CSS** para estilos
- **Lucide React** para iconos
- **Gradientes azules** como tema principal
- **Indicadores de progreso** visuales
- **Badges de colores** para categorizar información

## Consejos para Mejores Resultados

1. **Fotos de calidad**: Buena iluminación y enfoque nítido
2. **Descripciones detalladas**: Color, textura, ubicación, comportamiento
3. **Especificidad**: Mencionar dónde aparecen las algas (plantas, cristal, etc.)

## Posibles Extensiones

- Soporte para múltiples idiomas
- Historial de análisis previos
- Integración con otros tipos de problemas (peces enfermos, plantas)
- Sistema de feedback para mejorar precisión de la IA
- Función de chat para preguntas específicas

## Dependencias

- React 18+
- TypeScript
- Tailwind CSS
- Lucide React
- Axios (para llamadas API)
- React Router (para navegación)
