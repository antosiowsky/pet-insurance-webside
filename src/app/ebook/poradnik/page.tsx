import Link from 'next/link';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { btn, CheckItem, Notice } from '@/components/ui';
import { site } from '@/config/site';
import { owuDocuments } from '@/data/owu';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: site.ebook.title.value,
  description: site.ebook.subtitle.value,
  path: '/ebook/poradnik',
});

const checklist = [
  'Jaka jest suma ubezpieczenia na leczenie i czy zużywa się po każdej wypłacie?',
  'Ile wynosi udział własny / procent zwrotu (np. 80% = 20% płacisz sam)?',
  'Jakie są karencje na chorobę i na wypadek?',
  'Czy choroby istniejące przed polisą są wyłączone – i jak ubezpieczyciel to sprawdza?',
  'Czy jest limit na leki „do domu”, diagnostykę albo konkretne procedury?',
  'Czy OC właściciela jest w cenie, opcją, czy w ogóle niedostępne?',
  'Czy możesz iść do dowolnej lecznicy, czy tylko do sieci partnerskiej?',
  'Do jakiego wieku pupila możesz kupić polisę i czy da się ją przedłużać później?',
  'Jak zgłaszasz szkodę (aplikacja, formularz, telefon) i jakie dokumenty są wymagane?',
  'Ile masz czasu na zgłoszenie od daty wizyty / faktury?',
];

export default function EbookGuidePage() {
  return (
    <article>
      <header className="border-b border-line bg-cream">
        <div className="container-page py-10 lg:py-14">
          <Breadcrumbs
            items={[
              { name: 'E-book', path: '/ebook' },
              { name: 'Poradnik', path: '/ebook/poradnik' },
            ]}
          />
          <p className="eyebrow mt-6">Darmowy poradnik</p>
          <h1 className="mt-2 max-w-3xl text-4xl font-bold md:text-5xl">{site.ebook.title.value}</h1>
          <p className="mt-4 max-w-2xl text-lg text-ink-600">{site.ebook.subtitle.value}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={site.ebook.pdfPath.value} className={btn.primary} download>
              Pobierz PDF
            </a>
            <Link href="/ebook" className={btn.secondary}>
              Zostaw e-mail (newsletter)
            </Link>
          </div>
        </div>
      </header>

      <div className="container-page prose-article max-w-3xl py-12 lg:py-16">
        <Notice tone="info">
          To poradnik informacyjny agentki, nie oferta w rozumieniu art. 66 KC. Przed zakupem zawsze czytaj aktualne OWU i IPID u wybranego
          ubezpieczyciela – warunki bywają aktualizowane.
        </Notice>

        <h2>Dlaczego warto czytać OWU przed kliknięciem „kupuję”</h2>
        <p>
          Reklama mówi o „zwrocie do 80%” albo „sumie 50 tys. zł”. W praktyce o tym, czy dostaniesz pieniądze, decydują: udział własny, limity
          cząstkowe, karencje, wyłączenia (szczególnie choroby wcześniejsze) i sposób zgłoszenia szkody. Poniżej masz checklistę – możesz przejść
          ją przy każdej ofercie z{' '}
          <Link href="/porownywarka">porównywarki</Link>.
        </p>

        <h2>1. Udział własny i procent zwrotu</h2>
        <p>
          „Do 80% zwrotu” oznacza zwykle, że 20% rachunku płacisz sam – o ile koszt w ogóle jest objęty ochroną. Sprawdź, czy udział własny jest
          procentowy, kwotowy, czy łączy się z limitem na leki. To często największa niespodzianka przy pierwszej szkodzie.
        </p>

        <h2>2. Suma ubezpieczenia i limity</h2>
        <p>
          Suma roczna (np. 10 tys. albo 50 tys. zł) to sufit wypłat. Pytaj też o limity cząstkowe: diagnostyka, leki do domu, ortopedia, choroby
          przewlekłe. Sprawdź, czy suma „konsumuje się” po każdej wypłacie (maleje), czy jest odnawiana.
        </p>

        <h2>3. Karencje</h2>
        <p>
          Karencja to czas na początku polisy, w którym ochrona jeszcze nie działa (albo działa tylko częściowo). Typowo wypadki startują szybciej
          niż choroby. Jeśli pupil „ledwo co” zaczął kaszleć przed zakupem – to zwykle nie przejdzie jako szkoda w pierwszych tygodniach.
        </p>

        <h2>4. Wyłączenia – szczególnie choroby wcześniejsze</h2>
        <p>
          Ubezpieczyciel nie pokrywa zwykle schorzeń, które istniały albo dawały objawy przed startem ochrony (i w karencji). Warto mieć
          historię leczenia i szczepień. Czytaj listę wyłączeń: wady wrodzone, behawior, niektóre rasy albo procedury bywają poza zakresem.
        </p>

        <h2>5. OC właściciela</h2>
        <p>
          OC chroni Ciebie, gdy pies (rzadziej kot) wyrządzi szkodę osobie trzeciej – pogryzienie, przewrócenie, uszkodzenie mienia. To osobny
          temat niż koszty leczenia pupila. Sprawdź sumę gwarancyjną, terytorium (Polska / Europa) i czy rażące niedbalstwo jest w zakresie.
        </p>

        <h2>6. Jak wygląda zgłoszenie szkody</h2>
        <p>
          Model refundacyjny: najpierw płacisz weterynarzowi, potem składasz dokumenty. Potrzebujesz zwykle faktury i raportu z wizyty. Zapisz
          termin na zgłoszenie (np. 30–90 dni). Przy pakietach abonamentowych (jak PetHelp) nie ma „zwrotu” – korzystasz z usług w sieci
          partnerskiej według regulaminu.
        </p>

        <h2>Checklista przed zakupem</h2>
        <ul className="not-prose mt-4 space-y-2.5">
          {checklist.map((item) => (
            <CheckItem key={item}>{item}</CheckItem>
          ))}
        </ul>

        <h2>Dokumenty OWU partnerów z porównywarki</h2>
        <p>Poniższe linki prowadzą do aktualnych (na dzień publikacji poradnika) dokumentów. Zawsze sprawdź datę na pierwszej stronie PDF.</p>
        <ul>
          {owuDocuments.map((d) => (
            <li key={d.partner + d.product}>
              <strong>{d.partner}</strong> – {d.product}:{' '}
              {d.url ? (
                <a href={d.url} target="_blank" rel="noopener noreferrer">
                  {d.label}
                </a>
              ) : (
                <span className="text-warning-800">TODO: brak oficjalnego URL – {d.label}</span>
              )}
              {d.note && <span className="text-ink-500"> ({d.note})</span>}
            </li>
          ))}
        </ul>

        <h2>Co dalej?</h2>
        <p>
          Porównaj oferty w <Link href="/porownywarka">porównywarce</Link>, przeczytaj krótką analizę produktu i – jeśli chcesz –{' '}
          <Link href="/kontakt">zadzwoń lub napisz</Link>. Pomogę dobrać wariant do wieku, rasy i budżetu, bez dodatkowych opłat z Twojej
          strony.
        </p>
        <p className="text-sm text-ink-500">
          © {new Date().getFullYear()} {site.name} · {site.agent.name.value}, nr KNF {site.agent.knfNumber.value}
        </p>
      </div>
    </article>
  );
}
