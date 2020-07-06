export const getNext = (playlist, audio) => {
    const currentIdx = playlist.map((li) => li._id).indexOf(audio);
    const { _id, title, artists, thumbnail } = playlist[
        currentIdx + 1 === playlist.length ? 0 : currentIdx + 1
    ];

    return {
        id: _id,
        title,
        artists,
        thumbnail,
    };
};

export const getPrev = (playlist, audio) => {
    const currentIdx = playlist.map((li) => li._id).indexOf(audio);
    const { _id, title, artists, thumbnail } = playlist[
        currentIdx === 0 ? playlist.length - 1 : currentIdx - 1
    ];

    return {
        id: _id,
        title,
        artists,
        thumbnail,
    };
};

const generateRandomNotValue = (min, max, value) => {
    const rand = Math.floor(Math.random() * (max - min + 1)) + min;
    if (rand !== value) return rand;
    return generateRandomNotValue(min, max, value);
};

export const getNextRandom = (playlist, audio) => {
    const currentIdx = playlist.map((li) => li._id).indexOf(audio);
    const rnd = generateRandomNotValue(0, playlist.length - 1, currentIdx);
    const { _id, title, artists, thumbnail } = playlist[rnd];

    return {
        id: _id,
        title,
        artists,
        thumbnail,
    };
};
