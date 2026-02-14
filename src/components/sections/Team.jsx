import React from "react";
import SectionWrapper from "../common/SectionWrapper";
import { useTranslation } from "react-i18next";

const Team = () => {
  const { t } = useTranslation();

  const team = [
    {
      id: 1,
      name: "John Doe",
      role: "Director",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=300&h=300",
    },
    {
      id: 2,
      name: "Jane Smith",
      role: "Manager",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=300&h=300",
    },
    {
      id: 3,
      name: "Mike Johnson",
      role: "Coordinator",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300&h=300",
    },
    {
      id: 4,
      name: "Sarah Williams",
      role: "Staff",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=300&h=300",
    },
  ];

  return (
    <SectionWrapper id="team" className="bg-white dark:bg-brand-dark">
      <div className="text-center mb-16">
        <span className="text-brand-gold font-bold uppercase tracking-wider text-sm">
          {t("team.section_subtitle")}
        </span>
        <h2 className="text-3xl md:text-4xl font-bold font-serif text-brand-black dark:text-white mt-2">
          {t("team.section_title")}
        </h2>
        <div className="w-24 h-1 bg-brand-blue mx-auto mt-4 rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {team.map((member) => (
          <div
            key={member.id}
            className="group relative bg-slate-50 dark:bg-slate-800 rounded-2xl p-6 text-center hover:shadow-xl transition-shadow duration-300 border border-transparent hover:border-brand-blue/20"
          >
            <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-white dark:border-slate-700 shadow-lg group-hover:border-brand-gold transition-colors duration-300">
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
              {member.name}
            </h3>
            <p className="text-brand-blue dark:text-brand-gold font-medium text-sm uppercase tracking-wide">
              {member.role}
            </p>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
};

export default Team;
