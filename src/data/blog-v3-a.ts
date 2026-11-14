import type { BlogV3ArticleSeed } from "./blog-v3-types";

export const BLOG_V3_CLUSTER_A: BlogV3ArticleSeed[] = [
  {
    id: 6,
    slug: "guia-visita-barberia",
    title: "Guía Completa Antes de Ir a la Barbería: Qué Revisar, Cómo Elegir Silla y Salir Conforme",
    seoTitle: "Guía Antes de Ir a la Barbería: Qué Revisar y Cómo Prepararte",
    focusKeyword: "guia visita barberia preparacion",
    excerpt:
      "Checklist práctico paso a paso para preparar tu cabello y barba antes de sentarte en el sillón, elegir al barbero indicado y evitar malentendidos en tu cita.",
    categorySlug: "experiencia-barberia",
    layoutVariant: "editorial",
    badgeLabel: "💈 Experiencia en Barbería",
    publishedAt: "2026-11-13",
    updatedAt: "2026-11-13",
    readTime: "6 min",
    author: "Redacción GuíaDeBarberías",
    authorRole: "Equipo Editorial de Barbería & Visagismo Masculino",
    imageUrl: "/images/blog-v3/guia-visita-barberia.webp",
    imageAlt: "Cliente consultando frente al espejo con su barbero antes de iniciar un corte moderno",
    imagePrompt:
      "A man consulting with a friendly barber in a modern upscale barbershop chair, holding a mirror, warm wood and dark leather aesthetic, photorealistic editorial photography, no text.",
    keyTakeaways: [
      "Llega con el cabello limpio y libre de ceras pesadas o gel para que el barbero evalúe tu caída natural, remolinos y densidad real.",
      "Guarda dos fotos de referencia tomadas desde ángulos distintos (perfil y nuca) con un tipo de cabello similar al tuyo.",
      "Dedica los primeros tres minutos frente al espejo a acordar longitud superior en centímetros, altura del degradado y forma de la nuca.",
    ],
    toc: [
      { id: "antes-de-salir", label: "1. Cómo preparar cabello y barba antes de salir de casa" },
      { id: "consulta-en-espejo", label: "2. Los 3 puntos que debes pactar en la consulta inicial" },
      { id: "durante-el-corte", label: "3. Qué observar durante el servicio para corregir a tiempo" },
      { id: "cierre-y-revision", label: "4. Revisión final con espejo de mano antes de levantarte" },
    ],
    content: `
      <p class="lead">
        Una gran diferencia entre salir encantado de la barbería o pasar dos semanas esperando a que te crezca el pelo ocurre mucho antes de que el barbero encienda la máquina: está en cómo llegas preparado y qué tan clara es la conversación inicial.
      </p>
      <p>
        Tanto si visitas un local de barrio como si reservas en una de las sedes mejor calificadas en nuestro <a href="/barberias-cerca-de-mi/"><strong>buscador de barberías cerca de ti</strong></a>, aplicar este protocolo sencillo elimina prácticamente cualquier sorpresa frente al espejo.
      </p>

      <h2 id="antes-de-salir">1. Cómo preparar cabello y barba antes de salir de casa</h2>
      <p>
        El error más común es acudir directamente del gimnasio o con media cucharada de cera mate endurecida del día anterior. Cuando las hebras están pegadas entre sí, el barbero no puede distinguir tus remolinos naturales ni medir la tensión real del cabello al peinarlo con tijera.
      </p>
      <ul>
        <li><strong>Cabello lavado el mismo día:</strong> Un enjuague suave con agua tibia y tu shampoo habitual sin acondicionador pesado deja el pelo suelto y honesto ante el peine.</li>
        <li><strong>Nada de gorras ajustadas justo antes:</strong> Llevar gorra durante una hora aplasta la coronilla y marca una línea falsa en la frente; quítatela al menos 30 minutos antes de entrar.</li>
        <li><strong>Barba seca para perfilar volumen:</strong> Si vas por diseño de barba, no apliques bálsamos aceitosos minutos antes de la cita para que el trimmer corte limpio y uniforme.</li>
      </ul>

      <h2 id="consulta-en-espejo">2. Los 3 puntos que debes pactar en la consulta inicial</h2>
      <p>
        Evita frases ambiguas como "bájame un poquito" o "como siempre, pero más corto". Lo que para ti significa un dedo, para otra persona son cuatro centímetros. Aterriza la charla en tres decisiones concretas:
      </p>
      <ol>
        <li><strong>Laterales y nuca:</strong> Define la altura del desvanecido (<a href="/blog/low-fade-vs-mid-fade-vs-high-fade-guia/"><strong>low, mid o high fade</strong></a>) o el número de peine guía que prefieres (<a href="/blog/numeros-de-maquina-corte-de-pelo/"><strong>consulta nuestra tabla exacta en milímetros</strong></a>) y si la nuca irá cuadrada, redonda o en taper natural.</li>
        <li><strong>Parte superior:</strong> Señala con los dedos exactamente cuánto deseas retirar en la coronilla y en el flequillo.</li>
        <li><strong>Patillas y contornos:</strong> Indica si conservas las patillas largas, en punta, rectas al lóbulo o desvanecidas hacia la barba.</li>
      </ol>

      <h2 id="durante-el-corte">3. Qué observar durante el servicio para corregir a tiempo</h2>
      <p>
        La postura en el sillón importa más de lo que parece. Mantén la espalda apoyada, evita cruzar las piernas (eso inclina un hombro y desnivela la línea horizontal del oído) y no mires el celular hacia abajo mientras el barbero trabaja la zona occipital. Un giro brusco de cuello o la cabeza inclinada arruina la simetría entre ambas sienes.
      </p>
      <p>
        Si notas que el lado superior quedó ligeramente más largo de lo que imaginabas, dilo cuando el barbero termine la primera pasada de tijera, antes del secado y del producto final. Ajustar 5 milímetros extra sobre cabello húmedo toma dos minutos; intentar corregirlo una semana después te costará otra visita.
      </p>

      <h2 id="cierre-y-revision">4. Revisión final con espejo de mano antes de levantarte</h2>
      <p>
        Cuando te entreguen el espejo de mano para mostrarte la parte posterior, no digas "está bien" por compromiso en medio segundo. Revisa la simetría detrás de las orejas, la limpieza de la línea de la nuca y pasa la mano por la coronilla sin producto excesivo. Si deseas conocer qué estándares sanitarios debe cumplir la estación antes de empezar, complementa esta lectura con nuestro <a href="/blog/checklist-higiene-barberia-esterilizacion/"><strong>checklist de higiene y esterilización en barbería</strong></a>.
      </p>
    `,
    faqs: [
      {
        question: "¿Debo ir con el pelo mojado o seco a la barbería?",
        answer:
          "Lo ideal es llegar con el cabello limpio, seco y sin productos de fijación (cera, gel o laca). El barbero decidirá luego si lo humedece con atomizador para cortar la parte superior a tijera o si trabaja en seco los degradados laterales.",
      },
      {
        question: "¿Cuántas fotos de referencia conviene mostrar al barbero?",
        answer:
          "Dos o tres fotos son suficientes: una de frente o tres cuartos y otra de perfil donde se distinga la altura del fade y el largo superior. Busca modelos con tu mismo tipo de cabello (lacio, ondulado o rizado) para que el resultado sea realista.",
      },
      {
        question: "¿Cuánto dura una cita completa de corte y barba bien realizada?",
        answer:
          "Un corte de cabello detallado toma entre 35 y 45 minutos. Si añades perfilado de barba con toalla caliente y navaja, calcula entre 60 y 75 minutos sin apuros.",
      },
    ],
    relatedCitySlugs: ["lima", "arequipa", "trujillo", "cusco"],
    hubSlug: "como-explicar-corte-al-barbero",
  },
  {
    id: 7,
    slug: "numeros-de-maquina-corte-de-pelo",
    title: "Números de Máquina para Cortar el Pelo en Barbería: Tabla Exacta del #0 al #8 en Milímetros",
    seoTitle: "Números de Máquina de Barbería: Tabla de Peines del #0 al #8 en mm",
    focusKeyword: "numeros de maquina para cortar el pelo",
    excerpt:
      "Descubre qué largo exacto deja cada peine guía (#0, #0.5, #1, #1.5, #2, #3, #4 al #8), cómo influye la palanca abierta o cerrada y qué número pedir según tu estilo.",
    categorySlug: "experiencia-barberia",
    layoutVariant: "editorial",
    badgeLabel: "📐 Guía Técnica de Medidas",
    publishedAt: "2026-11-13",
    updatedAt: "2026-11-13",
    readTime: "7 min",
    author: "Redacción GuíaDeBarberías",
    authorRole: "Equipo Editorial de Barbería & Visagismo Masculino",
    imageUrl: "/images/blog-v3/numeros-de-maquina-corte-de-pelo.webp",
    imageAlt: "Peines guía numerados de barbería y cortapelos metálico profesional sobre estación de trabajo",
    imagePrompt:
      "Clean close-up flat lay of hair clipper guard combs numbered sizes and metal barber clippers arranged neatly on a dark slate and walnut barber station, studio lighting, photorealistic, no overlaid text.",
    keyTakeaways: [
      "Cada número estándar de peine guía avanza en saltos de aproximadamente 3 milímetros (1/8 de pulgada): el #1 mide 3 mm, el #2 mide 6 mm y el #4 mide 13 mm.",
      "Los peines intermedios (#0.5 de 1.5 mm y #1.5 de 4.5 mm) son indispensables para borrar líneas oscuras en cualquier fade sin dejar escalones.",
      "Abrir o cerrar la palanca lateral del cortapelos agrega hasta 1.5 mm extra de margen sin cambiar el peine colocado.",
    ],
    toc: [
      { id: "tabla-completa-milimetros", label: "1. Tabla maestra de peines guía del #0 al #8" },
      { id: "secreto-palanca-lateral", label: "2. El truco de la palanca abierta vs. cerrada" },
      { id: "combinaciones-mas-pedidas", label: "3. Combinaciones clásicas que puedes pedir en Perú" },
      { id: "cuidado-no-pedir-solo-un-numero", label: "4. Por qué el cabello fino y el grueso se ven distintos al mismo número" },
    ],
    content: `
      <p class="lead">
        Escuchar en la barbería términos como "el 1.5 palanca abierta" o "arriba con la 4 y abajo con la cero" puede sonar críptico si nadie te explica la equivalencia real en milímetros. Dominar los números de máquina te da control total tanto al sentarte en el sillón como si decides repasar tus laterales en casa.
      </p>

      <h2 id="tabla-completa-milimetros">1. Tabla maestra de peines guía del #0 al #8</h2>
      <p>
        La inmensa mayoría de cortapelos profesionales en el mercado peruano (Wahl, BabylissPro, Andis, JRL) utilizan el estándar estadounidense basado en octavos de pulgada:
      </p>
      <ul>
        <li><strong>Cuchilla #0 (palanca cerrada):</strong> ~0.5 mm. Deja apenas una sombra grisácea muy pegada al cuero cabelludo (sin llegar al ras de la afeitadora foil).</li>
        <li><strong>Cuchilla #0 abierta / Peine #0.5:</strong> 1.5 mm (1/16"). La transición clave entre la piel limpia y los laterales cortos.</li>
        <li><strong>Peine #1:</strong> 3 mm (1/8"). Degradado corto y limpio; deja ver sutilmente la textura de la piel en cabello fino.</li>
        <li><strong>Peine #1.5:</strong> 4.5 mm (3/16"). Muy popular en barberías porque cubre el cuero cabelludo oscuro sin perder nitidez en el contorno.</li>
        <li><strong>Peine #2:</strong> 6 mm (1/4"). Clásico lateral ejecutivo o buzz cut corto muy parejo.</li>
        <li><strong>Peine #3:</strong> 9.5 mm – 10 mm (3/8"). El límite donde el cabello empieza a peinarse levemente y cubre por completo el tono de la piel.</li>
        <li><strong>Peine #4:</strong> 13 mm (1/2"). Ideal para la parte superior en cortes militares largos (<em>crew cut</em>) o cortes escolares ordenados.</li>
        <li><strong>Peine #5 y #6:</strong> 16 mm (5/8") y 19 mm (3/4"). Volumen moderado fácil de secar sin requerir tijera continua.</li>
        <li><strong>Peine #7 y #8:</strong> 22 mm (7/8") y 25 mm (1"). Equivalen a un dedo de largo para quienes prefieren uniformidad rápida arriba.</li>
      </ul>

      <h2 id="secreto-palanca-lateral">2. El truco de la palanca abierta vs. cerrada</h2>
      <p>
        La palanca metálica lateral del cortapelos ajusta el recorrido de la cuchilla móvil respecto a la cuchilla fija. Cuando está arriba del todo (<strong>cerrada</strong>), corta a la medida exacta impresa en el peine. Al bajarla por completo (<strong>abierta</strong>), añade cerca de 1.5 mm adicionales. Por eso el peine #1 con palanca abierta corta a ~4.5 mm, funcionando casi igual que un peine #1.5 cerrado.
      </p>

      <h2 id="combinaciones-mas-pedidas">3. Combinaciones clásicas que puedes pedir en Perú</h2>
      <p>
        Si buscas un resultado confiable para oficina o universidad sin complicarte demasiado, estas tres fórmulas funcionan en casi cualquier estructura craneal:
      </p>
      <ol>
        <li><strong>Clásico ejecutivo limpio:</strong> Peine #2 en laterales y nuca con transición gradual hacia tijera de 3 a 4 cm en la parte superior.</li>
        <li><strong>Buzz cut atlético con contraste:</strong> Peine #4 o #5 en toda la coronilla conectado con <a href="/blog/low-fade-vs-mid-fade-vs-high-fade-guia/"><strong>mid fade desde el #0.5</strong></a> en sienes y detrás de las orejas.</li>
        <li><strong>Taper discreto para cabello ondulado:</strong> Laterales trabajados con #3 en los costados y un desvanecido limpio solo en patillas y nuca con #0.5 y #1.</li>
      </ol>

      <h2 id="cuidado-no-pedir-solo-un-numero">4. Por qué el cabello fino y el grueso se ven distintos al mismo número</h2>
      <p>
        Un peine #2 en un hombre de cabello negro muy tupido sigue luciendo completamente oscuro y denso; en cambio, el mismo #2 sobre pelo lacio fino o claro deja entrever fácilmente el cuero cabelludo. Antes de pedir un número que viste en internet, evalúa junto a tu barbero la densidad de tu pelo en la zona parietal o revisa cómo <a href="/blog/como-explicar-corte-al-barbero/"><strong>comunicar las referencias exactas en tu próxima cita</strong></a>.
      </p>
    `,
    faqs: [
      {
        question: "¿Qué número de máquina equivale al famoso corte escolar o militar corto?",
        answer:
          "En Perú, el corte escolar ordenado suele trabajarse con peine #2 en laterales y #4 arriba o tijera corta. El buzz cut militar clásico utiliza #2 o #3 parejo arriba y #0.5 o #1 en los costados.",
      },
      {
        question: "¿Qué número de peine usar para rebajar la barba sin que quede lampiña?",
        answer:
          "El peine #1.5 (4.5 mm) o #2 (6 mm) mantiene el efecto sombra tupida de barba de 4 a 5 días con apariencia prolija y masculina.",
      },
      {
        question: "¿La máquina a #0 rasura igual que la navaja o la foil shaver?",
        answer:
          "No. La máquina en #0 cerrado deja cerca de 0.5 mm de altura visible (sombra muy corta). Para un acabado piel completamente liso al tacto se requiere una afeitadora de láminas (foil shaver) o navaja barbera.",
      },
    ],
    relatedCitySlugs: ["lima", "arequipa", "piura", "chiclayo"],
    hubSlug: "guia-visita-barberia",
  },
  {
    id: 8,
    slug: "como-explicar-corte-al-barbero",
    title: "Cómo Explicarle el Corte que Quieres a tu Barbero Sin Errores de Comunicación",
    seoTitle: "Cómo Explicarle tu Corte al Barbero Paso a Paso (Frases Útiles)",
    focusKeyword: "como explicar corte al barbero",
    excerpt:
      "Aprende el vocabulario real que usan los barberos —desde textura y altura del fade hasta caída de patillas y contorno— para obtener exactamente el corte que imaginaste.",
    categorySlug: "experiencia-barberia",
    layoutVariant: "editorial",
    badgeLabel: "🗣️ Comunicación en Barbería",
    publishedAt: "2026-11-13",
    updatedAt: "2026-11-13",
    readTime: "6 min",
    author: "Redacción GuíaDeBarberías",
    authorRole: "Equipo Editorial de Barbería & Visagismo Masculino",
    imageUrl: "/images/blog-v3/como-explicar-corte-al-barbero.webp",
    imageAlt: "Cliente enseñando una referencia en su celular al barbero frente al espejo",
    imagePrompt:
      "Male client holding a smartphone showing a haircut reference while talking with a smiling barber next to a wall mirror, editorial lighting, realistic photography, no readable text.",
    keyTakeaways: [
      "Nunca pidas el corte únicamente por un nombre de moda en redes sociales: cada barbero interpreta distinto qué es un 'crop' o 'taper' si no acotas medidas.",
      "Habla de tu rutina de peinado diaria (si usas secador o solo te peinas con los dedos) para evitar cortes que exijan 15 minutos de styling si solo tienes 2.",
      "Define cuatro bloques concretos: altura de los lados, forma de la nuca, largo superior y tratamiento del contorno de frente/patillas.",
    ],
    toc: [
      { id: "por-que-falla-comunicacion", label: "1. Por qué las palabras genéricas generan cortes distintos" },
      { id: "cuatro-preguntas-clave", label: "2. Los 4 bloques que debes describir en menos de un minuto" },
      { id: "diccionario-barberia", label: "3. Glosario rápido: entresacado, textura, desvanecido y cuadrado" },
      { id: "fotos-referencia-correctas", label: "4. Cómo elegir fotos útiles sin filtros engañosos" },
    ],
    content: `
      <p class="lead">
        "Quiero los lados bien cortos y arriba déjalo largo pero manejable". Frases como esta dejan al barbero adivinando si quieres un skin fade agresivo o un clásico peine #3, y si "manejable" equivale a cuatro centímetros o diez. Hablar el mismo idioma técnico multiplica tus posibilidades de salir 100% satisfecho.
      </p>

      <h2 id="por-que-falla-comunicacion">1. Por qué las palabras genéricas generan cortes distintos</h2>
      <p>
        Conceptos como "degradado medio", "un poco más corto" o "despuntado" cambian según la escuela del profesional. En una barbería urbana de Lima Norte un "corte normal" puede empezar en #0.5 con navaja en la frente; en una barbería clásica de San Isidro puede significar tijera sobre peine dejando las patillas largas.
      </p>

      <h2 id="cuatro-preguntas-clave">2. Los 4 bloques que debes describir en menos de un minuto</h2>
      <ol>
        <li><strong>Altura del fade o número lateral:</strong> Señala directamente con tu dedo índice hasta dónde quieres que suba la zona más clara sobre la sien (bajo la ceja, al nivel de la sien o por encima). Si prefieres sin piel visible, indica "que empiece en #1 o #1.5, no en navaja".</li>
        <li><strong>Largo y volumen arriba:</strong> Indica qué dedo de referencia quieres conservar (por ejemplo, "que el flequillo llegue a mitad de la frente al estirarlo") y si deseas mantener peso en los laterales superiores o conectarlo bien al ras.</li>
        <li><strong>Estilo de nuca:</strong> Elige entre nuca en <strong>taper desvanecida</strong> (crece más limpia a las dos semanas), <strong>cuadrada</strong> o <strong>redondeada</strong>.</li>
        <li><strong>Peinado real diario:</strong> Confiesa honestamente si usarás secador, polvo texturizador o simplemente pasarás la mano húmeda antes de salir. Un buen barbero adapta el entresacado a tu hábito real.</li>
      </ol>

      <h2 id="diccionario-barberia">3. Glosario rápido: entresacado, textura, desvanecido y cuadrado</h2>
      <ul>
        <li><strong>Texturizar (Point Cutting / Deep Point Cut):</strong> Cortar las puntas con la tijera en ángulo diagonal para dar movimiento y ligereza sin reducir drásticamente el largo general.</li>
        <li><strong>Entresacar (Thinning):</strong> Retirar densidad interna en cabellos muy gruesos y pesados con tijera dentada (ojo: evita pedirlo en exceso si tienes cabello fino o entradas).</li>
        <li><strong>Cerquillo o contorno natural:</strong> Respetar la línea real de nacimiento de la frente sin afeitar dos milímetros hacia atrás (así evitas que a los cuatro días broten pelos punzantes en mitad de la frente).</li>
      </ul>

      <h2 id="fotos-referencia-correctas">4. Cómo elegir fotos útiles sin filtros engañosos</h2>
      <p>
        Al mostrar una imagen, aclara qué elemento te gusta de ella: "Me gusta cómo cae la parte superior de esta foto, pero los lados los prefiero un poco más largos". Evita fotos de estudio fuertemente retocadas con laca, luces de neón o rellenos de fibra oscura en la frente; la realidad sin maquillaje de barbería es muy diferente. Si alguna vez sales disconforme pese a haberlo intentado todo, aquí te contamos <a href="/blog/que-hacer-si-barbero-corto-mal/"><strong>cómo rescatar un mal corte con el mínimo daño visual</strong></a>.
      </p>
    `,
    faqs: [
      {
        question: "¿Es recomendable pedir 'cerquillo marcado con navaja' en la frente?",
        answer:
          "Solo si te haces retoques cada 7 a 10 días y tu nacimiento frontal es recto y denso. En la mayoría de casos luce mucho más elegante y natural limpiar únicamente los pelitos sueltos sin retroceder tu línea original.",
      },
      {
        question: "¿Qué pasa si no sé qué número pedir arriba o a los lados?",
        answer:
          "Pide empezar conservador (por ejemplo un #2 o tijera lateral) e ir ajustando hacia abajo si lo ves demasiado largo, o usa nuestra guía de números de máquina del #0 al #8 como referencia visual.",
      },
      {
        question: "¿Conviene preguntar su opinión al barbero antes de empezar?",
        answer:
          "Sí. Preguntarle '¿qué altura de degradado crees que favorece más la forma de mi cráneo y mi remolino?' le permite al especialista detectar hundimientos occipitales o entradas antes de cortar.",
      },
    ],
    relatedCitySlugs: ["lima", "arequipa", "trujillo", "huancayo"],
    hubSlug: "guia-visita-barberia",
  },
  {
    id: 9,
    slug: "propina-barbero-peru-etiqueta",
    title: "Propina y Etiqueta en la Barbería en Perú: ¿Cuánto Dar, Cuándo y Cómo Tratar una Cita?",
    seoTitle: "Propina al Barbero en Perú y Etiqueta en la Barbería (Guía Real)",
    focusKeyword: "propina barbero peru etiqueta barberia",
    excerpt:
      "Resolvemos la duda incómoda de muchos clientes: si se estila dejar propina al barbero en Lima y provincias, rangos reales en soles, puntualidad y cancelaciones.",
    categorySlug: "experiencia-barberia",
    layoutVariant: "editorial",
    badgeLabel: "🇵🇪 Etiqueta en Perú",
    publishedAt: "2026-11-13",
    updatedAt: "2026-11-13",
    readTime: "5 min",
    author: "Redacción GuíaDeBarberías",
    authorRole: "Equipo Editorial de Barbería & Visagismo Masculino",
    imageUrl: "/images/blog-v3/propina-barbero-peru-etiqueta.webp",
    imageAlt: "Bandeja discreta de cuero con propina junto a tijeras en recepción de barbería",
    imagePrompt:
      "Hand placing Peruvian paper banknotes neatly on a small leather tip tray next to barber shears at a wooden reception desk, editorial studio light, realistic photography, no overlaid text.",
    keyTakeaways: [
      "En Perú la propina al barbero es completamente voluntaria y se valora como gesto directo por un trabajo prolijo, asesoría honesta o atención puntual.",
      "Cuando el servicio supera expectativas en locales de S/ 35 a S/ 80, una propina habitual oscila entre S/ 5 y S/ 15 directamente al profesional o por Yape/Plin.",
      "Más importante que la propina para ganar prioridad de agenda es la puntualidad y avisar cancelaciones al menos con 3 horas de anticipación.",
    ],
    toc: [
      { id: "se-da-propina-en-peru", label: "1. ¿Es obligatorio dejar propina en una barbería peruana?" },
      { id: "montos-referenciales", label: "2. Rangos reales según tipo de servicio y distrito" },
      { id: "reglas-etiqueta-sillon", label: "3. Cinco normas de etiqueta que todo buen cliente respeta" },
      { id: "cuando-no-dejar-propina", label: "4. Cuándo es válido no dejar propina y cómo dar feedback" },
    ],
    content: `
      <p class="lead">
        A diferencia de Estados Unidos, donde la propina del 15% al 20% forma parte casi obligatoria del ingreso base del barbero, en Perú la cultura es mucho más relajada. Sin embargo, conforme han crecido las barberías de autor en Lima, Arequipa o Trujillo, cada vez más clientes se preguntan qué es lo correcto al pasar por caja.
      </p>

      <h2 id="se-da-propina-en-peru">1. ¿Es obligatorio dejar propina en una barbería peruana?</h2>
      <p>
        No es obligatoria ni existe un recargo automático en el ticket. Si pagas exactamente el precio tarifado de pizarra o web, estás cumpliendo al 100%. Dicho esto, la mayoría de barberos en Perú trabajan bajo un esquema de comisión por servicio (generalmente entre el 40% y el 50% de lo cobrado), por lo que un reconocimiento extra directo fortalece muchísimo la relación cuando ya encontraste a tu barbero de cabecera.
      </p>

      <h2 id="montos-referenciales">2. Rangos reales según tipo de servicio y distrito</h2>
      <ul>
        <li><strong>Corte estándar en barbería de barrio (S/ 20 – S/ 35):</strong> No suele esperarse propina; si el barbero dedicó tiempo extra en detalles, S/ 3 a S/ 5 o un café es un gran detalle.</li>
        <li><strong>Corte ejecutivo en barbería boutique (S/ 45 – S/ 70):</strong> Si saliste impecable, lo habitual entre clientes frecuentes es entre <strong>S/ 5 y S/ 10</strong> (en efectivo directo al barbero o mediante su QR personal).</li>
        <li><strong>Combo completo corte + ritual de barba con toalla caliente (S/ 80 – S/ 120):</strong> Al tratarse de más de una hora de trabajo artesanal, S/ 10 a S/ 15 es un gesto muy valorado.</li>
        <li><strong>¿Y si me atiende el dueño del local?</strong> En barberías atendidas por su propio fundador, la etiqueta tradicional indica que no hace falta dar propina adicional; la mejor retribución es dejar una reseña honesta en Google Maps y recomendarlo.</li>
      </ul>

      <h2 id="reglas-etiqueta-sillon">3. Cinco normas de etiqueta que todo buen cliente respeta</h2>
      <ol>
        <li><strong>Tolerancia máxima de 10 minutos:</strong> Llegar 20 minutos tarde descuadra las tres citas posteriores de ese barbero. Si sabes que el tráfico de Javier Prado o la Av. Arequipa te atrasará, escribe por WhatsApp en ese instante.</li>
        <li><strong>Cabello limpio (y sin olor a cigarrillo o sudor reciente):</strong> Es cuestión de respeto básico hacia quien trabajará a 20 centímetros de tu rostro por 45 minutos.</li>
        <li><strong>No cancelar a último minuto dos veces seguidas:</strong> Las faltas sin aviso son el motivo principal por el que muchas <a href="/blog/como-reservar-cita-barberia-lima/"><strong>barberías en Lima piden abono previo de reserva</strong></a>.</li>
        <li><strong>Cuidado con el volumen del celular:</strong> Evita ver videos en altavoz o sostener videollamadas mientras el barbero realiza pasadas finas con tijera junto al oído.</li>
      </ol>

      <h2 id="cuando-no-dejar-propina">4. Cuándo es válido no dejar propina y cómo dar feedback</h2>
      <p>
        Si sentiste apuro excesivo, trato displicente o un corte claramente desigual respecto a lo acordado, no des propina por presión social. Expresa con calma qué detalle no cerró bien en la revisión final para que puedan corregirlo en la silla antes de pasar a caja.
      </p>
    `,
    faqs: [
      {
        question: "¿La propina en tarjeta suele llegar íntegra al barbero?",
        answer:
          "No siempre de forma inmediata por comisiones de pasarela e impuestos de caja. Si deseas agradecerle directamente a tu barbero, lo mejor es darle efectivo en mano o pedirle su Yape/Plin personal al terminar en la estación.",
      },
      {
        question: "¿Qué tanto anticipo necesita una cancelación para no quedar mal?",
        answer:
          "Avisar al menos 3 a 4 horas antes permite al local reasignar ese bloque a otro cliente en lista de espera.",
      },
      {
        question: "¿Conviene llevar referencias en foto o es incómodo para el barbero?",
        answer:
          "Lejos de incomodar, los barberos agradecen las fotos claras porque reducen errores de interpretación desde el primer minuto.",
      },
    ],
    relatedCitySlugs: ["lima", "arequipa", "cusco", "trujillo"],
    hubSlug: "guia-visita-barberia",
  },
  {
    id: 10,
    slug: "cada-cuanto-cortarse-el-pelo",
    title: "¿Cada Cuánto Tiempo Cortarse el Pelo Según Tu Estilo? Calendario Real de Mantenimiento",
    seoTitle: "¿Cada Cuánto Cortarse el Pelo Según Tu Estilo? (Calendario Real)",
    focusKeyword: "cada cuanto cortarse el pelo",
    excerpt:
      "El ritmo ideal de visita a la barbería varía de 10 días a 8 semanas según lleves skin fade, taper, corte clásico a tijera o melena media. Calcula tu calendario exacto.",
    categorySlug: "experiencia-barberia",
    layoutVariant: "editorial",
    badgeLabel: "🗓️ Calendario de Mantenimiento",
    publishedAt: "2026-11-13",
    updatedAt: "2026-11-13",
    readTime: "6 min",
    author: "Redacción GuíaDeBarberías",
    authorRole: "Equipo Editorial de Barbería & Visagismo Masculino",
    imageUrl: "/images/blog-v3/cada-cuanto-cortarse-el-pelo.webp",
    imageAlt: "Calendario abierto junto a tijeras de barbero y peine sobre mesa de madera",
    imagePrompt:
      "Minimalist paper calendar planner open beside gleaming silver barber scissors and black comb on warm oak wood, morning sunlight, editorial photography, no readable text.",
    keyTakeaways: [
      "El cabello humano crece en promedio entre 1 y 1.3 cm al mes (~0.35 mm por día), pero la pérdida visual del corte depende del contraste en los laterales.",
      "Un Skin Fade (navaja o #0) pierde su limpieza en 10 a 14 días; un clásico a tijera mantiene buena estructura durante 4 a 5 semanas.",
      "Si estás dejándote crecer el cabello largo, igualmente conviene limpiar contornos y puntas cada 6 a 8 semanas para evitar el efecto desaliñado.",
    ],
    toc: [
      { id: "velocidad-crecimiento", label: "1. Cuánto crece el pelo en realidad cada semana" },
      { id: "frecuencia-por-estilo", label: "2. Frecuencia exacta según el tipo de corte que llevas" },
      { id: "trucos-alargar-visita", label: "3. Cómo lograr que tu corte luzca limpio una semana extra" },
      { id: "cuando-solo-retocar-contorno", label: "4. ¿Vale la pena pedir solo limpieza de patillas y nuca?" },
    ],
    content: `
      <p class="lead">
        ¿Por qué algunos amigos van a la barbería todos los sábados mientras otros mantienen un aspecto impecable visitando al estilista una vez al mes? La respuesta no tiene que ver con suerte genética sino con la altura y el contraste del corte elegido.
      </p>

      <h2 id="velocidad-crecimiento">1. Cuánto crece el pelo en realidad cada semana</h2>
      <p>
        En condiciones normales de salud, el cabello crece cerca de <strong>3 a 4 milímetros por semana</strong> (alrededor de 1.25 cm al mes). El detalle óptico está en los milímetros relativos: en la parte superior de 8 cm, un crecimiento de 4 mm pasa casi inadvertido; en cambio, en una sien rapada al 0.5 mm, crecer 4 mm equivale a multiplicar por ocho el largo inicial y borrar por completo el degradado limpio.
      </p>

      <h2 id="frecuencia-por-estilo">2. Frecuencia exacta según el tipo de corte que llevas</h2>
      <ul>
        <li><strong>Skin Fade / Navaja / Buzz Cut muy corto (cada 10 a 14 días):</strong> Cuando llevas blanco total en sienes, en dos semanas ya hay sombra gris uniforme y el degradado desaparece.</li>
        <li><strong>Mid Fade / Low Taper / French Crop (cada 2 a 3 semanas):</strong> Es el punto dulce más común entre quienes combinan imagen ejecutiva limpia con presupuesto mensual equilibrado.</li>
        <li><strong>Corte Clásico Ejecutivo a Tijera o Peine #3 (cada 3.5 a 5 semanas):</strong> Al conservar densidad homogénea desde los laterales hacia arriba, envejece con mucha mayor naturalidad sin crear líneas duras en las orejas.</li>
        <li><strong>Medias melenas, Shag o Mullet largo (cada 5 a 7 semanas):</strong> Solo requieres descargas estratégicas de peso en la nuca, patillas y contorno del pabellón auricular para que mantenga caída controlada.</li>
      </ul>

      <h2 id="trucos-alargar-visita">3. Cómo lograr que tu corte luzca limpio una semana extra</h2>
      <p>
        Si quieres espaciar tus citas de dos semanas a tres sin perder nitidez, solicita un <a href="/blog/taper-fade-clasico-vs-blowout-taper/"><strong>low taper fade en lugar de high skin fade</strong></a>; al concentrar la zona más corta únicamente en patilla y nuca, el crecimiento se integra de manera mucho más orgánica. Además, mantener la piel trasera del cuello limpia y aplicar una cantidad moderada de <a href="/blog/arcilla-mate-matte-clay-cabello-fino-graso/"><strong>arcilla mate para controlar remolinos</strong></a> disimula rápidamente las primeras semanas de volumen lateral.
      </p>

      <h2 id="cuando-solo-retocar-contorno">4. ¿Vale la pena pedir solo limpieza de patillas y nuca?</h2>
      <p>
        Muchísimas barberías ofrecen un servicio exprés llamado <em>limpieza de contornos o cerquillo</em> a mitad de precio. Si estás ahorrando largo arriba o preparándote para <a href="/blog/como-dejarse-crecer-el-pelo-hombre-sin-desorden/"><strong>dejarte crecer el pelo sin pasar por la etapa incómoda</strong></a>, acudir cada 3 semanas solo a perfilar contorno de orejas y nuca mantiene una presencia pulcra mientras la parte superior suma centímetros.
      </p>
    `,
    faqs: [
      {
        question: "¿Cortarse el pelo seguido hace que crezca más rápido o más grueso?",
        answer:
          "No. Cortar la fibra superficial no modifica el ritmo biológico de la raíz ni multiplica la cantidad de folículos. Lo que sí notas al cortar puntas abiertas o igualar largos es un aspecto más sano, tupido y homogéneo.",
      },
      {
        question: "¿Puedo pasarme la patillera solo en la nuca entre citas?",
        answer:
          "Puedes limpiar los pelitos bajos visibles debajo de la línea de corte frente a dos espejos, pero evita subir por tu cuenta la línea original de las sienes o terminarás alterando el degradado del barbero.",
      },
      {
        question: "¿En verano el pelo crece un poco más rápido?",
        answer:
          "Sí, estudios tricólogicos muestran una aceleración leve del crecimiento en meses cálidos por mayor vasodilatación superficial y exposición solar moderada, por lo que en enero-marzo en Perú podrías notar la nuca crecida unos días antes.",
      },
    ],
    relatedCitySlugs: ["lima", "trujillo", "piura", "arequipa"],
    hubSlug: "guia-visita-barberia",
  },
  {
    id: 11,
    slug: "barberia-vs-peluqueria-diferencias",
    title: "Barbería vs. Peluquería Unisex: Diferencias Reales en Técnica, Herramientas y Resultado",
    seoTitle: "Barbería vs. Peluquería: Qué Te Conviene Según Tu Corte y Largo",
    focusKeyword: "barberia vs peluqueria diferencias",
    excerpt:
      "¿Dónde ir si quieres un skin fade al ras o si te estás dejando crecer el cabello hasta los hombros? Comparamos formación, tijera, navaja y precios.",
    categorySlug: "experiencia-barberia",
    layoutVariant: "editorial",
    badgeLabel: "⚖️ Comparativa Técnica",
    publishedAt: "2026-11-13",
    updatedAt: "2026-11-13",
    readTime: "6 min",
    author: "Redacción GuíaDeBarberías",
    authorRole: "Equipo Editorial de Barbería & Visagismo Masculino",
    imageUrl: "/images/blog-v3/barberia-vs-peluqueria-diferencias.webp",
    imageAlt: "Sillón clásico de barbería frente a espejo moderno iluminado",
    imagePrompt:
      "Bright editorial interior of a classic dark-wood traditional barbershop chair next to sleek modern styling mirror aesthetic, photorealistic, warm natural light, no text.",
    keyTakeaways: [
      "La barbería domina el degradado milimétrico con máquina (fades), perfilado a navaja libre, diseño de barba masculina y líneas arquitectónicas.",
      "La peluquería estilista suele destacar en cortes medios y largos hechos íntegramente a tijera, caída fluida, rizos largos y colorimetría compleja.",
      "Hoy existen barberos visagistas con dominio híbrido de máquina y tijera larga; lo decisivo es revisar su portafolio real en fotos antes de reservar.",
    ],
    toc: [
      { id: "escuela-de-herramientas", label: "1. Escuela de máquina y navaja vs. escuela de tijera larga" },
      { id: "cuando-elegir-barberia", label: "2. Casos donde la barbería es imbatible" },
      { id: "cuando-elegir-estilista", label: "3. Cuándo conviene acudir a un salón o barbero especialista en tijera" },
      { id: "experiencia-y-precio", label: "4. Diferencias en ambiente, tiempos y tarifa promedio en Perú" },
    ],
    content: `
      <p class="lead">
        Elegir entre una barbería tradicional o moderna y una peluquería unisex no es cuestión de ego ni de moda: responden a dos oficios con formación históricamente distinta. Saber en qué destaca cada una evita pedir un fade quirúrgico donde casi no tocan máquina, o pedir capas fluidas de 15 centímetros donde cortan todo con peine guía.
      </p>

      <h2 id="escuela-de-herramientas">1. Escuela de máquina y navaja vs. escuela de tijera larga</h2>
      <p>
        El barbero contemporáneo entrena cientos de horas el control de palancas, peines intermedios, foil shavers y la anatomía de los huesos del cráneo para construir transiciones de color sin una sola línea marcada. Además, domina el <strong>ritual facial con toalla caliente, shavette y visagismo de barba</strong>.
      </p>
      <p>
        Por su parte, el estilista de peluquería dedica el grueso de su carrera a la geometría del cabello medio y largo trabajado a dedo y tijera (grados de elevación de 45°, 90°, texturizado interno, caída de ondas y química capilar avanzada).
      </p>

      <h2 id="cuando-elegir-barberia">2. Casos donde la barbería es imbatible</h2>
      <ul>
        <li>Cualquier variante de <strong>Low, Mid, High o Taper Fade</strong>.</li>
        <li><strong>Perfilado, rebajado o afeitado tradicional de barba</strong> y bigote.</li>
        <li>Cortes ejecutivos cortos, French Crop, Buzz Cut, Crew Cut o diseños de patilla limpia.</li>
        <li>Afeitado de cabeza completo o ritual facial con vapor de ozono.</li>
      </ul>

      <h2 id="cuando-elegir-estilista">3. Cuándo conviene acudir a un salón o barbero especialista en tijera</h2>
      <p>
        Si llevas el cabello por debajo de las orejas —estilo <em>flow</em>, melena mediana, <em>curtains</em> largos o rizos sueltos de más de 12 centímetros— necesitas a un profesional que corte toda la cabeza a tijera respetando la dirección del crecimiento sin apelar a entresacados bruscos. También es mejor opción para decoloraciones globales complejas o <a href="/blog/permanente-para-hombre-rizos-modernos/"><strong>permanentes de rizos masculinos</strong></a> si tu barbero habitual no tiene línea química certificada.
      </p>

      <h2 id="experiencia-y-precio">4. Diferencias en ambiente, tiempos y tarifa promedio en Perú</h2>
      <p>
        Una barbería de calidad suele ofrecer un bloque claro de 40 a 50 minutos enfocado exclusivamente en fisonomía masculina, con precios entre S/ 35 y S/ 75 en zonas céntricas. Muchos salones unisex cobran desde S/ 50 hasta S/ 120 por corte e incluyen lavado previo con sillón reclinable. Antes de elegir local, entra al perfil de Instagram del profesional que te atenderá (no solo el del local) y confirma que publica fotos reales de cortes similares al largo que tú llevas. Si tienes dudas antes de reservar en uno u otro formato, consulta nuestra <a href="/blog/primera-vez-barberia-premium-experiencia/"><strong>guía sobre qué incluye una barbería premium ejecutiva</strong></a> para comparar expectativas reales.
      </p>
    `,
    faqs: [
      {
        question: "¿Un barbero también sabe cortar cabello largo solo con tijera?",
        answer:
          "Los mejores barberos de autor combinan ambas escuelas ('barbería clásica y visagismo'). Verifica en sus trabajos publicados si muestran cortes de cabello medio/largo con movimiento natural y no exclusivamente fades rapados.",
      },
      {
        question: "¿Es más higiénico ir a una peluquería o a una barbería?",
        answer:
          "La higiene depende del protocolo del establecimiento, no del rubro. Exige siempre ver cuchillas nuevas selladas, esterilizador UV o barbicide azul y limpieza de máquinas frente a ti.",
      },
      {
        question: "¿Dónde arreglan mejor la barba en Perú?",
        answer:
          "En una barbería especializada: cuentan con sillones reclinables, toallas calientes, navajas de precisión y experiencia diaria en proporciones mandibulares masculinas.",
      },
    ],
    relatedCitySlugs: ["lima", "arequipa", "cusco", "chiclayo"],
    hubSlug: "guia-visita-barberia",
  },
  {
    id: 12,
    slug: "checklist-higiene-barberia-esterilizacion",
    title: "Checklist de Higiene en la Barbería: 7 Señales Obligatorias Antes de Dejar que Usen Navaja",
    seoTitle: "Higiene en Barbería: 7 Señales de Esterilización Que Debes Exigir",
    focusKeyword: "higiene y esterilizacion en barberia",
    excerpt:
      "Evita infecciones en el cuero cabelludo, foliculitis y hongos revisando estos 7 puntos concretos en el tocador del barbero antes de iniciar tu corte o afeitado.",
    categorySlug: "experiencia-barberia",
    layoutVariant: "editorial",
    badgeLabel: "🧼 Seguridad e Higiene",
    publishedAt: "2026-11-13",
    updatedAt: "2026-11-13",
    readTime: "6 min",
    author: "Redacción GuíaDeBarberías",
    authorRole: "Equipo Editorial de Barbería & Visagismo Masculino",
    imageUrl: "/images/blog-v3/checklist-higiene-barberia-esterilizacion.webp",
    imageAlt: "Esterilizador de barbería con tijeras metálicas, peines limpios y cuchillas selladas",
    imagePrompt:
      "Clean barbershop UV sterilizer cabinet glowing softly blue with sanitized steel scissors, metal combs, and sealed razor blade packs, studio light, photorealistic, no text.",
    keyTakeaways: [
      "Las cuchillas de navaja shavette son estrictamente de un solo uso por persona: el barbero debe abrir el empaque nuevo delante de ti.",
      "El papel cuello protector (neck strip) evita que la capa reutilizable roce directamente piel recién rasurada o con sudor.",
      "Las máquinas y foil shavers deben cepillarse y rociarse con spray desinfectante de grado barbería entre cada cliente, nunca guardarse con pelos adheridos.",
    ],
    toc: [
      { id: "cuchilla-nueva-frente-a-ti", label: "1. Empaque nuevo y desecho en contenedor rígido" },
      { id: "desinfeccion-peines-y-maquinas", label: "2. Qué pasa con los peines, tijeras y máquinas" },
      { id: "papel-cuello-y-toallas", label: "3. Papel protector desechable y toallas limpias" },
      { id: "senal-de-alarma-inmediata", label: "4. Tres señales para agradecer e irte antes de sentarte" },
    ],
    content: `
      <p class="lead">
        La estética de una barbería —luces LED, música, café de cortesía— no garantiza que cumplan las normas básicas de bioseguridad. Dado que las máquinas tocan microheridas casi invisibles y la navaja trabaja a ras de la epidermis, una mala higiene puede desencadenar desde foliculitis molesta hasta infecciones micóticas en la nuca.
      </p>

      <h2 id="cuchilla-nueva-frente-a-ti">1. Empaque nuevo y desecho en contenedor rígido</h2>
      <p>
        Es la regla número uno e innegociable: <strong>el barbero debe partir e insertar la hoja nueva frente a tu mirada</strong>, sacándola de su sobrecito individual sellado, y arrojar la usada a un contenedor rígido de bioseguridad (nunca a la basura común junto a servilletas). Si ves una shavette ya armada apoyada sobre el tocador cuando te sientas, pide amablemente que la cambien delante de ti.
      </p>

      <h2 id="desinfeccion-peines-y-maquinas">2. Qué pasa con los peines, tijeras y máquinas</h2>
      <ol>
        <li><strong>Frasco desinfectante o cabina UV:</strong> Los peines y tijeras libres de pelo visible deben pasar por solución bactericida profesional (como Barbicide) o gabinete ultravioleta entre citas.</li>
        <li><strong>Limpieza de cuchillas y foil shaver:</strong> Tras el cliente anterior, el barbero debe cepillar el cabezal desmontado de la máquina, aplicar spray desinfectante-lubricante (por ejemplo Cool Care o similar) y respetar su tiempo de acción antes de apoyarlo en tu piel.</li>
        <li><strong>Brocha talquera vs. aire frío:</strong> Hoy muchos locales serios reemplazan la vieja brocha compartida llena de pelos por servilletas desechables o soplador de aire limpio, mucho más higiénico en el cuello.</li>
      </ol>

      <h2 id="papel-cuello-y-toallas">3. Papel protector desechable y toallas limpias</h2>
      <p>
        La capa negra cubre decenas de clientes al día. Exige que coloquen una banda elástica de <strong>papel cuello desechable</strong> antes de abrochar la capa; actúa como barrera sanitaria para la zona más sensible del corte. Asimismo, cada toalla caliente o fría debe salir limpia y seca del calentador o conservador sin olores a humedad encerrada.
      </p>

      <h2 id="senal-de-alarma-inmediata">4. Tres señales para agradecer e irte antes de sentarte</h2>
      <ul>
        <li>Cuchillas metálicas de máquina cubiertas de restos secos de cera o pelo en la estación libre.</li>
        <li>Un sillón sin limpiar o una capa arrugada sobre el apoya-brazos con residuos del cliente previo.</li>
        <li>Reutilización directa de toallas apenas sacudidas o piedras de alumbre pasadas sin enjuagar ni desinfectar (el alumbre debe venir en spray individual o barra desinfectada correctamente, como explicamos en nuestra <a href="/blog/piedra-de-alumbre-beneficios-y-como-usarla-post-afeitado/"><strong>guía sobre piedra de alumbre en el afeitado</strong></a>).</li>
      </ul>
      <p>
        Cuidar dónde pones tu piel es tan importante como el estilo mismo. Para elegir locales confiables con reseñas verificadas en tu distrito, revisa nuestro listado ordenado por calificación en el <a href="/#ranking-peru"><strong>ranking de barberías del Perú</strong></a>.
      </p>
    `,
    faqs: [
      {
        question: "¿El alcohol común al 70% sirve para desinfectar las máquinas de barbería?",
        answer:
          "El alcohol reseca y oxida prematuramente los metales de precisión y tarda más frente a ciertos hongos. Las barberías profesionales emplean aerosoles desinfectantes 5-en-1 específicos para cuchillas que no corroen el filo y líquidos germicidas de grado salón para peines y tijeras.",
      },
      {
        question: "¿Qué es la foliculitis de la nuca y cómo evitarla tras ir a la barbería?",
        answer:
          "Es la inflamación de los folículos por bacterias o vellos encarnados tras un corte muy al ras en la nuca. Se previene con desinfección correcta de la foil shaver, no pidiendo rasurado excesivo a contrapelo si tu piel es sensible y lavando la zona al llegar a casa.",
      },
      {
        question: "¿Está mal llevar mis propias máquinas si soy muy exigente con la higiene?",
        answer:
          "En absoluto; algunos clientes frecuentes con piel muy atópica acuerdan con su barbero de confianza llevar su propio set de peines o su propia shaver personal para mayor tranquilidad.",
      },
    ],
    relatedCitySlugs: ["lima", "arequipa", "trujillo", "callao"],
    hubSlug: "guia-visita-barberia",
  },
  {
    id: 13,
    slug: "que-hacer-si-barbero-corto-mal",
    title: "¿El Barbero Te Cortó Mal el Pelo? Cómo Arreglarlo Con Dignidad Sin Raparte a Cero",
    seoTitle: "¿Te Cortaron Mal el Pelo? Cómo Arreglar un Mal Corte en Barbería",
    focusKeyword: "que hacer si el barbero me corto mal",
    excerpt:
      "Pasos prácticos en las primeras 48 horas tras un corte desastroso: cómo hablar en el local, trucos de peinado temporales y qué estilo elegir para rescatarlo.",
    categorySlug: "experiencia-barberia",
    layoutVariant: "editorial",
    badgeLabel: "🆘 Rescate de Estilo",
    publishedAt: "2026-11-13",
    updatedAt: "2026-11-13",
    readTime: "6 min",
    author: "Redacción GuíaDeBarberías",
    authorRole: "Equipo Editorial de Barbería & Visagismo Masculino",
    imageUrl: "/images/blog-v3/que-hacer-si-barbero-corto-mal.webp",
    imageAlt: "Hombre examinando su corte desigual frente al espejo con luz natural",
    imagePrompt:
      "Young man touching the side of his uneven haircut thoughtfully in front of a bright bathroom mirror, candid realistic editorial portrait, no text.",
    keyTakeaways: [
      "No tomes tijeras ni máquina en tus manos la primera noche por frustración: nueve de cada diez intentos de auto-arreglo terminan obligando a un rapado.",
      "Los defectos más comunes (fade escalonado o coronilla demasiado corta) tienen rescate limpio pidiendo una descarga suave o cambiando a textura desestructurada.",
      "Espera 7 a 10 días antes de juzgar definitivamente un corte demasiado corto; el pelo crece 3 mm esa semana y suaviza líneas duras.",
    ],
    toc: [
      { id: "respirar-y-evaluar", label: "1. Diagnóstico en frío: qué falló exactamente" },
      { id: "solucion-en-mismo-local", label: "2. ¿Conviene volver a reclamar en la misma barbería?" },
      { id: "rescates-segun-el-error", label: "3. Soluciones exactas según el tipo de estropicio" },
      { id: "peinado-transicion", label: "4. Trucos de peinado durante las primeras dos semanas" },
    ],
    content: `
      <p class="lead">
        A casi todos nos ha pasado alguna vez: salimos con una línea mal borrada en la sien, un flequillo mordido dos centímetros más corto de lo pedido o los laterales asimétricos. Aunque en ese minuto parezca irreversible, casi todo corte fallido se puede equilibrar sin recurrir al #1 parejo.
      </p>

      <h2 id="respirar-y-evaluar">1. Diagnóstico en frío: qué falló exactamente</h2>
      <p>
        Al llegar a casa, lava tu cabello para retirar la cantidad extra de cera o laca con la que suelen disimular defectos en la silla. Con el pelo limpio y seco bajo luz blanca, identifica qué falla ocurrió:
      </p>
      <ul>
        <li><strong>Error de contraste / línea dura (hongo o escalón):</strong> Faltó difuminar la transición entre los lados y la parte superior.</li>
        <li><strong>Flequillo demasiado corto o trasquilado:</strong> Cortaron en recto en lugar de texturizar en punta.</li>
        <li><strong>Fade subido demasiado alto en un lado respecto al otro:</strong> Desnivelación de altura entre perfil derecho e izquierdo.</li>
      </ul>

      <h2 id="solucion-en-mismo-local">2. ¿Conviene volver a reclamar en la misma barbería?</h2>
      <p>
        Toda barbería seria respalda su trabajo durante las primeras 48 horas. Escribe de forma educada con una foto clara bajo luz natural, sin insultos, explicando la asimetría o el escalón visible. Pide si el <strong>barbero principal o encargado</strong> puede hacer el ajuste de cortesía (si perdiste la confianza en quien te atendió, solicita cortésmente cambio de sillón). Si el local muestra mala actitud o el daño fue por falta clara de pericia en degradados, es mejor invertir en un especialista distinto con buenas reseñas.
      </p>

      <h2 id="rescates-segun-el-error">3. Soluciones exactas según el tipo de estropicio</h2>
      <ol>
        <li><strong>Fade lleno de manchas oscuras o escalones:</strong> Se corrige en 15 minutos con peines intermedios (#0.5 y #1.5) y tijera sobre peine conectando la corona con los parietales.</li>
        <li><strong>Flequillo cortísimo e irregular:</strong> Aplica textura con <em>point cutting</em> en las puntas y péinalo hacia arriba y a un lado con arcilla mate, evitando pegarlo a la frente donde se nota el trasquilón horizontal.</li>
        <li><strong>Asimetría marcada entre sienes:</strong> Iguala al lado más alto si aún queda margen en la cresta parietal, o transforma el conjunto en un <strong>French Crop muy corto o Buzz Cut con Mid Fade</strong> proyectando seguridad intencional.</li>
      </ol>

      <h2 id="peinado-transicion">4. Trucos de peinado durante las primeras dos semanas</h2>
      <p>
        Mientras recupera esos 5 milímetros salvadores en diez días, sustituye el gel húmedo (que abre huecos y delata cada corte disparejo) por <a href="/blog/polvo-texturizador-como-aplicarlo-volumen/"><strong>polvo texturizador mate</strong></a> o <a href="/blog/sea-salt-spray-ondas-naturales-playa-hombre/"><strong>sea salt spray</strong></a> para crear desorden controlado con volumen uniforme. Y para la próxima cita, lleva nuestro <a href="/blog/como-explicar-corte-al-barbero/"><strong>guion de 4 puntos para hablar con tu barbero</strong></a> y evitar repetir el mal rato.
      </p>
    `,
    faqs: [
      {
        question: "¿Cuánto tarda en recuperarse un corte donde se excedieron dos centímetros?",
        answer:
          "En alrededor de 3 a 4 semanas recuperas cerca de 1 cm a 1.3 cm, suficiente para reestructurar un nuevo corte limpio en un especialista de confianza.",
      },
      {
        question: "¿Es cierto que mojar y secar con secador disimula las mordidas en el flequillo?",
        answer:
          "Sí. Secar hacia arriba con aire tibio y cepillo crea elevación natural y rompe la línea horizontal rígida en la frente.",
      },
      {
        question: "¿Las gorras retrasan la recuperación del cabello después de un mal corte?",
        answer:
          "Usar gorra limpia en exteriores no frena el crecimiento folicular, siempre que la laves periódicamente y dejes respirar el cuero cabelludo al llegar a casa.",
      },
    ],
    relatedCitySlugs: ["lima", "arequipa", "callao", "trujillo"],
    hubSlug: "guia-visita-barberia",
  },
  {
    id: 14,
    slug: "como-reservar-cita-barberia-lima",
    title: "Cómo Reservar Cita en una Barbería en Lima Sin Perder Tu Sábado ni Llegar a Espera Infinita",
    seoTitle: "Cómo Reservar Cita en Barberías de Lima: Horarios y Consejos",
    focusKeyword: "como reservar cita barberia lima",
    excerpt:
      "Evita esperas de dos horas los fines de semana: cuáles son los mejores días para agendar en Lima, cómo verificar reseñas reales y qué revisar en reservas por WhatsApp o app.",
    categorySlug: "experiencia-barberia",
    layoutVariant: "editorial",
    badgeLabel: "📅 Reservas & Agenda",
    publishedAt: "2026-11-13",
    updatedAt: "2026-11-13",
    readTime: "5 min",
    author: "Redacción GuíaDeBarberías",
    authorRole: "Equipo Editorial de Barbería & Visagismo Masculino",
    imageUrl: "/images/blog-v3/como-reservar-cita-barberia-lima.webp",
    imageAlt: "Manos reservando cita de barbería en smartphone sobre mesa de madera",
    imagePrompt:
      "Close-up of a man's hands tapping a calendar booking screen on a modern smartphone on a cafe wooden table beside an espresso cup, warm daylight, realistic photography, no text.",
    keyTakeaways: [
      "En Lima Metropolitana, entre el jueves a las 4:00 PM y el sábado a las 6:00 PM se concentra más del 65% de la demanda semanal.",
      "Agendar martes o miércoles entre 10:00 AM y 2:00 PM garantiza sillón disponible, cero apuros y mejor atención en detalles.",
      "Reserva siempre con el nombre específico del barbero cuyo trabajo te gustó, no solo 'con el primero disponible'.",
    ],
    toc: [
      { id: "mejores-horarios-lima", label: "1. Mejores días y horas para ir sin colas en Lima" },
      { id: "evaluar-resenas-antes", label: "2. Cómo filtrar reseñas falsas y elegir al barbero correcto" },
      { id: "apps-vs-whatsapp", label: "3. Reservas por app vs. WhatsApp y abonos previos" },
      { id: "plan-para-dias-pico", label: "4. Si solo puedes ir viernes o sábado, haz esto" },
    ],
    content: `
      <p class="lead">
        Pocas cosas frustran más un fin de semana que llegar a una barbería recomendada sin cita, escuchar "tienes 5 adelante" y perder toda la mañana mirando una pantalla. En ciudades con tráfico intenso como Lima, reservar con estrategia ahorra horas y eleva la calidad de tu corte.
      </p>

      <h2 id="mejores-horarios-lima">1. Mejores días y horas para ir sin colas en Lima</h2>
      <p>
        Los picos de saturación en distritos como Miraflores, Surco, San Isidro, Los Olivos y San Miguel siguen un patrón predecible: viernes después de la oficina (5:00 PM – 8:30 PM) y sábados entre 11:00 AM y 5:00 PM. Si tu trabajo remoto o horario flexible te permite acudir un <strong>martes o miércoles por la mañana o primera hora de la tarde</strong>, encontrarás barberos descansados, sin presión del reloj por el siguiente turno y con agenda totalmente abierta.
      </p>

      <h2 id="evaluar-resenas-antes">2. Cómo filtrar reseñas falsas y elegir al barbero correcto</h2>
      <p>
        Al revisar locales en nuestra sección de <a href="/ciudad/lima/"><strong>barberías verificadas en Lima</strong></a>, no te fijes únicamente en la nota global de estrellas. Ordena los comentarios recientes en Google Maps y busca tres indicios positivos:
      </p>
      <ul>
        <li>Clientes que repiten y nombran a un barbero concreto ("excelente fade con Carlos").</li>
        <li>Comentarios que elogian la puntualidad real del turno pactado.</li>
        <li>Menciones claras sobre higiene de estaciones y asesoría honesta.</li>
      </ul>

      <h2 id="apps-vs-whatsapp">3. Reservas por app vs. WhatsApp y abonos previos</h2>
      <p>
        Cada vez más barberías limeñas trabajan con sistemas online (Fresha, Booksy o agenda web propia) o confirmación por WhatsApp con un adelanto parcial de S/ 10 a S/ 20 por Yape en horas punta. Mientras el comercio esté verificado en Google Maps y reciba pagos a nombre del titular o razón social oficial del local, el adelanto suele descontarse íntegramente del servicio y evita ausencias injustificadas. Consulta siempre la política de reprogramación (habitualmente hasta 3 o 4 horas antes) antes de transferir.
      </p>

      <h2 id="plan-para-dias-pico">4. Si solo puedes ir viernes o sábado, haz esto</h2>
      <p>
        Agenda con <strong>3 a 4 días de anticipación</strong> (el martes ya separa tu cupo del sábado por la mañana). Prefiere el primer turno de apertura (9:30 AM o 10:00 AM): aún no se han acumulado retrasos en cadena de otros clientes ni hay embotellamientos severos en avenidas principales. Para preparar tu consulta en segundos cuando llegues, ten a la mano las pautas de nuestra <a href="/blog/guia-visita-barberia/"><strong>guía previa a la visita a la barbería</strong></a>.
      </p>
    `,
    faqs: [
      {
        question: "¿Qué barberías atienden por orden de llegada sin cita en Lima?",
        answer:
          "Muchas barberías tradicionales y de barrio atienden exclusivamente por orden de llegada, mientras que las barberías boutique y ejecutivas priorizan agenda confirmada y atienden sin cita solo en huecos disponibles.",
      },
      {
        question: "¿Conviene reservar el servicio 'corte + barba' en un solo bloque?",
        answer:
          "Sí, indícalo desde el mensaje de reserva; si solo reservas 'corte' (40 min) y en el sillón pides barba con toalla caliente, es probable que el barbero no alcance por tener otro cliente justo después.",
      },
      {
        question: "¿Qué hago si voy a provincia o necesito una opción rápida cerca de mi oficina?",
        answer:
          "Usa el botón de ubicación automática en nuestra página de barberías cerca de ti para listar las opciones más próximas con su puntuación real.",
      },
    ],
    relatedCitySlugs: ["lima", "callao", "arequipa", "trujillo"],
    hubSlug: "guia-visita-barberia",
  },
  {
    id: 15,
    slug: "primera-vez-barberia-premium-experiencia",
    title: "Primera Vez en una Barbería Premium: Qué Incluye el Servicio y Cuándo Vale la Pena Pagar Más",
    seoTitle: "Primera Vez en una Barbería Premium: Qué Esperar y Si Vale la Pena",
    focusKeyword: "primera vez en barberia premium que incluye",
    excerpt:
      "Qué diferencia realmente a una barbería de S/ 25 de una de S/ 70 o S/ 90: diagnóstico craneal, lavado, vapor de ozono, café, garantías y cuándo justifica el gasto.",
    categorySlug: "experiencia-barberia",
    layoutVariant: "editorial",
    badgeLabel: "⭐ Experiencia Boutique",
    publishedAt: "2026-11-13",
    updatedAt: "2026-11-13",
    readTime: "6 min",
    author: "Redacción GuíaDeBarberías",
    authorRole: "Equipo Editorial de Barbería & Visagismo Masculino",
    imageUrl: "/images/blog-v3/primera-vez-barberia-premium-experiencia.webp",
    imageAlt: "Interior elegante de barbería premium con sillones de cuero coñac y luz cálida",
    imagePrompt:
      "Upscale modern barbershop lounge with espresso machine, vintage cognac leather barber chairs, and warm brass wall sconces, architectural editorial photography, no text.",
    keyTakeaways: [
      "El valor real de una barbería premium no está en el whisky de cortesía sino en los 45 a 60 minutos dedicados al diagnóstico de cráneo, corte personalizado a tijera y acabado sin apuros.",
      "Un servicio boutique suele incluir lavado capilar previo o posterior para eliminar pelitos sueltos, masaje cervical breve y asesoría de peinado real.",
      "Justifica la inversión especialmente antes de entrevistas, bodas, eventos o cuando quieres rediseñar por completo tu imagen actual.",
    ],
    toc: [
      { id: "diferencias-tangibles", label: "1. Más allá del café: las 5 diferencias técnicas reales" },
      { id: "paso-a-paso-experiencia", label: "2. Recorrido típico de 60 minutos en una barbería ejecutiva" },
      { id: "cuando-vale-la-pena", label: "3. Cuándo invertir en una premium vs. mantener tu rutina en una estándar" },
      { id: "como-no-pagar-de-mas", label: "4. Cómo detectar un local 'caro por postura' de uno realmente técnico" },
    ],
    content: `
      <p class="lead">
        En los últimos años se han multiplicado las barberías de concepto ejecutivo con sillones italianos, música ambiental y tarifas que duplican o triplican las de un corte clásico. Si estás pensando en darte el gusto por primera vez, conviene saber qué estás pagando realmente y dónde notarás la mejora en el espejo.
      </p>

      <h2 id="diferencias-tangibles">1. Más allá del café: las 5 diferencias técnicas reales</h2>
      <ul>
        <li><strong>Tiempo asignado al turno:</strong> Mientras un local de alto volumen apunta a despachar cortes en 20 o 25 minutos, una barbería premium reserva 45 a 60 minutos por cliente para pulir detalles microscópicos en el degradado y texturizar cada sección en seco y en húmedo.</li>
        <li><strong>Diagnóstico de visagismo real:</strong> Analizan proporción de mandíbula, entradas, forma occipital y dirección natural de tus remolinos antes de proponer una altura de fade.</li>
        <li><strong>Lavado en sillón reclinable:</strong> Evitas volver a la oficina o a una cena con el cuello picando por pelos cortos atrapados bajo la camisa.</li>
        <li><strong>Cosmética y bioseguridad superior:</strong> Uso de aceites pre-shave suaves, bálsamos calmantes sin exceso de alcohol y toallas aromáticas con vapor de ozono.</li>
        <li><strong>Educación de peinado en casa:</strong> Te muestran exactamente cuánta cantidad de cera o arcilla aplicar y en qué dirección secar para replicar el acabado al día siguiente.</li>
      </ul>

      <h2 id="paso-a-paso-experiencia">2. Recorrido típico de 60 minutos en una barbería ejecutiva</h2>
      <p>
        Al llegar, confirmas tu cita en recepción mientras el barbero recibe tus referencias frente al espejo. Comienza el corte con máquina y tijera, se realiza un lavado capilar tibio para limpiar fibras y evaluar la caída limpia del pelo ya descargado, continúa el secado con aire y peine para pulir cualquier pelito rebelde y finaliza con sellado de contornos o toalla fría en la nuca.
      </p>

      <h2 id="cuando-vale-la-pena">3. Cuándo invertir en una premium vs. mantener tu rutina en una estándar</h2>
      <p>
        No es indispensable gastar S/ 80 cada quince días si solo buscas rebajar un número #2 clásico que ya conoces. Sin embargo, pagar una sesión en una barbería de alto nivel vale muchísimo la pena cuando deseas <strong>cambiar de estilo desde cero</strong> (por ejemplo pasar de pelo largo a un corte moderno bien equilibrado), antes de una <a href="/blog/corte-entrevista-trabajo-ejecutivo/"><strong>entrevista ejecutiva</strong></a> o para prepararte para un <a href="/blog/corte-y-barba-novio-boda-cronograma/"><strong>matrimonio o evento formal</strong></a>. Muchos hombres combinan ambos mundos: van al especialista premium para diseñar la estructura base y mantienen su corte cada dos o tres semanas en una barbería práctica de su distrito.
      </p>

      <h2 id="como-no-pagar-de-mas">4. Cómo detectar un local 'caro por postura' de uno realmente técnico</h2>
      <p>
        La decoración costosa nunca reemplaza la mano del barbero. Antes de pagar una tarifa alta, comprueba que los perfiles individuales del staff muestran transiciones limpias <em>sin filtros exagerados ni exceso de aerógrafo negro artificial en la frente</em> y que los cortes siguen viéndose equilibrados sin medio frasco de laca encima.
      </p>
    `,
    faqs: [
      {
        question: "¿Tengo que consumir alguna bebida alcohólica si la ofrecen de cortesía?",
        answer:
          "En absoluto; siempre ofrecen agua, café espresso o infusiones como alternativa sin compromiso.",
      },
      {
        question: "¿Incluyen arreglo de cejas en los paquetes premium?",
        answer:
          "Muchos combos ejecutivos incluyen limpieza ligera de entrecejo o pelitos largos con tijera, aunque un diseño más detallado con hilo o cera suele cotizarse aparte o como complemento breve.",
      },
      {
        question: "¿Cuánto cuesta un servicio premium promedio en Perú?",
        answer:
          "Dependiendo de la ciudad y el distrito, un corte boutique ronda entre S/ 50 y S/ 85, mientras que un ritual integral de cabello, barba con vapor de ozono y limpieza facial suele ubicarse entre S/ 95 y S/ 150.",
      },
    ],
    relatedCitySlugs: ["lima", "arequipa", "cusco", "trujillo"],
    hubSlug: "guia-visita-barberia",
  },
];
