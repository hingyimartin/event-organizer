import mongoose from 'mongoose';

const { Schema, model, Types } = mongoose;

const eventSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    locationId: {
      type: Types.ObjectId,
      required: true,
      ref: 'Location',
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    organizerId: {
      type: Types.ObjectId,
      required: true,
      ref: 'User',
    },
    category: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model('Event', eventSchema);
