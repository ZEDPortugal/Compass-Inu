import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { 
      businessName, 
      email, 
      phone, 
      password, 
      category,
      address,
      description,
      contactPerson,
      provider,
      googleToken,
      googleUser,
    } = body;

    // Handle Google Sign-Up for Merchant
    if (provider === 'google') {
      if (!googleToken || !googleUser) {
        return NextResponse.json({ error: 'Invalid Google credentials' }, { status: 400 });
      }

      // Create pending merchant application
      const newMerchant = {
        id: `merchant_google_${Date.now()}`,
        email: googleUser.email,
        contactPerson: googleUser.name,
        avatar: googleUser.picture,
        role: 'merchant',
        status: 'pending', // Requires admin approval
        provider: 'google',
        googleId: googleUser.sub,
        createdAt: new Date().toISOString(),
        // Additional details need to be filled
        requiresCompletion: true,
      };

      return NextResponse.json({
        success: true,
        data: {
          merchant: newMerchant,
          requiresCompletion: true,
        },
        message: 'Please complete your business profile',
      });
    }

    // Validate required fields
    if (!businessName || businessName.trim().length < 2) {
      return NextResponse.json({ error: 'Business name is required' }, { status: 400 });
    }

    if (!email) {
      return NextResponse.json({ error: 'Business email is required' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }

    if (!password || password.length < 6) {
      return NextResponse.json({ error: 'Password must be at least 6 characters' }, { status: 400 });
    }

    if (!category) {
      return NextResponse.json({ error: 'Business category is required' }, { status: 400 });
    }

    // Check if email already exists
    if (email === 'existing@merchant.com') {
      return NextResponse.json({ 
        error: 'Email already registered',
        message: 'A merchant account with this email already exists.'
      }, { status: 409 });
    }

    // Create new merchant application
    const newMerchant = {
      id: `merchant_${Date.now()}`,
      businessName,
      email,
      phone: phone || null,
      category,
      address: address || null,
      description: description || null,
      contactPerson: contactPerson || null,
      role: 'merchant',
      status: 'pending', // All merchants start as pending for admin approval
      createdAt: new Date().toISOString(),
    };

    // In production, save to database and notify admins

    return NextResponse.json({
      success: true,
      data: {
        merchant: {
          id: newMerchant.id,
          businessName: newMerchant.businessName,
          email: newMerchant.email,
          status: newMerchant.status,
        },
        status: 'pending',
      },
      message: 'Merchant application submitted successfully. Your account is pending approval.',
    });
  } catch (error) {
    console.error('Merchant signup error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
