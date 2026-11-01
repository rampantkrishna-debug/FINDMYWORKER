import React from 'react';
import { useData } from '../../context/DataContext';
import { RatingStars } from '../common/RatingStars';
import { MapPin, Quote, CheckCircle2 } from 'lucide-react';

export const TestimonialSection: React.FC = () => {
  const { reviews } = useData();

  return (
    <section className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 text-brand-orange text-xs font-bold uppercase tracking-wider">
            Customer Stories
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy tracking-tight">
            Trusted by Families Across Mohali & Chandigarh
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Read what verified homeowners and shopkeepers have to say about our verified professionals.
          </p>
        </div>

        {/* Reviews Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map(rev => (
            <div
              key={rev.id}
              className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-card-hover transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <RatingStars rating={rev.rating} size={15} />
                  <Quote size={20} className="text-slate-200" />
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-xs text-slate-900">{rev.customerName}</span>
                    <span title="Verified Customer">
                      <CheckCircle2 size={12} className="text-emerald-500" />
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-slate-400">
                    <MapPin size={11} className="text-brand-orange" />
                    <span>{rev.customerCity}</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] font-semibold text-brand-orange bg-orange-50 px-2 py-0.5 rounded">
                    {rev.serviceTitle}
                  </span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">{rev.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
