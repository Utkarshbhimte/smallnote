import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

import { NotesWrap } from "../components/NotesWrap"
import { AddNote } from "../components/AddNote"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <div className="container">
      <AddNote />
      <NotesWrap />
    </div>
  </Layout>
)

export default IndexPage
