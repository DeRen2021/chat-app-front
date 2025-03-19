import { VOICE_BASE_URL } from './config'

export async function transcribeAudio(audioBlob) {
  if (!audioBlob) {
    throw new Error('没有收到音频数据')
  }

  try {
    const formData = new FormData()
    formData.append('audio_file', audioBlob, 'recording.webm')
    
    const response = await fetch(VOICE_BASE_URL, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json',
      },
      credentials: 'include'
    })
    
    const data = await response.json()
    if (!response.ok) {
      throw new Error(data.error || '转录请求失败')
    }
    
    if (!data.transcription) {
      throw new Error('didnt get audio transcribe from whisper model, did you say anything?')
    }
    
    return data.transcription
  } catch (error) {
    console.error('音频转录失败:', error)
    throw new Error(error.message || '音频转录失败，请重试')
  }
} 
