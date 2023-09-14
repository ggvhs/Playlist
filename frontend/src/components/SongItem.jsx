import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteSong, updateSong } from "../features/songs/songSlice";

function SongItem({ song }) {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [songName, setSongName] = useState(song.songName);
  const [artistName, setArtistName] = useState(song.artistName);

  // Get user authentication state from Redux
  const isAuthenticated = useSelector((state) => state.auth.user !== null);

  const handleUpdateSong = () => {
    if (!isAuthenticated) {
      console.error("User is not authenticated. Cannot update song.");
      return;
    }

    // Dispatch the updateSong action with the song ID and updated data
    dispatch(
      updateSong({
        songId: song._id,
        songData: {
          songName: songName,
          artistName: artistName,
        },
      })
    );
    setIsEditing(false);
  };

  return (
    <div className="song">
      <div>{new Date(song.createdAt).toLocaleString("en-US")}</div>
      {isEditing ? (
        <div>
          <input
            type="text"
            value={songName}
            onChange={(e) => setSongName(e.target.value)}
          />
          <input
            type="text"
            value={artistName}
            onChange={(e) => setArtistName(e.target.value)}
          />
          <button onClick={handleUpdateSong}>Save</button>
        </div>
      ) : (
        <div>
          <h2>{songName}</h2>
          <h2>{artistName}</h2>
          <button onClick={() => dispatch(deleteSong(song._id))} className="close">
            X
          </button>
          {isAuthenticated && (
            <button onClick={() => setIsEditing(true)}>Edit Song</button>
          )}
        </div>
      )}
    </div>
  );
}

export default SongItem;