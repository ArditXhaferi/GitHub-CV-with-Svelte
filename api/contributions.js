const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
    try {
        let contributions = await githubRequest(
            `https://github-contributions.vercel.app/api/v1/$name$`,
            req.query.username
        );

        res.json(contributions);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Server error");
    }
});

const githubRequest = (url, name) => {
    console.log(name)
    return new Promise((resolve, reject) => {
        fetch(url.replace("$name$", name))
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                let MyDate = new Date();
                let MyDateString;

                MyDateString = MyDate.getFullYear() + '-' + ('0' + (MyDate.getMonth() + 1)).slice(-2) + "-" + ('0' + MyDate.getDate()).slice(-2);

                data.contributions.forEach((contribution, index) => {
                    if (contribution.date == MyDateString) {
                        resolve(data.contributions.slice(index, index + 30))
                    }
                });
            })
            .catch((error) => {
                reject(error);
            });
    });
};

module.exports = router;