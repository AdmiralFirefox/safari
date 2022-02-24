@declare module "redux-persist/lib/storage"

declare namespace NodeJS {
    export interface ProcessEnv {
        NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: string;
        STRIPE_SECRET_KEY: string;
    }
}