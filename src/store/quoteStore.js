import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { company } from '../config/company';
import { normalizeDiscountType, normalizeGstType } from '../utils/calculateTotals';
import { inferGstType } from '../utils/inferGstType';
import { getNextQuoteNumber } from '../utils/quoteNumber';
import { quotePersistStorage, warnIfPersistSizeLarge } from '../utils/persistStorage';

export const defaultMeta = {
  quoteNo: 'WIN-QT-2026-001',
  date: new Date().toLocaleDateString('en-IN'),
  validUntil: new Date(Date.now() + company.defaults.quoteValidityDays * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN'),
  preparedBy: company.defaults.preparedBy,
};

export const defaultClient = {
  name: 'Ajay Verma',
  address: 'Sector 4, Gomti Nagar',
  city: 'Lucknow, Uttar Pradesh — 226010',
  contact: '+91 98765 43210  ·  ajay@example.com',
};

export const defaultProject = {
  name: 'Ocean View Penthouse',
  address: 'Palm Beach Road, Navi Mumbai',
  architect: 'Studio Design',
  refNo: 'SD-2026-001',
};

export const defaultItems = [
  {
    id: Date.now(),
    code: 'W-01',
    system: 'Aluminium Slim Sliding Window',
    type: '3 Track - 2 Glass + 1 SS Mesh · All Sliding',
    dimension: 'W 2743 mm x H 1676 mm',
    width: '2743',
    height: '1676',
    area: '49.48',
    location: 'Master Bedroom',
    glazing: '8 mm Clear Toughened Glass',
    profile: 'AluK · Powder Coat . Graphite Grey',
    hardware: 'dormakaba Single Point Flush Handle (Black)',
    track: '',
    qty: 2,
    rate: 1210,
    imageBlob: null,
  },
];

export const defaultTotals = {
  discountType: 'amount',
  discount: 0,
  logistics: 10000,
  installation: 12500,
  applyGst: true,
  gstType: 'cgst_sgst',
  globalMarkup: 0,
  autoGstType: true,
};

function normalizePersistedTotals(totals) {
  if (!totals) return defaultTotals;
  const markup = parseFloat(totals.globalMarkup);
  return {
    ...defaultTotals,
    ...totals,
    discountType: normalizeDiscountType(totals.discountType),
    applyGst: totals.applyGst !== false,
    gstType: normalizeGstType(totals.gstType),
    globalMarkup: Number.isFinite(markup) ? Math.min(100, Math.max(0, markup)) : 0,
    autoGstType: totals.autoGstType !== false,
  };
}

function maybeSyncGstType(state, set) {
  if (state.totals.autoGstType === false) return;
  const next = inferGstType(state.client, state.project);
  if (next !== state.totals.gstType) {
    set({ totals: { ...state.totals, gstType: next } });
  }
}

export const useQuoteStore = create(
  persist(
    (set, get) => ({
      meta: defaultMeta,
      client: defaultClient,
      project: defaultProject,
      items: defaultItems,
      totals: defaultTotals,
      savedTemplates: [],
      showClientRates: true,
      expandedItems: { 0: true },
      cropModalData: null,

      setMeta: (newMeta) => set((state) => ({ meta: { ...state.meta, ...newMeta } })),

      setClient: (newClient) =>
        set((state) => {
          const next = { client: { ...state.client, ...newClient } };
          queueMicrotask(() => maybeSyncGstType({ ...get(), ...next }, set));
          return next;
        }),

      setProject: (newProject) =>
        set((state) => {
          const next = { project: { ...state.project, ...newProject } };
          queueMicrotask(() => maybeSyncGstType({ ...get(), ...next }, set));
          return next;
        }),

      setTotals: (newTotals) =>
        set((state) => ({
          totals: {
            ...state.totals,
            ...newTotals,
            ...(newTotals.discountType != null
              ? { discountType: normalizeDiscountType(newTotals.discountType) }
              : {}),
            ...(newTotals.gstType != null && newTotals.autoGstType === undefined
              ? { autoGstType: false }
              : {}),
            ...(newTotals.gstType != null
              ? { gstType: normalizeGstType(newTotals.gstType) }
              : {}),
          },
        })),

      setShowClientRates: (showClientRates) => set({ showClientRates }),

      assignNextQuoteNumber: () =>
        set((state) => ({ meta: { ...state.meta, quoteNo: getNextQuoteNumber() } })),

      applyQuotePayload: ({ meta, client, project, items, totals }) =>
        set((state) => {
          const next = {
            ...(meta ? { meta: { ...state.meta, ...meta } } : {}),
            ...(client ? { client: { ...state.client, ...client } } : {}),
            ...(project ? { project: { ...state.project, ...project } } : {}),
            ...(items ? { items } : {}),
            ...(totals ? { totals: normalizePersistedTotals(totals) } : {}),
          };
          if (items) warnIfPersistSizeLarge({ ...get(), ...next });
          queueMicrotask(() => maybeSyncGstType({ ...get(), ...next }, set));
          return next;
        }),

      setItems: (newItems) => {
        set({ items: newItems });
        warnIfPersistSizeLarge(get());
      },

      addItem: () =>
        set((state) => {
          const newItem = { ...state.items[state.items.length - 1], id: Date.now(), imageBlob: null };
          return {
            items: [...state.items, newItem],
            expandedItems: { ...state.expandedItems, [state.items.length]: true },
          };
        }),

      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),

      updateItem: (index, field, value) =>
        set((state) => {
          const newItems = [...state.items];
          newItems[index] = { ...newItems[index], [field]: value };
          if (field === 'imageBlob' && value) {
            queueMicrotask(() => warnIfPersistSizeLarge({ ...get(), items: newItems }));
          }
          return { items: newItems };
        }),

      toggleItemExpanded: (index) =>
        set((state) => ({
          expandedItems: { ...state.expandedItems, [index]: !state.expandedItems[index] },
        })),

      setCropModalData: (data) => set({ cropModalData: data }),

      saveTemplate: (name) => {
        const state = get();
        const label = (name || '').trim() || `Template ${new Date().toLocaleString('en-IN')}`;
        const entry = {
          id: Date.now(),
          name: label,
          savedAt: new Date().toISOString(),
          payload: {
            meta: state.meta,
            client: state.client,
            project: state.project,
            items: state.items.map((item) => ({ ...item, imageBlob: null })),
            totals: state.totals,
          },
        };
        set({ savedTemplates: [entry, ...state.savedTemplates].slice(0, 20) });
        return entry;
      },

      loadTemplate: (id) => {
        const entry = get().savedTemplates.find((t) => t.id === id);
        if (!entry) return false;
        get().applyQuotePayload(entry.payload);
        return true;
      },

      deleteTemplate: (id) =>
        set((state) => ({
          savedTemplates: state.savedTemplates.filter((t) => t.id !== id),
        })),

      clearAll: () =>
        set({
          meta: {
            ...defaultMeta,
            quoteNo: getNextQuoteNumber(),
            date: new Date().toLocaleDateString('en-IN'),
            validUntil: new Date(
              Date.now() + company.defaults.quoteValidityDays * 24 * 60 * 60 * 1000
            ).toLocaleDateString('en-IN'),
          },
          client: defaultClient,
          project: defaultProject,
          items: defaultItems,
          totals: defaultTotals,
          expandedItems: { 0: true },
        }),
    }),
    {
      name: 'windal_quote_store',
      storage: quotePersistStorage,
      partialize: (state) => ({
        meta: state.meta,
        client: state.client,
        project: state.project,
        items: state.items,
        totals: state.totals,
        savedTemplates: state.savedTemplates,
        showClientRates: state.showClientRates,
      }),
      merge: (persisted, current) => {
        if (!persisted) return current;
        return {
          ...current,
          ...persisted,
          totals: normalizePersistedTotals(persisted.totals),
          savedTemplates: Array.isArray(persisted.savedTemplates) ? persisted.savedTemplates : [],
          showClientRates: persisted.showClientRates !== false,
        };
      },
    }
  )
);
