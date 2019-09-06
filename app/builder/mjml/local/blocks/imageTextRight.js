export default (
  { align = 'center', image, altTag, width, linkTo, font, text, direction },
  ngbutils
) => {
  return `
    <mj-column>
      <mj-image
        href="${ngbutils.getLink(linkTo)}"
        padding="0"
        ${(direction === 'rtl' && 'padding-left="5px"') ||
          'padding-right="5px"'}
        width="${width}px"
        alt="${altTag}"
        src="${image}"
        align="${align}"></mj-image>
    </mj-column>
    <mj-column>
      <mj-text
        padding="0"
        line-height="1.3"
        ${(direction === 'rtl' && 'padding-right="5px"') ||
          'padding-left="5px"'}
        color="${font.color}"
        font-family="${font.family}"
        font-size="${font.size}px"
        font-weight="${font.weight}">
          ${text}
        </mj-text>
    </mj-column>
  `;
};
