import styled from "styled-components"

export const Page = styled.div`
  min-height: 300vh;
  background: ${props => props.theme.background};
  color: ${props => props.theme.primaryText};

  span.secondary {
    color: ${props => props.theme.secondaryText};
  }
`
