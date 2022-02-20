import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import './StashTabViewer.scss';
// @ts-ignore
import {Item} from "./Item";
import {Item as ItemDef, Position} from './types';
import { sortBy } from 'naan-utils';

type StashTabProps = {
    ItemPositionMap: Record<string, Position>;
    tabImage: string;
    items: ItemDef[];
    beforeTableRoot: Element;
    maxHeight: number | string;
    fadeBottom: boolean;
}

const StashTab = ({ ItemPositionMap, tabImage, items, beforeTableRoot, maxHeight, fadeBottom }: StashTabProps) => {
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
            </div>
        </>
        ),
        beforeTableRoot,
    );
};

type FossilTabProps = {
    ItemPositionMap: Record<string, Position>;
    tabImage: string;
    items: ItemDef[];
    beforeTableRoot: Element;
    headerRoot: Element;
    maxHeight: number | string;
    fadeBottom: boolean;
}

export const StashTabViewer = ({ ItemPositionMap, tabImage, items, beforeTableRoot, headerRoot, maxHeight, fadeBottom }: FossilTabProps) => {
    const [showStashTab, setShowStashTab] = useState(true);

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
                    />
                )}
            </>
        ),
        headerRoot
    );
}
