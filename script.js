// Manu Élagage : site vitrine statique (accueil, l'élagage, nos chantiers, contact), routage par #/.

// ── Coordonnées : à vérifier / compléter avec Manu ──────────────────────────────
// Téléphone et adresse : fiche PagesJaunes de « Manu Elagage 83 ». E-mail : à fournir (provisoire).
// Logo : déposer le vrai fichier dans assets/ puis indiquer son nom ici (ex. 'assets/logo.png').
const CONFIG = {
  logo: 'assets/logo-mark.svg',
  phone: '06 80 91 25 66',
  email: 'manuelagage@xxx.com',
  address: ['1831 chemin de la Tuilière', '83440 Tourrettes'],
  hours: 'Du lundi au vendredi, 8 h – 18 h',
  siret: '880 357 025 00019',
  manager: 'Manu Saquet',
};

const $ = (s, root = document) => root.querySelector(s);
const $$ = (s, root = document) => [...root.querySelectorAll(s)];
const tel = CONFIG.phone.replace(/\s/g, '');
const telIntl = '+33' + tel.slice(1);

// ── Icônes (traits simples, couleur héritée) ───────────────────────────────────
const icon = {
  rigueur: '<path d="M4 20h16M6 20V9l6-5 6 5v11M10 20v-5h4v5"/>',
  proprete: '<path d="M4 20c4-1 6-4 7-9M11 11l7-7M14 4h4v4M6 14l4 4"/>',
  efficacite: '<path d="M13 3 5 14h6l-1 7 8-11h-6z"/>',
  client: '<circle cx="12" cy="8" r="4"/><path d="M4 21c1-4 4-6 8-6s7 2 8 6"/>',
  qualite: '<path d="m12 3 2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.4 6.8 19.1l1-5.8L3.5 9.2l5.9-.9z"/>',
  arbre: '<path d="M12 21v-7M12 14l-3-3M12 15l3-3"/><path d="M7 11a5 5 0 1 1 10 0 4 4 0 0 1-1 7H8a4 4 0 0 1-1-7z"/>',
  scie: '<path d="M3 17 14 6l4 4L7 21H3z"/><path d="m14 6 2-2 4 4-2 2"/>',
  palmier: '<path d="M12 21c0-5 1-9 0-12M12 9C9 6 5 6 3 8M12 9c3-3 7-3 9-1M12 9c-1-3-4-5-7-5M12 9c1-3 4-5 7-5"/>',
  corde: '<path d="M12 2v6M12 8a3 3 0 1 1 0 6 3 3 0 0 1 0-6M12 14v8M8 22h8"/>',
  feu: '<path d="M12 22a7 7 0 0 0 7-7c0-5-5-6-5-12-3 2-6 6-6 10a3 3 0 0 1-2-2 7 7 0 0 0 6 11z"/>',
  haie: '<path d="M3 20h18M5 20v-6a3 3 0 0 1 3-3 3 3 0 0 1 4-2 3 3 0 0 1 4 2 3 3 0 0 1 3 3v6"/>',
  nacelle: '<path d="M4 21h8M6 21v-3h4v3M8 18 18 6M15 4h6v5h-6z"/>',
  casque: '<path d="M4 16a8 8 0 0 1 16 0zM2 16h20v2H2zM12 8V5"/>',
  balise: '<path d="M6 21 12 3l6 18M8 15h8M9.5 10h5"/>',
  check: '<path d="m4 12 5 5L20 6"/>',
  tel: '<path d="M6.6 10.8a15 15 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1z"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
  pin: '<path d="M12 21s7-6 7-12a7 7 0 0 0-14 0c0 6 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/>',
  horloge: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  fleche: '<path d="M5 12h14M13 6l6 6-6 6"/>',
};
const ico = (name, size = 24) => `<svg class="ico" viewBox="0 0 24 24" width="${size}" height="${size}" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${icon[name]}</svg>`;

// ── Données ─────────────────────────────────────────────────────────────────────
const HERO = ['hero-1', 'hero-2', 'hero-3', 'hero-4'];

const SERVICES = [
  { i: 'arbre', t: 'Élagage & taille douce', d: 'Taille raisonnée, éclaircie, relevé ou réduction de couronne : l’arbre allégé, sain et en sécurité.' },
  { i: 'scie', t: 'Abattage & démontage', d: 'Arbres dangereux ou trop proches du bâti : démontage pièce par pièce, par rétention, en zone difficile.' },
  { i: 'palmier', t: 'Palmiers & oliviers', d: 'Nettoyage et toilettage de palmiers, taille d’oliviers et des essences méditerranéennes.' },
  { i: 'corde', t: 'Haubanage', d: 'Consolidation de charpentières fragiles par haubans, pour conserver un arbre plutôt que l’abattre.' },
  { i: 'feu', t: 'Débroussaillement', d: 'Obligations légales de débroussaillement (OLD) autour des habitations, défrichage de terrains.' },
  { i: 'haie', t: 'Haies & arbustes', d: 'Taille, entretien, élagage ou abattage de haies ; taille d’arbustes et taille ornementale.' },
  { i: 'nacelle', t: 'Grande hauteur', d: 'Élagage en grande hauteur, sur cordes ou avec nacelle, pour les sujets les plus imposants.' },
];

