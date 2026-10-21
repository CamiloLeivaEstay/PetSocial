# PetSocial

App móvil de PetSocial: marketplace de servicios para mascotas con Pet IA, servicio en vivo, reservas, certificados de viaje y más. Está construida con **React + TypeScript + Vite** y se empaqueta como app nativa para **Android e iOS** con **Capacitor 8**.

La interfaz es una copia pixel perfect del prototipo de Claude Design (`design/PetSocial App.dc.html`). Cada pantalla conserva exactamente los estilos, medidas y animaciones del prototipo. Solo se quitaron las piezas que eran del prototipo: el marco del iPhone, la barra de estado falsa (9:41), la barra de inicio y el panel lateral de atajos. Ahora la barra de estado y los márgenes seguros son los del teléfono.

## Requisitos

- Node.js 22 o superior
- Para Android: Android Studio actualizado (incluye el JDK necesario)
- Para iOS: un Mac con la versión actual de Xcode

## Correr la app

```bash
npm install
npm run dev
```

Se abre en `http://localhost:5173`. En un computador, la app se ve como una columna del ancho de un teléfono.

### Probarla en tu celular

**Opción rápida, en el navegador del celular.** Conecta el celular a la misma red Wi-Fi que el computador y ejecuta `npm run dev`. En la terminal aparece una línea `Network: http://192.168.x.x:5173`; abre esa dirección en el celular.

**Como app instalada en Android.**

```bash
npm run android      # compila, sincroniza y abre el proyecto en Android Studio
```

En Android Studio, conecta el teléfono por USB con la depuración USB activada y presiona ▶ Run. Para generar un APK: *Build → Build App Bundle(s) / APK(s) → Build APK(s)*.

**Como app instalada en iPhone** (requiere un Mac):

```bash
npm run ios          # compila, sincroniza y abre el proyecto en Xcode
```

En Xcode, elige tu equipo de firma en *Signing & Capabilities*, conecta el iPhone y presiona ▶.

Cada vez que cambies código web, ejecuta `npm run cap:sync` antes de volver a compilar en Android Studio o Xcode.

## Scripts

| Script | Qué hace |
|---|---|
| `npm run dev` | Servidor de desarrollo, también accesible desde la red local |
| `npm run build` | Revisa los tipos y genera la versión de producción en `dist/` |
| `npm run preview` | Sirve la versión de producción |
| `npm run cap:sync` | Compila y copia la web a los proyectos `android/` e `ios/` |
| `npm run android` / `npm run ios` | `cap:sync` y abre Android Studio o Xcode |
| `npm run convert` | Vuelve a generar las pantallas desde el prototipo (ver abajo) |

Para abrir una pantalla directamente mientras desarrollas, agrega `?screen=` a la URL. Por ejemplo, `http://localhost:5173/?screen=home`.

## Estructura

```
src/
├── App.tsx                 # Layout: zona con scroll + barras fijas y paneles inferiores
├── main.tsx                # Punto de entrada
├── logic/
│   ├── controller.js       # Estado y comportamiento de toda la app (navegación, reservas, chat, etc.)
│   └── data.js             # Datos de ejemplo: proveedores, mascotas, tarjetas, FAQs…
├── screens/                # Una pantalla por archivo (Home, Explorar, Reservar, Mensajes…)
├── components/             # Barra de pestañas, barras inferiores, avisos y paneles inferiores
├── lib/
│   ├── view.ts             # Utilidades de render (estilos, listas)
│   └── native.ts           # Puente con Capacitor: barra de estado, guardar archivos, portapapeles
└── styles/
    ├── global.css          # Estilos base, márgenes seguros y animaciones
    └── interactions.css    # Estados al presionar, pasar el cursor y enfocar
design/                     # Prototipo original de Claude Design, recursos SVG y transcripción del chat
scripts/convert-prototype.py
android/  ios/              # Proyectos nativos de Capacitor
```

Las pantallas leen todo de un único objeto `v` que arma `Controller.renderVals()`. Para cambiar comportamiento o datos, edita `src/logic/`. Para cambiar la interfaz, edita `src/screens/` y `src/components/`.

### Pantallas generadas desde el prototipo

`src/screens/`, `src/components/` y `src/styles/interactions.css` se generaron con `scripts/convert-prototype.py`, que traduce la plantilla del prototipo a TSX sin tocar los estilos. Si actualizas el prototipo en `design/` y quieres traer el diseño nuevo, ejecuta `npm run convert`. Ojo: sobrescribe esos archivos, así que cualquier cambio hecho a mano en ellos se pierde.

## Estado actual

Todas las pantallas y flujos del prototipo están implementados: splash, onboarding, login y registro, configuración de mascota, Home con filtros y patrocinados, buscador y resultados, Explorar con mapa y permiso de ubicación, detalle de proveedor, reserva en 3 pasos con adicionales, Mis reservas, servicio en vivo, Mensajes y Pet IA, perfil y ficha de mascota, métodos de pago, ayuda, reseñas con fotos, favoritos, certificado de viaje con PDF y SOS.

Pendiente para producción:

- **Datos de ejemplo:** no hay backend. Los proveedores, reservas, chats y pagos son simulados, y los cambios se pierden al cerrar la app.
- **Fotos:** las imágenes de ejemplo se cargan desde Unsplash, así que necesitan internet.
- **Mapa:** es ilustrado, no un mapa real.
- **Certificado PDF:** en el navegador se descarga. En la app nativa se guarda en Documentos y se abre el menú para compartir.
- **Ícono y splash nativos:** aún son los de Capacitor por defecto. Se pueden generar con `@capacitor/assets` a partir de `design/assets/isotipo.svg`.
