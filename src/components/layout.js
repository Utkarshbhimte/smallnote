import React from "react"
import PropTypes from "prop-types"
import { ThemeProvider } from "styled-components"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"
import "./layout.css"
import { theme } from "./theme"
import { GlobalStyles } from "./globalStyles"
import { Page } from "./sharedStyled"
import Sidebar from "./Sidebar"
import NoteModal from "./NoteModal"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <ThemeProvider theme={theme}>
      <Sidebar />
      <Page>
        <Header siteTitle={data.site.siteMetadata.title} />
        <main>{children}</main>
      </Page>
      <GlobalStyles />
      <NoteModal />
    </ThemeProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