const VALEURS = [
  { i: 'rigueur', t: 'Rigueur', d: 'Un diagnostic avant chaque intervention, un devis clair, et des coupes faites dans les règles de l’art.' },
  { i: 'proprete', t: 'Propreté', d: 'Branches retenues, pelouses et toitures protégées, chantier ramassé et nettoyé avant de partir.' },
  { i: 'efficacite', t: 'Efficacité', d: 'Une intervention rapide et organisée, y compris après un coup de vent, avec le bon matériel.' },
];

const OBJECTIFS = [
  { i: 'client', t: 'Votre satisfaction', d: 'Écouter ce que vous attendez de vos arbres, vous conseiller franchement et tenir les délais annoncés.' },
  { i: 'qualite', t: 'La qualité du travail', d: 'Des tailles nettes et réfléchies, un résultat esthétique qui se voit encore plusieurs saisons après.' },
  { i: 'arbre', t: 'Le respect de l’arbre', d: 'Tailler juste ce qu’il faut. Un arbre bien taillé vit plus longtemps et reste plus sûr.' },
];

const ZONES = {
  'Var (83)': ['Tourrettes', 'Fayence', 'Montauroux', 'Callian', 'Seillans', 'Saint-Paul-en-Forêt', 'Bagnols-en-Forêt', 'Mons', 'Fréjus', 'Saint-Raphaël', 'Draguignan'],
  'Alpes-Maritimes (06)': ['Grasse', 'Le Tignet', 'Peymeinade', 'Saint-Cézaire-sur-Siagne', 'Cabris', 'Mougins', 'Mandelieu-la-Napoule', 'Cannes', 'Le Cannet', 'Antibes'],
};

// Chantiers d'exemple (photos d'illustration) : à remplacer par les vrais chantiers et photos de Manu.
const CHANTIERS = [
  { img: 'pin-demontage', cat: 'particuliers', lieu: 'Fayence (83)', type: 'Démontage', t: 'Démontage d’un pin au-dessus d’une maison', d: 'Pin penché vers la toiture : démontage par tronçons retenus sur cordes, sans rien poser sur le toit. Bois débité et laissé au propriétaire.' },
  { img: 'palmier', cat: 'particuliers', lieu: 'Mandelieu-la-Napoule (06)', type: 'Palmiers', t: 'Toilettage de palmiers en résidence', d: 'Grimpe sur le stipe, retrait des palmes sèches et des hampes florales, évacuation complète des déchets.' },
  { img: 'platanes', cat: 'envergure', lieu: 'Grasse (06)', type: 'Taille raisonnée', t: 'Alignement de platanes', d: 'Taille d’entretien sur un alignement, avec désinfection des outils entre chaque arbre (lutte contre le chancre coloré).' },
  { img: 'nacelle', cat: 'envergure', lieu: 'Montauroux (83)', type: 'Nacelle', t: 'Domaine privé : élagage en nacelle', d: 'Relevé de couronne de grands chênes le long des allées, circulation balisée et chantier nettoyé chaque soir.' },
  { img: 'pinede', cat: 'envergure', lieu: 'Callian (83)', type: 'Débroussaillement', t: 'Mise en conformité OLD d’une copropriété', d: 'Débroussaillement à 50 m des bâtiments, élagage des pins jusqu’à 2 m du sol, mise à distance des houppiers.' },
  { img: 'chene', cat: 'particuliers', lieu: 'Tourrettes (83)', type: 'Taille douce', t: 'Taille douce d’un chêne centenaire', d: 'Retrait du bois mort et éclaircie légère pour redonner de la lumière au jardin, sans mutiler l’arbre.' },
  { img: 'palmier-corse', cat: 'particuliers', lieu: 'Cannes (06)', type: 'Palmiers', t: 'Palmier des Canaries en façade', d: 'Nettoyage de la couronne au ras d’une façade, avec protection des menuiseries et de la terrasse.' },
  { img: 'grimpeur', cat: 'particuliers', lieu: 'Seillans (83)', type: 'Mise en sécurité', t: 'Arbre fragilisé après un coup de vent', d: 'Intervention le lendemain de l’appel : branche cassée démontée, arbre allégé et haubané.' },
];

const CREDITS = [
  ['hero-1', 'Bryan Ledgard', 'CC BY 2.0', 'Ben_Salter,_tree_surgeon_(11083310774).jpg'],
  ['hero-2', 'TreeMinion15', 'CC BY-SA 4.0', 'Tree_Pruning.jpg'],
  ['hero-3', 'TreeMinion15', 'CC BY-SA 4.0', 'Stephane_Climbing.jpg'],
  ['hero-4', 'TreeMinion15', 'CC BY-SA 4.0', 'Tree_Climbing_Arborist.jpg'],
  ['palmier', 'Bachelot Pierre J-P', 'CC BY-SA 3.0', 'Arboriste-grimpeur.jpg'],
  ['palmier-corse', 'Isiwal', 'CC BY-SA 3.0', 'Corsica_Ajaccio_Phoenix_canariensis_arborist_at_work.jpg'],
  ['platanes', 'Kritzolina', 'CC BY-SA 4.0', 'Plane_trees_in_Sóller_being_pruned_02.jpg'],
  ['pinede', 'Johnjohn83var', 'Domaine public', 'Pinède.JPG'],
  ['pin-parasol', 'Tangopaso', 'Domaine public', 'Plage_du_Pansard_-_Pin_parasol.jpg'],
  ['nacelle', 'USCapitol', 'Domaine public', 'Flickr_-_USCapitol_-_AOC_Arborist_at_work.jpg'],
  ['pin-demontage', 'Jiří Sedláček', 'CC BY-SA 4.0', 'Arborist_working_at_tree_near_Třebíč,_Třebíč_District.jpg'],
  ['chene', 'Capella Tree', 'CC BY-SA 4.0', 'Arborist.jpg'],
  ['grimpeur', 'Theblaynster', 'CC BY-SA 4.0', 'Tree_Climber.jpg'],
  ['cordes', 'Yuliya Krasylenko', 'CC BY 4.0', 'Arborist_climbing_on_the_tree.jpg'],
];

