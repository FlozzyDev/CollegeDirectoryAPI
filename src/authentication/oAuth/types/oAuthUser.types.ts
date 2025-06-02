import { Document } from 'mongoose';

export interface IOAuthUser extends Document {
  githubId: string;
  email: string;
  username: string;
  displayName: string;
  profileUrl: string;
  avatarUrl: string;
}
