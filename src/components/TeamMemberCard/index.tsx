import React from "react";
import Modal from "../Modal/Modal";
import useModal from "../../hooks/useModal";
import useHoverImageSwitcher from "../../hooks/useHoverImageSwitcher";
import { TeamMember } from "../types" // ✅ Import the shared type
import "./index.css";

// Define props with the correct type
interface TeamMemberCardProps {
  member: TeamMember;
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ member }) => {
  // Extract alternate images from JSON; ensure empty values are filtered out
  const alternateImages: string[] = [member.switch_photo1, member.switch_photo2, member.switch_photo3]
  .filter((img): img is string => Boolean(img)); // ✅ Ensure only strings remain

// Use custom hook for image switching on hover
const { currentImage, handleMouseEnter, handleMouseLeave } = useHoverImageSwitcher(
  member.profile_photo,
  alternateImages // ✅ Now correctly typed as `string[]`
);


  // Use modal hook to open/close extra detail view if available
  const { isOpen, openModal, closeModal } = useModal();

  return (
    <div className="tmc-team-member-card">
      <div className="tmc-content">
        <div className="tmc-left-column">
          <h2 className="worker-title">
            {member.first_name} {member.last_name}
          </h2>
          {member.location && <p className="location">{member.location}</p>} {/* ✅ Handle undefined */}
          <div
            className="tmc-profile-photo"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <img src={currentImage} alt={`${member.first_name} ${member.last_name}`} />
          </div>
        </div>
        <div className="tmc-right-column">
          {member.shortinfo && <p className="short-info">{member.shortinfo}</p>} {/* ✅ Handle undefined */}
          {member.personal_touch && (
            <button className="tmc-read-more" onClick={openModal}>
              Read More
            </button>
          )}
        </div>
      </div>
      {member.personal_touch && (
        <Modal isOpen={isOpen} closeModal={closeModal}>
          <div className="tmc-modal-body">
            <div className="tmc-modal-left">
              <img src={member.profile_photo} alt={`${member.first_name} ${member.last_name}`} />
              <h2>
                {member.first_name} {member.last_name}
              </h2>
              {member.position && <p className="position">{member.position}</p>}
              {member.location && <p className="location">{member.location}</p>}
              {member.shortinfo && <p className="short-info">{member.shortinfo}</p>}
            </div>
            <div className="tmc-modal-right">
              <p>{member.personal_touch}</p>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default TeamMemberCard;
