import imageCompression from 'browser-image-compression';

export interface CompressionOptions {
    maxSizeMB?: number;
    maxWidthOrHeight?: number;
    useWebWorker?: boolean;
    fileType?: string;
}

/**
 * Compresses an image file using browser-image-compression
 * @param file The original File object
 * @param options Custom compression options
 * @returns Promise resolving to the compressed File
 */
export async function compressImage(
    file: File,
    options: CompressionOptions = {}
): Promise<File> {
    const defaultOptions: CompressionOptions = {
        maxSizeMB: 1,           // Max file size in MB
        maxWidthOrHeight: 1920, // Max width/height in pixels
        useWebWorker: true,     // Use web worker for better performance
        fileType: "image/webp", // Force WebP conversion
        ...options
    };

    try {
        const compressedFile = await imageCompression(file, defaultOptions as any);

        // Log compression result for debugging
        console.debug(
            `Image compressed: ${file.name}`,
            `\nOriginal: ${(file.size / 1024 / 1024).toFixed(2)} MB`,
            `\nCompressed: ${(compressedFile.size / 1024 / 1024).toFixed(2)} MB`
        );

        return compressedFile;
    } catch (error) {
        console.error('Image compression failed:', error);
        // Fallback to original file if compression fails
        return file;
    }
}
