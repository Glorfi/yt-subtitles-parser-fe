'use client';
import { mockText, mockText2 } from '@/shared/mockdata/mockText';
import '@blocknote/core/fonts/inter.css';
import { BlockNoteView } from '@blocknote/mantine';
import '@blocknote/mantine/style.css';
import {
  BasicTextStyleButton,
  BlockTypeSelect,
  ColorStyleButton,
  CreateLinkButton,
  FileCaptionButton,
  FileReplaceButton,
  FormattingToolbar,
  FormattingToolbarController,
  NestBlockButton,
  TextAlignButton,
  UnnestBlockButton,
  useCreateBlockNote,
} from '@blocknote/react';
import { useEffect } from 'react';

interface ITextEditorProps {
  htmlString: string;
}

export default function TextEditor(props: ITextEditorProps) {
  const { htmlString } = props;

  const editor = useCreateBlockNote({});

  useEffect(() => {
    async function loadInitialHTML() {
      const blocks = await editor.tryParseHTMLToBlocks(htmlString);
      editor.replaceBlocks(editor.document, blocks);
    }
    loadInitialHTML();
  }, [htmlString]);

  return (
    <BlockNoteView editor={editor} formattingToolbar={false} sideMenu={false}>
      <FormattingToolbarController
        formattingToolbar={() => (
          <FormattingToolbar>
            <BlockTypeSelect key={'blockTypeSelect'} />

            <TextAlignButton
              textAlignment={'left'}
              key={'textAlignLeftButton'}
            />
            <TextAlignButton
              textAlignment={'center'}
              key={'textAlignCenterButton'}
            />
            <TextAlignButton
              textAlignment={'right'}
              key={'textAlignRightButton'}
            />

            <ColorStyleButton key={'colorStyleButton'} />

            <NestBlockButton key={'nestBlockButton'} />
            <UnnestBlockButton key={'unnestBlockButton'} />

            {/* <CreateLinkButton key={'createLinkButton'} /> */}
          </FormattingToolbar>
        )}
      />
    </BlockNoteView>
  );
}
