import Tone, {Volume, ToneOscillatorType} from "tone";
import {Frequency, Time} from "tone/Tone/core/type/Units";

class Sound{
    vol: Volume
    player: {
        loop: boolean,
        autostart: boolean
        stop: () => void
        start: () => void
    } | null // TODO: VALUTARE SE CAMBIARE QUESTO TIPO
    soundPlayer: string | null // TODO: VALUTARE SE CAMBIARE QUESTO TIPO
    playing: boolean | null // TODO: VALUTARE SE CAMBIARE QUESTO TIPO
    constructor(){
        this.vol = new Tone.Volume(-12).toDestination();
        this.player = null;
        this.soundPlayer = null;
        this.playing = null;
    }

    playTone(frequency?: Frequency, env?: ToneOscillatorType, duration?: Time){
        new Tone.Oscillator(frequency, env).connect(this.vol).start().stop("+"+duration);
    }

    playMusic(music: boolean, repeat: boolean){
        if(this.playing === music)
            return;
        this.stopMusic();
        this.player = new Tone.Player("res/audio/"+music+".mp3").toDestination();
        this.player.loop = repeat;
        this.player.autostart = true;
        this.playing = music;
    }

    stopMusic(){
        if(this.player !== null)
            this.player.stop();
    }

    restartMusic(){
        if(this.player !== null)
            this.player.start();
    }

    playSound(music: string, repeat: boolean, onLoad: () => void | undefined){
        new Tone.Player({
            url: "res/audio/"+music+".mp3",
            autostart: true,
            loop: repeat,
            // onload: onLoad === undefined ? Tone.noOp : onLoad TODO: rimuovi la riga sotto con questa dopo averla debuggata
            onload: onLoad
        }).toDestination();
    }
}

export default Sound;