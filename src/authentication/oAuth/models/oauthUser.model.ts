import mongoose, { Schema, Document } from 'mongoose';
import { IOAuthUser as IOAuthUserType } from '../types/oAuthUser.types.js';

const oauthUserSchema = new Schema<IOAuthUserType & Document>({
  githubId: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: false,
    unique: true,
    lowercase: true,
  },
  username: {
    type: String,
    required: false,
  },
  displayName: {
    type: String,
    required: false,
  },
});

const OAuthUser = mongoose.model<IOAuthUserType>('OAuthUser', oauthUserSchema);
export default OAuthUser;
