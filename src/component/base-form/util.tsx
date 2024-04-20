
export function generateFormItems(shcema: any) {
    const object = shcema.properties
    const res = []
    for (const key in object) {
        if (Object.prototype.hasOwnProperty.call(object, key)) {
            const element = object[key];
            res.push({
                label: key,
                value: element.default
            })
        }
    }
    return res
}