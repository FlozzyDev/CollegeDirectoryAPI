const sessions = new Map<string, { userEmail: string; expires: number }>();

function generateSessionID(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

function removeExpiredSessions(): void {
  for (const [id, session] of sessions) {
    if (session.expires < Date.now()) {
      sessions.delete(id);
    }
  }
}

export function createSession(userEmail: string): string {
  removeExpiredSessions();
  const sessionId = generateSessionID();
  sessions.set(sessionId, {
    userEmail,
    expires: Date.now() + 15 * 60 * 1000,
  });
  return sessionId;
}

export function deleteSession(sessionId: string): void {
  sessions.delete(sessionId);
}

export function getSession(sessionId: string): { userEmail: string } | null {
  removeExpiredSessions();
  const session = sessions.get(sessionId);
  if (!session || session.expires < Date.now()) {
    if (session) deleteSession(sessionId);
    return null;
  }
  return { userEmail: session.userEmail };
}
