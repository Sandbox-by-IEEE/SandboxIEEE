'use client';

import { Calendar, MapPin, Ticket, X } from 'lucide-react';
import { useState } from 'react';

import EventTicket from '@/components/site/EventTicket';

interface EventRegistrationData {
  id: string;
  eventCode: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  institution: string;
  verificationStatus: string;
  createdAt: string;
}

interface EventContentData {
  name: string;
  date: string;
  venue: string;
}

interface ProfileEventRegistrationsProps {
  registrations: EventRegistrationData[];
  eventContents: Record<string, EventContentData | null>;
}

export default function ProfileEventRegistrations({
  registrations,
  eventContents,
}: ProfileEventRegistrationsProps) {
  const [ticketModal, setTicketModal] = useState<EventRegistrationData | null>(
    null,
  );

  const ticketEventContent = ticketModal
    ? eventContents[ticketModal.eventCode]
    : null;

  return (
    <>
      <div className='space-y-3'>
        {registrations.map((reg) => {
          const eventContent = eventContents[reg.eventCode];
          return (
            <div
              key={reg.id}
              className='p-4 rounded-xl bg-white/5 border border-white/10'
            >
              <div className='flex justify-between items-start mb-2 gap-2'>
                <h4 className='text-white font-semibold text-sm leading-snug'>
                  {eventContent?.name || reg.eventCode}
                </h4>
                <span className='shrink-0 px-3 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400 border border-green-500/50'>
                  Confirmed
                </span>
              </div>
              {eventContent && (
                <div className='space-y-1 mt-2'>
                  <div className='flex items-center gap-2 text-xs text-gray-400'>
                    <Calendar className='w-3.5 h-3.5 text-[#FFCD8D]' />
                    <span>{eventContent.date}</span>
                  </div>
                  <div className='flex items-center gap-2 text-xs text-gray-400'>
                    <MapPin className='w-3.5 h-3.5 text-[#FFCD8D]' />
                    <span>
                      Seminar Auditorium Lantai 8, Gedung PAU @ Institut
                      Teknologi Bandung
                    </span>
                  </div>
                </div>
              )}
              <div className='flex items-center justify-between mt-3'>
                <p className='text-xs text-gray-500'>
                  Registered on{' '}
                  {new Date(reg.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
                <button
                  onClick={() => setTicketModal(reg)}
                  className='inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FFCD8D]/10 border border-[#FFCD8D]/20 text-[#FFCD8D] text-xs font-semibold hover:bg-[#FFCD8D]/20 hover:border-[#FFCD8D]/40 transition-all duration-200'
                >
                  <Ticket className='w-3.5 h-3.5' />
                  Show Ticket
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Ticket Modal */}
      {ticketModal && (
        <div
          className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm'
          onClick={() => setTicketModal(null)}
        >
          <div
            className='relative w-full max-w-lg max-h-[90vh] overflow-y-auto'
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setTicketModal(null)}
              className='absolute -top-2 -right-2 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-colors'
            >
              <X className='w-4 h-4' />
            </button>

            <EventTicket
              eventName={ticketEventContent?.name || ticketModal.eventCode}
              eventDate={ticketEventContent?.date || ''}
              attendeeName={ticketModal.fullName}
              attendeeEmail={ticketModal.email}
              institution={ticketModal.institution}
            />
          </div>
        </div>
      )}
    </>
  );
}
