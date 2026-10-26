import { SpeciesHub } from '@/components/sections/SpeciesHub';
import { catFaq } from '@/data/content';
import { getAllPosts } from '@/lib/blog';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Ubezpieczenie kota 2026 – porównanie ofert i ceny',
  description:
    'Ubezpieczenie kota domowego i wychodzącego: porównanie PZU Dla Psa i Kota oraz pakietów PetHelp. Zakres, karencja, ceny orientacyjne i pomoc agentki.',
  path: '/ubezpieczenie-kota',
});

export default function CatPage() {
  const posts = getAllPosts()
    .filter((p) => ['kot', 'porownania', 'warunki', 'koszty'].includes(p.category))
    .slice(0, 3);
  return (
    <SpeciesHub
      species="kot"
      title="Ubezpieczenie kota – porównanie ofert 2026"
      lead="Koty chorują po cichu, a leczenie bywa długie. Sprawdź, jak ubezpieczenie i pakiet weterynaryjny pomagają opłacić weterynarza."
      image="/images/kot-lapa.webp"
      imageAlt="Rudy kot unosi łapę na turkusowym tle"
      intro={
        <>
          <h2>Kot też potrzebuje ochrony</h2>
          <p>
            Koty świetnie ukrywają ból. Często trafiają do weterynarza dopiero wtedy, gdy choroba jest zaawansowana – a wtedy potrzebne są badania
            krwi, USG, kroplówki i kilka dni w szpitalu. Dotyczy to także kotów, które nigdy nie wychodzą z domu.
          </p>
          <p>
            Ubezpieczenie kota zwraca koszty leczenia po chorobie lub wypadku, a <strong>pakiet weterynaryjny</strong> pozwala z góry opłacić
            szczepienia i przeglądy. Wiele osób łączy oba rozwiązania.
          </p>
        </>
      }
      priceFactors={[
        { title: 'Wiek kota', text: 'Im młodszy kot, tym niższa składka. Limity wieku przy zakupie to zwykle 8–10 lat.' },
        { title: 'Suma na leczenie', text: 'Leczenie chorób nerek czy układu moczowego bywa długie – niska suma szybko się wyczerpie.' },
        { title: 'Kot wychodzący czy domowy', text: 'Kot wychodzący częściej ulega wypadkom, domowy – częściej choruje przewlekle. Dobierz zakres do stylu życia.' },
        { title: 'Profilaktyka', text: 'Szczepienia i stomatologię dokupisz jako opcję albo w pakiecie weterynaryjnym.' },
      ]}
      covers={[
        'Wizyty, badania krwi i moczu, USG i RTG',
        'Leczenie chorób układu moczowego, nerek, przewodu pokarmowego',
        'Zabiegi i operacje, np. usunięcie ciała obcego',
        'Hospitalizacja i kroplówki',
        'W opcji: profilaktyka, stomatologia, assistance',
      ]}
      faq={catFaq}
      posts={posts}
    />
  );
}
