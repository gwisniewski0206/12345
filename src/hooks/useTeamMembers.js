// src/hooks/useTeamMembers.js
import { useState, useEffect } from 'react';
import teamMembersData from '../content/teamMembers.json';

/**
 * Loads and sorts team member data.
 * Sorting: first by numeric priority (if defined) then alphabetically by full name.
 */
const useTeamMembers = () => {
  const [teamMembers, setTeamMembers] = useState([]);

  useEffect(() => {
    const sorted = [...teamMembersData].sort((a, b) => {
      if (a.priority && b.priority) {
        return a.priority - b.priority;
      }
      if (a.priority && !b.priority) return -1;
      if (!a.priority && b.priority) return 1;
      const nameA = `${a.first_name} ${a.last_name}`.toLowerCase();
      const nameB = `${b.first_name} ${b.last_name}`.toLowerCase();
      return nameA.localeCompare(nameB);
    });
    setTeamMembers(sorted);
  }, []);

  return teamMembers;
};

export default useTeamMembers;
