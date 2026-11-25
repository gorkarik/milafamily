import type { CSSProperties } from 'react';
import type { AmbientEffectType } from '../types/game';

interface AmbientOverlayProps {
  type: AmbientEffectType;
}

interface ParticleSpec {
  left: string;
  top: string;
  size: number;
  dur: string;
  delay: string;
}

const DUST_PARTICLES: ParticleSpec[] = [
  { left: '12%', top: '24%', size: 5, dur: '7.2s', delay: '0s' },
  { left: '26%', top: '42%', size: 4, dur: '8.5s', delay: '1.1s' },
  { left: '38%', top: '18%', size: 6, dur: '6.8s', delay: '2.4s' },
  { left: '52%', top: '34%', size: 4, dur: '7.9s', delay: '0.6s' },
  { left: '66%', top: '22%', size: 5, dur: '9.1s', delay: '1.8s' },
  { left: '78%', top: '48%', size: 4, dur: '7.5s', delay: '2.9s' },
  { left: '86%', top: '26%', size: 5, dur: '8.3s', delay: '0.9s' },
  { left: '44%', top: '62%', size: 3, dur: '6.6s', delay: '3.2s' },
  { left: '19%', top: '68%', size: 4, dur: '8.8s', delay: '1.5s' },
];

const STEAM_PARTICLES: ParticleSpec[] = [
  { left: '28%', top: '56%', size: 38, dur: '5.2s', delay: '0s' },
  { left: '31%', top: '58%', size: 30, dur: '5.8s', delay: '1.7s' },
  { left: '54%', top: '50%', size: 42, dur: '6.1s', delay: '0.8s' },
  { left: '57%', top: '52%', size: 32, dur: '5.4s', delay: '2.6s' },
  { left: '72%', top: '54%', size: 36, dur: '6.4s', delay: '1.3s' },
];

const BREEZE_PARTICLES: ParticleSpec[] = [
  { left: '8%', top: '18%', size: 7, dur: '8.2s', delay: '0s' },
  { left: '24%', top: '12%', size: 6, dur: '9.4s', delay: '1.6s' },
  { left: '42%', top: '22%', size: 8, dur: '7.8s', delay: '3.1s' },
  { left: '58%', top: '15%', size: 6, dur: '8.9s', delay: '0.9s' },
  { left: '74%', top: '28%', size: 7, dur: '9.6s', delay: '2.4s' },
  { left: '18%', top: '44%', size: 5, dur: '7.5s', delay: '4.1s' },
];

const TWINKLE_PARTICLES: ParticleSpec[] = [
  { left: '14%', top: '20%', size: 7, dur: '3.0s', delay: '0s' },
  { left: '28%', top: '16%', size: 6, dur: '3.6s', delay: '0.7s' },
  { left: '42%', top: '24%', size: 8, dur: '2.8s', delay: '1.3s' },
  { left: '58%', top: '18%', size: 7, dur: '3.4s', delay: '0.4s' },
  { left: '72%', top: '26%', size: 8, dur: '3.1s', delay: '1.9s' },
  { left: '85%', top: '20%', size: 6, dur: '2.9s', delay: '1.1s' },
  { left: '34%', top: '52%', size: 5, dur: '4.1s', delay: '2.1s' },
  { left: '66%', top: '58%', size: 6, dur: '3.8s', delay: '0.8s' },
  { left: '20%', top: '64%', size: 5, dur: '4.4s', delay: '1.5s' },
];

const SEA_PARTICLES: ParticleSpec[] = [
  { left: '16%', top: '44%', size: 18, dur: '4.4s', delay: '0s' },
  { left: '32%', top: '48%', size: 22, dur: '5.1s', delay: '1.2s' },
  { left: '48%', top: '42%', size: 16, dur: '4.7s', delay: '2.1s' },
  { left: '64%', top: '46%', size: 24, dur: '5.3s', delay: '0.7s' },
  { left: '79%', top: '43%', size: 18, dur: '4.9s', delay: '1.8s' },
];

export function AmbientOverlay({ type }: AmbientOverlayProps) {
  if (type === 'steam') {
    return (
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        {STEAM_PARTICLES.map((p, idx) => (
          <span
            key={idx}
            className="animate-rise-steam absolute rounded-full bg-amber-50/30 blur-xl"
            style={
              {
                left: p.left,
                top: p.top,
                width: `${p.size}px`,
                height: `${p.size}px`,
                '--dur': p.dur,
                '--delay': p.delay,
              } as CSSProperties
            }
          />
        ))}
        {DUST_PARTICLES.slice(0, 5).map((p, idx) => (
          <span
            key={`d-${idx}`}
            className="animate-float-dust absolute rounded-full bg-amber-200/70 blur-[0.5px]"
            style={
              {
                left: p.left,
                top: p.top,
                width: `${p.size}px`,
                height: `${p.size}px`,
                '--dur': p.dur,
                '--delay': p.delay,
              } as CSSProperties
            }
          />
        ))}
      </div>
    );
  }

  if (type === 'breeze') {
    return (
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        {BREEZE_PARTICLES.map((p, idx) => (
          <span
            key={idx}
            className="animate-drift-breeze absolute rounded-full bg-gradient-to-br from-amber-100/85 to-rose-200/65 shadow-[0_0_8px_rgba(255,240,200,0.6)]"
            style={
              {
                left: p.left,
                top: p.top,
                width: `${p.size}px`,
                height: `${Math.max(4, p.size - 2)}px`,
                '--dur': p.dur,
                '--delay': p.delay,
              } as CSSProperties
            }
          />
        ))}
      </div>
    );
  }

  if (type === 'twinkle') {
    return (
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        {TWINKLE_PARTICLES.map((p, idx) => (
          <span
            key={idx}
            className="animate-twinkle-light absolute rounded-full bg-amber-200/90 shadow-[0_0_14px_rgba(255,215,100,0.9)]"
            style={
              {
                left: p.left,
                top: p.top,
                width: `${p.size}px`,
                height: `${p.size}px`,
                '--dur': p.dur,
                '--delay': p.delay,
              } as CSSProperties
            }
          />
        ))}
      </div>
    );
  }

  if (type === 'sea') {
    return (
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        {SEA_PARTICLES.map((p, idx) => (
          <span
            key={idx}
            className="animate-glint-sea absolute rounded-full bg-amber-100/75 blur-[1px]"
            style={
              {
                left: p.left,
                top: p.top,
                width: `${p.size}px`,
                height: '3px',
                '--dur': p.dur,
                '--delay': p.delay,
              } as CSSProperties
            }
          />
        ))}
      </div>
    );
  }

  // Default: warm sunlit dust motes
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {DUST_PARTICLES.map((p, idx) => (
        <span
          key={idx}
          className="animate-float-dust absolute rounded-full bg-amber-200/75 shadow-[0_0_8px_rgba(255,230,150,0.65)]"
          style={
            {
              left: p.left,
              top: p.top,
              width: `${p.size}px`,
              height: `${p.size}px`,
              '--dur': p.dur,
              '--delay': p.delay,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
