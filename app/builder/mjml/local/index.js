import titleBlock from './blocks/title';
import buttonBlock from './blocks/button';
import textBlock from './blocks/text';
import dividerBlock from './blocks/divider';
import imageBlock from './blocks/image';
import imageTextLeftBlock from './blocks/imageTextLeft';
import imageTextRightBlock from './blocks/imageTextRight';
import imageText2x2Block from './blocks/imageText2x2';
import imageText3x2Block from './blocks/imageText3x2';
import socialBlock from './blocks/social';
import locationBlock from './blocks/location';
import navBarBlock from './blocks/navBar';

export default async (
  { emailOptions, elements, newEmailName },
  { $http, ngjs, ngbutils }
) => {
  const { mjmlCompileAdress, mjmlPublicKey, mjmlApplicationId } = ngjs.config;
  const {
    backgroundColor,
    paddingTop,
    paddingRight,
    paddingBottom,
    paddingLeft,
    width = 600,
    direction = 'ltr',
    font
  } = emailOptions;

  if (!mjmlCompileAdress && (!mjmlPublicKey || !mjmlApplicationId)) {
    return Promise.reject(
      "You didn't include compile address for MJML or MJML API keys!"
    );
  }

  const children = new Map([
    ['title', titleBlock],
    ['button', buttonBlock],
    ['divider', dividerBlock],
    ['image', imageBlock],
    ['imageTextRight', imageTextRightBlock],
    ['imageTextLeft', imageTextLeftBlock],
    ['imageText2x2', imageText2x2Block],
    ['imageText3x2', imageText3x2Block],
    ['social', socialBlock],
    ['location', locationBlock],
    ['navBar', navBarBlock],
    ['text', textBlock]
  ]);

  const mjml = `
    <mjml>
      <mj-head>
        <mj-title>${newEmailName}</mj-title>
        <mj-style inline="inline">
          .social.ltr a:not(:last-child) {
            font-size: 0;
            margin-right: 5px;
          }
          .social.rtl a:not(:first-child) {
            font-size: 0;
            margin-right: 5px;
          }
          div { direction: ${direction} }
          .location a { line-height: normal; }
        </mj-style>
        <mj-style>
          @media only screen and (max-width: 480px) {
            .mj-column-per-50 > table > tbody > tr:not(.social)  > td,
            .mj-column-per-33 > table > tbody > tr:not(.social) > td {
              padding-right: 0 !important;
              padding-left: 0 !important;
              width: 100% !important;
              padding-top: 10px !important;
            }
            td[style^="width"] {
              width: 100% !important;
            }
            .title h1 {
              font-size: 1.5em!important;
            }
            .title h4 {
              margin-top: 10px!important;
            }
          }
        </mj-style>
        <mj-attributes>
          <mj-all
            padding="0"
            direction="${direction}"
            font-family="${font.family}"
            font-size="${font.size}px"
            font-weight="${font.weight}"
            color="${font.color}">
          </mj-all>
          <mj-text align="${direction == 'rtl' ? 'right' : 'left'}"></mj-text>
        </mj-attributes>
        ${(process.env.scope == 'demo' &&
          `<mj-preview>This Email Template was created by <b>AngularJS Email Builder!</b></mj-preview>`) ||
          ''}
      </mj-head>
      <mj-body>
        <mj-container background-color="${backgroundColor}" width="${width}">
          <mj-wrapper full-width="full-width"
            padding-top="${paddingTop}"
            padding-right="${paddingRight}"
            padding-bottom="${paddingBottom}"
            padding-left="${paddingLeft}">
            ${elements.map(({ type, defaults }) => {
              const elm = children.get(type);
              if (type === 'navBar') {
                return elm(defaults, ngbutils);
              } else {
                return `<mj-section direction="${direction}"
                        padding="${ngbutils.createPadding(
                          defaults.margin || defaults.padding || [0]
                        )}"
                        background-color="${defaults.backgroundColor}">
                      ${elm({ ...defaults, direction }, ngbutils)}
                    </mj-section>`;
              }
            })}
            ${(process.env.scope === 'demo' &&
              `<mj-section direction="${direction}" padding="10px" background-color="white">
                <mj-column>
                  <mj-divider border-width="1px" border-style="solid" border-color="#cccccc"></mj-divider>
                  <mj-text padding-top="10px" align="center">This Email Template was created by <a href="https://em.wlocalhost.org">AngularJS Email Builder!</a></mj-text>
                </mj-column>
              </mj-section>`) ||
              ''}
          </mj-wrapper>
        </mj-container>
      </mj-body>
    </mjml>
  `;

  const { data } = await (async () => {
    if (mjmlPublicKey && mjmlApplicationId) {
      return $http({
        url: 'https://api.mjml.io/v1/render',
        method: 'POST',
        data: { mjml },
        responseType: 'json',
        headers: {
          Authorization: `Basic ${btoa(
            `${mjmlApplicationId}:${mjmlPublicKey}`
          )}`
        }
      });
    }
    return $http({
      url: mjmlCompileAdress,
      method: 'POST',
      data: { mjml },
      responseType: 'json'
    });
  })();

  return data;
};
