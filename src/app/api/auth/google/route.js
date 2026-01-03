import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { credential, clientId } = body;

    if (!credential) {
      return NextResponse.json({ error: 'Google credential is required' }, { status: 400 });
    }

    // In production, verify the credential with Google's API
    // Using: https://oauth2.googleapis.com/tokeninfo?id_token=<credential>
    // Or: google-auth-library for Node.js
    
    // For demo purposes, we'll decode the JWT payload (not secure for production!)
    // In production, ALWAYS verify the token signature
    let googleUser;
    
    try {
      // Decode JWT payload (base64)
      const payload = credential.split('.')[1];
      const decoded = JSON.parse(Buffer.from(payload, 'base64').toString());
      
      googleUser = {
        sub: decoded.sub, // Google user ID
        email: decoded.email,
        email_verified: decoded.email_verified,
        name: decoded.name,
        picture: decoded.picture,
        given_name: decoded.given_name,
        family_name: decoded.family_name,
      };
    } catch {
      // If decoding fails, use mock data for development
      googleUser = {
        sub: `google_${Date.now()}`,
        email: 'google.user@gmail.com',
        email_verified: true,
        name: 'Google User',
        picture: null,
      };
    }

    // Check if user exists in database
    // In production, query your database
    const existingUser = null; // mockUsers.find(u => u.googleId === googleUser.sub || u.email === googleUser.email);

    let user;
    let isNewUser = false;

    if (existingUser) {
      user = existingUser;
    } else {
      // Create new user
      isNewUser = true;
      user = {
        id: `user_google_${Date.now()}`,
        email: googleUser.email,
        name: googleUser.name,
        avatar: googleUser.picture,
        role: 'user',
        provider: 'google',
        googleId: googleUser.sub,
        emailVerified: googleUser.email_verified,
        createdAt: new Date().toISOString(),
      };
      
      // In production, save user to database
    }

    // Generate JWT token
    const token = `mock_jwt_token_${user.id}_${Date.now()}`;

    return NextResponse.json({
      success: true,
      data: {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          avatar: user.avatar,
          role: user.role,
        },
        token,
        isNewUser,
      },
      message: isNewUser ? 'Account created with Google' : 'Logged in with Google',
    });
  } catch (error) {
    console.error('Google auth error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET() {
  // Return Google OAuth configuration
  // In production, these would come from environment variables
  return NextResponse.json({
    success: true,
    data: {
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || 'your-google-client-id.apps.googleusercontent.com',
      scopes: ['openid', 'email', 'profile'],
    },
  });
}
