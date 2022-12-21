'''
Parking spot raffle app
Estimate 7 parking spots for 14 employees
Some employees only come in 2 days a week
Others come in whenever a free parking place is available

Idea:
Employees create an account for the app
They are added in a database with a default number of raffle tickets and days of the week
Each week a raffle occurs for every working day where an employee is chosen randomly for a parking spot

Logic:
Employees are added in a database/list and are identified by their index
'''
from random import seed, randrange, shuffle, choice
import sqlite3

# List of employees containing name, number of raffle tickets and preferred work days, should be a database
nested_list = [
                ["Robert", 4, ["Di", "Fr"]],
                ["Hans", 4, ["Di", "Mi"]],
                ["David", 2, ["Mo", "Di", "Mi", "Do", "Fr"]],
                ["Felix", 2, ["Mo", "Di", "Mi", "Do", "Fr"]],
                ["Albert", 2, ["Di", "Mi", "Fr"]],
                ["Paul", 1, ["Mo", "Di", "Mi", "Do", "Fr"]],
                ["Moritz", 1, ["Mo", "Di", "Mi", "Do", "Fr"]]
                ]

# Choosing winners for the raffle for every parking spot available this needs to be done for every working day
work_days = ["Mo", "Di", "Mi", "Do", "Fr"]
for i in range(0,5):
    # List of all tickets in the raffle, each employee has its ticket number according to the index in the list
    print("-------" + work_days[i] + "-------")
    tickets = []
    for t in nested_list:
        #print(work_days[i], t[2])
        if work_days[i] not in t[2]: continue
        for n in range(0, t[1]):
            tickets.append(nested_list.index(t))

    print(tickets, "length: " + str(len(tickets)))
    shuffle(tickets)
    print(tickets)

    parking_spots = 5
    if parking_spots > len(set(tickets)):
        parking_spots = len(set(tickets))
    winners_list = []
    for spots in range(0, parking_spots):
        print("spots", spots)
        winner = choice(tickets)
        winners_list.append(winner)
        print("And the winner is... " + nested_list[winner][0] + " with the ticket number " + str(winner) + " !!!!!")
        if spots == parking_spots - 1: continue
        tickets = [i for i in tickets if i != winner]
        print(tickets)
        shuffle(tickets)
    print(winners_list)

    print("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<End")
