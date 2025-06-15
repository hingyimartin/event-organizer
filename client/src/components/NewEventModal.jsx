// system imports
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

// images, icons, svgs, media imports
import {
  X,
  Calendar,
  MapPin,
  Globe,
  Building,
  Hash,
  Navigation,
  Clock,
  FileText,
  Type,
} from 'lucide-react';

// component imports

const NewEventModal = ({ isOpen, close }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
    country: '',
    city: '',
    street: '',
    zipcode: '',
    latitude: '',
    longitude: '',
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormData({
      title: '',
      description: '',
      startDate: '',
      startTime: '',
      endDate: '',
      endTime: '',
      country: '',
      city: '',
      street: '',
      zipcode: '',
      latitude: '',
      longitude: '',
    });
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('location.')) {
      const locationField = name.split('.')[1];
      setFormData((prev) => ({
        ...prev,
        location: {
          ...prev.location,
          [locationField]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className='fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => {
            close();
          }}
        >
          <motion.div
            className='bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto'
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', duration: 0.5 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className='relative bg-gradient-to-r from-emerald-500 to-teal-600 px-6 py-6 text-white'>
              <button
                onClick={close}
                className='absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors'
              >
                <X size={20} />
              </button>
              <div className='text-center'>
                <div className='w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4'>
                  <Calendar size={24} />
                </div>
                <h2 className='text-2xl font-bold'>Create New Event</h2>
                <p className='text-emerald-100 mt-1'>
                  Fill in the details for your event
                </p>
              </div>
            </div>

            {/* Modal Form */}
            <div className='p-6'>
              <form onSubmit={handleSubmit} className='space-y-6'>
                {/* Event Details */}
                <div className='space-y-4'>
                  <h3 className='text-lg font-semibold text-gray-900'>
                    Event Details
                  </h3>

                  <div className='space-y-2'>
                    <label className='text-sm font-medium text-gray-700'>
                      Event Title *
                    </label>
                    <div className='relative'>
                      <Type
                        className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'
                        size={18}
                      />
                      <input
                        type='text'
                        name='title'
                        value={formData.title}
                        onChange={handleInputChange}
                        required
                        className='w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all'
                        placeholder='Enter event title'
                      />
                    </div>
                  </div>

                  <div className='space-y-2'>
                    <label className='text-sm font-medium text-gray-700'>
                      Description *
                    </label>
                    <div className='relative'>
                      <FileText
                        className='absolute left-3 top-4 text-gray-400'
                        size={18}
                      />
                      <textarea
                        name='description'
                        value={formData.description}
                        onChange={handleInputChange}
                        required
                        rows={3}
                        className='w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all resize-none'
                        placeholder='Describe your event'
                      />
                    </div>
                  </div>

                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div className='space-y-2'>
                      <label className='text-sm font-medium text-gray-700'>
                        Start Date *
                      </label>
                      <div className='relative'>
                        <Calendar
                          className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'
                          size={18}
                        />
                        <input
                          type='date'
                          name='startDate'
                          value={formData.startDate}
                          onChange={handleInputChange}
                          required
                          className='w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all'
                        />
                      </div>
                    </div>

                    <div className='space-y-2'>
                      <label className='text-sm font-medium text-gray-700'>
                        Start Time *
                      </label>
                      <div className='relative'>
                        <Clock
                          className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'
                          size={18}
                        />
                        <input
                          type='time'
                          name='startTime'
                          value={formData.startTime}
                          onChange={handleInputChange}
                          required
                          className='w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all'
                        />
                      </div>
                    </div>
                  </div>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div className='space-y-2'>
                      <label className='text-sm font-medium text-gray-700'>
                        End Date *
                      </label>
                      <div className='relative'>
                        <Calendar
                          className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'
                          size={18}
                        />
                        <input
                          type='date'
                          name='endDate'
                          value={formData.endDate}
                          onChange={handleInputChange}
                          required
                          className='w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all'
                        />
                      </div>
                    </div>

                    <div className='space-y-2'>
                      <label className='text-sm font-medium text-gray-700'>
                        End Time *
                      </label>
                      <div className='relative'>
                        <Clock
                          className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'
                          size={18}
                        />
                        <input
                          type='time'
                          name='endTime'
                          value={formData.endTime}
                          onChange={handleInputChange}
                          required
                          className='w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all'
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Location Details */}
                <div className='space-y-4'>
                  <h3 className='text-lg font-semibold text-gray-900'>
                    Location Details
                  </h3>

                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div className='space-y-2'>
                      <label className='text-sm font-medium text-gray-700'>
                        Country *
                      </label>
                      <div className='relative'>
                        <Globe
                          className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'
                          size={18}
                        />
                        <input
                          type='text'
                          name='country'
                          value={formData.country}
                          onChange={handleInputChange}
                          required
                          className='w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all'
                          placeholder='Enter country'
                        />
                      </div>
                    </div>

                    <div className='space-y-2'>
                      <label className='text-sm font-medium text-gray-700'>
                        City *
                      </label>
                      <div className='relative'>
                        <Building
                          className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'
                          size={18}
                        />
                        <input
                          type='text'
                          name='city'
                          value={formData.city}
                          onChange={handleInputChange}
                          required
                          className='w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all'
                          placeholder='Enter city'
                        />
                      </div>
                    </div>
                  </div>

                  <div className='space-y-2'>
                    <label className='text-sm font-medium text-gray-700'>
                      Street Address *
                    </label>
                    <div className='relative'>
                      <MapPin
                        className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'
                        size={18}
                      />
                      <input
                        type='text'
                        name='street'
                        value={formData.street}
                        onChange={handleInputChange}
                        required
                        className='w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all'
                        placeholder='Enter street address'
                      />
                    </div>
                  </div>

                  <div className='space-y-2'>
                    <label className='text-sm font-medium text-gray-700'>
                      Zip Code
                    </label>
                    <div className='relative'>
                      <Hash
                        className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'
                        size={18}
                      />
                      <input
                        type='text'
                        name='zipcode'
                        value={formData.zipcode}
                        onChange={handleInputChange}
                        className='w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all'
                        placeholder='Enter zip code (optional)'
                      />
                    </div>
                  </div>

                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div className='space-y-2'>
                      <label className='text-sm font-medium text-gray-700'>
                        Latitude
                      </label>
                      <div className='relative'>
                        <Navigation
                          className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'
                          size={18}
                        />
                        <input
                          type='number'
                          step='any'
                          name='latitude'
                          value={formData.latitude}
                          onChange={handleInputChange}
                          className='w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all'
                          placeholder='Enter latitude (optional)'
                        />
                      </div>
                    </div>

                    <div className='space-y-2'>
                      <label className='text-sm font-medium text-gray-700'>
                        Longitude
                      </label>
                      <div className='relative'>
                        <Navigation
                          className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'
                          size={18}
                        />
                        <input
                          type='number'
                          step='any'
                          name='longitude'
                          value={formData.longitude}
                          onChange={handleInputChange}
                          className='w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all'
                          placeholder='Enter longitude (optional)'
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Form Actions */}
                <div className='flex flex-col sm:flex-row gap-3 pt-6 border-t border-gray-200'>
                  <button
                    type='submit'
                    className='flex-1 bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl hover:from-emerald-600 hover:to-teal-700 transition-all duration-200'
                  >
                    Create Event
                  </button>
                  <button
                    type='button'
                    onClick={close}
                    className='flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors'
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NewEventModal;
