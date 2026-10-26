import Link from 'next/link';
import { site } from '@/config/site';
import { AgentPhoto } from '../AgentPhoto';

export function AgentSection() {
  return (
    <section className="container-page py-16 lg:py-20">
      <div className="grid items-center gap-10 rounded-xl2 bg-sand p-6 md:grid-cols-[auto_1fr] md:p-10 lg:gap-14">
        <AgentPhoto size={208} className="mx-auto" />
        <div>
          <p className="eyebrow">Kim jestem</p>
          <h2 className="mt-2 text-3xl font-bold">Cześć, jestem {site.agent.name.value.split(' ')[0]}</h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-600">„{site.agent.bio.value}”</p>
          <div className="mt-6 flex flex-wrap gap-3 text-sm">
            <span className="rounded-full bg-white px-4 py-2 font-medium text-ink-800">Agentka – nr w rejestrze KNF: {site.agent.knfNumber.value}</span>
            <span className="rounded-full bg-white px-4 py-2 font-medium text-ink-800">{site.agent.area.value}</span>
            <Link href="/o-mnie" className="rounded-full bg-ink-900 px-4 py-2 font-semibold text-white hover:bg-ink-800">
              Więcej o mnie →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
