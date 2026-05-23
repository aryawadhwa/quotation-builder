const STORAGE_KEY = 'windal_quote_store';
/** ~4.5MB — leave headroom under typical 5MB localStorage limits. */
export const PERSIST_SIZE_WARN_BYTES = 4_500_000;

let quotaAlertShown = false;

export function estimateQuotePersistBytes(state) {
  try {
    const payload = {
      state: {
        meta: state.meta,
        client: state.client,
        project: state.project,
        items: state.items,
        totals: state.totals,
      },
      version: 0,
    };
    return new Blob([JSON.stringify(payload)]).size;
  } catch {
    return 0;
  }
}

export function warnIfPersistSizeLarge(state) {
  const bytes = estimateQuotePersistBytes(state);
  if (bytes >= PERSIST_SIZE_WARN_BYTES) {
    console.warn(
      `[Windal Quote Builder] Saved quote data is ~${(bytes / 1_000_000).toFixed(1)}MB. ` +
        'Large technical drawings may exceed browser storage. Remove unused images if save fails.'
    );
  }
  return bytes;
}

export const quotePersistStorage = {
  getItem: (name) => localStorage.getItem(name),
  setItem: (name, value) => {
    if (value.length >= PERSIST_SIZE_WARN_BYTES && !quotaAlertShown) {
      quotaAlertShown = true;
      console.warn(
        `[Windal Quote Builder] Quote data (~${(value.length / 1_000_000).toFixed(1)}MB) is near localStorage limits.`
      );
    }
    try {
      localStorage.setItem(name, value);
    } catch (err) {
      if (err?.name === 'QuotaExceededError' || err?.code === 22) {
        if (!quotaAlertShown) {
          quotaAlertShown = true;
          window.alert(
            'Could not save quote to browser storage (storage full). Remove some technical drawings or export your quote as a .windal file.'
          );
        }
      }
      throw err;
    }
  },
  removeItem: (name) => localStorage.removeItem(name),
};

export { STORAGE_KEY };
