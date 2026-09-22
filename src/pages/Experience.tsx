import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import ExperienceCard from "@/components/ExperienceCard";
import { Link } from "react-router-dom";
import { experiences } from "@/data/experience";

const accentCycle = ["blue", "mint", "sun", "violet"] as const;

const Experience = () => {
  useEffect(() => {
    document.title = "Experience | Amey Karan";
  }, []);

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
        <div className="mb-12">
          <Link to="/">
            <Button
              variant="outline"
              className="mb-6 rounded-full border-white/20 bg-transparent text-white hover:bg-white/10"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <h1 className="font-display text-4xl font-extrabold text-white mb-3 text-center tracking-tight">
            My Experience
          </h1>
          <p className="text-gray-300/90 text-center max-w-2xl mx-auto">
            My professional journey including internships, research
            assistantships, and academic positions that have shaped my skills
            and expertise.
          </p>
        </div>

        <div className="space-y-5">
          {experiences.map((experience, index) => (
            <ExperienceCard
              key={index}
              experience={experience}
              accent={accentCycle[index % accentCycle.length]}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Experience;
