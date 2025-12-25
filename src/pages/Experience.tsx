
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ExperienceCard from '@/components/ExperienceCard';
import { Link } from 'react-router-dom';
import { experiences } from '@/data/experience';


const Experience = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900">
      <div className="max-w-4xl mx-auto px-6 py-20">
        {/* Header */}
        <div className="mb-12">
          <Link to="/">
            <Button variant="outline" className="mb-6 border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <h1 className="text-4xl font-bold text-white mb-4 text-center">My Experience</h1>
          <p className="text-gray-300 text-center max-w-2xl mx-auto">
            My professional journey including internships, freelance work, and academic positions 
            that have shaped my skills and expertise.
          </p>
        </div>

        {/* Experience Timeline */}
        <div className="space-y-6">
          {experiences.map((experience, index) => (
            <ExperienceCard key={index} experience={experience} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Experience;
