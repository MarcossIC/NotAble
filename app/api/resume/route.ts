import type { Note } from '@/app/models/notesTypes';
import groq from '@/lib/ai/groq';
import {  generateText } from 'ai';
import { NextResponse } from 'next/server';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
	const body = await req.json();
	const notes = body["notes"] as Note[];
	const stringNotes = notes.map((note, index)=>{
		const num= index+1;
		return `${num}- ${note.note}.`;
	}).join(" ");

	const {text} = await generateText({
        model: groq('llama3-8b-8192'),
        prompt: `Voy a proporcionarte una lista de notas enumeradas. Necesito que las comprendas y sintetices en un resumen redactado en primera persona, como si el autor lo estuviera escribiendo. No incluyas introducciones, observaciones, títulos ni inicios de texto. Solo devuelve el resumen y luego, al final, resalta los puntos más importantes mencionados en las notas. Aquí están las notas: \n ${stringNotes}`,
      });
	  
	// Respond with the stream
	return NextResponse.json({text }, { status: 200 });
}
