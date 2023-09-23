import Auth0Lock from 'auth0-lock';

const config = {
  clientID: 'bSLUtc9o9X7QPmEtPAPRZwJdG6OM2Iqu',
  auth0Domain: 'dev-vzceaul8gt0b1m3d.us.auth0.com'
};

const lock = new Auth0Lock(config.clientID, config.auth0Domain, {
  // ... other configurations
  auth: {
    redirectUrl: 'http://localhost:3000/callback',  // Replace with your callback URL
    responseType: 'token id_token'
  },
  additionalSignUpFields: [
    {
      name: "first_name",
      placeholder: "Enter your first name"
    },
    {
      name: "last_name",
      placeholder: "Enter your last name"
    }
  ]
});

export default lock;
