import Link from 'next/link';
import { AgentPhoto } from '@/components/AgentPhoto';
import { PageHeader } from '@/components/PageHeader';
import { ContactSection } from '@/components/sections/ContactSection';
import { Reviews } from '@/components/sections/Reviews';
import { btn, CheckItem } from '@/components/ui';
import { site } from '@/config/site';
import { offers } from '@/data/offers';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: `O mnie – ${site.agent.name.value}, agentka ubezpieczeniowa`,
  description: 'Kim jestem, z jakimi ubezpieczycielami współpracuję i jak pomagam wybrać ubezpieczenie dla psa i kota – bez dodatkowych opłat.',
  path: '/o-mnie',
});

export default function AboutPage() {
  return (
    <>
      <PageHeader crumbs={[{ name: 'O mnie', path: '/o-mnie' }]} title={`Cześć, jestem ${site.agent.name.value}`} lead={site.agent.bio.value} />
      <section className="container-page grid gap-12 py-14 lg:grid-cols-[auto_1fr] lg:gap-16">
        <AgentPhoto size={280} className="mx-auto" />
        <div className="max-w-3xl space-y-10">
          <div>
            <h2 className="text-3xl font-bold">Jak pracuję</h2>
            <p className="mt-4 text-lg leading-relaxed">
              Jestem agentką ubezpieczeniową. Pomagam opiekunom psów i kotów wybrać polisę, która naprawdę zadziała, gdy będzie potrzebna – a nie tylko
              dobrze wygląda w reklamie. Porównuję zakres, karencje, limity i wyłączenia, a potem mówię wprost, co jest mocną stroną oferty, a na co
              trzeba uważać.
            </p>
            <ul className="mt-6 space-y-3 text-[17px]">
              <CheckItem>Bez dodatkowych opłat – wynagrodzenie otrzymuję od ubezpieczyciela</CheckItem>
              <CheckItem>Kontakt telefoniczny, mailowy lub online – {site.agent.area.value.toLowerCase()}</CheckItem>
              <CheckItem>Pomoc przy zgłoszeniu szkody i przedłużeniu polisy</CheckItem>
              <CheckItem>Uczciwie o wyłączeniach – wolę, żebyś wiedział(a) przed zakupem</CheckItem>
            </ul>
          </div>
          <div>
            <h2 className="text-3xl font-bold">Uprawnienia i współpraca</h2>
            <dl className="mt-6 divide-y divide-line rounded-card border border-line bg-white">
              {[
                ['Status', 'agent ubezpieczeniowy'],
                ['Numer w rejestrze KNF', site.agent.knfNumber.value],
                ['Działalność gospodarcza', `${site.agent.businessOwner.value} – ${site.agent.officeName.value}`],
                ['NIP', site.agent.nip.value],
                ['Zakłady / partnerzy agencyjni', site.agent.insurers.value.join(', ')],
                ['Partnerzy w porównywarce', offers.map((o) => o.shortName).join(', ')],
                ['Doświadczenie', `${site.agent.yearsOfExperience.value} lat`],
              ].map(([k, v]) => (
                <div key={k} className="grid gap-1 p-4 sm:grid-cols-[240px_1fr]">
                  <dt className="font-medium text-ink-800">{k}</dt>
                  <dd className="text-ink-600">{v}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 text-sm text-ink-500">
              Wpis możesz sprawdzić w rejestrze pośredników ubezpieczeniowych prowadzonym przez KNF. Pełne dane w{' '}
              <Link href="/informacja-o-agencie" className="font-semibold text-brand-700 underline">
                informacji o agencie
              </Link>
              .
            </p>
          </div>
          <Link href="/porownywarka" className={btn.primary}>
            Zobacz porównanie ofert
          </Link>
        </div>
      </section>
      <Reviews />
      <ContactSection />
    </>
  );
}
