export default ({ font, align, title, subTitle = '' }) => {
  const column = `
    <mj-column width="100%" css-class="title">
      <mj-text
        color="${font.color}"
        padding="0"
        line-height="normal"
        font-family="${font.family}"
        font-size="${font.size}px"
        font-weight="${font.weight}"
        align="${align}">
          <h1 style="font-size: 2em;margin: 0;font-weight: inherit">${title}</h1>
        </mj-text>
        ${
          subTitle.length
            ? `<mj-text
                color="${font.color}"
                padding="0"
                line-height="normal"
                font-family="${font.family}"
                font-size="${font.size}px"
                font-weight="${font.weight}"
                align="${align}">
                  <h4 style="font-size: inherit;margin-bottom: 0;margin-top: 16px;font-weight: inherit">${subTitle}</h4>
                </mj-text>`
            : ''
        }
    </mj-column>
  `;

  return column;
};
