import React from 'react';
import { cn } from '../../utils/cn';
import { motion } from 'framer-motion';

export const GlassPanel = ({ children, className, ...props }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={cn(
            "bg-white/5 backdrop-blur-2xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.36)]",
            className
        )}
        {...props}
    >
        {children}
    </motion.div>
);

export const GlassButton = ({ children, className, variant = 'primary', ...props }) => (
    <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={cn(
            "backdrop-blur-md border transition-all duration-300 shadow-lg flex items-center justify-center gap-2",
            variant === 'primary' && "bg-white text-black hover:bg-white/90 border-white/20",
            variant === 'glass' && "bg-white/10 text-white hover:bg-white/20 border-white/10",
            variant === 'danger' && "bg-red-500/80 text-white hover:bg-red-600 border-red-500/50",
            className
        )}
        {...props}
    >
        {children}
    </motion.button>
);

export const Badge = ({ children, className }) => (
    <span className={cn(
        "px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-white/90 bg-white/10 border border-white/10 backdrop-blur-md",
        className
    )}>
        {children}
    </span>
);
