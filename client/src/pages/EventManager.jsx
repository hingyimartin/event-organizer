import { useState } from 'react';
import { Calendar, MapPin, Plus, X, Users, Edit, Trash2 } from 'lucide-react';
import NewEventModal from '../components/NewEventModal';

const EventManager = () => {
  const [isNewEventOpen, setIsNewEventOpen] = useState(false);
  const [events, setEvents] = useState([
    {
      id: 1,
      title: 'Tech Conference 2024',
      description:
        'Annual technology conference featuring the latest innovations',
      date: '2024-03-15',
      time: '09:00',
      location: {
        country: 'USA',
        city: 'San Francisco',
        street: '123 Tech Street',
        zipcode: '94105',
      },
      attendees: 150,
      status: 'upcoming',
    },
    {
      id: 2,
      title: 'Music Festival',
      description:
        'Three-day music festival with local and international artists',
      date: '2024-04-20',
      time: '18:00',
      location: {
        country: 'USA',
        city: 'Austin',
        street: '456 Music Ave',
        zipcode: '73301',
      },
      attendees: 500,
      status: 'upcoming',
    },
  ]);

  return (
    <>
      {/* login modal */}
      <NewEventModal
        isOpen={isNewEventOpen}
        close={() => setIsNewEventOpen(false)}
      />

      <div className='min-h-screen bg-gray-50'>
        {/* Header */}
        <div className='bg-teal-50 border-b border-gray-200'>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6'>
            <div className='flex items-center justify-between'>
              <div>
                <h1 className='text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent'>
                  My Events
                </h1>
                <p className='text-gray-600 mt-1'>
                  Manage and create your events
                </p>
              </div>
              <button
                onClick={() => setIsNewEventOpen(true)}
                className='flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg font-semibold shadow-md hover:shadow-lg hover:from-emerald-600 hover:to-teal-700 transform hover:scale-105 transition-all duration-200'
              >
                <Plus size={20} />
                <span>Create Event</span>
              </button>
            </div>
          </div>
        </div>

        {/* Events List */}
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
          {events.length === 0 ? (
            <div className='text-center py-12'>
              <Calendar className='w-16 h-16 text-gray-400 mx-auto mb-4' />
              <h3 className='text-xl font-semibold text-gray-600 mb-2'>
                No events yet
              </h3>
              <p className='text-gray-500 mb-6'>
                Create your first event to get started
              </p>
              <button
                onClick={() => setIsNewEventOpen(true)}
                className='px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg font-semibold shadow-md hover:shadow-lg hover:from-emerald-600 hover:to-teal-700 transform hover:scale-105 transition-all duration-200'
              >
                Create Your First Event
              </button>
            </div>
          ) : (
            <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
              {events.map((event) => (
                <div
                  key={event.id}
                  className='bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden'
                >
                  <div className='p-6'>
                    <div className='flex items-start justify-between mb-4'>
                      <h3 className='text-xl font-bold text-gray-900 line-clamp-2'>
                        {event.title}
                      </h3>
                      <div className='flex space-x-2'>
                        <button className='p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors duration-200'>
                          <Edit size={16} />
                        </button>
                        <button className='p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200'>
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>

                    <p className='text-gray-600 mb-4 line-clamp-3'>
                      {event.description}
                    </p>

                    <div className='space-y-3'>
                      <div className='flex items-center space-x-2 text-sm text-gray-600'>
                        <Calendar size={16} className='text-emerald-600' />
                        <span>
                          {new Date(event.date).toLocaleDateString()} at{' '}
                          {event.time}
                        </span>
                      </div>

                      <div className='flex items-start space-x-2 text-sm text-gray-600'>
                        <MapPin size={16} className='text-emerald-600 mt-0.5' />
                        <div>
                          <div>{event.location.street}</div>
                          <div>
                            {event.location.city}, {event.location.country}
                          </div>
                          {event.location.zipcode && (
                            <div>{event.location.zipcode}</div>
                          )}
                        </div>
                      </div>

                      <div className='flex items-center space-x-2 text-sm text-gray-600'>
                        <Users size={16} className='text-emerald-600' />
                        <span>{event.attendees} attendees</span>
                      </div>
                    </div>

                    <div className='mt-4 pt-4 border-t border-gray-200'>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          event.status === 'upcoming'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {event.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default EventManager;
