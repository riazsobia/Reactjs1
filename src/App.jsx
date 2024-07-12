import React, { useState, useRef, useEffect } from "react";
import RecordRTC, { invokeSaveAsDialog } from "recordrtc";

// const hasGetUserMedia = !!(
//   navigator.mediaDevices.getUserMedia ||
//   navigator.mediaDevices.webkitGetUserMedia ||
//   navigator.mediaDevices.mozGetUserMedia ||
//   navigator.mediaDevices.msGetUserMedia
// );

function App() {

  // variables de estado
  const [stream, setStream] = useState(null);
  const [blob, setBlob] = useState(null);
  const refVideo = useRef(null);
  const recorderRef = useRef(null);



  const handleRecording = async () => {
    // const cameraStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    const mediaStream = await navigator.mediaDevices.getDisplayMedia({
      video: true,
      audio: true,
    });

    setStream(mediaStream);
    recorderRef.current = new RecordRTC(mediaStream, {
      type: "video",
    });
    recorderRef.current.startRecording();
  };

  const handleStop = () => {
    recorderRef.current.stopRecording(() => {
      setBlob(recorderRef.current.getBlob());
    });
  };

  const handleSave = () => {
    invokeSaveAsDialog(blob);
  };

  useEffect(() => {
    if (!refVideo.current) {
      return;
    }

    //refVideo.current.srcObject = stream;
  }, [stream, refVideo]);

  return (
    <div>
        <button onClick={handleRecording}>start</button>
        <button onClick={handleStop}>stop</button>
        <button onClick={handleSave}>save</button>
        
        {stream != null ? (<p>Tiene contenido</p>) : (<p>No tiene contenido</p>)}
        
        {blob && (
          <video
            src={URL.createObjectURL(blob)}
            controls
            autoPlay
            ref={refVideo}
            style={{ width: "700px", margin: "1em" }}
          />
        )}
    </div>
  );
}

export default App;