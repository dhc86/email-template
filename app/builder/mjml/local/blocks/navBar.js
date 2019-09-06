export default (
  { font, color = '#000000', border, align, items, padding, backgroundColor },
  ngbutils
) => {
  return `
    <mj-navbar css-class="navbar" full-width="full-width" vertical-align="middle"
      background-color="${backgroundColor}"
      padding="${ngbutils.createPadding(padding)}"
      border-radius="${border.radius}px"
      border="${border.size}px ${border.style} ${border.color}">
        <mj-column>
          <mj-inline-links
            base-url="${items[0].href}"
            hamburger="hamburger"
            align="${align}"
            ico-color="${font.color || color}">
              ${items
                .map(({ href, title }) => {
                  return `
                  <mj-link
                    href="${href}"
                    padding="15px 10px"
                    color="${font.color || color}"
                    font-family="${font.family}"
                    font-size="${font.size}px"
                    font-weight="${font.weight}"
                    font-weight="${font.weight}">${title}</mj-link>
                `;
                })
                .join('')}
          </mj-inline-links>
        </mj-column>
    </mj-navbar>
  `;
};
