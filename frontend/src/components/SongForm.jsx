import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createSong } from '../features/songs/songSlice'

function SongForm() {
  const [songName, setSongName] = useState('')
  const [artistName, setArtistName] = useState('')

  const dispatch = useDispatch()

  const onSubmit = (e) => {
    e.preventDefault()

    dispatch(createSong({ songName,artistName }))
    setSongName('')
    setArtistName('')
  }

  return (
    <section className=''>
      <form onSubmit={onSubmit}>
        <div className=''>
          <label htmlFor='songName'>Song </label>
          <input
            type='songName'
            name='songName'
            id='songName'
            value={songName}
            onChange={(e) => setSongName(e.target.value)}
          />
        </div>
        <div className=''>
          <label htmlFor='artistName'>Artist </label>
          <input
            type='artistName'
            name='artistName'
            id='artistName'
            value={artistName}
            onChange={(e) => setArtistName(e.target.value)}
          />
        </div>
        <div className=''>
          <button className='' type='submit'>
            Add Song
          </button>
        </div>
      </form>
    </section>
  )
}

export default SongForm