import { notFound } from 'next/navigation';
import { venues } from '@/data/venues';
import { Metadata } from 'next';
import { formatVenueHours } from '@/utils/formatHours';
import VenuePageClient from './VenuePageClient';

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const venue = venues.find(v => v.id === Number(params.id));
  return {
    title: venue ? `${venue.name} – Bassline` : 'Venue – Bassline',
    description: venue?.shortDescription || 'Venue details on Bassline',
  };
}

export default function VenuePage({ params }: { params: { id: string } }) {
  const venue = venues.find(v => v.id === Number(params.id));
  if (!venue) return notFound();

  return <VenuePageClient venue={venue} />;
} 