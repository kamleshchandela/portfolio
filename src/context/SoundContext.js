import { createContext, useContext } from 'react';

// Global Sound Context — lets any component check if sound is enabled
export const SoundContext = createContext({ muted: true });

export const useSoundEnabled = () => useContext(SoundContext);
