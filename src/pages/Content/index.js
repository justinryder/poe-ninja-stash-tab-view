import React, {useState} from 'react';
import { render } from 'react-dom';
import { StashTabViewer } from './modules/StashTabViewer';
import {FossilPositionMap} from "./modules/FossilPositionMap";
import FossilTabImage from '../../assets/img/Tab_Fossil.png';
import {EssencePositionMap} from "./modules/EssencePositionMap";
import EssenceTabImage from '../../assets/img/Tab_Essence.png';
import {ScarabPositionMap} from "./modules/ScarabPositionMap";
import ScarabTabImage from '../../assets/img/Tab_Scarab.png';
import {FragmentPositionMap} from "./modules/FragmentPositionMap";
import FragmentTabImage from '../../assets/img/Tab_Fragments.png';
import {BreachPositionMap} from "./modules/BreachPositionMap";
import BreachTabImage from '../../assets/img/Tab_Breach.png';
import TabButtonBreachActive from '../../assets/img/Tab_Button_Breach_Active.png';
import TabButtonBreachInactive from '../../assets/img/Tab_Button_Breach_Inactive.png';
import TabButtonGeneralActive from '../../assets/img/Tab_Button_General_Active.png';
import TabButtonGeneralInactive from '../../assets/img/Tab_Button_General_Inactive.png';
import TabButtonScarabActive from '../../assets/img/Tab_Button_Scarab_Active.png';
import TabButtonScarabInactive from '../../assets/img/Tab_Button_Scarab_Inactive.png';

const TableSelector = '.item-overview table, main table';
const HeaderSelector = '.item-overview h1, main h1';

const _init = ({
    tabs,
    defaultTab = 0,
    getIcon = ([col1]) => col1?.querySelector('img')?.getAttribute('src') ?? '',
    getName = ([col1]) => col1?.querySelector('a > span')?.innerText ?? '',
    getValue = ([col1, col2]) => parseFloat(col2?.querySelector('span')?.innerText),
    getCurrencySrc = ([col1, col2]) => col2?.querySelector('img')?.getAttribute('src') ?? '',
    getCurrencyAlt = ([col1, col2]) => col2?.querySelector('img')?.getAttribute('alt') ?? ''
} = {}) => {
    const root = document.createElement('div');
    root.className = 'poe-ninja-stash-tab-view';
    document.body.appendChild(root);

    const table = document.querySelector(TableSelector);
    // console.log('table', table);

    const beforeTableRoot = document.createElement('div');
    beforeTableRoot.className = 'before-table';
    // @ts-ignore
    table.before(beforeTableRoot);

    // @ts-ignore
    const rows = table.querySelectorAll('tbody tr');
    // console.log('rows', rows);

    // @ts-ignore
    const items = [...rows]
        .map(row => [...row.querySelectorAll('td')])
        .map((columns) => {
        return {
            icon: getIcon(columns),
            name: getName(columns),
            value: getValue(columns),
            valueCurrency: {
                src: getCurrencySrc(columns),
                alt: getCurrencyAlt(columns),
            }
        };
    });
    // console.log('items', items);

    const itemHeader = document.querySelector(HeaderSelector);
    const headerWrapper = document.createElement('div');
    headerWrapper.className = 'header-wrapper';
    // @ts-ignore
    itemHeader.replaceWith(headerWrapper);
    // @ts-ignore
    headerWrapper.appendChild(itemHeader);

    const headerRoot = document.createElement('div');
    headerWrapper.appendChild(headerRoot);

    render((
            <StashTabViewer
                tabs={tabs}
                defaultTab={defaultTab}
                items={items}
                beforeTableRoot={beforeTableRoot}
                headerRoot={headerRoot}
            />
        ),
        root
    );

    if (module.hot) module.hot.accept();
};

const loadFullTable = (finish) => {
    const buttons = [...document.querySelectorAll('.item-overview button')];
    const showMoreButton = buttons.find(button => button.innerText?.includes('Show more'));
    if (showMoreButton) {
        showMoreButton.click();
        setTimeout(() => loadFullTable(finish), 100);
        return;
    }
    finish();
}

