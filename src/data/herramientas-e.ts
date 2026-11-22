import type { HerramientaSeed } from "./herramientas-types";

export const HERRAMIENTAS_E: HerramientaSeed[] = [
  {
    id: 86,
    slug: "motor-rotativo-vs-magnetico-vs-pivotante-barberia",
    title: "Motor Rotativo vs Magnético vs Vectorial vs Pivotante: Qué Motor Elegir en tu Máquina",
    seoTitle: "Motor Rotativo vs Magnético vs Vectorial vs Pivotante en Barbería",
    excerpt:
      "Guía de ingeniería para barberos: diferencias reales entre motores rotativos (con y sin escobillas), magnéticos lineales (10.000 RPM), vectoriales (11.500 RPM) y pivotantes.",
    cluster: "info-tecnica",
    brand: "Ingeniería de Motores",
    badgeLabel: "⚙️ Guía Técnica de Motores",
    imageUrl: "/images/blog-v3/mejores-cortapelos-maquinas-de-cortar-pelo-peru.webp",
    imageAlt: "Comparativa técnica de motores de máquinas de barbería",
    readTime: "7 min",
    publishedAt: "2026-11-22",
    updatedAt: "2026-11-22",
    amazonProductKeys: [
      "JRL_ONYX_CLIPPER",
      "STYLECRAFT_INSTINCT_CLIPPER",
      "OSTER_FAST_FEED",
    ],
    specs: [
      { label: "Motor Rotativo Brushless (6.000–8.000 RPM)", value: "Equilibrio #1 de Torque, Silencio y Vida Útil (JRL Onyx, BaBylissFX, Wahl Vapor)" },
      { label: "Motor Vectorial (11.500 RPM)", value: "Máxima Velocidad + Sensor de Torque Electrónico (StyleCraft Instinct)" },
      { label: "Motor Magnético Lineal (10.000 RPM)", value: "Alta Velocidad de Barrido para Fades en Seco (Gamma+ X-Ergo)" },
      { label: "Motor Pivotante (Baja RPM / Alto Torque)", value: "Máxima Fuerza en Cabello Mojado y Denso (Oster Fast Feed)" },
    ],
    pros: [
      "Entender el tipo de motor evita comprar una máquina rápida de poco torque si tu clientela tiene cabello muy grueso",
      "Los motores Brushless (sin escobillas de carbón) duran entre 3.000 y 5.000 horas sin perder potencia",
    ],
    cons: [
      "Los motores rotativos clásicos con escobillas de carbón van perdiendo un 10% de fuerza tras 2 años de uso intensivo",
    ],
    keyTakeaways: [
      "Velocidad (RPM) no es lo mismo que fuerza (Torque): el torque es lo que impide que la cuchilla se frene en pelo grueso.",
      "Para el 95% de barberos hoy, un motor Rotativo Brushless (como JRL Onyx o BaByliss Boost+) o Vectorial es la elección perfecta.",
    ],
    sections: [
      {
        heading: "1. Las 4 Familias de Motores en Barbería y Cuándo Brilla Cada Una",
        paragraphs: [
          "1) Motores Rotativos (DC y Brushless): Convierten el giro circular en movimiento lineal mediante una leva excéntrica. Son los más versátiles porque combinan velocidad media-alta (5.500 a 8.000 RPM) con gran fuerza de empuje para cabello seco o húmedo.\n2) Motores Vectoriales (11.500 RPM): Incorporan un microchip que lee la resistencia del cabello en tiempo real y aumenta el voltaje al instante.\n3) Motores Magnéticos Lineales (10.000 RPM): Oscilan por electroimanes a altísima velocidad, ideales para pulir fades en seco.\n4) Motores Pivotantes: Más lentos en velocidad pero con el doble de fuerza de tracción para cabello grueso o mojado.",
        ],
      },
    ],
    faqs: [
      {
        question: "¿Qué significa que un motor sea Brushless (sin escobillas)?",
        answer:
          "Significa que no utiliza carbones físicos que rocen contra el rotor; al no haber fricción interna, el motor no se desgasta, calienta menos y aprovecha un 35% mejor la batería.",
      },
    ],
  },
  {
    id: 87,
    slug: "cuchilla-plana-fade-blade-vs-cuchilla-con-surcos-taper",
    title: "Cuchilla Plana (Fade Blade) vs Cuchilla con Surcos (Taper Blade): Cuándo Usar Cada Una",
    seoTitle: "Cuchilla Plana (Fade) vs Cuchilla con Surcos (Taper) vs Faper",
    excerpt:
      "Explicación técnica de las 3 geometrías de cuchilla fija: Plana (Fade Blade), Acanalada (Taper Blade) e Híbrida (Faper). Cuál apura más y cuál cucharea mejor.",
    cluster: "info-tecnica",
    brand: "Geometría de Cuchillas",
    badgeLabel: "📐 Fade vs Taper vs Faper",
    imageUrl: "/images/blog-v3/como-calibrar-cuchillas-zero-gap-sin-cortar-piel.webp",
    imageAlt: "Detalle macro de cuchilla plana Fade frente a cuchilla con surcos Taper",
    readTime: "6 min",
    publishedAt: "2026-11-22",
    updatedAt: "2026-11-22",
    amazonProductKeys: [
      "WAHL_SENIOR_CORDLESS",
      "WAHL_SUPER_TAPER_CORDLESS",
      "STYLECRAFT_REBEL_CLIPPER",
    ],
    specs: [
      { label: "Cuchilla Plana (Fade Blade)", value: "Dorso liso y delgado · Máximo apurado al 0.0 mm (Ej: Wahl Senior #2191)" },
      { label: "Cuchilla con Surcos (Taper Blade)", value: "Dorso grueso acanalado · Cuchareo natural en 'C' (Ej: Wahl Super Taper)" },
      { label: "Cuchilla Híbrida (Faper Blade)", value: "Plana en la punta y semi-biselada en la base (Ej: StyleCraft Rebel/Instinct)" },
    ],
    pros: [
      "La cuchilla Fade plana se pega a la piel como una espátula para borrar la línea de la patillera y shaver",
      "La cuchilla Taper tiene una barriga curva que obliga a la mano a salir hacia afuera sin dejar escalones",
    ],
    cons: [
      "Con una cuchilla Fade plana debes cuidar de no apoyar la máquina a 90° para no crear una línea nueva",
    ],
    keyTakeaways: [
      "Fade Blade = piel al ras (Skin Fades comprimidos).",
      "Taper Blade = cortes clásicos, desbaste y movimiento en 'C' seguro.",
      "Faper Blade = el punto medio moderno que une ambas ventajas.",
    ],
    sections: [
      {
        heading: "1. Cómo Influye la Panza Inferior de la Cuchilla Fija en tu Degradado",
        paragraphs: [
          "Cuando miras una cuchilla por debajo (la parte que toca el cráneo del cliente), la cuchilla Taper tiene un vientre curvo pronunciado y canales longitudinales: cuando subes la máquina, esa curvatura despega sola los dientes de la piel a modo de rampa. La cuchilla Fade, por el contrario, es totalmente plana y delgada como un cuchillo, permitiéndote entrar por debajo de los pelos más cortos del Skin Fade.",
        ],
      },
    ],
    faqs: [
      {
        question: "¿La Wahl Magic Clip Cordless trae cuchilla Fade o Taper?",
        answer:
          "Trae una base plana semi-fade (#2161) combinada con la hoja móvil Stagger-Tooth de dientes escalonados, lo que le da apurado plano con difuminado automático.",
      },
    ],
  },
  {
    id: 88,
    slug: "cuchillas-ceramica-vs-acero-carbono-vs-dlc-titanio",
    title: "Cuchillas de Cerámica vs Acero al Carbono vs DLC / Titanio: Temperatura y Durabilidad",
    seoTitle: "Cuchillas Cerámica vs Acero Carbono vs DLC Titanio en Barbería",
    excerpt:
      "Metalurgia aplicada a la barbería: comparamos las hojas de cerámica de circonio, acero al carbono puro, titanio dorado y recubrimiento DLC (Diamond-Like Carbon).",
    cluster: "info-tecnica",
    brand: "Materiales de Cuchillas",
    badgeLabel: "🔬 Cerámica vs DLC vs Acero",
    imageUrl: "/images/blog-v3/como-calibrar-cuchillas-zero-gap-sin-cortar-piel.webp",
    imageAlt: "Cuchillas de barbería en cerámica blanca, DLC negro y titanio dorado",
    readTime: "6 min",
    publishedAt: "2026-11-22",
    updatedAt: "2026-11-22",
    amazonProductKeys: [
      "CERAMIC_CUTTER_BLADE_PACK",
      "BABYLISS_BOOST_PLUS_CLIPPER",
      "WAHL_REPLACEMENT_BLADE_2161",
    ],
    specs: [
      { label: "Black DLC / Grafito", value: "El mejor balance actual: frío, inoxidable e irrompible ante caídas" },
      { label: "Cerámica de Circonio", value: "La más fría (75% menos calor), pero frágil si la máquina cae al suelo" },
      { label: "Acero de Alto Carbono", value: "El filo más agresivo y económico, pero requiere aceite contra el óxido" },
    ],
    pros: [
      "El recubrimiento DLC (Carbono como Diamante) y el Grafito no se rompen si caen y mantienen la cuchilla fresca",
      "Instalar una hoja móvil de cerámica en una Wahl Magic Clip o Senior cuesta menos de $15 y elimina el sobrecalentamiento",
    ],
    cons: [
      "Nunca dejes caer una cuchilla de cerámica contra el piso porque se astilla como porcelana",
    ],
    keyTakeaways: [
      "Si tu máquina actual se calienta mucho: cámbiale solo la cuchilla pequeña móvil por una de Cerámica.",
      "Si vas a comprar una máquina nueva o un cabezal completo: busca recubrimiento Black DLC o Grafito.",
    ],
    sections: [
      {
        heading: "1. Por Qué se Calientan las Cuchillas y Cómo lo Evitan la Cerámica y el DLC",
        paragraphs: [
          "El calor en una máquina de barbería no viene del motor, sino de la fricción metal contra metal de las dos hojas de acero frotándose a 6.500 veces por minuto. Al sustituir la hoja móvil de acero por óxido de circonio cerámico (o recubrir el acero con carbono tipo diamante DLC), se rompe la transferencia térmica metal-metal y la temperatura baja hasta en un 75%.",
        ],
      },
    ],
    faqs: [
      {
        question: "¿Las cuchillas de cerámica necesitan aceite igual que las de acero?",
        answer:
          "Sí, aunque no se oxidan, siempre debes poner 3 gotas de aceite porque la cuchilla fija inferior sigue siendo de acero y necesita película lubricante.",
      },
    ],
  },
  {
    id: 89,
    slug: "como-cambiar-cuchilla-ceramica-stagger-tooth-clipper",
    title: "Cómo Instalar una Cuchilla Móvil de Cerámica en tu Clipper para que No Caliente",
    seoTitle: "Cómo Instalar una Cuchilla de Cerámica en Wahl, BaByliss o Andis",
    excerpt:
      "Tutorial paso a paso para cambiar la hoja móvil de acero por una cuchilla de cerámica Stagger-Tooth en tu Wahl Magic Clip, Senior o Super Taper sin perder la tensión.",
    cluster: "info-tecnica",
    brand: "Tutorial Upgrade Cerámica",
    badgeLabel: "🛠️ Tutorial Paso a Paso",
    imageUrl: "/images/blog-v3/como-calibrar-cuchillas-zero-gap-sin-cortar-piel.webp",
    imageAlt: "Instalación de cuchilla móvil de cerámica en máquina cortapelos",
    readTime: "6 min",
    publishedAt: "2026-11-22",
    updatedAt: "2026-11-22",
    amazonProductKeys: [
      "CERAMIC_CUTTER_BLADE_PACK",
      "WAHL_REPLACEMENT_BLADE_2161",
      "ANDIS_COOL_CARE_PLUS",
    ],
    specs: [
      { label: "Tiempo de Instalación", value: "3 minutos con un destornillador Phillips #2" },
      { label: "Piezas que se Conservan", value: "Cuchilla fija inferior original, Cam Follower (plástico guía) y resorte" },
      { label: "Pieza que se Reemplaza", value: "Únicamente la hoja pequeña móvil superior" },
    ],
    pros: [
      "Reduce drásticamente el calentamiento en la Wahl Senior y Magic Clip durante días de 15 cortes",
      "Al pesar la mitad que la hoja móvil de acero, el motor gana unas 200 RPM extra de agilidad",
    ],
    cons: [
      "No aprietes los tornillos al 100% antes de verificar de perfil que los dientes cerámicos no sobresalgan de la hoja fija",
    ],
    keyTakeaways: [
      "Truco clave: al quitar los 2 tornillos de la cuchilla fija, sostén con el pulgar el soporte plástico blanco (Cam Follower) para que no salte el resorte.",
      "Pon una gota de aceite en el riel antes de asentar la nueva hoja de cerámica.",
    ],
    sections: [
      {
        heading: "1. Los 4 Pasos para Instalar tu Cuchilla Cerámica sin que Haga Ruido",
        paragraphs: [
          "1) Con la palanca totalmente cerrada (arriba), retira los dos tornillos traseros de la cuchilla fija.\n2) Desliza fuera la hoja móvil metálica del soporte plástico blanco (Cam Follower) y encaja en esas mismas dos ranuras la nueva hoja móvil de cerámica (con el lado biselado mirando hacia la cuchilla fija).\n3) Coloca la cuchilla fija y atornilla al 80% de firmeza.\n4) Alinea el paralelismo a 0.3 mm del borde (Zero-Gap seguro), aprieta fuerte ambos tornillos y aplica 3 gotas de aceite.",
        ],
      },
    ],
    faqs: [
      {
        question: "¿Por qué mi máquina hace un ruido fuerte como matraca después de cambiar la cuchilla?",
        answer:
          "Eso ocurre cuando la hoja de cerámica no encajó hasta el fondo en los dos ganchitos laterales del plástico guía (Cam Follower) o cuando el resorte interno quedó mal asentado.",
      },
    ],
  },
  {
    id: 90,
    slug: "cuando-cambiar-lamina-y-cabezal-foil-shaver",
    title: "Cada Cuánto Cambiar la Lámina (Foil) y Cuchillas Internas de Andis ProFoil y BaByliss",
    seoTitle: "Cuándo Cambiar la Lámina y Cuchillas de tu Foil Shaver (Andis/BaByliss)",
    excerpt:
      "Señales claras de que el cabezal de tu Andis ProFoil o BaByliss FoilFX02 necesita reemplazo: micro-perforaciones, pérdida de apurado y cómo cambiarlo en 10 segundos.",
    cluster: "info-tecnica",
    brand: "Mantenimiento Foil Shavers",
    badgeLabel: "🔄 Guía Repuestos Shaver",
    imageUrl: "/images/blog-v3/afeitadora-foil-shaver-vs-cuchilla-rotativa.webp",
    imageAlt: "Cambio de cabezal de lámina de titanio y cuchillas internas en Foil Shaver",
    readTime: "6 min",
    publishedAt: "2026-11-22",
    updatedAt: "2026-11-22",
    amazonProductKeys: [
      "ANDIS_PROFOIL_REPLACEMENT_HEAD",
      "ANDIS_PROFOIL_TS2",
      "BABYLISS_FOILFX02",
    ],
    specs: [
      { label: "Frecuencia en Barbería Profesional", value: "Cada 3 a 4 meses (o inmediatamente si una malla se perfora)" },
      { label: "Frecuencia en Uso Personal", value: "Cada 12 a 18 meses" },
      { label: "Código Repuesto Andis ProFoil", value: "Andis #17155 (Cabezal completo con 2 láminas + 2 barras de corte)" },
    ],
    pros: [
      "Cambiar el conjunto completo (lámina + cuchillas internas) devuelve el 100% de la velocidad de afeitado del primer día",
      "Previene que una malla abollada o rota pellizque los poros del cuello del cliente",
    ],
    cons: [
      "Nunca limpies la malla externa de titanio golpeándola contra el lavabo ni pasándole el cepillo duro por fuera: cepilla solo las cuchillas internas",
    ],
    keyTakeaways: [
      "Peligro #1: si ves un solo agujerito o grieta en la malla dorada de tu shaver, NO la uses en un cliente porque la cuchilla interna girando a 9.000 RPM cortará la piel. Cambia el cabezal en 5 segundos.",
    ],
    sections: [
      {
        heading: "1. Por Qué Siempre Conviene Cambiar Lámina y Cuchillas Juntas (#17155)",
        paragraphs: [
          "En una Foil Shaver, las barras de corte internas y la lámina ultrafina exterior se desgastan acopladas una contra la otra. Si pones una lámina nueva sobre unas cuchillas internas viejas y melladas, tardarás el doble de pasadas en afeitar. El pack oficial Andis #17155 (y el equivalente FXRF2G de BaBylissPRO) incluye tanto el cabezal de doble lámina como el par de cuchillas nuevas listas para encajar a presión.",
        ],
      },
    ],
    faqs: [
      {
        question: "¿El repuesto Andis #17155 le sirve tanto a la ProFoil gris (TS-1) como a la negra Plus (TS-2)?",
        answer:
          "Sí, el cabezal #17155 es 100% idéntico y compatible con ambos modelos de Andis ProFoil.",
      },
    ],
  },
  {
    id: 91,
    slug: "porque-mi-maquina-de-cortar-pelo-jala-o-muerde",
    title: "Por Qué tu Máquina de Cortar Pelo Jala el Cabello o Hace Ruido Fuerte (Solución y Repuestos)",
    seoTitle: "Por Qué mi Máquina de Cortar Pelo Jala el Cabello o Hace Ruido",
    excerpt:
      "Diagnóstico rápido de taller: las 5 causas por las que una máquina de barbería tira del pelo o pierde fuerza y cómo solucionarlo hoy mismo.",
    cluster: "info-tecnica",
    brand: "Diagnóstico & Reparación",
    badgeLabel: "🔧 Solución de Fallos",
    imageUrl: "/images/blog-v3/limpieza-desinfeccion-y-aceite-cuchillas-maquina.webp",
    imageAlt: "Diagnóstico, limpieza y lubricación de cuchillas de máquina de barbería",
    readTime: "6 min",
    publishedAt: "2026-11-22",
    updatedAt: "2026-11-22",
    amazonProductKeys: [
      "ANDIS_COOL_CARE_PLUS",
      "WAHL_REPLACEMENT_BLADE_2161",
      "CERAMIC_CUTTER_BLADE_PACK",
    ],
    specs: [
      { label: "Causa #1 (70% de los casos)", value: "Colchón de pelo compacto entre las dos hojas + Falta de aceite" },
      { label: "Causa #2 (15% de los casos)", value: "Resorte de tensión vencido o Cam Follower desgastado" },
      { label: "Causa #3 (15% de los casos)", value: "Cuchilla desafilada tras +500 cortes o batería baja" },
    ],
    pros: [
      "El 85% de las máquinas que 'jalan el pelo' no tienen el motor dañado: se arreglan en 5 minutos desmontando, limpiando y aceitando o cambiando la cuchilla",
    ],
    cons: [
      "Trabajar con las cuchillas secas sin aceite frena el motor hasta en un 30% y agota la batería antes de tiempo",
    ],
    keyTakeaways: [
      "Antes de pensar que tu máquina murió: desmonta los 2 tornillos, saca la bola de pelo prensado que separa las dos hojas, pon 3 gotas de aceite y prueba.",
    ],
    sections: [
      {
        heading: "1. El 'Efecto Sándwich': Por Qué una Pelusa Interna Hace que la Máquina Mastique el Pelo",
        paragraphs: [
          "Para que una clipper corte, la hoja móvil superior debe estar presionada herméticamente contra la hoja fija inferior por la fuerza del resorte interno. Cuando se acumula una capa microscópica de pelo húmedo y grasa entre ambas hojas, las separa apenas 0.1 milímetros: en ese instante la máquina deja de cortar como tijera y empieza a pellizcar y arrancar el cabello del cliente.",
        ],
      },
    ],
    faqs: [
      {
        question: "¿Cada cuántos cortes debo aceitar mi máquina para que nunca jale?",
        answer:
          "En barbería profesional, aplica spray 5 en 1 (Andis Cool Care) después de cada cliente y 3 gotas de aceite líquido para cuchillas al inicio de la mañana y a mitad de la tarde.",
      },
    ],
  },
  {
    id: 92,
    slug: "como-reemplazar-bateria-cam-follower-y-palanca-wahl",
    title: "Guía de Repuestos Wahl: Cuándo Cambiar el Cam Follower (Seguidor), Resorte y Palanca",
    seoTitle: "Repuestos Wahl: Cómo Cambiar Cam Follower, Resorte y Palanca",
    excerpt:
      "Mantenimiento interno de Wahl Magic Clip y Senior Cordless: cómo detectar el desgaste del seguidor plástico (Cam Follower), el resorte de tensión y la palanca.",
    cluster: "info-tecnica",
    brand: "Mantenimiento Wahl Pro",
    badgeLabel: "🔩 Repuestos Internos Wahl",
    imageUrl: "/images/blog-v3/como-calibrar-cuchillas-zero-gap-sin-cortar-piel.webp",
    imageAlt: "Despiece y mantenimiento interno de cabezal Wahl Cordless",
    readTime: "6 min",
    publishedAt: "2026-11-22",
    updatedAt: "2026-11-22",
    amazonProductKeys: [
      "WAHL_REPLACEMENT_BLADE_2161",
      "WAHL_MAGIC_CLIP",
      "ANDIS_COOL_CARE_PLUS",
    ],
    specs: [
      { label: "Cam Follower (Seguidor Blanco)", value: "Pieza plástica que conecta el eje del motor con la cuchilla móvil" },
      { label: "Síntoma de Desgaste", value: "Sonido de traqueteo metálico fuerte y pérdida de recorrido de corte" },
      { label: "Tornillo de Palanca", value: "Si la palanca se baja sola al cortar, aprieta un cuarto de vuelta su tornillo lateral" },
    ],
    pros: [
      "Las máquinas Wahl están diseñadas para ser 100% reparables en 5 minutos con un simple destornillador estrella",
    ],
    cons: [
      "Pon siempre una pizca de grasa blanca en el hueco central del Cam Follower donde entra el eje excéntrico del motor",
    ],
    keyTakeaways: [
      "Si la palanca de tu Wahl se afloja y se mueve sola mientras cortas: no está rota, solo debes ajustar media vuelta el tornillo lateral de la palanca.",
    ],
    sections: [
      {
        heading: "1. El Secreto del Cam Follower y el Resorte de Tensión en las Wahl Cordless",
        paragraphs: [
          "Debajo de la cuchilla móvil de toda Wahl Magic Clip o Senior hay una pieza plástica blanca llamada Cam Follower (seguidor de leva). Con miles de horas de giro del motor, el orificio central donde entra el perno del motor toma holgura y la máquina empieza a sonar fuerte. Reemplazar esa pieza y limpiar la esponja negra guardapolvo deja tu Wahl tan silenciosa como el día que salió de la caja.",
        ],
      },
    ],
    faqs: [
      {
        question: "¿Para qué sirve la esponjita negra que viene debajo de la cuchilla en las Wahl?",
        answer:
          "Es el sello guardapolvo (hair shield): impide que los pelos cortados entren al compartimento del motor y de la placa electrónica. Nunca la retires.",
      },
    ],
  },
  {
    id: 93,
    slug: "como-usar-spray-5-en-1-enfriador-lubricante-clippers",
    title: "Cómo Usar Correctamente el Spray 5 en 1 Enfriador y Desinfectante entre Clientes",
    seoTitle: "Cómo Usar el Spray 5 en 1 (Andis Cool Care) en tus Máquinas",
    excerpt:
      "El protocolo correcto de 10 segundos para aplicar Andis Cool Care Plus sin dañar el motor ni resecar las cuchillas: ángulo de rociado, distancia y gotas de aceite.",
    cluster: "info-tecnica",
    brand: "Andis Cool Care Protocol",
    badgeLabel: "❄️ Protocolo Spray 5-en-1",
    imageUrl: "/images/blog-v3/limpieza-desinfeccion-y-aceite-cuchillas-maquina.webp",
    imageAlt: "Aplicación correcta de spray enfriador 5 en 1 sobre cuchilla de máquina encendida",
    readTime: "5 min",
    publishedAt: "2026-11-22",
    updatedAt: "2026-11-22",
    amazonProductKeys: [
      "ANDIS_COOL_CARE_PLUS",
      "BARBICIDE_DISINFECTANT_JAR",
      "WAHL_MAGIC_CLIP",
    ],
    specs: [
      { label: "Ángulo Obligatorio", value: "Máquina apuntando HACIA ABAJO (para que el líquido nunca escurra al motor)" },
      { label: "Distancia de Rociado", value: "15 cm a 20 cm con la máquina ENCENDIDA durante 2 segundos" },
      { label: "Tiempo de Contacto Sanitario", value: "Dejar actuar en húmedo sobre el metal y secar el exceso con papel" },
    ],
    pros: [
      "Baja la temperatura de una cuchilla caliente en apenas 3 segundos gracias a la descompresión del aerosol",
      "La presión del chorro barre los pelos microscópicos atrapados en los dientes",
    ],
    cons: [
      "Nunca rocíes con la máquina apuntando hacia arriba, porque el solvente bajaría hacia el motor y lavaría la grasa del eje",
    ],
    keyTakeaways: [
      "Regla de oro: Cepilla el pelo → Enciende la máquina apuntando al suelo → Rocía 2 segundos de Andis Cool Care Plus → Seca el dorso y pon 2 gotitas de aceite si hiciste más de 3 cortes.",
    ],
    sections: [
      {
        heading: "1. ¿El Spray 5 en 1 Reemplaza por Completo al Aceite en Gotas?",
        paragraphs: [
          "El spray Andis Cool Care Plus contiene un lubricante ligero antioxidante perfecto para usar entre cliente y cliente porque no engrasa el cabello del siguiente corte. Sin embargo, como también contiene alcoholes desinfectantes y gas enfriador volátil, al inicio y al final del día siempre debes complementar con 3 gotas de aceite mineral puro de cuchillas en las esquinas y el centro del diente.",
        ],
      },
    ],
    faqs: [
      {
        question: "¿Se puede aplicar Andis Cool Care Plus sobre el cabezal de una Foil Shaver?",
        answer:
          "Sí: retira la tapa, sacude el polvo interior con el cepillito y rocía una bruma corta a 20 cm sobre la malla de titanio y las cuchillas internas.",
      },
    ],
  },
  {
    id: 94,
    slug: "proporcion-mezcla-liquido-desinfectante-jarra-barberia",
    title: "Cómo Preparar la Jarra Desinfectante Azul en Barbería: Proporción de Agua e Inmersión",
    seoTitle: "Cómo Preparar la Jarra Desinfectante Azul (Barbicide) en Barbería",
    excerpt:
      "Guía exacta de dilución del concentrado azul desinfectante (16:1), tiempo correcto de inmersión de 10 minutos y qué herramientas sí y cuáles no deben sumergirse.",
    cluster: "info-tecnica",
    brand: "Higiene & Barbicide",
    badgeLabel: "🧪 Proporción Exacta 16:1",
    imageUrl: "/images/blog-v3/checklist-higiene-barberia-esterilizacion.webp",
    imageAlt: "Jarra de vidrio de barbería con solución desinfectante azul y peines sumergidos",
    readTime: "6 min",
    publishedAt: "2026-11-22",
    updatedAt: "2026-11-22",
    amazonProductKeys: [
      "BARBICIDE_DISINFECTANT_JAR",
      "ANDIS_COOL_CARE_PLUS",
      "PARKER_SRX_SHAVETTE",
    ],
    specs: [
      { label: "Proporción Estándar (16:1)", value: "60 ml (2 oz) de Concentrado Azul por cada 1 Litro (32 oz) de Agua" },
      { label: "Tiempo Exacto de Inmersión", value: "10 Minutos (Mínimo 10 min · Máximo 15 min)" },
      { label: "Frecuencia de Cambio del Líquido", value: "Todos los días al abrir la barbería (o antes si se enturbia)" },
    ],
    pros: [
      "Elimina hongos (tiña capitis), bacterias (estafilococos) y virus con costo de centavos por día",
      "Incluye inhibidores de óxido (anti-rust) cuando se respeta la proporción correcta 16:1",
    ],
    cons: [
      "Dejar peines o tijeras sumergidos durante horas o toda la noche deteriora el plástico y el tornillo de las tijeras",
    ],
    keyTakeaways: [
      "Los 3 pasos: 1) Lava primero el peine con agua y jabón para quitar cabellos y cera; 2) Sumérgelo 10 minutos en la jarra azul; 3) Sácalo con la canastilla, enjuaga y seca.",
    ],
    sections: [
      {
        heading: "1. El Error de Dejar los Peines Viviendo Toda la Semana Dentro de la Jarra",
        paragraphs: [
          "En muchas barberías se ve la jarra azul llena de peines sumergidos las 24 horas del día. Los fabricantes de Barbicide y Marvy especifican claramente que la desinfección hospitalaria total ocurre en exactamente 10 minutos: una vez cumplidos los 10 minutos, debes levantar la canastilla de acero inoxidable, retirar las herramientas, secarlas y guardarlas en tu cajón limpio o gabinete UV.",
        ],
      },
    ],
    faqs: [
      {
        question: "¿Puedo sumergir mis tijeras japonesas VG-10 en la jarra azul?",
        answer:
          "Para tijeras de alta gama con rodamientos en el tornillo es mucho mejor desinfectar las hojas con un paño con alcohol al 70% o spray y guardarlas en el esterilizador UV en seco.",
      },
    ],
  },
  {
    id: 95,
    slug: "como-limpiar-afeitadora-foil-shaver-por-dentro",
    title: "Cómo Limpiar y Desinfectar tu Foil Shaver sin Romper la Malla Ultrafina de Titanio",
    seoTitle: "Cómo Limpiar una Foil Shaver (Andis ProFoil / BaByliss) sin Dañarla",
    excerpt:
      "Aprende el método seguro de 4 pasos para limpiar diariamente el polvillo capilar de tu Andis ProFoil, BaByliss FoilFX02 o Wahl Vanish sin abollar las láminas.",
    cluster: "info-tecnica",
    brand: "Cuidado de Foil Shavers",
    badgeLabel: "🛡️ Cuidado de Láminas",
    imageUrl: "/images/blog-v3/afeitadora-foil-shaver-vs-cuchilla-rotativa.webp",
    imageAlt: "Limpieza interna de cabezal y barras de corte de una afeitadora Foil Shaver",
    readTime: "5 min",
    publishedAt: "2026-11-22",
    updatedAt: "2026-11-22",
    amazonProductKeys: [
      "ANDIS_PROFOIL_TS2",
      "ANDIS_PROFOIL_REPLACEMENT_HEAD",
      "ANDIS_COOL_CARE_PLUS",
    ],
    specs: [
      { label: "Regla #1 Prohibida", value: "NUNCA pases el cepillo duro sobre la malla dorada exterior" },
      { label: "Qué Sí se Cepilla", value: "Las 2 barras de cuchillas oscilantes internas y la cámara inferior" },
      { label: "Cómo Limpiar el Cabezal de Malla", value: "Soplar/sacudir suavemente + Rociar spray desinfectante a 20 cm" },
    ],
    pros: [
      "Duplica la vida útil de tus láminas de titanio (ahorrando decenas de dólares al año en repuestos)",
      "Evita que el polvillo de cabello acumulado frene las 9.000–11.000 RPM del motor",
    ],
    cons: [
      "Un solo golpe del cabezal de malla contra el borde de la mesa al sacudirlo puede perforar la lámina",
    ],
    keyTakeaways: [
      "La lámina de una Foil Shaver es más delgada que una hoja de papel aluminio: trátala como el cristal de un reloj.",
    ],
    sections: [
      {
        heading: "1. Paso a Paso para Limpiar tu Shaver en 30 Segundos entre Clientes",
        paragraphs: [
          "1) Presiona el botón lateral de liberación y retira hacia arriba el marco con las dos láminas.\n2) Con el cepillito de cerdas firmes incluido, barre a fondo las dos barras de cuchillas internas y el hueco del motor.\n3) NO cepilles la malla dorada: solo dale un golpecito suave con la palma de tu mano para que caiga el polvo y rocía Andis Cool Care Plus a 20 cm.\n4) Deja secar 30 segundos y vuelve a encajar el cabezal hasta escuchar el clic.",
        ],
      },
    ],
    faqs: [
      {
        question: "¿Se le pone aceite en gotas a las láminas de la Foil Shaver?",
        answer:
          "No es necesario poner aceite pesado porque haría que el polvillo de cabello se pegue como barro; el lubricante ligero que deja el spray Andis Cool Care Plus es suficiente.",
      },
    ],
  },
  {
    id: 96,
    slug: "tijeras-pulgadas-5-5-vs-6-0-vs-7-0-barberia",
    title: "Medidas de Tijeras de Barbería (5.5\", 6.0\", 6.5\" y 7.0\"): Cuál Elegir para Tijera sobre Peine",
    seoTitle: "Medidas de Tijeras de Barbería: 5.5 vs 6.0 vs 6.5 vs 7.0 Pulgadas",
    excerpt:
      "¿Qué tamaño de tijera comprar según tu mano y técnica? Comparamos tijeras de 5.5\" (detalle), 6.0\" (universal), 6.5\" y 7.0\" (Scissor Over Comb).",
    cluster: "info-tecnica",
    brand: "Guía de Medidas de Tijeras",
    badgeLabel: "📏 5.5\" vs 6.0\" vs 6.5\" vs 7.0\"",
    imageUrl: "/images/blog-v3/tijeras-de-entresacar-vs-filo-navaja-diferencias.webp",
    imageAlt: "Comparativa de longitudes de tijeras profesionales de barbería en pulgadas",
    readTime: "6 min",
    publishedAt: "2026-11-22",
    updatedAt: "2026-11-22",
    amazonProductKeys: [
      "VG10_JAPANESE_SHEARS",
      "BARBER_MAGNETIC_MAT_CAPE_PRO",
      "BARBER_TRAVEL_BACKPACK_CASE",
    ],
    specs: [
      { label: "5.5\" Pulgadas", value: "Detalles finos, contorno de orejas, bigote y corte entre dedos corto" },
      { label: "6.0\" Pulgadas", value: "Medida Universal Todoterreno (Mechas superiores + Point Cutting)" },
      { label: "6.5\" a 7.0\" Pulgadas", value: "Especialista de Barbería: Tijera sobre Peine (Scissor Over Comb)" },
    ],
    pros: [
      "Con una hoja larga de 6.5\" o 7.0\" cortas toda la sección apoyada en el peine de una sola tijeretada recta sin que el pelo se escape por la punta",
      "Con una de 5.5\" o 6.0\" tienes máxima agilidad entre los dedos en la coronilla sin riesgo de pinchar tu segunda falange",
    ],
    cons: [
      "Hacer tijera sobre peine con una tijera corta de 5.0\" o 5.5\" toma el doble de tiempo y deja marcas de tijeretazos",
    ],
    keyTakeaways: [
      "En peluquería femenina se usa 5.5\"; en barbería masculina la reina es 6.5\" (o 6.0\" si solo vas a tener una tijera para todo).",
    ],
    sections: [
      {
        heading: "1. Cómo Medir tu Mano para Elegir la Longitud Exacta de Tijera",
        paragraphs: [
          "Apoya la tijera abierta sobre la palma de tu mano: el anillo del dedo anular debe coincidir con la base de tu dedo pulgar y la punta de la hoja debe llegar aproximadamente a la última falange de tu dedo medio. Para la técnica reina de la barbería clásica (tijera sobre peine en laterales y nuca), una hoja de 6.5 pulgadas te da la palanca y línea recta perfectas.",
        ],
      },
    ],
    faqs: [
      {
        question: "¿De qué medida debe ser la tijera de entresacar?",
        answer:
          "Las tijeras de entresacar vienen casi siempre en medida estándar de 6.0 pulgadas, que es el tamaño ideal para controlar exactamente dónde vacías peso.",
      },
    ],
  },
  {
    id: 97,
    slug: "ergonomia-tijeras-mango-offset-vs-simetrico-vs-crane",
    title: "Ergonomía en Tijeras de Barbero: Mango Offset vs Simétrico vs Giratorio (Swivel) Antitúnel Carpiano",
    seoTitle: "Ergonomía de Tijeras: Mango Offset vs Simétrico vs Crane en Barbería",
    excerpt:
      "Evita el dolor de muñeca, hombro y síndrome del túnel carpiano: diferencias biomecánicas entre tijeras de mango Simétrico clásico, Offset y Crane.",
    cluster: "info-tecnica",
    brand: "Biomecánica del Barbero",
    badgeLabel: "🖐️ Ergonomía Antitúnel Carpiano",
    imageUrl: "/images/blog-v3/tijeras-de-entresacar-vs-filo-navaja-diferencias.webp",
    imageAlt: "Detalle ergonómico del mango Offset en tijeras profesionales de barbería",
    readTime: "6 min",
    publishedAt: "2026-11-22",
    updatedAt: "2026-11-22",
    amazonProductKeys: [
      "VG10_JAPANESE_SHEARS",
      "BARBER_MAGNETIC_MAT_CAPE_PRO",
      "BARBER_TRAVEL_BACKPACK_CASE",
    ],
    specs: [
      { label: "Mango Simétrico (Opposing)", value: "Dos anillos iguales a la misma altura (Obliga a levantar el codo)" },
      { label: "Mango Offset (Asimétrico)", value: "Anillo del pulgar más corto y adelantado (Posición natural de la mano)" },
      { label: "Mango Crane (Grulla)", value: "Hoja recta con mango inclinado hacia abajo (El codo descansa pegado al cuerpo)" },
    ],
    pros: [
      "El mango Offset o Crane reduce hasta en un 60% la tensión en el tendón del pulgar y permite cortar con el hombro relajado",
    ],
    cons: [
      "El mango simétrico antiguo fuerza una flexión cubital de la muñeca al cortar secciones horizontales",
    ],
    keyTakeaways: [
      "Si miras tu mano relajada, tu dedo pulgar es más corto que tu dedo anular: por eso el mango Offset (asimétrico) es el estándar ergonómico obligatorio hoy en día.",
    ],
    sections: [
      {
        heading: "1. La Técnica Correcta: En una Tijera de Barbería SOLO se Mueve el Pulgar",
        paragraphs: [
          "Para que un corte a tijera sea preciso, la hoja superior (controlada por el dedo anular) debe permanecer 100% inmóvil como una mesa, y solo la hoja inferior (accionada por la punta del pulgar) debe abrir y cerrar. Un mango Offset coloca el anillo del pulgar en su ángulo anatómico natural para que puedas hacer ese movimiento miles de veces al día sin inflamación tendinosa.",
        ],
      },
    ],
    faqs: [
      {
        question: "¿Hasta dónde debe entrar el dedo pulgar dentro del anillo de la tijera?",
        answer:
          "Solo debe entrar la punta del pulgar (hasta antes de la primera articulación o uña); si metes el pulgar hasta el fondo perderás velocidad y moverás ambas hojas a la vez.",
      },
    ],
  },
  {
    id: 98,
    slug: "como-ajustar-tension-tornillo-y-aceitar-tijeras",
    title: "La Prueba de Caída de 90°: Cómo Ajustar la Tensión del Tornillo de tus Tijeras Profesionales",
    seoTitle: "Cómo Ajustar la Tensión del Tornillo de tus Tijeras de Barbería",
    excerpt:
      "Aprende el test de la cruz (90 grados) para calibrar en 15 segundos la tensión perfecta del tornillo de tus tijeras de corte y entresacar para que no doblen el pelo.",
    cluster: "info-tecnica",
    brand: "Calibración de Tijeras",
    badgeLabel: "⚙️ Test de Caída de 90°",
    imageUrl: "/images/blog-v3/tijeras-de-entresacar-vs-filo-navaja-diferencias.webp",
    imageAlt: "Ajuste del tornillo central de tensión en tijeras profesionales de barbería",
    readTime: "5 min",
    publishedAt: "2026-11-22",
    updatedAt: "2026-11-22",
    amazonProductKeys: [
      "VG10_JAPANESE_SHEARS",
      "BARBICIDE_DISINFECTANT_JAR",
      "BARBER_MAGNETIC_MAT_CAPE_PRO",
    ],
    specs: [
      { label: "Si está muy floja la tensión", value: "La tijera dobla o pellizca el cabello en lugar de cortarlo" },
      { label: "Si está muy apretada la tensión", value: "Desgasta prematuramente el filo convexo y cansa el pulgar" },
      { label: "Punto Exacto en la Prueba de 90°", value: "La hoja cae y se detiene sola a las '11 en punto' o '1 en punto'" },
    ],
    pros: [
      "Muchas tijeras que parecen 'desafiladas' en realidad solo tienen el tornillo central flojo y vuelven a cortar perfecto en 10 segundos",
    ],
    cons: [
      "Ajusta siempre de a 1 o 2 clics a la vez (nunca le des vueltas enteras de golpe al tornillo)",
    ],
    keyTakeaways: [
      "Pon siempre 1 gota de aceite justo en el pivote del tornillo después de limpiar tus tijeras con la gamuza antes de hacer la prueba de tensión.",
    ],
    sections: [
      {
        heading: "1. Cómo Hacer la Prueba de Caída de 90° en 10 Segundos",
        paragraphs: [
          "1) Sostén la tijera en horizontal por un solo anillo (con la punta mirando hacia el frente).\n2) Con la otra mano, levanta el otro anillo hasta formar una cruz de 90 grados y suéltalo para que caiga por su propio peso.\n3) Si la tijera se cierra por completo de golpe, está MUY FLOJA (aprieta 2 clics el tornillo en sentido horario). Si no baja nada, está MUY DURA. La tensión perfecta se logra cuando baja suave y se detiene sola dejando abierta apenas un tercio de la punta.",
        ],
      },
    ],
    faqs: [
      {
        question: "¿Cada cuánto tiempo debo revisar la tensión del tornillo de mis tijeras?",
        answer:
          "Una vez por semana al realizar la limpieza y aceitado del pivote central.",
      },
    ],
  },
  {
    id: 99,
    slug: "diferencias-peine-0-5-verde-y-1-5-blanco-trampa",
    title: "Cómo Usar los Peines Trampa #0.5 (1.5 mm) y #1.5 (4.5 mm) para Borrar Líneas de Fade",
    seoTitle: "Cómo Usar los Peines Trampa #0.5 (1.5mm) y #1.5 (4.5mm) en un Fade",
    excerpt:
      "Guía práctica de las dos peinetas más importantes de la barbería moderna: el peine #1/2 (1.5 mm) y el peine #1 1/2 (4.5 mm) para conectar el cero con el #1 y el #2.",
    cluster: "info-tecnica",
    brand: "Técnica de Degradado",
    badgeLabel: "📐 Los 2 Peines del Fade",
    imageUrl: "/images/blog-v3/numeros-de-maquina-corte-de-pelo.webp",
    imageAlt: "Peines guía de barbería números 0.5 (1.5 mm) y 1.5 (4.5 mm) sobre estación",
    readTime: "6 min",
    publishedAt: "2026-11-22",
    updatedAt: "2026-11-22",
    amazonProductKeys: [
      "WAHL_PREMIUM_GUARDS_SET",
      "WAHL_MAGIC_CLIP",
      "JRL_ONYX_CLIPPER",
    ],
    specs: [
      { label: "Peine #0.5 (1/2 · 1.5 mm)", value: "Puente exacto para borrar la línea entre el #0 abierto y el #1 cerrado (3 mm)" },
      { label: "Peine #1.5 (1 1/2 · 4.5 mm)", value: "Puente exacto para borrar la línea entre el #1 abierto y el #2 cerrado (6 mm)" },
    ],
    pros: [
      "Eliminan el 90% del riesgo de dejar líneas negras marcadas en la zona gris del degradado",
      "En el set Wahl Premium vienen con clip de acero inoxidable que no se mueve ni un milímetro",
    ],
    cons: [
      "Recuerda que al usar el peine #0.5 para borrar la línea del cero debes trabajar solo con las 3 o 4 esquinas de la cuchilla e ir cerrando la palanca de a pocos",
    ],
    keyTakeaways: [
      "Sin el peine #0.5 (1.5 mm) y el #1.5 (4.5 mm) es imposible hacer un Skin Fade moderno en tiempos comerciales de 30 minutos.",
    ],
    sections: [
      {
        heading: "1. La Matemática del Degradado: Por Qué Faltaban Dos Escalones",
        paragraphs: [
          "Entre la cuchilla sin peine abierta (~1.2 mm) y el peine #1 (3.0 mm) había un salto gigante donde siempre quedaba una raya negra. El peine #0.5 (1.5 mm) se mete exactamente en medio de esa brecha. Y lo mismo ocurre arriba: entre el peine #1 (3.0 mm) y el peine #2 (6.0 mm) hay otros 3 milímetros de salto que el peine #1.5 (4.5 mm) difumina como por arte de magia.",
        ],
      },
    ],
    faqs: [
      {
        question: "¿Qué máquinas ya traen los peines #0.5 y #1.5 incluidos en la caja?",
        answer:
          "La Wahl 5 Star Cordless Magic Clip, la Wahl Cordless Senior, la Wahl Cordless Legend, las JRL 2020C/Onyx, las BaBylissPRO GoldFX y las StyleCraft Instinct/Rebel ya los traen incluidos.",
      },
    ],
  },
  {
    id: 100,
    slug: "guia-uso-aerografo-y-fibra-capilar-barba-contornos",
    title: "Cómo Aplicar Fibra Capilar y Pigmento Semi-Permanente con Aerógrafo en Contornos de Barba",
    seoTitle: "Cómo Aplicar Pigmento con Aerógrafo y Fibra Capilar en Barba",
    excerpt:
      "Técnica profesional de acabado HD ('Enhancements') en barbería: cómo usar el aerógrafo inalámbrico o las fibras de queratina para dar nitidez fotográfica sin que se vea pintado.",
    cluster: "info-tecnica",
    brand: "Técnica Enhancements HD",
    badgeLabel: "🎨 Acabado Fotográfico HD",
    imageUrl: "/images/blog-v3/tinte-para-barba-como-cubrir-canas-natural.webp",
    imageAlt: "Definición de contornos de barba y cerquillo con aerógrafo profesional",
    readTime: "6 min",
    publishedAt: "2026-11-22",
    updatedAt: "2026-11-22",
    amazonProductKeys: [
      "BABYLISS_SKELETONFX",
      "PARKER_SRX_SHAVETTE",
      "WAHL_DETAILER_LI",
    ],
    specs: [
      { label: "Regla #1 del Barbero", value: "Primero haz el 100% del corte y cerquillo natural; el pigmento solo realza, no reemplaza el corte" },
      { label: "Distancia del Aerógrafo", value: "10 cm a 15 cm en ángulo de 45° hacia la tarjeta guía" },
      { label: "Toque Final Obligatorio", value: "Repasar el borde exterior con la patillera o navaja para que la línea brille" },
    ],
    pros: [
      "Hace que tus fotos y videos de cortes para Instagram y TikTok destaquen con líneas geométricas de alto contraste",
      "Ideal para eventos, bodas, graduaciones o clientes con remolinos claros en las esquinas de la frente",
    ],
    cons: [
      "El error de novato es aplicar demasiado tinte negro azabache; usa siempre tono castaño oscuro (Dark Brown) y un velo traslúcido muy sutil",
    ],
    keyTakeaways: [
      "El secreto de los barberos famosos: el 70% del spray del aerógrafo debe caer sobre la tarjeta plástica y solo el 30% de la neblina exterior debe besar la línea del cabello.",
    ],
    sections: [
      {
        heading: "1. Cómo Lograr el Efecto Sombra Natural en 3 Pasos sin Efecto 'Betún'",
        paragraphs: [
          "1) Marca primero el contorno al natural con tu BaByliss SkeletonFX o Wahl Detailer Li y límpialo con navaja.\n2) Apoya la tarjeta transparente exactamente sobre la línea y rocía con el aerógrafo apuntando el centro del chorro hacia el plástico para que solo la bruma difuminada caiga sobre los primeros 3 milímetros del cabello.\n3) Retira la tarjeta y pasa la punta de la patillera o navaja por el filo exterior para dejar una frontera hiperrealista.",
        ],
      },
    ],
    faqs: [
      {
        question: "¿Qué tono de pigmento se ve más natural en cabello negro latino?",
        answer:
          "El tono Castaño Muy Oscuro (Darkest Brown) o Negro Natural diluido, ya que el negro puro opaco puede verse artificial bajo la luz del sol.",
      },
    ],
  },
  {
    id: 101,
    slug: "como-usar-lapiz-hemostatico-y-gel-corta-sangre",
    title: "Lápiz Hemostático (Styptic Pencil), Polvo y Piedra de Alumbre: Cómo Cortar Microcortes al Instante",
    seoTitle: "Lápiz Hemostático, Polvo Corta Sangre y Piedra de Alumbre en Barbería",
    excerpt:
      "Qué tener en el botiquín de tu estación de barbería para detener cualquier microcorte o punto rojo de navaja en 2 segundos de forma higiénica.",
    cluster: "info-tecnica",
    brand: "Botiquín & Post-Afeitado",
    badgeLabel: "🩹 Control de Microcortes",
    imageUrl: "/images/blog-v3/piedra-de-alumbre-beneficios-y-como-usarla-post-afeitado.webp",
    imageAlt: "Piedra de alumbre natural y accesorios post-afeitado de barbería",
    readTime: "5 min",
    publishedAt: "2026-11-22",
    updatedAt: "2026-11-22",
    amazonProductKeys: [
      "PARKER_SRX_SHAVETTE",
      "ASTRA_PLATINUM_100",
      "BARBICIDE_DISINFECTANT_JAR",
    ],
    specs: [
      { label: "Piedra de Alumbre (Potassium Alum)", value: "Cierra poros y calma toda la zona afeitada tras el ritual de barba" },
      { label: "Polvo / Gel Hemostático o Cerillos", value: "Uso individual con hisopo desechable para sellar un punto rojo en 2 segundos" },
      { label: "Lápiz Hemostático (Styptic Pencil)", value: "Excelente para uso personal en casa (Sulfato de Aluminio)" },
    ],
    pros: [
      "Cierra los capilares superficiales en menos de 3 segundos por acción astringente natural",
      "Aplicar polvo o líquido hemostático con la punta de un hisopo de algodón nuevo mantiene el 100% de la higiene clínica en barbería",
    ],
    cons: [
      "En barbería comercial nunca uses el mismo lápiz hemostático directo sobre dos clientes; usa hisopos individuales o cerillas hemostáticas desechables",
    ],
    keyTakeaways: [
      "Para uso personal en casa: un lápiz hemostático (Styptic Pencil) y un bloque de piedra de alumbre duran más de 2 años.",
      "Para barbería profesional: aplica una gota de solución o polvo hemostático sobre un cotonete/hisopo desechable y presiona 3 segundos.",
    ],
    sections: [
      {
        heading: "1. Diferencia entre la Piedra de Alumbre y el Hemostático Corta-Sangre",
        paragraphs: [
          "La piedra de alumbre de potasio es un mineral cristalino que se humedece en agua fría y se desliza por todo el cuello y mejillas al terminar el afeitado como tónico antiséptico y cierra-poros general. En cambio, cuando un granito o lunar microscópico sangra al pasar la navaja, se utiliza sulfato de aluminio concentrado (en cerilla individual o polvo sobre un hisopo) que coagula el punto al instante.",
        ],
      },
    ],
    faqs: [
      {
        question: "¿Deja mancha blanca el lápiz o polvo hemostático?",
        answer:
          "Al secar deja un pequeño rastro mineral blanco que se retira fácilmente pasando un algodón húmedo o una gota de bálsamo Aftershave 30 segundos después.",
      },
    ],
  },
  {
    id: 102,
    slug: "como-preparar-toallas-calientes-con-aceites-esenciales",
    title: "Protocolo de Toallas Calientes en Calentador Eléctrico con Eucalipto para Abrir el Poro",
    seoTitle: "Cómo Preparar Toallas Calientes con Eucalipto para Afeitado de Barba",
    excerpt:
      "Guía paso a paso para doblar, humedecer y aromatizar las toallas faciales de algodón 100% dentro de tu gabinete Towel Warmer para el ritual imperial de barba.",
    cluster: "info-tecnica",
    brand: "Ritual Imperial de Barba",
    badgeLabel: "♨️ Protocolo Spa de Barbería",
    imageUrl: "/images/blog-v3/ritual-toalla-caliente-y-navaja-afecta-absorcion-minoxidil.webp",
    imageAlt: "Preparación de toallas faciales calientes con aceite esencial de eucalipto en barbería",
    readTime: "6 min",
    publishedAt: "2026-11-22",
    updatedAt: "2026-11-22",
    amazonProductKeys: [
      "HOT_TOWEL_CABINET_UV",
      "PARKER_SRX_SHAVETTE",
      "ASTRA_PLATINUM_100",
    ],
    specs: [
      { label: "Toalla Recomendada", value: "100% Algodón Egipcio/Turco de 30×30 cm (400–500 GSM)" },
      { label: "Aromaterapia para Toalla Caliente", value: "3 gotas de Aceite Esencial de Eucalipto o Lavanda en el agua de remojo" },
      { label: "Toalla Fría Final", value: "Guardada en mini-refrigerador con menta para cerrar el poro al final" },
    ],
    pros: [
      "El vapor de eucalipto a 70 °C despeja las vías respiratorias del cliente, relaja los músculos faciales y ablanda la barba más dura en 90 segundos",
    ],
    cons: [
      "Prueba siempre la temperatura de la toalla en la cara interna de tu muñeca durante 2 segundos antes de apoyarla en el rostro del cliente",
    ],
    keyTakeaways: [
      "El contraste térmico perfecto: Toalla Caliente con Eucalipto antes de la navaja (abre poros y ablanda el pelo) + Toalla Fría al terminar (cierra poros y desinflama).",
    ],
    sections: [
      {
        heading: "1. Cómo Envolver el Rostro en Forma de 'V' Dejando Libre la Nariz",
        paragraphs: [
          "Al sacar la toalla del gabinete calentador con pinzas, despliégala un segundo en el aire para liberar el pico inicial de vapor, tócala con tu muñeca y apóyala primero debajo del mentón del cliente, subiendo ambos extremos hacia los pómulos y cruzándolos sobre el labio superior pero dejando las fosas nasales 100% despejadas.",
        ],
      },
    ],
    faqs: [
      {
        question: "¿Cuánto tiempo se deja puesta la toalla caliente sobre la barba antes de afeitar?",
        answer:
          "Entre 90 segundos y 2 minutos (con crema pre-shave debajo de la toalla), tiempo suficiente para que el vello absorba humedad y pierda el 60% de su rigidez.",
      },
    ],
  },
  {
    id: 103,
    slug: "como-organizar-estacion-de-trabajo-barbero-ergonomia",
    title: "Cómo Organizar tu Estación de Barbería (Tapete, Soportes de Pared y Gestión de Cables)",
    seoTitle: "Cómo Organizar tu Estación de Barbería con Eficiencia y Ergonomía",
    excerpt:
      "Distribución ergonómica de tu tocador de barbero para ahorrar 5 minutos por cada corte: regla de la mano dominante, tapete magnético, bases de carga y zona limpia vs sucia.",
    cluster: "info-tecnica",
    brand: "Ergonomía de Estación",
    badgeLabel: "💈 Layout de Estación Pro",
    imageUrl: "/images/blog-v3/iluminacion-aro-de-luz-y-espejos-para-barberia.webp",
    imageAlt: "Estación de barbería profesional organizada con iluminación y herramientas alineadas",
    readTime: "6 min",
    publishedAt: "2026-11-22",
    updatedAt: "2026-11-22",
    amazonProductKeys: [
      "BARBER_MAGNETIC_MAT_CAPE_PRO",
      "BARBICIDE_DISINFECTANT_JAR",
      "WAHL_PREMIUM_GUARDS_SET",
    ],
    specs: [
      { label: "Zona Derecha (Si eres diestro)", value: "Tapete Magnético con Clipper, Trimmer, Shaver y Tijeras en orden de uso" },
      { label: "Zona Central / Bandeja", value: "Bandeja de Peines Guía numerados del #0.5 al #8 + Fade Brush" },
      { label: "Zona de Bioseguridad Visible", value: "Jarra de Vidrio Azul, Spray 5 en 1, Dispensador de Papel Cuellero y Basurero de Hojas" },
    ],
    pros: [
      "Cuando tus máquinas y peines tienen un lugar fijo en el tapete magnético, tu mano los toma por memoria muscular sin apartar la vista del cráneo del cliente",
      "Un tocador impecable y ordenado justifica tarifas más altas y genera reseñas de 5 estrellas en Google",
    ],
    cons: [
      "Nunca mezcles sobre el mismo tapete los peines recién usados en un cliente con los peines ya desinfectados",
    ],
    keyTakeaways: [
      "Ordena tus máquinas de izquierda a derecha exactamente en la secuencia en que haces un fade: 1) Clipper de desbaste, 2) Clipper de fade, 3) Patillera Trimmer, 4) Foil Shaver.",
    ],
    sections: [
      {
        heading: "1. La Regla de la Memoria Muscular: Ahorra 5 Minutos por Cliente",
        paragraphs: [
          "En un corte degradado cambias de herramienta o de peine guía entre 18 y 25 veces. Si tienes las peinetas amontonadas en una caja y las máquinas cruzadas, pierdes hasta 5 minutos por corte solo buscando el peine #0.5 o desenredando un cable. Al usar la bandeja organizadora Wahl y un tapete magnético de 4 plazas, tu mano derecha toma y devuelve cada pieza en medio segundo.",
        ],
      },
    ],
    faqs: [
      {
        question: "¿Dónde se deben desechar las medias cuchillas de navaja usadas?",
        answer:
          "Jamás en la bolsa de basura común: deben depositarse en un contenedor rígido amarillo de punzocortantes (Sharps Container) o en un banco metálico de cuchillas.",
      },
    ],
  },
  {
    id: 104,
    slug: "voltaje-110v-220v-maquinas-barberia-importadas-amazon",
    title: "Guía de Voltaje Dual (100V–240V) al Comprar Máquinas de Barbería en Amazon desde Perú y España",
    seoTitle: "Voltaje 110V vs 220V al Comprar Máquinas de Barbería en Amazon",
    excerpt:
      "Todo lo que debes saber antes de pedir máquinas Wahl, BaBylissPRO, JRL, StyleCraft y Andis en Amazon: cuáles son Bivolt (100V-240V 50/60Hz) y cuáles no necesitan transformador.",
    cluster: "info-tecnica",
    brand: "Guía de Importación Amazon",
    badgeLabel: "⚡ Voltaje Dual 100V–240V",
    imageUrl: "/images/blog-v3/mejores-cortapelos-maquinas-de-cortar-pelo-peru.webp",
    imageAlt: "Cargadores de voltaje universal 100V-240V de máquinas inalámbricas de barbería",
    readTime: "7 min",
    publishedAt: "2026-11-22",
    updatedAt: "2026-11-22",
    amazonProductKeys: [
      "WAHL_MAGIC_CLIP",
      "JRL_ONYX_CLIPPER",
      "BABYLISS_GOLDFX_CLIPPER",
    ],
    specs: [
      { label: "Perú (Red Eléctrica)", value: "220V · 60 Hz" },
      { label: "España / Europa (Red Eléctrica)", value: "230V · 50 Hz" },
      { label: "EE. UU. (Red Eléctrica)", value: "110V–120V · 60 Hz" },
      { label: "Máquinas Inalámbricas (Cordless)", value: "100% Voltaje Universal Automático (100V–240V 50/60Hz)" },
    ],
    pros: [
      "El 100% de las máquinas INALÁMBRICAS profesionales actuales (Wahl Cordless, JRL, BaBylissFX, StyleCraft, Andis Cordless/ProFoil) tienen cargador electrónico Bivolt 100V–240V",
      "Puedes enchufarlas directo a la pared a 220V en Perú o España sin ningún transformador",
    ],
    cons: [
      "Las máquinas antiguas CON CABLE de motor electromagnético vibratorio (V5000/V9000 de 110V) SÍ son de voltaje fijo; por eso conviene comprar siempre las versiones Cordless",
    ],
    keyTakeaways: [
      "Regla de oro al comprar en Amazon.com o Amazon.es: elige siempre modelos INALÁMBRICOS (Cordless Li-Ion), ya que sus cargadores funcionan automáticamente de 100V a 240V en cualquier país del mundo.",
    ],
    sections: [
      {
        heading: "1. ¿Por qué Todas las Máquinas Inalámbricas (Cordless) Funcionan a 110V y 220V sin Transformador?",
        paragraphs: [
          "Las máquinas inalámbricas modernas (Wahl Cordless Magic Clip, Senior, Legend, Detailer Li, Vanish, toda la línea JRL, BaBylissPRO GoldFX/Skeleton/FoilFX02, StyleCraft y Andis ProFoil/Slimline) funcionan internamente con una batería de litio de 3.7V a 5V DC. Su cargador de pared es una fuente conmutada inteligente (igual que el cargador de un celular o laptop) que acepta automáticamente cualquier corriente desde 100V hasta 240V a 50 o 60 Hz.",
        ],
      },
    ],
    faqs: [
      {
        question: "¿Cómo verifico en 2 segundos que el cargador de mi máquina es bivolt 100-240V?",
        answer:
          "Mira la etiqueta impresa en el cubito del cargador donde dice 'INPUT': verás escrito '100-240V ~ 50/60Hz', lo que confirma que puedes conectarlo directo a 220V.",
      },
    ],
  },
  {
    id: 105,
    slug: "checklist-maletin-barbero-a-domicilio-vip",
    title: "Checklist Completo de Herramientas para Servicio de Barbería VIP a Domicilio",
    seoTitle: "Checklist de Herramientas para Barbero a Domicilio VIP",
    excerpt:
      "La lista definitiva de las 12 herramientas que nunca pueden faltar en tu mochila de barbero a domicilio para atender ejecutivos, novios y clientes VIP sin imprevistos.",
    cluster: "info-tecnica",
    brand: "Barbería VIP a Domicilio",
    badgeLabel: "🎒 Checklist 12 Imprescindibles",
    imageUrl: "/images/blog-v3/como-armar-kit-corte-de-pelo-en-casa.webp",
    imageAlt: "Maletín completo de barbero a domicilio con máquinas inalámbricas y accesorios",
    readTime: "7 min",
    publishedAt: "2026-11-22",
    updatedAt: "2026-11-22",
    amazonProductKeys: [
      "BARBER_TRAVEL_BACKPACK_CASE",
      "JRL_ONYX_CLIPPER",
      "ANDIS_PROFOIL_TS2",
    ],
    specs: [
      { label: "Trío de Máquinas Inalámbricas", value: "1 Clipper de 3-5h batería (JRL Onyx / Magic Clip) + 1 Trimmer + 1 Foil Shaver" },
      { label: "Corte y Peinado", value: "Tijera 6.5\" + Tijera Entresacar + Set Peines Wahl Premium + Atomizador Bruma" },
      { label: "Higiene y Limpieza", value: "Capa XXL con broches + Papel Cuellero + Spray Andis Cool Care + Navaja Parker SRX" },
    ],
    pros: [
      "El servicio de barbería VIP a domicilio (o en hotel para bodas y ejecutivos) se cobra entre 2 y 3 veces más que un corte en local",
      "Llevar el 100% de tus equipos inalámbricos cargados te permite cortar incluso en terrazas o jardines donde no hay enchufes cerca",
    ],
    cons: [
      "Olvidar las medias cuchillas para la navaja o el peine #0.5 a 10 kilómetros de tu barbería arruina el servicio: revisa siempre el checklist antes de salir",
    ],
    keyTakeaways: [
      "Usa una mochila organizadora con compartimentos fijos: si un elástico está vacío al cerrar la mochila, sabes de inmediato qué herramienta te falta guardar.",
    ],
    sections: [
      {
        heading: "1. Los 12 Imprescindibles que Deben Ir en tu Mochila Organizadora",
        paragraphs: [
          "1) Mochila acolchada impermeable para barbero.\n2) Clipper principal al 100% de batería (JRL Onyx o Wahl Magic Clip).\n3) Patillera Trimmer (BaByliss SkeletonFX, JRL Onyx Trimmer o Wahl Detailer Li).\n4) Foil Shaver (Andis ProFoil TS-2 o BaByliss FoilFX02).\n5) Set completo de 8 peines Wahl Premium (#0.5 al #8).\n6) Estuche con Tijera de Corte 6.5\" + Tijera de Entresacar + Peine Flat Top blanco y negro.\n7) Portanavajas Parker SRX + Caja de cuchillas Astra Platinum + Gel de afeitado.\n8) Atomizador de bruma continua cargado.\n9) Cepillo Fade Brush + Bledo suave + Talco.\n10) Rollo de papel cuellero + Capa impermeable XXL con cierre de broches.\n11) Lata de Andis Cool Care Plus 5 en 1 + Aceite en gotas.\n12) Espejo de mano plegable para mostrar la nuca al terminar.",
        ],
      },
    ],
    faqs: [
      {
        question: "¿Cómo dejar limpio el piso de la casa u hotel del cliente al terminar?",
        answer:
          "Lleva un pliego ligero o sábana plástica descartable de 2×2 metros para colocar debajo de la silla del cliente: al terminar el corte, recoges las 4 esquinas en 30 segundos sin dejar un solo pelo en su alfombra o parquet.",
      },
    ],
  },
];
