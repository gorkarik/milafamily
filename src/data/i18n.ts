import type { CharacterId, Difficulty, Lang } from '../types/game';

export interface UiDictionary {
  appTitle: string;
  appSubtitle: string;
  playBtn: string;
  continueBtn: string;
  mapTitle: string;
  mapSubtitle: string;
  backToMap: string;
  backToTitle: string;
  unlockAll: string;
  unlockAllToast: string;
  starsLabel: string;
  lockedToast: string;
  chapterLabel: string;
  storyNextBtn: string;
  dialogueNextBtn: string;
  startSearchBtn: string;
  skipIntroBtn: string;
  foundLabel: string;
  searchListTitle: string;
  remainingQueue: string;
  hintBtn: string;
  noHintsToast: string;
  hintActiveToast: string;
  foundToastPrefix: string;
  spamWarningTitle: string;
  spamWarningSub: string;
  resetViewBtn: string;
  zoomInBtn: string;
  zoomOutBtn: string;
  soundOn: string;
  soundOff: string;
  loadingTitle: string;
  loadingTips: string[];
  victoryTitle: string;
  finaleTitle: string;
  timeLabel: string;
  hintsUsedLabel: string;
  itemsFoundLabel: string;
  replayBtn: string;
  nextLocationBtn: string;
  finishAdventureBtn: string;
  cachedBadge: string;
  newChapterBadge: string;
  completedBadge: string;
  bestTimeLabel: string;
  controlsHintDesktop: string;
  controlsHintMobile: string;
  difficulty: Record<Difficulty, string>;
  characters: Record<CharacterId, string>;
  characterRoles: Record<CharacterId, string>;
}

