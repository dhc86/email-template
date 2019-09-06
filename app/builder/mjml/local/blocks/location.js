export default ({ font, color, image, address }) => {
  return `
    <mj-column width="100%">
      <mj-location
        css-class="location"
        color="${font.color || color}"
        padding="0"
        padding-top="10px"
        font-family="${font.family}"
        font-size="${font.size}px"
        font-weight="${font.weight}"
        font-weight="${font.weight}"
        address="${address}"
        img-src="${image}"></mj-location>
    </mj-column>
  `;
};