const FragmentsGeneralButton = {
    title: 'General',
    x: 117,
    y: 10,
    width: 187,
    height: 45,
    backgroundActive: chrome.runtime.getURL(TabButtonGeneralActive),
    backgroundInactive: chrome.runtime.getURL(TabButtonGeneralInactive),
    href: '/challenge/fragments?tab=0',
};

const FragmentsBreachButton = {
    title: 'Breach',
    x: 327,
    y: 11,
    width: 185,
    height: 44,
    backgroundActive: chrome.runtime.getURL(TabButtonBreachActive),
    backgroundInactive: chrome.runtime.getURL(TabButtonBreachInactive),
    href: '/challenge/fragments?tab=1',
};

const FragmentsScarabButton = {
    title: 'Scarab',
    x: 536,
    y: 11,
    width: 185,
    height: 43,
    backgroundActive: chrome.runtime.getURL(TabButtonScarabActive),
    backgroundInactive: chrome.runtime.getURL(TabButtonScarabInactive),
    href: '/challenge/scarabs?tab=2',
}

const init = () => loadFullTable(() => {
    switch (window.location.pathname) {
        case '/challenge/fossils':
            _init({
                tabs: [{
                    ItemPositionMap: FossilPositionMap,
                    tabImage: chrome.runtime.getURL(FossilTabImage),
                    maxHeight: 500,
                    fadeBottom: true,
                }],
            });
            break;
        case '/challenge/essences':
            _init({
                tabs: [{
                    ItemPositionMap: EssencePositionMap,
                    tabImage: chrome.runtime.getURL(EssenceTabImage),
                    maxHeight: null,
                    fadeBottom: false,
                }],
                getValue: ([col1, col2, col3]) => parseFloat(col3?.querySelector('span')?.innerText),
                getCurrencySrc: ([col1, col2, col3]) => col3?.querySelector('img')?.getAttribute('src') ?? '',
                getCurrencyAlt: ([col1, col2, col3]) => col3?.querySelector('img')?.getAttribute('alt') ?? '',
            });
            break;
        case '/challenge/scarabs':
            _init({
                tabs:[{
                    button: FragmentsGeneralButton,
                    ItemPositionMap: FragmentPositionMap,
                    tabImage: chrome.runtime.getURL(FragmentTabImage),
                    maxHeight: null,
                    fadeBottom: false,
                },{
                    button: FragmentsBreachButton,
                    ItemPositionMap: BreachPositionMap,
                    tabImage: chrome.runtime.getURL(BreachTabImage),
                    maxHeight: null,
                    fadeBottom: false,
                },{
                    button: FragmentsScarabButton,
                    ItemPositionMap: ScarabPositionMap,
                    tabImage: chrome.runtime.getURL(ScarabTabImage),
                    maxHeight: null,
                    fadeBottom: false,
                }],
                defaultTab: 2,
            });
            break;
        case '/challenge/fragments':
            _init({
                tabs:[{
                    button: FragmentsGeneralButton,
                    ItemPositionMap: FragmentPositionMap,
                    tabImage: chrome.runtime.getURL(FragmentTabImage),
                    maxHeight: null,
                    fadeBottom: false,
                },{
                    button: FragmentsBreachButton,
                    ItemPositionMap: BreachPositionMap,
                    tabImage: chrome.runtime.getURL(BreachTabImage),
                    maxHeight: null,
                    fadeBottom: false,
                },{
                    button: FragmentsScarabButton,
                    ItemPositionMap: ScarabPositionMap,
                    tabImage: chrome.runtime.getURL(ScarabTabImage),
                    maxHeight: null,
                    fadeBottom: false,
                }],
                defaultTab: 0,
            });
            break;
    }
});

let initialized = false;

if (document.querySelector(TableSelector)) {
    init();
    initialized = true;
} else {
    const observer = new MutationObserver((mutations) => {
        for (let mutation in mutations) {
            for (let node in mutation.addedNodes) {
                if (node.matches(TableSelector) && !initialized) {
                    init();
                    initialized = true;
                    break;
                }
            }
            if (initialized) {
                break;
            }
        }
    });
    observer.observe(document.body, {
        childList: true
    });
}
