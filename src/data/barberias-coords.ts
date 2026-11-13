export interface BarberCoords {
  lat: number;
  lng: number;
}

export interface LocationPreset {
  slug: string;
  label: string;
  citySlug: string;
  lat: number;
  lng: number;
}

// Coordenadas geográficas verificadas por dirección para las 112 barberías del Perú
export const BARBERIA_COORDS: Record<number, BarberCoords> = {
  1: { lat: -12.120828, lng: -77.026684 }, // Royalty Barbershop — Miraflores (Miraflores, Lima)
  2: { lat: -12.116817, lng: -77.04227 }, // Il Capo Barbería — Miraflores (Miraflores, Lima)
  3: { lat: -12.124567, lng: -77.029868 }, // Valentino For Men — Miraflores (Miraflores, Lima)
  4: { lat: -12.123006, lng: -77.028476 }, // Carppone Barber Shop — Shell Miraflores (Miraflores, Lima)
  5: { lat: -12.094712, lng: -77.038203 }, // Royalty Barbershop — San Isidro (San Isidro, Lima)
  6: { lat: -12.113573, lng: -76.991641 }, // Protos Barber Shop — Chacarilla Surco (Santiago de Surco, Lima)
  7: { lat: -12.094355, lng: -77.007292 }, // Il Capo Barbería — San Borja (San Borja, Lima)
  8: { lat: -12.140188, lng: -77.022163 }, // Valentino For Men — Barranco (Barranco, Lima)
  9: { lat: -12.123209, lng: -77.027371 }, // Barber House — Miraflores (Miraflores, Lima)
  10: { lat: -12.130403, lng: -77.008511 }, // Las Q’Barbas Barber Shop — Surco (Santiago de Surco, Lima)
  11: { lat: -12.133533, lng: -77.017974 }, // Cuppers 65 Barber Shop — Miraflores (Miraflores, Lima)
  12: { lat: -12.115411, lng: -77.044824 }, // Carppone Barber Shop — Santa Cruz Miraflores (Miraflores, Lima)
  13: { lat: -12.126679, lng: -76.981963 }, // Fole Barber Shop — Caminos del Inca Surco (Santiago de Surco, Lima)
  14: { lat: -12.129924, lng: -76.984355 }, // Imagen & Estilo Barbería — Surco (Santiago de Surco, Lima)
  15: { lat: -12.117191, lng: -77.03887 }, // Amo Salón & Barber — Miraflores (Miraflores, Lima)
  16: { lat: -12.164372, lng: -76.993658 }, // Suka Salón & Barber — Surco (Santiago de Surco, Lima)
  17: { lat: -12.120383, lng: -77.00172 }, // Il Capo Barbería — Surquillo (Surquillo, Lima)
  18: { lat: -12.085362, lng: -77.03539 }, // Blade Salón & Barber — Lince (Lince, Lima)
  19: { lat: -12.088978, lng: -77.02094 }, // Marco Aldany — Plaza Santa Catalina (La Victoria, Lima)
  20: { lat: -12.081632, lng: -77.016864 }, // Royalty Barbershop — Santa Catalina (La Victoria, Lima)
  21: { lat: -12.059118, lng: -76.945372 }, // Barbería Valhalla — Ate (Ate, Lima)
  22: { lat: -11.937863, lng: -77.067734 }, // Montalvo For Men — Mallplaza Comas (Comas, Lima)
  23: { lat: -12.041906, lng: -77.028986 }, // Scissor's Barbería & Salón — Rímac (Rímac, Lima)
  24: { lat: -12.061712, lng: -77.097928 }, // Montalvo For Men — Bellavista Callao (Bellavista, Callao)
  25: { lat: -16.389325, lng: -71.549452 }, // Barberink — Real Plaza Arequipa (Cayma, Arequipa)
  26: { lat: -16.400308, lng: -71.545234 }, // Black Barber Shop — Umacollo Arequipa (Umacollo / Yanahuara, Arequipa)
  27: { lat: -16.39889, lng: -71.535 }, // Barberink — Parque Lambramani Arequipa (José Luis Bustamante y Rivero, Arequipa)
  28: { lat: -16.406801, lng: -71.539198 }, // Spartan VIP Barber Shop — Cercado Arequipa (Cercado de Arequipa, Arequipa)
  29: { lat: -16.373988, lng: -71.559133 }, // Barberink — Arequipa Center Cerro Colorado (Cerro Colorado, Arequipa)
  30: { lat: -16.413539, lng: -71.514051 }, // Bless Salón Studio & Barber — Paucarpata (Paucarpata, Arequipa)
  31: { lat: -16.42979, lng: -71.51289 }, // Tijeras y Estilo Vintage — Paucarpata (Paucarpata, Arequipa)
  32: { lat: -8.12127, lng: -79.035833 }, // Montalvo Salon & Barber — La Merced Trujillo (Víctor Larco / La Merced, Trujillo)
  33: { lat: -8.131845, lng: -79.043465 }, // Xclusive Barber & Salon — Víctor Larco Trujillo (Víctor Larco Herrera, Trujillo)
  34: { lat: -13.525858, lng: -71.951712 }, // The VIP Barber Shop — Santa Mónica Cusco (Wanchaq / Santa Mónica, Cusco)
  35: { lat: -13.518826, lng: -71.978601 }, // Piero Barber Shop — Centro Histórico Cusco (Centro Histórico, Cusco)
  36: { lat: -13.53814, lng: -71.900282 }, // Piero Barber Shop — Larapa Cusco (San Jerónimo / Larapa, Cusco)
  37: { lat: -12.050398, lng: -75.201657 }, // Montalvo Salon & Barber — San Carlos Huancayo (San Carlos / Huancayo, Huancayo)
  38: { lat: -12.071855, lng: -75.208301 }, // D'Pasarella Salón & Barbería — Calle Real Huancayo (Cercado de Huancayo, Huancayo)
  39: { lat: -7.157082, lng: -78.517512 }, // Boyka Barber Shop — Plaza de Armas Cajamarca (Centro Histórico, Cajamarca)
  40: { lat: -7.165488, lng: -78.465372 }, // Patty Salón Spa & Barbería — Baños del Inca Cajamarca (Baños del Inca, Cajamarca)
  41: { lat: -9.523644, lng: -77.526034 }, // Montalvo Salon & Barber — Huaraz (Cercado de Huaraz, Huaraz)
  42: { lat: -12.130541, lng: -77.020448 }, // Hudson The Barbershop — Miraflores (Miraflores, Lima)
  43: { lat: -12.097077, lng: -77.035606 }, // The Barber Company — Conquistadores San Isidro (San Isidro, Lima)
  44: { lat: -12.115213, lng: -76.990924 }, // El Turco Stockroom & Barbers — Chacarilla Surco (Santiago de Surco, Lima)
  45: { lat: -12.101381, lng: -76.970924 }, // El Turco Stockroom & Barbers — El Polo Surco (Santiago de Surco, Lima)
  46: { lat: -12.139841, lng: -77.023397 }, // El Turco Stockroom & Barbers — Barranco (Barranco, Lima)
  47: { lat: -12.122597, lng: -77.031063 }, // The Barber Company — Porta Miraflores (Miraflores, Lima)
  48: { lat: -12.106449, lng: -76.967298 }, // The Barber Company — Primavera Surco (Santiago de Surco, Lima)
  49: { lat: -12.102478, lng: -77.037509 }, // Selective Barber Studio — San Isidro (San Isidro, Lima)
  50: { lat: -12.106577, lng: -77.04037 }, // Lord Barber Shop — Miguel Dasso San Isidro (San Isidro, Lima)
  51: { lat: -12.145547, lng: -77.020281 }, // Barber by Amado — Barranco (Barranco, Lima)
  52: { lat: -12.192601, lng: -77.007965 }, // Barber by Amado — Alameda Sur Chorrillos (Chorrillos, Lima)
  53: { lat: -12.197381, lng: -76.981225 }, // Wencho Barberstudio — Chorrillos (Chorrillos, Lima)
  54: { lat: -12.174582, lng: -77.013632 }, // Barbería Bastardos — Paseo de la República Chorrillos (Chorrillos, Lima)
  55: { lat: -12.097302, lng: -77.071238 }, // Barone Barbería Premium — Magdalena del Mar (Magdalena del Mar, Lima)
  56: { lat: -12.090148, lng: -77.07221 }, // Markus Barbería — Magdalena del Mar (Magdalena del Mar, Lima)
  57: { lat: -12.077677, lng: -77.064918 }, // Markus Barbería — Pueblo Libre (Pueblo Libre, Lima)
  58: { lat: -12.088018, lng: -77.06437 }, // Sharp Studio Barber — Magdalena del Mar (Magdalena del Mar, Lima)
  59: { lat: -12.072511, lng: -77.049992 }, // Lima Barber Club — Jesús María (Jesús María, Lima)
  60: { lat: -12.074857, lng: -77.050474 }, // Barbería Perú Style — Arnaldo Márquez Jesús María (Jesús María, Lima)
  61: { lat: -12.077632, lng: -77.086934 }, // Sego Barbería — San Miguel (San Miguel, Lima)
  62: { lat: -12.07903, lng: -77.08142 }, // The Barber Company — San Miguel (San Miguel, Lima)
  63: { lat: -12.090561, lng: -76.950919 }, // Montalvo For Men — Raúl Ferrero La Molina (La Molina, Lima)
  64: { lat: -12.073592, lng: -76.95168 }, // The Barber Company — La Fontana La Molina (La Molina, Lima)
  65: { lat: -11.98851, lng: -77.071906 }, // Legend Barber — Las Palmeras Los Olivos (Los Olivos, Lima)
  66: { lat: -11.991596, lng: -77.072716 }, // Becker Barbershop — Carlos Izaguirre Los Olivos (Los Olivos, Lima)
  67: { lat: -12.024488, lng: -76.995003 }, // Barbería Skills — Zárate San Juan de Lurigancho (San Juan de Lurigancho, Lima)
  68: { lat: -11.995705, lng: -77.009809 }, // Gentlemen Barber Studio — San Juan de Lurigancho (San Juan de Lurigancho, Lima)
  69: { lat: -11.983955, lng: -77.006321 }, // Fabela For Men — San Juan de Lurigancho (San Juan de Lurigancho, Lima)
  70: { lat: -11.936343, lng: -77.048193 }, // Imperio Barber Studio — Comas (Comas, Lima)
  71: { lat: -11.934547, lng: -77.055907 }, // Ysaac Urban Barbershop — Universitaria Comas (Comas, Lima)
  72: { lat: -12.120342, lng: -77.02735 }, // Fígaro Barber Shop — Calle Esperanza Miraflores (Miraflores, Lima)
  73: { lat: -12.118933, lng: -77.035109 }, // Mustache Barber Club — José Pardo Miraflores (Miraflores, Lima)
  74: { lat: -12.094773, lng: -77.026335 }, // Sir Winston Barber Studio — Rivera Navarrete San Isidro (San Isidro, Lima)
  75: { lat: -12.101362, lng: -77.002541 }, // Bravo Men's Barber — San Borja Sur (San Borja, Lima)
  76: { lat: -12.086253, lng: -77.003705 }, // The Barber Company — Aviación San Borja (San Borja, Lima)
  77: { lat: -12.087225, lng: -77.033058 }, // Luian Studio Barber — Petit Thouars Lince (Lince, Lima)
  78: { lat: -12.086645, lng: -77.041621 }, // The Barber Company — Julio C. Tello Lince (Lince, Lima)
  79: { lat: -12.112844, lng: -77.014895 }, // Gentlemen Barber Shop — Angamos Surquillo (Surquillo, Lima)
  80: { lat: -11.992922, lng: -77.063388 }, // Norte King Barber Studio — Independencia (Independencia, Lima)
  81: { lat: -12.031892, lng: -77.067889 }, // San Martín Barber Lounge — San Martín de Porres (San Martín de Porres, Lima)
  82: { lat: -12.051309, lng: -76.965556 }, // Santa Anita VIP Barber — Óvalo Santa Anita (Santa Anita, Lima)
  83: { lat: -12.048653, lng: -77.029641 }, // Centro Histórico Barber Club — Cercado de Lima (Cercado de Lima, Lima)
  84: { lat: -12.068913, lng: -77.121303 }, // Garage Barber MJ — La Perla Callao (La Perla, Callao)
  85: { lat: -16.390128, lng: -71.545875 }, // Invictus Barbería VIP — Yanahuara Arequipa (Yanahuara, Arequipa)
  86: { lat: -16.376853, lng: -71.560844 }, // Mensside Barber Studio — Cerro Colorado Arequipa (Cerro Colorado, Arequipa)
  87: { lat: -8.125497, lng: -79.036686 }, // Kaleta Barbershop — América Sur Trujillo (Cercado / UPAO, Trujillo)
  88: { lat: -8.117448, lng: -79.034971 }, // D’Trujillo Barber Shop — San Andrés Trujillo (Urb. San Andrés, Trujillo)
  89: { lat: -8.077048, lng: -78.999104 }, // R&B Barbershop — Sánchez Carrión Trujillo (Trujillo, Trujillo)
  90: { lat: -8.139889, lng: -79.031336 }, // El Golf Classic Barber — Víctor Larco Trujillo (El Golf / Víctor Larco, Trujillo)
  91: { lat: -13.518603, lng: -71.981275 }, // Elite Barber Shop — Plaza San Francisco Cusco (Centro Histórico, Cusco)
  92: { lat: -13.545274, lng: -71.885272 }, // Barberos Montalván For Men — Larapa Cusco (San Jerónimo / Larapa, Cusco)
  93: { lat: -13.516084, lng: -71.979983 }, // Relp Barber Studio Exclusive — Centro Cusco (Centro Histórico, Cusco)
  94: { lat: -5.187528, lng: -80.650316 }, // Elite Barber Studio — Enrique Palacios Piura (Cercado de Piura, Piura)
  95: { lat: -5.205145, lng: -80.621762 }, // Fad3 Barber Shop — Av. Grau Piura (Cercado de Piura, Piura)
  96: { lat: -5.182258, lng: -80.57765 }, // Miraflores Club Barber — Castilla Piura (Castilla / Urb. Miraflores, Piura)
  97: { lat: -5.18191, lng: -80.643619 }, // Don Ignacio Barber Lounge — Los Ejidos Piura (Piura Norte, Piura)
  98: { lat: -6.773189, lng: -79.841272 }, // Mi Jai Barbería — Manuel María Izaga Chiclayo (Cercado de Chiclayo, Chiclayo)
  99: { lat: -6.776879, lng: -79.845925 }, // Golden Barber's — Las Américas Chiclayo (Chiclayo, Chiclayo)
  100: { lat: -6.78487, lng: -79.84386 }, // Santa Victoria Barber Lounge — Chiclayo (Urb. Santa Victoria, Chiclayo)
  101: { lat: -12.065897, lng: -75.229488 }, // Estilo Bárbaro Barber Suite — El Tambo Huancayo (El Tambo, Huancayo)
  102: { lat: -12.067818, lng: -75.2147 }, // Sunkha Barbería Spa — Huancayo (Cercado de Huancayo, Huancayo)
  103: { lat: -14.069997, lng: -75.725281 }, // Bárbaros Barbershop — Divino Maestro Ica (Urb. Divino Maestro, Ica)
  104: { lat: -14.062089, lng: -75.731404 }, // Big Look Barber Shop — Calle San Juan Ica (Cercado de Ica, Ica)
  105: { lat: -18.012741, lng: -70.250471 }, // Famosos Barbería — 28 de Julio Tacna (Cercado de Tacna, Tacna)
  106: { lat: -18.013728, lng: -70.24948 }, // Area 51 Barber Shop — Calle Bolívar Tacna (Cercado de Tacna, Tacna)
  107: { lat: -9.07345, lng: -78.595536 }, // Lima 7 Barbershop — Leoncio Prado Chimbote (Cercado de Chimbote, Chimbote)
  108: { lat: -9.05196, lng: -78.584319 }, // Olimpo Barber Studio — Manco Cápac Chimbote (Chimbote, Chimbote)
  109: { lat: -3.752388, lng: -73.256748 }, // Barbashapa Barbería — 2 de Mayo Iquitos (Cercado de Iquitos, Iquitos)
  110: { lat: -3.751982, lng: -73.246564 }, // El Conde Barber Shop — Calle Arica Iquitos (Plaza de Armas / Iquitos, Iquitos)
  111: { lat: -8.382877, lng: -74.536195 }, // Ivanoff Barber Company — Salaverry Pucallpa (Callería / Pucallpa, Pucallpa)
  112: { lat: -8.386408, lng: -74.549055 }, // Sparta Barber's & Spa — Av. Unión Pucallpa (Pucallpa, Pucallpa)
};

