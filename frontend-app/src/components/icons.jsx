/*
 * Minimal, line-style SVG icons (svgapi-inspired) for the whole site.
 * All icons inherit `currentColor` so they follow the black/white/gray palette.
 */

const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

function Svg({ size = 24, children, ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
      {...base}
      {...props}
    >
      {children}
    </svg>
  )
}

export function MenuIcon(props) {
  return (
    <Svg {...props}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </Svg>
  )
}

export function CloseIcon(props) {
  return (
    <Svg {...props}>
      <path d="M6 6l12 12M18 6L6 18" />
    </Svg>
  )
}

export function ArrowRightIcon(props) {
  return (
    <Svg {...props}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </Svg>
  )
}

export function PhoneIcon(props) {
  return (
    <Svg {...props}>
      <path d="M6.5 3.5h3l1.5 4.5-2 1.5a12 12 0 0 0 5 5l1.5-2 4.5 1.5v3a2 2 0 0 1-2.2 2A16 16 0 0 1 4.5 5.7 2 2 0 0 1 6.5 3.5Z" />
    </Svg>
  )
}

export function MailIcon(props) {
  return (
    <Svg {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M4 7l8 6 8-6" />
    </Svg>
  )
}

export function LocationIcon(props) {
  return (
    <Svg {...props}>
      <path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </Svg>
  )
}

export function WhatsappIcon(props) {
  return (
    <Svg {...props}>
      <path d="M4 20l1.4-4A8 8 0 1 1 8 18.6L4 20Z" />
      <path d="M9 9c0 3 3 6 6 6 1 0 1.6-1 1.4-1.6l-2-0.8-1 1a6 6 0 0 1-3-3l1-1-0.8-2C10 7 9 7.6 9 9Z" />
    </Svg>
  )
}

export function InstagramIcon(props) {
  return (
    <Svg {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17" cy="7" r="0.6" fill="currentColor" stroke="none" />
    </Svg>
  )
}

export function FacebookIcon(props) {
  return (
    <Svg {...props}>
      <path d="M14 8h2V5h-2.5C11.6 5 10 6.6 10 8.5V10H8v3h2v6h3v-6h2.2l.8-3H13V8.8c0-.5.4-.8.9-.8H14Z" />
    </Svg>
  )
}

export function ScissorsIcon(props) {
  return (
    <Svg {...props}>
      <circle cx="6" cy="6" r="2.5" />
      <circle cx="6" cy="18" r="2.5" />
      <path d="M8 8l12 8M8 16L20 8" />
    </Svg>
  )
}

export function RazorIcon(props) {
  return (
    <Svg {...props}>
      <path d="M14 3l7 7-3 3-7-7Z" />
      <path d="M11 6L4 13v4a2 2 0 0 0 2 2h4l3-3" />
    </Svg>
  )
}

export function CrownIcon(props) {
  return (
    <Svg {...props}>
      <path d="M4 8l3 4 5-6 5 6 3-4v10H4Z" />
      <path d="M4 18h16" />
    </Svg>
  )
}

export function StarIcon(props) {
  return (
    <Svg {...props}>
      <path d="M12 4l2.3 4.7 5.2.8-3.8 3.7.9 5.1L12 15.9 7.4 18.3l.9-5.1L4.5 9.5l5.2-.8Z" />
    </Svg>
  )
}

export function AwardIcon(props) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="9" r="5" />
      <path d="M9 13l-1.5 7L12 18l4.5 2L15 13" />
    </Svg>
  )
}

export function BottleIcon(props) {
  return (
    <Svg {...props}>
      <path d="M10 3h4v3l1 2v11a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2V8l1-2Z" />
      <path d="M9 12h6" />
    </Svg>
  )
}

export function SofaIcon(props) {
  return (
    <Svg {...props}>
      <path d="M5 11V8a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v3" />
      <path d="M3 12a2 2 0 0 1 2 2v3h14v-3a2 2 0 0 1 2-2 2 2 0 0 1 0 4v3M5 20v-3" />
    </Svg>
  )
}

export function CalendarIcon(props) {
  return (
    <Svg {...props}>
      <rect x="3.5" y="5" width="17" height="15" rx="2" />
      <path d="M3.5 9h17M8 3v4M16 3v4" />
    </Svg>
  )
}

export function CheckIcon(props) {
  return (
    <Svg {...props}>
      <path d="M5 12l5 5L19 7" />
    </Svg>
  )
}

export function ClockIcon(props) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </Svg>
  )
}

export function UserIcon(props) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20a7 7 0 0 1 14 0" />
    </Svg>
  )
}

export function BanIcon(props) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M6 6l12 12" />
    </Svg>
  )
}

// Map string keys (from data.js) to icon components.
export const ICON_MAP = {
  scissors: ScissorsIcon,
  razor: RazorIcon,
  crown: CrownIcon,
  star: StarIcon,
  award: AwardIcon,
  bottle: BottleIcon,
  sofa: SofaIcon,
  calendar: CalendarIcon,
}