// ── Morceaux réutilisés ─────────────────────────────────────────────────────────
const img = name => `assets/${name}.jpg`;
const kicker = text => `<p class="kicker">${text}</p>`;
const cta = (label = 'Demander un devis') => `<a class="btn btn--leaf" href="#/contact">${label} ${ico('fleche', 18)}</a>`;
const callBtn = cls => `<a class="btn ${cls}" href="tel:${telIntl}">${ico('tel', 18)} ${CONFIG.phone}</a>`;

const bandeDevis = () => `
  <section class="band band--forest reveal">
    <div class="wrap band__inner">
      <div>
        <h2 class="h2">Un arbre à tailler, un doute sur sa tenue ?</h2>
        <p>Manu se déplace pour voir l’arbre, vous conseille et vous remet un devis détaillé.</p>
      </div>
      <div class="band__actions">${cta()}${callBtn('btn--ghost')}</div>
    </div>
  </section>`;

const pageHead = (title, sub, photo) => `
  <header class="phead" style="--photo:url('${img(photo)}')">
    <div class="wrap">
      <h1 class="phead__title">${title}</h1>
      <p class="phead__sub">${sub}</p>
    </div>
  </header>`;

// ── Pages ───────────────────────────────────────────────────────────────────────
function accueil() {
  return `
  <section class="hero" aria-label="Présentation">
    <div class="hero__slides" aria-hidden="true">
      ${HERO.map((h, k) => `<div class="hero__slide${k === 0 ? ' is-on' : ''}" style="background-image:url('${img(h)}')"></div>`).join('')}
    </div>
    <div class="hero__veil"></div>
    <div class="wrap hero__content">
      ${kicker('Arboriste-grimpeur · Tourrettes')}
      <h1 class="hero__title">Votre élagage<br>dans le <span>83</span> et le <span>06</span></h1>
      <p class="hero__sub">Interventions sur des chantiers particuliers ou de plus grande envergure&nbsp;: jardins, copropriétés, domaines et collectivités.</p>
      <div class="hero__actions">${cta()}${callBtn('btn--ghost')}</div>
      <ul class="hero__trio">
        <li>Rigueur</li><li>Propreté</li><li>Efficacité</li>
      </ul>
    </div>
    <div class="hero__dots" role="group" aria-label="Photos">
      ${HERO.map((_, k) => `<button type="button" aria-label="Photo ${k + 1}" data-slide="${k}"${k === 0 ? ' aria-current="true"' : ''}></button>`).join('')}
    </div>
  </section>

  <section class="section">
    <div class="wrap">
      <div class="valeurs">
        ${VALEURS.map(v => `<article class="valeur reveal">
          <span class="valeur__ico">${ico(v.i, 30)}</span>
          <h2 class="valeur__t">${v.t}</h2>
          <p>${v.d}</p>
        </article>`).join('')}
      </div>
    </div>
  </section>

  <section class="section section--sand">
    <div class="wrap split">
      <div class="split__text reveal">
        ${kicker('Notre objectif')}
        <h2 class="h2">La satisfaction client<br>en premier lieu</h2>
        <p class="lead">Chaque jardin, chaque arbre est différent. Nous prenons le temps de comprendre votre besoin avant de toucher à une branche&nbsp;: sécurité, lumière, vue, voisinage ou simple entretien.</p>
        <ul class="objectifs">
          ${OBJECTIFS.map(o => `<li><span>${ico(o.i, 26)}</span><div><strong>${o.t}</strong><p>${o.d}</p></div></li>`).join('')}
        </ul>
      </div>
      <figure class="split__photo reveal">
        <img src="${img('hero-4')}" alt="Arboriste en grimpe dans un arbre" loading="lazy">
      </figure>
    </div>
  </section>

  <section class="section">
    <div class="wrap">
      <div class="section__head reveal">
        ${kicker('Nos prestations')}
        <h2 class="h2">Du jardin au grand domaine</h2>
      </div>
      <div class="services">
        ${SERVICES.map(s => `<article class="service reveal">
          <span class="service__ico">${ico(s.i, 28)}</span>
          <h3>${s.t}</h3>
          <p>${s.d}</p>
        </article>`).join('')}
        <a class="service service--link reveal" href="#/elagage">
          <h3>Comment nous travaillons</h3>
          <p>Principes de taille, méthodes et sécurité sur nos chantiers.</p>
          <span class="more">L’élagage ${ico('fleche', 18)}</span>
        </a>
      </div>
    </div>
  </section>

  <section class="section section--forest">
    <div class="wrap split split--rev">
      <figure class="split__photo split__photo--tall reveal">
        <img src="${img('pin-parasol')}" alt="Pin parasol en bord de mer, Var" loading="lazy">
      </figure>
      <div class="split__text reveal">
        ${kicker('L’élagueur')}
        <h2 class="h2">${CONFIG.manager}</h2>
        <p class="lead">Arboriste-grimpeur, diplômé du Certificat de Spécialisation <em>Taille et soins des arbres</em> depuis 2007.</p>
        <p>Après plusieurs années sur les chantiers de la région, Manu a créé Manu Élagage à Tourrettes, au cœur du pays de Fayence. Il connaît les essences du littoral et de l’arrière-pays&nbsp;: pins, chênes, oliviers, platanes, palmiers, et les contraintes de chaque terrain.</p>
        <p>Grimpe sur cordes pour les arbres inaccessibles, nacelle pour la grande hauteur&nbsp;: il choisit la technique la plus sûre et la plus respectueuse de l’arbre.</p>
        <dl class="chiffres">
          <div><dt>2007</dt><dd>diplômé du CS<br>taille et soins des arbres</dd></div>
          <div><dt>83 · 06</dt><dd>Var et<br>Alpes-Maritimes</dd></div>
          <div><dt>8 h – 18 h</dt><dd>du lundi<br>au vendredi</dd></div>
        </dl>
        <div class="contact-mini">
          <a href="tel:${telIntl}">${ico('tel', 20)} ${CONFIG.phone}</a>
          <a href="mailto:${CONFIG.email}">${ico('mail', 20)} ${CONFIG.email}</a>
        </div>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="wrap avis reveal">
      <blockquote>
        <p>«&nbsp;J’ai fait appel à ce professionnel pour débiter un arbre tombé à cause du vent sur notre jardin et maison. Il est venu le lendemain de mon appel et a réalisé le travail proprement et rapidement.&nbsp;»</p>
        <footer><span class="stars" aria-label="5 étoiles sur 5">★★★★★</span> Patrick M., avis client · novembre 2024</footer>
      </blockquote>
    </div>
  </section>

  <section class="section section--sand">
    <div class="wrap">
      <div class="section__head reveal">
        ${kicker('Zone d’intervention')}
        <h2 class="h2">Depuis Tourrettes, dans tout l’Est-Var et l’Ouest des Alpes-Maritimes</h2>
      </div>
      <div class="zones">
        ${Object.entries(ZONES).map(([dep, villes]) => `<div class="zone reveal"><h3>${ico('pin', 22)} ${dep}</h3><ul>${villes.map(v => `<li>${v}</li>`).join('')}</ul></div>`).join('')}
      </div>
      <p class="zones__note reveal">Votre commune n’est pas dans la liste&nbsp;? Appelez-nous, nous vous dirons si nous pouvons intervenir.</p>
    </div>
  </section>

  <section class="section">
    <div class="wrap">
      <div class="section__head section__head--row reveal">
        <div>${kicker('Nos chantiers')}<h2 class="h2">Quelques réalisations</h2></div>
        <a class="more" href="#/chantiers">Tous nos chantiers ${ico('fleche', 18)}</a>
      </div>
      <div class="chantiers chantiers--3">${CHANTIERS.slice(0, 3).map(carte).join('')}</div>
    </div>
  </section>

  ${bandeDevis()}`;
}

