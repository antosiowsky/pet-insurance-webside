import { SpeciesHub } from '@/components/sections/SpeciesHub';
import { dogFaq } from '@/data/content';
import { getAllPosts } from '@/lib/blog';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Ubezpieczenie psa 2026 – porównanie ofert, ceny i zakres',
  description:
    'Ubezpieczenie psa: porównanie PZU, Generali i Bezpieczny.pl. Koszty leczenia, OC właściciela psa, karencje i ceny orientacyjne. Pomoc agentki przy wyborze.',
  path: '/ubezpieczenie-psa',
});

export default function DogPage() {
  const posts = getAllPosts()
    .filter((p) => ['pies', 'oc', 'koszty', 'warunki'].includes(p.category))
    .slice(0, 3);
  return (
    <SpeciesHub
      species="pies"
      title="Ubezpieczenie psa – porównanie ofert 2026"
      lead="Koszty leczenia, OC właściciela i pomoc, gdy coś się wydarzy. Zobacz, czym różnią się polisy dla psa i która pasuje do Twojego czworonoga."
      image="/images/pies-pole.webp"
      imageAlt="Uśmiechnięty biało-czarny pies na chodniku"
      intro={
        <>
          <h2>Po co ubezpieczać psa?</h2>
          <p>
            Pies, który biega po parku, je wszystko, co znajdzie, i z radością wskakuje do wody, prędzej czy później trafi do weterynarza. Skaleczona
            łapa, zjedzona zabawka, zerwane więzadło – to codzienność gabinetów, a rachunek potrafi wynieść kilka tysięcy złotych.
          </p>
          <p>
            Ubezpieczenie psa zwraca większość kosztów leczenia po chorobie lub wypadku. Dobra polisa ma też <strong>OC właściciela</strong> – na
            wypadek, gdy pies wyrządzi komuś szkodę – i dodatki, takie jak pomoc prawna czy opieka nad psem, gdy Ty trafisz do szpitala.
          </p>
        </>
      }
      priceFactors={[
        { title: 'Wiek psa', text: 'Młody pies to niższa składka i szerszy zakres. Wielu ubezpieczycieli przyjmuje psy tylko do określonego wieku.' },
        { title: 'Suma na leczenie', text: 'Warianty od kilku do kilkudziesięciu tysięcy złotych. Przy dużym, aktywnym psie lepiej celować wyżej.' },
        { title: 'Rasa i wielkość', text: 'Część ofert ma wyższe stawki lub wyłączenia dla ras ze skłonnością do chorób lub uznawanych za ryzykowne.' },
        { title: 'Zakres dodatkowy', text: 'OC, ochrona prawna, assistance czy świadczenie za śmierć psa podnoszą cenę, ale bywają kluczowe.' },
      ]}
      covers={[
        'Wizyty, konsultacje i badania (krew, USG, RTG, czasem TK i rezonans)',
        'Zabiegi i operacje po wypadku lub chorobie, hospitalizacja',
        'Leki podane w gabinecie i – w limicie – leki do domu',
        'OC właściciela psa (w opcji lub w pakiecie)',
        'Eutanazja i kremacja, w części ofert świadczenie za śmierć psa',
      ]}
      faq={dogFaq}
      posts={posts}
    />
  );
}
