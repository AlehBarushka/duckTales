import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

import {CommonSvgProps} from './types';

const GearWheel = ({size, style, color}: SvgProps & CommonSvgProps) => (
  <Svg width={size} height={size} fill="none" style={style} viewBox="0 0 24 24">
    <Path
      fill={color}
      d="M21.945 7.835a.923.923 0 0 1-.266 1.009L20.4 9.996c-.32.292-.473.718-.452 1.145.004.119.008.238.008.361s-.004.242-.008.361c-.02.43.128.857.452 1.145l1.28 1.152a.923.923 0 0 1 .266 1.01c-.183.488-.402.955-.655 1.407l-.195.332c-.274.451-.58.878-.916 1.28a.945.945 0 0 1-1.015.279l-1.646-.517c-.414-.131-.862-.045-1.23.189-.204.127-.41.25-.626.357-.386.197-.684.541-.78.96l-.368 1.67a.932.932 0 0 1-.755.73 10.81 10.81 0 0 1-3.523 0 .932.932 0 0 1-.754-.73l-.369-1.67c-.09-.419-.393-.764-.779-.96a8.519 8.519 0 0 1-.626-.357c-.364-.234-.816-.32-1.23-.189l-1.642.521a.952.952 0 0 1-1.015-.279 10.441 10.441 0 0 1-.916-1.28l-.195-.332a10.127 10.127 0 0 1-.655-1.407.923.923 0 0 1 .266-1.01l1.28-1.152c.32-.292.473-.718.452-1.145a10.25 10.25 0 0 1-.008-.36c0-.124.004-.243.008-.362.02-.43-.128-.857-.452-1.144l-1.28-1.157a.923.923 0 0 1-.266-1.01c.183-.488.402-.955.655-1.407l.195-.332c.274-.451.58-.878.916-1.28a.945.945 0 0 1 1.015-.279l1.646.517c.414.131.862.045 1.23-.189.204-.127.41-.25.626-.356.386-.197.684-.542.78-.96l.368-1.67a.932.932 0 0 1 .755-.73C10.813 1.049 11.4 1 12.002 1s1.19.05 1.761.144a.932.932 0 0 1 .755.73l.369 1.67c.09.418.39.763.779.96.215.11.422.23.626.356.364.234.816.316 1.23.189l1.646-.517a.952.952 0 0 1 1.015.28c.336.401.643.828.916 1.279l.195.332c.253.452.472.92.655 1.407l-.004.005Zm-9.943 6.949c.88 0 1.723-.346 2.345-.961.621-.616.97-1.45.97-2.32 0-.871-.349-1.706-.97-2.322a3.333 3.333 0 0 0-2.345-.96c-.88 0-1.723.345-2.344.96a3.265 3.265 0 0 0-.971 2.321c0 .87.349 1.705.97 2.32a3.333 3.333 0 0 0 2.345.962Z"
    />
  </Svg>
);

export default GearWheel;
