import * as React from "react"
import Svg, { Path } from "react-native-svg"

function Upload(props) {
  return (
    <Svg
      width={props.size}
      height={props.size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M14 24V7.7l-5.2 5.2L6 10 16 0l10 10-2.8 2.9L18 7.7V24h-4zM4 32c-1.1 0-2.041-.391-2.824-1.174C.393 30.043.001 29.101 0 28v-6h4v6h24v-6h4v6c0 1.1-.391 2.042-1.174 2.826-.783.784-1.725 1.175-2.826 1.174H4z"
        fill="#C74707"
      />
    </Svg>
  )
}

export default Upload
