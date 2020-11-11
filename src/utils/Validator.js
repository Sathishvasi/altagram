/*
 *  Contains the custom validators derived from npm validator package.
 *
 */

import validator from "validator";

export function isEmpty(value) {
  if (value) {
    if (validator.isEmpty(value.toString(), { ignore_whitespace: true })) {
      return true;
    } else return false;
  }

  return true;
}

function isEmptyFile(file) {
  if (isEmpty(file.name)) return true;
  else return false;
}

class FormValidator {
  constructor(validations) {
    // validations is an array of validation rules specific to a form
    this.validations = validations;
  }

  validate(state) {
    // start out assuming valid
    let validation = this.valid();

    // for each validation rule
    this.validations.forEach((rule) => {
      // if the field hasn't already been marked invalid by an earlier rule
      if (!validation[rule.field].isInvalid) {
        // determine the field value, the method to invoke and optional args from
        // the rule definition
        let field_value = state[rule.field];

        let args = rule.args || [];
        const validation_method =
          typeof rule.method === "string"
            ? validator[rule.method]
            : rule.method;

        let invalid = false;

        if (rule.method === "isEmptyFile") {
          if (isEmptyFile(field_value)) {
            invalid = true;
          }
        } else {
          field_value = field_value.toString();

          if (rule.method === "isEmpty") {
            if (args.length > 0) {
              args[0].ignore_whitespace = true;
            } else args.push({ ignore_whitespace: true });
          } else if (rule.method === "equals") {
            args = [state[rule.equalsTo].toString()];
          } else if (rule.method === "isLength") {
            args = [{ min: rule.min, max: rule.max }];
          }

          // call the validation_method with the current field value as the first
          // argument, any additional arguments, and the whole state as a final
          // argument.  If the result doesn't match the rule.validWhen property,
          // then modify the validation object for the field and set the isValid
          // field to false
          if (
            validation_method(field_value, ...args, state) !== rule.validWhen
          ) {
            invalid = true;
          }
        }

        if (invalid) {
          validation[rule.field] = { isInvalid: true, message: rule.message };
          validation.isValid = false;
        }
      }
    });

    return validation;
  }

  valid() {
    const validation = {};

    this.validations.map(
      (rule) => (validation[rule.field] = { isInvalid: false, message: "" })
    );

    return { isValid: true, ...validation };
  }
}

export default FormValidator;
