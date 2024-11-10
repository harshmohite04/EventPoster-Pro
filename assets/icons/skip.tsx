import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SkipLogo(props) {
  return (
    <Svg
      width={props.size*1.04}
      height={props.size}
      viewBox="0 0 26 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M13 .167C6.19.167.667 5.687.667 12.5.667 19.313 6.19 24.833 13 24.833c6.812 0 12.333-5.52 12.333-12.333C25.333 5.687 19.813.167 13 .167zm0 3c1.85 0 3.572.548 5.024 1.48L5.147 17.524a9.26 9.26 0 01-1.48-5.024c0-5.146 4.187-9.333 9.333-9.333zm0 18.666a9.27 9.27 0 01-5.024-1.48L20.852 7.476a9.26 9.26 0 011.48 5.024c0 5.146-4.186 9.333-9.332 9.333z"
        fill="#000"
      />
    </Svg>
  )
}

export default SkipLogo
