export const register = ({ passPhrase, compareToFirstPassPhrase }) => [
  {
    name: 'email',
    label: 'Email',
    type: 'String',
    required: true,
    message: 'Please input your email',
    rules: {
      type: 'email',
      message: 'The input is not valid E-mail!',
    },
  },{
    name: 'firstName',
    label: 'First Name',
    type: 'String',
    required: true,
    message: 'Please input your First Name',
    rules: {
      pattern: /^[a-zA-Z]*$/,
      message: 'Only latin symbols are allowed',
    },
  },{
    name: 'lastName',
    label: 'Last Name',
    type: 'String',
    required: true,
    message: 'Please input your Last Name',
    rules: {
      pattern: /^[a-zA-Z]*$/,
      message: 'Only latin symbols are allowed',
    },
  },{
    name: 'passphrase',
    label: 'Passphrase',
    type: 'String',
    required: false,
    message: 'Please input your passphrase',
    props: {
      type: "password",
    },
    rules: {
      min: 10,
      pattern: /^[a-zA-Z0-9]*$/,
      message: 'Passphrase must have at least 10 characters and only numbers and letters are allowed',
    },
  },{
    name: 'confirmPassphrase',
    label: 'Confirm Passphrase',
    type: 'String',
    required: false,
    message: 'Please confirm your passphrase',
    props: {
      type: "password",
    },
    rules: {
      validator: compareToFirstPassPhrase
    }
  },
];