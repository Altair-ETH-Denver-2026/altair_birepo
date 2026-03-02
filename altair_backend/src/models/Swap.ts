import mongoose, { Schema, type InferSchemaType, type Model } from 'mongoose';

const SwapSchema = new Schema(
  {
    SID: { type: String, required: true, unique: true, index: true },
    UID: { type: String, required: true, index: true },
    CID: { type: String, index: true },
    walletAddress: { type: String, index: true },
    chain: { type: String, index: true },
    sellToken: { type: String },
    buyToken: { type: String },
    sellAmount: { type: String },
    buyAmount: { type: String },
    txHash: { type: String, index: true },
    timestamp: { type: String },
  },
  {
    timestamps: true,
  }
);

export type SwapDocument = InferSchemaType<typeof SwapSchema>;

export const Swap: Model<SwapDocument> =
  mongoose.models.Swap ?? mongoose.model<SwapDocument>('Swap', SwapSchema);
