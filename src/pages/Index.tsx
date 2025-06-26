import { Github, Linkedin, Instagram, Mail, Download, ExternalLink, Calendar, MapPin, Code, BookOpen } from 'lucide-react';
import { Button } from "@/components/ui/button";
import ProjectCard from "@/components/ProjectCard";
import SkillBadge from "@/components/SkillBadge";
import ExperienceCard from "@/components/ExperienceCard";
import AchievementCard from "@/components/AchievementCard";
import PublicationCard from '@/components/PublicationCard';

import { about as aboutData, education} from "@/data/about";
import { projects as projectsData } from "@/data/projects";
import { skills, skillCategories } from "@/data/skills";
import { experiences as experiencesData } from "@/data/experience";
import { achievements } from "@/data/achievements";
import { publications } from "@/data/publications";


const Index = () => {
  const projects = projectsData.slice(0, 3);
  const experiences = experiencesData.slice(0, 3);
  return (

<div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900">
      {/* Header/Hero Section */}
      <section className="relative px-6 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="glass-card p-8 mb-8">
            <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-slate-600 to-blue-600 shadow-2xl overflow-hidden">
              <img 
                className="w-full h-full object-cover" 
                src="./photo.jpeg" 
                alt="Profile Picture" 
              />
            </div>
            <h1 className="text-5xl font-bold text-white mb-4 bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              {aboutData.name}
            </h1>
            <p className="text-xl text-blue-200 mb-6">
              {aboutData.tagline}
            </p>
            <p className="text-gray-300 max-w-2xl mx-auto mb-8 leading-relaxed">
              {aboutData.bio}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href={`mailto:${aboutData.email}`} target="_blank" rel="noopener noreferrer">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-blue-500/25 transition-all duration-300">
                  <Mail className="w-4 h-4 mr-2" />
                  Contact Me
                </Button>
              </a>
              <a href={aboutData.resumePath} target="_blank" rel="noopener noreferrer">
                <Button
                  variant="outline"
                  className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white transition-all duration-300"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Resume
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 space-y-20 pb-20">
        {/* Education Section */}
        <section>
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Education</h2>
          <div className="space-y-6">
            {education.map((education) => (
              <div className="glass-card p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-slate-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-white mb-2">{education.degree}</h3>
                    <p className="text-blue-200 mb-2">{education.school}</p>
                    <div className="flex flex-wrap gap-4 text-gray-300 text-sm">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {education.gradDate}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {education.place}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Skills Section */}
        <section>
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Skills & Technologies</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillCategories.map((category) => (
                <div key={category} className="glass-card p-6">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <Code className="w-5 h-5 text-blue-400" />
                    {category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {skills
                      .filter((skill) => skill.category === category)
                      .map((skill, index) => (
                        <SkillBadge key={index} skill={skill} />
                      ))}
                  </div>
                </div>
              )
            )}
          </div>
        </section>

        {/* Featured Projects Section */}
        <section>
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Featured Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <ProjectCard key={index} project={project} />
            ))}
          </div>
          <div className="text-center mt-8">
            <Button asChild variant="outline" className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white">
              <a href="/projects">
                View All Projects
                <ExternalLink className="w-4 h-4 ml-2" />
              </a>
            </Button>
          </div>
        </section>

        {/* Recent Experience Section */}
        <section>
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Recent Experience</h2>
          <div className="space-y-6">
            {experiences.map((experience, index) => (
              <ExperienceCard key={index} experience={experience} />
            ))}
          </div>
          <div className="text-center mt-8">
            <Button asChild variant="outline" className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white">
              <a href="/experience">
                View All Experiences
                <ExternalLink className="w-4 h-4 ml-2" />
              </a>
            </Button>
          </div>
        </section>

        {/* Publications Section */}
        <section>
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Research Publications</h2>
          <div className="space-y-6">
            {publications.map((publication, index) => (
              <PublicationCard key={index} publication={publication} />
            ))}
          </div>
        </section>

        {/* Achievements Section */}
        <section>
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Achievements & Certifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((achievement, index) => (
              <AchievementCard key={index} achievement={achievement} />
            ))}
          </div>
        </section>
      </div>
      
      <div className="max-w-4xl mx-auto">
        {/* Contact Section */}
        <section className="text-center">
          <h2 className="text-3xl font-bold text-white mb-8">Let's Connect</h2>
            <div className="glass-card p-8">
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                I'm always open to discussing new opportunities, collaborating on projects, 
                or just having a chat about technology. Feel free to reach out!
              </p>
              <div className="flex justify-center gap-4">
                <a href={`mailto:${aboutData.email}`} target="_blank" rel="noopener noreferrer">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    <Mail className="w-4 h-4 mr-2" />Email
                  </Button>
                </a>
                <a href={aboutData.github} target="_blank" rel="noopener noreferrer">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    <Github className="w-4 h-4 mr-2" />GitHub
                  </Button>
                </a>
                <a href={aboutData.linkedin} target="_blank" rel="noopener noreferrer">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    <Linkedin className="w-4 h-4 mr-2" />LinkedIn
                  </Button>
                </a>
                <a href={aboutData.instagram} target="_blank" rel="noopener noreferrer">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    <Instagram className="w-4 h-4 mr-2" />Instagram
                  </Button>
                </a>
              </div>
            </div> 
        </section>
      </div>
    </div>
  );
};

export default Index;
