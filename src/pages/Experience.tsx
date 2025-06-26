
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ExperienceCard from '@/components/ExperienceCard';
import { Link } from 'react-router-dom';

const Experience = () => {
  const experiences = [
    {
      title: 'Frontend Developer Intern',
      company: 'Tech Solutions Inc.',
      duration: 'Jun 2024 - Aug 2024',
      location: 'Remote',
      description: 'Developed responsive web applications using React and TypeScript. Collaborated with senior developers to implement new features and optimize performance.',
      achievements: ['Improved page load speed by 40%', 'Implemented 5 new UI components', 'Participated in code reviews and agile development']
    },
    {
      title: 'Web Development Freelancer',
      company: 'Self-Employed',
      duration: 'Jan 2024 - Present',
      location: 'Remote',
      description: 'Created custom websites for small businesses and startups. Managed full project lifecycle from requirements gathering to deployment.',
      achievements: ['Delivered 8+ successful projects', 'Maintained 100% client satisfaction rate', 'Generated $5000+ in revenue']
    },
    {
      title: 'Teaching Assistant',
      company: 'Your IT College Name',
      duration: 'Sep 2023 - Dec 2023',
      location: 'On-site',
      description: 'Assisted professor in teaching Introduction to Programming course. Helped students with assignments and conducted lab sessions.',
      achievements: ['Mentored 50+ students', 'Improved student pass rate by 15%', 'Created supplementary learning materials']
    },
    {
      title: 'Software Development Intern',
      company: 'StartupXYZ',
      duration: 'May 2023 - Aug 2023',
      location: 'Hybrid',
      description: 'Worked on developing mobile app features using React Native. Participated in sprint planning and daily standups.',
      achievements: ['Implemented 3 major features', 'Fixed 20+ bugs', 'Learned mobile development best practices']
    }
  ];

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
