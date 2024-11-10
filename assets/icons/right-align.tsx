import * as React from "react"
import Svg, { Path } from "react-native-svg"

function RightAlign(props) {
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
        d="M3.5 4.5h18v2h-18v-2zm4 15h14v2h-14v-2zm-4-5h18v2h-18v-2zm4-5h14v2h-14v-2z"
        fill="#000"
      />
    </Svg>
  )
}

export default RightAlign
