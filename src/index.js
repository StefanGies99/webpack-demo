import './style.css'
import SpotifyApi from 'spotify-web-api-js'
import { loginUrl, getTokenFromResponse } from './components/spotify-auth'

let api = new SpotifyApi()
let accessToken

function initialize() {
    initializeDropzone()
    initializeDraggable()
    initializeSpotifyAPI()

    // Attach SpotifyWebPlaybackSDK to window
    window.onSpotifyWebPlaybackSDKReady = () => {
        initializeSpotifyWebPlaybackSDK()
    }
}

function initializeDropzone() {
    // Initializes HTML5 dropzone component with an event listener on dragOver and drop event
    const dropzone = document.getElementById('dropzone')
    dropzone.addEventListener('dragover', (event) => {
        event.preventDefault()
    })
    dropzone.addEventListener('drop', (event) => {
        const track = event.dataTransfer.getData('text')
        api.play({uris: [track]})
    })
}

function initializeDraggable() {
    // Initializes HTML5 draggable components with an event listener on dragStart event
    const draggables = document.querySelectorAll('.draggable')
    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', (event) => {
            event.dataTransfer.setData('text/plain', event.target.getAttribute('data-track'))
        })
    });
}

function initializeSpotifyWebPlaybackSDK() {
    // Initialize WebPlayBackSDK
    const player = new Spotify.Player({
        name: 'Web Playback SDK Quick Start Player',
        getOAuthToken: cb => { cb(accessToken) },
    })

    // Error handling
    player.addListener('initialization_error', ({ message }) => { console.error(message) })
    player.addListener('authentication_error', ({ message }) => { console.error(message) })
    player.addListener('account_error', ({ message }) => { console.error(message) })
    player.addListener('playback_error', ({ message }) => { console.error(message) })

    // Playback status updates
    player.addListener('player_state_changed', state => { console.log(state) })

    // Ready
    player.addListener('ready', ({ device_id }) => {
        console.log('Ready with Device ID', device_id)
        api.transferMyPlayback([device_id])
    });

    // Not Ready
    player.addListener('not_ready', ({ device_id }) => {
        console.log('Device ID has gone offline', device_id)
    });

    // Connect to the player!
    player.connect()
}

function initializeSpotifyAPI() {
    // Resolve token from Spotify auth component
    accessToken = getTokenFromResponse()

    if (accessToken === undefined) {
        window.location = loginUrl
    } else {
        api.setAccessToken(accessToken)
    }
}

initialize()