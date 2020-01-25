import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
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
