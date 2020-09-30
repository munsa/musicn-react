export const setFormValidationMessages = (form) => {
  for (let i = 0; i < form.length; i++) {
    const element = form[i];
    if (element.willValidate) {
      element.setCustomValidity('');
      if (element.validity.valueMissing) {
        element.setCustomValidity(' ');
      } else if (element.validity.patternMismatch) {
        element.setCustomValidity('patternMismatch!!!');
      } else if (element.validity.rangeOverflow) {
        element.setCustomValidity('rangeOverflow!!!!');
      } else if (element.validity.rangeUnderflow) {
        element.setCustomValidity('rangeUnderflow!!!!');
      } else if (element.validity.stepMismatch) {
        element.setCustomValidity('stepMismatch!!!!');
      } else if (element.validity.tooLong) {
        element.setCustomValidity('tooLong!!!!');
      } else if (element.validity.tooShort) {
        element.setCustomValidity('The ' + element.name + ' has to be at least ' + element.minLength + ' characters long.');
      } else if (element.validity.typeMismatch) {
        if (element.type === 'email') {
          element.setCustomValidity('Enter a valid email.');
        }
      }
    } else {
      element.setCustomValidity('');
    }
  }
}