import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function EmployeeCard({ employee }) {
  if (!employee) return null;

  return (
    <div className="employee-card hq-employee-card">
      <div className="employee-photo-wrap">
        <img 
          src={employee.photo_url || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=80'} 
          alt={employee.name_bn} 
          className="employee-photo" 
        />
      </div>
      <div className="employee-info">
        <span className="employee-dept-badge">{employee.department || 'সদর দপ্তর'}</span>
        <h3 className="employee-name">{employee.name_bn}</h3>
        <div className="employee-designation">{employee.designation}</div>
        {employee.bio && (
          <p className="employee-desc">{employee.bio.substring(0, 95)}...</p>
        )}
        <Link to={`/employee/${employee.slug}`} className="card-float-btn hq-float-btn" style={{ marginTop: 'auto' }}>
          <span className="card-btn-inner">
            <span>পরিচিতি ও বিস্তারিত</span>
            <ArrowRight size={16} />
          </span>
        </Link>
      </div>
    </div>
  );
}