function elagage() {
  const sections = [
    ['definition', 'Qu’est-ce que l’élagage ?'],
    ['principes', 'Les principes'],
    ['action', 'Nos méthodes d’action'],
    ['deroule', 'Le déroulé d’un chantier'],
    ['securite', 'La sécurité'],
    ['reglementation', 'Ce que dit la loi'],
  ];
  return `
  ${pageHead('L’élagage', 'Tailler un arbre, c’est intervenir sur un être vivant. Voici comment nous le faisons, et pourquoi.', 'hero-2')}
  <nav class="subnav" aria-label="Sur cette page">
    <div class="wrap subnav__inner">
      ${sections.map(([id, t]) => `<a href="#/elagage/${id}" data-sub="${id}">${t}</a>`).join('')}
    </div>
  </nav>

  <section class="section" id="definition">
    <div class="wrap split">
      <div class="split__text reveal">
        ${kicker('Définition')}
        <h2 class="h2">Qu’est-ce que l’élagage&nbsp;?</h2>
        <p class="lead">L’élagage consiste à couper certaines branches d’un arbre pour l’entretenir, le mettre en sécurité ou l’adapter à son environnement, sans compromettre sa santé.</p>
        <p>Un arbre n’a pas besoin d’être taillé pour vivre&nbsp;: dans la forêt, personne ne le fait. Au jardin, en ville ou près d’une maison, on intervient pour une raison précise&nbsp;:</p>
        <ul class="checks">
          <li>${ico('check', 20)} retirer le bois mort, les branches cassées ou malades&nbsp;;</li>
          <li>${ico('check', 20)} dégager une toiture, une façade, une ligne ou un passage&nbsp;;</li>
          <li>${ico('check', 20)} redonner de la lumière au jardin ou à la maison&nbsp;;</li>
          <li>${ico('check', 20)} sécuriser un arbre fragilisé par le vent ou l’âge&nbsp;;</li>
          <li>${ico('check', 20)} respecter les obligations de voisinage et de débroussaillement.</li>
        </ul>
      </div>
      <figure class="split__photo split__photo--tall reveal">
        <img src="${img('cordes')}" alt="Élagueur encordé dans un arbre" loading="lazy">
      </figure>
    </div>
  </section>

  <section class="section section--sand" id="principes">
    <div class="wrap">
      <div class="section__head reveal">
        ${kicker('Les principes')}
        <h2 class="h2">Tailler peu, tailler juste</h2>
        <p class="lead">Les règles de l’art que nous appliquons sur chaque arbre.</p>
      </div>
      <ol class="principes">
        <li class="reveal"><h3>Couper le moins possible</h3><p>Chaque coupe est une blessure. On retire seulement ce qui est utile, et jamais plus d’un quart environ du feuillage en une fois&nbsp;: au-delà, l’arbre s’épuise.</p></li>
        <li class="reveal"><h3>Couper au bon endroit</h3><p>La coupe se fait juste au-dessus du col de la branche, ce bourrelet à sa base&nbsp;: sans laisser de chicot, sans entailler le tronc. C’est là que l’arbre cicatrise le mieux.</p></li>
        <li class="reveal"><h3>Préférer les petites coupes</h3><p>Une petite plaie se referme vite. Une grosse plaie reste ouverte des années et laisse entrer les champignons. Mieux vaut tailler un peu, régulièrement.</p></li>
        <li class="reveal"><h3>Jamais d’étêtage</h3><p>Raccourcir brutalement toutes les branches d’un arbre le défigure et le fragilise&nbsp;: il repart en rejets mal attachés, qui casseront plus tard. Nous proposons une réduction de couronne raisonnée.</p></li>
        <li class="reveal"><h3>Choisir la bonne saison</h3><p>Chaque essence a sa période. Nous évitons les tailles lourdes à la montée de sève et pendant la nidification des oiseaux, au printemps. Les urgences, elles, se traitent toute l’année.</p></li>
        <li class="reveal"><h3>Des outils propres</h3><p>Lames affûtées pour des coupes nettes, désinfectées entre deux arbres. C’est une obligation pour les platanes, menacés dans la région par le chancre coloré.</p></li>
      </ol>
    </div>
  </section>

  <section class="section" id="action">
    <div class="wrap">
      <div class="section__head reveal">
        ${kicker('Nos méthodes d’action')}
        <h2 class="h2">La bonne technique pour chaque arbre</h2>
      </div>
      <div class="methodes">
        ${[
          ['Taille douce ou raisonnée', 'Éclaircir le houppier en suivant la forme naturelle de l’arbre. La plus respectueuse, à refaire tous les 3 à 5 ans.'],
          ['Taille sanitaire', 'Retirer le bois mort, les branches malades, cassées ou qui se frottent. Elle évite les chutes de branches.'],
          ['Relevé de couronne', 'Supprimer les branches basses pour dégager un passage, une vue, une toiture ou les abords d’une maison.'],
          ['Réduction de couronne', 'Réduire le volume d’un arbre devenu trop grand en coupant sur des branches de relais, sans l’étêter.'],
          ['Haubanage', 'Relier des charpentières fragiles par des haubans souples ou rigides, pour garder un arbre en sécurité.'],
          ['Démontage par rétention', 'Quand l’arbre ne peut pas tomber d’un bloc&nbsp;: on le découpe par le haut, chaque morceau descendu sur cordes.'],
          ['Abattage directionnel', 'Quand la place le permet, l’arbre est abattu par une entaille dirigée, dans l’axe prévu, au mètre près.'],
          ['Palmiers & oliviers', 'Toilettage des palmiers (palmes sèches, hampes), taille de fructification ou d’éclaircie des oliviers.'],
        ].map(([t, d]) => `<article class="methode reveal"><h3>${t}</h3><p>${d}</p></article>`).join('')}
      </div>
    </div>
  </section>

  <section class="section section--forest" id="deroule">
    <div class="wrap">
      <div class="section__head reveal">
        ${kicker('Le déroulé d’un chantier')}
        <h2 class="h2">De la visite au nettoyage</h2>
      </div>
      <ol class="etapes">
        <li class="reveal"><span>1</span><h3>Visite et diagnostic</h3><p>Nous venons voir l’arbre, son état, son environnement et ce que vous en attendez.</p></li>
        <li class="reveal"><span>2</span><h3>Devis détaillé</h3><p>Un devis clair&nbsp;: travaux, technique, évacuation des déchets verts, délai.</p></li>
        <li class="reveal"><span>3</span><h3>Préparation</h3><p>Balisage de la zone, protection du sol, des toitures et des massifs, mise en place des cordes.</p></li>
        <li class="reveal"><span>4</span><h3>Intervention</h3><p>Taille ou démontage, branches retenues et descendues sans casse autour.</p></li>
        <li class="reveal"><span>5</span><h3>Nettoyage</h3><p>Ramassage, broyage ou évacuation selon le devis. Le jardin est rendu propre.</p></li>
      </ol>
    </div>
  </section>

  <section class="section" id="securite">
    <div class="wrap split">
      <div class="split__text reveal">
        ${kicker('La sécurité')}
        <h2 class="h2">Travailler en hauteur, sans laisser de place au hasard</h2>
        <p class="lead">L’élagage est un métier à risque. La sécurité passe avant la vitesse, pour nous comme pour vous et vos biens.</p>
        <ul class="secu">
          <li>${ico('casque', 26)}<div><strong>Équipement de protection</strong><p>Casque avec visière et protection auditive, pantalon et chaussures anti-coupure, gants&nbsp;: à chaque intervention.</p></div></li>
          <li>${ico('corde', 26)}<div><strong>Grimpe sur cordes</strong><p>Techniques d’accès sur cordes, toujours assuré, matériel vérifié avant chaque chantier.</p></div></li>
          <li>${ico('balise', 26)}<div><strong>Chantier balisé</strong><p>Zone de chute délimitée et surveillée au sol&nbsp;; circulation coupée ou alternée si besoin.</p></div></li>
          <li>${ico('scie', 26)}<div><strong>Rétention des branches</strong><p>Les branches au-dessus d’une maison, d’une piscine ou d’une clôture sont descendues sur cordes.</p></div></li>
          <li>${ico('efficacite', 26)}<div><strong>Lignes électriques</strong><p>À proximité d’une ligne, l’intervention se prépare avec le gestionnaire du réseau.</p></div></li>
        </ul>
      </div>
      <figure class="split__photo split__photo--tall reveal">
        <img src="${img('grimpeur')}" alt="Élagueur équipé, suspendu à sa corde" loading="lazy">
      </figure>
    </div>
  </section>

  <section class="section section--sand" id="reglementation">
    <div class="wrap">
      <div class="section__head reveal">
        ${kicker('Ce que dit la loi')}
        <h2 class="h2">Débroussaillement et voisinage</h2>
      </div>
      <div class="lois">
        <article class="loi reveal">
          <h3>${ico('feu', 24)} Obligations légales de débroussaillement</h3>
          <p>Dans le Var et les Alpes-Maritimes, une grande partie des communes est exposée au risque d’incendie. Si votre maison est à moins de 200 m d’un bois, vous devez débroussailler dans un rayon de 50 m autour des constructions (parfois davantage selon l’arrêté de votre commune), et entretenir les abords des voies d’accès.</p>
        </article>
        <article class="loi reveal">
          <h3>${ico('haie', 24)} Arbres et voisinage</h3>
          <p>Le Code civil fixe les distances de plantation&nbsp;: 2 m de la limite pour un arbre de plus de 2 m de haut, 50 cm en dessous. Votre voisin peut exiger que soient coupées les branches qui dépassent chez lui&nbsp;; c’est au propriétaire de l’arbre de le faire.</p>
        </article>
        <article class="loi reveal">
          <h3>${ico('arbre', 24)} Arbres protégés</h3>
          <p>Certains arbres sont protégés par le plan local d’urbanisme (espaces boisés classés) ou situés en site classé. Avant un abattage, nous vous aidons à vérifier qu’aucune autorisation n’est nécessaire.</p>
        </article>
      </div>
    </div>
  </section>

  ${bandeDevis()}`;
}

