import React from "react";
import './Item.scss';
import { Item as ItemDef, Position } from './types';
import {lerp, lerpColor} from "./lerp";

const priceColor = (valueAlpha: number) => {
    if (valueAlpha < 0.1) {
        return '#FF0000';
    }
    if (valueAlpha < 0.5) {
        return '#FFFF00';
    }
    return '#00ff00';
};

type ItemProps = {
    item: ItemDef;
    position: Position;
    valueAlpha: number; // 0-1 as distance from min to max value of items shown
}

export const Item = ({ item, position, valueAlpha }: ItemProps) => (
    <div
        key={item.name}
        className="stash-tab-wrapper__item item"
        style={{
            top: position.y,
            left: position.x,
            width: position.width,
            height: position.height,
            backgroundImage: `url(${item.icon})`,
        }}
        title={`${item.name} ${item.value} ${item.valueCurrency.alt}`}
        tabIndex={0}
    >
        <div
            className="item__label"
            style={{
                boxShadow: `inset 0px 0px 0px 1px ${priceColor(valueAlpha)}`,
            }}
        >
            <div
                className="item__value"
                style={{
                    fontSize: `${lerp(1.2, 2, valueAlpha)}rem`,
                    fontWeight: lerp(400, 900, valueAlpha),
                }}
            >
                <div>{item.value}</div>
                <img
                    className="item__value__icon"
                    src={item.valueCurrency.src}
                    alt={item.valueCurrency.alt}
                />
            </div>
            <div
                className="item__name"
                style={{
                    color: lerpColor('#337733', '#00FF00', valueAlpha),
                }}
            >
                {item.name}
            </div>
        </div>
    </div>
);