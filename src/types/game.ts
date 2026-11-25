export type CharacterId = 'mila' | 'liza' | 'sasha' | 'misha';

export type Difficulty = 'easy' | 'medium' | 'hard';

export type AmbientEffectType = 'dust' | 'steam' | 'breeze' | 'twinkle' | 'sea';

export interface HiddenItem {
  id: string;
  /** [ymin, xmin, ymax, xmax] on a 0..1000 normalized scale */
  box_2d: [number, number, number, number];
  difficulty: Difficulty;
  name: string;
}

export interface CachedSceneData {
  locationId: number;
  imageDataUrl: string;
  items: HiddenItem[];
  createdAt: number;
}

export interface DialogueLine {
  speaker: CharacterId;
  text: string;
}

export interface LocationDef {
  id: number; // 1..15
  title: string;
  subtitle: string;
  featuredCharacter: CharacterId;
  miniStory: string;
  dialogues: DialogueLine[];
  outro: string;
  ambient: AmbientEffectType;
  cardAccent: string;
}

export interface GameSave {
  unlocked: number; // 1..15
  stars: Record<number, number>; // locationId -> 1..3
  bestTime: Record<number, number>; // locationId -> seconds
}
