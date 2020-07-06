class APIFeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }

    filter() {
        const queryObj = { ...this.queryString };
        const excludedFields = ["page", "sort", "limit", "fields"];
        excludedFields.forEach((el) => delete queryObj[el]);

        // OR filter
        let orObj = {};
        for (let obj in queryObj) {
            if (
                typeof queryObj[obj] === "object" &&
                queryObj[obj].hasOwnProperty("or")
            ) {
                const getValueWithType = (val) => {
                    if (typeof (val * 1) === "number" && val.length > 16)
                        return val.trim();
                    if (val === "null") return null;
                    if (val === "undefined") return undefined;
                    if (typeof (val * 1) === "number") return val * 1;

                    return val.trim();
                };

                orObj["$or"] = queryObj[obj]["or"]
                    .split(",")
                    .map((val) => ({ [obj]: getValueWithType(val) }));
                delete queryObj[obj];
            }
        }

        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(
            /\b(gte|gt|lte|lt|ne|eq)\b/g,
            (match) => `$${match}`
        );

        this.query = this.query.find(JSON.parse(queryStr)).or(orObj);

        return this;
    }

    sort() {
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(",").join(" ");
            this.query = this.query.sort(sortBy);
        } else {
            this.query = this.query.sort("-createdAt");
        }

        return this;
    }

    limitFields() {
        if (this.queryString.fields) {
            const fields = this.queryString.fields.split(",").join(" ");
            this.query = this.query.select(fields);
        } else {
            this.query = this.query.select("-__v");
        }

        return this;
    }

    paginate() {
        const page = this.queryString.page * 1 || 1;
        const limit = this.queryString.limit * 1 || 100;
        const skip = (page - 1) * limit;

        this.query = this.query.skip(skip).limit(limit);

        return this;
    }
}
module.exports = APIFeatures;
