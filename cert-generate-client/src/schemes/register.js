export const register = ({ passPhrase, compareToFirstPassPhrase }) => [
  {
    name: 'email',
    label: 'Email',
    type: 'String',
    required: true,
    message: 'Please input your email',
    rules: {
      type: 'email', message: 'The input is not valid E-mail!',
    },
  },{
    name: 'firstName',
    label: 'First Name',
    type: 'String',
    required: true,
    message: 'Please input your First Name',
  },{
    name: 'lastName',
    label: 'Last Name',
    type: 'String',
    required: true,
    message: 'Please input your Last Name',
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
      validator: passPhrase
    }
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