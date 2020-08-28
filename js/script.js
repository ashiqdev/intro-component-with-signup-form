const firstName = document.querySelector('#firstName');
const lastName = document.querySelector('#lastName');
const email = document.querySelector('#email');
const password = document.querySelector('#password');

const form = document.querySelector('#myForm');

form.addEventListener('submit', function (event) {
  // prevent default behaviour
  event.preventDefault();

  if (
    validateFirstName() &&
    validateLastName() &&
    validatePassword() &&
    validateEmail()
  ) {
    firstName.value = '';
    lastName.value = '';
    password.value = '';
    email.value = '';
  } else {
    validateFirstName();
    validateLastName();
    validatePassword();
    validateEmail();
  }
});

// utility functions

const setError = (field, msg) => {
  const icon = field.nextElementSibling;
  const newField = field.parentElement;
  newField.nextElementSibling.innerHTML = msg;
  newField.nextElementSibling.style.color = '#FF7A7A';
  field.style.borderColor = '#FF7A7A';
  icon.style.opacity = 1;
};

const setValid = (field) => {
  const icon = field.nextElementSibling;
  const newField = field.parentElement;
  newField.nextElementSibling.innerHTML = '';
  field.style.borderColor = '#38cc8c';
  icon.style.opacity = 0;

};

const checkIfEmpty = (field) => {
  const isEmpty = () => field.value.trim() === '';
  if (isEmpty()) {
    // set the error
    setError(field, `${field.name} must not be empty`);
    return true;
  } else {
    setValid(field);
    return false;
  }
};

const checkIfOnlyLetters = (field) => {
  if (/^[a-zA-Z]+$/.test(field.value)) {
    setValid(field);
    return true;
  } else {
    setError(field, `${field.name} must contain only letters`);
    return false;
  }
};

const meetLength = (field, min, max) => {
  if (field.value.length >= min && field.value.length < max) {
    setValid(field);
    return true;
  } else if (field.value.length < min) {
    setError(field, `${field.name} must be at least ${min} characters long`);
    return false;
  } else {
    setError(
      field,
      `${field.name} must be shorter than ${max} characters long`
    );
    return false;
  }
};

function matchWithRegEx(regEx, field, message) {
  if (field.value.match(regEx)) {
    setValid(field);
    return true;
  } else {
    setError(field, message);
    return false;
  }
}

function containsCharacters(field) {
  // Email pattern
  regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return matchWithRegEx(regEx, field, 'Looks like this is not an email');
}

// validators

const validateFirstName = () => {
  // check if the field is empty
  if (checkIfEmpty(firstName)) return;

  // check if the field contains only letters
  if (!checkIfOnlyLetters(firstName)) return;

  return true;
};

const validateLastName = () => {
  // check if the field is empty
  if (checkIfEmpty(lastName)) return;

  // check if the field contains only letters
  if (!checkIfOnlyLetters(lastName)) return;

  return true;
};

const validatePassword = () => {
  // check if the field is empty
  if (checkIfEmpty(password)) return;
  // Must of in certain length
  if (!meetLength(password, 6, 100)) return;

  return true;
};

const validateEmail = () => {
  if (checkIfEmpty(email)) return;
  if (!containsCharacters(email)) return;

  return true;
};
