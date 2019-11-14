/** @jsx jsx */
import { jsx } from "theme-ui"

import Layout from "../components/layout"
const TagTemplate = ({ data }) => {
  console.log(data)
  return <Layout>{data.name}</Layout>
}

export default TagTemplate
