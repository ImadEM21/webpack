import 'bootstrap';
import './styles/styles.scss';
import videojs from 'video.js';
import tram from './medias/tram.mp4';

videojs(document.querySelector('#videoTram'), {
    control: true
}).ready(function() {
    let vPlayer = this;
    vPlayer.src(tram);
});