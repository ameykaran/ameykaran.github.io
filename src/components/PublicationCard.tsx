import React from "react";
import { ExternalLink, Calendar, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Publication {
  title: string;
  authors: string[];
  venue: string;
  year: string;
  abstract: string;
  url?: string;
  doi?: string;
}

interface PublicationCardProps {
  publication: Publication;
}

const PublicationCard: React.FC<PublicationCardProps> = ({ publication }) => {
  return (
    <div className="glass-card p-6 hover:bg-white/10 transition-all duration-300">
      <h3 className="text-xl font-semibold text-white mb-2">
        {publication.title}
      </h3>

      <div className="flex items-center gap-2 text-gray-300 text-sm mb-2">
        <Users className="w-4 h-4" />
        <span>{publication.authors.join(", ")}</span>
      </div>

      <div className="flex items-center gap-4 text-gray-300 text-sm mb-3">
        <span className="text-blue-300 font-medium">{publication.venue}</span>
        <div className="flex items-center gap-1">
          <Calendar className="w-4 h-4" />
          <span>{publication.year}</span>
        </div>
      </div>

      <p className="text-gray-300 text-sm mb-4 leading-relaxed">
        {publication.abstract}
      </p>

      {(publication.url || publication.doi) && (
        <div className="flex gap-2">
          {publication.url && (
            <Button
              asChild
              size="sm"
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <a
                href={publication.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="w-3 h-3 mr-1" />
                View Paper
              </a>
            </Button>
          )}
          {publication.doi && (
            <Button
              asChild
              size="sm"
              variant="outline"
              className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white"
            >
              <a
                href={`https://doi.org/${publication.doi}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                DOI
              </a>
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default PublicationCard;