function carte(c) {
  return `<article class="chantier reveal" data-cat="${c.cat}">
    <div class="chantier__img"><img src="${img(c.img)}" alt="" loading="lazy"><span class="tag">${c.type}</span></div>
    <div class="chantier__body">
      <p class="chantier__lieu">${ico('pin', 16)} ${c.lieu}</p>
      <h3>${c.t}</h3>
      <p>${c.d}</p>
    </div>
  </article>`;
}

function chantiers() {
  return `
  ${pageHead('Nos chantiers', 'Particuliers, copropriétés, domaines et collectivités&nbsp;: un aperçu de nos interventions.', 'platanes')}
  <section class="section">
    <div class="wrap">
      <div class="filtres reveal" role="group" aria-label="Filtrer les chantiers">
        <button type="button" data-filtre="tous" aria-pressed="true">Tous</button>
        <button type="button" data-filtre="particuliers" aria-pressed="false">Particuliers</button>
        <button type="button" data-filtre="envergure" aria-pressed="false">Grande envergure</button>
      </div>
      <div class="chantiers" id="chantiers">${CHANTIERS.map(carte).join('')}</div>
    </div>
  </section>

  <section class="section section--sand">
    <div class="wrap">
      <div class="section__head reveal">
        ${kicker('Nos références')}
        <h2 class="h2">Ils nous font confiance</h2>
      </div>
      <div class="refs">
        ${[
          ['Particuliers', 'Jardins, villas et propriétés du pays de Fayence et du littoral.'],
          ['Copropriétés & syndics', 'Entretien des parcs, mise en conformité débroussaillement.'],
          ['Domaines & hôtellerie', 'Grands parcs, allées arborées, domaines viticoles.'],
          ['Paysagistes', 'Interventions en grimpe ou en hauteur en appui de leurs chantiers.'],
        ].map(([t, d]) => `<div class="ref reveal"><strong>${t}</strong><p>${d}</p></div>`).join('')}
      </div>
      <div class="avis avis--inline reveal">
        <blockquote>
          <p>«&nbsp;Il est venu le lendemain de mon appel et a réalisé le travail proprement et rapidement.&nbsp;»</p>
          <footer><span class="stars" aria-label="5 étoiles sur 5">★★★★★</span> Patrick M., avis client</footer>
        </blockquote>
      </div>
    </div>
  </section>

  ${bandeDevis()}`;
}

