import { client } from '@/sanity/lib/client';
import { writeClient } from '@/sanity/lib/write-client';
import { STARTUP_VIEWS_QUERY } from '@/sanity/lib/queries';
import { NextResponse } from 'next/server';


export async function GET(_, {params}) {
    // Extract the ID from the request parameters
  const id = params.id;

  if (!id) {
    return NextResponse.json({ success: false, message: 'Missing ID' }, { status: 400 });
  }

  

  try {
    const { view } = await client
      .withConfig({ useCdn: false })
      .fetch(STARTUP_VIEWS_QUERY, { id });

    const safeViews = view ?? 0; // Fallback if null or undefined
    console.log('Fetched views:', safeViews);

    return NextResponse.json({ success: true, views: safeViews });
  } catch (error) {
    console.error('Error fetching views:', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

export async function POST(request, {params}) {
    // Extract the ID and current views from the request body
  const id = params.id;
  const { currentViews } = await request.json();

  if (!id || currentViews === undefined) {
    return NextResponse.json({ success: false, message: 'Missing ID or currentViews' }, { status: 400 });
  }

  try {
    const result = await writeClient
      .patch(id)
      .set({ views: currentViews + 1 })
      .commit();

      console.log('Updated views:', result);

    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error('Error incrementing views:', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}