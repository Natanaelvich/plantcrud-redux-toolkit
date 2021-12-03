import React from "react"
import ContentLoader from "react-content-loader"

const MyLoader : React.FC = (props) => (
  <ContentLoader 
    speed={2}
    width={600}
    height={160}
    viewBox="0 0 600 160"
    backgroundColor="#1111"
    foregroundColor="green"
    {...props}
  >
   <rect x="34" y="23" rx="20" ry="20" width="130" height="130" /> 
    <rect x="206" y="23" rx="20" ry="20" width="130" height="130" /> 
    <rect x="376" y="23" rx="20" ry="20" width="130" height="130" />
  </ContentLoader>
)

export default MyLoader