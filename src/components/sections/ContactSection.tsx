import { emailHref, phoneHref, site } from '@/config/site';
import { MailIcon, PhoneIcon } from '../icons';
import { ContactForm } from '../forms/ContactForm';

export function ContactCards() {
  return (
    <div className="space-y-4">
      <a href={phoneHref} data-placement="kontakt-karta" className="flex items-center gap-4 rounded-card border border-line bg-white p-4 shadow-card hover:border-brand-600">
        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-600 text-white">
          <PhoneIcon className="h-6 w-6" />
        </span>
        <span>
          <span className="block text-sm text-ink-500">Telefon ({site.contact.hours.value})</span>
          <span className="font-heading text-xl font-bold text-ink-900">{site.contact.phone.value}</span>
        </span>
      </a>
      <a href={emailHref} className="flex items-center gap-4 rounded-card border border-line bg-white p-4 shadow-card hover:border-brand-600">
        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-ink-900 text-white">
          <MailIcon className="h-6 w-6" />
        </span>
        <span className="min-w-0">
          <span className="block text-sm text-ink-500">E-mail</span>
          <span className="block truncate font-heading text-xl font-bold text-ink-900">{site.contact.email.value}</span>
        </span>
      </a>
    </div>
  );
}

export function ContactSection() {
  return (
    <section id="kontakt" className="container-page py-16 lg:py-24">
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="eyebrow">Kontakt</p>
          <h2 className="mt-2 text-3xl font-bold md:text-4xl">Wolisz porozmawiać?</h2>
          <p className="mt-4 text-lg text-ink-600">Zostaw numer – oddzwonię, pomogę wybrać wariant i przeprowadzę Cię przez zakup. Bez zobowiązań.</p>
          <div className="mt-8">
            <ContactCards />
          </div>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
