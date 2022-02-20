import React from 'react';
import { render } from 'react-dom';
import { StashTabViewer } from './modules/StashTabViewer';
import {FossilPositionMap} from "./modules/FossilPositionMap";
import FossilTabImage from '../../assets/img/Tab_Fossil.png';
import {EssencePositionMap} from "./modules/EssencePositionMap";
import EssenceTabImage from '../../assets/img/Tab_Essence.png';
import {ScarabPositionMap} from "./modules/ScarabPositionMap";
import ScarabTabImage from '../../assets/img/Tab_Scarab.png';

const _init = ({
    ItemPositionMap,
    tabImage,
    maxHeight,
    fadeBottom,
    getIcon = ([col1]) => col1?.querySelector('img')?.getAttribute('src') ?? '',
    getName = ([col1]) => col1?.querySelector('a > span')?.innerText ?? '',
    getValue = ([col1, col2]) => parseFloat(col2?.querySelector('span')?.innerText),
    getCurrencySrc = ([col1, col2]) => col2?.querySelector('img')?.getAttribute('src') ?? '',
    getCurrencyAlt = ([col1, col2]) => col2?.querySelector('img')?.getAttribute('alt') ?? ''
} = {}) => {
    const root = document.createElement('div');
    root.className = 'poe-ninja-stash-tab-view';
    document.body.appendChild(root);

    const table = document.querySelector('.item-overview table');
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

    const itemHeader = document.querySelector('.item-overview h1');
    const headerWrapper = document.createElement('div');
    headerWrapper.className = 'header-wrapper';
    // @ts-ignore
    itemHeader.replaceWith(headerWrapper);
    // @ts-ignore
    headerWrapper.appendChild(itemHeader);

    const headerRoot = document.createElement('div');
    headerWrapper.appendChild(headerRoot);

    const unknownItems = items.filter(item => !ItemPositionMap[item.name]).map(item => item.name);
    if (unknownItems.length) {
        console.log('Items missing from ItemPositionMap:', unknownItems);
    }

    render((
            <StashTabViewer
                ItemPositionMap={ItemPositionMap}
                tabImage={tabImage}
                maxHeight={maxHeight}
                fadeBottom={fadeBottom}
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

const init = () => loadFullTable(() => {
    switch (window.location.pathname) {
        case '/challenge/fossils':
            _init({
                ItemPositionMap: FossilPositionMap,
                tabImage: chrome.runtime.getURL(FossilTabImage),
                maxHeight: 500,
                fadeBottom: true,
            });
            break;
        case '/challenge/essences':
            _init({
                ItemPositionMap: EssencePositionMap,
                tabImage: chrome.runtime.getURL(EssenceTabImage),
                maxHeight: null,
                fadeBottom: false,
                getValue: ([col1, col2, col3]) => parseFloat(col3?.querySelector('span')?.innerText),
                getCurrencySrc: ([col1, col2, col3]) => col3?.querySelector('img')?.getAttribute('src') ?? '',
                getCurrencyAlt: ([col1, col2, col3]) => col3?.querySelector('img')?.getAttribute('alt') ?? '',
            });
            break;
        case '/challenge/scarabs':
            _init({
                ItemPositionMap: ScarabPositionMap,
                tabImage: chrome.runtime.getURL(ScarabTabImage),
                maxHeight: null,
                fadeBottom: false,
            });
    }
});

let initialized = false;

if (document.querySelector('.item-overview table')) {
    init();
    initialized = true;
} else {
    const observer = new MutationObserver((mutations) => {
        for (let mutation in mutations) {
            for (let node in mutation.addedNodes) {
                if (node.matches('.item-overview table') && !initialized) {
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
