## Scenario

Shipyard Tech Ventures has been awarded a project to transform the Wealth Management program of a large global bank (BigBank.com). As a part of the transformation, the engineering team has been tasked with creating an application to help customers manage their portfolio of shares traded at New York Stock Exchange (NYSE).

This is a brand new project **without** strict limitations when it comes to the technology stack: programming language, database engines, hosting platform, etc., however we do expect the final solution to include the following components:

- Web frontend
- API backend
- External data feed integration
- Persistent Storage
- Supporting Infrastructure

## Problem Statement

Please choose **one** of the above components to implement. 

You can implement more than one of the components if you so choose but this is **not** expected. 
What is expected however, is that you will hone in on your particular area of expertise to deliver a functional piece of the overall solution.

The app should allow the user to do the following:

- login to their portfolio
- search for stocks
- follow stocks they are interested in
- unfollow stocks they are no longer interested in

Include information that would be of value to a person tracking their stocks when designing your solution.

You can take advantage of existing APIs to download stock prices data; we’ve tried [https://www.alphavantage.co/](https://www.alphavantage.co/) and it seems to be working fine (after free registration), but please be in contact with us if there’s any problem with making it work.

## Guidance
- **Front End** - Please build a responsive single page application, and give some thought to what will be visually appealing and demonstrate a good user experience. 
    Feel free to mock any additional data you would need that goes beyond the provided API. 
- **Back End** - Design and build an API that provides the data/services needed on the front end, leveraging the above provided API where appropriate.
- **Persistent storage** - Define the data structure and design the data model, persisting across application restarts. 
- **Supporting infrastructure** - Design and code any components that might be needed to test and/or deploy the overall solution.
## Expectation

This exercise is to examine your technical knowledge, reasoning, and engineering principles. There are **no tricks or hidden agendas**.

We are looking for a demonstration of your experience and skill using current software development technologies and methods. Please make sure your code is clear and demonstrates good practices. Your solution will form the basis for discussion in subsequent interviews.

We understand you may have number of commitments at your current work or with the project you’re involved with at the moment, thus there’s no time limit for this exercise. You alone decide when you’re ready, but please keep the time reasonable. Usually people get back to us within a week or so, let us know if this doesn’t work for you.

## Outputs
- Publicly accessible source code repository - including your git commit history
- Provide a readme.md file that documents:
    - how to run / build / ***test*** your creation.
    - your thought process when creating the solution.
    - any tradeoffs you made.
    - anything you might implement with more time (features, fixes, technical debt corrections, tests etc).
- If your solution uses a package manager, please ensure that there are **no globally installed dependencies required** to build / run your app. This avoids environment issues when trying to build your solution.
    - If you have to have global packages, please explain why.
- If possible, host it using one of the many cloud providers available online.

