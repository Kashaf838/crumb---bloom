import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'strawberry' | 'pistachio' | 'raspberry' | 'peach' | 'berry' | 'cream';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'strawberry',
  className = '',
}) => {
  const variantStyles = {
    strawberry: 'bg-[#FFF0F3] text-[#D94F70] border border-[#F58FA3]/30',
    pistachio: 'bg-[#F2F8F0] text-[#4A7840] border border-[#B8D8B0]',
    raspberry: 'bg-[#D94F70] text-white',
    peach: 'bg-[#FFF4ED] text-[#8E3552] border border-[#FFC6A8]',
    berry: 'bg-[#8E3552] text-white',
    cream: 'bg-[#FFF8F0] text-[#5B3A32] border border-[#E8D8CC]',
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide whitespace-nowrap shadow-xs ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
};
