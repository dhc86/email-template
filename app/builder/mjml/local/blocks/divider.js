export default ({ padding, border, backgroundColor }) => {
  return `
    <mj-column width="100%">
      <mj-divider
        border-width="${border.size}px"
        border-style="${border.style}"
        border-color="${border.color}"></mj-divider>
    </mj-column>
  `;
};
