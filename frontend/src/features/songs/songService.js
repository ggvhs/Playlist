import axios from 'axios'

const API_URL = '/api/songs/'

// Create new song
const createSong = async (songData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.post(API_URL, songData, config)

  return response.data
}

// Get user songs
const getSongs = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(API_URL, config)

  return response.data
}

//Update user song
const updateSong = async (songId,songData,token) => {
  const config ={
    headers: `Bearer ${token}`
  }

  const response = await axios.put(API_URL + songId,songData,config)

  return response.data
}

// Delete user song
const deleteSong = async (songId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.delete(API_URL + songId, config)

  return response.data
}

const songService = {
  createSong,
  getSongs,
  deleteSong,
  updateSong
}

export default songService