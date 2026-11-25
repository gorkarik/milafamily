import type { CharacterId, Difficulty } from '../types/game';

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
  completedBadge: string;
  bestTimeLabel: string;
  controlsHintDesktop: string;
  controlsHintMobile: string;
  difficulty: Record<Difficulty, string>;
  characters: Record<CharacterId, string>;
  characterRoles: Record<CharacterId, string>;
}

export const UI_TEXT: UiDictionary = {
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
};
