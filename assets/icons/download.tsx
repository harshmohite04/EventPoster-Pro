import * as React from "react"
import Svg, { Path } from "react-native-svg"

function Download(props) {
  return (
    <Svg
      width={props.size}
      height={props.size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M12 16l-5-5 1.4-1.45 2.6 2.6V4h2v8.15l2.6-2.6L17 11l-5 5zm-6 4c-.55 0-1.02-.196-1.412-.587A1.93 1.93 0 014 18v-3h2v3h12v-3h2v3c0 .55-.196 1.021-.587 1.413A1.92 1.92 0 0118 20H6z"
        fill="#7F310F"
      />
    </Svg>
  )
}

export default Download
