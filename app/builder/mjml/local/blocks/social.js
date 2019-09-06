export default ({ links, align = 'center', direction }) => {
  return `
    <mj-column>
      <mj-text align="${align}" padding="0" line-height="0" font-size="0" css-class="social ${direction}">
        ${Object.keys(links)
          .map(key => {
            const { active = false, link } = links[key];
            if (!active) return;
            return `
              <a href="${link}" target="_blank">
                <img src="https://em.wlocalhost.org/assets/social/${key}.png" />
              </a>
            `;
          })
          .join('')}
        </mj-text>
    </mj-column>
  `;
};
