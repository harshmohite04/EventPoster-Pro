import * as React from "react"
import Svg, { Path } from "react-native-svg"

function Swipe(props) {
  return (
    <Svg
      width={props.size}
      height={props.size}
      viewBox="0 0 81 81"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M55.333 69.917a11.022 11.022 0 01-3.873.626c-1.304-.026-2.569-.346-3.793-.96L25.833 59.417l1.5-3.334a7.098 7.098 0 012.334-2.706A6.865 6.865 0 0133 52.167l5.667-.417-9.334-25.583c-.333-.89-.305-1.737.084-2.544.388-.806 1.027-1.375 1.916-1.706.89-.331 1.736-.304 2.54.083.805.387 1.375 1.026 1.71 1.917l8 21.916 3.167-1.166-3.417-9.417c-.333-.889-.305-1.737.084-2.543.389-.807 1.027-1.376 1.916-1.707.89-.331 1.736-.303 2.54.083.805.387 1.375 1.026 1.71 1.917L53 42.417l3.083-1.167-2.25-6.25c-.333-.889-.305-1.736.084-2.54s1.027-1.374 1.916-1.71c.89-.336 1.736-.308 2.54.083.805.391 1.375 1.03 1.71 1.917l2.25 6.25 3.167-1.167c-.333-.889-.306-1.735.083-2.54.39-.804 1.028-1.374 1.917-1.71.889-.335 1.736-.307 2.54.084.804.39 1.374 1.03 1.71 1.916l4.583 12.5c1.278 3.5 1.153 6.904-.376 10.21-1.53 3.307-4.043 5.598-7.54 6.874l-13.084 4.75zm-34.416-22.75a39.925 39.925 0 01-6.5-11.75 39.759 39.759 0 01-2.25-13.25c0-1.5.083-3 .25-4.5.166-1.5.416-3 .75-4.5L7.333 19l-3.5-3.5L15.5 3.833 27.167 15.5l-3.5 3.5-5.417-5.333a27.514 27.514 0 00-.833 4.206 36.68 36.68 0 00-.25 4.294c0 3.889.625 7.653 1.876 11.293A35.412 35.412 0 0024.5 43.58l-3.583 3.587z"
        fill="#FF8017"
      />
    </Svg>
  )
}

export default Swipe