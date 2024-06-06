## Feature 1: Filter Events by City
### User story
    As a user,

    I should be able to filter events by city

    So that I can see a list of events taking place in that city.

### Gherkin Syntax
    Given I am on the events page

    When I select "New York" from the city filter dropdown

    Then I should see only events that are located in New York

## Feature 2: Show/Hide Event Details
### User story
    As a user,

    I should be able to toggle the visibility of event details

    So that I can view only the information I need and keep my screen uncluttered.
### Gherkin Syntax
    Given I am viewing a list of events

    When I click on the "Show Details" button for an event
    Then I should see the detailed information for that event
    And when I click on the "Hide Details" button for the same event

    Then the detailed information for that event should be hidden

## Feature 3: Specify Number of Events
### User story
    As a user,

    I should be able to specify the number of events to display

    So that I can control the amount of information I see at one time.
### Gherkin Syntax
    Given I am on the events page

    When I select "10" from the "Number of Events to Display" dropdown

    Then I should see only 10 events listed on the page
## Feature 4: Use the App When Offline
### User story
    As a user,

    I should be able to use the app without an internet connection

    So that I can access event details and other functionalities even when I'm offline.
### Gherkin Syntax
    Given I am offline

    When I open the app

    Then I should be able to view cached event details
    And perform actions that do not require internet connectivity
## Feature 5: Add an App Shortcut to the Home Screen
### User story
    As a user,

    I should be able to add an app shortcut to my home screen

    So that I can quickly and easily access the app.
### Gherkin Syntax
    Given I am on the app settings page

    When I click on the "Add Shortcut to Home Screen" button
    
    Then a shortcut for the app should be added to my device's home screen
## Feature 6: Display Charts Visualizing Event Details
### User story
    As a user,

    I should be able to view charts visualizing event details

    So that I can better understand and analyze the event information through visual representation.
### Gherkin Syntax
    Given I am on the event details page

    When I navigate to the "Charts" section

    Then I should see various charts that visualize the event details such as attendance, feedback, and duration




