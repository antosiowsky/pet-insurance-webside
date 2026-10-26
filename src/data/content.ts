import type { FaqItem } from '@/components/Faq';

export const vetCosts = [
  { label: 'Operacja ortopedyczna', value: '2 000–6 000 zł' },
  { label: 'RTG + badanie krwi', value: '220–750 zł' },
  { label: 'USG jamy brzusznej', value: '150–350 zł' },
  { label: 'Hospitalizacja (doba)', value: '150–500 zł' },
];

export const homeFaq: FaqItem[] = [
  {
    q: 'Czy za porównanie i pomoc płacę coś dodatkowo?',
    a: 'Nie. Składka jest taka sama, jak przy zakupie bezpośrednio u ubezpieczyciela. Moje wynagrodzenie to prowizja wypłacana przez zakład ubezpieczeń.',
  },
  {
    q: 'Od kiedy działa ubezpieczenie psa lub kota?',
    a: 'Ochrona na wypadki zwykle działa od początku umowy, a na choroby – po okresie karencji, najczęściej 30–60 dni. Dokładne terminy podaję przy każdej ofercie.',
  },
  {
    q: 'Czy mogę ubezpieczyć starszego psa lub kota?',
    a: 'Tak, ale ubezpieczyciele mają limity wieku przy zawieraniu umowy (często 8–10 lat). W porównywarce możesz filtrować oferty po wieku pupila, a w nietypowej sytuacji – zadzwoń, sprawdzę możliwości.',
  },
  {
    q: 'Czy mogę leczyć pupila u swojego weterynarza?',
    a: 'W większości ubezpieczeń tak – płacisz rachunek i wnioskujesz o zwrot. Pakiety weterynaryjne działają natomiast w sieci placówek partnerskich.',
  },
  {
    q: 'Co, jeśli mój pies ma już przewlekłą chorobę?',
    a: 'Choroby rozpoznane przed zawarciem umowy są zazwyczaj wyłączone z ochrony. Polisa nadal może chronić przed nowymi chorobami, wypadkami i OC – warto to sprawdzić indywidualnie.',
  },
  {
    q: 'Jak zgłosić szkodę?',
    a: 'Zachowaj fakturę i dokumentację z lecznicy, a następnie zgłoś szkodę online lub telefonicznie u ubezpieczyciela. Jeśli masz polisę zawartą przeze mnie, pomogę przygotować zgłoszenie.',
  },
];

export const dogFaq: FaqItem[] = [
  {
    q: 'Czy ubezpieczenie psa jest obowiązkowe?',
    a: 'Nie, w Polsce nie ma obowiązkowego ubezpieczenia psa. Niektóre gminy i regulaminy (np. wynajmu mieszkań) mogą jednak wymagać OC przy psach określonych ras.',
  },
  {
    q: 'Czy OC psa jest w ubezpieczeniu mieszkania?',
    a: 'Często tak – w ramach OC w życiu prywatnym. Sprawdź jednak sumę gwarancyjną, wyłączenia ras i to, czy ochrona obejmuje rażące niedbalstwo, np. psa bez smyczy.',
  },
  {
    q: 'Czy ubezpieczenie obejmuje sterylizację i szczepienia?',
    a: 'Standardowo nie – to zabiegi planowe. Część ofert pozwala dokupić profilaktykę, a pakiety weterynaryjne obejmują szczepienia i przeglądy w cenie abonamentu.',
  },
  {
    q: 'Czy muszę mieć chip i książeczkę zdrowia?',
    a: 'Większość ubezpieczycieli wymaga identyfikacji psa (chip lub tatuaż) i dokumentacji szczepień. Wymagania podaję przy każdej ofercie.',
  },
];

export const catFaq: FaqItem[] = [
  {
    q: 'Czy warto ubezpieczyć kota, który nie wychodzi z domu?',
    a: 'Tak, jeśli chcesz uniknąć dużych, nagłych wydatków. Koty domowe częściej chorują na układ moczowy, nerki i zęby, a wypadki – np. upadki z okna – też się zdarzają.',
  },
  {
    q: 'Ile kosztuje ubezpieczenie kota?',
    a: 'Podstawowe warianty dla młodego kota kosztują zwykle kilkadziesiąt złotych miesięcznie. Cena zależy od wieku, sumy na leczenie i dodatków.',
  },
  {
    q: 'Do jakiego wieku można ubezpieczyć kota?',
    a: 'Zależy od ubezpieczyciela – często do 8–10 lat przy zawieraniu umowy. Później polisę zwykle można kontynuować.',
  },
  {
    q: 'Czy ubezpieczenie kota obejmuje stomatologię?',
    a: 'Leczenie zębów po chorobie lub wypadku bywa objęte ochroną, ale higiena jamy ustnej i usuwanie kamienia to zwykle zabiegi profilaktyczne – dostępne jako opcja lub w pakietach.',
  },
];
