export default function useUploadAudio(){
    const uploadAudio = async (audioBlob: Blob) => {
        if (audioBlob) {
          const formData = new FormData();
          formData.append('audio', audioBlob, 'audio.wav');
    
          const response = await fetch('/api/upload-audio', {
            method: 'POST',
            body: formData,
          });
    
          if (response.ok) {
            console.log('Audio uploaded successfully');
          } else {
            console.error('Failed to upload audio');
          }
        }
      };
}