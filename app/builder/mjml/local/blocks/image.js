export default ({ align = 'center', image, altTag, width, linkTo }, ngbutils) => {
  return `
    <mj-column>
      <mj-image
        href="${ngbutils.getLink(linkTo)}"
        padding="0"
        width="${width}px"
        alt="${altTag}"
        src="${image}"
        align="${align}"></mj-image>
    </mj-column>
  `;
};
