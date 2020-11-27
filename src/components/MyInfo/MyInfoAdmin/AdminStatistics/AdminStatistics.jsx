import './AdminStatistics.css'
import React from 'react'
import {Doughnut, Line} from 'react-chartjs-2'

export default function AdminStatistics({data}) {

  const users = data[0]
  const gyms = data[1]
  const instructors = data[2]
  const lessons = data[3]
  const reservations = data[4]
  const orgs = data[5]


  // ORG's Role

  const allOrgsData = []
  orgs.forEach((org) => {
    allOrgsData.push(org.role)
  })

  const orgsQuantity = allOrgsData.reduce((orgQuantity, org) => {
    orgQuantity[org] = (orgQuantity[org] || 0) + 1
    return orgQuantity
  }, {})

  const sortedOrgs = Object.keys(orgsQuantity).sort((a, b) => orgsQuantity[b] - orgsQuantity[a])
  const orgsRole = {
    labels: Object.keys(orgsQuantity),
    datasets: [
      {
        data: Object.values(orgsQuantity),
        backgroundColor: ['#ffcc00', '#333', '#00a9ad'],
        hoverBackgroundColor: ['#ffcc00', '#333', '#00a9ad']
      }
    ]
  }

  // Lessons Disciplines

  const allDisciplinesData = []
  lessons.forEach((lesson) => {
    allDisciplinesData.push(lesson.discipline)
  })

  const disciplinesQuantity = allDisciplinesData.reduce(
    (disciplineQuantity, discipline) => {
      disciplineQuantity[discipline] = (disciplineQuantity[discipline] || 0) + 1
      return disciplineQuantity
    },
    {}
  )

  const sortedDisciplines = Object.keys(disciplinesQuantity).sort((a, b) => disciplinesQuantity[b] - disciplinesQuantity[a])

  const disciplinesData = {
    labels: Object.keys(disciplinesQuantity),
    datasets: [
      {
        data: Object.values(disciplinesQuantity),
        backgroundColor: [
          '#ffcc00',
          '#333',
          '#00a9ad',
          '#fb9000',
          '#cb1b53',
          '#7a0054',
          '#4FBC9F',
          '#48A786',
          '#1EA1CD',
          '#6BF1BC',
          '#FCB55F',
          '#F24438',
          '#C7331F'
        ]
      }
    ]
  }


  ///// User's Cities
  const allUsersCitiesData = []
  users.forEach((user) => {
    allUsersCitiesData.push(user.city)
  })

  const citiesUsersQuantity = allUsersCitiesData.reduce(
    (cityQuantity, city) => {
      cityQuantity[city] = (cityQuantity[city] || 0) + 1
      return cityQuantity
    },
    {}
  )

  const sortedUsersCities = Object.keys(citiesUsersQuantity).sort((a, b) => citiesUsersQuantity[b] - citiesUsersQuantity[a])

  const citiesUsersData = {
    labels: Object.keys(citiesUsersQuantity),
    datasets: [
      {
        data: Object.values(citiesUsersQuantity),
        backgroundColor: [
          '#ffcc00',
          '#333',
          '#00a9ad',
          '#fb9000',
          '#cb1b53',
          '#7a0054',
          '#4FBC9F',
          '#48A786',
          '#1EA1CD',
          '#6BF1BC',
          '#FCB55F',
          '#F24438',
          '#C7331F'
        ]
      }
    ]
  }

  ///// Gym's Cities
  const allGymsCitiesData = []
  gyms.forEach((gym) => {
    allGymsCitiesData.push(gym.user.city)
  })

  const citiesGymsQuantity = allGymsCitiesData.reduce(
    (cityQuantity, city) => {
      cityQuantity[city] = (cityQuantity[city] || 0) + 1
      return cityQuantity
    },
    {}
  )

  const sortedGymsCities = Object.keys(citiesGymsQuantity).sort((a, b) => citiesGymsQuantity[b] - citiesGymsQuantity[a])

  const citiesGymsData = {
    labels: Object.keys(citiesGymsQuantity),
    datasets: [
      {
        data: Object.values(citiesGymsQuantity),
        backgroundColor: [
          '#ffcc00',
          '#333',
          '#00a9ad',
          '#fb9000',
          '#cb1b53',
          '#7a0054',
          '#4FBC9F',
          '#48A786',
          '#1EA1CD',
          '#6BF1BC',
          '#FCB55F',
          '#F24438',
          '#C7331F'
        ]
      }
    ]
  }

  ///// Instructor's Cities
  const allInstructorsCitiesData = []
  instructors.forEach((instructor) => {
    allInstructorsCitiesData.push(instructor.user.city)
  })

  const citiesInstructorsQuantity = allInstructorsCitiesData.reduce(
    (cityQuantity, city) => {
      cityQuantity[city] = (cityQuantity[city] || 0) + 1
      return cityQuantity
    },
    {}
  )

  const sortedInstructorsCities = Object.keys(citiesInstructorsQuantity).sort((a, b) => citiesInstructorsQuantity[b] - citiesInstructorsQuantity[a])

  const citiesInstructorsData = {
    labels: Object.keys(citiesInstructorsQuantity),
    datasets: [
      {
        data: Object.values(citiesInstructorsQuantity),
        backgroundColor: [
          '#ffcc00',
          '#333',
          '#00a9ad',
          '#fb9000',
          '#cb1b53',
          '#7a0054',
          '#4FBC9F',
          '#48A786',
          '#1EA1CD',
          '#6BF1BC',
          '#FCB55F',
          '#F24438',
          '#C7331F'
        ]
      }
    ]
  }

  ///// Most Discipline Reserved
  const allDisciplinesReservationData = []
  reservations.forEach((reservation) => {
    allDisciplinesReservationData.push(reservation?.lesson?.discipline)
  })

  const disciplinesReservationQuantity = allDisciplinesReservationData.reduce(
    (disciplineQuantity, discipline) => {
      disciplineQuantity[discipline] = (disciplineQuantity[discipline] || 0) + 1
      return disciplineQuantity
    },
    {}
  )

  const sortedDisciplinesReservation = Object.keys(disciplinesReservationQuantity).sort((a, b) => disciplinesReservationQuantity[b] - disciplinesReservationQuantity[a])

  const disciplinesReservationData = {
    labels: Object.keys(disciplinesReservationQuantity),
    datasets: [
      {
        data: Object.values(disciplinesReservationQuantity),
        backgroundColor: [
          '#ffcc00',
          '#333',
          '#00a9ad',
          '#fb9000',
          '#cb1b53',
          '#7a0054',
          '#4FBC9F',
          '#48A786',
          '#1EA1CD',
          '#6BF1BC',
          '#FCB55F',
          '#F24438',
          '#C7331F'
        ]
      }
    ]
  }

  // Users, Gyms, Instructors graph

  let userDates = []
  let numberOfUsers = []

  users.forEach((user) => {
    userDates.push(new Date(user.createdAt).getMonth())
  })

  const numberOfDates = userDates.reduce((el, date) => {
    el[date] = (el[date] || 0) + 1
    return el
  }, {})

  numberOfUsers = Object.values(numberOfDates)

  let gymDates = []
  let numberOfGyms = []

  gyms.forEach((el) => {
    gymDates.push(new Date(el.user.createdAt).getMonth())
  })

  const numberOfGymDates = gymDates.reduce((el, date) => {
    el[date] = (el[date] || 0) + 1
    return el
  }, {})

  numberOfGyms = Object.values(numberOfGymDates)

  let instructorDates = []
  let numberOfInstructors = []

  instructors.forEach((el) => {
    instructorDates.push(new Date(el.user.createdAt).getMonth())
  })

  const numberOfInstructorDates = instructorDates.reduce((el, date) => {
    el[date] = (el[date] || 0) + 1
    return el
  }, {})

  numberOfInstructors = Object.values(numberOfInstructorDates)

  const usersGymsInstructorsMonth = {
    labels: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec'
    ],
    datasets: [
      {
        label: 'Users',
        borderColor: '#00a9ad',
        fill: false,
        data: numberOfUsers
      },
      {
        label: 'Gyms',
        borderColor: '#ffcc00',
        fill: false,
        data: numberOfGyms
      },
      {
        label: 'Instructors',
        borderColor: '#cb1b53',
        fill: false,
        data: numberOfInstructors
      }
    ],
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
              stepSize: 50
            }
          }
        ]
      },
      legend: {display: false},
      title: {
        display: true,
        text: 'Users & Spots per month'
      }
    }
  }


  return (
    <div className="container-fluid AdminStatistics">
      <div className="container instructors-centers">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-8 canvas">
            <h1 className="big">User's, Gym's, Instructor's per Month</h1>
            <Line data={usersGymsInstructorsMonth} />
          </div>
          <div className="col-12 col-sm-8 canvas">
            <h1 className="big">Discipline's Reserved</h1>
            <Doughnut data={disciplinesReservationData} />
            <p class="info">At the time, the most discipline reserved is <strong>{sortedDisciplinesReservation[0]}</strong> with a total of <strong>{disciplinesReservationQuantity[sortedDisciplinesReservation[0]]}</strong> reserves.</p>
          </div>
          <div className="col-12 col-sm-8 canvas">
            <h1 className="big">Lesson's Disciplines</h1>
            <Doughnut data={disciplinesData} />
            <p class="info">At the time, the most lesson discipline is <strong>{sortedDisciplines[0]}</strong> with a total of <strong>{disciplinesQuantity[sortedDisciplines[0]]}</strong> lessons.</p>
          </div>
          <div className="col-12 col-sm-8 canvas">
            <h1 className="big">User's Cities</h1>
            <Doughnut data={citiesUsersData} />
            <p class="info">At the time, the most user city is <strong>{sortedUsersCities[0]}</strong> with a total of <strong>{citiesUsersQuantity[sortedUsersCities[0]]}</strong> User's.</p>
          </div>
          <div className="col-12 col-sm-8 canvas">
            <h1 className="big">Gym's Cities</h1>
            <Doughnut data={citiesGymsData} />
            <p class="info">At the time, the most gym city is <strong>{sortedGymsCities[0]}</strong> with a total of <strong>{citiesGymsQuantity[sortedGymsCities[0]]}</strong> Gym's.</p>
          </div>
          <div className="col-12 col-sm-8 canvas">
            <h1 className="big">Instructor's Cities</h1>
            <Doughnut data={citiesInstructorsData} />
            <p class="info">At the time, the most instructor city is <strong>{sortedInstructorsCities[0]}</strong> with a total of <strong>{citiesInstructorsQuantity[sortedInstructorsCities[0]]}</strong> Instructor's.</p>
          </div>
          <div className="col-12 col-sm-8 canvas">
            <h1 className="big">ORG's Role</h1>
            <Doughnut data={orgsRole} />
            <p class="info">At the time, the most org role is <strong>{sortedOrgs[0]}</strong> with a total of <strong>{orgsQuantity[sortedOrgs[0]]}</strong> ORG's.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

