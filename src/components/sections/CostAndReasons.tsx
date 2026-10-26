import { vetCosts } from '@/data/content';
import { HeartIcon, HomeIcon, SearchIcon, ShieldIcon } from '../icons';

const reasons = [
  { icon: HeartIcon, tone: 'bg-brand-50 text-brand-600', title: 'Leczenie bez dylematów', text: 'Zwrot większości rachunku za wizyty, badania, zabiegi i operacje.' },
  { icon: ShieldIcon, tone: 'bg-ink-50 text-ink-900', title: 'OC właściciela', text: 'Gdy pies pogryzie rowerzystę lub zniszczy cudzą rzecz, płaci ubezpieczyciel.' },
  { icon: SearchIcon, tone: 'bg-honey-100 text-honey-700', title: 'Diagnostyka objawów', text: 'Kot przestał jeść? Badania i USG, zanim pojawi się poważny problem.' },
  { icon: HomeIcon, tone: 'bg-success-50 text-success-600', title: 'Opieka, gdy Ty nie możesz', text: 'Assistance: hotel dla pupila, poszukiwanie zaginionego, konsultacja behawiorysty.' },
];

export function CostAndReasons({ title = 'Ile może kosztować leczenie pupila?' }: { title?: string }) {
  return (
    <section className="bg-white">
      <div className="container-page py-16 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <p className="eyebrow">Dlaczego warto</p>
            <h2 className="mt-2 text-3xl font-bold md:text-4xl">{title}</h2>
            <p className="mt-4 text-lg text-ink-600">
              Zwierzę nie powie, że coś je boli. Gdy przychodzi diagnoza, polisa pozwala decydować o leczeniu z myślą o zdrowiu, a nie o portfelu.
            </p>
            <div className="mt-8 space-y-3">
              {vetCosts.map((c) => (
                <div key={c.label} className="flex items-center justify-between gap-4 rounded-card bg-sand px-5 py-4">
                  <span className="font-medium text-ink-800">{c.label}</span>
                  <span className="font-heading text-lg font-bold whitespace-nowrap text-ink-900">{c.value}</span>
                </div>
              ))}
            </div>
            <p className="mt-3 text-xs text-ink-500">Orientacyjne widełki cen w polskich lecznicach, 2026.</p>
          </div>
          <div className="grid content-start gap-5 sm:grid-cols-2">
            {reasons.map((r) => (
              <div key={r.title} className="rounded-card border border-line p-6">
                <span className={`flex h-12 w-12 items-center justify-center rounded-xl ${r.tone}`}>
                  <r.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-4 text-lg font-bold">{r.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-600">{r.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
