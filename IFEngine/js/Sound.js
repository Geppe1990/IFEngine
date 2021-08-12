class Sound{
	constructor(){
		this.vol = new Tone.Volume(-12).toDestination();
		this.player = null;
		this.soundPlayer = null;
		this.playng = null;
	}
	
	playTone(frequency, env, duration){
		new Tone.Oscillator(frequency, env).connect(this.vol).start().stop("+"+duration);
	}

	playMusic(music, repeat){
		if(this.playing == music)
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

	playSound(music, repeat, onLoad){
		new Tone.Player({
			url: "res/audio/"+music+".mp3",
			autostart: true,
			loop: repeat,
			onload: onLoad === undefined ? Tone.noOp : onLoad
		}).toDestination();
	}
}