
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const shareContent = async (data: { title: string; text: string; url?: string }) => {
  const url = data.url || window.location.href;
  
  if (navigator.share) {
    try {
      await navigator.share({
        title: data.title,
        text: data.text,
        url: url,
      });
      return true;
    } catch (error) {
      if ((error as any).name !== 'AbortError') {
        console.error('Error sharing:', error);
      }
      return false;
    }
  } else {
    try {
      await navigator.clipboard.writeText(`${data.text}\n\n${url}`);
      alert('Link e detalhes copiados para a área de transferência!');
      return true;
    } catch (error) {
      console.error('Error copying to clipboard:', error);
      return false;
    }
  }
};
