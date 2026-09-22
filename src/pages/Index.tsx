import { ExternalLink, Calendar, MapPin, BookOpen, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProjectCard from "@/components/ProjectCard";
import SkillBadge from "@/components/SkillBadge";
import ExperienceCard from "@/components/ExperienceCard";
import AchievementCard from "@/components/AchievementCard";
import PublicationCard from "@/components/PublicationCard";
import VolunteeringCard from "@/components/VolunteeringCard";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faInstagram,
  faSquareLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";

import { about as aboutData, education, coursework } from "@/data/about";
import { projects as projectsData } from "@/data/projects";
import { skills } from "@/data/skills";
import { experiences as experiencesData } from "@/data/experience";
import { achievements } from "@/data/achievements";
import { publications } from "@/data/publications";
import { volunteering } from "@/data/volunteering";
import { SkillCategory } from "@/types";
import { openEmailClient } from "@/lib/utils";
import { useEffect } from "react";

const accentCycle = ["blue", "mint", "sun", "violet"] as const;

const Index = () => {
  useEffect(() => {
    document.title = "Portfolio | Amey Karan";
  }, []);

  const projects = projectsData.slice(0, 3);
  const experiences = experiencesData.slice(0, 3);

  return (
    <div className="min-h-screen pb-24">
      {/* Hero */}
      <section className="px-4 sm:px-6 pt-14 pb-10">
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="glass-card sm:col-span-2 p-8 sm:p-10 flex flex-col justify-center animate-fade-up">
            <span className="section-eyebrow">
              <Sparkles className="w-3.5 h-3.5" /> hey, I'm
            </span>
            <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-white mb-3 tracking-tight">
              {aboutData.name}
            </h1>
            <p className="text-lg text-blue font-medium mb-4">{aboutData.tagline}</p>
            <p className="text-gray-300/90 max-w-xl leading-relaxed mb-7">
              {aboutData.bio}
            </p>
            <div className="flex flex-wrap gap-3">
              <Button
                onClick={() => openEmailClient(aboutData.email)}
                className="rounded-full bg-blue text-[#150f1f] hover:bg-blue/90 hover:scale-105 transition-all duration-300 font-semibold"
              >
                <FontAwesomeIcon icon={faEnvelope} className="w-4 h-4 mr-2" />
                Contact Me
              </Button>
              <a href={aboutData.resumePath} target="_blank" rel="noopener noreferrer">
                <Button
                  variant="outline"
                  className="rounded-full border-white/20 bg-transparent text-white hover:bg-white/10 hover:scale-105 transition-all duration-300"
                >
                  View Resume
                </Button>
              </a>
            </div>
          </div>

          <div className="glass-card overflow-hidden min-h-[16rem] sm:min-h-0 animate-fade-up [animation-delay:100ms]">
            <img
              className="w-full h-full object-cover"
              src="./photo.jpeg"
              alt="Amey Karan"
            />
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-20">
        {/* Education */}
        <section id="education">
          <h2 className="section-title">Education</h2>
          <div className="space-y-5">
            {education.map((edu, index) => (
              <div key={index} className="glass-card p-6 hover:-translate-y-0.5 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-2xl bg-violet/15 border border-violet/30 text-violet flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                      <h3 className="font-display text-lg font-semibold text-white">
                        {edu.degree}
                      </h3>
                      <span className="chip bg-sun/10 text-sun border-sun/25 w-fit">
                        {edu.detail}
                      </span>
                    </div>
                    <p className="text-gray-300/90 mb-2 text-sm">{edu.school}</p>
                    <div className="flex flex-wrap gap-4 text-gray-400 text-xs font-mono">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {edu.gradDate}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" />
                        {edu.place}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section id="skills">
          <h2 className="section-title">Skills & Technologies</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {Object.values(SkillCategory).map((category) => (
              <div key={category} className="glass-card p-6">
                <h3 className="font-display text-base font-semibold text-white mb-4">
                  {category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skills
                    .filter((skill) => skill.category === category)
                    .map((skill) => (
                      <SkillBadge key={skill.name} skill={skill} />
                    ))}
                </div>
              </div>
            ))}
          </div>
          <div className="glass-card p-6 mt-5">
            <h3 className="font-display text-base font-semibold text-white mb-4">
              Relevant Coursework
            </h3>
            <div className="flex flex-wrap gap-2">
              {coursework.map((course) => (
                <span key={course} className="chip bg-white/5 text-gray-300 border-white/10">
                  {course}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Projects */}
        <section id="projects">
          <h2 className="section-title">Featured Projects</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {projects.map((project, index) => (
              <ProjectCard key={index} project={project} featured={index === 0} />
            ))}
          </div>
          <div className="text-center mt-8">
            <Button
              asChild
              variant="outline"
              className="rounded-full border-white/20 bg-transparent text-white hover:bg-white/10"
            >
              <a href="/#/projects">
                View All Projects
                <ExternalLink className="w-4 h-4 ml-2" />
              </a>
            </Button>
          </div>
        </section>

        {/* Recent Experience */}
        <section id="experience">
          <h2 className="section-title">Recent Experience</h2>
          <div className="space-y-5">
            {experiences.map((experience, index) => (
              <ExperienceCard
                key={index}
                experience={experience}
                accent={accentCycle[index % accentCycle.length]}
              />
            ))}
          </div>
          <div className="text-center mt-8">
            <Button
              asChild
              variant="outline"
              className="rounded-full border-white/20 bg-transparent text-white hover:bg-white/10"
            >
              <a href="/#/experience">
                View All Experience
                <ExternalLink className="w-4 h-4 ml-2" />
              </a>
            </Button>
          </div>
        </section>

        {/* Publications */}
        <section id="publications">
          <h2 className="section-title">Research Publications</h2>
          <div className="space-y-5">
            {publications.map((publication, index) => (
              <PublicationCard key={index} publication={publication} />
            ))}
          </div>
        </section>

        {/* Achievements */}
        <section id="achievements">
          <h2 className="section-title">Achievements</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {achievements.map((achievement, index) => (
              <AchievementCard key={index} achievement={achievement} />
            ))}
          </div>
        </section>

        {/* Volunteering */}
        <section id="volunteering">
          <h2 className="section-title">Volunteering</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {volunteering.map((role, index) => (
              <VolunteeringCard key={index} volunteering={role} />
            ))}
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="text-center">
          <h2 className="section-title">Let's Connect</h2>
          <div className="glass-card p-8 sm:p-10">
            <p className="text-gray-300/90 mb-6 max-w-2xl mx-auto">
              I'm always open to discussing new opportunities, collaborating on
              projects, or just having a chat about technology. Feel free to
              reach out!
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button
                onClick={() => openEmailClient(aboutData.email)}
                className="rounded-full bg-blue text-[#150f1f] hover:bg-blue/90 hover:scale-105 transition-all duration-300 font-semibold"
              >
                <FontAwesomeIcon icon={faEnvelope} className="w-4 h-4 mr-2" />
                Email
              </Button>
              <a href={aboutData.github} target="_blank" rel="noopener noreferrer">
                <Button className="rounded-full bg-white/10 text-white hover:bg-white/20 hover:scale-105 transition-all duration-300">
                  <FontAwesomeIcon icon={faGithub} className="w-4 h-4 mr-2" />
                  GitHub
                </Button>
              </a>
              <a href={aboutData.linkedin} target="_blank" rel="noopener noreferrer">
                <Button className="rounded-full bg-white/10 text-white hover:bg-white/20 hover:scale-105 transition-all duration-300">
                  <FontAwesomeIcon icon={faSquareLinkedin} className="w-4 h-4 mr-2" />
                  LinkedIn
                </Button>
              </a>
              <a href={aboutData.instagram} target="_blank" rel="noopener noreferrer">
                <Button className="rounded-full bg-white/10 text-white hover:bg-white/20 hover:scale-105 transition-all duration-300">
                  <FontAwesomeIcon icon={faInstagram} className="w-4 h-4 mr-2" />
                  Instagram
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
