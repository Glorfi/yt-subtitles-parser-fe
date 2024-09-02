import { Block } from '@blocknote/core';

export const initialBlocks: Block[] = [
  {
    id: '1de2a676-e5e5-4779-8172-f424de06c2b6',
    type: 'paragraph',
    props: {
      textColor: 'default',
      backgroundColor: 'default',
      textAlignment: 'left',
    },
    content: [
      {
        type: 'text',
        text: 'Last night, I went to a restaurant that was completely [',
        styles: {},
      },
      {
        type: 'text',
        text: 'packed',
        styles: {
          bold: true,
        },
      },
      {
        type: 'text',
        text: " / empty / full], but a friend had reserved a table for us. The place usually isn't [deserted] because it's popular. The restaurant [looks out over] the river, which made the view amazing. The [trendy decor] inside added a modern touch, and the [service] was quick and friendly.",
        styles: {},
      },
    ],
    children: [],
  },
  {
    id: '2b22a755-827f-4c63-a8e4-70d9899f80fb',
    type: 'paragraph',
    props: {
      textColor: 'default',
      backgroundColor: 'default',
      textAlignment: 'left',
    },
    content: [
      {
        type: 'text',
        text: 'The food was delicious with [generous portions]. The dishes were beautifully [presented], and the taste was [rich]. They use only [organic] ingredients, and the [home-style cooking] made me feel right at home. I tried some [seafood] dishes, which were very fresh. The atmosphere was [posh], but still comfortable. Overall, it was a great dining experience.',
        styles: {},
      },
    ],
    children: [],
  },
  {
    id: 'c5b1fa12-ab75-4d24-86e3-5be7408ad152',
    type: 'paragraph',
    props: {
      textColor: 'default',
      backgroundColor: 'default',
      textAlignment: 'left',
    },
    content: [],
    children: [],
  },
];

export const mockMarkdown = `Last night, I went to a restaurant that was completely [**packed** / empty / full], but a friend had reserved a table for us. The place usually isn't [deserted] because it's popular. The restaurant [looks out over] the river, which made the view amazing. The [trendy decor] inside added a modern touch, and the [service] was quick and friendly.
\n\nThe food was delicious with [generous portions]. The dishes were beautifully [presented], and the taste was [rich]. They use only [organic] ingredients, and the [home-style cooking] made me feel right at home. I tried some [seafood] dishes, which were very fresh. \n\n The atmosphere was [posh], but still comfortable.  Overall, it was a great dining experience.`;

export const mockMarkdown2 = `Last night, I went to a restaurant that was completely [**packed** / empty / full], but a friend had reserved a table for us. The place usually isn't [deserted] because it's popular. The restaurant [looks out over] the river, which made the view amazing. The [trendy decor] inside added a modern touch, and the [service] was quick and friendly.

1.  The food was delicious with [generous portions].
2.  The dishes were beautifully [presented], and the taste was [rich].
3.  They use only [organic] ingredients, and the [home-style cooking] made me feel right at home.
4.  I tried some [seafood] dishes, which were very fresh.
5.  The atmosphere was [posh], but still comfortable. Overall, it was a great dining experience.`;
