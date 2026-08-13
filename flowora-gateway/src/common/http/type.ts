type HeaderValues = {
    'Content-Type': 'application/json' | 'application/x-www-form-urlencoded'
    Authorization: `Bearer ${string}`
    Accept: 'application/json' | 'application/xml'
}

export type HeaderEntry = {
    [K in keyof HeaderValues]: [K, HeaderValues[K]]
}[keyof HeaderValues];
