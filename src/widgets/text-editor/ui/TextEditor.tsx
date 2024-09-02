'use client';
import './texteditor.css';
import {
  Block,
  BlockNoteSchema,
  defaultBlockSpecs,
  StyledText,
  StyleSchema,
} from '@blocknote/core';
import '@blocknote/core/fonts/inter.css';
import { BlockNoteView } from '@blocknote/mantine';
import '@blocknote/mantine/style.css';
import {
  BasicTextStyleButton,
  BlockTypeSelect,
  blockTypeSelectItems,
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
import { useEffect, useState } from 'react';
import { initialBlocks } from './mockBlocks';
import { InteractiveExerciseRenderer } from '@/entities/text/ui/InteractiveExerciseRenderer';
import { MakeGapButton } from './MakeGapButton';
import { HStack } from '@chakra-ui/react';

export interface TextBlock {
  type: string;
  text: string;
  styles: Styles;
}

export interface Styles {}

interface ITextEditorProps {
  htmlString: string;
}

type PartialText = {
  type: 'text';
  content: StyledText<StyleSchema>[];
  href: string;
};

type PartialInlineContent =
  | string
  | (string | PartialText | StyledText<StyleSchema>)[];

export default function TextEditor(props: ITextEditorProps) {
  const { htmlString } = props;
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [markdown, setMarkdown] = useState<string>('');
  const [htmlOutString, setHtmloutstring] = useState<string>('');

  const newBlockSpecs = () => {
    let newSpecs = { ...defaultBlockSpecs }; // Create a shallow copy to avoid mutating the original object
    delete (newSpecs as Partial<typeof newSpecs>).checkListItem;
    return newSpecs;
  };
  const schema = BlockNoteSchema.create({
    blockSpecs: {
      // Adds all default blocks.
      ...newBlockSpecs(),
      // Adds the Alert block.
    },
  });

  const editor = useCreateBlockNote({ schema });

  function makeBoldTextBlocks(content: any[]) {
    return content.map((paragraph: any) => {
      if (paragraph.type === 'paragraph' && paragraph.content.length > 0) {
        const updatedContent: any = [];

        paragraph.content.forEach((block: any) => {
          const textBlocks = block.text.split(/(\*\*[^\*]+\*\*)/g);

          textBlocks.forEach((textBlock: string) => {
            if (textBlock.startsWith('**') && textBlock.endsWith('**')) {
              updatedContent.push({
                type: 'text',
                text: textBlock.slice(2, -2), // Remove '**' from both sides
                styles: { ...block.styles, bold: true }, // Merge existing styles with bold
              });
            } else {
              updatedContent.push({
                type: 'text',
                text: textBlock,
                styles: block.styles, // Preserve existing styles
              });
            }
          });
        });

        return {
          ...paragraph,
          content: updatedContent,
        };
      }
      return paragraph;
    });
  }

  function highlightTextBlocks(content: Block[]) {
    return content.map((paragraph: any) => {
      if (paragraph.type === 'paragraph' && paragraph.content.length > 0) {
        const updatedContent: any = [];
        const textBlocks = paragraph.content[0].text.split(/(\[[^\]]+\])/g);

        textBlocks.forEach((block: any, index: number) => {
          if (block.startsWith('[') && block.endsWith(']')) {
            updatedContent.push({
              type: 'text',
              text: block,
              styles: {
                backgroundColor: 'yellow',
              },
            });
          } else if (block) {
            updatedContent.push({
              type: 'text',
              text: block,
              styles: {},
            });
          }
        });

        return {
          ...paragraph,
          content: updatedContent,
        };
      }
      return paragraph;
    });
  }

  useEffect(() => {
    async function loadInitialHTML() {
      const blocks = await editor.tryParseHTMLToBlocks(htmlString);
      console.log(blocks);

      const updatedBlocks = highlightTextBlocks(blocks);
      const boldBlocks = makeBoldTextBlocks(updatedBlocks);

      editor.replaceBlocks(editor.document, boldBlocks);
    }
    loadInitialHTML();
    makeHTML(blocks);

    //  editor.replaceBlocks(editor.document, initialBlocks);
  }, [htmlString]);

  // const makeMarkdown = async (blocks: Block[]) => {
  //   const markdown = await editor.blocksToMarkdownLossy(blocks);
  //   setHtmloutstring(markdown);
  // };

  const makeHTML = async (blocks: Block[]) => {
    const html = await editor.blocksToHTMLLossy(blocks)
    setHtmloutstring(html);
  };
  useEffect(() => {
    // const textBlocks = blocks.flatMap(
    //   (item) => item.content as StyledText<StyleSchema>[]
    // );
    // const textString = textBlocks.map((item) => item.text).join('');
    // console.log(blocks);
    //makeMarkdown(blocks);

    //const stringText = text.map((item) => item.)
    makeHTML(blocks)
  }, [blocks]);

  // useEffect(() => {
  //   console.log(markdown);
  // }, [markdown]);

  useEffect(() => {
    console.log(htmlOutString);
  }, [htmlOutString]);

  return (
    <HStack w={'100%'} alignItems={"flex-start"}>
      <BlockNoteView
        editor={editor}
        formattingToolbar={false}
        sideMenu={false}
        slashMenu={false}
        onChange={() => {
          setBlocks(editor.document);
          //   makeMarkdown(editor.document);
          // highlightTextBlocks(editor.document);
          makeHTML(blocks);
        }}
        data-theming-css-demo
      >
        <FormattingToolbarController
          formattingToolbar={() => (
            <FormattingToolbar
              blockTypeSelectItems={[
                ...blockTypeSelectItems(editor.dictionary),
              ]}
            >
              <BlockTypeSelect key={'blockTypeSelect'} />
              <BasicTextStyleButton
                basicTextStyle={'bold'}
                key={'boldStyleButton'}
              />
              <MakeGapButton key={'customButton'} />
            </FormattingToolbar>
          )}
        />
      </BlockNoteView>
      <InteractiveExerciseRenderer html={htmlOutString} />
    </HStack>
  );
}
