import * as React from "react"
import Svg, { Path } from "react-native-svg"

function CenterAlign(props) {
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
        d="M3.5 3.5h18v2h-18v-2zm4 4h10v2h-10v-2zm-4 4h18v2h-18v-2zm4 4h10v2h-10v-2zm-4 4h18v2h-18v-2z"
        fill="#000"
      />
    </Svg>
  )
}

export default CenterAlign
