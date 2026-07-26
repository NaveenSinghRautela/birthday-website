import { motion } from 'framer-motion';

type TimelineCardProps = {
  date: string;
  title: string;
  description: string;
  icon: string;
  align: 'left' | 'right';
};

export default function TimelineCard({ date, title, description, icon, align }: TimelineCardProps) {
  const fromX = align === 'left' ? -28 : 28;

  return (
    <motion.div
      initial={{ opacity: 0, x: fromX, y: 12 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
      className={`relative flex w-full ${align === 'left' ? 'sm:justify-start' : 'sm:justify-end'}`}
    >
      <div className={`w-full sm:w-[calc(50%-2rem)] glass rounded-2xl px-5 py-4 text-left`}>
        <span className="text-xs uppercase tracking-wide text-aura-400/80">{date}</span>
        <h3 className="mt-1 font-display text-lg text-glow flex items-center gap-2">
          <span aria-hidden>{icon}</span>
          {title}
        </h3>
        <p className="mt-1 text-sm text-white/55">{description}</p>
      </div>
    </motion.div>
  );
}
