import React, { useEffect } from "react";
import { gapi } from "gapi-script";

const CLIENT_ID =
  "1";
const API_KEY = "1";
const SCOPES = "https://www.googleapis.com/auth/calendar.events";

export const GoogleAuth = () => {
  useEffect(() => {
    const start = () => {
      gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: [
          "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
        ],
        scope: SCOPES,
      });
    };
    gapi.load("client:auth2", start);
  }, []);

  const handleAuthClick = () => {
    gapi.auth2.getAuthInstance().signIn();
  };

  const handleSignoutClick = () => {
    gapi.auth2.getAuthInstance().signOut();
  };

  return (
    <div>
      <button onClick={handleAuthClick}>Sign In</button>
      <button onClick={handleSignoutClick}>Sign Out</button>
    </div>
  );
};
