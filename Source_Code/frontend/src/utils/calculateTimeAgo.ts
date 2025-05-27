function calculateTimeAgo(time?: Date, timeDetail?: boolean) {
    let timeAgo = "1h";

    if (time) {
        const currentTime = new Date().getTime();
        const postTime = new Date(time).getTime();
        const diffTime = currentTime - postTime;
        const diffTimeInHours = diffTime / (1000 * 60 * 60);

        if (diffTimeInHours < 1) {
            timeAgo = `${Math.floor(diffTime / (1000 * 60))}m`;
        } else if (diffTimeInHours < 24) {
            timeAgo = `${Math.floor(diffTimeInHours)}h`;
        } else {
            timeAgo = `${Math.floor(diffTimeInHours / 24)}d`;
        }
    } else {
        timeAgo = "long time ago";
    }

    if (timeDetail) {
        const justTime = timeAgo.split(" ").pop();

        if (timeAgo[timeAgo.length - 1] === "m") {
            if (Number(justTime) == 1) {
                timeAgo = timeAgo.replace("m", " minute");
            } else {
                timeAgo = timeAgo.replace("m", " minutes");
            }
        } else if (timeAgo[timeAgo.length - 1] === "h") {
            if (Number(justTime) == 1) {
                timeAgo = timeAgo.replace("h", " hour");
            } else {
                timeAgo = timeAgo.replace("h", " hours");
            }
        } else if (timeAgo[timeAgo.length - 1] === "d") {
            if (Number(justTime) == 1) {
                timeAgo = timeAgo.replace("d", " day");
            } else {
                timeAgo = timeAgo.replace("d", " days");
            }
        }
    }

    return timeAgo;
}

export default calculateTimeAgo;
