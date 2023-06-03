import * as React from 'react';
import Svg, {SvgProps, G, Path, Defs, ClipPath} from 'react-native-svg';

import {CommonSvgProps} from './types';

const Pencil = ({style, size, color}: SvgProps & CommonSvgProps) => (
  <Svg width={size} height={size} fill="none" style={style} viewBox="0 0 16 16">
    <G clipPath="url(#a)">
      <Path
        fill={color}
        d="M0 12.667V16h3.333l9.83-9.83L9.83 2.837 0 12.667Zm15.74-9.074a.885.885 0 0 0 0-1.253L13.66.26a.885.885 0 0 0-1.253 0l-1.626 1.626 3.333 3.333 1.626-1.626Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h16v16H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default Pencil;
