import React from 'react';
import './styles.css';

const FormSummary = ({ formData, onEdit }) => {
  const {
    fullName,
    email,
    phoneNumber,
    applyingFor,
    relevantExperience,
    portfolioURL,
    managementExperience,
    additionalSkills,
    preferredInterviewTime,
  } = formData;

  return (
    <div className="summary-container">
      <h2>Form Summary</h2>
      <div className='innerFields'>
        <strong>Full Name:</strong> {fullName}
      </div>
      <div className='innerFields'>
        <strong>Email:</strong> {email}
      </div>
      <div className='innerFields'>
        <strong>Phone Number:</strong> {phoneNumber}
      </div>
      <div className='innerFields'>
        <strong>Applying for Position:</strong> {applyingFor}
      </div>
      {applyingFor === 'Developer' && (
        <div className='innerFields'>
          <strong>Relevant Experience (years):</strong> {relevantExperience}
        </div>
      )}
      {applyingFor === 'Designer' && (
        <div className='innerFields'>
          <strong>Portfolio URL:</strong> {portfolioURL}
        </div>
      )}
      {applyingFor === 'Manager' && (
        <div className='innerFields' >
          <strong>Management Experience:</strong> {managementExperience}
        </div>
      )}
      <div className='innerFields'>
        <strong>Additional Skills:</strong> {additionalSkills.join(', ')}
      </div>
      <div className='innerFields'>
        <strong>Preferred Interview Time:</strong> {new Date(preferredInterviewTime).toLocaleString()}
      </div>
      <button className="edit-button" onClick={onEdit}>Edit Form</button>
    </div>
  );
};

export default FormSummary;
