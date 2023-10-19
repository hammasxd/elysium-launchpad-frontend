import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
export async function DELETE(request: NextRequest, response: NextResponse) {

   
   const isAuth= cookies().get('isAuth')?.value;

   cookies().delete('isAuth');
    
    return new Response(`cookies is deleted successfully`);
}
export async function POST(request: NextRequest, response: NextResponse) {

   
    const expires = new Date();
    expires.setTime(expires.getTime() + 2 * 24 * 60 * 60 * 1000);
    cookies().set({
        name: 'isAuth',
        value: 'true',
        httpOnly: true,
        path: '/',
        expires: new Date().getTime() + 2 * 24 * 60 * 60 * 1000
      })
 
    const isAuth=cookies().get('isAuth')?.value;
     
     return new Response(`cookie set to ${isAuth}`);
 }
