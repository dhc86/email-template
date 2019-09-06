export default (
  {
    align = 'center',
    image1,
    image2,
    altTag1,
    altTag2,
    width1,
    width2,
    linkTo1,
    linkTo2,
    font,
    text1,
    text2,
    direction
  },
  ngbutils
) => {
  return `
    <mj-column>
      <mj-image
      href="${ngbutils.getLink(linkTo1)}"
      padding="0"
      ${(direction === 'rtl' && 'padding-left="5px"') || 'padding-right="5px"'}
      width="${width1}px"
      alt="${altTag1}"
      src="${image1}"
      align="${align}"></mj-image>
      <mj-text
        padding="0"
        ${(direction === 'rtl' && 'padding-left="5px"') ||
          'padding-right="5px"'}
        padding-top="10px"
        line-height="1.3"
        color="${font.color}"
        font-family="${font.family}"
        font-size="${font.size}px"
        font-weight="${font.weight}">
          ${text1}
        </mj-text>
    </mj-column>
    <mj-column>
      <mj-image
      href="${ngbutils.getLink(linkTo2)}"
      padding="0"
      ${(direction === 'rtl' && 'padding-right="5px"') || 'padding-left="5px"'}
      width="${width2}px"
      alt="${altTag2}"
      src="${image2}"
      align="${align}"></mj-image>
      <mj-text
        padding="0"
        ${(direction === 'rtl' && 'padding-right="5px"') ||
          'padding-left="5px"'}
        padding-top="10px"
        line-height="1.3"
        color="${font.color}"
        font-family="${font.family}"
        font-size="${font.size}px"
        font-weight="${font.weight}">
          ${text2}
        </mj-text>
    </mj-column>
  `;
};
