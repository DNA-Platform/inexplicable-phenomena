// SAVING STATE IN THE BROWSER. The library is served as files and there is no
// server to keep anything, so what a reader leaves behind has to stay on their
// own machine. Everything the app remembers goes through here, so the backing
// store is one line to change and no caller knows which one it is.
//
// It is localStorage rather than document.cookie: same place, same reader, no
// size limit, and nothing needlessly attached to every request. Doug said
// cookies; this is that instruction with a better drawer behind the same door.

const shelf = `inexplicable-phenomena${import.meta.env.BASE_URL}`;

const store = (): Storage | undefined => {
    try {
        return window.localStorage;
    } catch {
        return undefined;
    }
};

export const remember = <T,>(key: string, value: T): void => {
    const kept = store();
    if (!kept) return;
    try {
        kept.setItem(`${shelf}:${key}`, JSON.stringify(value));
    } catch {
        // A full or unavailable store is not an error a reader should meet.
    }
};

export const recall = <T,>(key: string): T | undefined => {
    const kept = store();
    if (!kept) return undefined;
    try {
        const written = kept.getItem(`${shelf}:${key}`);
        return written === null ? undefined : JSON.parse(written) as T;
    } catch {
        return undefined;
    }
};

export const forget = (key: string): void => {
    store()?.removeItem(`${shelf}:${key}`);
};
