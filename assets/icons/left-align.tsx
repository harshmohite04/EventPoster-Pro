import * as React from "react"
import Svg, { Path } from "react-native-svg"

function LeftAlign(props) {
  return (
    <Svg
      width={props.size}
      height={props.size}
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M4.5 5.5h13M4.5 10.5h10M4.5 15.5h16M4.5 20.5h13"
        stroke="#000"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default LeftAlign
