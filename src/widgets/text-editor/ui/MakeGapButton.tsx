import {
  useBlockNoteEditor,
  useComponentsContext,
  useEditorContentOrSelectionChange,
} from '@blocknote/react';
import '@blocknote/mantine/style.css';
import { useState } from 'react';

// Custom Formatting Toolbar Button to toggle blue text & background color.
export function MakeGapButton() {
  const editor = useBlockNoteEditor();

  const Components = useComponentsContext()!;

  // Tracks whether the text & background are both blue.
  const [isSelected, setIsSelected] = useState<boolean>(
    editor.getActiveStyles().backgroundColor === 'yellow' &&
      editor.getSelectedText().startsWith('[') &&
      editor.getSelectedText().endsWith(']')
  );

  // Updates state on content or selection change.
  useEditorContentOrSelectionChange(() => {
    setIsSelected(
      editor.getActiveStyles().backgroundColor === 'yellow' &&
        editor.getSelectedText().startsWith('[') &&
        editor.getSelectedText().endsWith(']')
    );
  }, editor);

  function handleClick() {
    const selectedText = editor.getSelectedText();
    if (!isSelected) {
      editor.insertInlineContent([
        {
          type: 'text',
          text: `[${selectedText.trim()}]`,
          styles: { backgroundColor: 'yellow' },
        },
        {
          type: 'text',
          text: ` `,
          styles: {},
        },
      ]);
    } else {
      editor.removeStyles({ backgroundColor: 'yellow' });
      editor.insertInlineContent([
        {
          type: 'text',
          text: selectedText.slice(1, selectedText.length - 1),
          styles: {},
        },
      ]);
    }

    // editor.toggleStyles({
    //   backgroundColor: 'yellow',
    // });
    console.log(editor.getSelectedText());
  }

  return (
    <Components.FormattingToolbar.Button
      mainTooltip={'Create a gap'}
      secondaryTooltip={"Ctrl + R"}
      onClick={handleClick}
      isSelected={isSelected}
    >
      {isSelected ? `[Remove Gap]` : `[Make Gap]`}
    </Components.FormattingToolbar.Button>
  );
}
