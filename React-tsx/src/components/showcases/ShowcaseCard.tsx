import type { ComponentProps } from 'react'
import { motion } from 'framer-motion'
import { Card } from '../ui'

export default function ShowcaseCard(props: ComponentProps<typeof Card>) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.35 }}
    >
      <Card {...props} />
    </motion.div>
  )
}
