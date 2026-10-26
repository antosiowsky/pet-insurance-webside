'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useMemo, useState } from 'react';
import { offers as allOffers, priceFrom, type OfferType, type Species } from '@/data/offers';
import { FilterIcon, XIcon } from '../icons';
import { ComparisonTable } from './ComparisonTable';
import { OfferCard } from './OfferCard';

const AGES = [
  { v: '', label: 'Dowolny wiek', min: 0 },
  { v: '0-1', label: 'do 1 roku', min: 0 },
  { v: '1-3', label: '1–3 lata', min: 1 },
  { v: '4-7', label: '4–7 lat', min: 4 },
  { v: '8-10', label: '8–10 lat', min: 8 },
  { v: '10+', label: 'ponad 10 lat', min: 10 },
];

type Sort = 'polecane' | 'cena' | 'suma';

export function Comparison() {
  const params = useSearchParams();
  const router = useRouter();
  const initialSpecies = params.get('gatunek') === 'kot' ? 'kot' : params.get('gatunek') === 'pies' ? 'pies' : '';

  const [species, setSpecies] = useState<Species | ''>(initialSpecies);
  const [type, setType] = useState<OfferType | ''>('');
  const [age, setAge] = useState('');
  const [budget, setBudget] = useState(250);
  const [needOc, setNeedOc] = useState(false);
  const [needPrevention, setNeedPrevention] = useState(false);
  const [needOnline, setNeedOnline] = useState(false);
  const [needAnyVet, setNeedAnyVet] = useState(false);
  const [sort, setSort] = useState<Sort>('polecane');
  const [view, setView] = useState<'karty' | 'tabela'>('karty');
  const [filtersOpen, setFiltersOpen] = useState(false);

  const setSpeciesAndUrl = (s: Species | '') => {
    setSpecies(s);
    router.replace(s ? `/porownywarka?gatunek=${s}` : '/porownywarka', { scroll: false });
  };

  const list = useMemo(() => {
    const minAge = AGES.find((a) => a.v === age)?.min ?? 0;
    const filtered = allOffers.filter((o) => {
      if (species && !o.species.includes(species)) return false;
      if (type === 'ubezpieczenie' && o.type === 'pakiet') return false;
      if (type === 'pakiet' && o.type === 'ubezpieczenie') return false;
      if (age && o.maxEntryAgeYears !== null && o.maxEntryAgeYears < minAge) return false;
      const p = priceFrom(o);
      if (p && p > budget) return false;
      if (needOc && o.liability === 'brak') return false;
      if (needPrevention && o.prevention === 'brak') return false;
      if (needOnline && !o.purchase.includes('online')) return false;
      if (needAnyVet && !o.anyVet) return false;
      return true;
    });
    return filtered.sort((a, b) => {
      if (sort === 'cena') return (priceFrom(a) ?? 9999) - (priceFrom(b) ?? 9999);
      if (sort === 'suma') return (b.maxTreatmentSum ?? 0) - (a.maxTreatmentSum ?? 0);
      return a.sortOrder - b.sortOrder;
    });
  }, [species, type, age, budget, needOc, needPrevention, needOnline, needAnyVet, sort]);

  const activeCount = [type, age, budget < 250, needOc, needPrevention, needOnline, needAnyVet].filter(Boolean).length;

  const reset = () => {
    setType('');
    setAge('');
    setBudget(250);
    setNeedOc(false);
    setNeedPrevention(false);
    setNeedOnline(false);
    setNeedAnyVet(false);
  };

  const check = (label: string, value: boolean, set: (v: boolean) => void) => (
    <label className="flex items-center gap-3 text-[15px] text-ink-800">
      <input type="checkbox" checked={value} onChange={(e) => set(e.target.checked)} className="h-4 w-4 accent-brand-600" />
      {label}
    </label>
  );

  const filters = (
    <div className="space-y-6">
      <fieldset>
        <legend className="text-sm font-semibold text-ink-900">Rodzaj ochrony</legend>
        <div className="mt-3 space-y-2">
          {[
            ['', 'Wszystkie'],
            ['ubezpieczenie', 'Ubezpieczenie (zwrot kosztów)'],
            ['pakiet', 'Pakiet weterynaryjny'],
          ].map(([v, l]) => (
            <label key={v} className="flex items-center gap-3 text-[15px] text-ink-800">
              <input type="radio" name="type" checked={type === v} onChange={() => setType(v as OfferType | '')} className="h-4 w-4 accent-brand-600" />
              {l}
            </label>
          ))}
        </div>
      </fieldset>
      <label className="block">
        <span className="text-sm font-semibold text-ink-900">Wiek pupila</span>
        <select value={age} onChange={(e) => setAge(e.target.value)} className="mt-2 h-11 w-full rounded-btn border border-ink-100 bg-white px-3 text-ink-900">
          {AGES.map((a) => (
            <option key={a.v} value={a.v}>
              {a.label}
            </option>
          ))}
        </select>
      </label>
      <label className="block">
        <span className="flex justify-between text-sm font-semibold text-ink-900">
          Budżet miesięcznie <span className="tabular-nums text-ink-600">{budget >= 250 ? 'bez limitu' : `do ${budget} zł`}</span>
        </span>
        <input type="range" min={20} max={250} step={5} value={budget} onChange={(e) => setBudget(Number(e.target.value))} className="mt-3 w-full accent-brand-600" />
      </label>
      <fieldset className="space-y-2.5">
        <legend className="text-sm font-semibold text-ink-900">Musi zawierać</legend>
        <div className="mt-3 space-y-2.5">
          {check('OC właściciela', needOc, setNeedOc)}
          {check('Profilaktykę (szczepienia, przeglądy)', needPrevention, setNeedPrevention)}
          {check('Zakup online', needOnline, setNeedOnline)}
          {check('Dowolną lecznicę', needAnyVet, setNeedAnyVet)}
        </div>
      </fieldset>
      <button type="button" onClick={reset} className="text-sm font-semibold text-ink-800 underline underline-offset-4 hover:text-brand-600">
        Wyczyść filtry
      </button>
    </div>
  );

  return (
    <div>
      <div className="inline-grid grid-cols-3 gap-1 rounded-btn bg-ink-50 p-1 text-sm font-semibold" role="group" aria-label="Gatunek">
        {(
          [
            ['', 'Pies i kot'],
            ['pies', 'Pies'],
            ['kot', 'Kot'],
          ] as const
        ).map(([v, l]) => (
          <button
            key={v}
            type="button"
            aria-pressed={species === v}
            onClick={() => setSpeciesAndUrl(v)}
            className={`rounded-[0.6rem] px-5 py-2.5 ${species === v ? 'bg-white text-ink-900 shadow-sm ring-1 ring-ink-100' : 'text-ink-500 hover:text-ink-900'}`}
          >
            {l}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[280px_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-24 rounded-card border border-line bg-white p-5 shadow-card">
            <p className="flex items-center gap-2 font-heading font-bold text-ink-900">
              <FilterIcon className="h-5 w-5" /> Filtry
            </p>
            <div className="mt-5">{filters}</div>
          </div>
        </aside>

        <div>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-ink-600" aria-live="polite">
              Znaleziono <strong className="text-ink-900">{list.length}</strong> {list.length === 1 ? 'ofertę' : list.length > 1 && list.length < 5 ? 'oferty' : 'ofert'}
            </p>
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setFiltersOpen(true)}
                className="inline-flex h-10 items-center gap-2 rounded-btn border border-ink-100 bg-white px-3 text-sm font-semibold text-ink-900 lg:hidden"
              >
                <FilterIcon className="h-4 w-4" /> Filtry{activeCount ? ` (${activeCount})` : ''}
              </button>
              <label className="sr-only" htmlFor="sort">
                Sortowanie
              </label>
              <select id="sort" value={sort} onChange={(e) => setSort(e.target.value as Sort)} className="h-10 rounded-btn border border-ink-100 bg-white px-3 text-sm text-ink-900">
                <option value="polecane">Sortuj: polecane</option>
                <option value="cena">Sortuj: cena od najniższej</option>
                <option value="suma">Sortuj: suma leczenia</option>
              </select>
              <div className="hidden rounded-btn bg-ink-50 p-1 text-sm font-semibold sm:inline-flex" role="group" aria-label="Widok">
                {(['karty', 'tabela'] as const).map((v) => (
                  <button
                    key={v}
                    type="button"
                    aria-pressed={view === v}
                    onClick={() => setView(v)}
                    className={`rounded-[0.6rem] px-4 py-1.5 capitalize ${view === v ? 'bg-white text-ink-900 shadow-sm' : 'text-ink-500'}`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {list.length === 0 ? (
            <div className="mt-6 rounded-card border border-dashed border-ink-200 bg-white p-8 text-center">
              <p className="font-heading text-lg font-bold text-ink-900">Brak ofert dla wybranych filtrów</p>
              <p className="mt-2 text-ink-600">Zmień kryteria albo zadzwoń – sprawdzę możliwości także poza porównywarką.</p>
              <button type="button" onClick={reset} className="mt-4 font-semibold text-brand-700 underline">
                Wyczyść filtry
              </button>
            </div>
          ) : view === 'tabela' ? (
            <div className="mt-6">
              <ComparisonTable offers={list} placement="porownywarka-tabela" />
            </div>
          ) : (
            <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {list.map((o) => (
                <OfferCard key={o.slug} offer={o} placement="porownywarka-karta" />
              ))}
            </div>
          )}
        </div>
      </div>

      {filtersOpen && (
        <div className="fixed inset-0 z-[55] lg:hidden" role="dialog" aria-modal="true" aria-label="Filtry">
          <button type="button" className="absolute inset-0 bg-ink-950/50" aria-label="Zamknij filtry" onClick={() => setFiltersOpen(false)} />
          <div className="absolute inset-x-0 bottom-0 max-h-[85vh] overflow-y-auto rounded-t-xl2 bg-white p-6">
            <div className="flex items-center justify-between">
              <p className="font-heading text-lg font-bold text-ink-900">Filtry</p>
              <button type="button" onClick={() => setFiltersOpen(false)} aria-label="Zamknij" className="p-2">
                <XIcon className="h-6 w-6" />
              </button>
            </div>
            <div className="mt-4">{filters}</div>
            <button type="button" onClick={() => setFiltersOpen(false)} className="mt-6 h-12 w-full rounded-btn bg-brand-600 font-semibold text-white">
              Pokaż {list.length} {list.length === 1 ? 'ofertę' : list.length > 1 && list.length < 5 ? 'oferty' : 'ofert'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
