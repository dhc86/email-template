export default (
  {
    align = 'left',
    border,
    buttonBackgroundColor,
    font,
    fullWidth,
    padding,
    url,
    buttonText = ''
  },
  ngbutils
) => {
  return `
    <mj-column width="100%">
      <mj-button
        border="${border.size}px ${border.style} ${border.color}"
        border-radius="${border.radius}px"
        background-color="${buttonBackgroundColor}"
        ${fullWidth ? 'width="100%"' : ''}
        inner-padding="${ngbutils.createPadding(padding)}"
        href="${url}"
        color="${font.color}"
        font-family="${font.family}"
        font-size="${font.size}px"
        font-weight="${font.weight}"
        align="${align}">
          ${buttonText}
        </mj-button>
    </mj-column>
  `;
};
