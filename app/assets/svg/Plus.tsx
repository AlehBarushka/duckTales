import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

import {CommonSvgProps} from './types';

const Plus = ({style, size, color}: SvgProps & CommonSvgProps) => (
  <Svg width={size} height={size} fill="none" style={style} viewBox="0 0 20 20">
    <Path
      fill={color}
      d="M10 0c-.597 0-1.081.484-1.081 1.081v7.838H1.081a1.081 1.081 0 1 0 0 2.162h7.838v7.838a1.08 1.08 0 1 0 2.162 0v-7.838h7.838a1.08 1.08 0 1 0 0-2.162h-7.838V1.081A1.08 1.08 0 0 0 10 0Z"
    />
  </Svg>
);

export default Plus;
