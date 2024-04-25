import { keyframes } from "@mui/material";
export const keyframesList = {
  ripple: keyframes`
   0% {
    box-shadow:
      0 0 0 0 rgba(63, 81, 181, 0.3),
      0 0 0 1px rgba(63, 81, 181, 0.3),
      0 0 0 3px rgba(63, 81, 181, 0.3),
      0 0 0 5px rgba(63, 81, 181, 0.3);
  }
  100% {
    box-shadow:
      0 0 0 0 rgba(63, 81, 181, 0.3),
      0 0 0 4px rgba(63, 81, 181, 0.3),
      0 0 0 20px rgba(63, 81, 181, 0),
      0 0 0 30px rgba(63, 81, 181, 0);
  }
    `,
};
export default keyframesList;
