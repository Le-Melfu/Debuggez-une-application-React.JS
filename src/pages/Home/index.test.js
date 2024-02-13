import { fireEvent, render, screen } from '@testing-library/react'
import Home from './index'
import EventList from '../../containers/Events'

describe('When Form is created', () => {
    it('a list of fields card is displayed', async () => {
        render(<Home />)
        await screen.findByText('Email')
        await screen.findByText('Nom')
        await screen.findByText('Prénom')
        await screen.findByText('Personel / Entreprise')
    })

    describe('and a click is triggered on the submit button', () => {
        it('the success message is displayed', async () => {
            render(<Home />)
            fireEvent(
                await screen.findByText('Envoyer'),
                new MouseEvent('click', {
                    cancelable: true,
                    bubbles: true,
                })
            )
            await screen.findByText('En cours')
            await screen.findByText('Message envoyé !')
        })
    })
})

describe('When a page is created', () => {
    it('a list of events is displayed', () => {
        render(<EventList />)
        screen.findByText('User&product MixUsers')
        screen.findByText('#DigitonPARIS')
        screen.findByText('Conférence &co-responsable')
    })

    it('a list a people is displayed', () => {
        render(<Home />)
        screen.findByText('Samira')
        screen.findByText('Jean-baptiste')
        screen.findByText('Alice')
        screen.findByText('Luís')
        screen.findByText('Christine')
        screen.findByText('Isabelle')
    })
    it('a footer is displayed', () => {
        const { container } = render(<Home />)
        const footer = container.querySelector('footer')
        expect(footer).toBeInTheDocument()
    })
    it('an event card, with the last event, is displayed', () => {
        const { container, getByText } = render(<Home />)
        const footer = container.querySelector('footer')
        const eventCard = footer.querySelector('.EventCard')
        const lastEventTitle = 'Notre derniére prestation'

        expect(eventCard).toBeInTheDocument()
        expect(getByText(lastEventTitle)).toBeInTheDocument()
    })
})
