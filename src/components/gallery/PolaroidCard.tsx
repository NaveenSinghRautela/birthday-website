import { motion } from 'framer-motion';

type PolaroidCardProps = {
  src: string;
  caption: string;
  rotate?: number;
};

export default function PolaroidCard({ src, caption, rotate = -2 }: PolaroidCardProps) {
  return (
    <motion.div
      className="relative bg-[#faf7f2] rounded-sm p-3 pb-6 shadow-2xl w-64 sm:w-72"
      
      initial={{ opacity: 0, y: 24, rotate: rotate - 4 }}
      animate={{ opacity: 1, y: 0, rotate }}
      exit={{ opacity: 0, y: -18, rotate: rotate + 6 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      whileHover={{ rotate: 0, scale: 1.03 }}
    >
      <div className="aspect-[4/5] w-full overflow-hidden bg-void-800">
        <img src={src} alt={caption} className="h-full w-full object-cover" loading="lazy" />
      </div>
      <p className="mt-3 text-center font-script text-xl text-void-900/80 leading-none">{caption}</p>
    </motion.div>
  );
}
