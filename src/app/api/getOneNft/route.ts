import { NextApiRequest,NextApiResponse } from "next";


export async function POST(request: Request ) {
    const body= request.body


    return new Response (body)
}
    

