import dynamic from 'next/dynamic';

export const TextEditor = dynamic(() => import('./ui/TextEditor'), {
  ssr: false,
});
