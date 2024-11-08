import * as React from "react"
import Svg, { Path } from "react-native-svg"

function Edit(props) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M0 24v-5.667L17.6.767c.267-.245.561-.434.884-.567.323-.133.661-.2 1.016-.2s.7.067 1.033.2c.335.133.623.333.867.6l1.833 1.867c.267.244.462.533.584.866a2.857 2.857 0 010 2.017 2.467 2.467 0 01-.584.883L5.667 24H0zM19.467 6.4l1.866-1.867-1.866-1.866L17.6 4.533 19.467 6.4z"
        fill="#C74707"
      />
    </Svg>
  )
}

export default Edit
