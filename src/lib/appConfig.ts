const requiredEnv = (key: string): string => {
  const value = import.meta.env[key] as string | undefined;
  return value ?? "";
};

export const APP_CONFIG = {
  name: requiredEnv("VITE_APP_NAME") || "DhanDiary",
  version: requiredEnv("VITE_APP_VERSION") || "",
  sizeMb: requiredEnv("VITE_APP_SIZE_MB") || "",
  minAndroid: requiredEnv("VITE_APP_MIN_ANDROID") || "",
  releaseDate: requiredEnv("VITE_APP_RELEASE_DATE") || "",
  downloads: {
    indus: requiredEnv("VITE_DOWNLOAD_INDUS_URL") || "",
    amazon: requiredEnv("VITE_DOWNLOAD_AMAZON_URL") || "",
    apk: requiredEnv("VITE_DOWNLOAD_APK_URL") || "",
    googleDriveApk: requiredEnv("VITE_DOWNLOAD_GOOGLE_DRIVE_APK_URL") || "",
    apkExpiresAt: requiredEnv("VITE_DOWNLOAD_APK_EXPIRES_AT") || "",
    huawei:
      requiredEnv("VITE_DOWNLOAD_HUAWEI_URL") ||
      "https://url.cloud.huawei.com/yMQqh6QrTy",
    oppo: requiredEnv("VITE_DOWNLOAD_OPPO_URL") || "",
    samsung: requiredEnv("VITE_DOWNLOAD_SAMSUNG_URL") || "",
  },
} as const;

const parseDateSafe = (value: string): Date | null => {
  if (!value) return null;
  const timestamp = Date.parse(value);
  if (!Number.isFinite(timestamp)) return null;
  return new Date(timestamp);
};

export const isApkDownloadLinkValid = (now: Date = new Date()): boolean => {
  if (!APP_CONFIG.downloads.apk) return false;

  const expiresAt = parseDateSafe(APP_CONFIG.downloads.apkExpiresAt);
  if (expiresAt) return now.getTime() <= expiresAt.getTime();

  const releaseDate = parseDateSafe(APP_CONFIG.releaseDate);
  if (!releaseDate) return false;

  const thirtyDaysMs = 30 * 24 * 60 * 60 * 1000;
  return now.getTime() - releaseDate.getTime() <= thirtyDaysMs;
};
