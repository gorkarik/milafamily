export type Lang = 'ru' | 'uk' | 'sk';

export type CharacterId = 'mila' | 'liza' | 'sasha' | 'misha';

export type Difficulty = 'easy' | 'medium' | 'hard';

export type AmbientEffectType = 'dust' | 'steam' | 'breeze' | 'twinkle' | 'sea';

export interface LocalizedText {
  ru: string;
  uk: string;
  sk: string;
}

export interface HiddenItem {
  id: string;
  /** [ymin, xmin, ymax, xmax] on a 0..1000 normalized scale */
  box_2d: [number, number, number, number];
  difficulty: Difficulty;
  names: LocalizedText;
}

export interface CachedSceneData {
  locationId: number;
  imageDataUrl: string;
  items: HiddenItem[];
  createdAt: number;
}

export interface DialogueLine {
  speaker: CharacterId;
  text: LocalizedText;
}

export interface LocationDef {
  id: number; // 1..15
  title: LocalizedText;
  subtitle: LocalizedText;
  featuredCharacter: CharacterId;
  miniStory: LocalizedText;
  dialogues: DialogueLine[];
  outro: LocalizedText;
  ambient: AmbientEffectType;
  cardAccent: string;
}

export interface GameSave {
  unlocked: number; // 1..15
  stars: Record<number, number>; // locationId -> 1..3
  bestTime: Record<number, number>; // locationId -> seconds
}
