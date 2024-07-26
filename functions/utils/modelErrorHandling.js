const mongoose = require("mongoose");

exports.validateModelFields = (Model, fields) => {
  const errors = [];
  const schema = Model.schema.paths;

  fields.forEach(field => {
    const fieldName = field.name;
    const fieldValue = field.value;

    if (!schema[fieldName]) {
      errors.push(`Field ${fieldName} does not exist in the model`);
      return;
    }

    const fieldType = schema[fieldName].instance;
    const fieldOptions = schema[fieldName].options;

    // Check required
    if (fieldOptions.required && (fieldValue === undefined || fieldValue === null)) {
      errors.push(`Field ${fieldName} is required`);
      return;
    }

    // Check type
    switch (fieldType) {
      case 'String':
        if (typeof fieldValue !== 'string') {
          errors.push(`Field ${fieldName} should be a string`);
          return;
        }
        // Check maxlength
        if (fieldOptions.maxlength && fieldValue.length > fieldOptions.maxlength) {
          errors.push(`Field ${fieldName} exceeds maximum length of ${fieldOptions.maxlength}`);
          return;
        }
        // Check match
        if (fieldOptions.match && !fieldOptions.match.test(fieldValue)) {
          errors.push(`Field ${fieldName} does not match the required pattern`);
          return;
        }
        break;

      case 'Number':
        if (typeof fieldValue !== 'number') {
          errors.push(`Field ${fieldName} should be a number`);
          return;
        }
        break;

      case 'Date':
        if (!(fieldValue instanceof Date) || isNaN(fieldValue.getTime())) {
          errors.push(`Field ${fieldName} should be a valid date`);
          return;
        }
        break;

      case 'Boolean':
        if (typeof fieldValue !== 'boolean') {
          errors.push(`Field ${fieldName} should be a boolean`);
          return;
        }
        break;

      default:
        break;
    }
  });

  return errors;
};