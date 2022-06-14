export function setLocalStorage(dataArray) {
    for (let elem in dataArray) {
        localStorage.setItem(`mango_lsit_${elem}`, dataArray[`${elem}`]);
    }
}

export function getLocalStorage(dataArray) {
    let result = [];

    for (let elem of dataArray) {
        result.push(localStorage.getItem(`mango_lsit_${elem}`));
    }

    return result;
}

export function deleteLocalStorage(dataArray) {
    for (let elem of dataArray) {
        localStorage.removeItem(`mango_lsit_${elem}`);
    }
}