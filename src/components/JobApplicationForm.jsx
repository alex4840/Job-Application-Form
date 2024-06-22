import React, { useState } from 'react';
import useFormValidation from '../hooks/useFormValidation';
import FormSummary from './FormSummary';
import './styles.css';

const JobApplicationForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    applyingFor: '',
    relevantExperience: '',
    portfolioURL: '',
    managementExperience: '',
    additionalSkills: [],
    preferredInterviewTime: '',
  });

  const [errors, validateForm] = useFormValidation(formData);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData((prevData) => ({
        ...prevData,
        additionalSkills: checked
          ? [...prevData.additionalSkills, name]
          : prevData.additionalSkills.filter((skill) => skill !== name),
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setSubmitted(true);
    }
  };

  return (
    <div className="container">
      {!submitted ? (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="label">Full Name:</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="input-field"
            />
            {errors.fullName && <p className="error">{errors.fullName}</p>}
          </div>

          <div className="form-group">
            <label className="label">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="input-field"
            />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>

          <div className="form-group">
            <label className="label">Phone Number:</label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="input-field"
              pattern="[0-9]{10}"
              placeholder="Enter 10-digit number"
            />
            {errors.phoneNumber && <p className="error">{errors.phoneNumber}</p>}
          </div>

          <div className="form-group">
            <label className="label">Applying for Position:</label>
            <select
              name="applyingFor"
              value={formData.applyingFor}
              onChange={handleChange}
              className="input-field"
            >
              <option value="">Select a position</option>
              <option value="Developer">Developer</option>
              <option value="Designer">Designer</option>
              <option value="Manager">Manager</option>
            </select>
            {errors.applyingFor && <p className="error">{errors.applyingFor}</p>}
          </div>

          {['Developer', 'Designer'].includes(formData.applyingFor) && (
            <div className="form-group">
              <label className="label">Relevant Experience (years):</label>
              <input
                type="number"
                name="relevantExperience"
                value={formData.relevantExperience}
                onChange={handleChange}
                className="input-field"
              />
              {errors.relevantExperience && <p className="error">{errors.relevantExperience}</p>}
            </div>
          )}

          {formData.applyingFor === 'Designer' && (
            <div className="form-group">
              <label className="label">Portfolio URL:</label>
              <input
                type="text"
                name="portfolioURL"
                value={formData.portfolioURL}
                onChange={handleChange}
                className="input-field"
              />
              {errors.portfolioURL && <p className="error">{errors.portfolioURL}</p>}
            </div>
          )}

          {formData.applyingFor === 'Manager' && (
            <div className="form-group">
              <label className="label">Management Experience:</label>
              <input
                type="text"
                name="managementExperience"
                value={formData.managementExperience}
                onChange={handleChange}
                className="input-field"
              />
              {errors.managementExperience && <p className="error">{errors.managementExperience}</p>}
            </div>
          )}

          <div className="form-group">
            <label className="label">Additional Skills:</label>
            <div className="checkbox-group">
              <label>
                <input
                  type="checkbox"
                  name="JavaScript"
                  checked={formData.additionalSkills.includes('JavaScript')}
                  onChange={handleChange}
                />
                JavaScript
              </label>
              <label>
                <input
                  type="checkbox"
                  name="CSS"
                  checked={formData.additionalSkills.includes('CSS')}
                  onChange={handleChange}
                />
                CSS
              </label>
              <label>
                <input
                  type="checkbox"
                  name="Python"
                  checked={formData.additionalSkills.includes('Python')}
                  onChange={handleChange}
                />
                Python
              </label>
            </div>
            {errors.additionalSkills && <p className="error">{errors.additionalSkills}</p>}
          </div>

          <div className="form-group">
            <label className="label">Preferred Interview Time:</label>
            <input
              type="datetime-local"
              name="preferredInterviewTime"
              value={formData.preferredInterviewTime}
              onChange={handleChange}
              className="input-field"
            />
            {errors.preferredInterviewTime && <p className="error">{errors.preferredInterviewTime}</p>}
          </div>

          <button type="submit" className="button">Submit</button>
        </form>
      ) : (
        <FormSummary formData={formData} onEdit={() => setSubmitted(false)} />
      )}
    </div>
  );
};

export default JobApplicationForm;
