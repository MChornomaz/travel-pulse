export function sortArrayByPlace(arr: any[]) {
    arr.sort((a, b) => {
        if (a.place.toLowerCase() < b.place.toLowerCase()) {
            return -1;
        } else if (a.place.toLowerCase() > b.place.toLowerCase()) {
            return 1;
        } else {
            return 0;
        }
    });
    return arr;
}

export function sortArrayByPlaceReverse(arr: any[]) {
    arr.sort((a, b) => {
        if (a.place.toLowerCase() < b.place.toLowerCase()) {
            return 1;
        } else if (a.place.toLowerCase() > b.place.toLowerCase()) {
            return -1;
        } else {
            return 0;
        }
    });
    return arr;
}