function contact() {
  return `
  ${pageHead('Nous contacter', 'Un conseil, un devis, une urgence après un coup de vent&nbsp;: Manu vous répond.', 'hero-3')}
  <section class="section">
    <div class="wrap contact">
      <aside class="contact__card reveal">
        <img src="${CONFIG.logo}" width="88" height="88" alt="" data-logo>
        <h2>Manu Élagage</h2>
        <p class="contact__who">${CONFIG.manager}, arboriste-grimpeur</p>
        <ul>
          <li>${ico('tel', 22)}<a href="tel:${telIntl}">${CONFIG.phone}</a></li>
          <li>${ico('mail', 22)}<a href="mailto:${CONFIG.email}">${CONFIG.email}</a></li>
          <li>${ico('pin', 22)}<span>${CONFIG.address.join('<br>')}</span></li>
          <li>${ico('horloge', 22)}<span>${CONFIG.hours}</span></li>
        </ul>
        <a class="btn btn--leaf btn--block" href="tel:${telIntl}">${ico('tel', 18)} Appeler maintenant</a>
      </aside>

      <form class="form reveal" id="form" novalidate>
        <h2 class="h3">Demande de devis</h2>
        <p class="form__hint">Décrivez votre arbre et votre besoin&nbsp;; une photo envoyée ensuite par e-mail aide beaucoup.</p>
        <div class="form__grid">
          <label>Nom<input name="nom" autocomplete="name" required></label>
          <label>Téléphone<input name="tel" type="tel" autocomplete="tel" required></label>
          <label>E-mail<input name="email" type="email" autocomplete="email"></label>
          <label>Commune<input name="commune" autocomplete="address-level2" required></label>
          <label class="full">Type d’intervention
            <select name="type">
              <option>Élagage / taille</option>
              <option>Abattage / démontage</option>
              <option>Palmiers / oliviers</option>
              <option>Débroussaillement (OLD)</option>
              <option>Haies / arbustes</option>
              <option>Urgence (arbre tombé, branche cassée)</option>
              <option>Autre</option>
            </select>
          </label>
          <label class="full">Votre message<textarea name="message" rows="5" placeholder="Essence, hauteur approximative, accès au terrain…"></textarea></label>
        </div>
        <p class="form__error" id="form-error" role="alert"></p>
        <button class="btn btn--leaf" type="submit">Envoyer la demande ${ico('fleche', 18)}</button>
        <p class="form__small">Le bouton ouvre votre messagerie avec la demande déjà rédigée.</p>
      </form>
    </div>
  </section>

  <section class="map reveal" aria-label="Carte : Tourrettes">
    <iframe title="Carte de Tourrettes (Var)" loading="lazy" src="https://www.openstreetmap.org/export/embed.html?bbox=6.60%2C43.54%2C6.80%2C43.64&amp;layer=mapnik&amp;marker=43.5876%2C6.7037"></iframe>
  </section>`;
}

