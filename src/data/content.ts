// ─── Numeri chiave ────────────────────────────────────────────────────────────
export const keyStats = [
  { value: '1992',  label: 'Anno di fondazione' },
  { value: '1000+', label: 'Bambini sostenuti totali' },
  { value: '260',   label: 'Bambini attualmente in carico' },
  { value: '96%',   label: 'Fondi diretti al bambino' },
]

// ─── Video YouTube ─────────────────────────────────────────────────────────────
export const videos = [
  {
    id: 'ZIXPTceK994',
    title: 'Progetto Briciola — Versione completa (ITA)',
    year: '2022',
    lang: 'IT',
  },
  {
    id: 'ySeX9Pp5AeU',
    title: 'Progetto Briciola — Versione breve (ITA)',
    year: '2022',
    lang: 'IT',
  },
  {
    id: 'uxvmx6Cs7VM',
    title: 'Progetto Briciola — Full version (ENG)',
    year: '2022',
    lang: 'EN',
  },
  {
    id: '30y7Z_5xNeA',
    title: 'Progetto Briciola — Short version (ENG)',
    year: '2022',
    lang: 'EN',
  },
  {
    id: 'HEmVt8I2mS0',
    title: 'Missione febbraio 2013',
    year: '2013',
    lang: 'IT',
  },
]

// ─── Timeline progetti completati ─────────────────────────────────────────────
export const timeline = [
  { year: '1992', title: 'Asilo' },
  { year: '1993', title: 'Strada Gunchirie–Hured e pozzo acqua' },
  { year: '1997', title: 'Scuole — primo edificio' },
  { year: '2007', title: 'Scuole — secondo edificio' },
  { year: '2008', title: 'Scuole — terzo edificio, ponte Gunchirie–Hured, cisterna e acquedotto' },
  { year: '2012', title: 'Ospedale — primo blocco' },
  { year: '2015', title: 'Ospedale — secondo blocco' },
  { year: '—',    title: '6 chiese costruite (1 a Hured, 5 nei villaggi vicini)' },
]

// ─── Coordinamento bancario / IBAN ────────────────────────────────────────────
export const ibanList = [
  {
    label: 'C/C Postale',
    value: '37376936',
    display: 'C/C Postale n. 37376936',
  },
  {
    label: 'Intesa Sanpaolo',
    value: 'IT42E0335901600100000123179',
    display: 'IT 42 E 03359 01600 100000123179',
    note: 'Filiale Seriate BG, via Italia 44',
  },
  {
    label: 'BCC Oglio e Serio',
    value: 'IT84E0851453480000000260095',
    display: 'IT 84 E 08514 53480 000000260095',
  },
]

export const orgInfo = {
  name: 'Progetto Briciola ONLUS',
  codiceFiscale: '02996790164',
  address: 'Via F. Corridoni, 61 — 24124 Bergamo',
  sedeLegale: 'Via Quarti — Scanzorosciate (BG)',
  phone: '+39 339 3849741',
  phoneLabel: 'Franco',
  facebook: 'https://www.facebook.com/progettobriciola',
  instagram: 'https://www.instagram.com/progettobriciolaonlus',
  youtube: 'https://www.youtube.com/@progettobriciola',
  emailInfo: '[EMAIL DA INSERIRE]',
  emailSegreteria: '[EMAIL DA INSERIRE]',
  emailAdozioni: '[EMAIL DA INSERIRE]',
}

// ─── Team Italia ──────────────────────────────────────────────────────────────
export const team = [
  {
    name: 'Francesco Zana',
    role: 'Presidente',
    bio: '[DA INSERIRE]',
  },
  {
    name: 'Bzunesh "Busu" Kifle',
    role: 'Vicepresidente',
    bio: '[DA INSERIRE]',
  },
  {
    name: 'Davide Manenti',
    role: 'Tesoriere',
    bio: '[DA INSERIRE]',
  },
  {
    name: 'Mariam Zana',
    role: 'Adozioni a distanza',
    bio: '[DA INSERIRE]',
  },
  {
    name: 'Federica Manenti',
    role: 'Comunicazione',
    bio: '[DA INSERIRE]',
  },
  {
    name: 'Gianantonio Rozzini',
    role: 'Collaboratore',
    bio: '[DA INSERIRE]',
  },
  {
    name: 'Sara Nesci',
    role: 'Collaboratrice',
    bio: '[DA INSERIRE]',
  },
]

export const teamEtiopia = [
  {
    name: 'Alemu Gebre',
    role: 'Presidente TESFA',
    location: 'Addis Abeba',
    bio: '[DA INSERIRE]',
  },
  {
    name: 'Hailé Wondineh',
    role: 'Referente TESFA a Hured',
    location: 'Hured',
    bio: '[DA INSERIRE]',
  },
]

// ─── Dati Etiopia ─────────────────────────────────────────────────────────────
export const etiopiaFacts = [
  { label: 'Capitale',     value: 'Addis Abeba ("fiore nuovo")' },
  { label: 'Superficie',   value: '1.104.300 km²' },
  { label: 'Popolazione',  value: '~80.000.000 (2° più popolato Africa subsahariana)' },
  { label: 'Lingue',       value: 'Amarico (ufficiale), oromo, tigrino, inglese nei centri urbani' },
  { label: 'Religioni',    value: 'Cristianesimo ortodosso, islam, cattolica (minoranza)' },
  { label: 'Moneta',       value: 'Birr (ETB)' },
  { label: 'Fuso orario',  value: "+2h rispetto all\u2019Italia (o +1h con ora legale)" },
]

export const etiopiaStats = [
  { value: '39%', label: 'della popolazione vive con meno di 1$/giorno', source: 'Banca Mondiale' },
  { value: '46%', label: 'soffre di denutrizione', source: 'UNICEF' },
  { value: '~55', label: 'anni di aspettativa di vita media', source: 'OMS' },
  { value: '52%', label: 'ha accesso ad acqua pulita', source: 'UNICEF' },
  { value: '~5%', label: 'tasso HIV nella zona di Hured', source: 'UNAIDS' },
]

// ─── Adozione a distanza ──────────────────────────────────────────────────────
export const adozioneInfo = {
  mensile: 25,
  annuale: 300,
  semestrale: 150,
  trimestrale: 75,
  bambiniAttuali: 260,
  bambiniViaAdozione: 200,
  percentualeFondi: 96,
  descrizione:
    "L\u2019adozione a distanza permette di sostenere un bambino specifico fino al compimento dei 18 anni. Il 96% dei fondi va direttamente al bambino. Puoi scegliere di versare annualmente (\u20AC300), semestralmente (\u20AC150) o trimestralmente (\u20AC75).",
}
