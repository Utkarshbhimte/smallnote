import React from "react"
import styled from "styled-components"
import Layout from "../components/layout"
import SEO from "../components/seo"

import { NotesWrap } from "../components/NotesWrap"
import { AddNote } from "../components/AddNote"

const AppGrid = styled.div`
  display: grid;
  justify-content: space-between;
  grid-template-columns: 9rem 1fr min-content;
  grid-gap: 1rem;
  grid-template-areas: "leftSide main rightSide";

  @media (max-width: 600px) {
    grid-template-columns: 1fr minmax(min-content, 90%) 1fr;
  }

  .center-container {
    grid-area: main;
  }
`

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <AppGrid>
      <div className="center-container">
        <AddNote />
        <NotesWrap />
      </div>
    </AppGrid>
  </Layout>
)

export default IndexPage
