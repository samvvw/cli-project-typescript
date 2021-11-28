import React, { useState, useEffect } from 'react'
import RandomJokes from './components/RandomJokes'
import CreatePlaylist from './components/CreatePlaylist'
import axios from 'axios'
import Playlists from './components/Playlists'

export default function App(props) {
    const [jokes, setJokes] = useState([])
    const [loading, setLoading] = useState(false)

    const [playlistName, setPlaylistName] = useState('')
    const [response, setResponse] = useState('')

    const [savedPlaylists, setSavedPlaylists] = useState([])

    useEffect(() => {
        setLoading(true)
        axios
            .get('https://karljoke.herokuapp.com/jokes/programming/6')
            .then((result) => {
                // console.log(result.data)
                setLoading(false)
                setJokes(result.data)
            })
            .catch((error) => {
                setLoading(false)
                console.log(error)
            })
    }, [])

    useEffect(() => {
        setLoading(true)
        axios.get('/playlists').then((result) => {
            setLoading(false)
            setSavedPlaylists(result.data.allPlaylists)
        })
    }, [])

    function handleSubmit(e) {
        e.preventDefault()

        const data = {
            playlistName: playlistName,
        }

        axios
            .post('/playlists', data)
            .then((result) => {
                axios
                    .get('/playlists')
                    .then((playlistResult) => {
                        e.target.reset()
                        setSavedPlaylists(playlistResult.data.allPlaylists)
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            })
            .catch((error) => {
                console.log(error)
            })
    }
    return (
        <div className="app">
            <h1>{props.title}</h1>
            <RandomJokes jokes={jokes} loading={loading} />
            <Playlists savedPlaylists={savedPlaylists} />
            <CreatePlaylist
                jokes={jokes}
                playlistName={playlistName}
                setPlaylistName={setPlaylistName}
                handleSubmit={handleSubmit}
            />
        </div>
    )
}
