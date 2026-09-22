import React from "react";
import { ExternalLink, Calendar, Users } from "lucide-react";
import { Publication } from "@/types";

interface PublicationCardProps {
  publication: Publication;
}

const PublicationCard: React.FC<PublicationCardProps> = ({ publication }) => {
  return (
    <div className="glass-card p-6 sm:p-7 hover:-translate-y-0.5 transition-all duration-300">
      <h3 className="font-display text-lg font-semibold text-white mb-2">
        {publication.title}
      </h3>

      <div className="flex items-start gap-2 text-gray-400 text-sm mb-2">
        <Users className="w-4 h-4 mt-0.5 flex-shrink-0" />
        <span>{publication.authors.join(", ")}</span>
      </div>

      <div className="flex flex-wrap items-center gap-3 text-sm mb-3">
        <span className="chip bg-coral/10 text-coral border-coral/20">{publication.venue}</span>
        <span className="inline-flex items-center gap-1 text-gray-400 font-mono text-xs">
          <Calendar className="w-3.5 h-3.5" />
          {publication.year}
        </span>
      </div>

      <p className="text-gray-300/90 text-sm mb-4 leading-relaxed">
        {publication.abstract}
      </p>

      {(publication.url || publication.doi) && (
        <div className="flex gap-4">
          {publication.url && (
            <a
              href={publication.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-white/90 hover:text-mint transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              View Paper
            </a>
          )}
          {publication.doi && (
            <a
              href={`https://doi.org/${publication.doi}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-400 hover:text-coral transition-colors"
            >
              DOI
            </a>
          )}
        </div>
      )}
    </div>
  );
};

export default PublicationCard;
