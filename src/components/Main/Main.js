import { useState } from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import ChatView from 'components/ChatView/ChatView'
import useEffectInitial from 'hooks/useEffectInitial';
import UserChatsView from 'components/UserChatsView/UserChatsView';
import UsersView from 'components/UsersView/UsersView'
import RequestsView from 'components/RequestsView/RequestsView'
import { MainContainer, P } from './MainStyle'

const Main = () => {
    const [webSocketClient, setWebSocketClient] = useState()

    return(
        <MainContainer>
            <Switch>
                <Route path='/searchUsers' render={() => <UsersView />}/>
                <Route path='/searchChat' render={() => <UserChatsView /> }/>
                <Route path='/chat' render={() => <ChatView />}/>
                <Route path='/requests' render={() => <RequestsView />}/>
                <Route path='/home' render={() => <P>Select a chat!</P>}/>
                <Redirect from='/' to='/home'/>
            </Switch>
        </MainContainer>
    )
}

export default Main