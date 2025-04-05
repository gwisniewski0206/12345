import React from "react";
import useTeamMembers from "../../hooks/useTeamMembers";
import TeamMemberCard from "../TeamMemberCard";
import "./index.css";
import { TeamMember } from "../types";


/**
 * Displays a grid of team member cards.
 */
const TeamMembers: React.FC = () => {
  const teamMembers: TeamMember[] = useTeamMembers();

  return (
    <div className="tmc-team-members-container">
      <div className="tmc-team-members-grid">
        {teamMembers.map((member) => (
          <TeamMemberCard key={member.id} member={member} />
        ))}
      </div>
    </div>
  );
};

export default TeamMembers;
