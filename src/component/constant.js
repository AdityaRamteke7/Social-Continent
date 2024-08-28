export const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    // const now = new Date();
    // const differenceInTime = now - date;
    // const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));


    // let formattedDate = differenceInDays > 0 ? `${differenceInDays}d` : "Today";


    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? `0${minutes}` : minutes;

    const formattedTime = `${hours}:${minutes} ${ampm}`;
    // return `${formattedDate} at ${formattedTime}`;
    return formattedTime
};
