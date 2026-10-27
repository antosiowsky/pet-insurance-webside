import { ContactForm } from '@/components/forms/ContactForm';
import { PageHeader } from '@/components/PageHeader';
import { ContactCards } from '@/components/sections/ContactSection';
import { site } from '@/config/site';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Kontakt – zamów rozmowę o ubezpieczeniu psa lub kota',
  description: `Zadzwoń (${site.contact.phone.value}), napisz lub zostaw numer – oddzwonię i pomogę wybrać ubezpieczenie dla psa lub kota.`,
  path: '/kontakt',
});

export default function ContactPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ name: 'Kontakt', path: '/kontakt' }]}
        title="Porozmawiajmy o ubezpieczeniu Twojego pupila"
        lead="Najszybciej przez telefon. Możesz też zostawić numer – oddzwonię w godzinach pracy."
      />
      <section className="container-page grid gap-10 py-14 lg:grid-cols-2 lg:gap-16">
        <div>
          <ContactCards />
          <div className="mt-8 rounded-card bg-sand p-6">
            <h2 className="text-xl font-bold">Dane kontaktowe</h2>
            <dl className="mt-4 space-y-2 text-ink-600">
              <div>
                <dt className="inline font-medium text-ink-800">Linia telefoniczna: </dt>
                <dd className="inline">{site.contact.hours.value}</dd>
              </div>
              <div>
                <dt className="inline font-medium text-ink-800">Godziny biura: </dt>
                <dd className="inline">{site.contact.officeHours.value}</dd>
              </div>
              <div>
                <dt className="inline font-medium text-ink-800">Obszar: </dt>
                <dd className="inline">{site.agent.area.value}</dd>
              </div>
              <div>
                <dt className="inline font-medium text-ink-800">Adres biura: </dt>
                <dd className="inline">
                  {site.agent.officeName.value}, {site.agent.address.value}
                </dd>
              </div>
            </dl>
          </div>
        </div>
        <ContactForm />
      </section>
    </>
  );
}
