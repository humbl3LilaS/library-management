export class IAuthError extends Error {
    cause?: AuthErrorCause;

    public constructor(message?: string, options: { cause?: AuthErrorCause } = {}) {
        super(message, options);
        this.cause = options.cause;
    }
}

export interface AuthErrorCause {
    reason: string;
    field?: string[];
}
