import * as React from "react"
import Svg, { Path } from "react-native-svg"

function ShareLogo(props) {
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
        d="M17 22a2.893 2.893 0 01-2.125-.875A2.893 2.893 0 0114 19c0-.1.025-.333.075-.7L7.05 14.2A2.973 2.973 0 015 15a2.893 2.893 0 01-2.125-.875A2.893 2.893 0 012 12c0-.833.292-1.542.875-2.125A2.893 2.893 0 015 9a2.964 2.964 0 012.05.8l7.025-4.1a1.682 1.682 0 01-.062-.337A5.333 5.333 0 0114 5c0-.833.292-1.542.875-2.125A2.893 2.893 0 0117 2c.833 0 1.542.292 2.125.875S20 4.167 20 5s-.292 1.542-.875 2.125A2.893 2.893 0 0117 8a2.964 2.964 0 01-2.05-.8l-7.025 4.1c.033.117.054.23.063.338a5.906 5.906 0 010 .725c-.007.11-.028.222-.063.337l7.025 4.1A2.99 2.99 0 0117 16c.833 0 1.542.292 2.125.875S20 18.167 20 19s-.292 1.542-.875 2.125A2.893 2.893 0 0117 22z"
        fill="#FF9A37"
      />
    </Svg>
  )
}

export default ShareLogo
