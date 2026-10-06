import React from 'react';
import { Filter, Search } from 'lucide-react';

export default function CourseFilter({
  categories = [],
  selectedCategory,
  onCategoryChange,
  searchQuery,
  onSearchChange
}) {
  return (
    <div className="course-unified-bar">
      {/* 1. Left: Filter Box */}
      <div className="course-filter-select-wrap">
        <Filter size={18} className="course-filter-icon" />
        <select 
          value={selectedCategory} 
          onChange={e => onCategoryChange(e.target.value)}
          className="course-filter-select"
          aria-label="কোর্স ফিল্টার"
        >
          {categories.map(cat => (
            <option key={cat.id} value={cat.id} style={{ background: '#003325', color: '#ffffff' }}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* 2. Right: Search Box */}
      <div className="course-search-wrap">
        <Search size={18} className="course-search-icon" />
        <input 
          type="text" 
          value={searchQuery}
          onChange={e => onSearchChange(e.target.value)}
          placeholder="কোর্স খুঁজুন..."
          className="course-search-input"
          aria-label="কোর্স সার্চ"
        />
      </div>
    </div>
  );
}
