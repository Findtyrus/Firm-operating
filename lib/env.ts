function getEnvVar(key: string, fallback?: string): string {
  const value = process.env[key];
  if (!value && !fallback) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value || fallback || "";
}

export const env = {
  database: {
    url: getEnvVar("DATABASE_URL"),
    directUrl: getEnvVar("DIRECT_URL"),
  },
  clerk: {
    publishableKey: getEnvVar("NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY"),
    secretKey: getEnvVar("CLERK_SECRET_KEY"),
  },
  supabase: {
    url: getEnvVar("NEXT_PUBLIC_SUPABASE_URL"),
    anonKey: getEnvVar("NEXT_PUBLIC_SUPABASE_ANON_KEY"),
    serviceRoleKey: getEnvVar("SUPABASE_SERVICE_ROLE_KEY", ""),
  },
  nodeEnv: process.env.NODE_ENV || "development",
  isProduction: process.env.NODE_ENV === "production",
};

export function validateEnvironment() {
  const required = [
    "DATABASE_URL",
    "DIRECT_URL",
    "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY",
    "CLERK_SECRET_KEY",
    "NEXT_PUBLIC_SUPABASE_URL",
    "NEXT_PUBLIC_SUPABASE_ANON_KEY",
  ];

  const missing = required.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(", ")}\n` +
      "Please check your .env file and ensure all required variables are set."
    );
  }
}
