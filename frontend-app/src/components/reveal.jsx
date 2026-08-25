'use client'

import { motion } from 'framer-motion'

// Fades + slides children in when they scroll into view. Reusable everywhere.
export default function Reveal({ children, delay = 0, y = 24, className = '' }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: 'easeInOut', delay }}
    >
      {children}
    </motion.div>
  )
}
