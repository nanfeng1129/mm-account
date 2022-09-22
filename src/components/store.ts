
export const useDate = () => {
    const shortcuts = [
        {
            text: '今天',
            value: new Date(),
        },
        {
            text: '昨天',
            value: () => {
                const date = new Date()
                date.setTime(date.getTime() - 3600 * 1000 * 24)
                return date
            },
        },
        {
            text: '一周前',
            value: () => {
                const date = new Date()
                date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
                return date
            },
        },
    ]

    return {
        shortcuts
    }
}
