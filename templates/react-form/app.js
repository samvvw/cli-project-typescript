const { urlencoded } = require('express')
const express = require('express')
const app = express()
const PORT = process.env.PORT || 8080
const server = app.listen(PORT, () =>
    console.log(`Listening http://localhost:${PORT}`)
)

app.use(express.json())
// app.use(express.urlencoded({ extended: true }))

app.locals.playlistStorage = []

const { playlistStorage } = app.locals

app.get('/playlists', (req, res) => {
    res.json({ allPlaylists: playlistStorage })
})

app.post('/playlists', (req, res) => {
    const { playlistName, jokes } = req.body
    const playlist = {
        playlistName: playlistName,
        jokes: jokes,
    }
    playlistStorage.push(playlist)
    res.send(`success ${req.body.playlistName}`)
})

app.use(express.static('public'))
