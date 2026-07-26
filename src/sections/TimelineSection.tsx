import { motion } from 'framer-motion';
import TimelineCard from '../components/timeline/TimelineCard';
import { timeline } from '../data/content';

type TimelineSectionProps = {
  onContinue?: () => void;
};

export default function TimelineSection({ onContinue }: TimelineSectionProps) {
  return (
    <section className="relative w-full min-h-screen px-6 py-24 flex flex-col items-center">
      <h2 className="font-display text-2xl sm:text-3xl text-glow mb-1">Our Timeline</h2>
      <p className="text-white/40 text-sm mb-14">A few of the moments that got us here</p>

      <div className="relative w-full max-w-2xl">
        {/* connecting line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-aura-500/40 to-transparent hidden sm:block" />
        <div className="absolute left-3 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-aura-500/40 to-transparent sm:hidden" />

        <div className="flex flex-col gap-10 sm:gap-8">
          {timeline.map((item, i) => (
            <div key={item.title} className="relative pl-8 sm:pl-0">
              {/* dot marker */}
              <span className="absolute left-3 sm:left-1/2 top-1.5 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-gold-400 shadow-glow-sm" />
              <TimelineCard {...item} align={i % 2 === 0 ? 'left' : 'right'} />
            </div>
          ))}
        </div>
      </div>

      <motion.button
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        onClick={onContinue}
        className="mt-14 rounded-full glass px-6 py-2 text-sm tracking-wide hover:bg-white/10 transition-colors"
      >
        Continue →
      </motion.button>
    </section>
  );
}
