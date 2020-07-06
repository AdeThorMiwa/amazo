export const getDefaults = (tag, close) => {
    const key = new Date().getTime() + Math.random();
    return {
        key,
        action: () => ({
            key,
            value: "OK",
            color: tag,
            onClick: (key) => close(key),
        }),
    };
};

export const getColor = (color) => {
    if (color === "success") return "#53AF50";
    if (color === "info") return "#3C76D2";
    if (color === "warning") return "#FF9800";
    if (color === "error") return "#CB3837";
    return "#fff";
};
