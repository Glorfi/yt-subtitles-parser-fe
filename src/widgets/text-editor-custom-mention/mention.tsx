import { createReactInlineContentSpec } from '@blocknote/react';
import { Input } from '@chakra-ui/react';

// The Mention inline content.
export const Mention = createReactInlineContentSpec(
  {
    type: 'mention',
    propSchema: {
      user: {
        default: 'Unknown',
      },
    },
    content: 'none',
  },
  {
    render: (props) => (
      <Input
        display={'inline-block'}
        // maxW={`calc(${props.inlineContent.props.user.length + 1}ch + 16px)`}
        style={{ backgroundColor: '#8400ff33' }}
        value={props.inlineContent.props.user}
      />
    ),
  }
);
