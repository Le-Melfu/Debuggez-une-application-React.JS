import { fireEvent, render, screen } from '@testing-library/react'
import Page from './index'
import EventList from '../../containers/Events'
import EventCard from '../../components/EventCard'

describe('When Form is created', () => {
    it('a list of fields card is displayed', async () => {
        render(<Page />)
        await screen.findByText('Email')
        await screen.findByText('Nom')
        await screen.findByText('Prénom')
        await screen.findByText('Personel / Entreprise')
    })

    describe('and a click is triggered on the submit button', () => {
        it('the success message is displayed', async () => {
            render(<Page />)
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
        render(<Page />)
        const staff = [
            'Samira',
            'Jean-baptiste',
            'Alice',
            'Luís',
            'Christine',
            'Isabelle',
        ]
        screen.findAllByText(staff)
    })
    it('a footer is displayed', () => {
        const { container } = render(<Page />)
        const footer = container.querySelector('footer')
        expect(footer).toBeInTheDocument()
    })
    it('an event card, with the last event, is displayed', () => {
        const events = [
            {
                id: 1,
                type: 'conférence',
                date: '2022-04-29T20:28:45.744Z',
                title: 'User&product MixUsers',
                cover: '/images/alexandre-pellaes-6vAjp0pscX0-unsplash.png',
                description: 'Présentation des nouveaux usages UX.',
                nb_guesses: 900,
                periode: '14-15-16 Avril',
                prestations: [
                    '1 espace d’exposition',
                    '1 scéne principale',
                    '1 espace de restaurations',
                ],
            },
            {
                id: 2,
                type: 'expérience digitale',
                date: '2022-01-29T20:28:45.744Z',
                title: '#DigitonPARIS',
                cover: '/images/charlesdeluvio-wn7dOzUh3Rs-unsplash.png',
                description:
                    'Présentation des outils analytics aux professionnels du secteur ',
                nb_guesses: 1300,
                periode: '24-25-26 Février',
                prestations: [
                    '1 espace d’exposition',
                    '1 scéne principale',
                    '1 site web dédié',
                ],
            },
            {
                id: 3,
                type: 'conférence',
                date: '2022-03-29T20:28:45.744Z',
                title: 'Conférence &co-responsable',
                cover: '/images/chuttersnap-Q_KdjKxntH8-unsplash.png',
                description:
                    'Débats et échanges autour des collaborations eco-responsable.',
                nb_guesses: 600,
                periode: '24-25-26 Février',
                prestations: [
                    '1 scéne principale',
                    '1 espaces de restaurations',
                    '1 site web dédié',
                ],
            },
        ]
        const lastEvent = events[events.length - 1]
        const { container } = render(
            <EventCard
                imageSrc={lastEvent?.cover ? lastEvent.cover : '../../logo.svg'}
                title={lastEvent?.title ? lastEvent.title : 'Indisponible'}
                date={new Date(lastEvent?.date)}
                small
                label="boom"
            />
        )
        const eventCardTitle = container.querySelector('.EventCard__title')
        expect(eventCardTitle.textContent).toBe('Conférence &co-responsable')
    })
})
