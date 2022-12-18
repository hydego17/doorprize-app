import { compressAccurately } from 'image-conversion';

const MAX_UPLOAD_SIZE = 0.3 * 1024 ** 2; // 500 KB (in byte)

const COMPRESS_TARGET_SIZE = 0.3 * 1024; // 500 KB (in kb)

const MAX_DIMENSION = 4000; // (px)

const getHeightAndWidthFromDataUrl = (dataURL) =>
  new Promise<{ height: number; width: number }>((resolve) => {
    const img = new Image();
    img.onload = () => {
      resolve({
        height: img.height,
        width: img.width,
      });
    };
    img.src = dataURL;
  });

/**
 * Handle image compression
 */
export async function compressImage(files: File, maxSize?: number, targetSize?: number): Promise<Blob>;
export async function compressImage(files: File[], maxSize?: number, targetSize?: number): Promise<Blob[]>;
export async function compressImage(
  files: File | File[],
  maxSize = MAX_UPLOAD_SIZE,
  targetSize = COMPRESS_TARGET_SIZE
): Promise<Blob | Blob[]> {
  // Compress handler
  const compress = async (originalFile: File): Promise<Blob> => {
    const shouldCompress = !!(originalFile && originalFile.size) && originalFile.size > maxSize;

    if (shouldCompress) {
      // Check file dimension, (if its too large we should scale it down)
      const fileAsDataURL = window.URL.createObjectURL(originalFile);
      const { width, height } = await getHeightAndWidthFromDataUrl(fileAsDataURL);
      const isLargeDimension = width > MAX_DIMENSION || height > MAX_DIMENSION;

      return compressAccurately(originalFile, {
        size: targetSize,
        accuracy: 0.95,
        type: originalFile.type as any,
        scale: isLargeDimension ? 0.75 : 1,
      })
        .then(async (result) => {
          let compressedFile = new File([result], originalFile.name, { type: originalFile.type });
          return compressedFile;
        })
        .catch((err) => {
          console.log('Compression Error: ', err);
          return originalFile;
        });
    }

    return originalFile;
  };

  // Handle Multiple Files
  if (files instanceof Array) {
    const compressedFiles = await Promise.all(files.map(compress));
    return compressedFiles;
  }

  // Handle Single File
  const compressedFile = await compress(files);
  return compressedFile;
}
