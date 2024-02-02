import axiosClient from "../config/axios";

export default async function getAthleteStats(id, stats) {
    const daysTrainedLastMonth_response = await axiosClient.get("stats/days-trained-last-month/" + id)
    const daysTrainedLastMonth = daysTrainedLastMonth_response.data

    //Days trained this month
    const daysTrainedThisMonth_response = await axiosClient.get("stats/days-trained-this-month/" + id)
    const daysTrainedThisMonth = daysTrainedThisMonth_response.data

    const setsDoneThisMonth_response = await axiosClient.get("stats/sets-done-this-month/" + id)
    const setsDoneThisMonth = setsDoneThisMonth_response.data

    stats.value = {
        daysTrainedLastMonth,
        daysTrainedThisMonth,
        setsDoneThisMonth
    }
}