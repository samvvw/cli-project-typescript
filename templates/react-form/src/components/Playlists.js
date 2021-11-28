import React from 'react'

export default function Playlists({ savedPlaylists }) {
    return (
        <div>
            <h4 style={{ color: 'purple' }}>
                {savedPlaylists
                    ? savedPlaylists.map((playlist, i) => (
                          <li key={i}>{playlist.playlistName}</li>
                      ))
                    : ''}
            </h4>
        </div>
    )
}
