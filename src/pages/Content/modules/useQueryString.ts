import {useCallback, useMemo, useState} from 'react';

const getQueryStringValue = (key: string) =>
    new URLSearchParams(window.location.search).get(key);

const setQueryStringValue = (key: string, value: string) => {
    const params = new URLSearchParams(window.location.search);
    params.set(key, value);
    const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?' + params.toString();
    window.history.pushState({ path: newUrl }, '', newUrl);
}

export const useQueryString = (key: string, defaultValue: string): [string, (arg0: string) => void] => {
    const [value, _setValue] = useState(() => getQueryStringValue(key) || defaultValue);

    const setValue = useCallback((value: string) => {
        setQueryStringValue(key, value.toString());
        _setValue(value);
    }, [key]);

    return [
        value,
        setValue,
    ];
};

export const useQueryStringNumber = (key: string, defaultValue: number): [number, (arg0: number) => void] => {
    const [_value, _setValue] = useQueryString(key, defaultValue.toString());

    const setValue = useCallback((value => _setValue(value.toString())), [_setValue]);
    const value = useMemo(() => parseInt(_value, 10), [_value]);

    return [
        value,
        setValue,
    ];
};
