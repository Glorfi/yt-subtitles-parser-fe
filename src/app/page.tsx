import { Header } from '@/widgets/header';
import { ParseVideoFormWidget } from '@/widgets/subtitles';
import { TextEditor } from '@/widgets/text-editor';
import { Box } from '@chakra-ui/react';

export default function Home() {
  return (
    <>
      <Header />
      <main
        style={{
          minHeight: '80vh',
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <ParseVideoFormWidget />
      </main>
    </>
  );
}
