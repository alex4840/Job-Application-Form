import { useState } from 'react';

const useFormValidation = (formData) => {
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName) newErrors.fullName = 'Full Name is required.';
    if (!formData.email) {
      newErrors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid.';
    }

    if (!formData.phoneNumber) {
      newErrors.phoneNumber = 'Phone Number is required.';
    } else if (isNaN(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Phone Number must be a valid number.';
    }

    if (!formData.applyingFor) newErrors.applyingFor = 'Please select a position.';

    if (['Developer', 'Designer'].includes(formData.applyingFor)) {
      if (!formData.relevantExperience) {
        newErrors.relevantExperience = 'Relevant Experience is required.';
      } else if (isNaN(formData.relevantExperience) || formData.relevantExperience < 0) {
        newErrors.relevantExperience = 'Experience must be a number greater than 0.';
      }
    }

    if (formData.applyingFor === 'Designer' && !formData.portfolioURL) {
      newErrors.portfolioURL = 'Portfolio URL is required.';
    } else if (formData.portfolioURL && !/^(ftp|http|https):\/\/[^ "]+$/.test(formData.portfolioURL)) {
      newErrors.portfolioURL = 'Portfolio URL is invalid.';
    }

    if (formData.applyingFor === 'Manager' && !formData.managementExperience) {
      newErrors.managementExperience = 'Management Experience is required.';
    }else if (isNaN(formData.managementExperience) || formData.managementExperience < 0) {
        newErrors.managementExperience = 'Experience must be a number greater than 0.';
      }

    if (formData.additionalSkills.length === 0) {
      newErrors.additionalSkills = 'At least one skill must be selected.';
    }

    if (!formData.preferredInterviewTime) {
      newErrors.preferredInterviewTime = 'Preferred Interview Time is required.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return [errors, validateForm];
};

export default useFormValidation;
