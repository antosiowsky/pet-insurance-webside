import Image from 'next/image';
import { site } from '@/config/site';

export function AgentPhoto({ size = 224, className = '' }: { size?: number; className?: string }) {
  const photo = site.agent.photo.value;
  if (photo) {
    return (
      <Image src={photo} alt={site.agent.name.value} width={size} height={size} className={`rounded-full object-cover ring-8 ring-white/60 ${className}`} />
    );
  }
  return (
    <div
      style={{ width: size, height: size }}
      className={`flex shrink-0 items-center justify-center rounded-full bg-ink-900 font-heading text-white ring-8 ring-white/60 ${className}`}
      role="img"
      aria-label={site.agent.name.value}
    >
      <span style={{ fontSize: size / 3.2 }} className="font-bold">
        {site.agent.name.value
          .split(' ')
          .map((p) => p[0])
          .join('')}
      </span>
    </div>
  );
}