export const QUICK_LOCATION_PRESETS: LocationPreset[] = [
  { slug: "miraflores", label: "Miraflores, Lima", citySlug: "lima", lat: -12.122248, lng: -77.030859 },
  { slug: "san-isidro", label: "San Isidro, Lima", citySlug: "lima", lat: -12.099123, lng: -77.035605 },
  { slug: "santiago-de-surco", label: "Surco, Lima", citySlug: "lima", lat: -12.123499, lng: -76.986159 },
  { slug: "san-borja", label: "San Borja, Lima", citySlug: "lima", lat: -12.09399, lng: -77.004513 },
  { slug: "barranco", label: "Barranco, Lima", citySlug: "lima", lat: -12.141859, lng: -77.021947 },
  { slug: "surquillo", label: "Surquillo, Lima", citySlug: "lima", lat: -12.116613, lng: -77.008308 },
  { slug: "lince", label: "Lince, Lima", citySlug: "lima", lat: -12.086411, lng: -77.03669 },
  { slug: "jesus-maria", label: "Jesús María, Lima", citySlug: "lima", lat: -12.073684, lng: -77.050233 },
  { slug: "magdalena-del-mar", label: "Magdalena, Lima", citySlug: "lima", lat: -12.091823, lng: -77.069273 },
  { slug: "la-molina", label: "La Molina, Lima", citySlug: "lima", lat: -12.082076, lng: -76.9513 },
  { slug: "san-miguel", label: "San Miguel, Lima", citySlug: "lima", lat: -12.078331, lng: -77.084177 },
  { slug: "chorrillos", label: "Chorrillos, Lima", citySlug: "lima", lat: -12.188188, lng: -77.000941 },
  { slug: "los-olivos", label: "Los Olivos, Lima", citySlug: "lima", lat: -11.990053, lng: -77.072311 },
  { slug: "san-juan-de-lurigancho", label: "S.J.L., Lima", citySlug: "lima", lat: -12.001383, lng: -77.003711 },
  { slug: "comas", label: "Comas, Lima", citySlug: "lima", lat: -11.936251, lng: -77.057278 },
  { slug: "ate", label: "Ate, Lima", citySlug: "lima", lat: -12.059118, lng: -76.945372 },
  { slug: "cercado-de-lima", label: "Lima Centro", citySlug: "lima", lat: -12.048653, lng: -77.029641 },
  { slug: "callao", label: "Callao", citySlug: "callao", lat: -12.065313, lng: -77.109615 },
  { slug: "arequipa", label: "Arequipa", citySlug: "arequipa", lat: -16.397736, lng: -71.540186 },
  { slug: "trujillo", label: "Trujillo", citySlug: "trujillo", lat: -8.118833, lng: -79.030232 },
  { slug: "cusco", label: "Cusco", citySlug: "cusco", lat: -13.527131, lng: -71.946187 },
  { slug: "huancayo", label: "Huancayo", citySlug: "huancayo", lat: -12.063992, lng: -75.213537 },
  { slug: "piura", label: "Piura", citySlug: "piura", lat: -5.18921, lng: -80.623337 },
  { slug: "chiclayo", label: "Chiclayo", citySlug: "chiclayo", lat: -6.778313, lng: -79.843686 },
  { slug: "cajamarca", label: "Cajamarca", citySlug: "cajamarca", lat: -7.161285, lng: -78.491442 },
  { slug: "ica", label: "Ica", citySlug: "ica", lat: -14.066043, lng: -75.728342 },
  { slug: "tacna", label: "Tacna", citySlug: "tacna", lat: -18.013234, lng: -70.249976 },
  { slug: "chimbote", label: "Chimbote", citySlug: "chimbote", lat: -9.062705, lng: -78.589927 },
  { slug: "iquitos", label: "Iquitos", citySlug: "iquitos", lat: -3.752185, lng: -73.251656 },
  { slug: "pucallpa", label: "Pucallpa", citySlug: "pucallpa", lat: -8.384642, lng: -74.542625 },
  { slug: "huaraz", label: "Huaraz", citySlug: "huaraz", lat: -9.523644, lng: -77.526034 },
];
