export interface Service {
  icon: string
  title: string
  description: string
}

export interface Stat {
  value: string
  label: string
}

export const services: Service[] = [
  {
    icon: '🏗️',
    title: 'General Contracting',
    description:
      'End-to-end delivery of commercial and residential builds, coordinated by a single accountable team.',
  },
  {
    icon: '🔧',
    title: 'Facility Maintenance',
    description:
      'Proactive and on-call maintenance programs that keep your properties safe, compliant, and running.',
  },
  {
    icon: '📐',
    title: 'Project Management',
    description:
      'Scheduling, budgeting, and stakeholder communication that keep complex projects on time and on budget.',
  },
  {
    icon: '🛠️',
    title: 'Renovations',
    description:
      'Tenant improvements and full remodels executed with minimal disruption to your operations.',
  },
]

export const stats: Stat[] = [
  { value: '15+', label: 'Years of experience' },
  { value: '250+', label: 'Projects delivered' },
  { value: '98%', label: 'Client retention' },
  { value: '0', label: 'Lost-time incidents' },
]

export const values: string[] = [
  'Safety-first jobsites',
  'Transparent pricing',
  'Licensed & insured crews',
  'On-schedule delivery',
]
