import React from 'react'
import { connect } from 'cerebral/react'

export default connect({
  recorder: 'recorder.*'
}, {
  recordClicked: 'recorder.recordClicked',
  playClicked: 'recorder.playClicked',
  stopClicked: 'recorder.stopClicked',
  pauseClicked: 'recorder.pauseClicked'
},
  function Recorder ({ recorder, recordClicked, playClicked, stopClicked, pauseClicked }) {

    if (recorder.isRecording) {
      return (
        <button className="btn" onClick={() => stopClicked()}>
          Stop
        </button>
      )
    } else if (recorder.isPlaying) {
      return (
        <button className="btn" onClick={() => pauseClicked()}>
          Pause
        </button>
      )
    } else if (recorder.isPaused) {
      return (
        <button className="btn" onClick={() => playClicked()}>
          Resume
        </button>
      )
    } else if (recorder.hasRecording) {
      return (
        <button className="btn" onClick={() => playClicked()}>
          Play
        </button>
      )
    } else {
      return (
        <button className="btn" onClick={() => recordClicked()}>
          Record
        </button>
      )
    }
  }
)
