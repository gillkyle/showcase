/** @jsx jsx */
import { jsx } from "theme-ui"
import { graphql } from "gatsby"
import { get } from "lodash"

import Layout from "../components/layout"
const TagTemplate = ({ data }) => {
  console.log(data)
  return <Layout>tag</Layout>
}

export default TagTemplate
