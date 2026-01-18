export const getItem = (key: string) => {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : null
}

export const setItem = (key: string, value: string | number | boolean | object | Array<unknown>) => {
    const stringifiedValue = JSON.stringify(value)
    localStorage.setItem(key, stringifiedValue)
}

export const removeItem = (key: string) => {
    localStorage.removeItem(key)
}