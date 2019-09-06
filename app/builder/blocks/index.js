import { component } from '../main.controller';

import title from './title';
import button from './button';
import text from './text';
import social from './social';
import divider from './divider';
import image from './image';
import navBar from './nav-bar';
import location from './location';
import imageTextRight from './image-text-right';
import imageTextLeft from './image-text-left';
import imageText2x2 from './image-text-2x2';
import imageText3x2 from './image-text-3x2';

component('titleB', title);
component(`buttonB`, button);
component(`textB`, text);
component(`socialB`, social);
component(`dividerB`, divider);
component(`imageB`, image);
component(`navbarB`, navBar);
component(`locationB`, location);
component(`imagetextrightB`, imageTextRight);
component(`imagetextleftB`, imageTextLeft);
component(`imagetext2x2B`, imageText2x2);
component(`imagetext3x2B`, imageText3x2);

export {
  title,
  button,
  text,
  social,
  divider,
  image,
  navBar,
  location,
  imageTextRight,
  imageTextLeft,
  imageText2x2,
  imageText3x2
};
