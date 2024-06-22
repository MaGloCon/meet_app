import mockData from './mock-data';

// @param {*} events: array of events to extract locations
export const extractLocations = (events) => {
  const extractedLocations = events.map((event) => event.location);
  const locations = [...new Set(extractedLocations)];
  return locations;
};

const checkToken = async (accessToken) => {
  try {
    const response = await fetch(
      `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`
    );
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Failed to check token:', error);
    throw error;
  }
};

// removeQuery function
const removeQuery = () => {
  let newurl;
  if (window.history.pushState && window.location.pathname) {
    newurl = `${window.location.protocol}//${window.location.host}${window.location.pathname}`;
    window.history.pushState("", "", newurl);
  } else {
    newurl = `${window.location.protocol}//${window.location.host}`;
    window.history.pushState("", "", newurl);
  }
};

const getToken = async (code) => {
  try {
    const encodeCode = encodeURIComponent(code);
    const response = await fetch(
      `https://osu2xixbek.execute-api.eu-central-1.amazonaws.com/dev/api/token/${encodeCode}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const { access_token } = await response.json();
    access_token && localStorage.setItem("access_token", access_token);
    return access_token;
  } catch (error) {
    console.error('Failed to get token:', error);
    throw error;
  }
};

export const getAccessToken = async () => {
  try {
    const accessToken = localStorage.getItem('access_token');
    const tokenCheck = accessToken && (await checkToken(accessToken));

    if (!accessToken || (tokenCheck && tokenCheck.error)) {
      localStorage.removeItem("access_token");
      const searchParams = new URLSearchParams(window.location.search);
      const code = searchParams.get("code");
      if (!code) {
        const response = await fetch(
          "https://osu2xixbek.execute-api.eu-central-1.amazonaws.com/dev/api/get-auth-url"
        );
        const result = await response.json();
        const { authURL } = result;
        return (window.location.href = authURL);
      }
      return code && getToken(code);
    }
    return accessToken
  } catch (error) {
    console.error('Failed to get access token:', error);
    throw error;
  }
};

export const getEvents = async () => {
  try {
   
    if (window.location.href.startsWith('http://localhost')) {

      return mockData;
    }

    const token = await getAccessToken();

    if (token) {
      removeQuery();
      const url = `https://osu2xixbek.execute-api.eu-central-1.amazonaws.com/dev/api/get-events/${token}`;
      const response = await fetch(url);
      const result = await response.json();
      if (result) {
        return result.events;
      } else return null;
    }
  } catch (error) {
    console.error('Failed to get events:', error);
    throw error;
  }
};
