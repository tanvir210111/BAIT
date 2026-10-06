import React from 'react';
import { Laptop, Award, ShieldCheck } from 'lucide-react';

export default function StatsSection() {
  return (
    <div className="heading-highlights-grid">
      <div className="heading-highlight-card">
        <div className="heading-highlight-icon" style={{ background: 'rgba(0, 106, 78, 0.1)', color: 'var(--primary)' }}>
          <Laptop size={26} />
        </div>
        <div>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--primary-dark)', marginBottom: '6px' }}>
            হাতে-কলমে লাইভ প্রজেক্ট
          </h3>
          <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
            আন্তর্জাতিক মানসম্পন্ন বাস্তব প্রজেক্ট ও পোর্টফোলিও তৈরির মাধ্যমে শতভাগ ব্যবহারিক শিক্ষা।
          </p>
        </div>
      </div>

      <div className="heading-highlight-card">
        <div className="heading-highlight-icon" style={{ background: 'rgba(244, 42, 65, 0.1)', color: 'var(--accent-red)' }}>
          <Award size={26} />
        </div>
        <div>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--primary-dark)', marginBottom: '6px' }}>
            ইন্ডাস্ট্রি বিশেষজ্ঞ মেন্টরশিপ
          </h3>
          <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
            অভিজ্ঞ সফটওয়্যার ইঞ্জিনিয়ারদের নিবিড় তত্ত্বাবধান, লাইভ প্রবলেম সলভিং ও সার্বক্ষণিক সাপোর্ট।
          </p>
        </div>
      </div>

      <div className="heading-highlight-card">
        <div className="heading-highlight-icon" style={{ background: 'rgba(5, 150, 105, 0.1)', color: 'var(--primary-light)' }}>
          <ShieldCheck size={26} />
        </div>
        <div>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--primary-dark)', marginBottom: '6px' }}>
            ক্যারিয়ার ও ফ্রিল্যান্সিং সহায়তা
          </h3>
          <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
            কোর্স সমাপ্তিতে ইন্টার্নশিপের সুযোগ, সিভি রিভিউ এবং আন্তর্জাতিক মার্কেটপ্লেস গাইডেন্স।
          </p>
        </div>
      </div>
    </div>
  );
}