const PAGES = { '': accueil, elagage, chantiers, contact };

// ── Routage et comportements ───────────────────────────────────────────────────
let slideTimer;
function render() {
  const [route = '', sub] = location.hash.replace(/^#\/?/, '').split('/');
  const page = PAGES[route] ? route : '';
  const main = $('#main');
  main.innerHTML = PAGES[page]();
  document.body.dataset.page = page || 'accueil';
  $$('.nav a').forEach(a => a.toggleAttribute('aria-current', a.dataset.route === page));
  document.title = { '': 'Manu Élagage · Élagueur dans le Var et les Alpes-Maritimes', elagage: 'L’élagage · Manu Élagage', chantiers: 'Nos chantiers · Manu Élagage', contact: 'Contact · Manu Élagage' }[page];
  closeMenu();
  applyLogo();
  setupReveal();
  clearInterval(slideTimer);
  if (page === '') setupHero();
  if (page === 'chantiers') setupFiltres();
  if (page === 'contact') setupForm();
  if (page === 'elagage') setupSubnav(sub);
  else window.scrollTo({ top: 0, behavior: 'instant' });
  onScroll();
}

function setupHero() {
  const slides = $$('.hero__slide'), dots = $$('.hero__dots button');
  let k = 0;
  const show = n => {
    k = (n + slides.length) % slides.length;
    slides.forEach((s, i) => s.classList.toggle('is-on', i === k));
    dots.forEach((d, i) => d.toggleAttribute('aria-current', i === k));
  };
  const start = () => { clearInterval(slideTimer); if (!matchMedia('(prefers-reduced-motion: reduce)').matches) slideTimer = setInterval(() => show(k + 1), 6000); };
  dots.forEach(d => d.addEventListener('click', () => { show(+d.dataset.slide); start(); }));
  start();
}

function setupFiltres() {
  $$('.filtres button').forEach(b => b.addEventListener('click', () => {
    $$('.filtres button').forEach(x => x.setAttribute('aria-pressed', x === b));
    $$('#chantiers .chantier').forEach(c => { c.hidden = b.dataset.filtre !== 'tous' && c.dataset.cat !== b.dataset.filtre; });
  }));
}

function setupSubnav(sub) {
  const links = $$('.subnav a');
  // Un clic dans le sous-menu fait défiler la page sans la reconstruire.
  links.forEach(l => l.addEventListener('click', e => {
    e.preventDefault();
    history.replaceState(null, '', l.getAttribute('href'));
    document.getElementById(l.dataset.sub)?.scrollIntoView({ behavior: 'smooth' });
  }));
  if (sub && document.getElementById(sub)) {
    requestAnimationFrame(() => document.getElementById(sub).scrollIntoView({ behavior: 'instant' }));
  } else window.scrollTo({ top: 0, behavior: 'instant' });
  const spy = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) links.forEach(l => l.toggleAttribute('aria-current', l.dataset.sub === e.target.id)); });
  }, { rootMargin: '-45% 0px -50% 0px' });
  links.forEach(l => { const s = document.getElementById(l.dataset.sub); if (s) spy.observe(s); });
}

