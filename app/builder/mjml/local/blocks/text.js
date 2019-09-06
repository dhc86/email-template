export default ({ font, text = '', direction }) => {
  return `
    <mj-column width="100%">
      <mj-text
        align="${direction == 'rtl' ? 'right' : 'left'}"
        padding="0"
        line-height="1.3"
        color="${font.color}"
        font-family="${font.family}"
        font-size="${font.size}px"
        font-weight="${font.weight}">
          ${text}
        </mj-text>
    </mj-column>
  `;
};
