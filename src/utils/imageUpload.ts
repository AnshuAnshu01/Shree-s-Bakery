/**
 * Utility to upload reference cake design photos and enable native sharing.
 */

export async function uploadReferenceImage(file: File): Promise<string | null> {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    const response = await fetch('https://tmpfiles.org/api/v1/upload', {
      method: 'POST',
      body: formData,
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    if (data?.status === 'success' && data?.data?.url) {
      // tmpfiles URL is https://tmpfiles.org/12345/name.ext
      // Direct view/download URL is https://tmpfiles.org/dl/12345/name.ext
      const directUrl = data.data.url.replace('https://tmpfiles.org/', 'https://tmpfiles.org/dl/');
      return directUrl;
    }
  } catch (err) {
    console.warn('Reference image upload failed or timed out:', err);
  }
  return null;
}

export function canShareFiles(file?: File | null): boolean {
  if (!file || typeof navigator === 'undefined' || !navigator.canShare) {
    return false;
  }
  try {
    return navigator.canShare({ files: [file] });
  } catch {
    return false;
  }
}

export async function shareOrderWithFile(orderTitle: string, messageText: string, file: File): Promise<boolean> {
  if (!canShareFiles(file)) {
    return false;
  }

  try {
    await navigator.share({
      title: orderTitle,
      text: messageText,
      files: [file]
    });
    return true;
  } catch (err: any) {
    // AbortError happens when user dismisses the native share sheet
    if (err?.name !== 'AbortError') {
      console.warn('Native share failed:', err);
    }
    return false;
  }
}

export async function copyImageToClipboard(file: File): Promise<boolean> {
  if (typeof navigator === 'undefined' || !navigator.clipboard || !window.ClipboardItem) {
    return false;
  }

  try {
    // If PNG, can copy directly
    if (file.type === 'image/png') {
      await navigator.clipboard.write([
        new ClipboardItem({ 'image/png': file })
      ]);
      return true;
    }

    // Convert JPG/WEBP to PNG Blob for maximum browser clipboard support
    const bitmap = await createImageBitmap(file);
    const canvas = document.createElement('canvas');
    canvas.width = bitmap.width;
    canvas.height = bitmap.height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return false;
    ctx.drawImage(bitmap, 0, 0);

    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, 'image/png')
    );

    if (blob) {
      await navigator.clipboard.write([
        new ClipboardItem({ 'image/png': blob })
      ]);
      return true;
    }
  } catch (err) {
    console.warn('Copying image to clipboard failed:', err);
  }
  return false;
}

