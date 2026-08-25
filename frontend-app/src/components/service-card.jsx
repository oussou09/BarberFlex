import { ICON_MAP } from './icons'

// Shared service card used on the Home and About pages.
export default function ServiceCard({ service }) {
  const Icon = ICON_MAP[service.icon]
  return (
    <div className="group flex h-full flex-col rounded-2xl border border-gray-300/50 bg-gray-700/40 p-6 transition-colors hover:border-paper">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-paper text-ink transition-transform group-hover:scale-110">
        {Icon ? <Icon size={24} /> : null}
      </div>
      <h3 className="mt-5 font-display text-xl font-semibold uppercase tracking-wide text-paper">
        {service.name}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-100">
        {service.description}
      </p>
      <p className="mt-4 font-display text-lg font-bold text-paper">
        {service.price}
      </p>
    </div>
  )
}