function setupForm() {
  const form = $('#form');
  form.addEventListener('submit', e => {
    e.preventDefault();
    const f = Object.fromEntries(new FormData(form));
    const err = $('#form-error');
    if (!f.nom.trim() || !f.tel.trim() || !f.commune.trim()) { err.textContent = 'Merci d’indiquer au moins votre nom, votre téléphone et votre commune.'; return; }
    err.textContent = '';
    const body = `Nom : ${f.nom}\nTéléphone : ${f.tel}\nE-mail : ${f.email || '—'}\nCommune : ${f.commune}\nIntervention : ${f.type}\n\n${f.message}`;
    location.href = `mailto:${CONFIG.email}?subject=${encodeURIComponent(`Demande de devis – ${f.type} – ${f.commune}`)}&body=${encodeURIComponent(body)}`;
  });
}

let revealObs;
function setupReveal() {
  revealObs?.disconnect();
  if (!('IntersectionObserver' in window)) return $$('.reveal').forEach(el => el.classList.add('is-in'));
  revealObs = new IntersectionObserver(entries => entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('is-in'); revealObs.unobserve(e.target); }
  }), { rootMargin: '0px 0px -8% 0px' });
  $$('.reveal').forEach(el => revealObs.observe(el));
}

function applyLogo() { $$('#logo, [data-logo]').forEach(el => { el.src = CONFIG.logo; }); }

function onScroll() {
  const solid = scrollY > 40 || document.body.dataset.page !== 'accueil';
  $('#bar').classList.toggle('is-solid', solid);
  $('#callfab').classList.toggle('is-on', scrollY > 500);
}

const burger = $('#burger');
function closeMenu() { burger.setAttribute('aria-expanded', 'false'); document.body.classList.remove('menu-open'); }
burger.addEventListener('click', () => {
  const open = burger.getAttribute('aria-expanded') !== 'true';
  burger.setAttribute('aria-expanded', open);
  document.body.classList.toggle('menu-open', open);
});

// Pied de page, dialogues et bouton d'appel (communs à toutes les pages).
$('#foot-contact').innerHTML = `
  <a href="tel:${telIntl}">${ico('tel', 18)} ${CONFIG.phone}</a>
  <a href="mailto:${CONFIG.email}">${ico('mail', 18)} ${CONFIG.email}</a>
  <span>${ico('pin', 18)} ${CONFIG.address.join(', ')}</span>
  <span>${ico('horloge', 18)} ${CONFIG.hours}</span>`;
$('#foot-small').textContent = `© ${new Date().getFullYear()} Manu Élagage · ${CONFIG.manager} · Tourrettes (83) · SIRET ${CONFIG.siret}`;
$('#callfab').href = `tel:${telIntl}`;
$('#credits-list').innerHTML = CREDITS.map(([, a, l, f]) => `<li><a href="https://commons.wikimedia.org/wiki/File:${encodeURIComponent(f)}" target="_blank" rel="noopener">${f.replace(/_/g, ' ').replace(/\.(jpe?g)$/i, '')}</a> · ${a} · ${l}</li>`).join('');
$('#mentions-body').innerHTML = `
  <p><strong>Manu Élagage</strong>, entreprise individuelle de ${CONFIG.manager}.<br>${CONFIG.address.join(', ')}.<br>SIRET ${CONFIG.siret} · Code NAF 8130Z (services d’aménagement paysager).</p>
  <p>Téléphone&nbsp;: ${CONFIG.phone} · E-mail&nbsp;: ${CONFIG.email}</p>
  <p>Ce site ne dépose aucun cookie et ne collecte aucune donnée&nbsp;: le formulaire de contact ouvre simplement votre messagerie.</p>`;
$$('[data-open]').forEach(b => b.addEventListener('click', () => $('#' + b.dataset.open).showModal()));

addEventListener('scroll', onScroll, { passive: true });
addEventListener('hashchange', render);
render();
