import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import songService from './songService'

const initialState = {
  songs: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Create new song
export const createSong = createAsyncThunk(
  'songs/create',
  async (songData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await songService.createSong(songData, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Get user songs
export const getSongs = createAsyncThunk(
  'songs/getAll',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await songService.getSongs(token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

//update song 
export const updateSong = createAsyncThunk(
  'songs/update',
  async ({ songId, songData }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await songService.updateSong(songId, songData, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Delete song
export const deleteSong = createAsyncThunk(
    'songs/delete',
    async (id, thunkAPI) => {
      try {
        const token = thunkAPI.getState().auth.user.token
        return await songService.deleteSong(id, token)
      } catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString()
        return thunkAPI.rejectWithValue(message)
      }
    }
  )


export const songSlice = createSlice({
  name: 'song',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createSong.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createSong.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.songs.push(action.payload)
      })
      .addCase(createSong.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getSongs.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getSongs.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.songs = action.payload
      })
      .addCase(getSongs.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
    .addCase(deleteSong.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteSong.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.songs = state.songs.filter(
          (song) => song._id !== action.payload.id
        )
      })
      .addCase(deleteSong.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })

  },
})

export const { reset } = songSlice.actions
export default songSlice.reducer