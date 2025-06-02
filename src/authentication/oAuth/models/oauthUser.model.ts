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
    required: true,
    unique: true,
    lowercase: true,
  },
  username: {
    type: String,
    required: true,
  },
  displayName: {
    type: String,
    required: true,
  },
  profileUrl: {
    type: String,
    required: true,
  },
  avatarUrl: {
    type: String,
    required: true,
  },
});

const OAuthUser = mongoose.model<IOAuthUserType>('OAuthUser', oauthUserSchema);
export default OAuthUser;
