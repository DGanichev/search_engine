const data = require("../constants/mock_data.json")

class SearchService {
    search(search, take, skip) {
        const start = skip;
        const end = skip + take;
        const searchLowerCase = search.toLowerCase();
        const matchedData = Array.from(data).filter(item => {
            const {title} = item;
            const titleLowerCase = title.toLowerCase();
            return titleLowerCase.includes(searchLowerCase);
        });
        const results = matchedData.slice(start, end);
        return {
            results: results,
            metadata: {
                total: matchedData.length,
                skip: start,
                take: take,
            }
        };
    }
}

module.exports = SearchService;