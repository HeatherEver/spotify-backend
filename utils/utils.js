require("dotenv").config({ path: __dirname + "/../.env.development" })

const axios = require("axios")

const spotifyAPI = axios.create({ baseURL: "https://api.spotify.com/v1" })

// const getMe = async () => {
//   const accessToken = process.env.ACCESS_TOKEN;
//   try {
//     const response = await spotifyAPI.get(`/me/top/tracks`, {
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//       },
//       data: { scopes: "user-top-read" },
//     });
//     console.log(response.data);
//   } catch (error) {
//     console.log(error);
//   }
// };

// getMe();
