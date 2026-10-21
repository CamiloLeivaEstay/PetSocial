// Mock data and helpers carried over from the Claude Design prototype.
export const PROVIDERS = [
  { id:'prv-patitas', name:'Patitas Felices', service:'hotel', rating:4.92, reviews:128, price:18000, unit:'noche', comuna:'Providencia', km:1.2, cover:'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&q=80', tag:'Top rated', hours:'Mar-Dom 9:00-18:00', address:'Av. Providencia 1234, Providencia, Santiago', amenities:['Jardín','Cámaras 24h','Aire acondicionado'], description:'Hotel premium para perros y gatos con áreas verdes, cámaras 24/7 y atención veterinaria incluida en el precio.' },
  { id:'prv-happy', name:'Happy Tails', service:'walk', rating:4.87, reviews:95, price:8000, unit:'hora', comuna:'Las Condes', km:2.4, cover:'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800&q=80', tag:'Favorito', hours:'Lun-Sáb 8:00-20:00', address:'Las Condes, Santiago', amenities:['Grupos de 3','GPS en vivo','Fotos del paseo'], description:'Paseos en grupos pequeños, máximo 3 perros, con seguimiento GPS en tiempo real.' },
  { id:'prv-petspa', name:'PetSpa Premium', service:'grooming', rating:4.95, reviews:203, price:22000, unit:'sesión', comuna:'Vitacura', km:3.1, cover:'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=800&q=80', tag:'Favorito', hours:'Mar-Sáb 9:00-18:00', address:'Av. Vitacura 3456, Vitacura, Santiago', amenities:['Orgánico','Aromaterapia','Secado pro','Corte breed'], description:'Tratamientos de bienestar integral con productos orgánicos certificados, aceites esenciales y aromaterapia terapéutica. Técnicas adaptadas a la complexión, pelaje y temperamento de cada raza.' },
  { id:'prv-amigos', name:'Guardería Amigos', service:'boarding', rating:4.78, reviews:67, price:15000, unit:'noche', comuna:'Ñuñoa', km:0.8, cover:'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800&q=80', tag:null, hours:'Lun-Dom 24h', address:'Ñuñoa, Santiago', amenities:['A domicilio','Exp. veterinaria'], description:'Cuidador a domicilio con experiencia veterinaria.' },
  { id:'prv-peludo', name:'Dr. Peludo', service:'vet', rating:4.96, reviews:312, price:30000, unit:'sesión', comuna:'Providencia', km:1.5, cover:'https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?w=800&q=80', tag:'Top rated', hours:'Lun-Dom 24h', address:'Providencia, Santiago', amenities:['Urgencias 24h','Imagenología','Cirugía'], description:'Atención veterinaria integral y grooming clínico, con urgencias 24 horas.' },
  { id:'prv-casa', name:'Casa Encantada Pet Hotel', service:'hotel', rating:4.8, reviews:312, price:20000, unit:'noche', comuna:'Lo Barnechea', km:4.2, cover:'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=800&q=80', tag:null, hours:'Lun-Dom 24h', address:'Lo Barnechea, Santiago', amenities:['Piscina','Veterinario residente'], description:'Hotel campestre con 2.000 m² de jardín.' },
];
export const POS = { 'prv-patitas':['18%','22%'], 'prv-happy':['58%','27%'], 'prv-peludo':['12%','35%'], 'prv-amigos':['56%','44%'], 'prv-petspa':['28%','50%'], 'prv-casa':['62%','55%'] };
export const SVC = { walk:'Paseo', hotel:'Hotel', grooming:'Grooming', vet:'Veterinaria', boarding:'Guardería' };
export const PETS = [
  { id:'pet-max', name:'Max', species:'Perro', microchip:'985 112 004 563 219', weight:28, vaccinated:true, sterilized:true, allergies:['Pollo'], breed:'Golden Retriever', age:'3 años', photo:'https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&q=80' },
  { id:'pet-luna', name:'Luna', species:'Gato', weight:4.5, vaccinated:true, sterilized:true, allergies:[], breed:'Siamés', age:'2 años', photo:'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=400&q=80' },
];
// Campañas SEM activas: empresas que pagan por aparecer destacadas en cada categoría
export const SEM = { hotel:['prv-casa','prv-amigos'], walk:['prv-happy','prv-amigos'], grooming:['prv-petspa','prv-peludo'], vet:['prv-peludo','prv-petspa'], boarding:['prv-amigos','prv-patitas'] };
export const CATS = [['todos','Todos'],['hotel','Hoteles'],['walk','Paseos'],['grooming','Baños'],['vet','Veterinarios'],['boarding','Guardería']];
export const TIMES = ['08:00','09:00','09:30','10:00','10:30','11:00','14:00','14:30','15:00','16:00','17:00','18:00'];
export const CARD_BG = { VISA:'linear-gradient(135deg,#4700D8,#6E2BF4)', MC:'linear-gradient(135deg,#F35843,#FFAA3D)', AMEX:'linear-gradient(135deg,#00262B,#0E7C86)', CARD:'linear-gradient(135deg,#34343D,#56565F)' };
export const CARD_LABEL = { VISA:'Visa', MC:'Mastercard', AMEX:'Amex', CARD:'Tarjeta' };
export const CARDS = [
  { id:'visa', brand:'VISA', last4:'4532', exp:'08/28', holder:'DIEGO PÉREZ', bg: CARD_BG.VISA },
  { id:'mc', brand:'MC', last4:'8821', exp:'12/27', holder:'DIEGO PÉREZ', bg: CARD_BG.MC },
];
export const SUPPORT_AVATAR = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40'%3E%3Crect width='40' height='40' rx='20' fill='%234700D8'/%3E%3Cg fill='white'%3E%3Cellipse cx='13' cy='17' rx='2.4' ry='3.1'/%3E%3Cellipse cx='18' cy='13.5' rx='2.4' ry='3.1'/%3E%3Cellipse cx='23' cy='13.5' rx='2.4' ry='3.1'/%3E%3Cellipse cx='28' cy='17' rx='2.4' ry='3.1'/%3E%3Cpath d='M20.5 19c-3.6 0-6.5 3-6.5 6 0 2.6 2.2 4.4 6.5 4.4S27 27.6 27 25c0-3-2.9-6-6.5-6z'/%3E%3C/g%3E%3C/svg%3E";
// Adicionales que cada empresa habilita desde el portal (Inventario / Servicios)
export const EXTRAS = {
  vet: [
    { id:'vacc', name:'Vacunación', desc:'Aplicación y registro de vacunas en la ficha', price:15000, variantLabel:'Elige la vacuna', variants:['Antirrábica','Óctuple','Séxtuple','Triple felina','Leucemia felina','KC (tos de las perreras)'] },
    { id:'deworm', name:'Desparasitación', desc:'Interna y externa, según peso', price:12000, variantLabel:'Tipo', variants:['Interna','Externa','Interna + externa'] },
    { id:'chip', name:'Microchip', desc:'Implante ISO 15 dígitos e inscripción en registro', price:18000 },
  ],
  grooming: [
    { id:'nails', name:'Corte de uñas', desc:'Limado incluido', price:5000 },
    { id:'ears', name:'Limpieza de oídos', desc:'Con solución veterinaria', price:4000 },
    { id:'hydra', name:'Hidratación de pelaje', desc:'Mascarilla y acondicionador hipoalergénico', price:8000 },
    { id:'deworm', name:'Desparasitación externa', desc:'Pipeta antipulgas y garrapatas', price:12000 },
  ],
  hotel: [
    { id:'bath', name:'Baño antes de salir', desc:'Se va a casa limpio y perfumado', price:15000 },
    { id:'walk', name:'Paseo extra diario', desc:'30 minutos adicionales por día', price:6000 },
    { id:'ride', name:'Transporte ida y vuelta', desc:'Retiro y entrega en tu domicilio', price:10000 },
  ],
  boarding: [
    { id:'walk', name:'Paseo extra', desc:'30 minutos al aire libre', price:5000 },
    { id:'ride', name:'Transporte ida y vuelta', desc:'Retiro y entrega en tu domicilio', price:10000 },
  ],
  walk: [
    { id:'long', name:'Paseo extendido', desc:'+30 minutos al mismo paseo', price:4000 },
    { id:'bath', name:'Baño express', desc:'Al volver del paseo', price:12000 },
  ],
};
export const CERT_TYPES = {
  cabin: { short:'Viaje en cabina', label:'En cabina, conmigo', desc:'Viaja a tu lado y no en bodega. Incluye examen de salud y evaluación de comportamiento.', doc:'Certificado de salud y aptitud para viaje en cabina', valid:10 },
  intl: { short:'Viaje internacional', label:'Internacional, vuelo comercial', desc:'Para salir de Chile. Lo firma un veterinario acreditado y queda listo para validar en el SAG.', doc:'Certificado veterinario internacional · pre-validación SAG', valid:10 },
};
export const CERT_PROS = [
  { id:'eto', name:'Dr. Matías Fuentes', initials:'MF', bg:'#9D7AF0', role:'Médico veterinario etólogo', reg:'COLMEVET 4821', mode:'Videollamada · 40 min · evaluación conductual', price:28000, rating:4.9, types:['cabin'] },
  { id:'vet', name:'Dra. Carolina Muñoz', initials:'CM', bg:'#4700D8', role:'Médica veterinaria acreditada SAG', reg:'Acreditación SAG 1123', mode:'Presencial · Clínica VetCare, Providencia', price:35000, rating:4.95, types:['cabin','intl'] },
  { id:'rojas', name:'Dr. Andrés Rojas', initials:'AR', bg:'#F35843', role:'Médico veterinario', reg:'COLMEVET 3307', mode:'Presencial · Dr. Peludo, Providencia', price:25000, rating:4.8, types:['cabin'] },
];
export const CERT_COUNTRIES = ['Argentina','Perú','Brasil','Estados Unidos','España','México'];
export const CERT_AIRLINES = ['LATAM','Sky Airline','JetSMART','Aerolíneas Argentinas','Iberia','American Airlines'];
export const CERT_DOMESTIC = ['LATAM','Sky Airline','JetSMART'];
export const REQ_ST = { ok:{ icon:'✓', iconBg:'#D1FAE5', iconColor:'#047857', tag:'En la ficha' }, appt:{ icon:'•', iconBg:'#F4EEFE', iconColor:'#4700D8', tag:'En la cita' }, todo:{ icon:'!', iconBg:'#FEF3C7', iconColor:'#92400E', tag:'Pendiente' }, info:{ icon:'i', iconBg:'#EFEFF2', iconColor:'#56565F', tag:'Info' } };
export const isoDate = d => d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
export const qrMatrix = seed => {
  const N = 25; let h = 2166136261;
  for (const ch of String(seed)) { h ^= ch.charCodeAt(0); h = Math.imul(h, 16777619) >>> 0; }
  const rnd = () => { h ^= h << 13; h >>>= 0; h ^= h >>> 17; h ^= h << 5; h >>>= 0; return h / 4294967296; };
  const m = []; for (let y = 0; y < N; y++) { m.push([]); for (let x = 0; x < N; x++) m[y].push(rnd() > 0.52); }
  const finder = (ox, oy) => { for (let y = -1; y < 8; y++) for (let x = -1; x < 8; x++) { const X = ox + x, Y = oy + y; if (X < 0 || Y < 0 || X >= N || Y >= N) continue; const ring = Math.max(Math.abs(x - 3), Math.abs(y - 3)); m[Y][X] = ring === 3 || ring <= 1; } };
  finder(0, 0); finder(N - 7, 0); finder(0, N - 7); return m;
};
export const qrDataUrl = seed => { let d = ''; qrMatrix(seed).forEach((row, y) => row.forEach((on, x) => { if (on) d += 'M' + x + ' ' + y + 'h1v1h-1z'; }));
  return 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="-2 -2 29 29" shape-rendering="crispEdges"><rect x="-2" y="-2" width="29" height="29" fill="#fff"/><path d="' + d + '" fill="#0F0F12"/></svg>'); };
export const CERT_ICON = 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><rect width="40" height="40" rx="20" fill="#F4EEFE"/><path d="M14 10h9l5 5v15a1 1 0 0 1-1 1H14a1 1 0 0 1-1-1V11a1 1 0 0 1 1-1z" fill="none" stroke="#4700D8" stroke-width="2" stroke-linejoin="round"/><path d="M23 10v5h5M17 21h7M17 25h5" fill="none" stroke="#4700D8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>');
export const pdfEsc = t => { const map = { 8212:151, 8211:150, 8226:149, 8217:146, 8216:145, 8220:147, 8221:148, 8230:133, 8364:128 }; let o = '';
  for (const ch of String(t)) { const c = ch.codePointAt(0); const b = c < 256 ? c : map[c]; if (b == null) { o += '?'; continue; }
    if (ch === '(' || ch === ')' || ch === '\\') o += '\\' + ch; else if (b < 32 || b > 126) o += '\\' + b.toString(8).padStart(3, '0'); else o += ch; }
  return o; };
export const buildPdf = content => {
  const objs = [
    '<< /Type /Catalog /Pages 2 0 R >>',
    '<< /Type /Pages /Kids [3 0 R] /Count 1 >>',
    '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 4 0 R /F2 5 0 R /F3 6 0 R >> >> /Contents 7 0 R >>',
    '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>',
    '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>',
    '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Oblique /Encoding /WinAnsiEncoding >>',
    '<< /Length ' + content.length + ' >>\nstream\n' + content + '\nendstream',
  ];
  let pdf = '%PDF-1.4\n'; const offs = [];
  objs.forEach((o, i) => { offs.push(pdf.length); pdf += (i + 1) + ' 0 obj\n' + o + '\nendobj\n'; });
  const x = pdf.length;
  pdf += 'xref\n0 ' + (objs.length + 1) + '\n0000000000 65535 f \n' + offs.map(n => String(n).padStart(10, '0') + ' 00000 n \n').join('');
  return pdf + 'trailer\n<< /Size ' + (objs.length + 1) + ' /Root 1 0 R >>\nstartxref\n' + x + '\n%%EOF';
};
export const wrapTxt = (t, n) => { const out = []; let line = ''; String(t).split(' ').forEach(w => { if ((line + ' ' + w).trim().length > n) { out.push(line.trim()); line = w; } else line += ' ' + w; }); if (line.trim()) out.push(line.trim()); return out; };
export const RV_LABELS = ['', 'Malo', 'Regular', 'Bueno', 'Muy bueno', '¡Excelente!'];
export const RV_TAGS = ['Puntualidad', 'Trato cariñoso', 'Limpieza', 'Buena comunicación', 'Envió fotos', 'Buen precio'];
export const FAQS = [
  { t:'reservas', q:'¿Cómo cancelo o cambio una reserva?', a:'Ve a Reservas, abre la reserva y elige "Cancelar" o "Cambiar fecha". Es gratis hasta 24 horas antes; después se cobra el 50%.' },
  { t:'reservas', q:'¿Qué pasa si el proveedor no llega?', a:'Te devolvemos el 100% automáticamente y te ayudamos a encontrar otro proveedor disponible en tu zona.' },
  { t:'pagos', q:'¿Cuándo se hace el cobro?', a:'Retenemos el monto al reservar y lo cobramos cuando el servicio finaliza. La boleta llega a tu correo y queda en el historial.' },
  { t:'pagos', q:'¿Cómo pido un reembolso?', a:'Desde el historial del servicio toca "Reportar un problema". Revisamos cada caso en menos de 48 horas hábiles.' },
  { t:'mascotas', q:'¿Quién ve la ficha de mi mascota?', a:'Solo los proveedores con reserva activa ven sus alergias y datos de salud, y solo mientras dura el servicio.' },
  { t:'mascotas', q:'¿Cómo actualizo sus vacunas?', a:'En el perfil de tu mascota, pestaña Salud, toca "Subir carnet". Leemos la foto y actualizamos las fechas.' },
  { t:'cuenta', q:'¿Cómo cambio mi correo o contraseña?', a:'En Perfil, toca tu nombre y luego "Datos de la cuenta". Te enviaremos un código para confirmar el cambio.' },
];
export const HELP_TOPICS = [['all','Todas'],['reservas','Reservas'],['pagos','Pagos'],['mascotas','Mascotas'],['cuenta','Cuenta']];
export const PROMOS = ['Las mejores ofertas del mes','20% en tu primer baño','Paseos con GPS en vivo'];
export const TABS = [
  ['home','Inicio','M34.75 48.25L43 41.8334L51.25 48.25V58.3334C51.25 58.8196 51.0568 59.2859 50.713 59.6297C50.3692 59.9736 49.9029 60.1667 49.4167 60.1667H36.5833C36.0971 60.1667 35.6308 59.9736 35.287 59.6297C34.9432 59.2859 34.75 58.8196 34.75 58.3334V48.25Z M40.25 60.1667V51H45.75V60.1667'],
  ['explore','Explorar','M118.083 57.4167C122.133 57.4167 125.417 54.1334 125.417 50.0833C125.417 46.0332 122.133 42.75 118.083 42.75C114.033 42.75 110.75 46.0332 110.75 50.0833C110.75 54.1334 114.033 57.4167 118.083 57.4167Z M127.25 59.25L123.262 55.2625'],
  ['reservations','Reservas','M8.24884 16.5023H4.58065C3.5677 16.5023 2.74655 15.6811 2.74655 14.6682V5.49767C2.74655 4.48473 3.5677 3.66357 4.58065 3.66357H15.5852C16.5982 3.66357 17.4193 4.48473 17.4193 5.49767V10.0829 M17.4193 8.24881H2.74655 M6.87327 2.28809V5.03923 M13.2926 2.28809V5.03923 M14.6682 15.5852V15.5852C16.1876 15.5852 17.4193 16.8169 17.4193 18.3364V18.3364C17.4193 18.8428 17.0088 19.2534 16.5023 19.2534H12.8341C12.3276 19.2534 11.917 18.8428 11.917 18.3364V18.3364C11.917 16.8169 13.1488 15.5852 14.6682 15.5852Z M11.917 13.5219C11.7906 13.5224 11.6884 13.6252 11.6887 13.7517C11.689 13.8782 11.7918 13.9806 11.9183 13.9804C12.0448 13.9802 12.1472 13.8776 12.1472 13.7511C12.1475 13.6901 12.1233 13.6315 12.08 13.5884C12.0368 13.5453 11.9781 13.5214 11.917 13.5219 M17.4193 13.5219C17.2928 13.5224 17.1907 13.6252 17.191 13.7517C17.1913 13.8782 17.2941 13.9806 17.4206 13.9804C17.5471 13.9802 17.6495 13.8776 17.6495 13.7511C17.6498 13.6901 17.6256 13.6315 17.5823 13.5884C17.5391 13.5453 17.4804 13.5214 17.4193 13.5219 M14.6682 12.6049C14.5417 12.6054 14.4395 12.7083 14.4398 12.8347C14.4402 12.9612 14.5429 13.0636 14.6694 13.0634C14.7959 13.0632 14.8984 12.9606 14.8984 12.8341C14.8986 12.7731 14.8744 12.7145 14.8312 12.6714C14.7879 12.6284 14.7292 12.6044 14.6682 12.6049'],
  ['messages','Mensajes','M279.25 53.75C279.25 54.2362 279.057 54.7025 278.713 55.0464C278.369 55.3902 277.903 55.5833 277.417 55.5833H266.417L262.75 59.25V44.5833C262.75 44.0971 262.943 43.6308 263.287 43.287C263.631 42.9432 264.097 42.75 264.583 42.75H277.417C277.903 42.75 278.369 42.9432 278.713 43.287C279.057 43.6308 279.25 44.0971 279.25 44.5833V53.75Z'],
  ['profile','Perfil','M354.333 59.25V57.4167C354.333 56.4442 353.947 55.5116 353.259 54.8239C352.572 54.1363 351.639 53.75 350.667 53.75H343.333C342.361 53.75 341.428 54.1363 340.741 54.8239C340.053 55.5116 339.667 56.4442 339.667 57.4167V59.25 M347 50.0833C349.025 50.0833 350.667 48.4417 350.667 46.4167C350.667 44.3916 349.025 42.75 347 42.75C344.975 42.75 343.333 44.3916 343.333 46.4167C343.333 48.4417 344.975 50.0833 347 50.0833Z'],
];
export const PAW = 'M14.6682 15.5852V15.5852C16.1876 15.5852 17.4193 16.8169 17.4193 18.3364V18.3364C17.4193 18.8428 17.0088 19.2534 16.5023 19.2534H12.8341C12.3276 19.2534 11.917 18.8428 11.917 18.3364V18.3364C11.917 16.8169 13.1488 15.5852 14.6682 15.5852Z M11.917 13.5219C11.7906 13.5224 11.6884 13.6252 11.6887 13.7517C11.689 13.8782 11.7918 13.9806 11.9183 13.9804C12.0448 13.9802 12.1472 13.8776 12.1472 13.7511C12.1475 13.6901 12.1233 13.6315 12.08 13.5884C12.0368 13.5453 11.9781 13.5214 11.917 13.5219 M17.4193 13.5219C17.2928 13.5224 17.1907 13.6252 17.191 13.7517C17.1913 13.8782 17.2941 13.9806 17.4206 13.9804C17.5471 13.9802 17.6495 13.8776 17.6495 13.7511C17.6498 13.6901 17.6256 13.6315 17.5823 13.5884C17.5391 13.5453 17.4804 13.5214 17.4193 13.5219 M14.6682 12.6049C14.5417 12.6054 14.4395 12.7083 14.4398 12.8347C14.4402 12.9612 14.5429 13.0636 14.6694 13.0634C14.7959 13.0632 14.8984 12.9606 14.8984 12.8341C14.8986 12.7731 14.8744 12.7145 14.8312 12.6714C14.7879 12.6284 14.7292 12.6044 14.6682 12.6049';
export const PAW_T = {"explore":"translate(2.6 -6.2)","messages":"translate(3 -11.1)"};
export const ONB = [
  { photoA:'https://images.unsplash.com/photo-1546975490-e8b92a360b24?w=480&q=80', photoB:'https://images.unsplash.com/photo-1561037404-61cd46aa615b?w=480&q=80', title:'Encuentra los mejores servicios', body:'Hoteles, paseos, baños y veterinarios verificados cerca de ti.' },
  { photoA:'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=480&q=80', photoB:'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=480&q=80', title:'Reserva en segundos', body:'Agenda y paga directo en la app. Sin llamadas, sin esperas, sin complicaciones.' },
  { photoA:'https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?w=480&q=80', photoB:'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=480&q=80', title:'Carnet digital de mascotas', body:'Mantén actualizado el historial médico de tu mascota, sus vacunas, reservas y toda su información importante en un solo lugar.' },
  { photoA:'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=480&q=80', photoB:'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=480&q=80', title:'Pet IA tu asistente', body:'Botón de emergencia siempre disponible, con IA que evalúa síntomas y te orienta rápidamente al especialista adecuado.' },
];
export const MAIN = ['home','explore','reservations','messages','profile'];
export const fmt = n => '$' + Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
export const DEF_PHOTO = { Perro:'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=400&q=80', Gato:'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&q=80', Otro:'https://images.unsplash.com/photo-1425082661705-1834bfd09dca?w=400&q=80' };
export const DOW = ['dom','lun','mar','mié','jue','vie','sáb'];
export const MON = ['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic'];
export const dayAt = i => { const d = new Date(); d.setDate(d.getDate() + i); return d; };
export const hhmm = d => String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0');
export const minAgo = m => new Date(Date.now() - m * 60000);
export const REGIONS = [
  { id:'rm', name:'Región Metropolitana', comunas:['Providencia','Las Condes','Vitacura','Ñuñoa','Santiago','La Reina','Lo Barnechea'] },
  { id:'v', name:'Valparaíso', comunas:['Viña del Mar','Valparaíso','Concón','Quilpué'] },
  { id:'viii', name:'Biobío', comunas:['Concepción','Talcahuano','San Pedro de la Paz'] },
  { id:'iv', name:'Coquimbo', comunas:['La Serena','Coquimbo'] },
  { id:'x', name:'Los Lagos', comunas:['Puerto Montt','Puerto Varas','Osorno'] },
  { id:'ii', name:'Antofagasta', comunas:['Antofagasta','Calama'] },
];
// Demo: fuera de RM, los proveedores se reparten entre las comunas de la región (menos en regiones chicas)
export const placeOf = (p, i, reg) => reg.id === 'rm' ? p.comuna : reg.comunas[i % reg.comunas.length];
export const inRegion = (i, reg) => reg.id === 'rm' || i < Math.max(2, reg.comunas.length + 1);
export const LIVE_FLOWS = {
  grooming: { staff:'Camila', role:'Groomer', pay:'Baño y corte', visit:'Baño y corte de uñas', stages: [
    { label:'Check-in', head: n => n + ' llegó a PetSpa', ev: n => ['Check-in realizado', n + ' llegó tranquilo y ya está con Camila, su groomer.'] },
    { label:'Baño', head: n => n + ' está en el baño', ev: n => ['Comenzó el baño', 'Shampoo hipoalergénico y sin fragancias, según su ficha.'], photo:'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=700&q=80' },
    { label:'Corte y secado', head: n => 'Secando y cortando a ' + n, ev: n => ['Corte de uñas y secado', 'Todo en orden. Piel y pelaje sanos.'], photo:'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=700&q=80' },
    { label:'Listo', head: n => '¡' + n + ' está listo!', ev: n => ['Listo para retiro', 'Puedes pasar a buscarlo cuando quieras. Te esperamos en Av. Vitacura 3520.'] },
    { label:'Finalizado', head: n => 'Servicio finalizado', ev: (n, pv) => ['Servicio finalizado', pv + ' actualizó la ficha de ' + n + ' y cerró el pago.'] },
  ], record: [['Servicio','Baño hipoalergénico + uñas'],['Observación','Leve cera en oído izquierdo. Sugerimos limpieza semanal.'],['Próximo baño','En 4 semanas']] },
  vet: { staff:'Dr. Rojas', role:'Veterinario', pay:'Consulta general', visit:'Consulta general', stages: [
    { label:'Recepción', head: n => n + ' está en recepción', ev: n => ['Check-in en recepción', n + ' fue registrado y pasó a sala de espera.'] },
    { label:'Consulta', head: n => n + ' está en consulta', ev: n => ['Comenzó la consulta', 'Revisión física completa: corazón, oídos, piel y dentadura.'] },
    { label:'Tratamiento', head: n => 'Aplicando tratamiento a ' + n, ev: n => ['Tratamiento aplicado', 'Se aplicaron las indicaciones del médico y quedaron registradas en su ficha.'] },
    { label:'Alta', head: n => '¡' + n + ' fue dado de alta!', ev: n => ['Alta médica', 'Puede volver a casa. Te enviamos las indicaciones por este chat.'] },
    { label:'Finalizado', head: n => 'Consulta finalizada', ev: (n, pv) => ['Servicio finalizado', pv + ' actualizó la ficha clínica de ' + n + ' y cerró el pago.'] },
  ], record: [['Servicio','Consulta general + control de peso'],['Observación','Buen estado general. Mantener dieta y ejercicio diario.'],['Próximo control','En 6 meses']] },
  walk: { staff:'Tomás', role:'Paseador', pay:'Paseo 60 min', visit:'Paseo de 60 min', stages: [
    { label:'Retiro', head: n => 'Tomás retiró a ' + n, ev: n => ['Retiro en domicilio', 'Tomás pasó a buscar a ' + n + ' y comenzó el paseo.'] },
    { label:'Paseo', head: n => n + ' está paseando', ev: n => ['Paseo en curso', 'Recorrido por el parque con GPS activo. Mucha energía hoy.'] },
    { label:'Hidratación', head: n => n + ' está descansando', ev: n => ['Pausa e hidratación', 'Descanso a la sombra con agua fresca.'] },
    { label:'Entrega', head: n => '¡' + n + ' está de vuelta!', ev: n => ['Entregado en casa', n + ' llegó feliz y cansado.'] },
    { label:'Finalizado', head: n => 'Paseo finalizado', ev: (n, pv) => ['Servicio finalizado', pv + ' registró el paseo en la ficha de ' + n + ' y cerró el pago.'] },
  ], record: [['Servicio','Paseo de 60 min · 4,2 km'],['Observación','Muy sociable con otros perros. Tira un poco de la correa al inicio.'],['Próximo paseo','Sugerido en 2 días']] },
  hotel: { staff:'Valentina', role:'Cuidadora', pay:'Estadía', visit:'Estadía en hotel', stages: [
    { label:'Check-in', head: n => n + ' llegó al hotel', ev: n => ['Check-in realizado', n + ' recorrió su habitación y conoció a Valentina.'] },
    { label:'Juego', head: n => n + ' está jugando', ev: n => ['Tiempo de juego', 'Jugó en el patio con otros huéspedes de su tamaño.'] },
    { label:'Descanso', head: n => n + ' está descansando', ev: n => ['Comida y descanso', 'Comió todo su alimento y durmió tranquilo.'] },
    { label:'Check-out', head: n => '¡' + n + ' está listo para volver!', ev: n => ['Listo para check-out', 'Puedes pasar a buscarlo cuando quieras.'] },
    { label:'Finalizado', head: n => 'Estadía finalizada', ev: (n, pv) => ['Servicio finalizado', pv + ' actualizó la ficha de ' + n + ' y cerró el pago.'] },
  ], record: [['Servicio','Estadía + paseos diarios'],['Observación','Se adaptó muy bien. Comió y durmió con normalidad.'],['Recomendación','Traer su manta para la próxima estadía']] },
};
LIVE_FLOWS.boarding = { ...LIVE_FLOWS.hotel, pay:'Guardería', visit:'Día de guardería' };
export const flowOf = pid => LIVE_FLOWS[(PROVIDERS.find(x => x.id === pid) || {}).service] || LIVE_FLOWS.grooming;
export const LIVE_STAGES = LIVE_FLOWS.grooming.stages;
export const LIVE_START = minAgo(26);
export const AI_HELLO = { role:'ai', text:'Hola, soy PetAI. Estoy entrenado por veterinarios para orientarte sobre la salud de tu mascota. Cuéntame qué está pasando.' };
