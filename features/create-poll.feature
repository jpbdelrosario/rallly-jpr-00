Feature: Create Poll

  Scenario: Create a poll with all fields filled
    Given I am on the Create Poll page
    When I fill in the title with "Sprint Retro Meeting"
    And I fill in the location with "Team zoom link"
    And I fill in the description with "What worked? What did not work?"
    And I select the date "30"
    And I submit the poll
    Then the poll should be created successfully

  Scenario: Create a poll with title and date only (location is optional)
    Given I am on the Create Poll page
    When I fill in the title with "Sprint Retro Meeting"
    And I fill in the description with "What worked? What did not work?"
    And I select the date "30"
    And I submit the poll
    Then the poll should be created successfully

  Scenario: Create a poll with title and date only (description is optional)
    Given I am on the Create Poll page
    When I fill in the title with "Sprint Retro Meeting"
    And I fill in the location with "Team zoom link"
    And I select the date "30"
    And I submit the poll
    Then the poll should be created successfully

  Scenario: Create a poll with missing title
    Given I am on the Create Poll page
    When I fill in the location with "Team zoom link"
    And I fill in the description with "What worked? What did not work?"
    And I select the date "30"
    And I submit the poll
    Then an error message should be displayed for the missing title

  Scenario: Create a poll with missing date
    Given I am on the Create Poll page
    When I fill in the title with "Sprint Retro Meeting"
    And I fill in the location with "Team zoom link"
    And I fill in the description with "What worked? What did not work?"
    And I submit the poll
    Then an error message should be displayed for the missing date
