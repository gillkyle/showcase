/** @jsx jsx */
import { jsx } from "theme-ui"

import Layout from "../components/layout"
const TagTemplate = ({ pageContext: { name: tagName } }) => {
  return <Layout>{tagName}</Layout>
}

export default TagTemplate
