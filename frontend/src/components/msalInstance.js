// frontend/src/components/msalInstance.js
import { PublicClientApplication } from '@azure/msal-browser';

const msalConfig = {
  auth: {
    clientId: "99ca919b-3dd0-488f-b3e6-603c8b351f87",
    authority: `https://login.microsoftonline.com/64b55024-8293-414d-9162-34e53bb5aa08`, // Using backticks for interpolation
    redirectUri: 'http://localhost:3001'
  },
  cache: {
    cacheLocation: 'localStorage',
    storeAuthStateInCookie: false
  }
};

const loginRequest = {
  scopes: ["openid", "profile", "User.Read"], // Include required scopes
};


const msalInstance = new PublicClientApplication(msalConfig);

export { msalInstance, loginRequest };
