export const STRIKEBUTTON = [
  {
    id: 'button',
    tegName: 'button',
    attributes: {
      class: 'button',
    },
    domTreeLevel: 0,
  },
  {
    id: 'spanCount',
    tegName: 'span',
    attributes: {
      class: 'button__count',
    },
    domTreeLevel: 1,
    parent: 'button',
  },
  {
    id: 'spanText',
    tegName: 'span',
    attributes: {
      class: 'button__text',
    },
    domTreeLevel: 1,
    parent: 'button',
  }
];