export const UI_TEXT: Record<Lang, UiDictionary> = {
  ru: {
    appTitle: 'Большое приключение Милы',
    appSubtitle:
      'Помоги Миле, маме Лизе, папе Саше и братику Мише отыскать все спрятанные вещи на 15 живописных локациях и успеть на Большой семейный праздник!',
    playBtn: 'Начать приключение',
    continueBtn: 'Продолжить приключение',
    mapTitle: 'Карта приключения',
    mapSubtitle: '15 глав семейного путешествия',
    backToMap: 'Карта',
    backToTitle: 'Главная',
    unlockAll: 'Открыть все',
    unlockAllToast: 'Все 15 локаций открыты!',
    starsLabel: 'Звёзды',
    lockedToast: 'Сначала пройди предыдущую локацию!',
    chapterLabel: 'Глава',
    storyNextBtn: 'К диалогу',
    dialogueNextBtn: 'Дальше',
    startSearchBtn: 'Начать поиск!',
    skipIntroBtn: 'Пропустить',
    foundLabel: 'Найдено',
    searchListTitle: 'Список поиска',
    remainingQueue: 'В очереди',
    hintBtn: 'Подсказка',
    noHintsToast: 'Подсказки на этом уровне закончились!',
    hintActiveToast: 'Золотой луч подсветил нужный предмет!',
    foundToastPrefix: 'Найдено:',
    spamWarningTitle: 'Не спеши, присмотрись!',
    spamWarningSub: 'Слишком много промахов подряд — сделай вдох на секунду.',
    resetViewBtn: 'Сбросить вид',
    zoomInBtn: 'Приблизить',
    zoomOutBtn: 'Отдалить',
    soundOn: 'Звук вкл',
    soundOff: 'Звук выкл',
    loadingTitle: 'Мила готовит лупу...',
    loadingTips: [
      'Совет Милы: заглядывай на верхние полки, под столы и в самые тенистые уголки!',
      'Совет мамы Лизы: используй приближение, чтобы рассмотреть самые мелкие детали.',
      'Совет папы Саши: на телефоне удобно двигать сцену одним пальцем и приближать двумя.',
      'Совет Миши: как только найдёшь предмет из списка, на его место сразу прилетит новый!',
      'Подсказка: кнопка лупы плавно наведёт камеру на один из спрятанных предметов.',
    ],
    victoryTitle: 'Локация пройдена!',
    finaleTitle: 'С праздником, любимая семья!',
    timeLabel: 'Время',
    hintsUsedLabel: 'Подсказки',
    itemsFoundLabel: 'Предметы',
    replayBtn: 'Ещё раз',
    nextLocationBtn: 'Следующая глава',
    finishAdventureBtn: 'На карту приключения',
    cachedBadge: 'Сохранено',
    newChapterBadge: 'Новая сцена',
    completedBadge: 'Пройдено',
    bestTimeLabel: 'Рекорд',
    controlsHintDesktop: 'Колесо мыши — масштаб · Перетаскивание — обзор',
    controlsHintMobile: '1 палец — обзор · 2 пальца — масштаб',
    difficulty: {
      easy: 'Обычный',
      medium: 'Хитрый',
      hard: 'Секретный',
    },
    characters: {
      mila: 'Мила',
      liza: 'Мама Лиза',
      sasha: 'Папа Саша',
      misha: 'Миша',
    },
    characterRoles: {
      mila: 'Юный детектив',
      liza: 'Хранительница уюта',
      sasha: 'Главный водитель',
      misha: 'Мастер пряток',
    },
  },
  uk: {
    appTitle: 'Велика пригода Міли',
    appSubtitle:
      'Допоможи Мілі, мамі Лізі, татові Саші та братику Міші відшукати всі заховані речі на 15 мальовничих локаціях і встигнути на Велике сімейне свято!',
    playBtn: 'Почати пригоду',
    continueBtn: 'Продовжити пригоду',
    mapTitle: 'Карта пригоди',
    mapSubtitle: '15 розділів сімейної подорожі',
    backToMap: 'Карта',
    backToTitle: 'Головна',
    unlockAll: 'Відкрити всі',
    unlockAllToast: 'Усі 15 локацій відкрито!',
    starsLabel: 'Зірки',
    lockedToast: 'Спочатку пройди попередню локацію!',
    chapterLabel: 'Розділ',
    storyNextBtn: 'До діалогу',
    dialogueNextBtn: 'Далі',
    startSearchBtn: 'Почати пошук!',
    skipIntroBtn: 'Пропустити',
    foundLabel: 'Знайдено',
    searchListTitle: 'Список пошуку',
    remainingQueue: 'У черзі',
    hintBtn: 'Підказка',
    noHintsToast: 'Підказки на цьому рівні закінчилися!',
    hintActiveToast: 'Золотий промінь підсвітив потрібний предмет!',
    foundToastPrefix: 'Знайдено:',
    spamWarningTitle: 'Не поспішай, придивись!',
    spamWarningSub: 'Забагато промахів поспіль — перепочинь секунду.',
    resetViewBtn: 'Скинути вигляд',
    zoomInBtn: 'Збільшити',
    zoomOutBtn: 'Зменшити',
    soundOn: 'Звук увімк.',
    soundOff: 'Звук вимк.',
    loadingTitle: 'Міла готує лупу...',
    loadingTips: [
      'Порада Міли: зазирай на верхні полиці, під столи й у найтемніші куточки!',
      'Порада мами Лізи: використовуй збільшення, щоб розгледіти найдрібніші деталі.',
      'Порада тата Саші: на телефоні зручно рухати сцену одним пальцем і збільшувати двома.',
      'Порада Міші: щойно знайдеш предмет зі списку, на його місце одразу прилетить новий!',
      'Підказка: кнопка лупи плавно наведе камеру на один із захованих предметів.',
    ],
    victoryTitle: 'Локацію пройдено!',
    finaleTitle: 'Зі святом, люба родино!',
    timeLabel: 'Час',
    hintsUsedLabel: 'Підказки',
    itemsFoundLabel: 'Предмети',
    replayBtn: 'Ще раз',
    nextLocationBtn: 'Наступний розділ',
    finishAdventureBtn: 'На карту пригоди',
    cachedBadge: 'Збережено',
    newChapterBadge: 'Нова сцена',
    completedBadge: 'Пройдено',
    bestTimeLabel: 'Рекорд',
    controlsHintDesktop: 'Колесо миші — масштаб · Перетягування — огляд',
    controlsHintMobile: '1 палець — огляд · 2 пальці — масштаб',
    difficulty: {
      easy: 'Звичайний',
      medium: 'Хитрий',
      hard: 'Секретний',
    },
    characters: {
      mila: 'Міла',
      liza: 'Мама Ліза',
      sasha: 'Тато Саша',
      misha: 'Міша',
    },
    characterRoles: {
      mila: 'Юний детектив',
      liza: 'Берегиня затишку',
      sasha: 'Головний водій',
      misha: 'Майстер хованок',
    },
  },
  sk: {
    appTitle: 'Veľké dobrodružstvo Mily',
    appSubtitle:
      'Pomôž Mile, mame Lize, ockovi Sašovi a bračekovi Miškovi nájsť všetky ukryté veci na 15 malebných miestach a stihnúť Veľkú rodinnú oslavu!',
    playBtn: 'Začať dobrodružstvo',
    continueBtn: 'Pokračovať v dobrodružstve',
    mapTitle: 'Mapa dobrodružstva',
    mapSubtitle: '15 kapitol rodinnej výpravy',
    backToMap: 'Mapa',
    backToTitle: 'Domov',
    unlockAll: 'Odomknúť všetky',
    unlockAllToast: 'Všetkých 15 miest je odomknutých!',
    starsLabel: 'Hviezdy',
    lockedToast: 'Najprv dokonči predchádzajúce miesto!',
    chapterLabel: 'Kapitola',
    storyNextBtn: 'K dialógu',
    dialogueNextBtn: 'Ďalej',
    startSearchBtn: 'Začať hľadať!',
    skipIntroBtn: 'Preskočiť',
    foundLabel: 'Nájdené',
    searchListTitle: 'Zoznam hľadania',
    remainingQueue: 'V poradí',
    hintBtn: 'Nápoveda',
    noHintsToast: 'Nápovedy v tejto úrovni sa minuli!',
    hintActiveToast: 'Zlatý lúč osvietil hľadaný predmet!',
    foundToastPrefix: 'Nájdené:',
    spamWarningTitle: 'Neponáhľaj sa, rozhliadni sa!',
    spamWarningSub: 'Príliš veľa chybných kliknutí — na chvíľku sa nadýchni.',
    resetViewBtn: 'Celý pohľad',
    zoomInBtn: 'Priblížiť',
    zoomOutBtn: 'Oddialiť',
    soundOn: 'Zvuk zap.',
    soundOff: 'Zvuk vyp.',
    loadingTitle: 'Mila chystá lupu...',
    loadingTips: [
      'Milina rada: nakukni na horné police, pod stoly aj do tienistých kútikov!',
      'Rada mamy Lizy: použi priblíženie, aby si zbadal aj tie najmenšie drobnosti.',
      'Rada ocka Sašu: na mobile posúvaj scénu jedným prstom a približuj dvoma.',
      'Miškova rada: hneď ako nájdeš predmet zo zoznamu, pribudne ďalší!',
      'Tip: tlačidlo lupy plynulo priblíži kameru na jeden z ukrytých predmetov.',
    ],
    victoryTitle: 'Miesto dokončené!',
    finaleTitle: 'Šťastnú oslavu, rodinka!',
    timeLabel: 'Čas',
    hintsUsedLabel: 'Nápovedy',
    itemsFoundLabel: 'Predmety',
    replayBtn: 'Znova',
    nextLocationBtn: 'Ďalšia kapitola',
    finishAdventureBtn: 'Na mapu dobrodružstva',
    cachedBadge: 'Uložené',
    newChapterBadge: 'Nová scéna',
    completedBadge: 'Hotovo',
    bestTimeLabel: 'Rekord',
    controlsHintDesktop: 'Koliesko myši — zoom · Ťahanie — posun',
    controlsHintMobile: '1 prst — posun · 2 prsty — zoom',
    difficulty: {
      easy: 'Bežný',
      medium: 'Šikovný',
      hard: 'Tajný',
    },
    characters: {
      mila: 'Mila',
      liza: 'Mama Liza',
      sasha: 'Ocko Saša',
      misha: 'Miško',
    },
    characterRoles: {
      mila: 'Malá detektívka',
      liza: 'Strážkyňa pohody',
      sasha: 'Hlavný šofér',
      misha: 'Majster schovávačky',
    },
  },
};

export const LANG_OPTIONS: { code: Lang; label: string; short: string }[] = [
  { code: 'ru', label: 'Русский', short: 'RU' },
  { code: 'uk', label: 'Українська', short: 'UK' },
  { code: 'sk', label: 'Slovenčina', short: 'SK' },
];
