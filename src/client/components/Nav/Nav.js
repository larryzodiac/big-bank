/* */
import React, { useState } from 'react';
import {
    Header,
    HeaderName,
    HeaderNavigation,
    HeaderMenu,
    HeaderMenuButton,
    HeaderSideNavItems,
    HeaderMenuItem,
    HeaderGlobalBar,
    HeaderGlobalAction,
    HeaderPanel,
    SideNav,
    SideNavItems,
    SkipToContent,
    Switcher,
    SwitcherItem,
    SwitcherDivider
} from 'carbon-components-react';
import {
    UserAvatar20
} from '@carbon/icons-react';

function Nav(props) {
    const [isRightPanelExpanded, setIsRightPanelExpanded] = useState(false);
    const [isSideNavExpanded, setIsSideNavExpanded] = useState(false);

    const togglePanel = () => setIsRightPanelExpanded(!isRightPanelExpanded);
    const toggleNav = () => setIsSideNavExpanded(!isSideNavExpanded);
    
    return (
        <Header aria-label="Carbon Tutorial">
            <SkipToContent />
            <HeaderMenuButton
                aria-label="Open menu"
                onClick={toggleNav}
                isActive={isSideNavExpanded}
            />
            <HeaderName href="/" prefix="Shipyard">
                Big Bank
            </HeaderName>
            {/* <HeaderNavigation aria-label="Carbon Tutorial">
                <HeaderMenuItem href="/repos">Repositories</HeaderMenuItem>
            </HeaderNavigation> */}
            {props.loginStatus ? (
                <React.Fragment>
                    <HeaderNavigation aria-label="IBM [Platform]">
                        <HeaderMenuItem isCurrentPage href="/dashboard">Dashboard</HeaderMenuItem>
                        <HeaderMenuItem href="#">Market</HeaderMenuItem>
                        <HeaderMenuItem href="#">Forex</HeaderMenuItem>
                        <HeaderMenuItem href="#">Crypto</HeaderMenuItem>
                    </HeaderNavigation>
                    <SideNav
                        aria-label="Side navigation"
                        expanded={isSideNavExpanded}
                        isPersistent={false}
                    >
                        <SideNavItems>
                            <HeaderSideNavItems>
                            <HeaderMenuItem href="/dashboard">Dashboard</HeaderMenuItem>
                            <HeaderMenuItem href="#">Market</HeaderMenuItem>
                            <HeaderMenuItem href="#">Forex</HeaderMenuItem>
                            <HeaderMenuItem href="#">Crypto</HeaderMenuItem>
                            </HeaderSideNavItems>
                        </SideNavItems>
                    </SideNav>
                    <HeaderGlobalBar>
                        <HeaderGlobalAction aria-label="User Avatar" onClick={togglePanel}>
                            <UserAvatar20 />
                        </HeaderGlobalAction>
                    </HeaderGlobalBar>
                    <HeaderPanel aria-label="Header Panel" expanded={isRightPanelExpanded}>
                        <Switcher aria-label="Switcher Container">
                            <li className="Switcher-module--divider--2Eu56">
                                <span>Profile</span>
                            </li>
                            <SwitcherItem aria-label="Link 1" href="#">
                                Account
                            </SwitcherItem>
                            <SwitcherItem href="#" aria-label="Link 2" onClick={()=>{ props.logout(); togglePanel() }}>
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