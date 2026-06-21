import { Briefcase, FileText, Users, Clock, ArrowRight } from 'lucide-react'

const PERKS = [
  { icon: FileText, title: 'Consolidated Billing', desc: 'One monthly invoice for your whole team — no more collecting receipts.' },
  { icon: Clock, title: 'Priority Dispatch', desc: 'Corporate accounts get front-of-line pickup during busy hours.' },
  { icon: Users, title: 'Client & Staff Travel', desc: 'Move employees and guests reliably, with a professional first impression.' },
]

export default function Corporate() {
  return (
    <section id="corporate" className="bg-gray-50 py-20">
      <div className="container-px">
        <div className="overflow-hidden rounded-3xl bg-brand-black shadow-card">
          <div className="grid gap-10 p-8 sm:p-12 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-brand-yellow/15 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-brand-yellow">
                <Briefcase className="h-4 w-4" />
                For Business
              </span>
              <h2 className="mt-5 font-display text-3xl font-extrabold text-white sm:text-4xl">
                Corporate Accounts Made Easy
              </h2>
              <p className="mt-4 max-w-md text-gray-300">
                Keep your business moving with priority service, simplified billing and
                dedicated support. Ideal for offices, hotels, clinics and events across
                Greater Sudbury.
              </p>
              <a href="#contact" className="btn-primary mt-7">
                Set Up an Account
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>

            <div className="grid gap-4">
              {PERKS.map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  className="flex gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 transition-colors hover:border-brand-yellow/50"
                >
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-brand-yellow text-brand-black">
                    <Icon className="h-6 w-6" strokeWidth={2} />
                  </div>
                  <div>
                    <h3 className="font-display text-base font-bold text-white">{title}</h3>
                    <p className="mt-1 text-sm text-gray-300">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
