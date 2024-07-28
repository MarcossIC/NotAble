import type { CustomWhisperModelV1 } from "./whisperModelV1";

type WhisperResponse = {
	text: string;
	x_groq: {id: string};
  }

type WhisperMappedResponse =  Omit<Awaited<ReturnType<CustomWhisperModelV1['doGenerate']>>, "warnings">;
  
export async function validJSON(response: Response): Promise<WhisperResponse> {
    if(!response.ok) return {text: "", x_groq: {id: ""}};
    const result = await response.json();
    return result as WhisperResponse;
  }
  
  export  function mapValue(value: WhisperResponse): WhisperMappedResponse {
    return {
      id: value.x_groq.id,
      content: value.text,
      role: "user",
      finish_reason: !value.text ? "error":"stop",
      object: "audio.transcriptions"
    }
  }
  