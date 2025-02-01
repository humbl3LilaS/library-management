export class UploadError extends Error {
    cause?: UploadErrorCause;
    public constructor(
        message?: string,
        options: { cause?: UploadErrorCause } = {}
    ) {
        super(message, options);
        this.cause = options.cause;
    }
}

export interface UploadErrorCause {
    reason: string;
}
