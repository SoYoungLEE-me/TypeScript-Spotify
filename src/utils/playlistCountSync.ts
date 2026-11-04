const STORAGE_KEY = "pending-playlist-counts";
const CHANGE_EVENT = "playlist-count-changed";
const EXPIRE_MS = 2 * 60 * 1000;

type PendingCount = {
  total: number;
  expiresAt: number;
};

type PendingCounts = Record<string, PendingCount>;

const makeKey = (userId: string, playlistId: string) =>
  `${userId}:${playlistId}`;

const readCounts = (): PendingCounts => {
  try {
    return JSON.parse(
      sessionStorage.getItem(STORAGE_KEY) ?? "{}"
    ) as PendingCounts;
  } catch {
    return {};
  }
};

const notify = () => {
  window.dispatchEvent(new Event(CHANGE_EVENT));
};

export const subscribePendingCounts = (callback: () => void) => {
  window.addEventListener(CHANGE_EVENT, callback);
  return () => {
    window.removeEventListener(CHANGE_EVENT, callback);
  };
};

export const getPendingCount = (
  userId: string,
  playlistId: string
): number | null => {
  const pending = readCounts()[makeKey(userId, playlistId)];

  if (!pending || pending.expiresAt <= Date.now()) {
    return null;
  }

  return pending.total;
};

export const hasPendingCounts = (userId?: string) => {
  if (!userId) return false;

  return Object.entries(readCounts()).some(
    ([key, value]) =>
      key.startsWith(`${userId}:`) && value.expiresAt > Date.now()
  );
};

export const savePendingCount = (
  userId: string,
  playlistId: string,
  total: number
) => {
  const counts = readCounts();

  counts[makeKey(userId, playlistId)] = {
    total,
    expiresAt: Date.now() + EXPIRE_MS,
  };

  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(counts));
  notify();
};

export const confirmPendingCount = (
  userId: string,
  playlistId: string,
  serverTotal: number
) => {
  const counts = readCounts();
  const key = makeKey(userId, playlistId);
  const pending = counts[key];

  if (!pending) return;

  if (serverTotal >= pending.total || pending.expiresAt <= Date.now()) {
    delete counts[key];
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(counts));
    notify();
  }
};
