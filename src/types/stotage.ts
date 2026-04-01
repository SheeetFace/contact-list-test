import type { STORAGE_KEYS } from "../constants/storage";

export type StorageKey = typeof STORAGE_KEYS[keyof typeof STORAGE_KEYS];