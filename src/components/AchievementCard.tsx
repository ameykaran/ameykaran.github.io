
import React from 'react';
import { Award, Calendar, Trophy, GraduationCap, FileText } from 'lucide-react';

interface Achievement {
  title: string;
  date: string;
  description: string;
  category: 'Competition' | 'Certification' | 'Academic' | 'Award';
}

interface AchievementCardProps {
  achievement: Achievement;
}

const AchievementCard: React.FC<AchievementCardProps> = ({ achievement }) => {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Competition':
        return <Trophy className="w-6 h-6 text-yellow-400" />;
      case 'Certification':
        return <FileText className="w-6 h-6 text-blue-400" />;
      case 'Academic':
        return <GraduationCap className="w-6 h-6 text-green-400" />;
      default:
        return <Award className="w-6 h-6 text-purple-400" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Competition':
        return 'bg-yellow-500/20 border-yellow-500/30';
      case 'Certification':
        return 'bg-blue-500/20 border-blue-500/30';
      case 'Academic':
        return 'bg-green-500/20 border-green-500/30';
      default:
        return 'bg-purple-500/20 border-purple-500/30';
    }
  };

  return (
    <div className="glass-card p-6 hover:scale-105 transition-all duration-300">
      <div className="flex items-start gap-4">
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 border ${getCategoryColor(achievement.category)}`}>
          {getCategoryIcon(achievement.category)}
        </div>
        
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-white mb-2">
            {achievement.title}
          </h3>
          
          <div className="flex items-center gap-1 text-sm text-blue-300 mb-3">
            <Calendar className="w-4 h-4" />
            {achievement.date}
          </div>
          
          <p className="text-gray-300 text-sm leading-relaxed">
            {achievement.description}
          </p>
          
          <div className="mt-3">
            <span className={`px-2 py-1 text-xs rounded-full border ${getCategoryColor(achievement.category)} text-white`}>
              {achievement.category}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AchievementCard;
