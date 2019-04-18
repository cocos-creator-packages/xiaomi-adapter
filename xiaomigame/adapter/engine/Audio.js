const Audio = cc.Audio;

Object.assign(Audio.prototype, {
    _onLoaded  () {
        let elem = this._src._nativeAsset;
        // Reuse dom audio element
        if (!this._element) {
            this._element = qg.createInnerAudioContext();
        }
        this._element.src = elem.src;
    
        this.setVolume(this._volume);
        this.setLoop(this._loop);
        if (this._nextTime !== 0) {
            this.setCurrentTime(this._nextTime);
        }
        if (this._state === Audio.State.PLAYING) {
            this.play();
        }
        else {
            this._state = Audio.State.INITIALZING;
        }
    },

    destroy () {
        this._element.destroy();
        this._element = null;
    },
});