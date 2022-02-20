import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import './StashTabViewer.scss';
// @ts-ignore
import {Item} from "./Item";
import {Item as ItemDef, Position} from './types';
import { sortBy } from 'naan-utils';
import {StashTabButton, StashTabButtonProps} from "./StashTabButton";
import {useQueryStringNumber} from "./useQueryString";

type StashTabProps = {
    ItemPositionMap: Record<string, Position>;
    tabImage: string;
    items: ItemDef[];
    beforeTableRoot: Element;
    maxHeight: number | string;
    fadeBottom: boolean;
}

const StashTab: React.FC<StashTabProps> = ({ children, ItemPositionMap, tabImage, items, beforeTableRoot, maxHeight, fadeBottom }) => {
    const maxValueItem = items.reduce((result, item) => result.value < item.value ? item : result, { value: 0 } as ItemDef);
    const minValueItem = items.reduce((result, item) => result.value > item.value ? item : result, { value: Infinity } as ItemDef);
    const range = maxValueItem.value - minValueItem.value;

    return ReactDOM.createPortal((
        <>
            <div className="stash-price-summary">
                <span>{minValueItem.value}</span>
                <img
                    className="item__value__icon"
                    src={minValueItem.valueCurrency.src}
                    alt={minValueItem.valueCurrency.alt}
                />
                -
                <span>{maxValueItem.value}</span>
                <img
                    className="item__value__icon"
                    src={maxValueItem.valueCurrency.src}
                    alt={maxValueItem.valueCurrency.alt}
                />
            </div>
            <div>Range: {range}</div>
            <div
                className="stash-tab-wrapper"
                style={{
                    maxHeight,
                    ...(fadeBottom ? {
                        '-webkit-mask-image': '-webkit-gradient(linear, left 85%, left bottom, from(rgba(0,0,0,1)), to(rgba(0,0,0,0)))',
                        'mask-image': 'linear-gradient(to bottom, rgba(0,0,0,1) 85%, rgba(0,0,0,0))',
                    } : {})
                }}
            >
                <img className="stash-tab-wrapper__image" src={tabImage} alt="Stash tab" />
                {items
                    .filter(item => ItemPositionMap[item.name])
                    // .sort(sortBy(item => ItemPositionMap[item.name].y))
                    // .sort(sortBy(item => ItemPositionMap[item.name].x))
                    .map(item => (
                        <Item
                            key={item.name}
                            item={item}
                            position={ItemPositionMap[item.name]}
                            valueAlpha={(item.value - minValueItem.value) / range}
                        />
                    ))}
                {children}
            </div>
        </>
        ),
        beforeTableRoot,
    );
};

type StashTabViewerProps = {
    items: ItemDef[];
    defaultTab: number;
    beforeTableRoot: Element;
    headerRoot: Element;
    tabs: Array<{
        ItemPositionMap: Record<string, Position>;
        tabImage: string;
        maxHeight: number | string;
        fadeBottom: boolean;
        button: StashTabButtonProps;
    }>
}

export const StashTabViewer = ({ tabs, defaultTab, items, beforeTableRoot, headerRoot }: StashTabViewerProps) => {
    const [showStashTab, setShowStashTab] = useState(true);
    const [activeTabIndex, setActiveTabIndex] = useQueryStringNumber('tab', defaultTab);

    const buttons = tabs.map((tab, index) => ({
        ...tab.button,
        onClick: () => setActiveTabIndex(index),
    }));

    const {
        ItemPositionMap,
        tabImage,
        maxHeight,
        fadeBottom,
    } = tabs[activeTabIndex];

    // const unknownItems = items.filter(item => !ItemPositionMap[item.name]).map(item => item.name);
    // if (unknownItems.length) {
    //     console.log('Items missing from ItemPositionMap:', unknownItems);
    // }

    return ReactDOM.createPortal((
            <>
                <button className="stash-tab-show-button" onClick={() => setShowStashTab(x => !x)}>
                    {showStashTab ? 'Hide' : 'Show'} Stash View
                </button>
                {showStashTab && (
                    <StashTab
                        ItemPositionMap={ItemPositionMap}
                        tabImage={tabImage}
                        items={items}
                        beforeTableRoot={beforeTableRoot}
                        maxHeight={maxHeight}
                        fadeBottom={fadeBottom}
                    >
                        {buttons.map((button, index) => (
                            <StashTabButton
                                key={index}
                                {...button}
                                active={false}
                            />
                        ))}
                    </StashTab>
                )}
            </>
        ),
        headerRoot
    );
}
