import { Destination, StoryShort, DestinationInfo, Review } from '../types/types';

type ObjectWithId = Destination | StoryShort | DestinationInfo | Review;

export function mergeArrays<T extends ObjectWithId>(...arrays: T[][]): T[] {
    const mergedArr = arrays.flat();
    const uniqueArr = mergedArr.filter((item, index) => {
        const ids = mergedArr.map((el) => el.id);
        return ids.indexOf(item.id) === index;
    });
    return uniqueArr;
}
