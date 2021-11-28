import React from 'react'

export default function CreatePlaylist({
    playlistName,
    setPlaylistName,
    handleSubmit,
}) {
    function handleInput(e) {
        e.preventDefault()
        setPlaylistName(e.target.value)
    }

    return (
        <div>
            <h4>{playlistName ? playlistName : ''}</h4>

            <form onSubmit={handleSubmit}>
                <label htmlFor="playlistName">Playlist Name</label>
                <input
                    type="text"
                    name="playlistName"
                    id="playlistName"
                    onChange={handleInput}
                />
                <button>Submit</button>
            </form>
        </div>
    )
}
