import { InteractiveExerciseRenderer } from '@/entities/text/ui/InteractiveExerciseRenderer';
import { Header } from '@/widgets/header';
import { ParseVideoFormWidget } from '@/widgets/subtitles';
import { TextEditor } from '@/widgets/text-editor';
import TextEditor2 from '@/widgets/text-editor-custom-mention/textEditor2';
import {
  initialBlocks,
  mockMarkdown,
  mockMarkdown2,
} from '@/widgets/text-editor/ui/mockBlocks';
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
        <TextEditor
          htmlString={`<p>In the office, the atmosphere is often [**exciting**/excited/excitedly]. Yesterday, I had a meeting with my team, and it was really [**interesting**/interest/interestingly] to hear everyone's ideas. Some of my colleagues were [**amazing**/amaze/amazed] with their suggestions.</p> <p>After the meeting, I felt [**motivated**/motivate/motivating] to start the new project. My boss gave us [**challenging**/challenge/challenged] tasks, which made me think harder about my work. I was also [**surprised**/surprise/surprising] by how much I learned from everyone.</p> <p>Later in the week, I went to a training session. It was [**boring**/bored/bores] at first, but the trainer was really [**engaging**/engage/engaged]. She had a way of making complex topics [**understandable**/understand/understands]. By the end of the session, I felt [**excited**/exciting/excite] to apply what I had learned.</p> <p>Some days can be [**frustrating**/frustrate/frustrated] when things do not go as planned. I remember one time when we had a software issue that left everyone [**annoyed**/annoy/annoying]. But we managed to fix it quickly, and the team was [**relieved**/relieve/relieving] once we solved the problem.</p> <p>Overall, I find working here to be [**rewarding**/reward/rewards]. The challenges are [**exciting**/excite/excited], and I feel [**satisfied**/satisfy/satisfying] with my progress. I look forward to learning more and growing in my career!</p>`}
        />
      </main>
    </>
  );
}
