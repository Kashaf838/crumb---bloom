import React from 'react';
import { Star } from 'lucide-react';

interface RatingStarsProps {
  rating: number;
  max?: number;
  size?: number;
  showText?: boolean;
  reviewCount?: number;
}

export const RatingStars: React.FC<RatingStarsProps> = ({
  rating,
  max = 5,
  size = 14,
  showText = false,
  reviewCount,
}) => {
  return (
    <div className="flex items-center gap-1.5" id={`rating-${Math.round(rating * 10)}`}>
      <div className="flex items-center text-[#D94F70]">
        {Array.from({ length: max }).map((_, index) => {
          const filled = index < Math.floor(rating);
          const half = !filled && index < rating;
          return (
            <Star
              key={index}
              size={size}
              className={
                filled
                  ? 'fill-[#D94F70] text-[#D94F70]'
                  : half
                  ? 'fill-[#FFC6A8] text-[#D94F70]'
                  : 'text-[#E8D8CC] fill-[#FFF0F3]'
              }
            />
          );
        })}
      </div>
      {showText && (
        <span className="text-xs font-semibold text-[#5B3A32]">
          {rating.toFixed(1)}
          {reviewCount !== undefined && (
            <span className="text-[#8E3552]/70 font-normal ml-1">
              ({reviewCount})
            </span>
          )}
        </span>
      )}
    </div>
  );
};
