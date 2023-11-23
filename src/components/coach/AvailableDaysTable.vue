<template>
    <section>
        <h4 class="text-center mt-5">Days available</h4>
        <table class="table table-bordered text-center d-none d-md-table">
            <thead>
                <tr>
                    <th>Monday</th>
                    <th>Tuesday</th>
                    <th>Wednesday</th>
                    <th>Thursday</th>
                    <th>Friday</th>
                    <th>Saturday</th>
                    <th>Sunday</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><font-awesome-icon
                            :icon="`fa-solid ${available_days.monday ? 'fa-square-check' : 'fa-square-xmark'}`"
                            :class="available_days.monday ? 'text-success' : 'text-danger'" size="xl" />
                    </td>
                    <td><font-awesome-icon
                            :icon="`fa-solid ${available_days.tuesday ? 'fa-square-check' : 'fa-square-xmark'}`"
                            :class="available_days.tuesday ? 'text-success' : 'text-danger'" size="xl" />
                    </td>
                    <td><font-awesome-icon
                            :icon="`fa-solid ${available_days.wednesday ? 'fa-square-check' : 'fa-square-xmark'}`"
                            :class="available_days.wednesday ? 'text-success' : 'text-danger'" size="xl" />
                    </td>
                    <td><font-awesome-icon
                            :icon="`fa-solid ${available_days.thursday ? 'fa-square-check' : 'fa-square-xmark'}`"
                            :class="available_days.thursday ? 'text-success' : 'text-danger'" size="xl" />
                    </td>
                    <td><font-awesome-icon
                            :icon="`fa-solid ${available_days.friday ? 'fa-square-check' : 'fa-square-xmark'}`"
                            :class="available_days.friday ? 'text-success' : 'text-danger'" size="xl" />
                    </td>
                    <td><font-awesome-icon
                            :icon="`fa-solid ${available_days.saturday ? 'fa-square-check' : 'fa-square-xmark'}`"
                            :class="available_days.saturday ? 'text-success' : 'text-danger'" size="xl" />
                    </td>
                    <td><font-awesome-icon
                            :icon="`fa-solid ${available_days.sunday ? 'fa-square-check' : 'fa-square-xmark'}`"
                            :class="available_days.sunday ? 'text-success' : 'text-danger'" size="xl" />
                    </td>
                </tr>
            </tbody>

        </table>




































        <table class="table table-bordered text-center d-table d-md-none">
            <tbody>
                <tr>
                    <th>Monday</th>
                    <td><font-awesome-icon
                            :icon="`fa-solid ${available_days.monday ? 'fa-square-check' : 'fa-square-xmark'}`"
                            :class="available_days.monday ? 'text-success' : 'text-danger'" size="xl" />
                    </td>
                </tr>
                <tr>
                    <th>Tuesday</th>
                    <td><font-awesome-icon
                            :icon="`fa-solid ${available_days.tuesday ? 'fa-square-check' : 'fa-square-xmark'}`"
                            :class="available_days.tuesday ? 'text-success' : 'text-danger'" size="xl" />
                    </td>
                </tr>
                <tr>
                    <th>Wednesday</th>
                    <td><font-awesome-icon
                            :icon="`fa-solid ${available_days.wednesday ? 'fa-square-check' : 'fa-square-xmark'}`"
                            :class="available_days.wednesday ? 'text-success' : 'text-danger'" size="xl" />
                    </td>
                </tr>
                <tr>
                    <th>Thursday</th>
                    <td><font-awesome-icon
                            :icon="`fa-solid ${available_days.thursday ? 'fa-square-check' : 'fa-square-xmark'}`"
                            :class="available_days.thursday ? 'text-success' : 'text-danger'" size="xl" />
                    </td>
                </tr>
                <tr>
                    <th>Friday</th>
                    <td><font-awesome-icon
                            :icon="`fa-solid ${available_days.friday ? 'fa-square-check' : 'fa-square-xmark'}`"
                            :class="available_days.friday ? 'text-success' : 'text-danger'" size="xl" />
                    </td>
                </tr>
                <tr>
                    <th>Saturday</th>
                    <td><font-awesome-icon
                            :icon="`fa-solid ${available_days.saturday ? 'fa-square-check' : 'fa-square-xmark'}`"
                            :class="available_days.saturday ? 'text-success' : 'text-danger'" size="xl" />
                    </td>
                </tr>
                <tr>
                    <th>Sunday</th>
                    <td><font-awesome-icon
                            :icon="`fa-solid ${available_days.sunday ? 'fa-square-check' : 'fa-square-xmark'}`"
                            :class="available_days.sunday ? 'text-success' : 'text-danger'" size="xl" />
                    </td>
                </tr>
            </tbody>

        </table>

    </section>
</template>

<script setup>
const { available_days } = defineProps(['available_days'])
</script>