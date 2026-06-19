import { NextRequest, NextResponse } from 'next/server';
import { RsvpService } from '@/backend_lib/services/rsvpService';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.fullName || typeof body.fullName !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Full name is required' },
        { status: 400 }
      );
    }

    if (typeof body.attending !== 'boolean') {
      return NextResponse.json(
        { success: false, error: 'Attending status is required' },
        { status: 400 }
      );
    }

    if (!body.signature || typeof body.signature !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Signature is required' },
        { status: 400 }
      );
    }

    const guestsCount = typeof body.guestsCount === 'number' ? body.guestsCount : parseInt(body.guestsCount) || 0;

    const newRsvp = await RsvpService.createRsvp({
      fullName: body.fullName,
      attending: body.attending,
      guestsCount,
      message: body.message || '',
      signature: body.signature,
    });

    return NextResponse.json({ success: true, data: newRsvp }, { status: 201 });
  } catch (error: any) {
    console.error('[API] Error in POST /api/rsvp:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to submit RSVP' },
      { status: 500 }
    );
  }
}
