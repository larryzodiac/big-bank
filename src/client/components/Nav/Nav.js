/* */
import React, { useState } from 'react';
import {
    Header,
    HeaderName,
    HeaderNavigation,
    HeaderMenu,
    HeaderMenuItem,
    HeaderGlobalBar,
    HeaderGlobalAction,
    HeaderPanel,
    SkipToContent,
    Switcher,
    SwitcherItem,
    SwitcherDivider
} from 'carbon-components-react';
import {
    UserAvatar20
} from '@carbon/icons-react';

function Nav(props) {
    const [panelExpanded, setPanelExpanded] = useState(false);

    const togglePanel = () => setPanelExpanded(!panelExpanded);
    
    return (
        <Header aria-label="Carbon Tutorial">
            <SkipToContent />
            <HeaderName href="/" prefix="Shipyard">
                Big Bank
            </HeaderName>
            {/* <HeaderNavigation aria-label="Carbon Tutorial">
                <HeaderMenuItem href="/repos">Repositories</HeaderMenuItem>
            </HeaderNavigation> */}
            {props.loginStatus ? (
                <React.Fragment>
                    <HeaderGlobalBar>
                        <HeaderGlobalAction aria-label="User Avatar" onClick={togglePanel}>
                            <UserAvatar20 />
                        </HeaderGlobalAction>
                    </HeaderGlobalBar>
                    <HeaderPanel aria-label="Header Panel" expanded={panelExpanded}>
                        <Switcher aria-label="Switcher Container">
                            <li className="Switcher-module--divider--2Eu56">
                                <span>Profile</span>
                            </li>
                            <SwitcherItem aria-label="Link 1" href="#">
                                Account
                            </SwitcherItem>
                            <SwitcherItem href="#" aria-label="Link 2" onClick={props.logout}>
                                Logout
                            </SwitcherItem>
                        </Switcher>
                    </HeaderPanel>
                </React.Fragment>
            ) : (
                <React.Fragment />
            )}
        </Header>
    );
}

export default Nav;