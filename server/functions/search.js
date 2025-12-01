import yts from "yt-search";

export async function searchOnYoutube(item, pages = 0) {
    const searchCleaned = item.trim();

    const result = await yts({
        query: searchCleaned,
        pages
    })

    return result;
}