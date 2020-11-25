import React, {useState, Component} from 'react'
import { Doughnut, Line } from 'react-chartjs-2';
// 

export default function AdminStatistics({data}) {

    console.log(data)

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

  // console.log(JSON.stringify(Object.keys(petsQuantity)))
  // console.log(JSON.stringify(Object.values(petsQuantity)))


        const orgsRole = {
            labels: Object.keys(orgsQuantity),
            datasets: [
                {
                    data: Object.values(orgsQuantity),
                    backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                    hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
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
  
    // console.log(JSON.stringify(disciplinesQuantity))
    // console.log(JSON.stringify(Object.keys(disciplinesQuantity)))
    // console.log(JSON.stringify(Object.values(disciplinesQuantity)))
  
    const sortedDisciplines = Object.keys(disciplinesQuantity).sort((a, b) => disciplinesQuantity[b] - disciplinesQuantity[a])
  
    const disciplinesData = {
      labels: Object.keys(disciplinesQuantity),
      datasets: [
        {
          data: Object.values(disciplinesQuantity),
          backgroundColor: [
            '#F88927',
            '#9F3763',
            '#FFD525',
            '#F05A28',
            '#15607A',
            '#1C80A2',
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
  
    // console.log(JSON.stringify(citiesUsersQuantity))
    // console.log(JSON.stringify(Object.keys(citiesUsersQuantity)))
    // console.log(JSON.stringify(Object.values(citiesUsersQuantity)))
  
    const sortedUsersCities = Object.keys(citiesUsersQuantity).sort((a, b) => citiesUsersQuantity[b] - citiesUsersQuantity[a])
  
    const citiesUsersData = {
      labels: Object.keys(citiesUsersQuantity),
      datasets: [
        {
          data: Object.values(citiesUsersQuantity),
          backgroundColor: [
            '#F88927',
            '#9F3763',
            '#FFD525',
            '#F05A28',
            '#15607A',
            '#1C80A2',
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
      
        // console.log(JSON.stringify(citiesGymsQuantity))
        // console.log(JSON.stringify(Object.keys(citiesGymsQuantity)))
        // console.log(JSON.stringify(Object.values(citiesGymsQuantity)))
      
        const sortedGymsCities = Object.keys(citiesGymsQuantity).sort((a, b) => citiesGymsQuantity[b] - citiesGymsQuantity[a])
      
        const citiesGymsData = {
          labels: Object.keys(citiesGymsQuantity),
          datasets: [
            {
              data: Object.values(citiesGymsQuantity),
              backgroundColor: [
                '#F88927',
                '#9F3763',
                '#FFD525',
                '#F05A28',
                '#15607A',
                '#1C80A2',
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
      
        // console.log(JSON.stringify(citiesInstructorsQuantity))
        // console.log(JSON.stringify(Object.keys(citiesInstructorsQuantity)))
        // console.log(JSON.stringify(Object.values(citiesInstructorsQuantity)))
      
        const sortedInstructorsCities = Object.keys(citiesInstructorsQuantity).sort((a, b) => citiesInstructorsQuantity[b] - citiesInstructorsQuantity[a])
      
        const citiesInstructorsData = {
          labels: Object.keys(citiesInstructorsQuantity),
          datasets: [
            {
              data: Object.values(citiesInstructorsQuantity),
              backgroundColor: [
                '#F88927',
                '#9F3763',
                '#FFD525',
                '#F05A28',
                '#15607A',
                '#1C80A2',
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
                  allDisciplinesReservationData.push(reservation.lesson.discipline)
                })
              
                const disciplinesReservationQuantity = allDisciplinesReservationData.reduce(
                  (disciplineQuantity, discipline) => {
                    disciplineQuantity[discipline] = (disciplineQuantity[discipline] || 0) + 1
                    return disciplineQuantity
                  },
                  {}
                )
              
                // console.log(JSON.stringify(disciplinesReservationQuantity))
                // console.log(JSON.stringify(Object.keys(disciplinesReservationQuantity)))
                // console.log(JSON.stringify(Object.values(disciplinesReservationQuantity)))
              
                const sortedDisciplinesReservation = Object.keys(disciplinesReservationQuantity).sort((a, b) => disciplinesReservationQuantity[b] - disciplinesReservationQuantity[a])
              
                const disciplinesReservationData = {
                  labels: Object.keys(disciplinesReservationQuantity),
                  datasets: [
                    {
                      data: Object.values(disciplinesReservationQuantity),
                      backgroundColor: [
                        '#F88927',
                        '#9F3763',
                        '#FFD525',
                        '#F05A28',
                        '#15607A',
                        '#1C80A2',
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

      console.log(userDates)

      const numberOfDates = userDates.reduce((el, date) => {
        el[date] = (el[date] || 0) + 1
        return el
      }, {})

      numberOfUsers = Object.values(numberOfDates)

      // console.log(numberOfDates)
      // console.log(numberOfUsers)

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

      // console.log(gymDates)
      // console.log(numberOfGyms)

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

      // console.log(instructorDates)
      // console.log(numberOfInstructors)

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
                borderColor: '#ea7676',
                fill: false,
                data: numberOfUsers
              },
              {
                label: 'Gyms',
                borderColor: '#35396e',
                fill: false,
                data: numberOfGyms
              },
              {
                label: 'Instructors',
                borderColor: '#94596e',
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
      legend: { display: false },
      title: {
        display: true,
        text: 'Users & Spots per month'
      }
    }
    };

    
        return (
            <div className="container-fluid margin-top instructors-centers">
            <div className="container-fluid row margin-top instructors-centers">
			<div className="flex flex-col col-6 items-center w-full max-w-md">
				<h2>User's, Gym's, Instructor's per Month</h2>
				<Line data={usersGymsInstructorsMonth} />
			</div>
            <div className="flex flex-col col-6 items-center w-full max-w-md">
				<h2 className="orgs">Discipline's Reserved</h2>
				<Doughnut data={disciplinesReservationData} />
                <p class="info">At the time, the most discipline reserved is <strong>{sortedDisciplinesReservation[0]}</strong> with a total of <strong>{disciplinesReservationQuantity[sortedDisciplinesReservation[0]]}</strong> reserves.</p>
			</div>
			<div className="flex flex-col col-6 items-center w-full max-w-md">
				<h2 className="orgs">Lesson's Disciplines</h2>
				<Doughnut data={disciplinesData} />
                <p class="info">At the time, the most lesson discipline is <strong>{sortedDisciplines[0]}</strong> with a total of <strong>{disciplinesQuantity[sortedDisciplines[0]]}</strong> lessons.</p>
			</div>
            <div className="flex flex-col col-6 items-center w-full max-w-md">
				<h2 className="orgs">User's Cities</h2>
				<Doughnut data={citiesUsersData} />
                <p class="info">At the time, the most user city is <strong>{sortedUsersCities[0]}</strong> with a total of <strong>{citiesUsersQuantity[sortedUsersCities[0]]}</strong> User's.</p>
			</div>
            <div className="flex flex-col col-6 items-center w-full max-w-md">
				<h2 className="orgs">Gym's Cities</h2>
				<Doughnut data={citiesGymsData} />
                <p class="info">At the time, the most gym city is <strong>{sortedGymsCities[0]}</strong> with a total of <strong>{citiesGymsQuantity[sortedGymsCities[0]]}</strong> Gym's.</p>
			</div>
            <div className="flex flex-col col-6 items-center w-full max-w-md">
				<h2 className="orgs">Instructor's Cities</h2>
				<Doughnut data={citiesInstructorsData} />
                <p class="info">At the time, the most instructor city is <strong>{sortedInstructorsCities[0]}</strong> with a total of <strong>{citiesInstructorsQuantity[sortedInstructorsCities[0]]}</strong> Instructor's.</p>
			</div>
            <div className="flex flex-col col-6 items-center w-full max-w-md">
				<h2 className="orgs">ORG's Role</h2>
				<Doughnut data={orgsRole} />
                <p class="info">At the time, the most org role is <strong>{sortedOrgs[0]}</strong> with a total of <strong>{orgsQuantity[sortedOrgs[0]]}</strong> ORG's.</p>
			</div>
            </div>
            </div>
        )
    }