describe('Note App', () => {
    it('front page can be opened', () => {
        cy.visit('http://localhost:3000/');
        cy.contains('Notes');
        cy.contains('GET and POST are the most important methods of HTTP protocol');
    });

    it('front page contains random test', function() {
        cy.visit('http://localhost:3000/');
        cy.contains('wth is this app?')
    })
})