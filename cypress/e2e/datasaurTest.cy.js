describe('CEO Test', () => {
    it('Compares CEO from Wikipedia and SpaceX GraphQL API', () => {
      // Open Wikipedia homepage
      cy.visit('https://en.wikipedia.org/wiki/Main_Page')
      // Search for SpaceX and enter
      cy.get('#searchInput').type('SpaceX{enter}')
      // Get CEO name from Wikipedia
      cy.get(':nth-child(9) > .infobox-data > .plainlist > ul > :nth-child(1)').invoke('text')
        .then((text) => {
          const tempText = text.replace(/[^a-zA-Z0-9 ]/g, '').split("CEO");
          const wikiCEO = tempText[0];
          cy.log(`Wikipedia C-E-O: ${wikiCEO}`)
          // Call GraphQL API
          cy.request({
            method: 'POST',
            url: 'https://api.spacex.land/graphql',
            body: {
              query: `{ company { ceo } }`
            }
          }).then(response => {
            const apiCEO = response.body.data.company.ceo
            cy.log(`GraphQL API CEO: ${apiCEO}`)
            // Compare CEOs
            expect(wikiCEO.toLowerCase()).to.equal(apiCEO.toLowerCase())
          })
        })
    })
  })
  