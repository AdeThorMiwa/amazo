const mongoose = require("mongoose");

module.exports = () => {
    let DB;

    if (process.env.NODE_ENV === "development") {
        DB = process.env.DATABASE_LOCAL;
    } else {
        DB = process.env.DATABASE.replace(
            "<PASSWORD>",
            process.env.DATABASE_PASSWORD
        );
    }

    mongoose
        .connect(DB, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true,
        })
        .then(() => console.log("DB Connected Successfully!"));
};
