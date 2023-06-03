import * as React from 'react';
import Svg, {SvgProps, G, Path, Defs, ClipPath} from 'react-native-svg';

import {CommonSvgProps} from './types';

const Trash = ({style, color, size}: SvgProps & CommonSvgProps) => (
  <Svg width={size} height={size} fill="none" style={style} viewBox="0 0 16 16">
    <G clipPath="url(#a)">
      <Path
        fill={color}
        d="M4 1.6A1.6 1.6 0 0 1 5.6 0h4.8A1.6 1.6 0 0 1 12 1.6v1.6h3.2a.8.8 0 0 1 0 1.6h-.855l-.694 9.714A1.6 1.6 0 0 1 12.055 16h-8.11a1.6 1.6 0 0 1-1.596-1.486L1.655 4.8H.8a.8.8 0 0 1 0-1.6H4V1.6Zm1.6 1.6h4.8V1.6H5.6v1.6ZM3.26 4.8l.685 9.6h8.11l.686-9.6H3.259ZM6.4 6.4a.8.8 0 0 1 .8.8V12a.8.8 0 0 1-1.6 0V7.2a.8.8 0 0 1 .8-.8Zm3.2 0a.8.8 0 0 1 .8.8V12a.8.8 0 0 1-1.6 0V7.2a.8.8 0 0 1 .8-.8Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h16v16H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);

export default Trash;
