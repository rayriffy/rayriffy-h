export const parseUrl = (input: string) => {
    const matcher = input.match(/https?:\/\/nhentai.net\/g\/(\d+)\/?/)
    if (matcher !== null && Number.isInteger(Number(matcher[1])))
        return Number(matcher[1])
    else
        throw new Error("Cannot parse " + input)
}