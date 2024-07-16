import { NextResponse } from 'next/server'

export const config = {
    api: {
      bodyParser: false,
    },
  }

  export default async function handler(req:any, res:any) {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Invalid method' })
    }
  
  }